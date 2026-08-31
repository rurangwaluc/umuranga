import type { FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "./requireAuth.js";
import type { PlatformRole } from "../types/auth.js";

const platformRoleRank: Record<PlatformRole, number> = {
  platform_owner: 1,
  platform_admin: 2,
  platform_support: 3
};

export function requirePlatformRole(allowedRoles: PlatformRole[]) {
  return async function platformRoleGuard(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    await requireAuth(request, reply);

    if (reply.sent) {
      return;
    }

    const authUser = request.authUser;

    if (!authUser || authUser.userType !== "platform" || !authUser.platformRole) {
      return reply.code(403).send({
        ok: false,
        message: "Platform access required"
      });
    }

    if (!allowedRoles.includes(authUser.platformRole)) {
      return reply.code(403).send({
        ok: false,
        message: "You do not have permission to access this platform area"
      });
    }

    return;
  };
}

export function requireMinimumPlatformRole(minimumRole: PlatformRole) {
  return async function minimumPlatformRoleGuard(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    await requireAuth(request, reply);

    if (reply.sent) {
      return;
    }

    const authUser = request.authUser;

    if (!authUser || authUser.userType !== "platform" || !authUser.platformRole) {
      return reply.code(403).send({
        ok: false,
        message: "Platform access required"
      });
    }

    const userRank = platformRoleRank[authUser.platformRole];
    const requiredRank = platformRoleRank[minimumRole];

    if (userRank > requiredRank) {
      return reply.code(403).send({
        ok: false,
        message: "Higher platform permission required"
      });
    }

    return;
  };
}