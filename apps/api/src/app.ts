import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { agenciesRoutes } from "./modules/agencies/agencies.routes.js";
import { agentsRoutes } from "./modules/agents/agents.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { customersRoutes } from "./modules/customers/customers.routes.js";
import { healthRoutes } from "./modules/health/health.routes.js";
import { landlordsRoutes } from "./modules/landlords/landlords.routes.js";
import { onboardingRoutes } from "./modules/onboarding/onboarding.routes.js";
import { partnersRoutes } from "./modules/partners/partners.routes.js";
import { platformRoutes } from "./modules/platform/platform.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "info" : "debug"
    }
  });

  await app.register(helmet);

  await app.register(cors, {
    origin: true,
    credentials: true
  });

  await app.register(sensible);

  await app.register(healthRoutes, {
    prefix: "/api"
  });

  await app.register(authRoutes, {
    prefix: "/api/auth"
  });

  await app.register(usersRoutes, {
    prefix: "/api/users"
  });

  await app.register(customersRoutes, {
    prefix: "/api/customers"
  });

  await app.register(platformRoutes, {
    prefix: "/api/platform"
  });

  await app.register(landlordsRoutes, {
    prefix: "/api/landlords"
  });

  await app.register(agenciesRoutes, {
    prefix: "/api/agencies"
  });

  await app.register(agentsRoutes, {
    prefix: "/api/agents"
  });

  await app.register(partnersRoutes, {
    prefix: "/api/partners"
  });

  await app.register(onboardingRoutes, {
    prefix: "/api/onboarding"
  });

  app.get("/", async () => {
    return {
      ok: true,
      name: "UMURANGA API",
      message: "Rwanda-first real estate SaaS and marketplace API"
    };
  });

  return app;
}