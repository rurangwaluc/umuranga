import type { FastifyReply, FastifyRequest } from "fastify";
import { resolveAuthUser } from "../modules/auth/auth.service.js";
import { verifyAccessToken } from "../utils/tokens.js";
import type { AuthUser } from "../types/auth.js";

declare module "fastify" {
  interface FastifyRequest {
    authUser?: AuthUser;
  }
}

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return reply.code(401).send({
      ok: false,
      message: "Authentication required"
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  try {
    const payload = verifyAccessToken(token);
    const authUser = await resolveAuthUser(payload.sub);

    if (!authUser) {
      return reply.code(401).send({
        ok: false,
        message: "Invalid or inactive user"
      });
    }

    request.authUser = authUser;
  } catch {
    return reply.code(401).send({
      ok: false,
      message: "Invalid or expired token"
    });
  }
}