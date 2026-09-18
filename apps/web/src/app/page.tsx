import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { HeroSection } from "@/components/home-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";

const categories = [
  "All Type",
  "House",
  "Apartment",
  "Villa",
  "Duplex",
  "Land",
  "Commercial",
];

const propertyCards = [
  {
    image: "/images/home/property-1.webp",
    title: "Modern Luxury House with Pool",
    price: "RWF 2,400,000",
    location: "KG 12 Ave, Kigali, Rwanda",
    beds: "3 beds",
    baths: "2 bathrooms",
  },
  {
    image: "/images/home/property-2.webp",
    title: "Bright Villa Near Nyarutarama",
    price: "RWF 2,400,000",
    location: "Nyarutarama, Kigali",
    beds: "4 beds",
    baths: "3 bathrooms",
  },
  {
    image: "/images/home/property-3.webp",
    title: "Modern Home at Dusk",
    price: "RWF 2,400,000",
    location: "Kacyiru, Kigali",
    beds: "5 beds",
    baths: "4 bathrooms",
  },
  {
    image: "/images/home/property-4.webp",
    title: "Waterfront Inspired Residence",
    price: "RWF 2,400,000",
    location: "Lake view concept",
    beds: "3 beds",
    baths: "2 bathrooms",
  },
  {
    image: "/images/home/property-5.webp",
    title: "Family Home with Garden",
    price: "RWF 2,400,000",
    location: "Kibagabaga, Kigali",
    beds: "4 beds",
    baths: "3 bathrooms",
  },
  {
    image: "/images/home/property-6.webp",
    title: "Premium Green Residence",
    price: "RWF 2,400,000",
    location: "Kimihurura, Kigali",
    beds: "5 beds",
    baths: "4 bathrooms",
  },
];

const agents = [
  {
    image: "/images/home/agent-1.webp",
    name: "Alex Burden",
    role: "Residential Agent",
    location: "Kigali",
    focus: "Family homes",
  },
  {
    image: "/images/home/agent-2.webp",
    name: "Alen Cuber",
    role: "Property Advisor",
    location: "Gasabo",
    focus: "Rentals",
  },
  {
    image: "/images/home/agent-3.webp",
    name: "Sarah Mutesi",
    role: "Luxury Specialist",
    location: "Nyarutarama",
    focus: "Premium homes",
  },
];


const operatorCards = [
  {
    icon: BadgeCheck,
    title: "Landlords",
    label: "Verified owners",
  },
  {
    icon: Building2,
    title: "Agencies",
    label: "Managed teams",
  },
  {
    icon: UsersRound,
    title: "Agents",
    label: "Trusted operators",
  },
];


const managementCards = [
  {
    title: "Listings",
    text: "Publish, update, pause, and review property listings from one place.",
  },
  {
    title: "Tenants",
    text: "Keep tenant records, contacts, rent status, and property history organized.",
  },
  {
    title: "Rent payments",
    text: "Track expected rent, paid rent, unpaid balances, and payment follow-up.",
  },
  {
    title: "Maintenance",
    text: "Log requests, assign work, and keep owners or tenants updated faster.",
  },
];


