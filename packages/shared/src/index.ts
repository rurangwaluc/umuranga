export const UMURANGA_APP_NAME = "UMURANGA";

export const USER_TYPES = [
  "platform",
  "landlord",
  "agency",
  "agent",
  "partner",
  "customer"
] as const;

export type UserType = (typeof USER_TYPES)[number];

export const PLATFORM_ROLES = [
  "platform_owner",
  "platform_admin",
  "platform_support"
] as const;

export type PlatformRole = (typeof PLATFORM_ROLES)[number];
