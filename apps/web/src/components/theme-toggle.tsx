"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const THEME_STORAGE_KEY = "umuranga-theme";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      nextIsDark ? "dark" : "light"
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1e1f1c] shadow-sm ring-1 ring-black/10 transition duration-300 hover:-translate-y-0.5 hover:scale-105 dark:bg-[#f4efe3] dark:text-[#1e1f1c] dark:ring-white/10"
      aria-label="Toggle color mode"
    >
      <Moon size={18} className="block dark:hidden" />
      <Sun size={18} className="hidden dark:block" />
    </button>
  );
}