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
        className={`${mobileOpen ? "fixed inset-x-0 top-0" : "sticky top-0"} z-[100] border-b border-white/10 bg-[#08285f] px-3 py-2 text-white shadow-[0_8px_24px_rgba(7,21,47,0.16)] transition-colors duration-300 dark:border-white/10 dark:bg-[#08285f] sm:px-5`}
      >
        <div className="mx-auto grid h-[54px] max-w-[1420px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 transition sm:h-[58px] sm:px-2 lg:h-[60px] lg:px-3 xl:grid-cols-[280px_minmax(0,1fr)_390px] xl:gap-7">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="relative grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[8px] border-[2px] border-white/85 text-white sm:h-[38px] sm:w-[38px] sm:rounded-[9px]">
              <span className="absolute h-[2.5px] w-7 -rotate-35 rounded-full bg-white sm:w-8" />
              <span className="absolute h-[2.5px] w-7 rotate-35 rounded-full bg-white sm:w-8" />
            </span>

            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap text-[0.98rem] font-black uppercase tracking-[0.15em] text-white min-[380px]:text-[1.05rem] sm:text-[1.16rem] xl:text-[1.28rem]">
                UMURANGA
              </span>
              <span className="mt-1 block whitespace-nowrap text-[0.52rem] font-black uppercase tracking-[0.28em] text-white/72 sm:text-[0.58rem] xl:text-[0.62rem]">
                Real Estate
              </span>
            </span>
          </Link>

          <nav className="hidden h-[40px] w-fit items-center justify-center gap-6 justify-self-center whitespace-nowrap px-4 text-[0.82rem] font-black text-white/92 transition xl:flex">
            {visibleNavLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-4 xl:flex">
            <Link
              href={listPropertyHref}
              className="inline-flex h-[40px] items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border border-white bg-white px-4 text-[0.82rem] font-black text-[#08285f] transition hover:bg-[#eef4ff]"
            >
              <CirclePlus size={21} />
              List property
            </Link>

            <Link
              href={dashboardHref}
              className="inline-flex h-[40px] items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border border-white/24 bg-[#07152f]/22 px-4 text-[0.82rem] font-black text-white transition hover:bg-[#07152f]/32"
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
              className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-white/24 bg-white/12 text-white transition hover:bg-white/18 sm:h-[42px] sm:w-[42px]"
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
                    className="flex h-11 items-center justify-center border border-black/18 bg-transparent text-[0.9rem] font-black transition hover:border-[#071f4d] hover:text-[#071f4d] dark:border-white/24 dark:bg-transparent dark:hover:border-[#08285f] dark:hover:text-[#a7bced]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href={listPropertyHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 border border-[#071f4d] bg-white text-[0.86rem] font-black text-[#071f4d] transition hover:bg-[#f6f9ff] dark:border-[#08285f] dark:bg-white dark:text-[#071f4d]"
                >
                  <CirclePlus size={17} />
                  List
                </Link>

                <Link
                  href={dashboardHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 bg-[#071f4d] text-[0.86rem] font-black text-white transition hover:bg-[#061735]"
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
