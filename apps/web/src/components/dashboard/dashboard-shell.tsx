"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Home,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  clearAuthSession,
  getDashboardLabel,
  getRefreshToken,
  getStoredUser,
} from "@/lib/auth";
import { apiRequest } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

type DashboardShellProps = {
  title: string;
  description: string;
  badge: string;
  cards: {
    title: string;
    text: string;
  }[];
};

export function DashboardShell({
  title,
  description,
  badge,
  cards,
}: DashboardShellProps) {
  const router = useRouter();
  const user = getStoredUser();

  async function handleLogout() {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: {
            refreshToken,
          },
        });
      }
    } catch {
      // Local logout must still happen even if the API call fails.
    }

    clearAuthSession();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--foreground)] sm:px-5">
      <section className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--card)] shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <header className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--soft)] px-3 py-2 text-sm font-black"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
              <Home size={15} />
            </span>
            UMURANGA
          </Link>

          <nav className="hidden items-center gap-2 rounded-full bg-[var(--soft)] p-1 text-sm font-bold lg:flex">
            {[
              ["Home", "/"],
              ["Rent", "/#properties"],
              ["Sell", "/#properties"],
              ["Agents", "/#agents"],
            ].map(([label, href], index) => (
              <Link
                key={label}
                href={href}
                className={`rounded-full px-5 py-3 transition ${
                  index === 0
                    ? "bg-[#b8d879] text-[#1e1f1c]"
                    : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              className="hidden h-12 items-center justify-center gap-2 rounded-full bg-[#1e1f1c] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-[#f4efe3] dark:text-[#1e1f1c] sm:inline-flex"
            >
              <LogOut size={16} />
              Logout
            </button>

            <MobileMenu />
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
                <ShieldCheck size={14} />
                {badge}
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {description}
              </p>
            </div>

            <div className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--soft)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                Signed in as
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b8d879] text-sm font-black text-[#1e1f1c]">
                  {user?.fullName?.slice(0, 1) ?? "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-black">
                    {user?.fullName ?? "Unknown User"}
                  </p>
                  <p className="truncate text-xs font-bold text-[var(--muted)]">
                    {user?.email ?? "No email"}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-full bg-[var(--card)] px-4 py-2 text-xs font-black text-[var(--foreground)]">
                {getDashboardLabel(user)} Access
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--soft)] p-5 transition hover:-translate-y-1 hover:bg-[var(--card)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
                  <Sparkles size={19} />
                </div>

                <h2 className="text-xl font-black tracking-[-0.035em]">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {card.text}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[var(--foreground)]">
                  Coming next
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}