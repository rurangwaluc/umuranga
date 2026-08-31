export type PlatformRole =
  | "platform_owner"
  | "platform_admin"
  | "platform_support";

export type UserType =
  | "platform"
  | "landlord"
  | "agency"
  | "agent"
  | "partner"
  | "customer";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  platformRole: PlatformRole | null;
  landlordProfileId: string | null;
  agencyProfileId: string | null;
  agentProfileId: string | null;
  partnerProfileId: string | null;
};