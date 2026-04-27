import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Measurement Plan — Backpack & Bottle",
  description:
    "KPI tree, dataLayer event schema, custom dimensions, attribution model, dashboard layout. Full transparency for the Digital Platforms Lab assessment.",
};

const events = [
  { name: "page_view", trigger: "Auto via GTM Page View", params: "page_path, page_location, locale", purpose: "Acquisition baseline" },
  { name: "cta_click", trigger: "Hero / Nav / Sticky CTA click", params: "location, label", purpose: "Primary CTA performance" },
  { name: "form_view", trigger: "Lead form 40% in viewport", params: "form", purpose: "Funnel step 2 (form impression)" },
  { name: "form_start", trigger: "First focus on any form field", params: "form", purpose: "Funnel step 3 (intent)" },
  { name: "form_field_focus / blur", trigger: "Per-field focus + blur (filled)", params: "field, filled", purpose: "Field-level drop-off analysis" },
  { name: "form_submit", trigger: "Server returns ok=true (post-fetch)", params: "form, destination", purpose: "✅ Key Event: lead conversion" },
  { name: "form_submit_error", trigger: "Server returns error / network fail", params: "error", purpose: "Form reliability monitor" },
  { name: "coupon_download", trigger: "After successful submit + on /grazie PDF link click", params: "coupon_code=BB50, value=50, currency=EUR", purpose: "✅ Key Event: assigned-value goal" },
  { name: "thank_you_view", trigger: "/grazie page mount", params: "value=50, currency=EUR", purpose: "✅ Key Event (server-confirm)" },
  { name: "destination_card_click", trigger: "Click on destination card from grid", params: "destination", purpose: "Custom dim: destination_interest" },
  { name: "destination_detail_view", trigger: "/destinazioni/[slug] mount", params: "destination", purpose: "Mid-funnel engagement" },
  { name: "newsletter_signup", trigger: "Footer newsletter form submit", params: "placement", purpose: "Lower-intent micro-conversion" },
  { name: "outbound_click", trigger: "Click on external link (auto)", params: "url, label", purpose: "Trust attribution" },
  { name: "scroll_75", trigger: "75% scroll depth (GTM built-in)", params: "—", purpose: "Engagement quality" },
  { name: "engaged_session", trigger: ">30s + ≥1 interaction", params: "—", purpose: "GA4 engaged-session denominator" },
  { name: "time_on_page", trigger: "Beforeunload, on long pages", params: "seconds", purpose: "Reading time signal" },
  { name: "rage_click", trigger: "≥3 clicks same coords <1s", params: "x, y, target", purpose: "UX defect detector" },
  { name: "dead_click", trigger: "Click on non-interactive element", params: "target", purpose: "UX defect detector" },
  { name: "faq_open", trigger: "FAQ accordion open", params: "question, page", purpose: "Objection map" },
  { name: "share_click", trigger: "Share button per network", params: "network, page", purpose: "Virality signal" },
  { name: "currency_change", trigger: "EUR ⇄ USD toggle", params: "currency", purpose: "Audience preference" },
  { name: "site_search", trigger: "Internal search query submit", params: "query", purpose: "Demand signal" },
  { name: "video_play / pause / complete", trigger: "Video element events", params: "video_id", purpose: "Asset engagement" },
  { name: "gallery_view", trigger: "Destination image gallery open", params: "destination, index", purpose: "Visual engagement" },
  { name: "comparison_open / add / remove", trigger: "Compare destinations widget", params: "destinations[]", purpose: "Decision-stage signal" },
  { name: "pdf_download", trigger: "Any PDF link click (auto)", params: "url", purpose: "Asset performance" },
  { name: "mailto_click / tel_click", trigger: "mailto: / tel: link click (auto)", params: "url", purpose: "Direct contact intent" },
  { name: "exit_intent_shown / dismissed / accepted", trigger: "Exit-intent modal lifecycle", params: "device", purpose: "Recovery campaign performance" },
  { name: "whatsapp_click", trigger: "WhatsApp floating button click", params: "placement", purpose: "Channel preference signal" },
  { name: "consent_update", trigger: "Cookie banner Accept/Reject click", params: "ad_storage, analytics_storage", purpose: "Consent Mode v2 audit trail" },
  { name: "visit_count", trigger: "Per pageview, increments localStorage counter", params: "visit_count (1, 2, 3...)", purpose: "Custom user property: returning vs new" },
];

