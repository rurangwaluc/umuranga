import { pool } from "../../db/client.js";
import { resolveAuthUser } from "../auth/auth.service.js";

type CreateLandlordProfileInput = {
  userId: string;
  displayName: string;
  bio?: string;
};

type CreateAgencyProfileInput = {
  userId: string;
  agencyName: string;
  slug: string;
  description?: string;
};

type CreateAgentProfileInput = {
  userId: string;
  displayName: string;
  bio?: string;
  licenseNumber?: string;
};

type CreatePartnerProfileInput = {
  userId: string;
  businessName: string;
  slug: string;
  category: string;
  description?: string;
};

function requirePool() {
  if (!pool) {
    throw new Error("Database connection is not configured");
  }

  return pool;
}

async function ensureUserCanCreateBusinessProfile(userId: string) {
  const authUser = await resolveAuthUser(userId);

  if (!authUser) {
    const error = new Error("User not found or inactive");
    error.name = "USER_NOT_FOUND";
    throw error;
  }

  if (authUser.userType === "platform") {
    const error = new Error("Platform users cannot create business profiles");
    error.name = "PLATFORM_USER_NOT_ALLOWED";
    throw error;
  }

  if (
    authUser.landlordProfileId ||
    authUser.agencyProfileId ||
    authUser.agentProfileId ||
    authUser.partnerProfileId
  ) {
    const error = new Error("This user already has a business profile");
    error.name = "BUSINESS_PROFILE_EXISTS";
    throw error;
  }

  return authUser;
}

export async function getMyOnboardingProfile(userId: string) {
  const authUser = await resolveAuthUser(userId);

  if (!authUser) {
    const error = new Error("User not found or inactive");
    error.name = "USER_NOT_FOUND";
    throw error;
  }

  return authUser;
}

export async function createLandlordProfile(input: CreateLandlordProfileInput) {
  const db = requirePool();

  await ensureUserCanCreateBusinessProfile(input.userId);

  const result = await db.query(
    `
      insert into landlord_profiles (
        user_id,
        display_name,
        bio,
        status
      )
      values ($1, $2, $3, 'pending')
      returning id, user_id, display_name, bio, status, created_at
    `,
    [input.userId, input.displayName, input.bio ?? null]
  );

  const profile = result.rows[0];

  return {
    profile,
    authUser: await resolveAuthUser(input.userId)
  };
}

export async function createAgencyProfile(input: CreateAgencyProfileInput) {
  const db = requirePool();

  await ensureUserCanCreateBusinessProfile(input.userId);

  const client = await db.connect();

  try {
    await client.query("begin");

    const agencyResult = await client.query<{
      id: string;
      owner_user_id: string;
      agency_name: string;
      slug: string;
      description: string | null;
      status: string;
      created_at: Date;
    }>(
      `
        insert into agency_profiles (
          owner_user_id,
          agency_name,
          slug,
          description,
          status
        )
        values ($1, $2, $3, $4, 'pending')
        returning id, owner_user_id, agency_name, slug, description, status, created_at
      `,
      [input.userId, input.agencyName, input.slug, input.description ?? null]
    );

    const agency = agencyResult.rows[0];

    if (!agency) {
      throw new Error("Failed to create agency profile");
    }

    await client.query(
      `
        insert into agency_members (
          agency_id,
          user_id,
          role,
          is_active
        )
        values ($1, $2, 'agency_owner', true)
      `,
      [agency.id, input.userId]
    );

    await client.query("commit");

    return {
      profile: agency,
      authUser: await resolveAuthUser(input.userId)
    };
  } catch (error) {
    await client.query("rollback");

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      const conflictError = new Error("Agency slug is already taken");
      conflictError.name = "AGENCY_SLUG_EXISTS";
      throw conflictError;
    }

    throw error;
  } finally {
    client.release();
  }
}

export async function createAgentProfile(input: CreateAgentProfileInput) {
  const db = requirePool();

  await ensureUserCanCreateBusinessProfile(input.userId);

  const result = await db.query(
    `
      insert into agent_profiles (
        user_id,
        display_name,
        bio,
        license_number,
        status
      )
      values ($1, $2, $3, $4, 'pending')
      returning id, user_id, display_name, bio, license_number, status, created_at
    `,
    [
      input.userId,
      input.displayName,
      input.bio ?? null,
      input.licenseNumber ?? null
    ]
  );

  const profile = result.rows[0];

  return {
    profile,
    authUser: await resolveAuthUser(input.userId)
  };
}

export async function createPartnerProfile(input: CreatePartnerProfileInput) {
  const db = requirePool();

  await ensureUserCanCreateBusinessProfile(input.userId);

  try {
    const result = await db.query(
      `
        insert into partner_profiles (
          owner_user_id,
          business_name,
          slug,
          category,
          description,
          status
        )
        values ($1, $2, $3, $4, $5, 'pending')
        returning id, owner_user_id, business_name, slug, category, description, status, created_at
      `,
      [
        input.userId,
        input.businessName,
        input.slug,
        input.category,
        input.description ?? null
      ]
    );

    const profile = result.rows[0];

    return {
      profile,
      authUser: await resolveAuthUser(input.userId)
    };
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      const conflictError = new Error("Partner slug is already taken");
      conflictError.name = "PARTNER_SLUG_EXISTS";
      throw conflictError;
    }

    throw error;
  }
}