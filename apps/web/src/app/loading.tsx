function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[1.5rem] bg-[var(--soft)] ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--foreground)] sm:px-5">
      <section className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-[1500px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8">
        <header className="flex items-center justify-between gap-4">
          <SkeletonBlock className="h-12 w-40 rounded-full" />
          <SkeletonBlock className="hidden h-12 w-80 rounded-full lg:block" />
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-11 w-11 rounded-full" />
            <SkeletonBlock className="h-11 w-28 rounded-full" />
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SkeletonBlock className="hidden min-h-[680px] lg:block" />

          <div className="flex min-h-[680px] flex-col justify-center">
            <SkeletonBlock className="mb-4 h-10 w-48 rounded-full" />
            <SkeletonBlock className="h-14 w-full max-w-xl" />
            <SkeletonBlock className="mt-3 h-14 w-10/12" />
            <SkeletonBlock className="mt-6 h-6 w-full max-w-lg" />
            <SkeletonBlock className="mt-3 h-6 w-9/12" />

            <div className="mt-10 space-y-4">
              <SkeletonBlock className="h-14 w-full rounded-full" />
              <SkeletonBlock className="h-14 w-full" />
              <SkeletonBlock className="h-14 w-full" />
              <SkeletonBlock className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}