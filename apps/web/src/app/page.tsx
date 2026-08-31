import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  Mail,
  MapPin,
  Phone,
  Play,
  ShieldCheck,
  Star,
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

const projects = [
  {
    image: "/images/home/project-1.webp",
    title: "Modern Luxury House at Dusk",
  },
  {
    image: "/images/home/project-2.webp",
    title: "Modern Luxury House near Water",
  },
  {
    image: "/images/home/project-3.webp",
    title: "Modern Luxury House with Pool",
  },
  {
    image: "/images/home/project-1.webp",
    title: "Private Green Residence in Kigali",
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

const smartSearchPoints = [
  "Type it or say it",
  "Budget + amenities",
  "Multiple neighborhoods",
  "Near work, schools, transit",
];

function PropertyCard({ item }: { item: (typeof propertyCards)[number] }) {
  return (
    <article className="reveal-child rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-1.5 transition duration-200 hover:border-[var(--primary)]/35">
      <div className="relative h-[220px] overflow-hidden rounded-[10px] bg-[var(--soft)] sm:h-[240px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />

        <div className="absolute left-3 top-3 rounded-md bg-white/92 px-2.5 py-1 text-[11px] font-black text-[#1e1f1c]">
          For Sale
        </div>
      </div>

      <div className="px-2 py-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-base font-semibold sm:text-lg">
            {item.price}
            <span className="text-xs text-[var(--muted)]">/month</span>
          </p>

          <button className="whitespace-nowrap rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-semibold transition hover:bg-[#1e1f1c] hover:text-white dark:hover:bg-[#f4efe3] dark:hover:text-[#1e1f1c]">
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

        <div className="mx-auto w-full max-w-[1480px] px-5 py-[4.5rem] sm:px-8 sm:py-[5.5rem] lg:px-10 lg:py-24 xl:px-12">
        <ScrollReveal staggerChildren>
          <section>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <h2 className="max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-0.055em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Property search should feel clear before you make a call.
              </h2>

              <div className="flex items-center gap-4 lg:justify-end">
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-[14px] bg-[var(--soft)] sm:h-24 sm:w-40">
                  <Image
                    src="/images/home/easy-calendar.webp"
                    alt="Property preview"
                    fill
                    sizes="160px"
                    className="object-cover object-center"
                  />
                  <button className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1e1f1c] shadow-lg transition hover:opacity-90">
                    <Play size={18} className="ml-0.5 fill-[#1e1f1c]" />
                  </button>
                </div>

                <p className="max-w-sm text-base leading-7 text-[var(--muted)] sm:text-lg">
                  Clear photos, location context, pricing, and contact steps in one place.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.42fr_0.68fr_0.68fr] lg:items-stretch">
              <div className="reveal-child relative min-h-[360px] overflow-hidden rounded-[22px] bg-[var(--soft)] sm:min-h-[430px] lg:min-h-[520px]">
                <Image
                  src="/images/home/easy-search.webp"
                  alt="Premium modern home exterior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />

                <div className="absolute bottom-5 right-5 flex items-center rounded-full bg-white px-2 py-2 shadow-xl">
                  {[
                    "/images/home/property-1.webp",
                    "/images/home/property-2.webp",
                    "/images/home/property-3.webp",
                  ].map((image, index) => (
                    <div
                      key={image}
                      className="-ml-1 first:ml-0 rounded-full border-4 border-white bg-white"
                    >
                      <div
                        className={`relative h-12 w-12 overflow-hidden rounded-full ${
                          index === 0 ? "ring-4 ring-[#b8d879]" : ""
                        }`}
                      >
                        <Image
                          src={image}
                          alt="Property thumbnail"
                          fill
                          sizes="48px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-child flex min-h-[320px] flex-col items-center justify-center rounded-[22px] bg-[var(--soft)] px-6 py-10 text-center lg:min-h-[520px]">
                <h3 className="max-w-xs text-3xl font-normal leading-[1.05] tracking-[-0.045em] text-[var(--foreground)] sm:text-4xl">
                  Small details decide whether a property feels right.
                </h3>

                <p className="mt-8 max-w-xs text-base leading-7 text-[var(--muted)]">
                  Compare space, price, location, and condition before you waste time on a visit.
                </p>

                <Link
                  href="/signup"
                  className="mt-9 whitespace-nowrap rounded-lg border border-[var(--line)] bg-[var(--card)] px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:bg-[#1e1f1c] hover:text-white dark:hover:bg-[#f4efe3] dark:hover:text-[#1e1f1c]"
                >
                  Details
                </Link>
              </div>

              <div className="reveal-child flex min-h-[320px] flex-col rounded-[22px] bg-[var(--soft)] p-3 lg:min-h-[520px]">
                <div className="relative h-56 overflow-hidden rounded-[16px] bg-[var(--card)] sm:h-72 lg:h-64">
                  <Image
                    src="/images/home/easy-payment.webp"
                    alt="Modern compact property"
                    fill
                    sizes="(max-width: 1024px) 100vw, 24vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
                  <p className="text-2xl font-normal tracking-[-0.035em] text-[var(--muted)]">
                    Example budget from{" "}
                    <span className="font-semibold text-[var(--foreground)]">
                      RWF 256M
                    </span>
                  </p>

                  <Link
                    href="/signup"
                    className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#1e1f1c] px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90 dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
                  >
                    Explore Properties
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-20 sm:mt-24" staggerChildren>
          <section id="properties">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                  Verified listings
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Latest verified property
                </h2>
              </div>

              <Link
                href="/signup"
                className="w-fit whitespace-nowrap rounded-lg border border-[var(--line)] px-4 py-2 text-xs font-bold transition hover:bg-[#1e1f1c] hover:text-white dark:hover:bg-[#f4efe3] dark:hover:text-[#1e1f1c]"
              >
                See all
              </Link>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`min-h-10 shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    index === 0
                      ? "bg-[#1e1f1c] text-white shadow-sm dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
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

        <ScrollReveal className="mt-24 sm:mt-28" staggerChildren>
          <section className="border-t border-[var(--line)] pt-14 sm:pt-16 lg:pt-20">
            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="reveal-child">
                <p className="mb-5 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                  Property trust layer
                </p>

                <h2 className="max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                  A curated real estate layer for Rwanda&apos;s serious property
                  market.
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
                      className="reveal-child rounded-[1.1rem] border border-[var(--line)] bg-[var(--soft)] p-3 text-center transition sm:rounded-[1.5rem] sm:p-5 sm:text-left"
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

                <div className="reveal-child rounded-[20px] border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 lg:p-10">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="mb-3 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                        How UMURANGA helps
                      </p>
                      <h3 className="max-w-2xl text-2xl font-medium leading-[1.12] tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                        Connecting verified listings with renters, buyers, owners, and operators.
                      </h3>
                    </div>

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1e1f1c] text-white dark:bg-[#f4efe3] dark:text-[#1e1f1c]">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                    UMURANGA is being built to make property discovery clearer: reviewed
                    actors, better listing media, availability signals, and cleaner
                    customer actions.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      "Profile approval",
                      "Listing quality control",
                      "Customer-ready discovery",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-4 py-3 text-sm font-semibold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/signup"
                    className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1e1f1c] px-6 py-3 text-sm font-bold text-white transition dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
                  >
                    Start searching
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-24 sm:mt-28" staggerChildren>
          <section
            id="agents"
            className="border-t border-[var(--line)] pt-14 sm:pt-16 lg:pt-20"
          >
            <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-stretch">
              <div className="reveal-child overflow-hidden rounded-[20px] bg-[var(--soft)] p-5 sm:p-7 lg:p-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <p className="inline-flex rounded-full bg-[var(--card)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                    Advisor access
                  </p>

                  <div className="hidden items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 text-xs font-bold text-[var(--muted)] sm:flex">
                    <BadgeCheck size={14} />
                    Verified advisor
                  </div>
                </div>

                <h3 className="max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-3xl lg:text-4xl">
                  Work with people who understand Rwanda’s property market.
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  Get help from verified advisors who understand location, availability,
                  negotiation, and the details that protect your time.
                </p>

                <div className="relative mt-8 h-[340px] overflow-hidden rounded-[18px] bg-[var(--card)] sm:h-[420px] lg:h-[500px]">
                  <Image
                    src="/images/home/agent-1.webp"
                    alt="Verified UMURANGA property advisor"
                    fill
                    sizes="(max-width: 1280px) 100vw, 42vw"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] bg-black/45 p-4 text-white backdrop-blur-md">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold">Alex Burden</p>
                        <p className="mt-1 text-xs text-white/70">
                          Residential Agent • Kigali
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href="/signup"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1e1f1c] transition hover:opacity-90"
                          aria-label="Call agent"
                        >
                          <Phone size={16} />
                        </Link>
                        <Link
                          href="/signup"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#b8d879] text-[#1e1f1c] transition hover:opacity-90"
                          aria-label="Email agent"
                        >
                          <Mail size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-child flex flex-col justify-between">
                <div>
                  <p className="mb-5 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                    Verified advisors
                  </p>

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                        Contact verified property advisors.
                      </h2>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                        Every advisor shown here should help with clearer answers, faster
                        coordination, and better property context.
                      </p>
                    </div>

                    <Link
                      href="/signup"
                      className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[#1e1f1c] px-6 py-3 text-sm font-bold text-white transition dark:bg-[#f4efe3] dark:text-[#1e1f1c]"
                    >
                      View advisors
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-9 grid gap-4 sm:grid-cols-3">
                    {agents.map((agent) => (
                      <article
                        key={agent.name}
                        className="reveal-child group overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--soft)] p-1.5 transition duration-200 hover:border-[var(--primary)]/35"
                      >
                        <div className="relative h-[250px] overflow-hidden rounded-[12px] bg-[var(--card)] sm:h-[280px] xl:h-[290px]">
                          <Image
                            src={agent.image}
                            alt={agent.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 22vw"
                            className="object-cover object-center transition duration-500"
                          />

                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#1e1f1c]">
                            {agent.location}
                          </div>
                        </div>

                        <div className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base font-semibold tracking-[-0.02em]">
                                {agent.name}
                              </h3>
                              <p className="mt-1 text-xs text-[var(--muted)]">
                                {agent.role}
                              </p>
                            </div>

                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card)]">
                              <ArrowRight size={15} />
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={13} />
                              {agent.focus}
                            </span>
                            <span className="font-semibold text-[var(--foreground)]">
                              Verified
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Fast response", "Cleaner viewing coordination"],
                    ["Verified profile", "No anonymous representation"],
                    ["Local context", "Area, price, and availability guidance"],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-[14px] border border-[var(--line)] bg-[var(--soft)] p-5"
                    >
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-20 sm:mt-24" staggerChildren>
          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-bold text-[var(--muted)]">
                  Property highlights
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Verified Property Highlights
                </h2>
              </div>

              <Link
                href="/signup"
                className="w-fit whitespace-nowrap rounded-lg border border-[var(--line)] px-4 py-2 text-xs font-bold transition hover:bg-[#1e1f1c] hover:text-white dark:hover:bg-[#f4efe3] dark:hover:text-[#1e1f1c]"
              >
                View properties
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="reveal-child overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-1.5 transition hover:border-[var(--primary)]/35 sm:rounded-[14px]"
                >
                  <div className="relative h-[160px] overflow-hidden rounded-[10px] bg-[var(--soft)] sm:h-[210px] lg:h-[230px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-2 sm:p-3">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-xs font-semibold leading-4 sm:text-sm sm:leading-5">
                        {project.title}
                      </h3>
                      <span className="hidden shrink-0 items-center gap-1 text-xs sm:inline-flex">
                        <Star
                          size={13}
                          className="fill-[#d2ad63] text-[#d2ad63]"
                        />{" "}
                        4.58
                      </span>
                    </div>

                    <p className="text-[10px] leading-4 text-[var(--muted)] sm:text-xs">
                      4 bedrooms • 4 bathrooms • premium
                    </p>

                    <div className="mt-3 flex flex-col gap-2 border-t border-[var(--line)] pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-semibold sm:text-sm">
                        RWF 149,000
                        <span className="text-[10px] text-[var(--muted)]">
                          {" "}
                          / night
                        </span>
                      </p>
                      <button className="w-full whitespace-nowrap rounded-md border border-[var(--line)] px-3 py-1.5 text-[11px] font-semibold transition hover:bg-[#1e1f1c] hover:text-white dark:hover:bg-[#f4efe3] dark:hover:text-[#1e1f1c] sm:w-auto">
                        Book
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}