import { destinations } from "@/lib/destinations";

const SITE = "https://backpack-bottle.vercel.app";

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Backpack & Bottle",
    url: SITE,
    logo: `${SITE}/logo.svg`,
    description:
      "Curated European weekend breaks for Italian travelers. Flights + hotel + tasting itinerary, transparent pricing.",
    sameAs: [],
    address: { "@type": "PostalAddress", addressCountry: "IT" },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Backpack & Bottle",
    url: SITE,
    inLanguage: ["it-IT", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Backpack & Bottle — European city breaks",
    itemListElement: destinations.slice(0, 10).map((d, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: `${d.city.it} — ${d.nights} nights`,
      url: `${SITE}/destinazioni/${d.slug}`,
      price: d.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      category: "Travel",
      areaServed: { "@type": "Country", name: d.country.en },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }}
      />
    </>
  );
}
