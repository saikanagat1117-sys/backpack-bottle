"use client";
import { useLocale } from "./LocaleProvider";
import { track } from "@/lib/gtm";

const NUMBER = "393000000000"; // placeholder — replace with real WhatsApp Business number

export default function WhatsAppButton() {
  const { locale } = useLocale();
  const text =
    locale === "it"
      ? encodeURIComponent("Ciao! Ho una domanda sulle vostre destinazioni 🎒🍷")
      : encodeURIComponent("Hi! I have a question about your destinations 🎒🍷");
  const href = `https://wa.me/${NUMBER}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { placement: "floating_button" })}
      aria-label="WhatsApp"
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M16.003 3C9.382 3 4 8.382 4 15.003c0 2.115.553 4.179 1.6 5.998L4 28l7.16-1.553a11.98 11.98 0 004.84 1.022h.003C22.624 27.469 28 22.087 28 15.466 28 8.846 22.624 3 16.003 3zm0 21.86h-.003a9.876 9.876 0 01-5.027-1.376l-.36-.214-4.247.92.91-4.135-.235-.376a9.857 9.857 0 01-1.51-5.276c0-5.453 4.435-9.886 9.892-9.886 5.46 0 9.892 4.433 9.892 9.886 0 5.453-4.435 9.886-9.892 9.886zm5.43-7.404c-.297-.149-1.76-.869-2.034-.967-.273-.099-.471-.149-.67.149-.198.297-.768.967-.94 1.165-.173.198-.346.223-.643.074-.297-.149-1.255-.463-2.39-1.474-.883-.787-1.479-1.76-1.652-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.67-1.612-.918-2.207-.241-.578-.486-.5-.67-.51l-.57-.01c-.198 0-.52.074-.793.371-.273.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.094 3.197 5.075 4.482.71.306 1.262.488 1.694.625.712.226 1.359.194 1.871.118.571-.085 1.76-.72 2.008-1.414.247-.694.247-1.29.173-1.414-.074-.124-.273-.198-.57-.347z" />
      </svg>
    </a>
  );
}
