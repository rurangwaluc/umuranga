import { HomeHeroHeader } from "@/components/home-hero-header";
import { SearchFilters } from "@/components/search-filters";
import { SearchResultsShell } from "@/components/search-results-shell";

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

const navLinks = [
  { label: "Buy", href: "/search?purpose=buy" },
  { label: "Rent", href: "/search?purpose=rent" },
  { label: "Land", href: "/search?purpose=land" },
  { label: "Agents", href: "/agent" },
  { label: "Agencies", href: "/agency" },
];

const listings = [
  {
    images: [
      "/images/home/property-1.webp",
      "/images/home/featured-villa.webp",
      "/images/home/property-3.webp",
    ],
    image: "/images/home/property-1.webp",
    title: "Modern Luxury House with Pool",
    slug: "modern-luxury-house-with-pool",
    lat: -1.9436,
    lng: 30.1027,
    location: "Kigali, Nyarutarama",
    price: "RWF 2,400,000",
    beds: "3 beds",
    baths: "2 baths",
    area: "320 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For rent",
    href: "/property/modern-luxury-house-with-pool",
    verified: true,
    tag: "For rent",
  },
  {
    images: [
      "/images/home/property-2.webp",
      "/images/home/property-5.webp",
      "/images/home/property-6.webp",
    ],
    image: "/images/home/property-2.webp",
    title: "Bright Villa Near Nyarutarama",
    slug: "bright-villa-near-nyarutarama",
    lat: -1.9449,
    lng: 30.1048,
    location: "Nyarutarama, Kigali",
    price: "RWF 2,400,000",
    beds: "4 beds",
    baths: "3 baths",
    area: "410 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For sale",
    href: "/property/bright-villa-near-nyarutarama",
    verified: true,
    tag: "For sale",
  },
  {
    images: [
      "/images/home/property-3.webp",
      "/images/home/property-1.webp",
      "/images/home/property-2.webp",
    ],
    image: "/images/home/property-3.webp",
    title: "Modern Home at Dusk",
    slug: "modern-home-at-dusk",
    lat: -1.9356,
    lng: 30.0822,
    location: "Kacyiru, Kigali",
    price: "RWF 2,400,000",
    beds: "5 beds",
    baths: "4 baths",
    area: "460 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For sale",
    href: "/property/modern-home-at-dusk",
    verified: true,
    tag: "For sale",
  },
  {
    images: [
      "/images/home/property-4.webp",
      "/images/home/property-6.webp",
      "/images/home/property-5.webp",
    ],
    image: "/images/home/property-4.webp",
    title: "Waterfront Inspired Residence",
    slug: "waterfront-inspired-residence",
    lat: -1.9607,
    lng: 30.0714,
    location: "Lake view concept",
    price: "RWF 2,400,000",
    beds: "3 beds",
    baths: "2 baths",
    area: "285 sqm",
    extra: "Garden",
    status: "Verified",
    type: "For sale",
    href: "/property/waterfront-inspired-residence",
    verified: true,
    tag: "For sale",
  },
  {
    images: [
      "/images/home/property-5.webp",
      "/images/home/property-3.webp",
      "/images/home/property-1.webp",
    ],
    image: "/images/home/property-5.webp",
    title: "Family Home with Garden",
    slug: "family-home-with-garden",
    lat: -1.9298,
    lng: 30.1265,
    location: "Kibagabaga, Kigali",
    price: "RWF 2,400,000",
    beds: "4 beds",
    baths: "3 baths",
    area: "360 sqm",
    extra: "Garden",
    status: "Verified",
    type: "For rent",
    href: "/property/family-home-with-garden",
    verified: true,
    tag: "For rent",
  },
  {
    images: [
      "/images/home/property-6.webp",
      "/images/home/property-2.webp",
      "/images/home/property-4.webp",
    ],
    image: "/images/home/property-6.webp",
    title: "Premium Green Residence",
    slug: "premium-green-residence",
    lat: -1.9538,
    lng: 30.0921,
    location: "Kimihurura, Kigali",
    price: "RWF 2,400,000",
    beds: "5 beds",
    baths: "4 baths",
    area: "520 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For sale",
    href: "/property/premium-green-residence",
    verified: true,
    tag: "For sale",
  },
];

function formatPurpose(value: string | undefined) {
  if (value === "buy") return "For sale";
  if (value === "rent") return "For rent";
  if (value === "land") return "Land";

  return "All purposes";
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const purpose = formatPurpose(params?.purpose);
  const minPrice = formatPrice(params?.minPrice);
  const maxPrice = formatPrice(params?.maxPrice);
  const budgetLabel = buildBudgetLabel(minPrice, maxPrice);
  const location = params?.location || "Kigali, Rwanda";
  const propertyType = params?.propertyType || "All property";
  const bedrooms = params?.bedrooms || "Any beds";
  const resultItems = listings.concat(listings);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref="/login"
        listPropertyHref="/signup"
        userLabel="Sign in"
      />

      <section className="sticky top-[70px] z-40 border-b border-[var(--line)] bg-[var(--background)]/97 shadow-[0_10px_30px_rgba(7,21,47,0.04)] backdrop-blur-md sm:top-[80px] lg:top-[88px]">
        <div className="mx-auto w-full max-w-[1540px] px-4 py-2.5 sm:px-6 lg:px-8">
          <SearchFilters
            location={location}
            initialPurpose={params?.purpose ?? ""}
            initialPropertyType={params?.propertyType ?? ""}
            initialMaxPrice={params?.maxPrice ?? ""}
            initialBedrooms={params?.bedrooms ?? ""}
          />
        </div>
      </section>

      <SearchResultsShell
        listings={listings}
        resultItems={resultItems}
        location={location}
        purpose={purpose}
        propertyType={propertyType}
        budgetLabel={budgetLabel}
        bedrooms={bedrooms}
      />
    </main>
  );
}
