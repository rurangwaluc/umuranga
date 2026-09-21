"use client";

import dynamic from "next/dynamic";

export type SearchMapListing = {
  image: string;
  title: string;
  slug: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  type: string;
  verified: boolean;
  tag: string;
  lat: number;
  lng: number;
};

const SearchMapInner = dynamic(() => import("./search-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-full items-center justify-center bg-[var(--surface-soft)] text-sm font-black text-[var(--muted)]">
      Loading map...
    </div>
  ),
});

export function SearchMap({ listings }: { listings: SearchMapListing[] }) {
  return (
    <div className="h-full min-h-full w-full">
      <SearchMapInner listings={listings} />
    </div>
  );
}
