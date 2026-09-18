"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  onChange: (value: string) => void;
};

export function AuthInput({
  label,
  name,
  type = "text",
  value,
  placeholder,
  autoComplete,
  onChange,
}: AuthInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && passwordVisible ? "text" : type;

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black text-[var(--foreground)]">
        {label}
      </span>

      <span className="relative block">
        <input
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={`h-14 w-full rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[#071f4d] focus:bg-[var(--card)] dark:focus:border-[#08285f] ${
            isPassword ? "pr-13" : ""
          }`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setPasswordVisible((current) => !current)}
            className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        ) : null}
      </span>
    </label>
  );
}