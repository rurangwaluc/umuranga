import { env } from "../config/env.js";
import { pool } from "../db/client.js";
import { hashPassword } from "../utils/password.js";

async function main() {
  if (!pool) {
    throw new Error("Database connection is not configured");
  }

  const fullName = env.PLATFORM_OWNER_FULL_NAME;
  const email = env.PLATFORM_OWNER_EMAIL?.toLowerCase();
  const phone = env.PLATFORM_OWNER_PHONE ?? null;
  const password = env.PLATFORM_OWNER_PASSWORD;

  if (!fullName || !email || !password) {
    throw new Error(
      "PLATFORM_OWNER_FULL_NAME, PLATFORM_OWNER_EMAIL, and PLATFORM_OWNER_PASSWORD are required"
    );
  }

  const existingUserResult = await pool.query<{
    id: string;
    email: string;
  }>(
    `
      select id, email
      from users
      where email = $1
      limit 1
    `,
    [email]
  );

  let userId = existingUserResult.rows[0]?.id;

  if (!userId) {
    const passwordHash = await hashPassword(password);

    const createdUserResult = await pool.query<{
      id: string;
      email: string;
    }>(
      `
        insert into users (
          full_name,
          email,
          phone,
          password_hash,
          email_verified_at,
          phone_verified_at,
          is_active
        )
        values ($1, $2, $3, $4, now(), now(), true)
        returning id, email
      `,
      [fullName, email, phone, passwordHash]
    );

    userId = createdUserResult.rows[0]?.id;

    if (!userId) {
      throw new Error("Failed to create platform owner user");
    }

    console.log(`✅ Created platform owner user: ${email}`);
  } else {
    console.log(`ℹ️ Platform owner user already exists: ${email}`);
  }

  await pool.query(
    `
      insert into platform_user_roles (user_id, role)
      values ($1, 'platform_owner')
      on conflict (user_id, role) do nothing
    `,
    [userId]
  );

  console.log("✅ Platform owner role ensured");
  console.log(`✅ User ID: ${userId}`);
}

main()
  .catch((error) => {
    console.error("❌ Failed to seed platform owner");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool?.end();
  });