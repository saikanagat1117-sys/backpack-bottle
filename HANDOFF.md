# Backpack & Bottle — Handoff & Manual Interventions

**Group 3 · Digital Platforms Lab · Bologna Business School**

Everything that's already done is done. This file lists the steps **only you can do** (because they need your personal Google / Meta / Brevo accounts) — and exactly how to do them.

If you stop after step 1, you have a fully functional academic submission. Steps 2–6 take it from "demo" to "actually live in market."

---

## ✅ What's already done

- **Live site:** https://backpack-bottle.vercel.app
- **GitHub repo:** https://github.com/saikanagat1117-sys/backpack-bottle
- **Branded coupon PDF:** https://backpack-bottle.vercel.app/backpack-bottle-coupon-BB50.pdf
- **Measurement page:** https://backpack-bottle.vercel.app/measurement
- **Privacy & T&Cs:** https://backpack-bottle.vercel.app/privacy
- **Blog (3 SEO posts):** https://backpack-bottle.vercel.app/blog
- **Presentation deck:** `Backpack-Bottle-Campaign.pptx` in repo root (34 slides)
- **Brand identity, dataLayer, Consent Mode v2 banner, lead API, full IT/EN toggle:** all wired and deployed.

---

## 🔧 Manual interventions (in order)

### 1. (Optional) Submit as-is for the academic deliverable

If your only goal is the course submission — you're done. Hand in:

- **Slide deck:** `Backpack-Bottle-Campaign.pptx`
- **Live URL:** https://backpack-bottle.vercel.app
- **GitHub:** https://github.com/saikanagat1117-sys/backpack-bottle

The site loads with placeholder GTM/GA4/Pixel IDs. No real tracking will fire until step 2.
The professor can browse all pages, the form submits successfully, the coupon PDF downloads, and `/measurement` documents the entire stack — same evidence as if it were live.

If you want to demonstrate a working end-to-end with real tracking firing, do steps 2–4.

---

### 2. Create the GTM container + GA4 property + Meta Pixel

**Time:** ~20 minutes. **Cost:** €0.

#### a) Google Tag Manager
1. Go to https://tagmanager.google.com → "Create account"
2. Account name: `Backpack & Bottle` · Country: `Italy`
3. Container name: `backpack-bottle-web` · Target platform: `Web`
4. Copy the **GTM-XXXXXXX** ID (top right of the workspace).

#### b) Google Analytics 4
1. Go to https://analytics.google.com → Admin → Create Property
2. Property name: `Backpack & Bottle` · Time zone: `Italy` · Currency: `EUR`
3. Choose **Web** stream → URL: `https://backpack-bottle.vercel.app`
4. Copy the **G-XXXXXXXXXX** measurement ID.

#### c) Meta Pixel
1. Go to https://business.facebook.com → Events Manager → Connect data → Web → Meta Pixel
2. Pixel name: `Backpack & Bottle Pixel`
3. URL: `https://backpack-bottle.vercel.app`
4. Copy the **15-digit Pixel ID**.

