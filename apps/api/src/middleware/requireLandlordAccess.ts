import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "./requireAuth.js";

export async function requireLandlordAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAuth(request, reply);

  if (reply.sent) {
    return;
  }

  if (!request.authUser || request.authUser.userType !== "landlord") {
    return reply.code(403).send({
      ok: false,
      message: "Landlord access required"
    });
  }
}