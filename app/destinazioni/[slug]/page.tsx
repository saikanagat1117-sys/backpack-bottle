import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DestinationDetailClient from "./DestinationDetailClient";
import { destinations, destinationBySlug } from "@/lib/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = destinationBySlug(params.slug);
  if (!d) return {};
  return {
    title: `${d.city.it} (${d.country.it}) — da €${d.price} · Backpack & Bottle`,
    description: d.hook.it,
    openGraph: { images: [d.hero] },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const d = destinationBySlug(params.slug);
  if (!d) return notFound();
  return (
    <>
      <Nav />
      <DestinationDetailClient d={d} />
      <Footer />
    </>
  );
}
