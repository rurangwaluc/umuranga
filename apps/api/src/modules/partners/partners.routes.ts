import type { FastifyInstance } from "fastify";
import { requireActivePartnerAccess } from "../../middleware/requireActivePartnerAccess.js";
import { requirePartnerAccess } from "../../middleware/requirePartnerAccess.js";

export async function partnersRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requirePartnerAccess }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser,
        partner: {
          access: "granted",
          profileId: request.authUser?.partnerProfileId
        }
      }
    };
  });

  app.get(
    "/active-check",
    { preHandler: requireActivePartnerAccess },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          partner: {
            active: true,
            canUsePartnerTools: true
          }
        }
      };
    }
  );
}
