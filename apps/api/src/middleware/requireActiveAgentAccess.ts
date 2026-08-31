import type { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/client.js";
import { requireAgentAccess } from "./requireAgentAccess.js";

export async function requireActiveAgentAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAgentAccess(request, reply);

  if (reply.sent) {
    return;
  }

  const agentProfileId = request.authUser?.agentProfileId;

  if (!agentProfileId || !pool) {
    return reply.code(403).send({
      ok: false,
      message: "Active agent profile required"
    });
  }

  const result = await pool.query<{ id: string }>(
    `
      select id
      from agent_profiles
      where id = $1
        and status = 'active'
        and verified_at is not null
      limit 1
    `,
    [agentProfileId]
  );

  if (!result.rows[0]) {
    return reply.code(403).send({
      ok: false,
      message: "Agent profile must be approved before this action"
    });
  }
}
