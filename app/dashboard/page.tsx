import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Campaign Dashboard — Backpack & Bottle",
  description:
    "Looker Studio dashboard mock for Backpack & Bottle. Six panels: acquisition, funnel, cost, audience, engagement, coupon.",
};

// Projected numbers from KPI tree at /measurement.
// Replace these with live data once Looker Studio is built and connected.
const KPIS = [
  { label: "Sessions", value: "5,123", delta: "+8.2%", target: "5,000", good: true },
  { label: "Leads (form_submit)", value: "312", delta: "+4.0%", target: "300", good: true },
  { label: "Coupon downloads", value: "418", delta: "+4.5%", target: "400", good: true },
  { label: "CPL", value: "€6.41", delta: "−3.9%", target: "€6.67", good: true },
  { label: "ROAS (proj)", value: "1.82x", delta: "+1.1%", target: "1.8x", good: true },
  { label: "Conv. rate", value: "6.09%", delta: "+0.4pp", target: "6.0%", good: true },
];

const ACQ_WEEKS = [
  { w: "May 5–11", sessions: 612, leads: 28 },
  { w: "May 12–18", sessions: 884, leads: 51 },
  { w: "May 19–25", sessions: 1124, leads: 68 },
  { w: "May 26–Jun 1", sessions: 1052, leads: 64 },
  { w: "Jun 2–8", sessions: 845, leads: 51 },
  { w: "Jun 9–15", sessions: 606, leads: 50 },
];

const FUNNEL = [
  { step: "Sessions", count: 5123, pct: 100 },
  { step: "Form view", count: 1547, pct: 30.2 },
  { step: "Form start", count: 781, pct: 50.5 },
  { step: "Form submit", count: 312, pct: 39.9 },
  { step: "Coupon download", count: 418, pct: 134.0 },
];

const CHANNELS = [
  { ch: "Meta — Awareness", spend: 540, imp: 102000, clicks: 2142, ctr: 2.1, cpc: 0.25, leads: 84, cpl: 6.43 },
  { ch: "Meta — Lead Gen", spend: 480, imp: 76000, clicks: 1672, ctr: 2.2, cpc: 0.29, leads: 109, cpl: 4.40 },
  { ch: "Meta — Retargeting", spend: 180, imp: 19000, clicks: 627, ctr: 3.3, cpc: 0.29, leads: 41, cpl: 4.39 },
  { ch: "Google — Branded", spend: 200, imp: 12000, clicks: 480, ctr: 4.0, cpc: 0.42, leads: 38, cpl: 5.26 },
  { ch: "Google — Generic", spend: 480, imp: 28000, clicks: 952, ctr: 3.4, cpc: 0.50, leads: 32, cpl: 15.00 },
  { ch: "Google — Competitor", spend: 120, imp: 7000, clicks: 224, ctr: 3.2, cpc: 0.54, leads: 8, cpl: 15.00 },
];

const REGIONS = [
  { region: "Lombardia", sessions: 1432 },
  { region: "Lazio", sessions: 962 },
  { region: "Emilia-Romagna", sessions: 718 },
  { region: "Veneto", sessions: 564 },
  { region: "Piemonte", sessions: 412 },
  { region: "Toscana", sessions: 378 },
  { region: "Other", sessions: 657 },
];

const DEVICES = [
  { d: "Mobile", pct: 68 },
  { d: "Desktop", pct: 27 },
  { d: "Tablet", pct: 5 },
];

const LOCALE = [{ l: "Italian", pct: 91 }, { l: "English", pct: 9 }];

const ENGAGEMENT = {
  avgSession: "2m 14s",
  engagedPct: 64.3,
  scroll75: [
    { page: "/", rate: 71 },
    { page: "/destinazioni/rome", rate: 58 },
    { page: "/destinazioni/lisbon", rate: 62 },
    { page: "/blog/quando-prenotare-voli-europa", rate: 81 },
    { page: "/grazie", rate: 92 },
  ],
};

const COUPON_BY_DEST = [
  { dest: "Lisbon", count: 142, pct: 34 },
  { dest: "Barcelona", count: 117, pct: 28 },
  { dest: "Amsterdam", count: 79, pct: 19 },
  { dest: "Rome", count: 50, pct: 12 },
  { dest: "Prague", count: 30, pct: 7 },
];

