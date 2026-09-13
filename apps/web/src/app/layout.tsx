import type { Metadata } from "next";
import "@fontsource-variable/figtree";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMURANGA — Verified Real Estate In Rwanda",
  description:
    "UMURANGA helps renters, buyers, landlords, agencies, agents, and partners discover and manage verified real estate in Rwanda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}