import Link from "next/link";
import {
  Building2,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CurrentYear } from "@/components/current-year";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "#properties" },
  { label: "Agents", href: "#agents" },
  { label: "Services", href: "/" },
];

const secondaryLinks = [
  { label: "About UMURANGA", href: "/" },
  { label: "List a property", href: "/signup" },
  { label: "Find a home", href: "#properties" },
  { label: "Contact", href: "/login" },
];

const proofItems = [
  ["Verified actors", "Landlords, agencies, and agents reviewed."],
  ["Clearer listings", "Better photos, details, and availability."],
  ["Rwanda-first", "Built around local search behavior and trust."],
];

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
    >
      <path d="M6.94 8.98H3.9V20h3.04V8.98ZM5.42 4C4.44 4 3.7 4.72 3.7 5.64c0 .9.72 1.63 1.68 1.63h.02c1 0 1.72-.73 1.72-1.63C7.1 4.72 6.4 4 5.42 4ZM20.3 13.68c0-3.07-1.64-4.5-3.83-4.5-1.77 0-2.55.97-2.99 1.65V8.98h-3.04C10.48 10 10.44 20 10.44 20h3.04v-6.15c0-.33.02-.66.12-.9.27-.66.87-1.34 1.88-1.34 1.33 0 1.86 1.01 1.86 2.49V20h3.04l-.08-6.32Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-[var(--card)] text-[var(--foreground)] sm:mt-16">
      <section className="grid gap-10 border-b border-[var(--line)] px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#07152f] text-white dark:bg-[#ffffff] dark:text-[#07152f]">
              <Home size={18} />
            </span>
            <span className="text-2xl font-bold tracking-[-0.04em]">
              UMURANGA
            </span>
          </Link>

          <h3 className="mt-7 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Discover Rwanda’s properties with clearer listings, verified actors,
            and better guidance.
          </h3>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofItems.map(([title, text]) => (
              <div
                key={title}
                className="rounded-[14px] border border-[var(--line)] bg-[var(--soft)] p-4"
              >
                <p className="text-sm font-bold text-[var(--foreground)]">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-[var(--line)] bg-[var(--soft)] p-5 sm:p-6">

          <div className="space-y-4 text-sm text-[var(--muted)]">
            <div className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#7a9d35]" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  Kigali, Rwanda
                </p>
                <p className="mt-1">KG 123 St, Kigali</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-[#7a9d35]" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  +250 780 000 000
                </p>
                <p className="mt-1">Customer support</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[#7a9d35]" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  support@umuranga.rw
                </p>
                <p className="mt-1">General inquiries</p>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-2 text-[var(--foreground)]">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2">
              <Building2 size={16} />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[var(--soft)] px-4 py-3 text-xs font-bold text-[var(--foreground)]"
              >
                Contact us
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#07152f] px-4 py-3 text-xs font-bold text-white dark:bg-[#ffffff] dark:text-[#07152f]"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-[var(--line)] px-5 py-9 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-14">
        <nav className="grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap sm:gap-5">
          {primaryLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] lg:flex">
          <Home size={16} />
        </div>

        <nav className="grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap sm:justify-start sm:gap-5 lg:justify-end">
          {secondaryLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="grid gap-5 px-5 py-8 text-sm text-[var(--muted)] min-[600px]:grid-cols-[1fr_auto] min-[600px]:items-center sm:px-8 lg:px-14">
        <p>
          © <CurrentYear /> UMURANGA. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-4 min-[600px]:justify-end">
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Terms
          </Link>
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Privacy
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-[var(--foreground)] transition hover:bg-[#07152f] hover:text-white dark:hover:bg-[#ffffff] dark:hover:text-[#07152f]"
            >
              <InstagramIcon />
            </Link>

            <Link
              href="/"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-[var(--foreground)] transition hover:bg-[#07152f] hover:text-white dark:hover:bg-[#ffffff] dark:hover:text-[#07152f]"
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}