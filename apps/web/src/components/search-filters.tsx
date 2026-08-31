"use client";

import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

const purposeOptions: Option[] = [
  { label: "Search", value: "" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Land", value: "land" },
];

const propertyTypeOptions: Option[] = [
  { label: "All property", value: "" },
  { label: "House", value: "House" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Land", value: "Land" },
  { label: "Commercial", value: "Commercial" },
];

const bedroomOptions: Option[] = [
  { label: "Any beds", value: "" },
  { label: "1 bed", value: "1" },
  { label: "2 beds", value: "2" },
  { label: "3 beds", value: "3" },
  { label: "4 beds", value: "4" },
  { label: "5+ beds", value: "5" },
];

type SearchFiltersProps = {
  location: string;
  initialPurpose?: string;
  initialPropertyType?: string;
  initialMaxPrice?: string;
  initialBedrooms?: string;
};

function getLabel(options: Option[], value: string) {
  return options.find((option) => option.value === value)?.label ?? options[0].label;
}

function FilterDropdown({
  label,
  name,
  value,
  options,
  open,
  onOpen,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: Option[];
  open: boolean;
  onOpen: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative min-w-0">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={onOpen}
        className={`flex min-h-[50px] w-full items-center justify-between gap-2 rounded-md border bg-[var(--background)] px-3 py-2 text-left transition dark:bg-[var(--surface)] ${
          open
            ? "border-[var(--primary)] dark:border-[var(--accent-gold)]"
            : "border-[var(--border)] hover:border-[var(--primary)]/55"
        }`}
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            {label}
          </span>
          <span className="mt-1 block truncate text-sm font-black text-[var(--foreground)]">
            {getLabel(options, value)}
          </span>
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-[var(--muted)] transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 max-h-[220px] overflow-y-auto rounded-md border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_28px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value || option.label}
                type="button"
                onClick={() => onChange(option.value)}
                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[13px] font-black text-[var(--foreground)] transition hover:bg-[var(--surface-soft)]"
              >
                <span>{option.label}</span>
                {selected ? (
                  <Check size={14} className="text-[var(--trust-green)]" strokeWidth={3} />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function FilterFields({
  location,
  purpose,
  propertyType,
  maxPrice,
  bedrooms,
  setPurpose,
  setPropertyType,
  setBedrooms,
  open,
  setOpen,
  isMobile = false,
}: {
  location: string;
  purpose: string;
  propertyType: string;
  maxPrice: string;
  bedrooms: string;
  setPurpose: (value: string) => void;
  setPropertyType: (value: string) => void;
  setBedrooms: (value: string) => void;
  open: "purpose" | "type" | "beds" | null;
  setOpen: (value: "purpose" | "type" | "beds" | null) => void;
  isMobile?: boolean;
}) {
  function toggleOpen(value: "purpose" | "type" | "beds") {
    setOpen(open === value ? null : value);
  }

  return (
    <form
      action="/search"
      className={
        isMobile
          ? "grid grid-cols-2 gap-2"
          : "hidden gap-2 lg:grid lg:w-fit lg:grid-cols-[150px_210px_170px_150px_auto]"
      }
    >
      <input type="hidden" name="location" value={location} />

      <FilterDropdown
        label="Purpose"
        name="purpose"
        value={purpose}
        options={purposeOptions}
        open={open === "purpose"}
        onOpen={() => toggleOpen("purpose")}
        onChange={(value) => {
          setPurpose(value);
          setOpen(null);
        }}
      />

      <FilterDropdown
        label="Type"
        name="propertyType"
        value={propertyType}
        options={propertyTypeOptions}
        open={open === "type"}
        onOpen={() => toggleOpen("type")}
        onChange={(value) => {
          setPropertyType(value);
          setOpen(null);
        }}
      />

      <label className="group min-h-[50px] min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 transition focus-within:border-[var(--primary)] dark:bg-[var(--surface)]">
        <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
          Budget
        </span>
        <input
          name="maxPrice"
          defaultValue={maxPrice}
          inputMode="numeric"
          placeholder="Any price"
          className="mt-1 h-7 w-full bg-transparent text-sm font-black text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        />
      </label>

      <FilterDropdown
        label="Beds"
        name="bedrooms"
        value={bedrooms}
        options={bedroomOptions}
        open={open === "beds"}
        onOpen={() => toggleOpen("beds")}
        onChange={(value) => {
          setBedrooms(value);
          setOpen(null);
        }}
      />

      <button
        type="submit"
        className="col-span-2 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-md bg-[var(--cta)] px-5 text-sm font-black text-[var(--cta-text)] transition hover:opacity-90 lg:col-span-1 lg:w-auto"
      >
        <SlidersHorizontal size={15} />
        Update results
      </button>
    </form>
  );
}

export function SearchFilters({
  location,
  initialPurpose = "",
  initialPropertyType = "",
  initialMaxPrice = "",
  initialBedrooms = "",
}: SearchFiltersProps) {
  const [purpose, setPurpose] = useState(initialPurpose);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [open, setOpen] = useState<"purpose" | "type" | "beds" | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const summary = [
    getLabel(purposeOptions, purpose),
    getLabel(propertyTypeOptions, propertyType),
    initialMaxPrice || "Any price",
    getLabel(bedroomOptions, bedrooms),
  ].join(" / ");

  return (
    <div>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => {
            setMobileFiltersOpen((value) => !value);
            setOpen(null);
          }}
          className="flex w-full items-center justify-between gap-3 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-left dark:bg-[var(--surface)]"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
              Filters
            </span>
            <span className="mt-1 block truncate text-sm font-black text-[var(--foreground)]">
              {summary}
            </span>
          </span>

          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--cta)] text-[var(--cta-text)]">
            <SlidersHorizontal size={15} />
          </span>
        </button>

        {mobileFiltersOpen ? (
          <div className="mt-2 rounded-md border border-[var(--border)] bg-[var(--surface)] p-2">
            <FilterFields
              isMobile
              location={location}
              purpose={purpose}
              propertyType={propertyType}
              maxPrice={initialMaxPrice}
              bedrooms={bedrooms}
              setPurpose={setPurpose}
              setPropertyType={setPropertyType}
              setBedrooms={setBedrooms}
              open={open}
              setOpen={setOpen}
            />
          </div>
        ) : null}
      </div>

      <FilterFields
        location={location}
        purpose={purpose}
        propertyType={propertyType}
        maxPrice={initialMaxPrice}
        bedrooms={bedrooms}
        setPurpose={setPurpose}
        setPropertyType={setPropertyType}
        setBedrooms={setBedrooms}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
