# Backpack & Bottle — Automation Playbook

Everything that should happen *automatically* the moment a lead is captured — and what to wire up when you go live.

---

## The flow at a glance

```
                ┌──────────────────────┐
   User submits │    POST /api/lead    │
   the form ──▶ │  (Vercel function)   │
                └──────────┬───────────┘
                           │
                           │  Forwards JSON to LEAD_WEBHOOK_URL
                           ▼
                ┌──────────────────────┐
                │    Zapier (or Make)  │
                │   "Catch B&B lead"   │
                └──────────┬───────────┘
                           │
              ┌────────────┼────────────┬────────────┬──────────────┐
              ▼            ▼            ▼            ▼              ▼
        ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐
        │ Mailchimp│ │  Google  │ │  Slack  │ │ Meta CAPI│ │ Internal log │
        │  ESP     │ │  Sheets  │ │ #bb-    │ │ Lead     │ │ (Vercel logs)│
        │          │ │  master  │ │ leads   │ │ event    │ │              │
        └────┬─────┘ └──────────┘ └─────────┘ └──────────┘ └──────────────┘
             │
             │  Triggers welcome series:
             ▼
        ┌──────────────────────────────┐
        │ T+0   Coupon delivery        │
        │ T+1d  Welcome + destinations │
        │ T+3d  Destination deep dive  │
        │ T+7d  Booking psychology     │
        │ Tue   Weekly deal alert      │
        │ T+30  Reminder if no booking │
        │ T+83  Expiry warning (7d)    │
        │ T+45  Re-engage if dormant   │
        └──────────────────────────────┘
```

---

## Wave 1 — Wire the Zapier chain (~25 min)

### Step 1.1 — Create the Zap

1. https://zapier.com → Create Zap
2. **Trigger** = Webhooks by Zapier → Catch Hook
3. Copy the webhook URL Zapier gives you.
4. In Vercel → Settings → Environment Variables: add `LEAD_WEBHOOK_URL = <that URL>`. Add to Production + Preview + Development.
5. In `app/api/lead/route.ts`, uncomment the webhook block (lines 26–32). Commit + push (Vercel auto-deploys).
6. Submit a test form on the live site → check Zapier sees the payload.

### Step 1.2 — Branch 1: Mailchimp

7. Add Action → Mailchimp → Add/Update Subscriber.
8. Audience: "Backpack & Bottle leads" (create if not exists).
9. Map fields:
   - Email Address → `email`
   - Status → `subscribed` (or `pending` for double opt-in)
   - Tags → `interest`, `departure`, `locale`
   - Merge fields: FNAME → `name`, INTEREST → `interest`, DEPART → `departure`
10. Toggle **Update existing subscribers** ON (idempotent).

### Step 1.3 — Branch 2: Google Sheets master log

11. Add Action → Google Sheets → Create Spreadsheet Row.
12. Sheet: "Backpack & Bottle — leads master" (one row per lead, cumulative).
13. Columns: `ts`, `name`, `email`, `departure`, `interest`, `locale`, `source`, `consent`.

### Step 1.4 — Branch 3: Slack alert

14. Add Action → Slack → Send Channel Message.
15. Channel: `#bb-leads` (create the channel first).
16. Message:
    ```
    🎒🍷 New lead: *{{name}}* ({{email}}) interested in *{{interest}}* from {{departure}}
    ```
17. **Rate-limit:** Add a Filter step before Slack — only send if `Math.random() < 0.2` (every 5th lead) OR if `interest` contains a high-value city. Otherwise channel becomes noise.

### Step 1.5 — Branch 4: Meta Conversions API (server-side Lead)

iOS 14+ broke client-side Pixel match rates. Server-side CAPI fixes that.

18. https://business.facebook.com → Events Manager → Settings → Generate access token.
19. Add Action → Webhooks by Zapier → POST.
20. URL: `https://graph.facebook.com/v18.0/{PIXEL_ID}/events?access_token={CAPI_TOKEN}`
21. Body (JSON):
    ```json
    {
      "data": [{
        "event_name": "Lead",
        "event_time": "{{epoch}}",
        "event_source_url": "{{source}}",
        "action_source": "website",
        "user_data": { "em": "[sha256(email)]" },
        "custom_data": { "currency": "EUR", "value": 50, "content_name": "{{interest}}" }
      }]
    }
    ```
22. **Critical:** add a Code by Zapier step before this to SHA-256 hash the email — Meta requires hashed PII.

---

## Wave 2 — ESP welcome series (Mailchimp Customer Journey)

### Email 1 — Coupon delivery (T+0)

