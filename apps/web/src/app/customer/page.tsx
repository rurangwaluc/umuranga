import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell
      badge="Customer dashboard"
      title="Your Saved Property Search Starts Here."
      description="Customers will use this area to save listings, request viewings, create alerts, and track property conversations."
      cards={[
        {
          title: "Saved Listings",
          text: "Keep homes, apartments, land, and rentals you want to review later.",
        },
        {
          title: "Viewing Requests",
          text: "Request visits and track responses from verified property owners or agents.",
        },
        {
          title: "Saved Alerts",
          text: "Get notified when matching properties appear in your target neighborhoods.",
        },
      ]}
    />
  );
}