// ---- helpers ---------------------------------------------------
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-cream-dark p-5 ${className}`}>{children}</div>
);

const PanelTitle = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="mb-4">
    <div className="text-[10px] uppercase tracking-[0.18em] text-burnt mb-1">{tag}</div>
    <h3 className="font-display text-xl text-forest leading-tight">{title}</h3>
    {sub && <div className="text-xs text-forest/60 mt-1">{sub}</div>}
  </div>
);

// Tiny SVG line chart
function LineChart({
  data, width = 520, height = 180, color = "#D97642",
}: { data: { w: string; sessions: number; leads: number }[]; width?: number; height?: number; color?: string }) {
  const padX = 36, padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const maxS = Math.max(...data.map(d => d.sessions));
  const points = data.map((d, i) => {
    const x = padX + (i * innerW) / (data.length - 1);
    const y = padY + innerH - (d.sessions / maxS) * innerH;
    return [x, y] as const;
  });
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${points[points.length - 1][0]},${padY + innerH} L${points[0][0]},${padY + innerH} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="acq-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={padX} x2={width - padX} y1={padY + innerH * g} y2={padY + innerH * g}
          stroke="#E8E0D0" strokeWidth="1" strokeDasharray="3,3" />
      ))}
      <path d={area} fill="url(#acq-grad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#F5EFE6" stroke={color} strokeWidth="2" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={points[i][0]} y={height - 6} fontSize="9" fill="#5A6B62" textAnchor="middle">
          W{i + 1}
        </text>
      ))}
    </svg>
  );
}

// Donut chart (devices)
function Donut({ data, size = 140 }: { data: { d: string; pct: number }[]; size?: number }) {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const colors = ["#1F3A2E", "#D97642", "#B85F31"];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <g transform={`translate(${size / 2},${size / 2}) rotate(-90)`}>
        {data.map((d, i) => {
          const dash = (d.pct / 100) * c;
          const el = (
            <circle key={d.d} r={r} fill="transparent" stroke={colors[i % colors.length]}
              strokeWidth="14" strokeDasharray={`${dash} ${c}`} strokeDashoffset={-offset} />
          );
          offset += dash;
          return el;
        })}
      </g>
      <text x={size / 2} y={size / 2 - 2} fontSize="14" fontFamily="serif" fill="#1F3A2E" textAnchor="middle">
        {data[0].pct}%
      </text>
      <text x={size / 2} y={size / 2 + 14} fontSize="9" fill="#5A6B62" textAnchor="middle">
        {data[0].d}
      </text>
    </svg>
  );
}

// ---- page -----------------------------------------------------
export default function Dashboard() {
  return (
    <>
      <Nav />
      <main className="bg-cream min-h-screen">
        <article className="container-x py-12 max-w-7xl">
          {/* Header strip */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-2">
                Campaign Dashboard · Looker Studio mock
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-forest leading-tight">
                Backpack &amp; Bottle — Live Performance
              </h1>
              <div className="text-forest/60 text-sm mt-2">
                Date range: <span className="text-forest font-medium">5 May – 15 Jun 2026</span> ·
                Last refresh: <span className="text-forest font-medium">12 hours ago</span> ·
                Source: <span className="text-forest font-medium">GA4 + Google Ads + Meta Ads</span>
              </div>
            </div>
            <div className="text-xs text-forest/60 bg-cream-dark/60 rounded-full px-3 py-1.5 border border-cream-dark">
              ▣ Mock projection · live data flows in once campaign launches
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            {KPIS.map((k) => (
              <div key={k.label} className="bg-forest text-cream rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-cream/60">{k.label}</div>
                <div className="font-display text-2xl mt-1">{k.value}</div>
                <div className="flex items-center gap-2 mt-2 text-[11px]">
                  <span className={k.good ? "text-burnt" : "text-cream/70"}>{k.delta}</span>
                  <span className="text-cream/50">vs €{k.target.replace("€","")}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Panel grid */}
          <div className="grid lg:grid-cols-3 gap-5 mt-6">
            {/* Panel 1 — Acquisition */}
            <Card className="lg:col-span-2">
              <PanelTitle tag="01 · Acquisition" title="Sessions by week"
                sub="Top of funnel · 6-week ramp peaks in week 3" />
              <LineChart data={ACQ_WEEKS} />
              <div className="grid grid-cols-6 gap-2 mt-3 text-[10px] text-forest/60">
                {ACQ_WEEKS.map((w, i) => (
                  <div key={i} className="text-center">
                    <div className="font-medium text-forest">{w.sessions}</div>
                    <div>{w.w}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Panel 2 — Funnel */}
            <Card>
              <PanelTitle tag="02 · Funnel" title="Conversion path"
                sub="Sessions → coupon downloads" />
              <div className="space-y-2.5 mt-2">
                {FUNNEL.map((f, i) => {
                  const widthPct = (f.count / FUNNEL[0].count) * 100;
                  return (
                    <div key={f.step}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-forest font-medium">{f.step}</span>
                        <span className="text-forest/70">{f.count.toLocaleString()}</span>
                      </div>
                      <div className="h-6 bg-cream-dark/50 rounded relative overflow-hidden">
                        <div
                          className="h-full bg-burnt rounded flex items-center px-2 text-[10px] text-cream"
                          style={{ width: `${widthPct}%` }}
                        >
                          {i > 0 && <span>{f.pct.toFixed(1)}% of prev</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Panel 3 — Cost */}
            <Card className="lg:col-span-3">
              <PanelTitle tag="03 · Cost" title="Spend by channel"
                sub="60% Meta / 40% Google · €2,000 total · efficiency by sub-campaign" />
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-forest/60 text-[10px] uppercase tracking-wider border-b border-cream-dark">
                      <th className="text-left py-2 pr-3">Channel · Campaign</th>
                      <th className="text-right py-2 px-2">Spend</th>
                      <th className="text-right py-2 px-2">Impressions</th>
                      <th className="text-right py-2 px-2">Clicks</th>
                      <th className="text-right py-2 px-2">CTR</th>
                      <th className="text-right py-2 px-2">CPC</th>
                      <th className="text-right py-2 px-2">Leads</th>
                      <th className="text-right py-2 pl-2">CPL</th>
                    </tr>
                  </thead>
                  <tbody className="text-forest">
                    {CHANNELS.map((c) => (
                      <tr key={c.ch} className="border-b border-cream-dark/50">
                        <td className="py-2 pr-3 font-medium">{c.ch}</td>
                        <td className="text-right py-2 px-2">€{c.spend}</td>
                        <td className="text-right py-2 px-2">{c.imp.toLocaleString()}</td>
                        <td className="text-right py-2 px-2">{c.clicks.toLocaleString()}</td>
                        <td className="text-right py-2 px-2">{c.ctr}%</td>
                        <td className="text-right py-2 px-2">€{c.cpc}</td>
                        <td className="text-right py-2 px-2">{c.leads}</td>
                        <td className={`text-right py-2 pl-2 font-medium ${c.cpl > 10 ? "text-burnt-dark" : "text-forest"}`}>
                          €{c.cpl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="py-2 pr-3">Total</td>
                      <td className="text-right py-2 px-2">€2,000</td>
                      <td className="text-right py-2 px-2">{CHANNELS.reduce((s,c)=>s+c.imp,0).toLocaleString()}</td>
                      <td className="text-right py-2 px-2">{CHANNELS.reduce((s,c)=>s+c.clicks,0).toLocaleString()}</td>
                      <td className="text-right py-2 px-2">2.7%</td>
                      <td className="text-right py-2 px-2">€0.32</td>
                      <td className="text-right py-2 px-2">{CHANNELS.reduce((s,c)=>s+c.leads,0)}</td>
                      <td className="text-right py-2 pl-2">€6.41</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Panel 4 — Audience */}
            <Card className="lg:col-span-2">
              <PanelTitle tag="04 · Audience" title="Geography &amp; device"
                sub="Italian primary · mobile-first · IT/EN split" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-forest/60 mb-2">Top regions (sessions)</div>
                  <div className="space-y-1.5">
                    {REGIONS.map((r) => {
                      const max = REGIONS[0].sessions;
                      return (
                        <div key={r.region} className="flex items-center gap-2 text-xs">
                          <div className="w-32 text-forest">{r.region}</div>
                          <div className="flex-1 bg-cream-dark/40 rounded h-3 overflow-hidden">
                            <div className="h-full bg-forest rounded" style={{ width: `${(r.sessions / max) * 100}%` }} />
                          </div>
                          <div className="w-12 text-right text-forest/70">{r.sessions}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <Donut data={DEVICES} />
                    <div className="text-[10px] uppercase tracking-wider text-forest/60 mt-2">Devices</div>
                    <div className="text-[10px] text-forest/70 mt-0.5">
                      Mob {DEVICES[0].pct}% · Desk {DEVICES[1].pct}% · Tab {DEVICES[2].pct}%
                    </div>
                  </div>
                  <div className="text-center">
                    <Donut data={LOCALE.map(l => ({ d: l.l, pct: l.pct }))} />
                    <div className="text-[10px] uppercase tracking-wider text-forest/60 mt-2">Locale</div>
                    <div className="text-[10px] text-forest/70 mt-0.5">
                      IT {LOCALE[0].pct}% · EN {LOCALE[1].pct}%
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Panel 5 — Engagement */}
            <Card>
              <PanelTitle tag="05 · Engagement" title="Quality of attention"
                sub="Session duration + scroll depth" />
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-cream-dark/40 rounded-lg p-3">
                  <div className="text-[10px] uppercase text-forest/60">Avg. session</div>
                  <div className="font-display text-2xl text-forest">{ENGAGEMENT.avgSession}</div>
                </div>
                <div className="bg-cream-dark/40 rounded-lg p-3">
                  <div className="text-[10px] uppercase text-forest/60">Engaged %</div>
                  <div className="font-display text-2xl text-forest">{ENGAGEMENT.engagedPct}%</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-forest/60 mb-2">scroll_75 by page</div>
                <div className="space-y-1.5">
                  {ENGAGEMENT.scroll75.map((s) => (
                    <div key={s.page} className="flex items-center gap-2 text-[11px]">
                      <div className="w-44 text-forest font-mono truncate">{s.page}</div>
                      <div className="flex-1 bg-cream-dark/40 rounded h-2 overflow-hidden">
                        <div className="h-full bg-burnt rounded" style={{ width: `${s.rate}%` }} />
                      </div>
                      <div className="w-9 text-right text-forest/70">{s.rate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Panel 6 — Coupon by destination */}
            <Card className="lg:col-span-3">
              <PanelTitle tag="06 · Coupon" title="Downloads by destination interest"
                sub="Custom dim 'destination' · which city drives leads · BB50 coupon downloads" />
              <div className="grid md:grid-cols-5 gap-3 mt-2">
                {COUPON_BY_DEST.map((d, i) => {
                  const max = COUPON_BY_DEST[0].count;
                  return (
                    <div key={d.dest} className="bg-cream-dark/40 rounded-lg p-3 flex flex-col">
                      <div className="text-[10px] uppercase tracking-wider text-burnt">
                        #{i + 1} · {d.pct}%
                      </div>
                      <div className="font-display text-xl text-forest mt-1">{d.dest}</div>
                      <div className="font-display text-3xl text-burnt-dark mt-2">{d.count}</div>
                      <div className="text-[10px] text-forest/60 mt-1">downloads</div>
                      <div className="mt-3 bg-cream-dark/60 rounded h-1.5 overflow-hidden">
                        <div className="h-full bg-burnt" style={{ width: `${(d.count / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Footer note */}
          <div className="mt-10 bg-forest text-cream rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-burnt mb-2">How to read this</div>
                <p className="text-sm text-cream/85">
                  This is the projected layout of our Looker Studio dashboard. Numbers are based on the
                  KPI tree at <code className="bg-cream/10 px-1 rounded">/measurement</code> with a 6-week
                  campaign ramp at Italian travel-sector benchmarks.
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-burnt mb-2">Data sources</div>
                <ul className="text-sm text-cream/85 space-y-1">
                  <li>· GA4 (G-FHBQE8QZM9) — sessions, events, audience</li>
                  <li>· Google Ads — spend, CTR, conversions</li>
                  <li>· Meta Ads — spend, CTR, CompleteRegistration</li>
                  <li>· Brevo — bookings (offline import)</li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-burnt mb-2">Live build</div>
                <p className="text-sm text-cream/85">
                  Built in Looker Studio with the GA4 connector + Google Ads connector + Meta Ads via
                  Supermetrics. Refreshes every 12 hours. Sharing: anyone-with-link, viewer.
                </p>
                <a href="https://lookerstudio.google.com" className="inline-block mt-2 text-burnt text-sm underline">
                  Build on lookerstudio.google.com →
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
