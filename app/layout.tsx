import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import { GTMHead, GTMNoScript } from "@/components/GTM";
import GA4 from "@/components/GA4";
import CookieBanner from "@/components/CookieBanner";
import VisitCounter from "@/components/VisitCounter";
import Clarity from "@/components/Clarity";
import RageClickDetector from "@/components/RageClickDetector";
import OutboundLinkTracker from "@/components/OutboundLinkTracker";
import ReadingTimeTracker from "@/components/ReadingTimeTracker";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Backpack & Bottle — Weekend europei curati, €50 di sconto",
  description:
    "5 destinazioni selezionate · voli + hotel inclusi · prezzi trasparenti. Ricevi il coupon da €50 per la tua prossima city break europea.",
  openGraph: {
    title: "Backpack & Bottle",
    description: "Curated European weekends. Transparent pricing. €50 off your first booking.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <GTMHead />
        <GA4 />
        <Clarity />
      </head>
      <body className="font-sans">
        <GTMNoScript />
        <LocaleProvider>
          <VisitCounter />
          <RageClickDetector />
          <OutboundLinkTracker />
          <ReadingTimeTracker />
          {children}
          <CookieBanner />
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
