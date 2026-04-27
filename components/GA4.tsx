import Script from "next/script";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

export default function GA4() {
  if (!GA4_ID || GA4_ID === "G-XXXXXXXXXX") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', {
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
