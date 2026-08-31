"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Check,
  ChevronDown,
  Handshake,
  Home,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { AuthRedirectState } from "@/components/auth/auth-redirect-state";
import { apiRequest } from "@/lib/api";
import {
  type AuthResult,
  getPostLoginPath,
  useAuthUser,
} from "@/lib/auth";

const accountTypes = [
  {
    value: "customer",
    title: "Customer",
    description: "Search, save, request viewings, and create alerts.",
    icon: Search,
  },
  {
    value: "landlord",
    title: "Landlord",
    description: "Create a landlord profile and list after approval.",
    icon: Home,
  },
  {
    value: "agency",
    title: "Agency",
    description: "Create an agency profile for managed listings.",
    icon: Building2,
  },
  {
    value: "agent",
    title: "Agent",
    description: "Create an agent profile and represent listings.",
    icon: UserRound,
  },
  {
    value: "partner",
    title: "Partner",
    description: "Join as a service, legal, banking, or valuation partner.",
    icon: Handshake,
  },
] as const;

type AccountType = (typeof accountTypes)[number]["value"];
type DropdownDirection = "up" | "down";

function AccountTypeSelector({
  value,
  onChange,
}: {
  value: AccountType;
  onChange: (value: AccountType) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<DropdownDirection>("down");

  const selected = accountTypes.find((item) => item.value === value)!;
  const SelectedIcon = selected.icon;

  function openMenu() {
    const rect = wrapperRef.current?.getBoundingClientRect();
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 900;

    if (rect) {
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const menuHeight = 330;

      setDirection(spaceBelow < menuHeight && spaceAbove > spaceBelow ? "up" : "down");
    }

    setOpen(true);
  }

  function toggleMenu() {
    if (open) {
      setOpen(false);
      return;
    }

    openMenu();
  }

  return (
    <div ref={wrapperRef} className="relative z-30">
      <p className="mb-2 flex items-center gap-2 text-xs font-black text-[var(--foreground)]">
        <ShieldCheck size={14} className="text-[#7a9d35]" />
        Choose Account Type
      </p>

      <button
        type="button"
        onClick={toggleMenu}
        className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-4 py-3 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--card)]"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
            <SelectedIcon size={18} />
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-black">{selected.title}</span>
            <span className="mt-0.5 block truncate text-xs font-semibold text-[var(--muted)]">
              {selected.description}
            </span>
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--muted)] transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close account type menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div
            className={`absolute left-0 right-0 z-40 overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--card)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition duration-300 ${
              direction === "up"
                ? "bottom-[calc(100%+0.5rem)] origin-bottom"
                : "top-[calc(100%+0.5rem)] origin-top"
            }`}
          >
            <div className="grid max-h-[310px] gap-1 overflow-y-auto">
              {accountTypes.map((item) => {
                const active = value === item.value;
                const Icon = item.icon;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between gap-3 rounded-[1.1rem] px-3 py-3 text-left transition duration-300 hover:bg-[var(--soft)] ${
                      active ? "bg-[var(--soft)]" : ""
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          active
                            ? "bg-[#b8d879] text-[#1e1f1c]"
                            : "bg-[var(--soft)] text-[var(--foreground)]"
                        }`}
                      >
                        <Icon size={17} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-black">
                          {item.title}
                        </span>
                        <span className="mt-0.5 line-clamp-1 block text-xs font-semibold text-[var(--muted)]">
                          {item.description}
                        </span>
                      </span>
                    </span>

                    {active ? (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
                        <Check size={15} />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const currentUser = useAuthUser();

  const [fullName, setFullName] = useState("Demo User");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("0780000000");
  const [password, setPassword] = useState("Password123!");
  const [accountType, setAccountType] = useState<AccountType>("customer");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    router.replace(getPostLoginPath(currentUser));
  }, [currentUser, router]);

  const handleGoogleError = useCallback((message: string) => {
    setNotice(message);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setLoading(true);

    try {
      await apiRequest<AuthResult>("/auth/signup", {
        method: "POST",
        body: {
          fullName,
          email,
          phone,
          password,
        },
      });

      router.replace(`/login?created=1&role=${accountType}`);
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  }
  
if (currentUser) {
  return (
    <AuthRedirectState
      title="You Already Have An Active Session."
      message="You do not need to create another account right now. We are taking you to your dashboard."
    />
  );
}

  return (
    <AuthShell
      activePage="signup"
      eyebrow="Create Account"
      title="Start With The Right UMURANGA Access."
      description="Search stays public. Accounts are for saving listings, requesting viewings, creating alerts, listing property, or managing verified profiles."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {notice ? (
          <div className="rounded-2xl border border-[#b8d879]/40 bg-[#b8d879]/15 px-4 py-3 text-sm font-bold text-[var(--foreground)]">
            {notice}
          </div>
        ) : null}

        <GoogleAuthButton mode="signup" onError={handleGoogleError} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-xs font-black text-[var(--muted)]">
            OR CREATE WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <AuthInput
            label="Full Name"
            name="fullName"
            value={fullName}
            placeholder="Your full name"
            autoComplete="name"
            onChange={setFullName}
          />

          <AuthInput
            label="Phone"
            name="phone"
            value={phone}
            placeholder="0780000000"
            autoComplete="tel"
            onChange={setPhone}
          />
        </div>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          placeholder="you@example.com"
          autoComplete="email"
          onChange={setEmail}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={password}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          onChange={setPassword}
        />

        <AccountTypeSelector value={accountType} onChange={setAccountType} />

        <AuthSubmitButton loading={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </AuthSubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-black text-[var(--foreground)] underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}