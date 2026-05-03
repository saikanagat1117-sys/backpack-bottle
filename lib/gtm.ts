export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "000000000000000";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  // Mirror to Clarity custom tag for session-recording filtering
  if (typeof window.clarity === "function") {
    try {
      window.clarity("set", event, JSON.stringify(params));
    } catch {}
  }
}

// ---- Convenience helpers ----
export const trackCTA = (location: string, label?: string) =>
  track("cta_click", { location, label });

export const trackOutbound = (url: string, label?: string) =>
  track("outbound_click", { url, label });

export const trackShare = (network: string, page: string) =>
  track("share_click", { network, page });

export const trackSearch = (query: string) =>
  track("site_search", { query });

export const trackVideo = (state: "play" | "pause" | "complete", videoId: string) =>
  track("video_" + state, { video_id: videoId });

export const trackFAQ = (question: string, page: string) =>
  track("faq_open", { question, page });

export const trackGallery = (destination: string, index: number) =>
  track("gallery_view", { destination, index });

export const trackDestinationView = (destination: string) =>
  track("destination_detail_view", { destination });

export const trackComparisonOpen = () => track("comparison_open", {});

export const trackPricingFilter = (filter: string, value: string | number) =>
  track("pricing_filter", { filter, value });

export const trackNewsletterSignup = (placement: string) =>
  track("newsletter_signup", { placement });

export const trackCurrencyChange = (currency: string) =>
  track("currency_change", { currency });

export const trackConsentChoice = (choice: "accept" | "reject", locale?: string) =>
  track("consent_choice", { consent_choice: choice, consent_locale: locale });
