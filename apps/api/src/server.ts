import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = await buildApp();

try {
  await app.listen({
    host: env.API_HOST,
    port: env.API_PORT
  });

  app.log.info(`🚀 UMURANGA API running on http://${env.API_HOST}:${env.API_PORT}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
