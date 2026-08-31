import type { FastifyInstance } from "fastify";
import { requireActiveAgentAccess } from "../../middleware/requireActiveAgentAccess.js";
import { requireAgentAccess } from "../../middleware/requireAgentAccess.js";

export async function agentsRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireAgentAccess }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser,
        agent: {
          access: "granted",
          profileId: request.authUser?.agentProfileId
        }
      }
    };
  });

  app.get(
    "/active-check",
    { preHandler: requireActiveAgentAccess },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          agent: {
            active: true,
            canCreateListings: true
          }
        }
      };
    }
  );
}
