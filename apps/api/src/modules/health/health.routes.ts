import type { FastifyInstance } from "fastify";
import { checkDatabaseConnection } from "../../db/client.js";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      ok: true,
      service: "UMURANGA API",
      status: "healthy",
      timestamp: new Date().toISOString()
    };
  });

  app.get("/health/db", async (_request, reply) => {
    const database = await checkDatabaseConnection();

    if (!database.ok) {
      return reply.code(503).send({
        ok: false,
        service: "UMURANGA API",
        database
      });
    }

    return {
      ok: true,
      service: "UMURANGA API",
      database
    };
  });
}
