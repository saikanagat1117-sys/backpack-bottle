/* eslint-disable */
const KEY = process.env.BREVO_API_KEY!;
const SENDER = { name: "Backpack & Bottle", email: "kanagatsai17@gmail.com" };

const BRAND = {
  forest: "#1F3A2E",
  forestDark: "#163127",
  cream: "#F5EFE6",
  burnt: "#D97642",
  burntDark: "#B85F31",
};

function shell(title: string, preheader: string, body: string) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
  body { margin:0; padding:0; background:${BRAND.cream}; font-family: 'Inter', Helvetica, Arial, sans-serif; color:${BRAND.forest}; -webkit-font-smoothing:antialiased; }
  .container { max-width:600px; margin:0 auto; background:${BRAND.cream}; }
  .header { background:${BRAND.forest}; color:${BRAND.cream}; padding:28px 32px; }
  .header h1 { margin:0; font-family:'Fraunces','Times New Roman',serif; font-size:22px; font-weight:600; letter-spacing:.5px; }
  .body { padding:36px 32px; line-height:1.55; font-size:16px; color:${BRAND.forest}; }
  .body h2 { font-family:'Fraunces','Times New Roman',serif; font-size:34px; line-height:1.1; margin:0 0 18px 0; font-weight:500; }
  .body p { margin:0 0 16px 0; }
  .coupon { background:${BRAND.burnt}; color:${BRAND.cream}; border-radius:18px; padding:32px; margin:28px 0; text-align:center; }
  .coupon .code { font-family:'Fraunces',serif; font-size:54px; font-weight:600; letter-spacing:6px; margin:0 0 8px 0; }
  .coupon .terms { font-size:14px; opacity:.9; margin:0; }
  .btn { display:inline-block; background:${BRAND.burnt}; color:${BRAND.cream} !important; text-decoration:none; padding:14px 26px; border-radius:999px; font-weight:600; font-size:15px; }
  .btn-wrap { text-align:center; margin:28px 0; }
  .grid { width:100%; border-collapse:collapse; margin:24px 0; }
  .grid td { padding:8px 12px; border-bottom:1px solid rgba(31,58,46,.1); font-size:14px; }
  .grid td:last-child { text-align:right; color:${BRAND.burntDark}; font-weight:600; }
  .footer { background:${BRAND.forestDark}; color:${BRAND.cream}; padding:24px 32px; text-align:center; font-size:12px; opacity:.85; }
  .footer a { color:${BRAND.cream}; }
  .urgent { background:rgba(217,118,66,.15); border-left:3px solid ${BRAND.burnt}; padding:14px 16px; margin:24px 0; font-size:14px; color:${BRAND.forest}; }
</style>
</head>
<body>
<span style="display:none;visibility:hidden;color:transparent;height:0;width:0;font-size:1px;line-height:1px;">${preheader}</span>
<div class="container">
  <div class="header"><h1>backpack &amp; bottle</h1></div>
  <div class="body">${body}</div>
  <div class="footer">
    Backpack &amp; Bottle &middot; Bologna, Italia<br/>
    Hai ricevuto questa email perché hai richiesto il coupon BB50.<br/>
    <a href="{{ unsubscribe }}">Disiscriviti</a> · <a href="https://backpack-bottle.vercel.app/privacy">Privacy</a>
  </div>
