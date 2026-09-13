"use client";

import Link from "next/link";
import { CirclePlus, Menu, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const MENU_ANIMATION_MS = 260;

type HomeHeroNavLink = {
  label: string;
  href: string;
};

type HomeHeroHeaderProps = {
  navLinks: HomeHeroNavLink[];
  dashboardHref: string;
  listPropertyHref: string;
  userLabel: string;
};

export function HomeHeroHeader({
  navLinks,
  dashboardHref,
  listPropertyHref,
  userLabel,
}: HomeHeroHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleNavLinks = navLinks.filter((item) => item.label !== "How it works");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMounted) return;

    const body = document.body;
    const root = document.documentElement;

    const originalRootOverflow = root.style.overflow;
    const originalBodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = originalRootOverflow;
      body.style.overflow = originalBodyOverflow;
    };
  }, [mobileMounted]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openMobileMenu() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setMobileMounted(true);
    window.requestAnimationFrame(() => setMobileOpen(true));
  }

  function closeMobileMenu() {
    setMobileOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setMobileMounted(false);
    }, MENU_ANIMATION_MS);
  }

  function toggleMobileMenu() {
    if (mobileOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  }

  return (
    <>
      <header
        className={`${mobileOpen ? "fixed inset-x-0 top-0" : "sticky top-0"} z-[100] border-b transition-colors duration-300 ${
          isScrolled || mobileOpen
            ? "border-[#dce8f8]/80 bg-white/94 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/94"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[92px] max-w-[1540px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:h-[104px] lg:px-16 xl:h-[112px] xl:grid-cols-[310px_minmax(0,1fr)_430px] xl:gap-8 xl:px-[150px]">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="relative grid h-[48px] w-[48px] shrink-0 place-items-center rounded-[15px] border-[3px] border-[#1357e8] text-[#1357e8] sm:h-[56px] sm:w-[56px] sm:rounded-[17px]">
              <span className="absolute h-[3px] w-8 -rotate-35 rounded-full bg-[#1357e8] sm:w-9" />
              <span className="absolute h-[3px] w-8 rotate-35 rounded-full bg-[#1357e8] sm:w-9" />
            </span>

            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap text-[1.22rem] font-black uppercase tracking-[0.15em] text-[#07152f] dark:text-white min-[380px]:text-[1.28rem] sm:text-[1.55rem] xl:text-[1.78rem]">
                UMURANGA
              </span>
              <span className="mt-1.5 block whitespace-nowrap text-[0.66rem] font-black uppercase tracking-[0.3em] text-[#315384] dark:text-white/62 sm:text-[0.76rem] xl:text-[0.84rem]">
                Real Estate
              </span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-10 whitespace-nowrap text-[1.02rem] font-black text-[#07152f] dark:text-white xl:flex">
            {visibleNavLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-[#1357e8]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-4 xl:flex">
            <Link
              href={listPropertyHref}
              className="inline-flex h-[58px] items-center justify-center gap-3 whitespace-nowrap rounded-[14px] border border-[#1357e8] bg-white/86 px-7 text-[1rem] font-black text-[#1357e8] backdrop-blur-xl transition hover:bg-white dark:border-[#2f6bff] dark:bg-white dark:text-[#1357e8] dark:hover:bg-[#f4f7ff]"
            >
              <CirclePlus size={21} />
              List property
            </Link>

            <Link
              href={dashboardHref}
              className="inline-flex h-[58px] items-center justify-center gap-3 whitespace-nowrap rounded-[14px] bg-[#1357e8] px-7 text-[1rem] font-black text-white transition hover:bg-[#0f49c7]"
            >
              <UserRound size={22} />
              {userLabel}
            </Link>

            <ThemeToggle />
          </div>

          <div className="flex items-center justify-end gap-2 xl:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#dce8f8] bg-white text-[#07152f] transition hover:bg-[#f6f9ff] dark:border-white/12 dark:bg-[#101010] dark:text-white dark:hover:bg-[#161616] sm:h-[54px] sm:w-[54px]"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMounted ? (
        <div
          className={`fixed inset-x-0 bottom-0 top-[92px] z-[80] overscroll-contain xl:hidden transition duration-[240ms] ease-out sm:top-[92px] ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] dark:bg-black/34"
          />

          <div
            className={`absolute inset-x-3 top-3 border border-black/18 bg-white px-5 pb-5 pt-3 text-[#07152f] transition duration-[240ms] ease-out dark:border-white/22 dark:bg-[#050505] dark:text-white sm:inset-x-8 sm:top-4 ${
              mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[520px]">
              <div className="mx-auto mb-4 h-px w-12 bg-black/20 dark:bg-white/24" />

              <div className="mb-4">
                <p className="text-[0.7rem] font-black uppercase tracking-[0.26em] text-black/50 dark:text-white/50">
                  Menu
                </p>
              </div>

              <nav className="grid grid-cols-2 gap-2">
                {visibleNavLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex h-11 items-center justify-center border border-black/18 bg-transparent text-[0.9rem] font-black transition hover:border-[#1357e8] hover:text-[#1357e8] dark:border-white/24 dark:bg-transparent dark:hover:border-[#2f6bff] dark:hover:text-[#8fb0ff]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href={listPropertyHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 border border-[#1357e8] bg-white text-[0.86rem] font-black text-[#1357e8] transition hover:bg-[#f6f9ff] dark:border-[#2f6bff] dark:bg-white dark:text-[#1357e8]"
                >
                  <CirclePlus size={17} />
                  List
                </Link>

                <Link
                  href={dashboardHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 bg-[#1357e8] text-[0.86rem] font-black text-white transition hover:bg-[#0f49c7]"
                >
                  <UserRound size={17} />
                  {userLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
