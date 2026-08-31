import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchFilters } from "@/components/search-filters";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Check,
  Heart,
  Home,
  ListFilter,
  MapPin,
  Search,
  ShieldCheck,
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
    slug: "modern-luxury-house-with-pool",
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
    slug: "bright-villa-near-nyarutarama",
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
    slug: "modern-home-at-dusk",
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
    slug: "waterfront-inspired-residence",
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
    slug: "family-home-with-garden",
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
    slug: "premium-green-residence",
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
  const mapPins = [
    {
      item: listings[0],
      label: "2.4M",
      x: "26%",
      y: "30%",
      cardSide: "right",
    },
    {
      item: listings[1],
      label: "2.4M",
      x: "64%",
      y: "24%",
      cardSide: "left",
    },
    {
      item: listings[2],
      label: "2.4M",
      x: "44%",
      y: "58%",
      cardSide: "right",
    },
    {
      item: listings[4],
      label: "2.4M",
      x: "70%",
      y: "66%",
      cardSide: "left",
    },
    {
      item: listings[5],
      label: "2.4M",
      x: "36%",
      y: "76%",
      cardSide: "right",
    },
  ];

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-[#efe2cf] dark:bg-[#100f0c]">
      <div className="absolute inset-0 opacity-[0.65] dark:opacity-[0.48]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(180deg,var(--border)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute left-[5%] top-[10%] h-[18%] w-[38%] rounded-[50%] border-[9px] border-[#b8a389]/30" />
        <div className="absolute right-[6%] top-[8%] h-[30%] w-[40%] rotate-[18deg] rounded-[45%] border-[10px] border-[#b8a389]/30" />
        <div className="absolute bottom-[13%] left-[12%] h-[32%] w-[70%] rotate-[5deg] rounded-[44%] border-[11px] border-[#6f7f65]/24" />
        <div className="absolute left-[18%] top-0 h-full w-[12px] rotate-[18deg] rounded-full bg-[#c8b79d]/22" />
        <div className="absolute right-[26%] top-0 h-full w-[12px] rotate-[-17deg] rounded-full bg-[#c8b79d]/20" />
      </div>

      <div className="absolute left-5 top-5 z-10 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]/94 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.16)] dark:bg-[var(--surface)]/94">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
          Map view
        </p>
        <p className="mt-2 max-w-[220px] text-sm font-bold leading-5">
          Hover a price marker to preview the property.
        </p>
      </div>

      {mapPins.map((pin) => (
        <div
          key={`${pin.item.title}-${pin.x}-${pin.y}`}
          className="group absolute z-20 hover:z-50 focus-within:z-50"
          style={{ left: pin.x, top: pin.y }}
        >
          <Link
            href={`/property/${pin.item.slug}`}
            className="relative z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-md border border-[#3A2A1D]/25 bg-[#F8F3EA] px-3 py-1.5 text-xs font-black text-[#11100D] shadow-[0_12px_28px_rgba(0,0,0,0.26)] transition group-hover:border-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-[#11100D] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
          >
            RWF {pin.label}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#3A2A1D]/20 bg-inherit" />
          </Link>

          <span
            className={`pointer-events-none absolute top-1/2 z-30 hidden h-[3px] w-7 -translate-y-1/2 bg-[var(--accent-gold)] shadow-[0_0_18px_rgba(185,138,59,0.45)] group-hover:block group-focus-within:block ${
              pin.cardSide === "left" ? "right-[calc(100%+0.2rem)]" : "left-[calc(100%+0.2rem)]"
            }`}
          />

          <span
            className={`absolute top-1/2 z-30 hidden h-14 w-10 -translate-y-1/2 bg-transparent group-hover:block group-focus-within:block ${
              pin.cardSide === "left" ? "right-[calc(100%+0.15rem)]" : "left-[calc(100%+0.15rem)]"
            }`}
          />

          <span
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent-gold)] bg-[var(--surface)] shadow-[0_0_18px_rgba(185,138,59,0.55)] group-hover:block group-focus-within:block"
          />

          <Link
            href={`/property/${pin.item.slug}`}
            className={`absolute top-1/2 z-40 hidden w-[260px] -translate-y-1/2 overflow-hidden rounded-[12px] border border-[var(--accent-gold)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(0,0,0,0.42)] group-hover:block group-focus-within:block ${
              pin.cardSide === "left" ? "right-[calc(100%+1.15rem)]" : "left-[calc(100%+1.15rem)]"
            }`}
          >
            <span
              className={`absolute top-1/2 z-50 h-3 w-3 -translate-y-1/2 rotate-45 border border-[var(--accent-gold)] bg-[var(--surface)] ${
                pin.cardSide === "left" ? "-right-1.5 border-b-0 border-l-0" : "-left-1.5 border-r-0 border-t-0"
              }`}
            />

            <div className="relative h-[130px] bg-[var(--surface-soft)]">
              <Image
                src={pin.item.image}
                alt={pin.item.title}
                fill
                sizes="260px"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-md bg-white/94 px-2.5 py-1 text-[11px] font-black text-[#1A1A16]">
                {pin.item.tag}
              </span>
            </div>

            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-black">{pin.item.price}</p>
                  <h3 className="mt-1 line-clamp-1 text-sm font-black">
                    {pin.item.title}
                  </h3>
                </div>

                {pin.item.verified ? (
                  <span className="rounded-md bg-[var(--trust-soft)] px-2 py-1 text-[10px] font-black text-[var(--trust-green)]">
                    Verified
                  </span>
                ) : null}
              </div>

              <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--muted)]">
                <MapPin size={13} />
                {pin.item.location}
              </p>

              <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3 text-xs font-bold text-[var(--muted)]">
                <span>{pin.item.beds} beds</span>
                <span>{pin.item.baths} baths</span>
                <span>{pin.item.type}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function ListingCard({ item }: { item: (typeof listings)[number] }) {
  return (
    <Link
      href={`/property/${item.slug}`}
      className="group block overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-1.5 transition hover:border-[var(--primary)]/50 dark:bg-[var(--surface)]"
    >
      <article>
        <div className="relative h-[180px] overflow-hidden rounded-[9px] bg-[var(--surface-soft)] sm:h-[200px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[11px] font-black text-[#1A1A16]">
            {item.tag}
          </div>

          <span
            aria-label="Save listing"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/92 text-[#1A1A16]"
          >
            <Heart size={16} />
          </span>
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
    </Link>
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
          <SearchFilters
            location={location}
            initialPurpose={params?.purpose ?? ""}
            initialPropertyType={params?.propertyType ?? ""}
            initialMaxPrice={params?.maxPrice ?? ""}
            initialBedrooms={params?.bedrooms ?? ""}
          />

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
