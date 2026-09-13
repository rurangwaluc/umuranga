import Image from "next/image";
import Link from "next/link";
import { Home, Search, ShieldCheck } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  activePage: "login" | "signup";
  children: React.ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  activePage,
  children,
}: AuthShellProps) {
  const headerAction =
    activePage === "login"
      ? {
          label: "Create Account",
          href: "/signup",
        }
      : {
          label: "Sign In",
          href: "/login",
        };

  return (
    <main className="min-h-screen bg-[var(--background)] px-2 py-2 text-[var(--foreground)] sm:px-4 lg:px-5">
      <section className="mx-auto min-h-[calc(100vh-1rem)] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--card)] shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <header className="relative z-30 flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--card)] px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--soft)] px-3 py-2 text-sm font-black text-[var(--foreground)] transition hover:-translate-y-0.5"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#07152f] text-white dark:bg-[#ffffff] dark:text-[#07152f]">
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
                    ? "bg-[#07152f] text-white dark:bg-[#ffffff] dark:text-[#07152f]"
                    : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href={headerAction.href}
              className="hidden whitespace-nowrap rounded-full bg-[#1357e8] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
            >
              {headerAction.label}
            </Link>

            <MobileMenu />
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[0.98fr_1.02fr]">
          <aside className="relative hidden overflow-hidden bg-[#07152f] p-6 text-white lg:flex lg:flex-col lg:justify-between xl:p-8">
            <Image
              src="/images/auth/auth-villa.webp"
              alt="Premium UMURANGA property"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(184,216,121,0.22),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.78))]" />

            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-white/85 backdrop-blur-md">
                <ShieldCheck size={14} />
                Verified Rwanda Real Estate
              </p>
            </div>

            <div className="relative z-10">
              <h2 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] xl:text-6xl">
                One Identity For Every Serious Property Move.
              </h2>

              <p className="mt-5 max-w-xl rounded-[1.25rem] border border-white/14 bg-white/12 px-5 py-4 text-sm font-semibold leading-7 text-white/82 backdrop-blur-md">
                Public discovery stays open. Accounts protect the actions that
                need trust: saved listings, viewing requests, alerts, owner
                onboarding, agency access, agent profiles, partner access, and
                platform operations.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  "Search Publicly",
                  "Save With Account",
                  "List After Review",
                  "Approve As Platform",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/14 bg-white/12 px-4 py-2 text-center text-[11px] font-black text-white/88 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex min-h-full flex-col p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="mx-auto flex w-full max-w-[620px] flex-1 flex-col justify-center">
              <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
                <Search size={14} />
                {eyebrow}
              </p>

              <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
                {title}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {description}
              </p>

              <div className="mt-8">{children}</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}