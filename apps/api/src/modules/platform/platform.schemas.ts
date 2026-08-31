import { z } from "zod";

export const profileTypeParamSchema = z.object({
  profileType: z.enum(["landlord", "agency", "agent", "partner"]),
  profileId: z.string().uuid("Valid profile ID is required")
});

export const updateProfileStatusSchema = z.object({
  status: z.enum(["pending", "active", "suspended", "rejected"])
});