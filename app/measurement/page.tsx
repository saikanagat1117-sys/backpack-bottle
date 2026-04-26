import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Measurement Plan — Backpack & Bottle",
  description: "Tracking architecture, KPIs, GTM container, dataLayer events, GA4, Meta Pixel, Google Ads, Consent Mode v2, Looker Studio.",
};

const events = [
  ["page_view", "Auto via GA4 Enhanced Measurement", "page_location, page_title, page_referrer", "Volume + funnel entry"],
  ["scroll_75", "Auto via GTM Scroll Depth trigger (75%)", "percent_scrolled", "Engagement quality"],
  ["cta_click", "Hero, nav, blog CTAs", "location: hero_primary | hero_secondary | nav | blog_post", "Funnel intent"],
  ["destination_card_click", "Click on a destination card in /destinazioni", "destination: rome | barcelona | amsterdam | lisbon | prague", "Destination preference (custom dim)"],
  ["form_start", "First focus on any field of the lead form", "form: coupon_lead", "Form abandonment funnel"],
  ["form_submit", "Successful POST /api/lead", "form: coupon_lead, destination", "Lead acquisition (GA4 conversion)"],
  ["coupon_download", "After form submit + on direct PDF download", "coupon_code: BB50, value: 50, currency: EUR", "Primary conversion (GA4 + Meta Lead + Google Ads)"],
  ["thank_you_view", "/grazie page load", "value: 50, currency: EUR", "Backup conversion event"],
  ["consent_update", "Cookie banner choice", "ad_storage, analytics_storage, ad_user_data, ad_personalization", "Consent Mode v2 signal"],
  ["visit_count_set", "On every page load", "visit_count: integer", "User property — repeat visitor segmentation"],
];

const tags = [
  ["GA4 Configuration", "All Pages", "Sends pageviews + base config to GA4 property G-XXXXXXXXXX"],
  ["GA4 Event — coupon_download", "Custom Event = coupon_download", "Marked as conversion in GA4 admin"],
  ["GA4 Event — form_submit", "Custom Event = form_submit", "Lead-stage conversion"],
  ["GA4 Event — cta_click", "Custom Event = cta_click", "Engagement tracking"],
  ["GA4 Event — destination_card_click", "Custom Event = destination_card_click", "Custom dim destination_interest"],
  ["GA4 Event — scroll_75", "Custom Event = scroll_75", "Engagement quality"],
  ["Meta Pixel — Base", "All Pages", "PageView event for retargeting audiences"],
  ["Meta Pixel — Lead", "Custom Event = form_submit", "Optimization event for Meta Ads"],
  ["Meta Pixel — CompleteRegistration", "Custom Event = coupon_download", "Bottom-funnel signal"],
  ["Google Ads Conversion — Lead", "Custom Event = coupon_download", "Value 50 EUR; imported to Google Ads"],
  ["Google Ads Remarketing", "All Pages", "Audience builder for retargeting search/display"],
];

const kpis = [
  ["Landing page visits", "5,000", "€2,000 budget ÷ €0.40 blended CPC", "GA4 sessions"],
  ["Coupon downloads", "400 (8% CVR)", "Travel lead-magnet benchmark 5–10%", "GA4 event coupon_download"],
  ["Lead form submissions", "300 (6% CVR)", "Industry benchmark for gated content 5–8%", "GA4 event form_submit"],
  ["Conversion rate", "6–8%", "(downloads + forms) ÷ visits", "GA4 calculated metric"],
  ["Cost per lead (CPL)", "€6.67 avg", "Travel sector typical €10–50", "Total spend ÷ total leads"],
  ["Email list growth", "400+", "New subscribers from campaign", "ESP report"],
  ["Email open rate", "35%", "Travel industry average 30–35%", "ESP report"],
  ["Click-to-open rate", "20%", "Travel industry average 15–25%", "ESP report"],
];

