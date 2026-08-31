import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = env.DATABASE_URL
  ? new Pool({
      connectionString: env.DATABASE_URL,
      ssl:
        env.NODE_ENV === "production"
          ? {
              rejectUnauthorized: false
            }
          : undefined
    })
  : null;

export const db = pool ? drizzle(pool) : null;

export async function checkDatabaseConnection() {
  if (!pool) {
    return {
      ok: false,
      message: "DATABASE_URL is not configured yet"
    };
  }

  const result = await pool.query("select now() as now");

  return {
    ok: true,
    now: result.rows[0]?.now ?? null
  };
}
