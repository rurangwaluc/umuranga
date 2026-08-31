import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  Heart,
  Home,
  ListFilter,
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

const listings = [
  {
    image: "/images/home/property-1.webp",
    title: "Modern Luxury House with Pool",
    location: "Kigali, Nyarutarama",
    price: "RWF 2,400,000",
    beds: "3",
    baths: "2",
    type: "House",
    verified: true,
    tag: "For rent",
  },
  {
    image: "/images/home/property-2.webp",
    title: "Bright Villa Near Nyarutarama",
    location: "Gasabo, Kigali",
    price: "RWF 2,400,000",
    beds: "4",
    baths: "3",
    type: "Villa",
    verified: true,
    tag: "For sale",
  },
  {
    image: "/images/home/property-3.webp",
    title: "Modern Home at Dusk",
    location: "Kacyiru, Kigali",
    price: "RWF 2,400,000",
    beds: "5",
    baths: "4",
    type: "House",
    verified: true,
    tag: "For sale",
  },
  {
    image: "/images/home/property-4.webp",
    title: "Waterfront Inspired Residence",
    location: "Lake view concept",
    price: "RWF 2,400,000",
    beds: "3",
    baths: "2",
    type: "Residence",
    verified: false,
    tag: "New",
  },
  {
    image: "/images/home/property-5.webp",
    title: "Family Home with Garden",
    location: "Kibagabaga, Kigali",
    price: "RWF 2,400,000",
    beds: "4",
    baths: "3",
    type: "House",
    verified: true,
    tag: "For rent",
  },
  {
    image: "/images/home/property-6.webp",
    title: "Premium Green Residence",
    location: "Kimihurura, Kigali",
    price: "RWF 2,400,000",
    beds: "5",
    baths: "4",
    type: "Residence",
    verified: true,
    tag: "For sale",
  },
];

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

function buildBudgetLabel(minPrice: string | null, maxPrice: string | null) {
  if (minPrice && maxPrice) return `${minPrice} - ${maxPrice}`;
  if (minPrice) return `From ${minPrice}`;
  if (maxPrice) return `Up to ${maxPrice}`;

  return "Any budget";
}

function MapPreview() {
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-[var(--surface-soft)] dark:bg-[#14110d]">
      <div className="absolute inset-0 opacity-[0.30] dark:opacity-[0.22]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(180deg,var(--border)_1px,transparent_1px)] bg-[length:52px_52px]" />
        <div className="absolute left-[8%] top-[18%] h-[70%] w-[72%] rotate-[-18deg] rounded-[42%] border-[18px] border-[var(--primary)]/45" />
        <div className="absolute right-[6%] top-[10%] h-[52%] w-[46%] rotate-[18deg] rounded-[38%] border-[14px] border-[var(--accent-gold)]/35" />
        <div className="absolute bottom-[8%] left-[14%] h-[34%] w-[62%] rotate-[8deg] rounded-[40%] border-[12px] border-[var(--trust-green)]/30" />
      </div>

      <div className="absolute left-[12%] top-[18%] rounded-md bg-[var(--cta)] px-3 py-2 text-xs font-black text-[var(--cta-text)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
        RWF 2.4M
      </div>
      <div className="absolute right-[18%] top-[28%] rounded-md bg-[var(--cta)] px-3 py-2 text-xs font-black text-[var(--cta-text)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
        RWF 2.1M
      </div>
      <div className="absolute bottom-[30%] left-[28%] rounded-md bg-[var(--primary)] px-3 py-2 text-xs font-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] dark:bg-[var(--accent-gold)] dark:text-[var(--cta-text)]">
        RWF 3.0M
      </div>
      <div className="absolute bottom-[18%] right-[16%] rounded-md bg-[var(--cta)] px-3 py-2 text-xs font-black text-[var(--cta-text)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
        RWF 1.8M
      </div>

      <div className="absolute top-[48%] right-[32%] rounded-md bg-[var(--cta)] px-3 py-2 text-xs font-black text-[var(--cta-text)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
        RWF 2.6M
      </div>
      <div className="absolute left-[18%] bottom-[46%] rounded-md bg-[var(--cta)] px-3 py-2 text-xs font-black text-[var(--cta-text)] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
        RWF 1.6M
      </div>

      <div className="absolute left-5 top-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]/94 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.16)] dark:bg-[var(--surface)]/94">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
          Map view
        </p>
        <p className="mt-2 max-w-[220px] text-sm font-bold leading-5">
          Kigali area preview with listing clusters, prices, and neighborhood context.
        </p>
      </div>
    </div>
  );
}

