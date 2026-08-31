import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function LandlordDashboardPage() {
  return (
    <DashboardShell
      badge="Landlord dashboard"
      title="Manage Your Properties With Trust And Visibility."
      description="Landlords will use this area to complete verification, submit listings, manage availability, and respond to serious leads."
      cards={[
        {
          title: "Profile Review",
          text: "Your landlord profile must be approved before publishing listings.",
        },
        {
          title: "Property Listings",
          text: "Create homes, apartments, plots, and rentals with strong verification details.",
        },
        {
          title: "Lead Requests",
          text: "Respond to viewing requests and keep tenant or buyer communication organized.",
        },
      ]}
    />
  );
}