function PropertyCard({ item }: { item: (typeof propertyCards)[number] }) {
  return (
    <article className="reveal-child rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-2 shadow-[0_18px_55px_rgba(7,21,47,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/35 hover:shadow-[0_24px_70px_rgba(7,21,47,0.1)] dark:shadow-none dark:hover:shadow-none">
      <div className="relative h-[220px] overflow-hidden rounded-[14px] bg-[var(--soft)] sm:h-[244px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />

        <div className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[11px] font-black text-[#07152f]">
          For Sale
        </div>
      </div>

      <div className="px-2 py-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-base font-semibold sm:text-lg">
            {item.price}
            <span className="text-xs text-[var(--muted)]">/month</span>
          </p>

          <button className="whitespace-nowrap rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-semibold transition hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white dark:hover:bg-[var(--primary)] dark:hover:text-white">
            View
          </button>
        </div>

        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          {item.location}
        </p>

        <div className="mt-3 flex items-center gap-4 border-t border-[var(--line)] pt-3 text-[11px] text-[var(--muted)]">
          <span className="inline-flex items-center gap-1">
            <BedDouble size={13} /> {item.beds}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath size={13} /> {item.baths}
          </span>
        </div>
      </div>
    </article>
  );
}


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="w-full">
        <HeroSection />

        <div className="mx-auto w-full max-w-[1420px] px-5 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-10 lg:pb-20 lg:pt-10 xl:px-12">

        <ScrollReveal className="mt-8 sm:mt-10" staggerChildren>
          <section id="properties">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Latest verified property
                </h2>
              </div>

              <Link
                href="/signup"
                className="w-fit whitespace-nowrap rounded-lg border border-[var(--line)] px-4 py-2 text-xs font-bold transition hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white dark:hover:bg-[var(--primary)] dark:hover:text-white"
              >
                See all
              </Link>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`min-h-10 shrink-0 rounded-[10px] px-4 py-2 text-xs font-bold transition ${
                    index === 0
                      ? "bg-[var(--primary)] text-white shadow-sm dark:bg-[var(--primary)] dark:text-white"
                      : "border border-[var(--line)] bg-[var(--soft)] text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {propertyCards.map((item) => (
                <PropertyCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-16 sm:mt-20" staggerChildren>
          <section
            id="management"
            className="border-t border-[var(--line)] pt-12 sm:pt-14 lg:pt-16"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="reveal-child">
                <h2 className="max-w-2xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                  Manage property without chasing people every day.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  UMURANGA helps owners, landlords, agencies, and property teams keep listings,
                  tenants, rent, and maintenance work organized.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex h-12 items-center justify-center rounded-[9px] bg-[var(--primary)] px-5 text-sm font-bold text-white transition hover:opacity-90 dark:border dark:border-white/14 dark:bg-[#071F4D] dark:text-white dark:hover:bg-[#0A2A66]"
                  >
                    List or manage property
                  </Link>
                  <Link
                    href="/search"
                    className="inline-flex h-12 items-center justify-center rounded-[9px] border border-[var(--line)] px-5 text-sm font-bold transition hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white dark:hover:border-white/18 dark:hover:bg-[#071F4D] dark:hover:text-white"
                  >
                    Search properties
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {managementCards.map((item) => (
                  <div
                    key={item.title}
                    className="reveal-child rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_14px_40px_rgba(7,21,47,0.045)] dark:shadow-none"
                  >
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>


        <ScrollReveal className="mt-16 sm:mt-20" staggerChildren>
          <section className="border-t border-[var(--line)] pt-14 sm:pt-16 lg:pt-20">
            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="reveal-child">

                <h2 className="max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                  Trust, verification, and cleaner property decisions.
                </h2>

                <div className="relative mt-7 h-[300px] overflow-hidden rounded-[20px] bg-[var(--soft)] sm:h-[360px] lg:h-[420px] xl:h-[460px]">
                  <Image
                    src="/images/home/brokerage-building.webp"
                    alt="Premium real estate network"
                    fill
                    sizes="(max-width: 1280px) 100vw, 42vw"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-4 bottom-4 rounded-[1.3rem] bg-black/45 p-4 text-white backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} />
                      <p className="text-sm font-semibold">
                        Verification before visibility
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/75">
                      Built for listings that can be trusted, reviewed, and
                      managed professionally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid content-start gap-5">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {operatorCards.map((item) => (
                    <div
                      key={item.title}
                      className="reveal-child rounded-[1.1rem] border border-[var(--line)] bg-[var(--card)] p-3 text-center shadow-[0_14px_40px_rgba(7,21,47,0.045)] transition dark:shadow-none sm:rounded-[1.35rem] sm:p-5 sm:text-left"
                    >
                      <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--card)] text-[var(--foreground)] sm:mx-0 sm:mb-5 sm:h-11 sm:w-11">
                        <item.icon size={17} />
                      </div>
                      <p className="text-sm font-semibold tracking-[-0.03em] sm:text-2xl sm:tracking-[-0.04em]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] font-medium leading-4 text-[var(--muted)] sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="reveal-child rounded-[22px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_70px_rgba(7,21,47,0.06)] dark:shadow-none sm:p-8 lg:p-10">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="max-w-2xl text-2xl font-medium leading-[1.12] tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                        Connecting verified listings with renters, buyers, owners, and operators.
                      </h3>
                    </div>

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white dark:border dark:border-white/14 dark:bg-[#071F4D] dark:text-white">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                    UMURANGA is built around verified actors, reviewed listings, clearer
                    property information, and faster next steps.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      "Verified owners and agents",
                      "Reviewed property listings",
                      "Clear contact and viewing steps",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[12px] border border-[var(--line)] bg-[var(--soft)] px-4 py-3 text-sm font-semibold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/signup"
                    className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition dark:border dark:border-white/14 dark:bg-[#071F4D] dark:text-white dark:hover:bg-[#0A2A66]"
                  >
                    Start with UMURANGA
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>


        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
