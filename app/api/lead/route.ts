import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3/contacts";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "0", 10);
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN || "";
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || "";

// Simple in-memory rate limit (per-IP, per-minute). Resets on cold start.
const rl = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = rl.get(ip);
  if (!entry || entry.resetAt < now) {
    rl.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= max) return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  entry.count += 1;
  return { ok: true };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function sha256(input: string) {
  return crypto.createHash("sha256").update(input.trim().toLowerCase()).digest("hex");
}

async function pushToBrevo(lead: {
  email: string;
  name?: string;
  departure?: string;
  interest?: string;
  locale?: string;
  source: string;
}) {
  if (!BREVO_API_KEY || !BREVO_LIST_ID) return { skipped: true };
  const body = {
    email: lead.email,
    attributes: {
      FIRSTNAME: lead.name || "",
      DEPARTURE_CITY: lead.departure || "",
      DESTINATION_INTEREST: lead.interest || "",
      LOCALE: lead.locale || "it",
      COUPON_CODE: "BB50",
      SIGNUP_SOURCE: lead.source,
      SIGNUP_DATE: new Date().toISOString(),
    },
    listIds: [BREVO_LIST_ID],
    updateEnabled: true,
  };
  try {
    const res = await fetch(BREVO_API, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[brevo] failed", res.status, text);
      return { ok: false, status: res.status };
    }
    return { ok: true };
  } catch (err) {
    console.error("[brevo] error", err);
    return { ok: false, error: String(err) };
  }
}

async function pushMetaCAPI(lead: {
  email: string;
  ip?: string;
  ua?: string;
  source: string;
  interest?: string;
  fbp?: string;
  fbc?: string;
}) {
  if (!META_PIXEL_ID || !META_CAPI_TOKEN) return { skipped: true };
  const url = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`;
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: lead.source,
    action_source: "website",
    user_data: {
      em: [sha256(lead.email)],
      client_ip_address: lead.ip || undefined,
      client_user_agent: lead.ua || undefined,
      fbp: lead.fbp || undefined,
      fbc: lead.fbc || undefined,
    },
    custom_data: {
      currency: "EUR",
      value: 50,
      content_name: lead.interest || "BB50_coupon",
    },
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[meta-capi] failed", res.status, text);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[meta-capi] error", err);
    return { ok: false, error: String(err) };
  }
}

async function pushWebhook(payload: Record<string, unknown>) {
  if (!LEAD_WEBHOOK_URL) return { skipped: true };
  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("[webhook] error", err);
    return { ok: false };
  }
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const ua = req.headers.get("user-agent") || "";

    const rlResult = rateLimit(ip);
    if (!rlResult.ok) {
      return NextResponse.json(
        { ok: false, error: "rate_limited", retryAfter: rlResult.retryAfter },
        { status: 429, headers: { "retry-after": String(rlResult.retryAfter || 60) } }
      );
    }

    const data = await req.json();
    const { email, name, departure, interest, consent, locale, utm, fbp, fbc } = data || {};

    if (!email || !consent) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (name && (typeof name !== "string" || name.length > 100)) {
      return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
    }

    const source = req.headers.get("referer") || "direct";
    const lead = {
      ts: new Date().toISOString(),
      name: typeof name === "string" ? name.slice(0, 100) : "",
      email: email.toLowerCase().trim(),
      departure,
      interest,
      locale,
      source,
      ip,
      ua,
      utm: utm || null,
    };
    console.log("[lead]", JSON.stringify({ ...lead, ip: undefined, ua: undefined }));

    // Fan out to Brevo, Meta CAPI, optional generic webhook (Zapier/Make/Sheets) in parallel.
    const [brevoResult, capiResult, hookResult] = await Promise.all([
      pushToBrevo({ email: lead.email, name: lead.name, departure, interest, locale, source }),
      pushMetaCAPI({ email: lead.email, ip, ua, source, interest, fbp, fbc }),
      pushWebhook(lead),
    ]);
    console.log("[lead-fanout]", JSON.stringify({ brevoResult, capiResult, hookResult }));

    return NextResponse.json({ ok: true, coupon: "BB50" });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
