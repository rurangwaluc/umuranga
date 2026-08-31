import type { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/client.js";
import { requireLandlordAccess } from "./requireLandlordAccess.js";

export async function requireActiveLandlordAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireLandlordAccess(request, reply);

  if (reply.sent) {
    return;
  }

  const landlordProfileId = request.authUser?.landlordProfileId;

  if (!landlordProfileId || !pool) {
    return reply.code(403).send({
      ok: false,
      message: "Active landlord profile required"
    });
  }

  const result = await pool.query<{ id: string }>(
    `
      select id
      from landlord_profiles
      where id = $1
        and status = 'active'
        and verified_at is not null
      limit 1
    `,
    [landlordProfileId]
  );

  if (!result.rows[0]) {
    return reply.code(403).send({
      ok: false,
      message: "Landlord profile must be approved before this action"
    });
  }
}
