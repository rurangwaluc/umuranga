import { pool } from "../../db/client.js";

type ProfileType = "landlord" | "agency" | "agent" | "partner";
type ProfileStatus = "pending" | "active" | "suspended" | "rejected";

function requirePool() {
  if (!pool) {
    throw new Error("Database connection is not configured");
  }

  return pool;
}

export async function getPendingProfiles() {
  const db = requirePool();

  const [landlords, agencies, agents, partners] = await Promise.all([
    db.query(
      `
        select
          lp.id,
          'landlord' as profile_type,
          lp.display_name as name,
          lp.status,
          lp.created_at,
          u.full_name as owner_name,
          u.email as owner_email,
          u.phone as owner_phone
        from landlord_profiles lp
        join users u on u.id = lp.user_id
        where lp.status = 'pending'
        order by lp.created_at desc
      `
    ),

    db.query(
      `
        select
          ap.id,
          'agency' as profile_type,
          ap.agency_name as name,
          ap.status,
          ap.created_at,
          u.full_name as owner_name,
          u.email as owner_email,
          u.phone as owner_phone
        from agency_profiles ap
        join users u on u.id = ap.owner_user_id
        where ap.status = 'pending'
        order by ap.created_at desc
      `
    ),

    db.query(
      `
        select
          agp.id,
          'agent' as profile_type,
          agp.display_name as name,
          agp.status,
          agp.created_at,
          u.full_name as owner_name,
          u.email as owner_email,
          u.phone as owner_phone
        from agent_profiles agp
        join users u on u.id = agp.user_id
        where agp.status = 'pending'
        order by agp.created_at desc
      `
    ),

    db.query(
      `
        select
          pp.id,
          'partner' as profile_type,
          pp.business_name as name,
          pp.status,
          pp.created_at,
          u.full_name as owner_name,
          u.email as owner_email,
          u.phone as owner_phone
        from partner_profiles pp
        join users u on u.id = pp.owner_user_id
        where pp.status = 'pending'
        order by pp.created_at desc
      `
    )
  ]);

  return [
    ...landlords.rows,
    ...agencies.rows,
    ...agents.rows,
    ...partners.rows
  ].sort((a, b) => {
    return (
      new Date(b.created_at as string).getTime() -
      new Date(a.created_at as string).getTime()
    );
  });
}

function tableForProfileType(profileType: ProfileType) {
  if (profileType === "landlord") {
    return {
      table: "landlord_profiles",
      verifiedColumn: "verified_at"
    };
  }

  if (profileType === "agency") {
    return {
      table: "agency_profiles",
      verifiedColumn: "verified_at"
    };
  }

  if (profileType === "agent") {
    return {
      table: "agent_profiles",
      verifiedColumn: "verified_at"
    };
  }

  return {
    table: "partner_profiles",
    verifiedColumn: "verified_at"
  };
}

export async function updateProfileStatus(input: {
  profileType: ProfileType;
  profileId: string;
  status: ProfileStatus;
}) {
  const db = requirePool();

  const target = tableForProfileType(input.profileType);

  const verifiedAtSql =
    input.status === "active"
      ? `${target.verifiedColumn} = now(),`
      : `${target.verifiedColumn} = null,`;

  const result = await db.query(
    `
      update ${target.table}
      set
        status = $1,
        ${verifiedAtSql}
        updated_at = now()
      where id = $2
      returning *
    `,
    [input.status, input.profileId]
  );

  const profile = result.rows[0];

  if (!profile) {
    const error = new Error("Profile not found");
    error.name = "PROFILE_NOT_FOUND";
    throw error;
  }

  return {
    profileType: input.profileType,
    profile
  };
}