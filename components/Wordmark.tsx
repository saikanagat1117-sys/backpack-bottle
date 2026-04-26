import Link from "next/link";

export default function Wordmark({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const text = light ? "text-cream" : "text-forest";
  const accent = "text-burnt";
  const sizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
  return (
    <Link href="/" className={`inline-flex items-center gap-2 wordmark ${sizes[size]} ${text}`} aria-label="Backpack & Bottle home">
      <Mark light={light} />
      <span>backpack <span className={accent}>&</span> bottle</span>
    </Link>
  );
}

export function Mark({ light = false, size = 24 }: { light?: boolean; size?: number }) {
  const stroke = light ? "#F5EFE6" : "#1F3A2E";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Backpack silhouette */}
      <path
        d="M8 11c0-3 2-5 5-5h0c2 0 3 1 3 3v2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="6" y="10" width="13" height="16" rx="3" stroke={stroke} strokeWidth="1.5" />
      <line x1="6" y1="17" x2="19" y2="17" stroke={stroke} strokeWidth="1.2" />
      {/* Bottle silhouette overlapping right */}
      <path
        d="M22 8v3c0 .5.3.9.7 1.3l1.6 1.6c.4.4.7.9.7 1.5V25c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-9.6c0-.6.3-1.1.7-1.5l1.6-1.6c.4-.4.7-.8.7-1.3V8"
        stroke="#D97642"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="21" y1="8" x2="25" y2="8" stroke="#D97642" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
