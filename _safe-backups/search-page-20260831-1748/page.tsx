import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Building2,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

type SearchPageProps = {
  searchParams?: Promise<{
    purpose?: string;
    location?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    q?: string;
    features?: string;
    advanced?: string;
  }>;
};

function formatPurpose(value: string | undefined) {
  if (value === "buy") return "Buy";
  if (value === "rent") return "Rent";
  if (value === "land") return "Land";

  return "Search";
}

function formatPrice(value: string | undefined) {
  if (!value) return null;

  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) return null;

  return `RWF ${number.toLocaleString()}`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const purpose = formatPurpose(params?.purpose);
  const advancedMode = params?.advanced === "1";
  const minPrice = formatPrice(params?.minPrice);
  const maxPrice = formatPrice(params?.maxPrice);
  const features = params?.features
    ? params.features.split(",").filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--foreground)] sm:px-5">
      <section className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-6xl rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[var(--soft)] px-5 text-sm font-black transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={17} />
            Back Home
          </Link>

          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#b8d879] px-4 py-2 text-xs font-black text-[#1e1f1c]">
            <ShieldCheck size={14} />
            {advancedMode ? "Advanced search" : "Search prepared"}
          </p>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
              <Search size={15} />
              UMURANGA Search
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              {advancedMode
                ? "Build a deeper property search."
                : "Your property search is ready."}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              {advancedMode
                ? "This dedicated page gives enough room for advanced filters without crowding the homepage hero."
                : "We have captured your filters. The live results page will connect here next, using the same search values."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Purpose
                </p>
                <p className="mt-2 text-xl font-black">{purpose}</p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Property type
                </p>
                <p className="mt-2 text-xl font-black">
                  {params?.propertyType ?? "Any property"}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Location
                </p>
                <p className="mt-2 flex items-center gap-2 text-xl font-black">
                  <MapPin size={18} />
                  {params?.location ?? "Rwanda"}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Bedrooms
                </p>
                <p className="mt-2 flex items-center gap-2 text-xl font-black">
                  <BedDouble size={18} />
                  {params?.bedrooms ?? "Any"}
                </p>
              </div>
            </div>

            {params?.q ? (
              <div className="mt-4 rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Smart search
                </p>
                <p className="mt-2 text-base font-black leading-7">
                  “{params.q}”
                </p>
              </div>
            ) : null}

            {features.length > 0 ? (
              <div className="mt-4 rounded-[1.4rem] border border-[var(--line)] bg-[var(--soft)] p-4">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                  Advanced preferences
                </p>

                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-[var(--card)] px-3 py-2 text-xs font-black text-[var(--muted)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {advancedMode ? (
              <div className="mt-4 rounded-[1.8rem] border border-[#b8d879]/35 bg-[#b8d879]/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                  Advanced workspace
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.045em]">
                  Advanced filters belong here.
                </h2>

                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  The next version of this page will support map search, saved
                  filters, verification filters, transport distance, amenities,
                  neighborhood scoring, and property quality checks.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Comfort and lifestyle",
                    "Location advantage",
                    "Trust and verification",
                    "Viewing availability",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--card)] p-4 text-sm font-black"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--soft)] p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c]">
              <Building2 size={24} />
            </div>

            <h2 className="mt-5 text-2xl font-black tracking-[-0.04em]">
              Results will appear here next.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              The next backend step is to create searchable property listings,
              then this page will load matching homes, apartments, land, and
              commercial properties.
            </p>

            <div className="mt-5 rounded-[1.2rem] bg-[var(--card)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">
                Budget
              </p>

              <p className="mt-2 text-lg font-black">
                {minPrice && maxPrice
                  ? `${minPrice} - ${maxPrice}`
                  : minPrice
                    ? `From ${minPrice}`
                    : maxPrice
                      ? `Up to ${maxPrice}`
                      : "Any budget"}
              </p>
            </div>

            <Link
              href="/"
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 text-sm font-black text-[var(--background)] transition hover:-translate-y-0.5"
            >
              <SlidersHorizontal size={17} />
              Change search
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
