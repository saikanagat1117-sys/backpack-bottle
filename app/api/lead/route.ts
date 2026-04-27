import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3/contacts";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "0", 10);

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
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
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

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, departure, interest, consent, locale } = data || {};

    if (!email || !consent) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const lead = {
      ts: new Date().toISOString(),
      name,
      email,
      departure,
      interest,
      locale,
      source: req.headers.get("referer") || "direct",
      ip: req.headers.get("x-forwarded-for") || "",
    };

    console.log("[lead]", JSON.stringify(lead));

    // Push to Brevo (fire and continue, do not block response on Brevo latency)
    const brevoResult = await pushToBrevo({
      email,
      name,
      departure,
      interest,
      locale,
      source: lead.source,
    });
    console.log("[brevo]", JSON.stringify(brevoResult));

    return NextResponse.json({ ok: true, coupon: "BB50" });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
