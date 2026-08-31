import type { FastifyInstance } from "fastify";
import { requireCustomerAccess } from "../../middleware/requireCustomerAccess.js";

export async function customersRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireCustomerAccess }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser,
        customer: {
          access: "granted"
        }
      }
    };
  });

  app.get(
    "/ready-check",
    { preHandler: requireCustomerAccess },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          customer: {
            ready: true,
            canSaveListings: true,
            canRequestViewings: true,
            canCreateSearchAlerts: true
          }
        }
      };
    }
  );
}
