"use client";

import Link from "next/link";
import { useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { SearchMapListing } from "./search-map";

function FitListings({ listings }: { listings: SearchMapListing[] }) {
  const map = useMap();

  if (listings.length > 0) {
    const bounds = L.latLngBounds(listings.map((item) => [item.lat, item.lng]));
    map.fitBounds(bounds, { padding: [54, 54], maxZoom: 14 });
  }

  return null;
}

function createPriceIcon(label: string) {
  return L.divIcon({
    className: "",
    html: `
      <div class="umuranga-map-price-marker">
        ${label}
        <span></span>
      </div>
    `,
    iconSize: [74, 34],
    iconAnchor: [37, 34],
    popupAnchor: [0, -34],
  });
}

function shortPrice(price: string) {
  const amount = Number(price.replace(/[^0-9]/g, ""));

  if (!Number.isFinite(amount) || amount <= 0) {
    return price.replace("RWF ", "");
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `RWF ${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }

  if (amount >= 1_000) {
    return `RWF ${Math.round(amount / 1_000)}K`;
  }

  return `RWF ${amount}`;
}

function MarkerWithPopup({ item }: { item: SearchMapListing }) {
  const markerRef = useRef<L.Marker | null>(null);

  return (
    <Marker
      ref={markerRef}
      position={[item.lat, item.lng]}
      icon={createPriceIcon(shortPrice(item.price))}
      eventHandlers={{
        mouseover: () => markerRef.current?.openPopup(),
        click: () => markerRef.current?.openPopup(),
      }}
    >
      <Popup closeButton={false} autoPan>
        <Link href={`/property/${item.slug}`} className="block bg-[var(--surface)] text-[var(--foreground)]">
          <div className="relative h-[130px] bg-[var(--surface-soft)]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
            <span className="absolute left-3 top-3 rounded-md bg-white/94 px-2.5 py-1 text-[11px] font-black text-[#1A1A16]">
              {item.tag}
            </span>
          </div>

          <div className="p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[15px] font-black tracking-[-0.025em] text-[var(--foreground)]">{item.price}</p>
                <h3 className="mt-1 truncate text-sm font-black text-[var(--foreground)]">
                  {item.title}
                </h3>
              </div>

              {item.verified ? (
                <span className="rounded-md bg-[var(--trust-soft)] px-2 py-1 text-[10px] font-black text-[var(--trust-green)]">
                  Verified
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-xs font-bold text-[var(--muted)]">
              {item.location}
            </p>

            <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3 text-xs font-bold text-[var(--muted)]">
              <span>{item.beds} beds</span>
              <span>{item.baths} baths</span>
              <span>{item.type}</span>
            </div>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

export default function SearchMapInner({
  listings,
}: {
  listings: SearchMapListing[];
}) {
  const center: [number, number] = [-1.9441, 30.0619];

  return (
    <div className="relative h-full min-h-full w-full overflow-hidden bg-[var(--surface-soft)]">
      <style jsx global>{`
        .leaflet-container {
          height: 100% !important;
          min-height: calc(100vh - 73px) !important;
          width: 100%;
          background: var(--surface-soft);
          font-family: inherit;
        }

        .leaflet-control-attribution {
          font-size: 10px;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 14px;
          background: var(--surface);
          color: var(--foreground);
          border: 1px solid var(--border);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
          overflow: hidden;
          padding: 0;
        }

        .leaflet-popup-content {
          margin: 0;
          width: 260px !important;
        }

        .leaflet-popup-tip {
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .umuranga-map-price-marker {
          position: relative;
          display: inline-flex;
          min-width: 74px;
          height: 32px;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          border: 1px solid rgba(58, 42, 29, 0.22);
          background: #fffaf2;
          color: #11100d;
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 10px 22px rgba(26, 20, 14, 0.18);
          transition:
              transform 160ms ease,
              background 160ms ease,
              border-color 160ms ease,
              box-shadow 160ms ease;
        }

        .umuranga-map-price-marker span {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 9px;
          height: 9px;
          transform: translate(-50%, -5px) rotate(45deg);
          border-right: 1px solid rgba(58, 42, 29, 0.28);
          border-bottom: 1px solid rgba(58, 42, 29, 0.28);
          background: inherit;
        }

        .leaflet-marker-icon:hover .umuranga-map-price-marker {
          transform: translateY(-2px);
          border-color: var(--accent-gold);
          background: #f2d08a;
            box-shadow: 0 14px 30px rgba(26, 20, 14, 0.26);
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full min-h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitListings listings={listings} />

        {listings.map((item) => (
          <MarkerWithPopup key={item.slug} item={item} />
        ))}
      </MapContainer>
    </div>
  );
}