const customDimensions = [
  { scope: "Event", name: "destination", source: "DLV - destination", purpose: "Which destination drives the lead" },
  { scope: "Event", name: "location", source: "DLV - location", purpose: "Which CTA placement converts" },
  { scope: "Event", name: "coupon_code", source: "DLV - coupon_code", purpose: "Coupon attribution (multiple campaigns)" },
  { scope: "User", name: "visit_count", source: "DLV - visit_count", purpose: "Returning visitor segmentation" },
  { scope: "User", name: "locale", source: "GA4 lang param", purpose: "Italian vs English audience" },
];

const kpiTree = [
  { stage: "Top of funnel", metric: "Sessions", target: "5,000", source: "GA4 Acquisition" },
  { stage: "Mid funnel", metric: "Form views", target: "1,500 (30%)", source: "form_view event" },
  { stage: "Mid funnel", metric: "Form starts", target: "750 (50%)", source: "form_start event" },
  { stage: "Bottom funnel", metric: "Leads (form_submit)", target: "300 (40%)", source: "form_submit Key Event" },
  { stage: "Bottom funnel", metric: "Coupon downloads", target: "400 (incl. /grazie repeats)", source: "coupon_download" },
  { stage: "Post-campaign", metric: "Bookings (offline import)", target: "30", source: "Brevo → GA4 offline upload" },
  { stage: "Efficiency", metric: "CPL", target: "€6.67", source: "Spend ÷ leads" },
  { stage: "Efficiency", metric: "ROAS (proj)", target: "1.8x", source: "AOV €322 × bookings ÷ spend" },
];

