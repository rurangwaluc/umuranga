"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  BedDouble,
  Check,
  ChevronDown,
  CirclePlus,
  Home,
  KeyRound,
  Map,
  MapPin,
  Mic,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { getPostLoginPath, useAuthUser } from "@/lib/auth";

const navLinks = [
  { label: "Buy", href: "#properties" },
  { label: "Rent", href: "#properties" },
  { label: "Land", href: "#properties" },
  { label: "Agents", href: "#agents" },
  { label: "Agencies", href: "#agencies" },
  { label: "How it works", href: "#how-it-works" },
];

const searchTabs = [
  { label: "Buy", icon: Home },
  { label: "Rent", icon: KeyRound },
  { label: "Land", icon: Map },
] as const;

const propertyTypes = [
  "All Types",
  "House",
  "Apartment",
  "Villa",
  "Land / Plot",
  "Commercial",
  "Short Stay",
];

const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];


const smartTags = [
  "Budget + amenities",
  "Multiple neighborhoods",
  "Near work or school",
];

const advancedSections = [
  {
    title: "Trust",
    options: ["Verified owner", "Verified agent", "Clear documents", "Photos verified"],
  },
  {
    title: "Location",
    options: ["Near school", "Near work", "Near main road", "Quiet area"],
  },
  {
    title: "Comfort",
    options: ["Parking", "Garden", "Furnished", "Balcony"],
  },
  {
    title: "Viewing",
    options: ["Available now", "Flexible viewing", "Video tour", "Negotiable price"],
  },
];

const trustAvatars = [
  "/images/home/agent-1.webp",
  "/images/home/agent-2.webp",
  "/images/home/agent-3.webp",
  "/images/home/property-1.webp",
];


type SearchMode = (typeof searchTabs)[number]["label"];

type SearchState = {
  mode: SearchMode;
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  smartQuery: string;
  advanced: string[];
};

const initialSearchState: SearchState = {
  mode: "Buy",
  location: "",
  propertyType: "All Types",
  minPrice: "",
  maxPrice: "",
  bedrooms: "Any",
  smartQuery: "",
  advanced: [],
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionResultEventLike = {
  results: ArrayLike<{
    0?: {
      transcript?: string;
    };
  }>;
};

type VoiceWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;

  const voiceWindow = window as VoiceWindow;

  return (
    voiceWindow.SpeechRecognition ??
    voiceWindow.webkitSpeechRecognition ??
    null
  );
}

function SearchField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2.5 block text-sm font-black text-[var(--foreground)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function SelectInput({
  icon,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <span className="relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]">
        {icon}
      </span>

      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[54px] w-full appearance-none rounded-md border border-[var(--border)] bg-[var(--surface)] ${
          icon ? "pl-12" : "pl-4"
        } pr-11 text-sm font-bold text-[var(--foreground)] outline-none transition duration-200 hover:border-[var(--accent-gold)]/50 focus:border-[var(--accent-gold)] dark:bg-[var(--surface-soft)]`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
      />
    </span>
  );
}

function TextInput({
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  ariaLabel,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
  ariaLabel: string;
}) {
  return (
    <span className="relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]">
        {icon}
      </span>

      <input
        aria-label={ariaLabel}
        type={type}
        value={value}
        min={type === "number" ? "0" : undefined}
        inputMode={type === "number" ? "numeric" : undefined}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[54px] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] ${
          icon ? "pl-12" : "pl-4"
        } pr-4 text-sm font-bold text-[var(--foreground)] outline-none transition duration-200 placeholder:text-[var(--muted)] hover:border-[var(--accent-gold)]/50 focus:border-[var(--accent-gold)] dark:bg-[var(--surface-soft)]`}
      />
    </span>
  );
}

function BudgetInputs({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}) {
  return (
    <div className="grid h-[54px] grid-cols-[1fr_auto_1fr] items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-bold text-[var(--muted)] dark:bg-[var(--surface-soft)]">
      <input
        aria-label="Minimum price"
        type="number"
        min="0"
        inputMode="numeric"
        value={minPrice}
        placeholder="Min Price"
        onChange={(event) => onMinChange(event.target.value)}
        className="min-w-0 bg-transparent text-sm font-bold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
      />
      <span className="px-3 text-[var(--muted)]">-</span>
      <input
        aria-label="Maximum price"
        type="number"
        min="0"
        inputMode="numeric"
        value={maxPrice}
        placeholder="Max Price"
        onChange={(event) => onMaxChange(event.target.value)}
        className="min-w-0 bg-transparent text-sm font-bold text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
      />
    </div>
  );
}


