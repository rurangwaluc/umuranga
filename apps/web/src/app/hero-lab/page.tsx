import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  ChevronDown,
  Home,
  KeyRound,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { HeroLabHeader } from "@/components/hero-lab-header";


export default function HeroLabPage() {
  return (
    <main className="min-h-screen bg-white text-[#07152f] dark:bg-[#050505] dark:text-white">
      <HeroLabHeader />

      <section className="relative -mt-[92px] min-h-screen overflow-hidden bg-white dark:bg-[#050505] lg:-mt-[104px] xl:-mt-[112px]">
        <Image
          src="/images/home/hero-umuranga-premium.webp"
          alt="Modern hillside property in Rwanda"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] dark:brightness-[0.62] dark:saturate-[0.92] sm:object-[61%_center] lg:object-[64%_center]"
        />

        <div className="pointer-events-none absolute left-[-92px] top-[112px] h-[500px] w-[560px] bg-[radial-gradient(ellipse_at_48%_42%,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.94)_45%,rgba(255,255,255,0.56)_68%,rgba(255,255,255,0)_88%)] blur-[14px] dark:bg-[radial-gradient(ellipse_at_48%_42%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.66)_48%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0)_91%)] sm:left-[-28px] sm:w-[620px] lg:left-[58px] lg:top-[136px] lg:h-[475px] lg:w-[620px]" />


        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-92px)] max-w-[1540px] flex-col px-5 pb-8 pt-[138px] sm:px-8 sm:pt-[160px] lg:min-h-[calc(100vh-104px)] lg:px-16 lg:pb-14 lg:pt-[215px] xl:min-h-[calc(100vh-112px)] xl:px-[150px] xl:pt-[185px]">
          <div className="max-w-[590px]">
            <h1 className="max-w-[640px] text-[2.05rem] font-semibold leading-[1.06] tracking-[-0.055em] text-[#06142d] drop-shadow-[0_2px_10px_rgba(255,255,255,0.55)] dark:text-white dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] min-[390px]:text-[2.32rem] sm:text-[3.05rem] lg:text-[4rem]">
              Properties that fit your lifestyle in Rwanda.
            </h1>

            <p className="mt-4 max-w-[455px] text-[0.9rem] font-semibold leading-[1.55] text-[#10284f] drop-shadow-[0_2px_14px_rgba(255,255,255,0.96)] dark:text-white/88 dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] min-[390px]:text-[0.94rem] sm:mt-6 sm:text-[1.06rem] lg:mt-7 lg:max-w-[500px] lg:text-[1.13rem]">
              Homes, apartments, land, and commercial spaces with clearer
              listings, safer contacts, and a smoother process, all in one place.
            </p>
          </div>

          <div className="mt-7 w-full max-w-[1000px] rounded-[16px] border border-[#dce8f8] bg-white/92 p-3 text-[#07152f] shadow-[0_18px_55px_rgba(7,21,47,0.12)] backdrop-blur-xl dark:border-white/12 dark:bg-[#0A0A0A]/94 dark:text-white dark:shadow-none sm:p-5 lg:mt-[4.5rem] lg:rounded-[24px] lg:p-6">
            <div className="grid grid-cols-3 gap-2 sm:max-w-[430px] sm:gap-3">
              {[
                { label: "Buy", icon: Home, active: true },
                { label: "Rent", icon: KeyRound, active: false },
                { label: "Land", icon: Map, active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex h-[42px] items-center justify-center gap-2 rounded-[11px] text-[0.84rem] font-semibold transition sm:h-[50px] sm:gap-2.5 sm:rounded-[13px] sm:text-[0.95rem] ${
                    item.active
                      ? "bg-[#071f4d] text-white dark:bg-[#08285f]"
                      : "border border-[#e6edf7] bg-white text-[#344766] hover:bg-[#f6f9ff] dark:border-white/12 dark:bg-[#141414] dark:text-white/86 dark:hover:bg-[#1C1C1C]"
                  }`}
                >
                  <item.icon size={19} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:mt-7 lg:grid-cols-[1.35fr_0.92fr_1.05fr_0.68fr_auto]">
              <label>
                <span className="mb-2.5 block text-[0.78rem] font-black">
                  Location
                </span>
                <div className="flex h-[46px] items-center justify-between rounded-[11px] border border-[#dce8f8] bg-white px-4 text-[#6b7f9e] dark:border-white/12 dark:bg-[#111111] dark:text-white/62 sm:h-[50px] sm:rounded-[12px]">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <MapPin size={18} className="shrink-0 text-[#071f4d]" />
                    <span className="truncate text-xs font-semibold">
                      Where do you want to live?
                    </span>
                  </span>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label className="hidden sm:block">
                <span className="mb-2.5 block text-[0.78rem] font-black">
                  Property Type
                </span>
                <div className="flex h-[46px] items-center justify-between rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-black dark:border-white/12 dark:bg-[#111111] dark:text-white sm:h-[50px] sm:rounded-[12px]">
                  All Types
                  <ChevronDown size={16} className="text-[#6b7f9e]" />
                </div>
              </label>

              <label className="hidden sm:block">
                <span className="mb-2.5 block text-[0.78rem] font-black">
                  Budget (RWF)
                </span>
                <div className="grid h-[46px] grid-cols-[1fr_auto_1fr] items-center rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-semibold text-[#6b7f9e] dark:border-white/12 dark:bg-[#111111] dark:text-white/62 sm:h-[50px] sm:rounded-[12px]">
                  <span>Min Price</span>
                  <span className="px-3">-</span>
                  <span>Max Price</span>
                </div>
              </label>

              <label className="hidden sm:block">
                <span className="mb-2.5 block text-[0.78rem] font-black">
                  Bedrooms
                </span>
                <div className="flex h-[50px] items-center justify-between rounded-[12px] border border-[#dce8f8] bg-white px-4 text-xs font-black dark:border-white/12 dark:bg-[#111111] dark:text-white">
                  <span className="flex items-center gap-2">
                    <BedDouble size={17} />
                    Any
                  </span>
                  <ChevronDown size={16} className="text-[#6b7f9e]" />
                </div>
              </label>

              <button className="flex h-[48px] items-center justify-center gap-2.5 rounded-[12px] bg-[#071f4d] px-7 text-[0.95rem] font-semibold text-white transition hover:bg-[#061735] sm:col-span-2 sm:h-[50px] lg:col-span-1">
                <Search size={20} />
                Search
              </button>
            </div>

              <details className="group mt-4 sm:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black text-[#071f4d] transition hover:text-[#061735] dark:text-[#9bb4e8] dark:hover:text-white [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal size={17} />
                    Advanced search
                  </span>
                  <ChevronDown
                    size={16}
                    className="transition group-open:rotate-180"
                  />
                </summary>

                <div className="mt-4 grid gap-3 border-t border-[#dce8f8] pt-4 dark:border-white/12">
                  <label>
                    <span className="mb-2.5 block text-[0.78rem] font-black">
                      Property Type
                    </span>
                    <div className="flex h-[46px] items-center justify-between rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-black dark:border-white/12 dark:bg-[#111111] dark:text-white">
                      All Types
                      <ChevronDown size={16} className="text-[#6b7f9e]" />
                    </div>
                  </label>

                  <label>
                    <span className="mb-2.5 block text-[0.78rem] font-black">
                      Budget (RWF)
                    </span>
                    <div className="grid h-[46px] grid-cols-[1fr_auto_1fr] items-center rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-semibold text-[#6b7f9e] dark:border-white/12 dark:bg-[#111111] dark:text-white/62">
                      <span>Min Price</span>
                      <span className="px-3">-</span>
                      <span>Max Price</span>
                    </div>
                  </label>

                  <label>
                    <span className="mb-2.5 block text-[0.78rem] font-black">
                      Bedrooms
                    </span>
                    <div className="flex h-[46px] items-center justify-between rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-black dark:border-white/12 dark:bg-[#111111] dark:text-white">
                      <span className="flex items-center gap-2">
                        <BedDouble size={17} />
                        Any
                      </span>
                      <ChevronDown size={16} className="text-[#6b7f9e]" />
                    </div>
                  </label>
                </div>
              </details>

              <div className="mt-5 hidden justify-end sm:flex">
                <Link
                  href="/search?purpose=buy"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#071f4d] transition hover:text-[#061735] dark:text-[#9bb4e8] dark:hover:text-white"
                >
                  <SlidersHorizontal size={17} />
                  Advanced search
                </Link>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
