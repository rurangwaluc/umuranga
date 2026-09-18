import { Loader2, ShieldCheck } from "lucide-react";

type AuthRedirectStateProps = {
  title: string;
  message: string;
};

export function AuthRedirectState({ title, message }: AuthRedirectStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      <section className="w-full max-w-md overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 text-center shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#071f4d] text-white shadow-sm">
          <ShieldCheck size={26} />
        </div>

        <p className="mt-5 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
          Session Active
        </p>

        <h1 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.055em]">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">
          {message}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-black text-[var(--foreground)]">
          <Loader2 size={18} className="animate-spin text-[#7a9d35]" />
          Preparing Your Dashboard
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-2 rounded-full bg-[#071f4d]" />
          <div className="h-2 animate-pulse rounded-full bg-[var(--soft)]" />
          <div className="h-2 animate-pulse rounded-full bg-[var(--soft)]" />
        </div>
      </section>
    </main>
  );
}