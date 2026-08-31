import type { FastifyInstance } from "fastify";
import { requireAuth } from "../../middleware/requireAuth.js";
import { login, loginWithGoogle, logout, signup } from "./auth.service.js";
import {
  googleAuthSchema,
  loginSchema,
  logoutSchema,
  signupSchema
} from "./auth.schemas.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/signup", async (request, reply) => {
    const parsed = signupSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid signup data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await signup(parsed.data);

      return reply.code(201).send({
        ok: true,
        data: result
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AUTH_EMAIL_EXISTS") {
        return reply.code(409).send({
          ok: false,
          message: error.message
        });
      }

      app.log.error(error);

      return reply.code(500).send({
        ok: false,
        message: "Failed to create account"
      });
    }
  });

  app.post("/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid login data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await login(parsed.data);

      return {
        ok: true,
        data: result
      };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "AUTH_INVALID_CREDENTIALS" ||
          error.name === "AUTH_INACTIVE_USER")
      ) {
        return reply.code(401).send({
          ok: false,
          message: error.message
        });
      }

      app.log.error(error);

      return reply.code(500).send({
        ok: false,
        message: "Failed to login"
      });
    }
  });

  app.post("/google", async (request, reply) => {
    const parsed = googleAuthSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid Google authentication data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await loginWithGoogle(parsed.data);

      return {
        ok: true,
        data: result
      };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "GOOGLE_AUTH_NOT_CONFIGURED" ||
          error.name === "GOOGLE_INVALID_TOKEN" ||
          error.name === "GOOGLE_EMAIL_NOT_VERIFIED")
      ) {
        return reply.code(400).send({
          ok: false,
          message: error.message
        });
      }

      if (error instanceof Error && error.name === "AUTH_INACTIVE_USER") {
        return reply.code(401).send({
          ok: false,
          message: error.message
        });
      }

      app.log.error(error);

      return reply.code(500).send({
        ok: false,
        message: "Failed to authenticate with Google"
      });
    }
  });

  app.get("/me", { preHandler: requireAuth }, async (request) => {
    return {
      ok: true,
      data: {
        user: request.authUser
      }
    };
  });

  app.post("/logout", async (request, reply) => {
    const parsed = logoutSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid logout data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    const result = await logout(parsed.data.refreshToken);

    return {
      ok: true,
      data: result
    };
  });
}