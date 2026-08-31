import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AgentDashboardPage() {
  return (
    <DashboardShell
      badge="Agent dashboard"
      title="Build Trust As A Verified Property Advisor."
      description="Agents will use this area to manage profile approval, represented properties, viewing requests, and client conversations."
      cards={[
        {
          title: "Agent Verification",
          text: "Complete your profile so visitors know who they are dealing with.",
        },
        {
          title: "Represented Properties",
          text: "Connect yourself to listings you are authorized to represent.",
        },
        {
          title: "Client Requests",
          text: "Track viewing requests and property conversations in one place.",
        },
      ]}
    />
  );
}