- **Subject (IT):** Il tuo coupon BB50 è arrivato 🎒🍷
- **Subject (EN):** Your BB50 coupon is here 🎒🍷
- **Pre-header:** €50 di sconto · valido 90 giorni · 10 destinazioni
- **Body:** Welcome, here's your code, button to apply (links to `/?coupon=BB50`), download PDF button, 5 most-popular destinations grid
- **CTAs:** "Browse the 10 destinations" · "Download the PDF coupon"

### Email 2 — Welcome + brand intro (T+1 day)

- Why Backpack & Bottle (the curation thesis), 4 pillars (curated / transparent / authentic / fast), founder note (Group 3 academic context if appropriate)
- CTA: "See all 10 cities"

### Email 3 — Destination deep dive (T+3 days, personalised)

- Pull `interest` field. If `rome` → send the Rome long-form. If `barcelona` → Barcelona.
- Hero image + 3-day itinerary + €280 (or city price) + button "Book Rome with BB50"
- Personalised by Mailchimp merge tag

### Email 4 — Booking psychology (T+7 days)

- Subject: "Quando prenotare il tuo volo (dati 2026)"
- Body excerpt + link to `/blog/quando-prenotare-voli-europa`
- CTA: "Plan your trip with €50 off"

### Email 5 — Weekly deal alert (every Tuesday 10:00 Europe/Rome)

- One destination, one story, one price. Rotate the 10 cities.
- 1 paragraph + 1 image + 1 button.

### Email 6 — Reminder (T+30 days, only if no redemption)

- Subject: "Hai ancora 60 giorni per usare il tuo coupon"
- 3 picks based on declared `interest`

### Email 7 — Expiry warning (T+83 days, only if no redemption)

- Subject: "Ultimi 7 giorni per il tuo €50"
- Single CTA, urgency

### Email 8 — Re-engagement (T+45 days, only if dormant — no opens 21 days)

- Single question survey: "What's stopping you?"
- Options: Price · Date · Destination · Other

---

## Wave 3 — Optional automations (when scope grows)

### CAPI for Pageview + ViewContent

Mirror more events server-side via the same Meta CAPI pattern. Useful when iOS 14+ users break ad attribution.

### Multi-touch attribution

Capture `utm_source` / `utm_campaign` / `utm_medium` from referer in `/api/lead`, store in the lead row, expose in the Slack alert + Sheet for ROI analysis.

### Slack daily digest (instead of per-lead)

Replace per-lead Slack with a daily digest at 09:00:
- Yesterday: X leads, breakdown by interest
- Top destination yesterday
- Best-performing channel (utm)

### Discord / Telegram alternative

Same pattern, swap Slack for Discord or Telegram webhooks.

### Auto-respond to support replies (Mailchimp)

If user replies to coupon email with "stop" → auto-unsubscribe.
If user replies with question → forward to founder inbox + auto-acknowledge.

---

## Wave 4 — Replace Zapier with code (when traffic justifies)

At ~10k leads/year, Zapier becomes the bottleneck (€50+/mo, rate limits). Migration path:

1. Move the chain into a Vercel cron job + Inngest (free tier 50k events).
2. Or self-host an n8n instance (~€5/mo).
3. The dataLayer + `/api/lead` contract stays identical — only the orchestration layer changes.

---

## Environment variables checklist

Add these in Vercel (Production + Preview + Development scopes):

| Variable | Source | Purpose |
|---|---|---|
| `LEAD_WEBHOOK_URL` | Zapier "Catch Hook" URL | Forward leads to automation chain |
| `NEXT_PUBLIC_GTM_ID` | tagmanager.google.com | Tag manager |
| `NEXT_PUBLIC_GA4_ID` | analytics.google.com | Analytics |
| `NEXT_PUBLIC_META_PIXEL_ID` | business.facebook.com | Pixel client-side |
| `NEXT_PUBLIC_CLARITY_ID` | clarity.microsoft.com | Heatmaps + recordings |
| `META_CAPI_TOKEN` | Events Manager → Settings | Server-side Lead event |
| `SLACK_WEBHOOK_URL` | api.slack.com/apps | Slack alerts (if not via Zapier) |
| `SENTRY_DSN` (optional) | sentry.io | Error tracking |

---

## Test plan once wired

1. Submit form on the live site with `test+1@yourdomain.com`
2. Check Zapier history → step 1 (Catch Hook) shows payload ✓
3. Check Mailchimp audience → email present with tags ✓
4. Check Google Sheet → row appended ✓
5. Check Slack channel → message arrived (or skipped per filter) ✓
6. Check Meta Events Manager → Test Events tab shows server-side Lead ✓
7. Check Mailchimp Customer Journey → email 1 delivered within 1 min ✓

If all 7 ✓ — automation is live.
