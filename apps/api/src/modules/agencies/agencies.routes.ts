import type { FastifyInstance } from "fastify";
import { requireActiveAgencyAccess } from "../../middleware/requireActiveAgencyAccess.js";
import { requireAgencyAccess } from "../../middleware/requireAgencyAccess.js";

export async function agenciesRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireAgencyAccess }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser,
        agency: {
          access: "granted",
          profileId: request.authUser?.agencyProfileId
        }
      }
    };
  });

  app.get(
    "/active-check",
    { preHandler: requireActiveAgencyAccess },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          agency: {
            active: true,
            canCreateListings: true
          }
        }
      };
    }
  );
}
