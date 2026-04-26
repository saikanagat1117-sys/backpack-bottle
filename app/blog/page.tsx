import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts } from "./posts";

export const metadata = {
  title: "Blog — Backpack & Bottle",
  description: "Guide e consigli per weekend europei curati.",
};

export default function Blog() {
  return (
    <>
      <Nav />
      <main className="bg-cream py-20 min-h-[60vh]">
        <div className="container-x max-w-4xl">
          <h1 className="font-display text-5xl text-forest mb-3">Blog</h1>
          <p className="text-forest/70 mb-12">Guide, confronti e consigli di viaggio curati.</p>
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-cream-dark pb-6">
                <Link href={`/blog/${p.slug}`} className="group">
                  <div className="text-xs uppercase tracking-wider text-burnt mb-1">{p.tag}</div>
                  <h2 className="font-display text-2xl md:text-3xl text-forest group-hover:text-burnt">
                    {p.title}
                  </h2>
                  <p className="text-forest/70 mt-2">{p.excerpt}</p>
                  <div className="text-xs text-forest/50 mt-2">{p.date} · {p.read}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