export default function Measurement() {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        <article className="container-x py-20 max-w-5xl">
          <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-4">
            Digital Platforms Laboratory · Group 3
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-forest mb-4">
            Measurement Plan
          </h1>
          <p className="text-forest/75 text-lg max-w-3xl">
            Every event the site fires, every custom dimension we register, every KPI we
            track and how it ladders up to the campaign goal. Full transparency: no
            hidden tracking, no orphan events.
          </p>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">1. KPI tree</h2>
          <p className="text-forest/75">
            From session to booking. Each step is measured by a discrete dataLayer event.
            Targets are derived from the €2,000 spend × 60/40 Meta/Google split at Italian
            travel benchmarks (CTR 2.1% Meta, 3.4% Google).
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-forest/10 rounded-lg overflow-hidden">
              <thead className="bg-forest text-cream">
                <tr><th className="text-left p-3">Stage</th><th className="text-left p-3">Metric</th><th className="text-left p-3">Target (6w)</th><th className="text-left p-3">Source</th></tr>
              </thead>
              <tbody className="bg-white">
                {kpiTree.map((k, i) => (
                  <tr key={i} className="border-t border-forest/10">
                    <td className="p-3 text-forest/70">{k.stage}</td>
                    <td className="p-3 font-medium text-forest">{k.metric}</td>
                    <td className="p-3 text-burnt-dark font-display">{k.target}</td>
                    <td className="p-3 text-forest/70 text-xs">{k.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">2. dataLayer event schema</h2>
          <p className="text-forest/75">
            {events.length} events · all wired in <code className="text-burnt">lib/gtm.ts</code> via the <code className="text-burnt">track()</code> helper.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-xs border border-forest/10 rounded-lg overflow-hidden">
              <thead className="bg-forest text-cream">
                <tr><th className="text-left p-2">Event</th><th className="text-left p-2">Trigger</th><th className="text-left p-2">Params</th><th className="text-left p-2">Purpose</th></tr>
              </thead>
              <tbody className="bg-white">
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-forest/10 align-top">
                    <td className="p-2 font-mono text-burnt-dark">{e.name}</td>
                    <td className="p-2 text-forest/80">{e.trigger}</td>
                    <td className="p-2 text-forest/70 font-mono">{e.params}</td>
                    <td className="p-2 text-forest/80">{e.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">3. Custom dimensions</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-forest/10 rounded-lg overflow-hidden">
              <thead className="bg-forest text-cream">
                <tr><th className="text-left p-3">Scope</th><th className="text-left p-3">Name</th><th className="text-left p-3">Source</th><th className="text-left p-3">Purpose</th></tr>
              </thead>
              <tbody className="bg-white">
                {customDimensions.map((c, i) => (
                  <tr key={i} className="border-t border-forest/10">
                    <td className="p-3 text-forest/70">{c.scope}</td>
                    <td className="p-3 font-medium text-burnt-dark">{c.name}</td>
                    <td className="p-3 text-forest/70 font-mono text-xs">{c.source}</td>
                    <td className="p-3 text-forest/80">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">4. Attribution model</h2>
          <ul className="space-y-2 text-forest/85">
            <li>• <strong>GA4:</strong> Data-driven attribution (default). Falls back to last-non-direct-click for low-volume segments.</li>
            <li>• <strong>Meta:</strong> 7-day click + 1-day view (default), with Conversions API server-side for iOS 14+ recovery.</li>
            <li>• <strong>Google Ads:</strong> Data-driven (auto-applied on conversions ≥300/30d, else last-click).</li>
            <li>• <strong>UTM persistence:</strong> First-touch UTM stored in <code>localStorage.bb_utm</code> (30-day TTL), appended to lead payload, stored in Brevo as <code>SIGNUP_SOURCE</code> for first-touch attribution outside GA4.</li>
            <li>• <strong>Cross-domain:</strong> N/A (single-domain campaign).</li>
          </ul>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">5. Consent Mode v2</h2>
          <ul className="space-y-2 text-forest/85">
            <li>• Default state: <code>ad_storage=denied, analytics_storage=denied, ad_user_data=denied, ad_personalization=denied</code> set in <code>&lt;head&gt;</code> before GTM loads.</li>
            <li>• On Accept: <code>consent_update</code> grants all four. On Reject: stays denied; GA4 + Meta receive cookieless pings.</li>
            <li>• 500ms <code>wait_for_update</code> prevents tags from firing pre-consent.</li>
            <li>• Audit trail: every <code>consent_update</code> event is captured in GA4 BigQuery export.</li>
          </ul>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">6. Looker Studio dashboard layout</h2>
          <p className="text-forest/75 mb-4">Six panels, single-page exec view, refresh every 12 hours.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Acquisition", "Sessions / Users by source/medium · weekly trend · top 5 channels"],
              ["Funnel", "Sessions → form_view → form_start → form_submit → coupon_download · % drop per step"],
              ["Cost (Google Ads + Meta)", "Spend, CPM, CPC, CTR, CPL · combined + per-platform"],
              ["Audience", "Geo (Italian regions), device, age, locale (it vs en)"],
              ["Engagement", "Avg session duration, scroll_75 rate, engaged_session %"],
              ["Coupon", "Downloads by destination_interest custom dim · top 5 destinations"],
            ].map(([title, body]) => (
              <div key={title} className="bg-white rounded-lg border border-forest/10 p-4">
                <div className="text-xs uppercase tracking-wider text-burnt mb-1">{title}</div>
                <div className="text-forest/85 text-sm">{body}</div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl text-forest mt-16 mb-4">7. Verification</h2>
          <ol className="space-y-2 text-forest/85 list-decimal list-inside">
            <li>Open the live site in Chrome DevTools → Console → type <code>window.dataLayer</code></li>
            <li>Submit the lead form with a test email → confirm <code>form_submit</code> + <code>coupon_download</code> appear after server confirmation</li>
            <li>Open GTM Preview mode → walk through the funnel → confirm each tag fires on the right trigger</li>
            <li>Open GA4 → DebugView → confirm events arrive with correct params</li>
            <li>Open Meta Events Manager → Test Events → confirm server-side <code>Lead</code> arrives via CAPI (after <code>META_CAPI_TOKEN</code> set)</li>
          </ol>
        </article>
      </main>
      <Footer />
    </>
  );
}
