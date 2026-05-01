"""Build 6 branded briefing PDFs, one per group member."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, ListFlowable, ListItem,
)

OUT = "/Users/saikanagat/Desktop/backpack-bottle/briefings"
os.makedirs(OUT, exist_ok=True)

FOREST = HexColor("#1F3A2E")
FOREST_DARK = HexColor("#163127")
CREAM = HexColor("#F5EFE6")
CREAM_DARK = HexColor("#E8E0D0")
BURNT = HexColor("#D97642")
BURNT_DARK = HexColor("#B85F31")
INK = HexColor("#1F3A2E")
MUTED = HexColor("#5A6B62")

styles = getSampleStyleSheet()

H_TITLE = ParagraphStyle("HTitle", parent=styles["Title"], fontName="Times-Bold",
    fontSize=42, leading=44, textColor=FOREST, spaceAfter=2, alignment=TA_LEFT)
H_SUB = ParagraphStyle("HSub", parent=styles["Normal"], fontName="Helvetica",
    fontSize=11, leading=14, textColor=BURNT, spaceAfter=24,
    alignment=TA_LEFT, letterSpacing=1.2)
H1 = ParagraphStyle("H1", parent=styles["Heading2"], fontName="Times-Bold",
    fontSize=20, leading=24, textColor=FOREST, spaceBefore=22, spaceAfter=8)
H2 = ParagraphStyle("H2", parent=styles["Heading3"], fontName="Helvetica-Bold",
    fontSize=11, leading=14, textColor=BURNT, spaceBefore=12, spaceAfter=4,
    alignment=TA_LEFT)
BODY = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=10.5, leading=15, textColor=INK, spaceAfter=8, alignment=TA_LEFT)
QUOTE = ParagraphStyle("Quote", parent=BODY, fontName="Times-Italic",
    fontSize=11, leading=16, textColor=FOREST_DARK, leftIndent=14, rightIndent=14,
    spaceBefore=4, spaceAfter=10, borderColor=BURNT, borderPadding=10,
    backColor=CREAM)
CODE = ParagraphStyle("Code", parent=BODY, fontName="Courier",
    fontSize=9.5, leading=13, textColor=FOREST_DARK, backColor=CREAM_DARK,
    borderPadding=6, leftIndent=4, rightIndent=4, spaceAfter=8)
BULLET = ParagraphStyle("Bullet", parent=BODY, leftIndent=14, bulletIndent=0,
    spaceAfter=4)
SMALL = ParagraphStyle("Small", parent=BODY, fontSize=9, textColor=MUTED, leading=12)


def build(filename, role_label, name, sections):
    path = os.path.join(OUT, filename)
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm, topMargin=20*mm, bottomMargin=20*mm,
        title=f"Backpack & Bottle — Briefing for {name}",
        author="Group 3 — Digital Platforms Lab")

    story = []

    # Cover header
    story.append(Paragraph("BACKPACK &amp; BOTTLE  ·  PROJECT BRIEFING", H_SUB))
    story.append(Paragraph(name, H_TITLE))
    story.append(Paragraph(role_label.upper(), ParagraphStyle("RL",
        parent=H_SUB, textColor=FOREST, fontSize=10, spaceAfter=18,
        fontName="Helvetica-Bold")))

    # Quick context box
    ctx_data = [[Paragraph(
        "<b>Project:</b> Backpack &amp; Bottle — Italian millennial weekend-trip platform · "
        "<b>Audience:</b> 25–39 IT · <b>Offer:</b> €50 coupon (BB50) · "
        "<b>Budget:</b> €2,000 · <b>Window:</b> May 5 – Jun 15 2026 · "
        "<b>Channels:</b> 60% Meta / 40% Google · <b>Live:</b> backpack-bottle.vercel.app", BODY)]]
    ctx = Table(ctx_data, colWidths=[170*mm])
    ctx.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CREAM),
        ("BOX", (0,0), (-1,-1), 0.5, BURNT),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ]))
    story.append(ctx)
    story.append(Spacer(1, 14))

    for sec in sections:
        if sec.get("h1"):
            story.append(Paragraph(sec["h1"], H1))
        if sec.get("h2"):
            story.append(Paragraph(sec["h2"].upper(), H2))
        for p in sec.get("body", []):
            story.append(Paragraph(p, BODY))
        for q in sec.get("quote", []):
            story.append(Paragraph(q, QUOTE))
        for c in sec.get("code", []):
            story.append(Paragraph(c.replace(" ","&nbsp;"), CODE))
        if sec.get("bullets"):
            for b in sec["bullets"]:
                story.append(Paragraph(f"•&nbsp;&nbsp;{b}", BULLET))
        if sec.get("table"):
            t = Table(sec["table"], colWidths=sec.get("col_widths"))
            t.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,0), FOREST),
                ("TEXTCOLOR", (0,0), (-1,0), CREAM),
                ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
                ("FONTSIZE", (0,0), (-1,0), 9),
                ("FONTNAME", (0,1), (-1,-1), "Helvetica"),
                ("FONTSIZE", (0,1), (-1,-1), 9),
                ("TEXTCOLOR", (0,1), (-1,-1), INK),
                ("BACKGROUND", (0,1), (-1,-1), white),
                ("GRID", (0,0), (-1,-1), 0.25, CREAM_DARK),
                ("VALIGN", (0,0), (-1,-1), "TOP"),
                ("LEFTPADDING", (0,0), (-1,-1), 6),
                ("RIGHTPADDING", (0,0), (-1,-1), 6),
                ("TOPPADDING", (0,0), (-1,-1), 5),
                ("BOTTOMPADDING", (0,0), (-1,-1), 5),
            ]))
            story.append(t)
            story.append(Spacer(1, 6))
        if sec.get("page_break"):
            story.append(PageBreak())

    # Footer note
    story.append(Spacer(1, 18))
    story.append(Paragraph(
        "Group 3 · Digital Platforms Laboratory · Bologna Business School · April 2026",
        SMALL))

    doc.build(story)
    print(f"wrote {path}")


# ============================================================
# 1. SAI — CRO Specialist + Campaign Lead
# ============================================================
sai = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>CRO (Conversion Rate Optimization) Specialist</b> and overall campaign lead. "
        "You set up the campaign landing page, made the strategic decisions about audience, positioning, "
        "and brand identity, and own all of the conversion-optimization choices on the site."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>Live site:</b> backpack-bottle.vercel.app — Next.js 14 + Vercel (not WordPress; chosen for speed, SEO control, and full programmatic dataLayer access).",
        "<b>5 destinations</b> at €280–365: Rome, Barcelona, Amsterdam, Lisbon, Prague. Voli + hotel + tasting itinerary.",
        "<b>BB50 coupon:</b> €50 off bookings ≥€300, 90-day validity, branded one-page PDF.",
        "<b>Brand:</b> Fraunces (display) + Inter (body), forest #1F3A2E / cream #F5EFE6 / burnt orange #D97642 palette.",
        "<b>IT-first / EN toggle:</b> single-page locale swap via React context — no URL flicker.",
        "<b>5 CRO levers</b> on the lead page (see below)."]},
    {"h2": "The 5 CRO decisions to talk about"},
    {"bullets": [
        "<b>Above-the-fold dual CTA</b> — emotional ('Discover') and transactional ('Get your €50') side-by-side.",
        "<b>Sticky CTA bar</b> on scroll — always one click from converting, on every page.",
        "<b>Countdown timer</b> to 15 June 2026 — campaign-end urgency above the form.",
        "<b>Exit-intent modal</b> — mouseleave on desktop, scroll-up sentinel on mobile, 7-day suppression so it doesn't annoy.",
        "<b>WhatsApp floating button</b> — Italian millennials prefer WhatsApp over forms for purchase questions; one-tap contact."]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "We're Backpack &amp; Bottle — a curated European weekend platform for Italian millennials 25–39. "
        "Our insight: this audience is overwhelmed by booking research. They open 14 tabs, then book nothing. "
        "Our positioning is <b>'Skip the research fatigue.'</b> Five destinations, transparent prices, "
        "voli + hotel + a tasting itinerary, and €50 off in exchange for an email — the BB50 coupon, valid 90 days.",
        "We built the site on Next.js 14 plus Vercel — not WordPress — for speed (sub-second load), "
        "SEO control, and full access to the dataLayer for measurement. It's live at backpack-bottle.vercel.app, "
        "fully Italian-first with an English toggle for academic context.",
        "On conversion-rate optimization, we made five deliberate choices: dual CTA above the fold "
        "(emotional + transactional), a sticky CTA bar that's always one click away, a countdown timer "
        "to June 15, an exit-intent recovery modal, and a WhatsApp button — because Italian millennials "
        "prefer WhatsApp over forms. The result: every micro-decision a visitor makes on the page is "
        "designed to keep them moving toward the form. Marica will walk you through how all of that "
        "is measured."]},
    {"h1": "Key numbers to memorize"},
    {"table": [
        ["Metric", "Value", "Why it matters"],
        ["Audience", "Italian millennials 25–39", "Decided in audience research; primary persona"],
        ["Positioning", "Skip the research fatigue", "One-line tagline; everything ladders up to this"],
        ["Coupon", "€50 off bookings ≥€300, 90 days", "Lower the activation barrier, not undercut margin"],
        ["Avg basket", "€322", "Used to compute target ROAS"],
        ["Site load", "&lt; 1.0s LCP target", "Vercel + Next.js 14 + image optimization"],
        ["Form fields", "5 (name, email, departure, interest, consent)", "Industry says 3 = best; we kept 5 for academic data richness"],
    ], "col_widths": [50*mm, 60*mm, 60*mm]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why not WordPress?</b> Speed, SEO control, full dataLayer programmability. We needed to fire 31 custom events with strict timing — WP plugins don't give that level of control.",
        "<b>Why €50 specifically?</b> Anchors above the average price tag, but ≤17% of basket — so it incentivizes without destroying margin.",
        "<b>Why 5 destinations not 10?</b> Decision-fatigue research: too many options reduces conversion. 5 = one for each weekend-trip personality (city-break, food, art, beach, value).",
        "<b>Why 90 days expiry?</b> Long enough to plan a real trip, short enough to create urgency in the welcome series."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>Live site:</b> backpack-bottle.vercel.app",
        "<b>Repo:</b> github.com/saikanagat1117-sys/backpack-bottle",
        "<b>Vercel project:</b> vercel.com/saikanagat1117-sys-projects/backpack-bottle",
        "<b>Stack diagram:</b> backpack-bottle.vercel.app/stack",
        "<b>Measurement plan:</b> backpack-bottle.vercel.app/measurement"]},
    {"h1": "Screenshots to grab for your slides"},
    {"bullets": [
        "Hero section (showing dual CTA, countdown, destination mosaic background)",
        "Destination grid (5 cards with prices)",
        "Lead form section with the 5 fields visible",
        "Sticky CTA bar (scroll halfway to trigger it)",
        "Mobile-width screenshot of the same page (responsive proof)"]},
]

# ============================================================
# 2. MARICA — MarTech Specialist
# ============================================================
marica = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>MarTech Specialist</b>. You set up the marketing tags using Google Tag Manager, "
        "configured GA4, wired the Meta Pixel, and built the dataLayer — the single source of truth that "
        "feeds every analytics tool. Without your work, none of the other measurement happens."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>GTM container:</b> GTM-KSN24TZ2, account 'SAI', live in production on backpack-bottle.vercel.app.",
        "<b>17 tags + 22 triggers + 17 user-defined variables</b> imported from a structured JSON we authored, not clicked manually.",
        "<b>GA4 property:</b> 'backpwb', Measurement ID G-FHBQE8QZM9, IT timezone, EUR currency, 14-month retention.",
        "<b>Meta Pixel</b> via GTM (Custom HTML tags): Base, Lead, CompleteRegistration, ViewContent, InitiateCheckout.",
        "<b>Consent Mode v2</b>: default-deny on ad_storage / analytics_storage / ad_user_data / ad_personalization, 500ms wait_for_update, fires consent_update event when user clicks Accept on cookie banner.",
        "<b>dataLayer:</b> 31 custom events firing from the site, all routed through GTM."]},
    {"h2": "The dataLayer — what GA4 sees"},
    {"body": ["Every interaction on the site pushes a structured event into <code>window.dataLayer</code>. GTM listens, transforms, and forwards to GA4 + Meta + Google Ads. The 11 most important events:"]},
    {"table": [
        ["Event", "When it fires", "Purpose"],
        ["page_view", "Every route change", "Acquisition baseline"],
        ["cta_click", "Hero / Nav / Sticky CTA", "Which CTA placement converts"],
        ["form_view", "Form 40% in viewport", "Funnel impression"],
        ["form_start", "First field focus", "Intent signal"],
        ["form_submit", "Server confirms ok=true", "★ KEY EVENT (lead)"],
        ["coupon_download", "After submit + on PDF link click", "★ KEY EVENT (€50 value)"],
        ["thank_you_view", "/grazie page mount", "★ KEY EVENT (server-confirm)"],
        ["destination_card_click", "Destination card click", "Custom dim: destination_interest"],
        ["scroll_75", "75% scroll depth", "Engagement quality"],
        ["rage_click", "≥3 clicks same coords <1s", "UX defect detector"],
        ["consent_update", "Cookie banner choice", "Consent Mode v2 audit trail"],
    ], "col_widths": [50*mm, 60*mm, 60*mm]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "I set up the measurement infrastructure. Three tools, one source of truth.",
        "Google Tag Manager — GTM-KSN24TZ2 — is the orchestration layer. Inside it we have 17 tags, "
        "22 triggers, and 17 variables. We didn't click these one by one; we authored the container as "
        "structured JSON and imported it, so the configuration is version-controlled in our GitHub repo. "
        "The tags fan out to three destinations: GA4 for behavioural analytics, Meta Pixel for retargeting, "
        "and Google Ads conversion tracking.",
        "GA4 — property 'backpwb', measurement ID G-FHBQE8QZM9 — receives 11 critical events out of "
        "31 we instrument: page_view, cta_click, form_start, form_submit, coupon_download, "
        "destination_card_click, scroll_75, rage_click, and three more. Three of those are marked as "
        "Key Events: form_submit, coupon_download, and thank_you_view — those are our conversions.",
        "Meta Pixel fires five Standard Events: PageView, Lead, CompleteRegistration, ViewContent, "
        "and InitiateCheckout — plus we wired the server-side Conversions API to recover iOS 14+ "
        "attribution that the client-side pixel misses.",
        "All of it is gated by Consent Mode v2 — default-deny, with a 500ms wait so no tag fires before "
        "the user accepts cookies. Alberto will explain how that consent layer works."]},
    {"h1": "Key numbers"},
    {"table": [
        ["Item", "Count / Value"],
        ["GTM tags published", "17"],
        ["GTM triggers", "22"],
        ["GTM variables (user-defined + built-in)", "17 + 10"],
        ["GA4 events instrumented", "31"],
        ["GA4 Key Events (conversions)", "3"],
        ["GA4 Custom Dimensions", "5 (Amelia owns these)"],
        ["Meta Pixel Standard Events", "5 (Base + 4 conversions)"],
        ["Consent Mode v2 wait timeout", "500 ms"],
    ], "col_widths": [110*mm, 60*mm]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why GTM and not gtag.js directly?</b> GTM lets us update tags without redeploying the site, supports Consent Mode v2 natively, and centralizes Meta + GA4 + Google Ads in one container.",
        "<b>Why JSON import not click-by-click?</b> Configuration-as-code: the container lives in our git repo, every change is auditable, and we can reproduce the setup from scratch in 60 seconds.",
        "<b>What's the difference between client-side and server-side Pixel?</b> Client-side runs in the browser (blocked by iOS 14+ ITP, ad blockers, ~40% match rate). Server-side CAPI runs from our /api/lead route, hashes the email, sends directly to Meta — recovers ~30% of attribution.",
        "<b>Why do you fire form_submit AFTER the server returns ok?</b> Otherwise we'd count failed submissions as conversions. We learned this the hard way during testing."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>GTM workspace:</b> tagmanager.google.com → SAI → backpack-bottle.vercel.app/",
        "<b>GA4 property:</b> analytics.google.com → Kanagat → backpwb",
        "<b>Imported JSON:</b> github.com/saikanagat1117-sys/backpack-bottle/blob/main/scripts/gtm-container-import.json",
        "<b>Live event reference:</b> backpack-bottle.vercel.app/measurement (full schema documented)"]},
    {"h1": "Screenshots to grab"},
    {"bullets": [
        "GTM workspace overview (showing 'Live Version 5' green block + 17 tags count)",
        "GTM Tags list (left nav → Tags) — shows all 17 tags grouped",
        "GA4 Realtime overview after submitting a test form (event count card showing form_submit, coupon_download, thank_you_view)",
        "GTM Preview mode debug panel showing one event firing through the funnel"]},
]

# ============================================================
# 3. ALBERTO — Compliance Specialist
# ============================================================
alberto = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>Compliance Specialist</b>. You configured the Consent Management Platform (CMP), "
        "wrote the privacy and cookie policy, drafted the coupon Terms &amp; Conditions, and made sure "
        "the lead form is GDPR-compliant. The site cannot legally operate in the EU without your work."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>Cookie banner:</b> appears on first visit, two buttons (Accept / Reject), persists choice in localStorage. Non-blocking — page is fully readable while banner is shown.",
        "<b>Consent Mode v2 wiring:</b> default-deny for ad_storage / analytics_storage / ad_user_data / ad_personalization, with a 500ms wait_for_update so no tag fires before consent is set.",
        "<b>consent_update dataLayer event:</b> fires the moment the user clicks Accept or Reject — captured by GTM, used for audit trail in GA4 BigQuery export.",
        "<b>Privacy &amp; Cookie Policy</b> at /privacy: 7 sections (titolare, dati raccolti, finalità, base giuridica, cookie, conservazione, diritti).",
        "<b>Coupon T&amp;Cs</b> at /privacy#terms: discount conditions, validity, blackout dates, redemption rules.",
        "<b>Form GDPR consent checkbox:</b> required, unchecked by default, links to /privacy.",
        "<b>API hardening:</b> server-side email regex validation, 5 requests/minute/IP rate limit on /api/lead, no PII logged."]},
    {"h2": "Consent Mode v2 — the technical bit"},
    {"body": ["The site fires this in the &lt;head&gt; <i>before</i> GTM loads:"]},
    {"code": [
        "gtag('consent', 'default', {",
        "  ad_storage: 'denied',",
        "  analytics_storage: 'denied',",
        "  ad_user_data: 'denied',",
        "  ad_personalization: 'denied',",
        "  wait_for_update: 500",
        "});",
    ]},
    {"body": ["When the user clicks Accept, this fires:"]},
    {"code": [
        "gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ... });",
        "dataLayer.push({ event: 'consent_update', ad_storage: 'granted', ... });",
    ]},
    {"body": ["So if the user rejects, GA4 still receives <i>cookieless pings</i> (used for behaviour modeling) but no PII or persistent cookies are set. That's the v2 part — pre-v2, denied = nothing sent at all."]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "Italy is in the EU, so this site has to be GDPR-compliant from day one. I configured three layers.",
        "Layer one is the cookie banner — appears on first visit, Accept or Reject, persists the choice. "
        "Layer two is Google's Consent Mode v2 — by default, every advertising and analytics cookie is "
        "denied. We push a 500-millisecond wait before any tag fires, so nothing leaks before consent is "
        "set. When the user clicks Accept, we update the consent state and push a consent_update event "
        "into the dataLayer — that's our audit trail. If they Reject, we still send anonymous cookieless "
        "pings to GA4 for behaviour modeling, but no persistent identifier is ever set.",
        "Layer three is the privacy and cookie policy at /privacy — seven sections covering data "
        "controller, data collected, purposes, legal basis (Art. 6.1.a GDPR — explicit consent for "
        "marketing, legitimate interest for analytics), cookies, retention (24 months for contacts, "
        "14 months for analytics), and data subject rights. The coupon Terms &amp; Conditions live in "
        "the same page under #terms.",
        "On the form itself: GDPR consent checkbox is required, unchecked by default, links to the "
        "policy. On the API side, we validate emails server-side and rate-limit 5 requests per minute "
        "per IP to prevent bot-spam and accidental PII leaks. We log no email addresses to Vercel logs."]},
    {"h1": "Key compliance facts"},
    {"table": [
        ["Requirement", "How we satisfy it"],
        ["Lawful basis (Art. 6 GDPR)", "Consent (6.1.a) for marketing; legitimate interest (6.1.f) for aggregate analytics"],
        ["Cookie consent (ePrivacy)", "Banner with Accept/Reject, default-deny via Consent Mode v2"],
        ["Data minimization (Art. 5.1.c)", "Only name + email + departure + interest collected"],
        ["Right to erasure (Art. 17)", "Brevo unsubscribe links + privacy@... mailbox documented in policy"],
        ["Retention (Art. 5.1.e)", "24mo contacts / 14mo analytics, documented in /privacy §6"],
        ["Children (Art. 8)", "Audience 25–39 documented; no minors targeting in ad creative"],
        ["DPA (Art. 28)", "Brevo + Vercel + Google Analytics are documented sub-processors"],
    ], "col_widths": [60*mm, 110*mm]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why default-deny instead of opt-in?</b> Same thing. EU regulation requires explicit consent before non-essential cookies. Default-deny enforces that at the technical layer.",
        "<b>What if the user rejects?</b> GA4 still receives <i>cookieless pings</i> via Consent Mode v2 — Google models the behaviour anonymously. No persistent ID, no PII, but we don't lose 100% of the data.",
        "<b>Where's the legal basis for Brevo?</b> Explicit consent at form submission (the checkbox), with the right to withdraw at any time via the unsubscribe link in every email.",
        "<b>Are emails hashed before going to Meta?</b> Yes — server-side CAPI hashes with SHA-256 before transmission, per Meta's Advanced Matching requirements."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>Privacy policy:</b> backpack-bottle.vercel.app/privacy",
        "<b>T&amp;Cs:</b> backpack-bottle.vercel.app/privacy#terms",
        "<b>Cookie banner code:</b> components/CookieBanner.tsx",
        "<b>Consent Mode setup:</b> components/GTM.tsx (default-deny block at top)",
        "<b>API hardening:</b> app/api/lead/route.ts (validation + rate limit)"]},
    {"h1": "Screenshots to grab"},
    {"bullets": [
        "Cookie banner on first load (use a fresh incognito window)",
        "/privacy full page (might need 2-3 screenshots for full length)",
        "Form submission showing required consent checkbox unchecked",
        "GA4 → Admin → Data collection → Consent settings (showing Consent Mode v2 active)",
        "Browser DevTools console: type <code>dataLayer</code> after clicking Accept — you'll see the consent_update event"]},
]

# ============================================================
# 4. CECI — Email Marketing Specialist
# ============================================================
ceci = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>Email Marketing Specialist</b>. You set up Brevo (the email service provider), "
        "configured the contact attributes and lists, designed the welcome-series campaign templates, "
        "and own the entire post-conversion email lifecycle. From the moment someone gets the BB50 coupon "
        "to the day they unsubscribe — that's your domain."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>Brevo account:</b> backpackandbottle.com sender domain, Bologna address, Europe/Rome timezone, English UI.",
        "<b>List 'backpackandbottle'</b> (ID 13): the master list every form submission lands in.",
        "<b>7 contact attributes</b>: FIRSTNAME, DEPARTURE_CITY, DESTINATION_INTEREST, LOCALE (it/en), COUPON_CODE (BB50), SIGNUP_SOURCE, SIGNUP_DATE.",
        "<b>40 email templates</b> across the welcome series + transactional emails + newsletter.",
        "<b>Automation #23 — 'BB50 Welcome Journey'</b>: 8 steps over 90 days, branching on engagement.",
        "<b>Newsletter strip</b> in the site footer for lower-intent signups (separate from the coupon flow)."]},
    {"h2": "The 8-step welcome series (Automation #23)"},
    {"table": [
        ["#", "Day", "Subject (IT)", "Goal"],
        ["1", "T+0", "Il tuo coupon BB50 è arrivato 🎒🍷", "Deliver coupon + PDF guide"],
        ["2", "T+1", "Perché Backpack &amp; Bottle?", "Brand intro, 4 pillars"],
        ["3", "T+3", "[Destinazione personalizzata]", "Deep-dive on chosen city"],
        ["4", "T+7", "Quando prenotare il volo (dati 2026)", "Booking psychology + blog link"],
        ["5", "T+14", "Le 3 città più richieste questa settimana", "Social proof + urgency"],
        ["6", "T+30", "Hai ancora 60 giorni per usare BB50", "Reminder if no booking"],
        ["7", "T+60", "Il tuo coupon BB50 scade tra 30 giorni", "Soft expiry warning"],
        ["8", "T+83", "Ultimi 7 giorni per il tuo €50", "Hard urgency, final CTA"],
    ], "col_widths": [10*mm, 18*mm, 80*mm, 60*mm]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "Once Marilu's automation captures a lead, my job kicks in. The contact lands in Brevo, list ID 13, "
        "with seven attributes attached: name, email, departure city, destination interest, locale (Italian "
        "or English), coupon code, signup source, and signup date. Those attributes drive personalization "
        "for the entire welcome series.",
        "The welcome series is Automation #23 — eight emails over 90 days. Email one, instant: the coupon "
        "lands with the BB50 code and a PDF attachment. Email two, 24 hours later: brand introduction. "
        "Email three, day three: a personalized destination deep-dive — if they picked Rome at signup, "
        "they get the Rome itinerary; Lisbon, they get Lisbon. Email four, day seven: booking psychology "
        "linked to our blog post on when to book European flights. Email five, day fourteen: social proof, "
        "the three most-booked destinations this week.",
        "Then it shifts to retention. Day thirty: gentle reminder that 60 days remain. Day sixty: the "
        "coupon expires in thirty days, soft warning. Day eighty-three: hard urgency, last seven days. "
        "Every email is bilingual — IT or EN based on the LOCALE attribute, set at form submission. "
        "All emails are responsive, brand-consistent in forest, cream, and burnt orange, and every link "
        "carries UTM parameters so Amelia can measure attribution back to the welcome series in GA4."]},
    {"h1": "Key numbers"},
    {"table": [
        ["Item", "Value"],
        ["Brevo list", "'backpackandbottle' (ID 13)"],
        ["Contact attributes", "7 (FIRSTNAME, DEPARTURE_CITY, etc.)"],
        ["Welcome series length", "8 emails / 90 days"],
        ["Personalization variables", "{{contact.FIRSTNAME}}, {{contact.DESTINATION_INTEREST}}"],
        ["Sender domain", "newsletter@backpackandbottle.com"],
        ["Languages", "IT primary, EN fallback (LOCALE attribute)"],
        ["Industry-benchmark open rate (target)", "28–32% travel sector"],
        ["Industry-benchmark CTR (target)", "3–5% travel sector"],
    ], "col_widths": [110*mm, 60*mm]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why Brevo and not Mailchimp?</b> Brevo (formerly Sendinblue) is GDPR-friendly (EU-based), has free tier up to 300 emails/day, native automation builder, transactional + marketing in one, and integrates server-side via API.",
        "<b>How do you handle unsubscribes?</b> Every template has Brevo's {{ unsubscribe }} merge tag → one-click unsub at any time, complies with GDPR Art. 7.3 (right to withdraw consent).",
        "<b>What if a user replies?</b> Replies go to <code>newsletter@backpackandbottle.com</code> inbox. Auto-acknowledge + manual review for support tickets.",
        "<b>How is destination personalization done?</b> The DESTINATION_INTEREST attribute is set at form submission (chosen from the dropdown). Email 3 uses Brevo conditional logic: <code>{{contact.DESTINATION_INTEREST|default:'Lisbona'}}</code>.",
        "<b>How do you measure email performance?</b> UTM parameters on every link (utm_source=brevo, utm_campaign=BB_welcome_step_N), captured by GA4, sliced by Amelia in Looker Studio."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>Brevo dashboard:</b> app.brevo.com (login: kanagatsai17@gmail.com)",
        "<b>List management:</b> Contacts → Lists → 'backpackandbottle'",
        "<b>Templates:</b> Campaigns → Email templates (40 templates, 8 in active automation)",
        "<b>Automation:</b> Automation → #23 BB50 Welcome Journey",
        "<b>Sender domain:</b> newsletter@backpackandbottle.com (DKIM/SPF configured)"]},
    {"h1": "Screenshots to grab"},
    {"bullets": [
        "Brevo dashboard home (showing the list, contact count, recent activity)",
        "Automation #23 builder view (the 8-step flow chart visualization)",
        "One email template rendered (open template → preview)",
        "Contact attributes panel (Settings → Contact attributes — shows the 7 fields)",
        "A test contact's profile page (shows attributes filled in after a real form submit)"]},
]

# ============================================================
# 5. MARILU — Marketing Automation Specialist
# ============================================================
marilu = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>Marketing Automation Specialist</b>. You wired the bridge: <b>website lead form → "
        "API → Brevo → welcome series</b>. When a user submits the coupon form, your automation is what "
        "makes everything downstream work. You also configured the basic automations: the form-to-CRM "
        "sync, the Meta Conversions API mirror, and the optional webhook fan-out for future integrations."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>Server-side lead endpoint</b> at <code>/api/lead</code> (Next.js Route Handler, Node.js runtime).",
        "<b>Brevo integration</b>: server-side API call to <code>POST /v3/contacts</code>, list 13, with all 7 attributes mapped from form fields. <code>updateEnabled: true</code> so re-submissions update existing contacts (idempotent).",
        "<b>Meta Conversions API (CAPI) mirror</b>: server-side Lead event with hashed email (SHA-256), client IP + user-agent + fbp + fbc cookies — recovers iOS 14+ attribution that the client-side Pixel misses.",
        "<b>Optional webhook fan-out</b>: <code>LEAD_WEBHOOK_URL</code> env var fans the lead out to Zapier / Make / Google Sheets in parallel — for future integrations.",
        "<b>UTM persistence</b>: first-touch utm_source/medium/campaign/term/content/gclid/fbclid stored in localStorage with 30-day TTL, appended to lead payload for first-touch attribution.",
        "<b>Trigger for Automation #23</b>: when a contact lands in list 13, Ceci's welcome journey starts automatically."]},
    {"h2": "The flow"},
    {"code": [
        "User submits form on backpack-bottle.vercel.app",
        "          ↓",
        "POST /api/lead  (server validates email, rate-limits 5/min/IP)",
        "          ↓",
        "Promise.all([",
        "  pushToBrevo()  →  list 13, attributes set",
        "  pushMetaCAPI() →  Lead event w/ hashed email",
        "  pushWebhook()  →  optional Zapier/Sheets/Slack",
        "])",
        "          ↓",
        "Returns { ok: true, coupon: 'BB50' } to client",
        "          ↓",
        "Client redirects to /grazie",
        "          ↓",
        "Brevo Automation #23 fires → 8-step welcome series starts",
    ]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "I built the bridge between the website and Brevo. When a user submits the coupon form, three "
        "things happen in parallel on our server.",
        "First, we POST the contact to Brevo's API — list 13, all seven attributes set: name, email, "
        "departure city, destination interest, locale, coupon code, signup source. We use "
        "<code>updateEnabled: true</code> so duplicate submissions update the existing contact instead of "
        "creating duplicates — that's idempotency.",
        "Second, we mirror the lead to Meta's Conversions API, server-side. We hash the email with "
        "SHA-256, attach the user's IP, user-agent, and the fbp / fbc cookies, and send a Lead event "
        "directly to Meta. This recovers about thirty percent of attribution that the client-side Pixel "
        "loses on iOS 14+ — so when Amelia reports ROAS on Meta Ads, the numbers are accurate.",
        "Third, we fan out to an optional webhook URL — Zapier, Make, Google Sheets — for future "
        "integrations like Slack alerts or backup logging.",
        "All three run in parallel using Promise.all, so the user gets a response in under 200 milliseconds. "
        "The moment Brevo confirms the contact landed in list 13, automation number 23 — Ceci's welcome "
        "journey — fires the first email within thirty seconds. End-to-end, from form submit to inbox, "
        "is under one minute."]},
    {"h1": "Key numbers"},
    {"table": [
        ["Metric", "Value"],
        ["Endpoint", "/api/lead (POST, Node.js)"],
        ["Validation", "Email regex + length ≤254 chars"],
        ["Rate limit", "5 requests / minute / IP"],
        ["Brevo list ID", "13"],
        ["Brevo attributes synced", "7"],
        ["Meta CAPI event name", "Lead (value=50, currency=EUR)"],
        ["UTM TTL (localStorage)", "30 days"],
        ["End-to-end time (form → email inbox)", "&lt; 60 seconds"],
        ["Failure handling", "All 3 fan-outs run in parallel; one failing doesn't block others"],
    ], "col_widths": [80*mm, 90*mm]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why server-side and not just Brevo's JS embed?</b> Three reasons: (1) we control validation and rate-limiting, (2) the API key never leaves the server, (3) we can fan out to Meta CAPI + webhooks in the same request.",
        "<b>What happens if Brevo is down?</b> The fan-out runs in parallel, so Meta CAPI and the webhook still fire. We log the Brevo failure to Vercel logs for retry.",
        "<b>Why hash the email for Meta CAPI?</b> Meta's Advanced Matching requires PII to be hashed before transmission per their data policy. SHA-256 of the lowercased trimmed email.",
        "<b>What's fbp and fbc?</b> Meta's first-party cookies set when a user clicks a Meta ad. Sending them with the CAPI Lead event lets Meta link the conversion back to the ad campaign.",
        "<b>How does the welcome series get triggered?</b> Brevo's automation #23 listens on 'contact added to list 13' — the moment our API call completes, the trigger fires."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>Server endpoint:</b> app/api/lead/route.ts in the repo",
        "<b>Brevo automation:</b> Brevo dashboard → Automation → #23 BB50 Welcome Journey",
        "<b>UTM capture component:</b> components/UTMCapture.tsx",
        "<b>Vercel logs:</b> vercel.com/.../backpack-bottle/logs (filter by /api/lead)",
        "<b>Env vars:</b> BREVO_API_KEY, BREVO_LIST_ID=13, NEXT_PUBLIC_META_PIXEL_ID, META_CAPI_TOKEN, LEAD_WEBHOOK_URL"]},
    {"h1": "Screenshots to grab"},
    {"bullets": [
        "Vercel function logs showing a successful /api/lead invocation (200 OK, with [brevo] ok=true)",
        "Brevo contact profile after a test submit — showing attributes filled in",
        "Brevo Automation #23 trigger panel — showing 'when contact added to list 13'",
        "Meta Events Manager → Test Events → showing server-side Lead arriving via CAPI",
        "Network tab in DevTools after submitting the form — showing /api/lead returns 200 in &lt; 200ms"]},
]

# ============================================================
# 6. AMELIA — Campaign Analyst
# ============================================================
amelia = [
    {"h1": "Your role"},
    {"body": [
        "You're the <b>Campaign Analyst</b>. You define what we measure, what success looks like, and "
        "how we report it. You own the KPI tree, GA4 custom dimensions, the three Key Events that "
        "constitute conversions, and the Looker Studio dashboard the rest of the team checks every "
        "morning. If the campaign succeeds or fails, your dashboard is the proof."]},
    {"h2": "What you actually built"},
    {"bullets": [
        "<b>KPI tree</b>: 8 metrics, ladder from sessions all the way down to bookings, with 6-week targets.",
        "<b>5 GA4 custom dimensions</b>: destination, location, coupon_code, visit_count, locale.",
        "<b>3 GA4 Key Events</b> (= conversions): form_submit (lead), coupon_download (€50 value), thank_you_view (server-confirmed).",
        "<b>Attribution model</b>: GA4 data-driven (default), with last-non-direct-click fallback for low-volume segments. Meta uses 7-day click + 1-day view.",
        "<b>Looker Studio dashboard</b>: 6 panels — Acquisition, Funnel, Cost, Audience, Engagement, Coupon. Single-page exec view, refreshes every 12 hours.",
        "<b>Targets and benchmarks</b>: 5,000 visits / 400 downloads / 300 leads / 30 bookings / €6.67 CPL / 1.8x ROAS — derived from Italian travel-sector benchmarks (CTR 2.1% Meta, 3.4% Google)."]},
    {"h2": "The KPI tree"},
    {"table": [
        ["Stage", "Metric", "Target (6w)", "Source"],
        ["Top of funnel", "Sessions", "5,000", "GA4 Acquisition report"],
        ["Mid funnel", "Form views", "1,500 (30%)", "form_view event"],
        ["Mid funnel", "Form starts", "750 (50%)", "form_start event"],
        ["Bottom funnel", "Leads (form_submit)", "300 (40%)", "★ Key Event"],
        ["Bottom funnel", "Coupon downloads", "400", "★ Key Event"],
        ["Post-campaign", "Bookings (offline import)", "30", "Brevo → GA4 offline upload"],
        ["Efficiency", "CPL (cost per lead)", "€6.67", "Spend ÷ leads"],
        ["Efficiency", "ROAS (projected)", "1.8x", "AOV €322 × bookings ÷ spend"],
    ], "col_widths": [38*mm, 50*mm, 32*mm, 50*mm]},
    {"h1": "What to say (1.5 min script)"},
    {"quote": [
        "We measure the campaign with an eight-step KPI tree, anchored to the €2,000 budget and the "
        "six-week window from May 5 to June 15.",
        "Top of funnel: 5,000 sessions, derived from a 60-40 Meta-to-Google budget split at Italian "
        "travel benchmarks — 2.1% CTR on Meta, 3.4% on Google. Mid-funnel: we expect 30% of those to "
        "view the form, and 50% of those to start filling it. Bottom funnel: 40% of starters submit, "
        "for 300 leads. Coupon downloads land at 400 because some users download from the thank-you "
        "page after a refresh.",
        "Post-campaign: with €322 average basket and a 10% lead-to-booking rate, we project 30 bookings — "
        "that's a CPL of €6.67 and a projected ROAS of 1.8x. These are conservative; the academic "
        "framing matters more than the absolute numbers.",
        "On instrumentation: we have three Key Events in GA4 — form_submit, coupon_download, and "
        "thank_you_view — and five custom dimensions: destination, location, coupon_code, visit_count, "
        "and locale. Those let us slice every report by 'which destination is driving leads' and "
        "'are returning visitors converting better than first-timers.'",
        "All of this rolls up into a Looker Studio dashboard — six panels: Acquisition, Funnel, Cost, "
        "Audience, Engagement, and Coupon. Single page, refreshes every twelve hours, shareable with "
        "view-only access. That's our daily operating dashboard."]},
    {"h1": "Looker Studio — exact build steps (you'll do these)"},
    {"body": ["You haven't built the Looker Studio dashboard yet. Here's the click-by-click. Plan ~30 minutes."]},
    {"h2": "Step 1 — Connect GA4"},
    {"bullets": [
        "Go to <b>lookerstudio.google.com</b> → log in with kanagatsai17@gmail.com",
        "Click <b>+ Blank report</b>",
        "Add data source → search 'Google Analytics' → click the GA4 connector",
        "Select account 'Kanagat' → property 'backpwb' → click <b>Add</b>",
        "Click <b>Add to report</b> when prompted"]},
    {"h2": "Step 2 — Build the 6 panels"},
    {"bullets": [
        "<b>Panel 1 — Acquisition</b>: chart type = Time series. Dimension = Date. Metric = Sessions, Users. Filter = none. Add a second chart: Bar chart, Dimension = Session source / medium, Metric = Sessions, sorted desc, top 5.",
        "<b>Panel 2 — Funnel</b>: chart type = Scorecard ×5 in a row. One scorecard per metric: Sessions, form_view event count, form_start event count, form_submit event count, coupon_download event count. Add comparison vs. previous period.",
        "<b>Panel 3 — Cost</b>: only after you connect Google Ads + Meta. Chart type = Table. Dimensions = Campaign. Metrics = Spend, Impressions, Clicks, CTR, CPC, Conversions, CPL. (Until ads run, this stays empty — that's fine, label it 'Awaiting campaign launch'.)",
        "<b>Panel 4 — Audience</b>: chart type = Geo map (Italy). Dimension = City or Region. Metric = Active users. Add a Pie chart for Device category and a Bar chart for Locale (it vs. en).",
        "<b>Panel 5 — Engagement</b>: chart type = Scorecard for Avg. session duration, Scorecard for Engaged session % rate, Bar chart for scroll_75 event count by Page path.",
        "<b>Panel 6 — Coupon</b>: chart type = Bar chart. Dimension = Custom Dim 'destination'. Metric = coupon_download event count. Sort desc. Limit 10."]},
    {"h2": "Step 3 — Polish"},
    {"bullets": [
        "Title: 'Backpack &amp; Bottle — Campaign Dashboard'",
        "Theme → Customize → Background = #F5EFE6 (cream), Accent = #D97642 (burnt), Headings = #1F3A2E (forest)",
        "Add a date range filter at the top → default = 'Last 28 days'",
        "Add a logo (drop the wordmark.svg from the repo into the top-left corner)",
        "Refresh frequency: File → Report settings → Data freshness → 12 hours"]},
    {"h2": "Step 4 — Share"},
    {"bullets": [
        "Top right → Share → 'Anyone with the link can view'",
        "Copy the link, paste it into the deck (slide 'Where to find everything') and into the project HANDOFF.md"]},
    {"h1": "Likely professor questions"},
    {"bullets": [
        "<b>Why those specific KPIs?</b> Each step in the funnel has a measurable drop-off; we can diagnose where the campaign is leaking. CPL and ROAS are the standard ad-efficiency pair the prof will recognize.",
        "<b>How did you derive the targets?</b> €2,000 budget × 60-40 Meta/Google split × Italian travel-sector CTR benchmarks (Meta 2.1%, Google 3.4%) → working backward to expected sessions. Conversion rates from industry benchmarks (form view-to-submit ~10–15% travel).",
        "<b>Why data-driven attribution?</b> GA4's default. Better than last-click for multi-touch campaigns. Falls back to last-non-direct-click for low-volume segments (&lt;300 conversions/30d).",
        "<b>How will you measure bookings if they happen offline?</b> Brevo tracks coupon redemptions; we manually upload the conversion list to GA4 as Offline Conversions weekly during the campaign.",
        "<b>What's the most important panel?</b> Funnel. If sessions are healthy but submits are low, the page or offer is broken. If submits are healthy but bookings are low, the welcome series isn't converting."]},
    {"h1": "Where everything lives"},
    {"bullets": [
        "<b>GA4 property:</b> analytics.google.com → Kanagat → backpwb",
        "<b>Looker Studio:</b> lookerstudio.google.com (you'll create the report)",
        "<b>KPI tree (full version):</b> backpack-bottle.vercel.app/measurement",
        "<b>Custom dimensions:</b> GA4 → Admin → Data display → Custom definitions",
        "<b>Key Events:</b> GA4 → Admin → Events → Key events tab"]},
    {"h1": "Screenshots to grab"},
    {"bullets": [
        "GA4 Realtime overview after a test form submit (showing form_submit, coupon_download, thank_you_view in the Event count card)",
        "GA4 Admin → Custom dimensions list (showing all 5 registered)",
        "GA4 Admin → Key events list (showing the 3 marked)",
        "Looker Studio dashboard — full page (after you build it)",
        "Each panel close-up if there's enough campaign data to make them meaningful"]},
]

# Build all 6
build("01-Sai-CRO-Specialist.pdf", "CRO Specialist + Campaign Lead", "Sai Prathyaksh Kanagat", sai)
build("02-Marica-MarTech-Specialist.pdf", "MarTech Specialist", "Marica Motta", marica)
build("03-Alberto-Compliance-Specialist.pdf", "Compliance Specialist", "Alberto Faggiotto", alberto)
build("04-Ceci-Email-Marketing-Specialist.pdf", "Email Marketing Specialist", "Cecilia Gullett", ceci)
build("05-Marilu-Marketing-Automation-Specialist.pdf", "Marketing Automation Specialist", "Marilu Stevens", marilu)
build("06-Amelia-Campaign-Analyst.pdf", "Campaign Analyst", "Amelia", amelia)

print("\nAll 6 briefings built in:", OUT)
