import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "./requireAuth.js";

export async function requireCustomerAccess(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await requireAuth(request, reply);

  if (reply.sent) {
    return;
  }

  if (!request.authUser || request.authUser.userType !== "customer") {
    return reply.code(403).send({
      ok: false,
      message: "Customer access required"
    });
  }
}