function ListingCard({ item }: { item: (typeof listings)[number] }) {
  return (
    <article className="group overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-1.5 transition hover:border-[var(--primary)]/40 dark:bg-[var(--surface)]">
      <div className="relative h-[180px] overflow-hidden rounded-[9px] bg-[var(--surface-soft)] sm:h-[200px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover object-center"
        />

        <div className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[11px] font-black text-[#1A1A16]">
          {item.tag}
        </div>

        <button
          type="button"
          aria-label="Save listing"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/92 text-[#1A1A16]"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-base font-black tracking-[-0.025em]">
              {item.price}
              <span className="text-xs font-bold text-[var(--muted)]"> / month</span>
            </p>
            <h2 className="mt-1 line-clamp-1 text-sm font-black">
              {item.title}
            </h2>
          </div>

          {item.verified ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--trust-soft)] px-2 py-1 text-[10px] font-black text-[var(--trust-green)]">
              <Check size={12} strokeWidth={3} />
              Verified
            </span>
          ) : null}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--muted)]">
          <MapPin size={13} />
          {item.location}
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3 text-xs font-bold text-[var(--muted)]">
          <span className="inline-flex items-center gap-1">
            <BedDouble size={14} />
            {item.beds} beds
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath size={14} />
            {item.baths} baths
          </span>
          <span>{item.type}</span>
        </div>
      </div>
    </article>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const purpose = formatPurpose(params?.purpose);
  const minPrice = formatPrice(params?.minPrice);
  const maxPrice = formatPrice(params?.maxPrice);
  const budgetLabel = buildBudgetLabel(minPrice, maxPrice);
  const location = params?.location || "Kigali, Rwanda";
  const propertyType = params?.propertyType || "All property";
  const bedrooms = params?.bedrooms || "Any beds";
  const features = params?.features
    ? params.features.split(",").filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/96 backdrop-blur-md">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8 lg:py-0">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] dark:text-[var(--accent-gold)]">
              <Home size={17} />
            </span>
            <span>
              <span className="block text-sm font-black tracking-[0.14em]">
                UMURANGA
              </span>
              <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">
                Search
              </span>
            </span>
          </Link>

          <form
            action="/search"
            className="order-3 flex w-full min-w-0 items-center justify-center lg:order-none lg:flex-1 lg:px-6"
          >
            <div className="flex w-full max-w-3xl items-center rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-1.5">
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Search size={17} className="shrink-0 text-[var(--muted)]" />
                <input
                  name="location"
                  defaultValue={location}
                  placeholder="Kigali, Rwanda"
                  className="min-w-0 flex-1 bg-transparent text-sm font-black text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>

              <button
                type="submit"
                className="rounded-md bg-[var(--cta)] px-4 py-3 text-sm font-black text-[var(--cta-text)]"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border)] px-3 text-sm font-black text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back home</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--background)]">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
          <form action="/search" className="grid gap-2 min-[380px]:grid-cols-2 lg:grid-cols-[0.76fr_1fr_0.9fr_0.76fr_auto]">
            <input type="hidden" name="location" value={location} />

            <label className="group min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 transition focus-within:border-[var(--primary)] dark:bg-[var(--surface)]">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                Purpose
              </span>
              <div className="relative">
                <select
                  name="purpose"
                  defaultValue={params?.purpose ?? ""}
                  className="mt-1 h-7 w-full appearance-none bg-transparent pr-7 text-sm font-black text-[var(--foreground)] outline-none"
                >
                  <option value="">Search</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="land">Land</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
              </div>
            </label>

            <label className="group min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 transition focus-within:border-[var(--primary)] dark:bg-[var(--surface)]">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                Type
              </span>
              <div className="relative">
                <select
                  name="propertyType"
                  defaultValue={params?.propertyType ?? ""}
                  className="mt-1 h-7 w-full appearance-none bg-transparent pr-7 text-sm font-black text-[var(--foreground)] outline-none"
                >
                  <option value="">All property</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
              </div>
            </label>

            <label className="group min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 transition focus-within:border-[var(--primary)] dark:bg-[var(--surface)]">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                Budget
              </span>
              <input
                name="maxPrice"
                defaultValue={params?.maxPrice ?? ""}
                inputMode="numeric"
                placeholder="Any price"
                className="mt-1 h-7 w-full bg-transparent text-sm font-black text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
              />
            </label>

            <label className="group min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 transition focus-within:border-[var(--primary)] dark:bg-[var(--surface)]">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                Beds
              </span>
              <div className="relative">
                <select
                  name="bedrooms"
                  defaultValue={params?.bedrooms ?? ""}
                  className="mt-1 h-7 w-full appearance-none bg-transparent pr-7 text-sm font-black text-[var(--foreground)] outline-none"
                >
                  <option value="">Any beds</option>
                  <option value="1">1 bed</option>
                  <option value="2">2 beds</option>
                  <option value="3">3 beds</option>
                  <option value="4">4 beds</option>
                  <option value="5">5+ beds</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-md bg-[var(--cta)] px-5 text-sm font-black text-[var(--cta-text)] transition hover:opacity-90 min-[380px]:col-span-2 lg:col-span-1 lg:w-auto"
            >
              <SlidersHorizontal size={15} />
              Update results
            </button>
          </form>

          {params?.q || features.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {params?.q ? (
                <span className="rounded-md bg-[var(--surface-soft)] px-3 py-2 text-xs font-black text-[var(--muted)]">
                  “{params.q}”
                </span>
              ) : null}

              {features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-md bg-[var(--trust-soft)] px-3 py-2 text-xs font-black text-[var(--trust-green)]"
                >
                  {feature}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[minmax(0,58%)_minmax(420px,42%)]">
        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Verified homes matching your search
              </h1>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">
                {location} / {propertyType} / {budgetLabel}
              </p>
            </div>

            <button className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-[var(--border)] px-3 text-xs font-black transition hover:border-[var(--primary)]">
              <ListFilter size={15} />
              Sort: Recommended
            </button>
          </div>

          <div className="mb-5 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface-soft)] p-4 lg:hidden">
            <div className="h-[210px] overflow-hidden rounded-[10px] sm:h-[240px]">
              <MapPreview />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {listings.concat(listings).map((item, index) => (
              <ListingCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>
        </section>

        <aside className="hidden min-h-[calc(100vh-73px)] border-l border-[var(--border)] bg-[var(--surface-soft)] dark:bg-[#14110d] lg:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <MapPreview />
          </div>
        </aside>
      </div>
    </main>
  );
}
