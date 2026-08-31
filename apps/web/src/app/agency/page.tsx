import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AgencyDashboardPage() {
  return (
    <DashboardShell
      badge="Agency dashboard"
      title="Run Verified Agency Listings From One Control Room."
      description="Agencies will use this area to manage profile approval, team members, listings, leads, and property performance."
      cards={[
        {
          title: "Agency Verification",
          text: "Complete your agency profile so UMURANGA can review and approve your access.",
        },
        {
          title: "Team Members",
          text: "Invite agents and staff later with proper permissions and accountability.",
        },
        {
          title: "Managed Listings",
          text: "Publish and manage agency-owned or represented properties after approval.",
        },
      ]}
    />
  );
}