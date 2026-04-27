import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digital Stack — Backpack & Bottle",
  description:
    "The full digital marketing stack mapped to the Digital Platforms Laboratory framework: Acquisition, Engagement, Conversion, Retention, Measurement.",
};

type Layer = {
  layer: string;
  course: string;
  tools: { name: string; role: string; status: "live" | "pending" | "planned" }[];
};

const stack: Layer[] = [
  {
    layer: "1 · Acquisition",
    course: "Paid media, SEO, organic social",
    tools: [
      { name: "Meta Ads (FB + IG)", role: "60% of €2,000 budget · Awareness, Lead Gen, Retargeting", status: "planned" },
      { name: "Google Ads", role: "40% of budget · Branded, Generic, Competitor", status: "planned" },
      { name: "Organic SEO", role: "3 long-form blog posts · sitemap + JSON-LD + hreflang", status: "live" },
      { name: "Newsletter referrals", role: "Footer strip · weekly Tuesday deal", status: "live" },
    ],
  },
  {
    layer: "2 · Engagement",
    course: "Landing pages, content, UX",
    tools: [
      { name: "Next.js 14 (App Router)", role: "SSR landing + 5 destination pages + 3 blog posts", status: "live" },
      { name: "IT/EN locale toggle", role: "Context-based, single-page swap (no URL flicker)", status: "live" },
      { name: "Microsoft Clarity", role: "Heatmaps + session recordings + dead/rage click detection", status: "live" },
      { name: "Vercel Analytics + Speed Insights", role: "Real-user CWV monitoring", status: "live" },
      { name: "Exit-intent modal", role: "Recovery offer on mouseleave (desktop) / scroll-up (mobile)", status: "live" },
      { name: "WhatsApp floating button", role: "Italian-millennial preferred channel", status: "live" },
    ],
  },
  {
    layer: "3 · Conversion",
    course: "Lead capture, offer, urgency",
    tools: [
      { name: "Lead form (5 → 3 fields)", role: "Name, email, consent only on hot variant", status: "live" },
      { name: "BB50 coupon (€50 / 90d)", role: "Branded PDF · attached in welcome email", status: "live" },
      { name: "Countdown timer", role: "Campaign-end urgency on hot section", status: "live" },
      { name: "Sticky CTA", role: "Always-visible book-now bar on scroll", status: "live" },
      { name: "/grazie thank-you", role: "Server-confirmed conversion event · noindex", status: "live" },
    ],
  },
  {
    layer: "4 · Retention / Lifecycle",
    course: "ESP, automation, CRM",
    tools: [
      { name: "Brevo (ESP)", role: "Lead list + welcome series + weekly Tuesday", status: "live" },
      { name: "8-email welcome series", role: "T+0 coupon · T+1 brand · T+3 destination · T+7 booking psychology · weekly · expiry · re-engage", status: "planned" },
      { name: "Webhook fan-out", role: "Optional Zapier/Sheets/Slack via LEAD_WEBHOOK_URL", status: "live" },
      { name: "Meta CAPI", role: "Server-side Lead event for iOS 14+ match", status: "live" },
    ],
  },
  {
    layer: "5 · Measurement",
    course: "Tagging, analytics, attribution, dashboards",
    tools: [
      { name: "Google Tag Manager", role: "Container imports 21 triggers + 18 tags via JSON", status: "live" },
      { name: "GA4", role: "31 dataLayer events · 5 custom dims · 3 Key Events", status: "live" },
      { name: "Meta Pixel + CAPI", role: "Client-side + server-side dual ping", status: "live" },
      { name: "Google Ads conversion", role: "coupon_download value-based · imported via GTM", status: "live" },
      { name: "Looker Studio dashboard", role: "6 panels: acquisition, funnel, cost, audience, engagement, coupon", status: "pending" },
      { name: "Consent Mode v2", role: "Default-deny · 500ms wait_for_update · audit trail", status: "live" },
    ],
  },
  {
    layer: "6 · Infrastructure",
    course: "Hosting, repo, CI/CD, security",
    tools: [
      { name: "Vercel", role: "Production hosting · auto-deploy on push · preview URLs per branch", status: "live" },
      { name: "GitHub", role: "Public repo · main branch · single-developer flow", status: "live" },
      { name: "Next.js metadata API", role: "OG, Twitter, hreflang, canonical, sitemap, robots", status: "live" },
      { name: "Rate limiting", role: "5 req/min/IP on /api/lead (memory)", status: "live" },
      { name: "GDPR (Privacy + T&Cs)", role: "Dedicated /privacy with coupon T&Cs", status: "live" },
    ],
  },
];