#### d) Paste IDs into Vercel
1. Go to https://vercel.com/saikanagat1117-sys-projects/backpack-bottle/settings/environment-variables
2. Add the three variables (Production + Preview + Development scopes):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` (from step a) |
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXXXXX` (from step b) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` (from step c) |

3. Trigger a redeploy: **Deployments → top deployment → ⋯ → Redeploy** (or run `vercel --prod` from your terminal in the project folder).

Site is now firing GTM. But GTM won't have any **tags** yet — that's step 3.

---

### 3. Configure GTM tags

In your GTM workspace (https://tagmanager.google.com), add these **10 tags + 10 triggers**. Detailed configs are in `/measurement` on the live site, but here's the click-by-click version:

#### Triggers to create first
1. **All Pages** → Page View, all pages (built-in)
2. **CE - cta_click** → Custom Event = `cta_click`
3. **CE - destination_card_click** → Custom Event = `destination_card_click`
4. **CE - form_start** → Custom Event = `form_start`
5. **CE - form_submit** → Custom Event = `form_submit`
6. **CE - coupon_download** → Custom Event = `coupon_download`
7. **CE - thank_you_view** → Custom Event = `thank_you_view`
8. **Scroll - 75%** → Built-in Scroll Depth, Vertical 75%, all pages

#### Variables to create
- **DLV - destination** → Data Layer Variable, name = `destination`
- **DLV - location** → Data Layer Variable, name = `location`
- **DLV - value** → Data Layer Variable, name = `value`
- **DLV - currency** → Data Layer Variable, name = `currency`
- **DLV - coupon_code** → Data Layer Variable, name = `coupon_code`

#### Tags to create

| Tag | Type | Trigger | Notes |
|---|---|---|---|
| GA4 Configuration | Google Analytics: GA4 Configuration | All Pages | Measurement ID = `{{NEXT_PUBLIC_GA4_ID}}` (or paste literal). Send page view = ON |
| GA4 Event - cta_click | GA4 Event | CE - cta_click | Event name = `cta_click`. Param: location = `{{DLV - location}}` |
| GA4 Event - form_submit | GA4 Event | CE - form_submit | Event name = `form_submit`. Mark as conversion in GA4 |
| GA4 Event - coupon_download | GA4 Event | CE - coupon_download | Event name = `coupon_download`, value = `{{DLV - value}}`, currency = `{{DLV - currency}}`. Mark as conversion |
| GA4 Event - destination_click | GA4 Event | CE - destination_card_click | Event = `destination_card_click`, custom dim destination = `{{DLV - destination}}` |
| GA4 Event - scroll_75 | GA4 Event | Scroll - 75% | Event = `scroll_75` |
| Meta Pixel - Base | Custom HTML | All Pages | Paste Meta base pixel snippet, replace ID |
| Meta Pixel - Lead | Custom HTML | CE - form_submit | `fbq('track', 'Lead');` |
| Meta Pixel - CompleteRegistration | Custom HTML | CE - coupon_download | `fbq('track', 'CompleteRegistration', {value: 50, currency: 'EUR'});` |
| Google Ads Conversion (optional) | Google Ads Conversion Tracking | CE - coupon_download | Plug in conversion ID + label after creating in Google Ads |

#### Consent Mode v2 (already wired in code)
- The site fires `consent_update` automatically when the user clicks Accept/Reject. GTM will receive it. Inside each tag's **Advanced Settings → Consent Settings**, set "Require additional consent": for GA4 tags select `analytics_storage`; for Meta + Google Ads select `ad_storage`, `ad_user_data`, `ad_personalization`.

#### Publish
After all tags + triggers are in: top right → **Submit** → Version name "v1 launch" → Publish.

#### Verify
- Use **GTM Preview mode** (top right "Preview"): paste the Vercel URL, click around on the site, verify each event fires in the right column.
- Open the live site in a fresh tab → DevTools → Console → type `dataLayer` → confirm events appear.

---

### 4. Connect the lead form to a real ESP

Right now `/api/lead` logs leads to Vercel function logs only. To actually capture them:

#### Option A — Brevo (free up to 500 contacts)
1. Sign up at https://mailchimp.com (free tier).
2. Create an audience called `Backpack & Bottle leads`.
3. Generate a Webhook URL via Zapier or Make.com:
   - Zapier: New Zap → Trigger = Webhooks by Zapier (Catch Hook) → copy URL → Action = Brevo Add/Update Subscriber.
4. In Vercel env vars, add: `LEAD_WEBHOOK_URL = https://hooks.zapier.com/...`
5. Uncomment the webhook block in `app/api/lead/route.ts` (lines 26–32) and redeploy.

#### Option B — Google Sheets (simplest)
1. Create a new Google Sheet.
2. Apps Script (Extensions → Apps Script) → paste a doPost handler → deploy as Web App → copy URL.
3. Set `LEAD_WEBHOOK_URL` in Vercel = the Apps Script URL.
4. Uncomment the webhook block + redeploy.

(Apps Script template is in `scripts/google-sheets-webhook.gs.example` — see step 7 in this file.)

---

### 5. Enable Vercel password protection (so the site is non-public)

You asked for password gating. Free on the **Pro** plan, **paid** on Hobby. Three options:

