"use client";

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
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] w-full rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-4 text-[15px] font-bold text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:bg-[var(--surface)] dark:bg-white/[0.035] dark:focus:border-white/22 dark:focus:bg-white/[0.055]"
      />
    </label>
  );
}