</div>
</body>
</html>`;
}

const destinations = [
  ["🇮🇹", "Roma", "280"],
  ["🇪🇸", "Barcellona", "320"],
  ["🇳🇱", "Amsterdam", "365"],
  ["🇵🇹", "Lisbona", "345"],
  ["🇨🇿", "Praga", "295"],
  ["🇫🇷", "Parigi", "395"],
  ["🇦🇹", "Vienna", "335"],
  ["🇩🇪", "Berlino", "305"],
  ["🇩🇰", "Copenaghen", "425"],
  ["🇬🇷", "Atene", "295"],
];

const destGrid = `<table class="grid">${destinations
  .map(([f, c, p]) => `<tr><td>${f} ${c}</td><td>da €${p}</td></tr>`)
  .join("")}</table>`;

const templates = [
  {
    name: "BB - 1 - Welcome + BB50 Coupon",
    subject: "Il tuo coupon BB50 è qui ✈️",
    body: `
      <h2>Ciao {{contact.FIRSTNAME|default:\"viaggiatore\"}},<br/>eccolo. €50 di sconto.</h2>
      <p>Il tuo coupon è pronto. Lo applichi al checkout, sulla destinazione che vuoi, tra le 10 città europee curate. Niente prezzi che cambiano, niente trappole.</p>
      <div class="coupon">
        <p class="code">BB50</p>
        <p class="terms">€50 di sconto · prenotazioni da €300+ · validità 90 giorni</p>
      </div>
      <div class="btn-wrap">
        <a href="https://backpack-bottle.vercel.app/#destinazioni" class="btn">Esplora le 10 destinazioni →</a>
      </div>
      <h3 style="font-family:'Fraunces',serif;font-size:20px;margin:36px 0 8px 0;">Le città</h3>
      ${destGrid}
      <p style="font-size:13px;color:rgba(31,58,46,.7);margin-top:32px;">In allegato anche la versione PDF del coupon, se vuoi salvarla per dopo.</p>
    `,
    preheader: "€50 sui weekend europei curati. Valido 90 giorni.",
  },
  {
    name: "BB - 2 - Day 3 Personalised destination",
    subject: "Hai 87 giorni per usare il tuo €50 di sconto",
    body: `
      <h2>Ciao {{contact.FIRSTNAME}},<br/>parliamo della tua città.</h2>
      <p>Hai indicato <strong>{{contact.DESTINATION_INTEREST|default:\"un weekend europeo\"}}</strong> come destinazione preferita. Ti facciamo vedere come funziona davvero.</p>
      <table class="grid">
        <tr><td><strong>Pacchetto base</strong></td><td>3 notti · hotel boutique 3-4★ · volo diretto</td></tr>
        <tr><td><strong>Pacchetto local</strong></td><td>3 notti + 1 esperienza locale (food tour, museo)</td></tr>
        <tr><td><strong>Pacchetto extended</strong></td><td>4 notti · weekend lungo</td></tr>
      </table>
      <div class="btn-wrap">
        <a href="https://backpack-bottle.vercel.app/#destinazioni" class="btn">Vedi i pacchetti →</a>
      </div>
      <div class="urgent">
        Il tuo coupon <strong>BB50</strong> vale ancora <strong>87 giorni</strong>. Applicabile da €300.
      </div>
    `,
    preheader: "La tua destinazione preferita, 3 modi di farla.",
  },
  {
    name: "BB - 3 - Day 7 Most popular this week",
    subject: "Le 3 città più richieste questa settimana",
    body: `
      <h2>Ciao {{contact.FIRSTNAME}},<br/>i numeri di questa settimana.</h2>
      <p>Ecco dove sta andando la community Backpack &amp; Bottle adesso. Spoiler: l'estate sta arrivando, e i prezzi pure.</p>
      <table class="grid">
        <tr><td>🥇 <strong>Lisbona</strong> · 34% delle prenotazioni</td><td>da €345 → con BB50: <strong>€295</strong></td></tr>
        <tr><td>🥈 <strong>Barcellona</strong> · 28%</td><td>da €320 → con BB50: <strong>€270</strong></td></tr>
        <tr><td>🥉 <strong>Amsterdam</strong> · 19%</td><td>da €365 → con BB50: <strong>€315</strong></td></tr>
      </table>
      <p>Aprile e maggio sono i mesi migliori. Giugno è ancora possibile, luglio diventa caro.</p>
      <div class="btn-wrap">
        <a href="https://backpack-bottle.vercel.app/" class="btn">Prenota prima del rincaro →</a>
      </div>
      <div class="urgent">
        BB50 valido ancora <strong>83 giorni</strong>. Dopo, sconto perso.
      </div>
    `,
    preheader: "Lisbona, Barcellona, Amsterdam. Numeri reali.",
  },
  {
    name: "BB - 4 - Day 60 Coupon expiring",
    subject: "Il tuo coupon BB50 scade tra 30 giorni",
    body: `
      <h2>Ciao {{contact.FIRSTNAME}},<br/>30 giorni rimasti.</h2>
      <p>Il tuo €50 di sconto sta per scadere. Niente drama, ma se hai un weekend in mente, è ora.</p>
      <p>La destinazione più adatta a te, secondo quello che hai detto:</p>
      <div class="coupon" style="background:${BRAND.forest};">
        <p style="margin:0 0 6px 0;font-size:14px;letter-spacing:.2em;text-transform:uppercase;opacity:.7;">La tua destinazione</p>
        <p style="margin:0;font-family:'Fraunces',serif;font-size:36px;font-weight:500;text-transform:capitalize;">{{contact.DESTINATION_INTEREST|default:\"Lisbona\"}}</p>
        <p style="margin:16px 0 0 0;font-size:14px;opacity:.85;">Applica BB50 al checkout = €50 di sconto immediato</p>
      </div>
      <div class="btn-wrap">
        <a href="https://backpack-bottle.vercel.app/#destinazioni" class="btn">Prenota prima che scada →</a>
      </div>
      <p style="font-size:14px;color:rgba(31,58,46,.7);">P.S. Dopo la scadenza il coupon non sarà recuperabile. Una volta sola.</p>
    `,
    preheader: "L'ultima chiamata per il tuo €50 di sconto.",
  },
];

(async () => {
  const created: { id: number; name: string }[] = [];
  // Only run the 2 that previously failed (id=2 and id=4 by index)
  const onlyMissing = process.argv.includes("--missing");
  const list = onlyMissing ? [templates[1], templates[3]] : templates;
  for (const t of list) {
    const html = shell(t.name, t.preheader, t.body);
    const res = await fetch("https://api.brevo.com/v3/smtp/templates", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": KEY,
      },
      body: JSON.stringify({
        tag: "backpack-bottle-welcome",
        templateName: t.name,
        htmlContent: html,
        subject: t.subject,
        sender: SENDER,
        isActive: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`✗ ${t.name}:`, res.status, JSON.stringify(data));
      continue;
    }
    console.log(`✓ ${t.name} → id=${data.id}`);
    created.push({ id: data.id, name: t.name });
  }
  console.log("\nALL CREATED:");
  console.log(JSON.stringify(created, null, 2));
})();
