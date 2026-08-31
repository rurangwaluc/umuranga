import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/search"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border)] px-3 text-sm font-black transition hover:border-[var(--primary)]"
        >
          <ArrowLeft size={16} />
          Back to search
        </Link>

        <section className="mt-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            Property detail
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em]">
            {titleFromSlug(slug)}
          </h1>

          <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-[var(--muted)]">
            This is the property detail page placeholder. Next we will connect it to the real listing data, gallery, advisor contact, verification status, location details, and booking/contact actions.
          </p>
        </section>
      </div>
    </main>
  );
}
