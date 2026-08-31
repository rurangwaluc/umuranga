import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env.js";
import { pool } from "../../db/client.js";
import type { AuthUser, PlatformRole, UserType } from "../../types/auth.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  randomTokenId
} from "../../utils/tokens.js";
import type {
  GoogleAuthInput,
  GoogleProfile,
  LoginInput,
  SignupInput
} from "./auth.types.js";

type DbUserRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  password_hash: string | null;
  is_active: boolean;
};

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

function requirePool() {
  if (!pool) {
    throw new Error("Database connection is not configured");
  }

  return pool;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function namedError(name: string, message: string) {
  const error = new Error(message);
  error.name = name;
  return error;
}

export async function resolveAuthUser(userId: string): Promise<AuthUser | null> {
  const db = requirePool();

  const userResult = await db.query<{
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
  }>(
    `
      select id, email, full_name, is_active
      from users
      where id = $1
      limit 1
    `,
    [userId]
  );

  const user = userResult.rows[0];

  if (!user || !user.is_active) {
    return null;
  }

  const platformResult = await db.query<{ role: PlatformRole }>(
    `
      select role
      from platform_user_roles
      where user_id = $1
      order by
        case role
          when 'platform_owner' then 1
          when 'platform_admin' then 2
          when 'platform_support' then 3
          else 4
        end
      limit 1
    `,
    [userId]
  );

  const landlordResult = await db.query<{ id: string }>(
    `
      select id
      from landlord_profiles
      where user_id = $1
      limit 1
    `,
    [userId]
  );

  const agencyResult = await db.query<{ agency_id: string }>(
    `
      select agency_id
      from agency_members
      where user_id = $1 and is_active = true
      limit 1
    `,
    [userId]
  );

  const agentResult = await db.query<{ id: string }>(
    `
      select id
      from agent_profiles
      where user_id = $1
      limit 1
    `,
    [userId]
  );

  const partnerResult = await db.query<{ id: string }>(
    `
      select id
      from partner_profiles
      where owner_user_id = $1
      limit 1
    `,
    [userId]
  );

  const platformRole = platformResult.rows[0]?.role ?? null;
  const landlordProfileId = landlordResult.rows[0]?.id ?? null;
  const agencyProfileId = agencyResult.rows[0]?.agency_id ?? null;
  const agentProfileId = agentResult.rows[0]?.id ?? null;
  const partnerProfileId = partnerResult.rows[0]?.id ?? null;

  let userType: UserType = "customer";

  if (platformRole) {
    userType = "platform";
  } else if (landlordProfileId) {
    userType = "landlord";
  } else if (agencyProfileId) {
    userType = "agency";
  } else if (agentProfileId) {
    userType = "agent";
  } else if (partnerProfileId) {
    userType = "partner";
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    userType,
    platformRole,
    landlordProfileId,
    agencyProfileId,
    agentProfileId,
    partnerProfileId
  };
}

async function createTokenPair(user: Pick<AuthUser, "id" | "email">) {
  const db = requirePool();

  const tokenId = randomTokenId();

  const refreshToken = createRefreshToken({
    sub: user.id,
    tokenId
  });

  const tokenHash = hashToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await db.query(
    `
      insert into refresh_tokens (id, user_id, token_hash, expires_at)
      values ($1, $2, $3, $4)
    `,
    [tokenId, user.id, tokenHash, expiresAt.toISOString()]
  );

  const accessToken = createAccessToken({
    sub: user.id,
    email: user.email
  });

  return {
    accessToken,
    refreshToken
  };
}

async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  if (!env.GOOGLE_CLIENT_ID) {
    throw namedError(
      "GOOGLE_AUTH_NOT_CONFIGURED",
      "Google authentication is not configured"
    );
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload?.sub || !payload.email) {
    throw namedError("GOOGLE_INVALID_TOKEN", "Invalid Google token");
  }

  if (payload.email_verified === false) {
    throw namedError("GOOGLE_EMAIL_NOT_VERIFIED", "Google email is not verified");
  }

  return {
    providerAccountId: payload.sub,
    email: normalizeEmail(payload.email),
    fullName: payload.name?.trim() || payload.email.split("@")[0],
    avatarUrl: payload.picture ?? null
  };
}

