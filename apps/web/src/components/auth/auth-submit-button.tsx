import { Loader2 } from "lucide-react";

type AuthSubmitButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function AuthSubmitButton({
  children,
  loading = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[9px] bg-[var(--primary)] px-6 text-[15px] font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-70 dark:border dark:border-white/14 dark:bg-[#071F4D] dark:hover:bg-[#0A2A66]"
    >
      {loading ? <Loader2 size={17} className="animate-spin" /> : null}
      {children}
    </button>
  );
}