#### Option A — Pay €20/mo for Vercel Pro (simplest)
1. https://vercel.com/saikanagat1117-sys-projects/settings/billing → Upgrade to Pro
2. Project → Settings → Deployment Protection → **Standard Protection** → set a password.
3. Share URL + password with the professor.

#### Option B — Free workaround: Basic Auth via middleware
Add a `middleware.ts` to the repo that checks an `Authorization` header and challenges otherwise. Username/password as env vars. I can write this for you in 2 minutes — just say "do basic auth" and I'll patch + redeploy.

#### Option C — Skip it
Honestly, fine for this submission. The site has zero PII exposed; the academic context makes a public URL completely safe. **Recommended unless your prof specifically said gated.**

---

### 6. Build the Looker Studio dashboard

1. https://lookerstudio.google.com → Blank report
2. Add data source → GA4 → connect your property
3. Build the 6 panels documented in `/measurement`:
   - Acquisition (Sessions/Users by source/medium)
   - Funnel (Visit → form_start → form_submit → coupon_download)
   - Cost (when Google Ads connected)
   - Audience (Geo by Italian regions, device, age)
   - Engagement (Avg session duration, scroll_75 rate)
   - Coupon (downloads by destination_interest custom dim)
4. Set sharing → Anyone with link → Viewer.
5. Paste the dashboard URL into the deck (slide 31 "Where to find everything").

---

### 7. (Optional) Apps Script template for Google Sheets lead capture

Save as `scripts/google-sheets-webhook.gs.example` and adapt:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  const data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'name', 'email', 'departure', 'interest', 'locale', 'source', 'ip']);
  }
  sheet.appendRow([data.ts, data.name, data.email, data.departure, data.interest, data.locale, data.source, data.ip]);
  return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
}
```

Deploy → New deployment → Web app → Execute as: Me, Access: Anyone → copy URL → that's your `LEAD_WEBHOOK_URL`.

---

## 🧪 Smoke test checklist (run before submission)

- [ ] Open https://backpack-bottle.vercel.app on desktop
- [ ] Click EN toggle in nav — copy switches
- [ ] Cookie banner appears on first visit, closes after Accept/Reject
- [ ] Scroll to form, fill in (test email), submit
- [ ] Land on `/grazie`, click "Download the coupon PDF" — PDF opens
- [ ] Open https://backpack-bottle.vercel.app/measurement — full plan visible
- [ ] Open https://backpack-bottle.vercel.app/blog — 3 posts listed, click into one
- [ ] Open https://backpack-bottle.vercel.app/privacy — policy visible
- [ ] Mobile: open on your phone, repeat the form flow
- [ ] DevTools Console → type `window.dataLayer` → array contains `cta_click`, `form_submit`, `coupon_download`, `consent_update`
- [ ] Open `Backpack-Bottle-Campaign.pptx` in PowerPoint or Keynote — all 34 slides render

---

## 📦 What goes into the academic submission

| Deliverable | Where | Purpose |
|---|---|---|
| **Slide deck** | `Backpack-Bottle-Campaign.pptx` | The required presentation |
| **Live site URL** | https://backpack-bottle.vercel.app | Demonstrates working campaign |
| **GitHub repo** | https://github.com/saikanagat1117-sys/backpack-bottle | Code transparency |
| **Measurement page** | https://backpack-bottle.vercel.app/measurement | KPI + tracking plan, on the live site |
| **Coupon PDF** | https://backpack-bottle.vercel.app/backpack-bottle-coupon-BB50.pdf | Branded coupon asset |

---

## 🤖 If something breaks

- **Site won't load:** check https://vercel.com/saikanagat1117-sys-projects/backpack-bottle/deployments — top one should be green.
- **Form returns error:** check Vercel function logs at `/api/lead` for the deployment.
- **Tags not firing:** GTM Preview mode tells you exactly what it sees on each page.
- **Need to redeploy after changing env vars:** `cd /Users/saikanagat/Downloads/backpack-bottle && vercel --prod`
- **Local dev:** `cd /Users/saikanagat/Downloads/backpack-bottle && npm run dev` → http://localhost:3000

---

**Group 3 · Sai Prathyaksh Kanagat · saikanagat1117@gmail.com**