const StatusPill = ({ s }: { s: "live" | "pending" | "planned" }) => {
  const map = {
    live: "bg-forest text-cream",
    pending: "bg-burnt text-cream",
    planned: "bg-forest/10 text-forest/70",
  };
  const label = s === "live" ? "● live" : s === "pending" ? "◐ pending" : "○ planned";
  return <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${map[s]}`}>{label}</span>;
};

export default function Stack() {
  const total = stack.reduce((s, l) => s + l.tools.length, 0);
  const live = stack.reduce((s, l) => s + l.tools.filter((t) => t.status === "live").length, 0);
  return (
    <>
      <Nav />
      <main className="bg-cream">
        <article className="container-x py-20 max-w-6xl">
          <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-4">
            Digital Platforms Laboratory · Stack architecture
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-forest mb-4">
            The full stack
          </h1>
          <p className="text-forest/75 text-lg max-w-3xl">
            Six layers, mapped to the course framework: Acquisition → Engagement →
            Conversion → Retention → Measurement → Infrastructure. {live} of {total}{" "}
            components are live; the rest are documented and wired, awaiting credentials
            or campaign launch.
          </p>

          {/* Visual flow */}
          <div className="mt-10 bg-forest text-cream rounded-2xl p-8 overflow-x-auto">
            <div className="flex items-center justify-between gap-3 min-w-[640px]">
              {stack.map((s, i) => (
                <div key={s.layer} className="flex items-center gap-3 flex-1">
                  <div className="flex-1 text-center">
                    <div className="text-burnt text-xs uppercase tracking-wider mb-1">{s.layer.split(" · ")[0]}</div>
                    <div className="font-display text-lg">{s.layer.split(" · ")[1]}</div>
                    <div className="text-cream/60 text-xs mt-1">{s.tools.length} tools</div>
                  </div>
                  {i < stack.length - 1 && <div className="text-burnt text-2xl">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed layers */}
          <div className="mt-12 space-y-10">
            {stack.map((s) => (
              <section key={s.layer}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="font-display text-3xl text-forest">{s.layer}</h2>
                </div>
                <p className="text-forest/60 text-sm mb-4">Course topic: {s.course}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {s.tools.map((t) => (
                    <div key={t.name} className="bg-white rounded-lg border border-forest/10 p-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-forest">{t.name}</div>
                        <div className="text-forest/70 text-sm mt-1">{t.role}</div>
                      </div>
                      <StatusPill s={t.status} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 bg-forest-dark text-cream rounded-2xl p-8">
            <h2 className="font-display text-2xl mb-3">How it all connects</h2>
            <p className="text-cream/85 max-w-3xl">
              A user clicks a Meta ad ({"layer 1"}) → lands on the Italian site ({"layer 2"})
              → submits the form ({"layer 3"}) → receives the coupon via Brevo ({"layer 4"}) →
              every step fires a dataLayer event into GTM, fanned out to GA4, Meta CAPI,
              and Google Ads ({"layer 5"}) → all hosted on Vercel, in a public GitHub repo,
              consent-gated to GDPR ({"layer 6"}). Single source of truth: the dataLayer.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
