import type { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/client.js";
import { requireAgencyAccess } from "./requireAgencyAccess.js";

export async function requireActiveAgencyAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAgencyAccess(request, reply);

  if (reply.sent) {
    return;
  }

  const agencyProfileId = request.authUser?.agencyProfileId;

  if (!agencyProfileId || !pool) {
    return reply.code(403).send({
      ok: false,
      message: "Active agency profile required"
    });
  }

  const result = await pool.query<{ id: string }>(
    `
      select id
      from agency_profiles
      where id = $1
        and status = 'active'
        and verified_at is not null
      limit 1
    `,
    [agencyProfileId]
  );

  if (!result.rows[0]) {
    return reply.code(403).send({
      ok: false,
      message: "Agency profile must be approved before this action"
    });
  }
}