export default function Measurement() {
  return (
    <>
      <Nav />
      <main className="bg-cream py-16">
        <article className="container-x max-w-5xl">
          <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">Group 3 · Digital Platforms Lab</div>
          <h1 className="font-display text-4xl md:text-6xl text-forest leading-tight">
            Measurement & tracking plan
          </h1>
          <p className="mt-4 text-forest/75 text-lg max-w-3xl">
            How Backpack & Bottle measures every step of the funnel — from impression to coupon
            redemption — using Google Tag Manager, GA4, Meta Pixel, Google Ads, and Looker Studio,
            with full GDPR Consent Mode v2.
          </p>

          {/* 1. Architecture diagram */}
          <Section title="1. Tracking architecture">
            <p className="text-forest/80 mb-6">
              All marketing tags fire through a single Google Tag Manager container loaded in the
              site <code className="text-burnt">&lt;head&gt;</code>. Each user interaction pushes a
              named event into <code className="text-burnt">window.dataLayer</code>; GTM listens
              for those events and forwards them to GA4, Meta Pixel, and Google Ads. Consent Mode
              v2 blocks marketing storage until the user grants consent via the cookie banner.
            </p>
            <pre className="bg-forest text-cream rounded-2xl p-5 overflow-x-auto text-xs leading-relaxed">
{`User action (click / scroll / submit / page load)
            │
            ▼
   window.dataLayer.push({event: 'coupon_download', ...})
            │
            ▼
 ┌──────────────────────────────────────────┐
 │  Google Tag Manager (GTM-XXXXXXX)        │
 │  - Trigger: Custom Event = coupon_download│
 │  - Variables: dataLayer params            │
 └──────────────┬────────────┬────────────┬─┘
                ▼            ▼            ▼
           [GA4 event]   [Meta Lead]  [Google Ads
            G-XXXXX       Pixel        conversion]
                │            │            │
                ▼            ▼            ▼
            Looker      Audience     Conversion
            Studio      retarget.    import`}
            </pre>
          </Section>

          {/* 2. dataLayer events */}
          <Section title="2. dataLayer event schema">
            <p className="text-forest/80 mb-4">
              The site fires the following custom events. All events run through the cookie
              banner's consent gate before tags execute.
            </p>
            <Table head={["Event", "Trigger", "Parameters", "Purpose"]} rows={events} />
          </Section>

          {/* 3. GTM tags */}
          <Section title="3. GTM tag inventory">
            <p className="text-forest/80 mb-4">
              Every tag configured in the GTM container, its trigger, and what it does.
            </p>
            <Table head={["Tag", "Trigger", "Purpose"]} rows={tags} />
          </Section>

          {/* 4. KPIs */}
          <Section title="4. KPI definitions & targets">
            <p className="text-forest/80 mb-4">
              Targets calculated from a €2,000 paid-media budget across Italian millennials
              25–39 in a 6-week campaign window (May 5 – June 15, 2026).
            </p>
            <Table head={["KPI", "Target", "Rationale", "Source"]} rows={kpis} />
          </Section>

          {/* 5. Consent Mode */}
          <Section title="5. Consent Mode v2 (GDPR)">
            <p className="text-forest/80 mb-4">
              On first visit, the cookie banner sets all four consent signals to{" "}
              <code className="text-burnt">denied</code>. Marketing tags do not fire.
              When the user clicks <em>Accept</em>, a <code className="text-burnt">consent_update</code>{" "}
              event flips signals to <code className="text-burnt">granted</code> and pending tags execute.
            </p>
            <ul className="list-disc pl-6 text-forest/80 space-y-1.5">
              <li><code className="text-burnt">ad_storage</code> — controls Meta Pixel + Google Ads cookies</li>
              <li><code className="text-burnt">analytics_storage</code> — controls GA4 cookies</li>
              <li><code className="text-burnt">ad_user_data</code> — controls user-data signals to Google</li>
              <li><code className="text-burnt">ad_personalization</code> — controls personalised ads</li>
            </ul>
            <p className="text-forest/80 mt-4">
              The default state is set <em>before</em> GTM loads, satisfying Google's
              "consent default before container" requirement.
            </p>
          </Section>

          {/* 6. Looker Studio */}
          <Section title="6. Looker Studio dashboard">
            <p className="text-forest/80 mb-4">
              A real-time dashboard connects to the GA4 property and Google Ads account to give
              the team a single view of campaign health. Refreshes every 12 hours; manually
              refreshable during optimisation cycles.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                ["Acquisition", "Sessions, users, source/medium, campaign UTMs"],
                ["Funnel", "Visit → form_start → form_submit → coupon_download"],
                ["Cost", "Spend, CPC, CPL by channel and campaign"],
                ["Audience", "Geo (Italy regions), device, age, gender"],
                ["Engagement", "Avg session duration, scroll depth, blog reads"],
                ["Coupon", "Downloads by destination preference, redemption rate"],
              ].map(([h, b]) => (
                <div key={h} className="border-l-2 border-burnt pl-4 py-1">
                  <div className="font-display text-lg text-forest">{h}</div>
                  <div className="text-sm text-forest/70 mt-1">{b}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 7. Funnel maths */}
          <Section title="7. Funnel maths">
            <pre className="bg-forest text-cream rounded-2xl p-5 overflow-x-auto text-xs leading-relaxed">
{`             Impressions      150,000–180,000   (Meta + Google)
                  │   CTR ~1%
                  ▼
             Clicks            1,500–2,000
                  │   ~95% land
                  ▼
             LP visits         5,000              KPI #1
                  │   8% CVR
                  ▼
             Coupon downloads  400               KPI #2 — Meta Lead, GA4 conv.
                  │   75% complete form
                  ▼
             Email leads       300               KPI #3 — Google Ads conv.
                  │   10% nurture → booking
                  ▼
             Bookings          ~30 over 90 days  Revenue ROI tracked post-campaign

             Spend €2,000  ÷  300 leads  =  €6.67 CPL  (target)`}
            </pre>
          </Section>

          {/* 8. Compliance */}
          <Section title="8. GDPR & compliance">
            <ul className="list-disc pl-6 text-forest/80 space-y-1.5">
              <li>Single opt-in checkbox with explicit consent text on the lead form.</li>
              <li>Linked privacy policy on the form, footer, and every email.</li>
              <li>Unsubscribe link in every email (one-click).</li>
              <li>Data stored in EU-region systems only (Vercel EU edge, GA4 EU domain, ESP EU region).</li>
              <li>Data retention: 24 months inactivity, then automatic deletion.</li>
              <li>Right to access, rectify, delete, and port: requests honoured within 30 days.</li>
            </ul>
          </Section>

          {/* 9. Stack */}
          <Section title="9. Tech stack">
            <Table
              head={["Layer", "Tool", "Why"]}
              rows={[
                ["Frontend", "Next.js 14 + Tailwind on Vercel", "Fast, static-first, edge-cached, free hobby tier"],
                ["Tag manager", "Google Tag Manager", "Industry standard, free, all tag changes via UI"],
                ["Analytics", "Google Analytics 4", "Free, conversion modeling, integrates with Google Ads"],
                ["Pixels", "Meta Pixel + Google Ads tag", "Required for ad optimisation and retargeting"],
                ["Consent", "Custom Consent Mode v2 banner", "GDPR + Google's consent requirements"],
                ["Lead capture", "/api/lead → webhook → ESP", "Decouples form from ESP; can swap providers"],
                ["Email", "Mailchimp (free up to 500) or Klaviyo", "Drag-drop journeys, EU-region support"],
                ["Reporting", "Looker Studio", "Free, real-time, embeddable, GA4 + Ads connectors"],
              ]}
            />
          </Section>

          <div className="mt-14 p-6 bg-forest text-cream rounded-2xl">
            <div className="font-display text-2xl mb-2">Group 3 — Digital Platforms Lab</div>
            <p className="text-cream/80 text-sm">
              Bologna Business School · academic project · campaign window 5 May – 15 June 2026 ·
              budget €2,000 · target 300 qualified leads.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl md:text-3xl text-forest mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-cream-dark bg-white/40">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-forest text-cream text-left">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-cream-dark align-top">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 text-forest/85">{c as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
