import type { FastifyInstance } from "fastify";
import { requireAuth } from "../../middleware/requireAuth.js";
import {
  createAgencyProfile,
  createAgentProfile,
  createLandlordProfile,
  createPartnerProfile,
  getMyOnboardingProfile
} from "./onboarding.service.js";
import {
  createAgencyProfileSchema,
  createAgentProfileSchema,
  createLandlordProfileSchema,
  createPartnerProfileSchema
} from "./onboarding.schemas.js";

function onboardingErrorResponse(error: unknown) {
  if (!(error instanceof Error)) {
    return {
      statusCode: 500,
      body: {
        ok: false,
        message: "Unexpected onboarding error"
      }
    };
  }

  if (error.name === "USER_NOT_FOUND") {
    return {
      statusCode: 404,
      body: {
        ok: false,
        message: error.message
      }
    };
  }

  if (
    error.name === "BUSINESS_PROFILE_EXISTS" ||
    error.name === "PLATFORM_USER_NOT_ALLOWED" ||
    error.name === "AGENCY_SLUG_EXISTS" ||
    error.name === "PARTNER_SLUG_EXISTS"
  ) {
    return {
      statusCode: 409,
      body: {
        ok: false,
        message: error.message
      }
    };
  }

  return {
    statusCode: 500,
    body: {
      ok: false,
      message: "Failed to complete onboarding"
    }
  };
}

export async function onboardingRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: requireAuth }, async (request, reply) => {
    try {
      const result = await getMyOnboardingProfile(request.authUser!.id);

      return {
        ok: true,
        data: {
          user: result
        }
      };
    } catch (error) {
      app.log.error(error);
      const response = onboardingErrorResponse(error);

      return reply.code(response.statusCode).send(response.body);
    }
  });

  app.post("/landlord", { preHandler: requireAuth }, async (request, reply) => {
    const parsed = createLandlordProfileSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid landlord profile data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await createLandlordProfile({
        userId: request.authUser!.id,
        ...parsed.data
      });

      return reply.code(201).send({
        ok: true,
        data: result
      });
    } catch (error) {
      app.log.error(error);
      const response = onboardingErrorResponse(error);

      return reply.code(response.statusCode).send(response.body);
    }
  });

  app.post("/agency", { preHandler: requireAuth }, async (request, reply) => {
    const parsed = createAgencyProfileSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid agency profile data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await createAgencyProfile({
        userId: request.authUser!.id,
        ...parsed.data
      });

      return reply.code(201).send({
        ok: true,
        data: result
      });
    } catch (error) {
      app.log.error(error);
      const response = onboardingErrorResponse(error);

      return reply.code(response.statusCode).send(response.body);
    }
  });

  app.post("/agent", { preHandler: requireAuth }, async (request, reply) => {
    const parsed = createAgentProfileSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid agent profile data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await createAgentProfile({
        userId: request.authUser!.id,
        ...parsed.data
      });

      return reply.code(201).send({
        ok: true,
        data: result
      });
    } catch (error) {
      app.log.error(error);
      const response = onboardingErrorResponse(error);

      return reply.code(response.statusCode).send(response.body);
    }
  });

  app.post("/partner", { preHandler: requireAuth }, async (request, reply) => {
    const parsed = createPartnerProfileSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        message: "Invalid partner profile data",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    try {
      const result = await createPartnerProfile({
        userId: request.authUser!.id,
        ...parsed.data
      });

      return reply.code(201).send({
        ok: true,
        data: result
      });
    } catch (error) {
      app.log.error(error);
      const response = onboardingErrorResponse(error);

      return reply.code(response.statusCode).send(response.body);
    }
  });
}