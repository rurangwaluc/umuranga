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
      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#b8d879] px-6 text-sm font-black text-[#1e1f1c] transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? <Loader2 size={17} className="animate-spin" /> : null}
      {children}
    </button>
  );
}