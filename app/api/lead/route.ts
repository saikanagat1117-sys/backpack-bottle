import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

    // Forward to Google Sheet / Mailchimp / Klaviyo webhook (configure via env):
    // if (process.env.LEAD_WEBHOOK_URL) {
    //   await fetch(process.env.LEAD_WEBHOOK_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(lead),
    //   });
    // }

    return NextResponse.json({ ok: true, coupon: "BB50" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
