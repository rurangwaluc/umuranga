import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function PartnerDashboardPage() {
  return (
    <DashboardShell
      badge="Partner dashboard"
      title="Support Serious Property Moves With Verified Services."
      description="Partners will later offer support services like valuation, legal help, banking, insurance, moving, construction, and photography."
      cards={[
        {
          title: "Partner Verification",
          text: "Complete your service profile so UMURANGA can review your eligibility.",
        },
        {
          title: "Service Categories",
          text: "Choose the property service areas your business supports.",
        },
        {
          title: "Qualified Requests",
          text: "Receive relevant service requests from property customers later.",
        },
      ]}
    />
  );
}