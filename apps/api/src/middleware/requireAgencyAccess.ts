import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "./requireAuth.js";

export async function requireAgencyAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAuth(request, reply);

  if (reply.sent) {
    return;
  }

  if (!request.authUser || request.authUser.userType !== "agency") {
    return reply.code(403).send({
      ok: false,
      message: "Agency access required"
    });
  }
}
