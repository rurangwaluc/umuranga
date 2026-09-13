import Link from "next/link";
import {
  Building2,
  Handshake,
  Home,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const roleCopy = {
  landlord: {
    icon: Home,
    title: "Landlord Onboarding",
    text: "Create your landlord profile, then wait for platform approval before publishing listings.",
    badge: "Owner profile review",
  },
  agency: {
    icon: Building2,
    title: "Agency Onboarding",
    text: "Create your agency profile so your team can later manage verified property listings.",
    badge: "Agency verification",
  },
  agent: {
    icon: UserRound,
    title: "Agent Onboarding",
    text: "Create your agent profile and become visible as a verified property representative.",
    badge: "Agent verification",
  },
  partner: {
    icon: Handshake,
    title: "Partner Onboarding",
    text: "Join as a service partner for legal, valuation, banking, moving, insurance, photography, or construction support.",
    badge: "Partner approval",
  },
};

type RoleKey = keyof typeof roleCopy;

type OnboardingPageProps = {
  searchParams?: Promise<{
    role?: string;
    source?: string;
  }>;
};

function isRoleKey(value: string | undefined): value is RoleKey {
  return Boolean(value && value in roleCopy);
}

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const params = await searchParams;
  const role = params?.role;

  const selectedRole = isRoleKey(role) ? roleCopy[role] : null;
  const Icon = selectedRole?.icon ?? ShieldCheck;

  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--foreground)] sm:px-5">
      <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-5xl items-center justify-center rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1357e8] text-white shadow-sm">
            <Icon size={26} />
          </div>

          <p className="mb-3 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
            {selectedRole?.badge ?? "Profile Setup"}
          </p>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">
            {selectedRole?.title ?? "Choose Your UMURANGA Profile Type"}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            {selectedRole?.text ??
              "After signup, customers can continue browsing immediately. Landlords, agencies, agents, and partners need a profile review before professional access is activated."}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] px-6 text-sm font-black transition hover:-translate-y-0.5 hover:bg-[var(--card)]"
            >
              Continue Browsing
            </Link>

            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#1357e8] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Go To Login
            </Link>
          </div>

          <p className="mt-6 text-xs leading-5 text-[var(--muted)]">
            Next step: we will connect this page to landlord, agency, agent, and
            partner onboarding forms.
          </p>
        </div>
      </section>
    </main>
  );
}