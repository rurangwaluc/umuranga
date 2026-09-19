"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AsyncButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
};

export function AsyncButton({
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  ...props
}: AsyncButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[9px] bg-[var(--primary)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(7,31,77,0.16)] transition-[transform,background-color,border-color,box-shadow,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_16px_34px_rgba(7,31,77,0.22)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-65",
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
