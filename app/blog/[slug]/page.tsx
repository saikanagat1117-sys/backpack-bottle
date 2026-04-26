import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} — Backpack & Bottle`, description: p.excerpt };
}

export default function Post({ params }: { params: { slug: string } }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return notFound();
  return (
    <>
      <Nav />
      <main className="bg-cream py-20">
        <article className="container-x max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-burnt mb-3">{p.tag}</div>
          <h1 className="font-display text-4xl md:text-5xl text-forest leading-tight">{p.title}</h1>
          <div className="text-sm text-forest/60 mt-3">{p.date} · {p.read}</div>
          <div className="mt-10 space-y-5 text-forest/85 text-lg leading-relaxed">
            {p.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="mt-14 p-6 bg-forest text-cream rounded-2xl">
            <div className="font-display text-2xl mb-2">Pronto a partire?</div>
            <p className="text-cream/80 mb-4">Ricevi il coupon da €50 e la guida alle 5 destinazioni.</p>
            <Link href="/#coupon" className="btn-primary">Ricevi il coupon →</Link>
          </div>
          <div className="mt-10">
            <Link href="/blog" className="text-forest/70 hover:text-forest text-sm">← Tutti gli articoli</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
