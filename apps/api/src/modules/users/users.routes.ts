import type { FastifyInstance } from "fastify";
import { requireAuth } from "../../middleware/requireAuth.js";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireAuth }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser
      }
    };
  });
}