import type { FastifyInstance } from "fastify";
import { requirePlatformRole } from "../../middleware/requirePlatformRole.js";
import {
  getPendingProfiles,
  updateProfileStatus
} from "./platform.service.js";
import {
  profileTypeParamSchema,
  updateProfileStatusSchema
} from "./platform.schemas.js";

export async function platformRoutes(app: FastifyInstance) {
  app.get(
    "/me",
    {
      preHandler: requirePlatformRole([
        "platform_owner",
        "platform_admin",
        "platform_support"
      ])
    },
    async (request) => {
      return {
        ok: true,
        data: {
          user: request.authUser,
          platform: {
            access: "granted"
          }
        }
      };
    }
  );

  app.get(
    "/profiles/pending",
    {
      preHandler: requirePlatformRole([
        "platform_owner",
        "platform_admin",
        "platform_support"
      ])
    },
    async () => {
      const profiles = await getPendingProfiles();

      return {
        ok: true,
        data: {
          profiles
        }
      };
    }
  );

  app.patch(
    "/profiles/:profileType/:profileId/status",
    {
      preHandler: requirePlatformRole(["platform_owner", "platform_admin"])
    },
    async (request, reply) => {
      const params = profileTypeParamSchema.safeParse(request.params);

      if (!params.success) {
        return reply.code(400).send({
          ok: false,
          message: "Invalid profile target",
          errors: params.error.flatten().fieldErrors
        });
      }

      const body = updateProfileStatusSchema.safeParse(request.body);

      if (!body.success) {
        return reply.code(400).send({
          ok: false,
          message: "Invalid profile status",
          errors: body.error.flatten().fieldErrors
        });
      }

      try {
        const result = await updateProfileStatus({
          profileType: params.data.profileType,
          profileId: params.data.profileId,
          status: body.data.status
        });

        return {
          ok: true,
          data: result
        };
      } catch (error) {
        if (error instanceof Error && error.name === "PROFILE_NOT_FOUND") {
          return reply.code(404).send({
            ok: false,
            message: error.message
          });
        }

        app.log.error(error);

        return reply.code(500).send({
          ok: false,
          message: "Failed to update profile status"
        });
      }
    }
  );
}