"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Home,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  clearAuthSession,
  getDashboardLabel,
  getPostLoginPath,
  getRefreshToken,
  useAuthUser,
} from "@/lib/auth";
import { apiRequest } from "@/lib/api";

const mobileLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rent", href: "/#properties", icon: Search },
  { label: "Sell", href: "/#properties", icon: Building2 },
  { label: "Agents", href: "/#agents", icon: ShieldCheck },
];

const MENU_ANIMATION_MS = 300;

export function MobileMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthUser();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setMounted(true);

    window.requestAnimationFrame(() => {
      setOpen(true);
    });
  }

  function closeMenu() {
    setOpen(false);

    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setMounted(false);
    }, MENU_ANIMATION_MS);
  }

  function toggleMenu() {
    if (open) {
      closeMenu();
      return;
    }

    openMenu();
  }

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
      // Local logout still happens.
    }

    clearAuthSession();
    closeMenu();
    router.push("/login");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted]);

  const overlay =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-[999999] transition duration-300 ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className={`absolute inset-0 bg-black/48 transition duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`absolute bottom-3 left-3 right-3 top-3 flex flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_24px_70px_rgba(0,0,0,0.34)] transition duration-300 ease-out dark:bg-[var(--surface)] sm:bottom-5 sm:left-5 sm:right-5 sm:top-5 ${
                open
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4 sm:px-5">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--surface-soft)] px-3 py-2 text-sm font-black"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--cta-text)] dark:bg-[var(--accent-gold)] dark:text-[var(--cta-text)]">
                    <Home size={15} />
                  </span>
                  UMURANGA
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--cta)] text-[var(--cta-text)] transition duration-200 hover:opacity-90"
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                {user ? (
                  <div className="mb-4 rounded-[14px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Signed in
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-black text-[var(--cta-text)] dark:bg-[var(--accent-gold)] dark:text-[var(--cta-text)]">
                        {user.fullName.slice(0, 1)}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {user.fullName}
                        </p>
                        <p className="truncate text-xs font-bold text-[var(--muted)]">
                          {getDashboardLabel(user)} Access
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mb-4 rounded-[14px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Navigation
                  </p>

                  <div className="mt-3 grid gap-2">
                    {mobileLinks.map((item, index) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className={`group flex items-center justify-between rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-black transition duration-200 hover:border-[var(--primary)] dark:bg-[var(--surface)] ${
                          open
                            ? "translate-y-0 opacity-100"
                            : "translate-y-3 opacity-0"
                        }`}
                        style={{
                          transitionDelay: open
                            ? `${100 + index * 55}ms`
                            : "0ms",
                        }}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--surface-soft)] text-[var(--foreground)]">
                            <item.icon size={17} />
                          </span>
                          {item.label}
                        </span>

                        <ArrowRight
                          size={16}
                          className="transition duration-200"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {user ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href={getPostLoginPath(user)}
                      onClick={closeMenu}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-5 text-sm font-black text-[var(--cta-text)] transition duration-200 hover:opacity-90 dark:bg-[var(--accent-gold)] dark:text-[var(--cta-text)]"
                    >
                      <UserRound size={16} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--cta)] px-5 text-sm font-black text-[var(--cta-text)] transition duration-200 hover:opacity-90"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {!isLoginPage ? (
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-black text-[var(--foreground)] transition duration-200 hover:border-[var(--primary)]"
                      >
                        Sign In
                      </Link>
                    ) : null}

                    {!isSignupPage ? (
                      <Link
                        href="/signup"
                        onClick={closeMenu}
                        className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--primary)] px-5 text-sm font-black text-[var(--cta-text)] transition duration-200 hover:opacity-90 dark:bg-[var(--accent-gold)] dark:text-[var(--cta-text)]"
                      >
                        Create Account
                      </Link>
                    ) : null}
                  </div>
                )}

                <div className="mt-4 rounded-[14px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-sm font-black">
                    Smart property search
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6f716b] dark:text-[#b9b6ad]">
                    Search by budget, neighborhood, amenities, schools, work,
                    and transport in one clear flow.
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        className="relative z-[1000000] inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition duration-200 hover:border-[var(--primary)]"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {overlay}
    </div>
  );
}