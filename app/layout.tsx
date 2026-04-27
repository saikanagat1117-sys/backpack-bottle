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
import JsonLd from "@/components/JsonLd";
import UTMCapture from "@/components/UTMCapture";
import ExitIntent from "@/components/ExitIntent";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://backpack-bottle.vercel.app"),
  title: "Backpack & Bottle — Weekend europei curati, €50 di sconto",
  description:
    "5 destinazioni selezionate · voli + hotel inclusi · prezzi trasparenti. Ricevi il coupon da €50 per la tua prossima city break europea.",
  openGraph: {
    title: "Backpack & Bottle",
    description: "Curated European weekends. Transparent pricing. €50 off your first booking.",
    type: "website",
    url: "https://backpack-bottle.vercel.app",
    siteName: "Backpack & Bottle",
    locale: "it_IT",
    alternateLocale: "en_US",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Backpack & Bottle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backpack & Bottle — Weekend europei curati",
    description: "5 destinazioni selezionate · €50 di sconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: "https://backpack-bottle.vercel.app",
    languages: {
      "it-IT": "https://backpack-bottle.vercel.app",
      "en-US": "https://backpack-bottle.vercel.app?lang=en",
    },
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
        <JsonLd />
      </head>
      <body className="font-sans">
        <GTMNoScript />
        <LocaleProvider>
          <UTMCapture />
          <VisitCounter />
          <RageClickDetector />
          <OutboundLinkTracker />
          <ReadingTimeTracker />
          {children}
          <CookieBanner />
          <ExitIntent />
          <WhatsAppButton />
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
