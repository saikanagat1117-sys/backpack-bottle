# 🌅 Morning briefing — Backpack & Bottle

**You're presenting Tuesday 5 May 2026.** This file is your single source of truth for what's done, what's left, and where everything lives.

---

## ✅ Shipped while you slept

### Deck v2 — `Backpack-Bottle-Campaign-v2.pptx`
- **48 slides** (was 34) in repo root next to v1 (kept as backup)
- 6-person team on cover + thank-you (Sai, Marica, Alberto, Cecilia, Marilu, Amelia)
- Mailchimp references replaced with Brevo
- Real production URLs everywhere
- 14 new slides:
  - Team & roles
  - A/B test plan (hero CTA hypothesis, sample size, decision rule)
  - Competitor benchmark (Volagratis, eDreams, Lastminute vs us)
  - Accessibility audit (8 WCAG checks, 6 pass / 3 partial)
  - 10 live-site screenshots (homepage, mobile, destination detail, /grazie, /privacy, /blog, /measurement, /stack, /dashboard)

### Files & PDFs
- `briefings/01-Sai-CRO-Specialist.pdf` (yours — read it first)
- `briefings/02-Marica-MarTech-Specialist.pdf`
- `briefings/03-Alberto-Compliance-Specialist.pdf`
- `briefings/04-Ceci-Email-Marketing-Specialist.pdf`
- `briefings/05-Marilu-Marketing-Automation-Specialist.pdf`
- `briefings/06-Amelia-Campaign-Analyst.pdf`

### Live site (all 200 OK)
- https://backpack-bottle.vercel.app — homepage
- https://backpack-bottle.vercel.app/measurement — KPI tree + 31 events
- https://backpack-bottle.vercel.app/stack — 6-layer architecture
- https://backpack-bottle.vercel.app/dashboard — Looker Studio mock (6 panels)
- https://backpack-bottle.vercel.app/destinazioni/lisbon — destination detail example
- https://backpack-bottle.vercel.app/blog — 3 SEO posts
- https://backpack-bottle.vercel.app/privacy — GDPR + T&Cs
- https://backpack-bottle.vercel.app/grazie — thank-you (noindex)
- https://backpack-bottle.vercel.app/sitemap.xml + /robots.txt

### Pipeline confirmed working
- Lead form → Brevo list 13 (test contact #67 verified)
- GA4 receiving page_view, file_download, form_start, scroll, user_engagement (real data)
- GTM Container `GTM-KSN24TZ2` published v5
- Vercel env vars set: GA4 ID, GTM ID, Brevo key, Brevo list ID

---

## 🟡 What you still need to click (15 min total before presentation)

### 1. **GA4 finishes** — 5 min
You're the only one who can do these because Google requires your live login session. Open https://analytics.google.com → property "backpwb" → Admin (gear icon).

- [ ] **Custom dimensions** (Data display → Custom definitions → Custom dimensions → Create):
  - `destination` · Event scope · param `destination`
  - `location` · Event scope · param `location`
  - `coupon_code` · Event scope · param `coupon_code`
  - `visit_count` · **User** scope · user property `visit_count`
  - `locale` · **User** scope · user property `locale`
- [ ] **Mark Key Events** (Events → run a test form submit on live site first → wait 30s → events appear → toggle "Mark as key event" for `form_submit`, `coupon_download`, `thank_you_view`)
- [ ] **Google Signals** (Data collection → toggle ON)
- [ ] **Data retention** (Data retention → 14 months)

### 2. **Verify form_submit fires in GA4** — 2 min
- Open https://backpack-bottle.vercel.app/ in incognito
- Click Accept on cookie banner
- Submit the form (`saikanagat1117+verify@gmail.com`)
- Click PDF download on /grazie
- GA4 → Reports → Realtime → "Event count by Event name" card → confirm `form_submit`, `coupon_download`, `thank_you_view` appear within 30s

If they don't appear → Consent Mode is blocking. Open GTM Preview mode and screenshot what fires/doesn't, paste me the screenshot in the next session.

### 3. **Admin invites** — 5 min
Add 4 emails to GA4 + GTM as Administrator. Already detailed in earlier instructions but quick recap:

```
ceciliagullett@gmail.com
marilustevenss@gmail.com
marica.motta03@gmail.com
faggiotto.alberto98@gmail.com
```

- **GA4** → Admin → Account access management → + → Add users → paste 4 → Administrator → Add
- **GTM** → Admin → User Management → + → paste 4 → Account Admin + Container Publish → Invite
- **GitHub** (optional — repo is already public if you've pushed): just send them the URL https://github.com/saikanagat1117-sys/backpack-bottle
- **Brevo** → My users → invite each (free tier may cap at 3 active sub-users; if blocked, remove the 3 unibo emails first)

### 4. **Send 6 PDF briefings** — 3 min
Open `/Users/saikanagat/Desktop/backpack-bottle/briefings/` in Finder. Drag each PDF into the right person's WhatsApp / email. Tell them to read before the presentation rehearsal.

---

## 📅 Tuesday 5 May agenda (when you wake up)

| Time | What |
|---|---|
| Morning | Read your PDF briefing (briefings/01-Sai-...). Open the deck v2. Skim each new slide. |
| Morning | Run the 4 todo items above (15 min total). |
| Morning | Send the 5 other PDFs to teammates. |
| Pre-class | 30-min team rehearsal — each person speaks their 1.5 min from their PDF. |
| Class | Present. |

---

## 🚨 If something is broken in the morning

1. **Live site won't load** → check https://vercel.com/saikanagat1117-sys-projects/backpack-bottle/deployments — top deployment should be READY (green).
2. **Form returns error** → check `/api/lead` function logs in Vercel, look for [brevo] or [meta-capi] errors.
3. **Screenshots in deck broken** → original .pptx still works; v2 just has 14 extra slides on top.
4. **Need a different model** → I'm Opus 4.7. Set via `/model claude-sonnet-4-6` for cheaper, `/model claude-haiku-4-5` for fastest.

---

## 📂 Where everything lives

```
/Users/saikanagat/Desktop/backpack-bottle/
├── Backpack-Bottle-Campaign.pptx        # v1 (original)
├── Backpack-Bottle-Campaign-v2.pptx     # v2 (use this)
├── MORNING-BRIEFING.md                  # this file
├── HANDOFF.md                           # full project handoff
├── AUTOMATION.md                        # email automation playbook
├── README.md                            # technical readme
├── briefings/                           # 6 PDF briefings, one per teammate
├── assets/deck/                         # 10 site screenshots
├── scripts/
│   ├── build-deck-v2.py                 # how the deck was generated
│   ├── build-briefings.py               # how the PDFs were generated
│   └── gtm-container-import.json        # GTM tag config
├── app/                                 # Next.js routes
│   ├── measurement/page.tsx
│   ├── stack/page.tsx
│   └── dashboard/page.tsx               # ← Looker Studio mock
└── components/                          # reusable React components
```

---

**You've got this.** Six teammates briefed, 48 slides ready, live site running, full measurement stack wired. Show up, hit each section, defer to the right person at handoff. Skip the research fatigue. ☕