export async function signup(input: SignupInput) {
  const db = requirePool();
  const email = normalizeEmail(input.email);

  const existingUser = await db.query<{ id: string }>(
    `
      select id
      from users
      where email = $1
      limit 1
    `,
    [email]
  );

  if (existingUser.rows[0]) {
    throw namedError(
      "AUTH_EMAIL_EXISTS",
      "An account with this email already exists"
    );
  }

  const passwordHash = await hashPassword(input.password);

  const createdUser = await db.query<DbUserRow>(
    `
      insert into users (full_name, email, phone, password_hash)
      values ($1, $2, $3, $4)
      returning id, full_name, email, phone, password_hash, is_active
    `,
    [input.fullName.trim(), email, input.phone ?? null, passwordHash]
  );

  const user = createdUser.rows[0];

  if (!user) {
    throw new Error("Failed to create user");
  }

  const authUser = await resolveAuthUser(user.id);

  if (!authUser) {
    throw new Error("Failed to resolve created user");
  }

  const tokens = await createTokenPair({
    id: authUser.id,
    email: authUser.email
  });

  return {
    user: authUser,
    tokens
  };
}

export async function login(input: LoginInput) {
  const db = requirePool();
  const email = normalizeEmail(input.email);

  const userResult = await db.query<DbUserRow>(
    `
      select id, full_name, email, phone, password_hash, is_active
      from users
      where email = $1
      limit 1
    `,
    [email]
  );

  const user = userResult.rows[0];

  if (!user || !user.is_active || !user.password_hash) {
    throw namedError("AUTH_INVALID_CREDENTIALS", "Invalid email or password");
  }

  const passwordIsValid = await verifyPassword(
    input.password,
    user.password_hash
  );

  if (!passwordIsValid) {
    throw namedError("AUTH_INVALID_CREDENTIALS", "Invalid email or password");
  }

  const authUser = await resolveAuthUser(user.id);

  if (!authUser) {
    throw namedError("AUTH_INACTIVE_USER", "User is not active");
  }

  const tokens = await createTokenPair({
    id: authUser.id,
    email: authUser.email
  });

  return {
    user: authUser,
    tokens
  };
}

export async function loginWithGoogle(input: GoogleAuthInput) {
  const db = requirePool();
  const googleProfile = await verifyGoogleIdToken(input.idToken);

  const providerAccount = await db.query<{ user_id: string }>(
    `
      select user_id
      from auth_accounts
      where provider = 'google'
        and provider_account_id = $1
      limit 1
    `,
    [googleProfile.providerAccountId]
  );

  let userId = providerAccount.rows[0]?.user_id ?? null;

  if (!userId) {
    const existingUser = await db.query<{ id: string; is_active: boolean }>(
      `
        select id, is_active
        from users
        where email = $1
        limit 1
      `,
      [googleProfile.email]
    );

    const existing = existingUser.rows[0];

    if (existing && !existing.is_active) {
      throw namedError("AUTH_INACTIVE_USER", "User is not active");
    }

    if (existing) {
      userId = existing.id;
    } else {
      const createdUser = await db.query<{ id: string }>(
        `
          insert into users (full_name, email, phone, password_hash)
          values ($1, $2, null, null)
          returning id
        `,
        [googleProfile.fullName, googleProfile.email]
      );

      const created = createdUser.rows[0];

      if (!created) {
        throw new Error("Failed to create Google user");
      }

      userId = created.id;
    }

    await db.query(
      `
        insert into auth_accounts (
          user_id,
          provider,
          provider_account_id,
          provider_email,
          provider_full_name,
          provider_avatar_url
        )
        values ($1, 'google', $2, $3, $4, $5)
        on conflict (provider, provider_account_id)
        do update set
          provider_email = excluded.provider_email,
          provider_full_name = excluded.provider_full_name,
          provider_avatar_url = excluded.provider_avatar_url
      `,
      [
        userId,
        googleProfile.providerAccountId,
        googleProfile.email,
        googleProfile.fullName,
        googleProfile.avatarUrl
      ]
    );
  } else {
    await db.query(
      `
        update auth_accounts
        set
          provider_email = $2,
          provider_full_name = $3,
          provider_avatar_url = $4
        where provider = 'google'
          and provider_account_id = $1
      `,
      [
        googleProfile.providerAccountId,
        googleProfile.email,
        googleProfile.fullName,
        googleProfile.avatarUrl
      ]
    );
  }

  const authUser = await resolveAuthUser(userId);

  if (!authUser) {
    throw namedError("AUTH_INACTIVE_USER", "User is not active");
  }

  const tokens = await createTokenPair({
    id: authUser.id,
    email: authUser.email
  });

  return {
    user: authUser,
    tokens
  };
}

export async function logout(refreshToken: string) {
  const db = requirePool();

  const tokenHash = hashToken(refreshToken);

  await db.query(
    `
      update refresh_tokens
      set revoked_at = now()
      where token_hash = $1 and revoked_at is null
    `,
    [tokenHash]
  );

  return {
    ok: true
  };
}