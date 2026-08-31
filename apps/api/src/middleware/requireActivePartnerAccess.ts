import type { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/client.js";
import { requirePartnerAccess } from "./requirePartnerAccess.js";

export async function requireActivePartnerAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requirePartnerAccess(request, reply);

  if (reply.sent) {
    return;
  }

  const partnerProfileId = request.authUser?.partnerProfileId;

  if (!partnerProfileId || !pool) {
    return reply.code(403).send({
      ok: false,
      message: "Active partner profile required"
    });
  }

  const result = await pool.query<{ id: string }>(
    `
      select id
      from partner_profiles
      where id = $1
        and status = 'active'
        and verified_at is not null
      limit 1
    `,
    [partnerProfileId]
  );

  if (!result.rows[0]) {
    return reply.code(403).send({
      ok: false,
      message: "Partner profile must be approved before this action"
    });
  }
}
