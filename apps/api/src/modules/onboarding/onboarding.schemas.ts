import { z } from "zod";

export const createLandlordProfileSchema = z.object({
  displayName: z.string().trim().min(2, "Display name is required"),
  bio: z.string().trim().max(1000).optional()
});

export const createAgencyProfileSchema = z.object({
  agencyName: z.string().trim().min(2, "Agency name is required"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must use lowercase letters, numbers, and hyphens only"
    ),
  description: z.string().trim().max(1500).optional()
});

export const createAgentProfileSchema = z.object({
  displayName: z.string().trim().min(2, "Display name is required"),
  bio: z.string().trim().max(1000).optional(),
  licenseNumber: z.string().trim().max(120).optional()
});

export const createPartnerProfileSchema = z.object({
  businessName: z.string().trim().min(2, "Business name is required"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must use lowercase letters, numbers, and hyphens only"
    ),
  category: z.string().trim().min(2, "Partner category is required"),
  description: z.string().trim().max(1500).optional()
});