function MobileAdvancedSearchPortal({
  search,
  openAdvancedSection,
  setOpenAdvancedSection,
  toggleAdvancedOption,
  clearAdvancedOptions,
  onClose,
}: {
  search: SearchState;
  openAdvancedSection: string;
  setOpenAdvancedSection: (section: string) => void;
  toggleAdvancedOption: (option: string) => void;
  clearAdvancedOptions: () => void;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex w-full max-w-full items-center justify-center overflow-hidden bg-black/58 p-3 lg:hidden">
      <button
        type="button"
        aria-label="Close advanced search"
        onClick={onClose}
        className="absolute inset-0"
      />

      <section className="relative w-full min-w-0 max-w-[420px] overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
          <div className="min-w-0">
            <p className="text-base font-black">Advanced search</p>
            <p className="mt-1 text-xs font-semibold text-[var(--muted)]">
              {search.advanced.length} selected
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft)]"
            aria-label="Close advanced search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[66dvh] overflow-y-auto">
          <div className="border-b border-[var(--line)] bg-[var(--soft)] px-3 py-3">
            <div className="grid grid-cols-2 gap-2">
              {advancedSections.map((section) => {
                const selectedCount = section.options.filter((option) =>
                  search.advanced.includes(option)
                ).length;
                const active = openAdvancedSection === section.title;

                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setOpenAdvancedSection(section.title)}
                    className={`flex h-10 min-w-0 items-center justify-between gap-2 rounded-md border px-3 text-xs font-black transition ${
                      active
                        ? "border-[var(--trust-green)] bg-[var(--trust-soft)] text-[var(--trust-green)]"
                        : "border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] dark:bg-[var(--surface-soft)]"
                    }`}
                  >
                    <span className="min-w-0 truncate">{section.title}</span>

                    {selectedCount > 0 ? (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black ${
                          active
                            ? "bg-[var(--trust-green)] text-[var(--trust-soft)]"
                            : "bg-[var(--trust-soft)] text-[var(--trust-green)]"
                        }`}
                      >
                        {selectedCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            {advancedSections.map((section) =>
              openAdvancedSection === section.title ? (
                <div key={section.title} className="grid gap-2 min-[380px]:grid-cols-2">
                  {section.options.map((option) => {
                    const active = search.advanced.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleAdvancedOption(option)}
                        className={`flex min-h-12 items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm font-black transition ${
                          active
                            ? "border-[var(--trust-green)] bg-[var(--trust-soft)] text-[var(--trust-green)]"
                            : "border-[var(--line)] bg-[var(--soft)] text-[var(--foreground)] dark:bg-[var(--surface-soft)]"
                        }`}
                      >
                        <span className="min-w-0 truncate">{option}</span>

                        {active ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--trust-green)] text-[var(--trust-soft)]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="h-5 w-5 shrink-0 rounded-full border border-[var(--line)] bg-[var(--card)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--soft)] px-4 py-3">
          {search.advanced.length > 0 ? (
            <button
              type="button"
              onClick={clearAdvancedOptions}
              className="h-10 rounded-full border border-[var(--line)] px-4 text-xs font-black"
            >
              Clear
            </button>
          ) : (
            <span className="text-xs font-semibold text-[var(--muted)]">
              No filters
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full bg-[var(--cta)] px-6 text-xs font-black text-[var(--cta-text)]"
          >
            Apply filters
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}


export function HeroSection() {
  const router = useRouter();
  const user = useAuthUser();

  const [search, setSearch] = useState<SearchState>(initialSearchState);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [openAdvancedSection, setOpenAdvancedSection] = useState("Trust");
  const [searchMessage, setSearchMessage] = useState("");
  const [voiceListening, setVoiceListening] = useState(false);

  useEffect(() => {
    if (!advancedOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [advancedOpen]);

  const dashboardHref = user ? getPostLoginPath(user) : "/login";
  const listPropertyHref = user
    ? user.userType === "landlord" ||
      user.userType === "agency" ||
      user.userType === "agent"
      ? getPostLoginPath(user)
      : "/onboarding?role=landlord"
    : "/signup?role=landlord";

  function updateSearch<Key extends keyof SearchState>(
    key: Key,
    value: SearchState[Key]
  ) {
    setSearch((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleAdvancedOption(option: string) {
    setSearch((current) => {
      const exists = current.advanced.includes(option);

      return {
        ...current,
        advanced: exists
          ? current.advanced.filter((item) => item !== option)
          : [...current.advanced, option],
      };
    });
  }


  function clearAdvancedOptions() {
    setSearch((current) => ({
      ...current,
      advanced: [],
    }));
  }

  function handleVoiceIdea() {
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      setSearch((current) => ({
        ...current,
        smartQuery:
          current.smartQuery ||
          "3 bedrooms near work, under 800k, close to school",
        bedrooms: current.bedrooms === "Any" ? "3+" : current.bedrooms,
        maxPrice: current.maxPrice || "800000",
      }));

      setSearchMessage(
        "Voice search is not available in this browser yet. We filled an example smart search instead."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        setSearchMessage("We could not hear a clear property request. Try again.");
        return;
      }

      setSearch((current) => ({
        ...current,
        smartQuery: transcript,
      }));

      setSearchMessage(
        "Voice search captured your request. Review it, then search properties."
      );
    };

    recognition.onerror = () => {
      setSearchMessage(
        "Voice search could not start. You can still type your smart search."
      );
    };

    recognition.onend = () => {
      setVoiceListening(false);
    };

    setVoiceListening(true);
    setSearchMessage("Listening... say the kind of property you want.");

    recognition.start();
  }

  function goToSearch() {
    const min = Number(search.minPrice || 0);
    const max = Number(search.maxPrice || 0);

    if (min > 0 && max > 0 && min > max) {
      setSearchMessage("Minimum price cannot be higher than maximum price.");
      return;
    }

    const params = new URLSearchParams();

    params.set("purpose", search.mode.toLowerCase());

    if (search.location.trim()) {
      params.set("location", search.location.trim());
    }

    if (search.propertyType !== "All Types") {
      params.set("propertyType", search.propertyType);
    }

    if (search.minPrice) {
      params.set("minPrice", search.minPrice);
    }

    if (search.maxPrice) {
      params.set("maxPrice", search.maxPrice);
    }

    if (search.bedrooms !== "Any") {
      params.set("bedrooms", search.bedrooms);
    }

    if (search.smartQuery.trim()) {
      params.set("q", search.smartQuery.trim());
    }

    if (search.advanced.length > 0) {
      params.set("features", search.advanced.join(","));
    }

    router.push(`/search?${params.toString()}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToSearch();
  }

  return (
    <section
      className={`relative isolate w-full max-w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] ${
        advancedOpen ? "z-[2147483646]" : "z-0"
      }`}
    >
      <header className="relative z-30 flex min-h-[76px] w-full max-w-full items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--background)] px-5 text-[var(--foreground)] sm:min-h-[82px] sm:px-8 lg:px-12 xl:px-14">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--primary)] dark:text-[var(--accent-gold)]">
            <span className="absolute h-8 w-8 rotate-45 rounded-[0.6rem] border-[4px] border-current" />
            <span className="absolute h-4 w-4 rotate-45 rounded-[0.3rem] border-[3px] border-current bg-[var(--surface)]" />
          </span>

          <span>
            <span className="block text-[0.95rem] font-black leading-none tracking-[0.13em] sm:text-[1.2rem] lg:text-[1.32rem]">
              UMURANGA
            </span>
            <span className="mt-1.5 block text-[8px] font-black uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[9px]">
              Real Estate
            </span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-9 text-sm font-bold xl:flex 2xl:gap-11">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition duration-200 hover:text-[var(--accent-gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href={listPropertyHref}
            className="hidden h-10 items-center gap-2 rounded-md border border-[var(--line)] bg-transparent px-4 text-sm font-black text-[var(--primary)] transition duration-200 hover:border-[var(--primary)] dark:text-[var(--accent-gold)] lg:inline-flex"
          >
            <CirclePlus size={20} />
            List property
          </Link>

          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          <Link
            href={dashboardHref}
            className="hidden h-10 items-center gap-2 rounded-md bg-[var(--cta)] px-5 text-sm font-black text-[var(--cta-text)] transition duration-200 hover:opacity-90 lg:inline-flex"
          >
            <UserRound size={20} />
            {user ? "Dashboard" : "Sign in"}
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </header>

      <div className="relative min-h-[590px] w-full max-w-full overflow-hidden sm:min-h-[630px] lg:min-h-[650px]">
        <div className="absolute inset-0 bg-[var(--background)]" />

        <div className="absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden lg:block">
          <Image
            src="/images/home/property-3.webp"
            alt="Premium property in Rwanda"
            fill
            priority
            sizes="52vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,rgba(244,239,230,0.22)_16%,rgba(244,239,230,0)_48%)] dark:bg-[linear-gradient(90deg,var(--background)_0%,rgba(17,16,13,0.34)_18%,rgba(17,16,13,0)_52%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,239,230,0.08)_0%,rgba(244,239,230,0)_42%,var(--background)_100%)] dark:bg-[linear-gradient(180deg,rgba(17,16,13,0.08)_0%,rgba(17,16,13,0)_42%,var(--background)_100%)]" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,var(--background)_44%,rgba(244,239,230,0.10)_61%,rgba(244,239,230,0)_100%)] dark:bg-[linear-gradient(90deg,var(--background)_0%,rgba(17,16,13,0.96)_38%,rgba(17,16,13,0.70)_56%,rgba(17,16,13,0.10)_78%,rgba(17,16,13,0)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[590px] w-full max-w-[1440px] flex-col justify-center overflow-hidden px-5 py-10 sm:min-h-[630px] sm:px-8 lg:min-h-[650px] lg:px-12 xl:px-14">
          <div className="max-w-6xl">

            <h1 className="font-premium-display max-w-3xl text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.045em] text-[var(--text)] dark:text-[var(--text)] sm:text-[3.85rem] lg:text-[4.55rem] xl:text-[5rem]">
              Search verified property across{" "}
              <span className="font-semibold italic text-[var(--accent-gold)]">
                Rwanda
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[var(--text)]/76 dark:text-[var(--text)]/80 sm:text-lg sm:leading-8">
              Homes, apartments, land, and commercial spaces with clearer listings,
              safer contact, and a process built for the local market.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-[1080px] overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--foreground)] shadow-[0_14px_38px_rgba(58,42,29,0.09)] dark:border-[#4A4032] dark:bg-[#1F1B15] dark:shadow-[0_18px_46px_rgba(0,0,0,0.38)] sm:p-5 lg:p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="grid min-w-0 grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                {searchTabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => updateSearch("mode", tab.label)}
                    className={`inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-black transition duration-200 sm:h-10 sm:min-w-[108px] sm:px-4 sm:text-sm ${
                      search.mode === tab.label
                        ? "bg-[var(--primary)] text-white dark:bg-[var(--primary)] dark:text-[var(--cta-text)]"
                        : "bg-transparent text-[var(--muted)] ring-1 ring-inset ring-[var(--border)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <tab.icon size={19} />
                    {tab.label}
                  </button>
                ))}
              </div>

            </div>

            <div className="mt-4 grid min-w-0 grid-flow-dense grid-cols-2 gap-3 lg:grid-cols-[1.25fr_0.9fr_1.12fr_0.58fr_0.82fr] lg:items-end">
              <SearchField label="Location" className="col-span-2 lg:col-span-1">
                <TextInput
                  icon={<MapPin size={19} />}
                  value={search.location}
                  onChange={(value) => updateSearch("location", value)}
                  placeholder="Kigali, Kinyinya, Nyarutarama..."
                  ariaLabel="Location"
                />
              </SearchField>

              <SearchField label="Property Type">
                <SelectInput
                  value={search.propertyType}
                  onChange={(value) => updateSearch("propertyType", value)}
                  options={propertyTypes}
                  ariaLabel="Property type"
                />
              </SearchField>

              <SearchField label="Budget (RWF)" className="col-span-2 lg:col-span-1">
                <BudgetInputs
                  minPrice={search.minPrice}
                  maxPrice={search.maxPrice}
                  onMinChange={(value) => updateSearch("minPrice", value)}
                  onMaxChange={(value) => updateSearch("maxPrice", value)}
                />
              </SearchField>

              <SearchField label="Bedrooms">
                <SelectInput
                  icon={<BedDouble size={19} />}
                  value={search.bedrooms}
                  onChange={(value) => updateSearch("bedrooms", value)}
                  options={bedroomOptions}
                  ariaLabel="Bedrooms"
                />
              </SearchField>

              <button
                type="submit"
                className="col-span-2 flex h-[54px] items-center justify-center gap-3 rounded-md bg-[var(--cta)] px-5 text-sm font-black text-[var(--cta-text)] transition duration-200 hover:opacity-90 sm:text-base lg:col-span-1"
              >
                <Search size={21} />
                <span className="sm:hidden">Search</span>
                <span className="hidden sm:inline">Search Properties</span>
              </button>
            </div>

            <div className="mt-3 rounded-[14px] border border-[var(--border)] bg-transparent p-3 dark:border-[#3E352A] dark:bg-[#181510]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={handleVoiceIdea}
                    disabled={voiceListening}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--cta)] text-[var(--cta-text)] transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
                    aria-label={
                      voiceListening
                        ? "Listening for voice search"
                        : "Start voice search"
                    }
                  >
                    <Mic
                      size={17}
                      className={voiceListening ? "animate-pulse" : ""}
                    />
                  </button>

                  <input
                    aria-label="Smart search"
                    value={search.smartQuery}
                    onChange={(event) =>
                      updateSearch("smartQuery", event.target.value)
                    }
                    placeholder='Example: "3 bedrooms under 800k near school"'
                    className="min-w-0 flex-1 bg-transparent text-sm font-bold leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                  />
                </div>

                <div className="hidden flex-wrap gap-2 md:flex">
                  {smartTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border)] bg-transparent px-2.5 py-1.5 text-xs font-black text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {search.advanced.length > 0 && !advancedOpen ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {search.advanced.slice(0, 8).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAdvancedOption(option)}
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--trust-soft)] px-3 py-2 text-xs font-black text-[var(--trust-green)] transition hover:opacity-90"
                  >
                    {option}
                    <span aria-hidden="true">×</span>
                  </button>
                ))}

                {search.advanced.length > 8 ? (
                  <span className="rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-black text-[var(--muted)]">
                    +{search.advanced.length - 8} more
                  </span>
                ) : null}
              </div>
            ) : null}

            {searchMessage ? (
              <div
                className="mt-4 rounded-[16px] border border-[var(--border)] bg-transparent px-4 py-3 text-sm font-bold text-[var(--muted)]"
                aria-live="polite"
              >
                {searchMessage}
              </div>
            ) : null}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setAdvancedOpen((current) => !current)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-4 text-sm font-black text-[var(--primary)] transition hover:border-[var(--primary)] md:w-auto dark:text-[var(--accent-gold)] dark:hover:border-[var(--accent-gold)]"
              >
                <SlidersHorizontal size={18} />
                {advancedOpen
                  ? "Hide filters"
                  : search.advanced.length > 0
                    ? `Filters (${search.advanced.length})`
                    : "Filters"}
              </button>
            </div>
            {advancedOpen ? (
              <>
                <div className="mt-5 hidden w-full max-w-full overflow-hidden rounded-[1.45rem] border border-[var(--line)] bg-[var(--card)] shadow-[0_18px_55px_rgba(0,0,0,0.10)] dark:bg-[var(--surface)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.32)] lg:block">
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--trust-soft)] text-[var(--trust-green)]">
                        <SlidersHorizontal size={16} />
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-black text-[var(--foreground)]">
                          Advanced search
                        </p>
                        <p className="truncate text-xs font-semibold text-[var(--muted)]">
                          Add only the filters that change the result.
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-[var(--soft)] px-3 py-1.5 text-[11px] font-black text-[var(--muted)]">
                      {search.advanced.length} selected
                    </span>
                  </div>

                  <div className="divide-y divide-[var(--line)]">
                    {advancedSections.map((section) => (
                      <div
                        key={section.title}
                        className="grid gap-3 px-4 py-3 sm:grid-cols-[120px_1fr] sm:items-center"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                          {section.title}
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                          {section.options.map((option) => {
                            const active = search.advanced.includes(option);

                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleAdvancedOption(option)}
                                className={`flex min-h-11 items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm font-black transition duration-200 ${
                                  active
                                    ? "border-[var(--trust-green)] bg-[var(--trust-soft)] text-[var(--trust-green)]"
                                    : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)] hover:border-[var(--accent-gold)]/55"
                                }`}
                              >
                                <span className="min-w-0 truncate">{option}</span>

                                {active ? (
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--trust-green)] text-[var(--trust-soft)]">
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                ) : (
                                  <span className="h-5 w-5 shrink-0 rounded-full border border-[var(--line)] bg-[var(--card)] dark:bg-[var(--surface)]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--soft)] px-4 py-3">
                    {search.advanced.length > 0 ? (
                      <button
                        type="button"
                        onClick={clearAdvancedOptions}
                        className="h-9 rounded-full border border-[var(--line)] px-4 text-xs font-black text-[var(--foreground)] transition hover:bg-[var(--card)]"
                      >
                        Clear
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-[var(--muted)]">
                        No filters selected
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setAdvancedOpen(false)}
                      className="h-9 rounded-md bg-[var(--foreground)] px-5 text-xs font-black text-[var(--background)] transition hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                </div>

              </>
            ) : null}

          </form>
        </div>
      </div>

      {advancedOpen ? (
        <MobileAdvancedSearchPortal
          search={search}
          openAdvancedSection={openAdvancedSection}
          setOpenAdvancedSection={setOpenAdvancedSection}
          toggleAdvancedOption={toggleAdvancedOption}
          clearAdvancedOptions={clearAdvancedOptions}
          onClose={() => setAdvancedOpen(false)}
        />
      ) : null}

    </section>
  );
}
