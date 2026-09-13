"use client";

import Link from "next/link";
import { ShieldCheck, UserPlus, UsersRound } from "lucide-react";
import { getStoredUser } from "@/lib/auth";

export default function PlatformPage() {
  const user = getStoredUser();

  const isPlatformUser = user?.userType === "platform";

  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--foreground)] sm:px-5">
      <section className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-6xl rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
              Platform command center
            </p>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">
              UMURANGA Platform Owner Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              This is where the platform owner will review pending landlords,
              agencies, agents, partners, and create platform admins or support
              users.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#07152f] px-5 text-sm font-black text-white dark:bg-[#ffffff] dark:text-[#07152f]"
          >
            Back Home
          </Link>
        </div>

        {!isPlatformUser ? (
          <div className="mt-8 rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-5 text-sm font-bold text-red-700 dark:text-red-300">
            You are not signed in as a platform user. Login with the platform
            owner account to access this area.
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Review pending profiles",
              text: "Approve or reject landlords, agencies, agents, and partners.",
            },
            {
              icon: UserPlus,
              title: "Create admins",
              text: "Platform owner will create platform admins with controlled access.",
            },
            {
              icon: UsersRound,
              title: "Create supporters",
              text: "Support users will help with review, moderation, and customer issues.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--soft)] p-5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card)]">
                <item.icon size={21} />
              </div>
              <h2 className="text-xl font-black tracking-[-0.03em]">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-7 text-[var(--muted)]">
          Next platform-owner backend work will add the secure endpoint for
          creating <strong>platform_admin</strong> and{" "}
          <strong>platform_support</strong> users.
        </p>
      </section>
    </main>
  );
}