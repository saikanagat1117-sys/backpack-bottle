import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        <article className="container-x py-20 max-w-3xl prose prose-forest">
          <h1 className="font-display text-5xl text-forest mb-6">Privacy & Cookie Policy</h1>
          <p className="text-forest/70">Ultimo aggiornamento: 21 aprile 2026</p>

          <h2 className="font-display text-2xl text-forest mt-10 mb-3">1. Titolare del trattamento</h2>
          <p>Backpack &amp; Bottle, progetto accademico Bologna Business School. Email: privacy@backpackandbottle.example.</p>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">2. Dati raccolti</h2>
          <p>Nome, indirizzo email, città di partenza, destinazione d'interesse, dati tecnici (IP, user agent, referrer) e dati di navigazione raccolti via cookie e pixel.</p>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">3. Finalità</h2>
          <ul>
            <li>Invio del coupon e della guida PDF richiesti.</li>
            <li>Comunicazioni di marketing (deal settimanali) previo consenso.</li>
            <li>Misurazione e ottimizzazione della campagna (GA4, Meta Pixel, Google Ads).</li>
          </ul>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">4. Base giuridica</h2>
          <p>Consenso esplicito (art. 6.1.a GDPR) per marketing; legittimo interesse (art. 6.1.f) per analytics in forma aggregata.</p>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">5. Cookie</h2>
          <p>Utilizziamo cookie tecnici (sempre attivi), analitici (Google Analytics 4 via GTM) e di marketing (Meta Pixel, Google Ads). Puoi revocare il consenso in qualsiasi momento tramite il banner o le impostazioni del browser.</p>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">6. Conservazione</h2>
          <p>I dati di contatto sono conservati fino a revoca del consenso o inattività superiore a 24 mesi. I dati di analytics sono conservati 14 mesi.</p>

          <h2 className="font-display text-2xl text-forest mt-8 mb-3">7. Diritti dell'interessato</h2>
          <p>Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione (artt. 15–22 GDPR). Scrivici a privacy@backpackandbottle.example.</p>

          <h2 id="terms" className="font-display text-2xl text-forest mt-10 mb-3">Termini del coupon</h2>
          <ul>
            <li>Sconto €50 su prenotazioni pari o superiori a €300.</li>
            <li>Validità 90 giorni dal download; una redenzione per cliente.</li>
            <li>Date viaggio: 1 giugno – 31 dicembre 2026, esclusi 23–31 dicembre, 31 dicembre – 2 gennaio, 10–20 agosto.</li>
            <li>Soggetto a disponibilità; non cumulabile con altre offerte.</li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
