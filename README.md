# Backpack & Bottle — Campaign Site

Next.js 14 landing page + blog for the "Backpack & Bottle" travel campaign. Academic project, Bologna Business School — Digital Platforms Laboratory.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Deployed on Vercel
- Tracking: Google Tag Manager → GA4 + Meta Pixel + Google Ads (with GDPR Consent Mode v2)

## Pages
- `/` — Italian landing page with EN toggle (hero, value prop, destinations, how it works, social proof, lead form)
- `/grazie` — thank-you page with coupon code, fires `thank_you_view`
- `/blog`, `/blog/[slug]` — 3 SEO posts
- `/privacy` — GDPR privacy & cookie policy + coupon T&Cs
- `/api/lead` — lead capture endpoint

## Tracking events (dataLayer)
| Event | When | Key params |
|---|---|---|
| `page_view` | auto via GTM | — |
| `cta_click` | nav + hero CTAs | location |
| `destination_card_click` | destination card | destination |
| `form_start` | first focus on form | form |
| `form_submit` | successful submit | form, destination |
| `coupon_download` | after submit | coupon_code, value, currency |
| `thank_you_view` | /grazie load | value, currency |
| `consent_update` | cookie banner choice | ad_storage, analytics_storage |
| `scroll_75` | configure in GTM | — |

## Local setup
```
npm install
cp .env.local.example .env.local   # fill in GTM / GA4 / Pixel IDs
npm run dev
```

## Deploy to Vercel
1. Push this repo to GitHub (`saikanagat1117-sys/backpack-bottle`).
2. Import into Vercel (vercel.com/new → GitHub).
3. Add env vars in Vercel project settings.
4. Deploy → get `.vercel.app` URL.

## GTM setup
In your GTM container, add:
- **GA4 Configuration tag** — measurement ID = `NEXT_PUBLIC_GA4_ID`, fires on All Pages.
- **GA4 Event tags** — one per dataLayer event above (trigger: Custom Event).
- **Meta Pixel base code** — Pixel ID, fires on All Pages.
- **Meta Pixel Lead event** — trigger: Custom Event = `form_submit`.
- **Google Ads conversion** — trigger: Custom Event = `coupon_download`, value = 50, currency = EUR.
- **Consent Mode v2** — built-in consent settings, read from `consent_update` event.
