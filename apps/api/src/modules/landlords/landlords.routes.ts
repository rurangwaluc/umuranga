import type { FastifyInstance } from "fastify";
import { requireActiveLandlordAccess } from "../../middleware/requireActiveLandlordAccess.js";
import { requireLandlordAccess } from "../../middleware/requireLandlordAccess.js";

export async function landlordsRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireLandlordAccess }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser,
        landlord: {
          access: "granted",
          profileId: request.authUser?.landlordProfileId
        }
      }
    };
  });

  app.get(
    "/active-check",
    { preHandler: requireActiveLandlordAccess },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          landlord: {
            active: true,
            canCreateListings: true
          }
        }
      };
    }
  );
}
