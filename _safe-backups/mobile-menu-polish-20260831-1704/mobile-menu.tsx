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
              className={`absolute inset-0 bg-black/55 backdrop-blur-[3px] transition duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`absolute left-3 right-3 top-3 overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#f4efe3] text-[#1e1f1c] shadow-[0_35px_120px_rgba(0,0,0,0.42)] transition duration-300 ease-out dark:bg-[#242520] dark:text-[#f4efe3] sm:left-5 sm:right-5 sm:top-5 ${
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-5 scale-[0.985] opacity-0"
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-4 dark:border-white/10 sm:px-5">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-black shadow-sm dark:bg-[#30312c]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
                    <Home size={15} />
                  </span>
                  UMURANGA
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1e1f1c] text-white transition duration-300 hover:scale-105 dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
                  aria-label="Close navigation menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[calc(100dvh-104px)] overflow-y-auto px-4 py-4 sm:px-5">
                {user ? (
                  <div className="mb-4 rounded-[1.35rem] border border-[#1e1f1c]/10 bg-white p-4 dark:border-white/10 dark:bg-[#30312c]">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6f716b] dark:text-[#b9b6ad]">
                      Signed in
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b8d879] text-sm font-black text-[#1e1f1c]">
                        {user.fullName.slice(0, 1)}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {user.fullName}
                        </p>
                        <p className="truncate text-xs font-bold text-[#6f716b] dark:text-[#b9b6ad]">
                          {getDashboardLabel(user)} Access
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mb-4 rounded-[1.35rem] bg-white p-4 shadow-sm dark:bg-[#30312c]">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6f716b] dark:text-[#b9b6ad]">
                    Navigation
                  </p>

                  <div className="mt-3 grid gap-2">
                    {mobileLinks.map((item, index) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className={`group flex items-center justify-between rounded-[1.1rem] border border-black/8 bg-[#f4efe3] px-4 py-4 text-sm font-black transition duration-300 hover:-translate-y-0.5 hover:border-[#1e1f1c]/20 hover:bg-[#ebe2d2] dark:border-white/10 dark:bg-[#242520] dark:hover:bg-[#2c2d28] ${
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
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1e1f1c] shadow-sm dark:bg-[#f4efe3]">
                            <item.icon size={17} />
                          </span>
                          {item.label}
                        </span>

                        <ArrowRight
                          size={16}
                          className="transition duration-300 group-hover:translate-x-1"
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
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#b8d879] px-5 text-sm font-black text-[#1e1f1c] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <UserRound size={16} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#1e1f1c] px-5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
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
                        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#1e1f1c]/10 bg-white px-5 text-sm font-black text-[#1e1f1c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ebe2d2] dark:border-white/10 dark:bg-[#30312c] dark:text-[#f4efe3] dark:hover:bg-[#383932]"
                      >
                        Sign In
                      </Link>
                    ) : null}

                    {!isSignupPage ? (
                      <Link
                        href="/signup"
                        onClick={closeMenu}
                        className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#b8d879] px-5 text-sm font-black text-[#1e1f1c] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Create Account
                      </Link>
                    ) : null}
                  </div>
                )}

                <div className="mt-4 rounded-[1.35rem] border border-[#1e1f1c]/10 bg-white p-4 dark:border-white/10 dark:bg-[#30312c]">
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
        className="relative z-[1000000] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1e1f1c] shadow-sm ring-1 ring-black/10 transition duration-300 hover:-translate-y-0.5 hover:scale-105 dark:bg-[#f4efe3] dark:text-[#1e1f1c] dark:ring-white/10"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {overlay}
    </div>
  );
}