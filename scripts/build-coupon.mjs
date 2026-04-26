// Generates the BB50 branded coupon PDF.
// Usage: node scripts/build-coupon.mjs
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const FOREST = rgb(0x1f / 255, 0x3a / 255, 0x2e / 255);
const CREAM = rgb(0xf5 / 255, 0xef / 255, 0xe6 / 255);
const BURNT = rgb(0xd9 / 255, 0x76 / 255, 0x42 / 255);

const pdf = await PDFDocument.create();
const page = pdf.addPage([595.28, 841.89]); // A4
const { width, height } = page.getSize();

const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const serifB = await pdf.embedFont(StandardFonts.TimesRomanBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);
const sansB = await pdf.embedFont(StandardFonts.HelveticaBold);

// Forest background
page.drawRectangle({ x: 0, y: 0, width, height, color: FOREST });

// Cream coupon card
const M = 40;
page.drawRectangle({
  x: M, y: M, width: width - M * 2, height: height - M * 2,
  color: CREAM,
});

// Top eyebrow
page.drawText("BACKPACK & BOTTLE  ·  EARLY-BOOKING OFFER", {
  x: 70, y: height - 110, size: 10, font: sansB, color: FOREST,
});

// Headline
page.drawText("€50", {
  x: 70, y: height - 220, size: 130, font: serifB, color: BURNT,
});
page.drawText("off your first European city break", {
  x: 70, y: height - 270, size: 22, font: serif, color: FOREST,
});

// Code box
page.drawRectangle({
  x: 70, y: height - 360, width: width - 140, height: 60,
  borderColor: FOREST, borderWidth: 1,
});
page.drawText("YOUR CODE", { x: 90, y: height - 320, size: 9, font: sansB, color: FOREST });
page.drawText("BB50", { x: 90, y: height - 350, size: 26, font: serifB, color: BURNT });
page.drawText("Valid 90 days  ·  Min. booking €300", {
  x: 320, y: height - 335, size: 11, font: sans, color: FOREST,
});

// Destinations
page.drawText("VALID FOR", { x: 70, y: height - 410, size: 9, font: sansB, color: FOREST });
const dests = ["Rome", "Barcelona", "Amsterdam", "Lisbon", "Prague"];
dests.forEach((d, i) => {
  page.drawText(d, { x: 70 + i * 95, y: height - 440, size: 14, font: serif, color: FOREST });
});

// How it works
page.drawText("HOW TO REDEEM", { x: 70, y: height - 500, size: 9, font: sansB, color: FOREST });
const steps = [
  "1. Browse packages at backpackandbottle.com",
  "2. Apply code BB50 at checkout on bookings €300 or more",
  "3. Confirmation arrives by email with your e-ticket",
];
steps.forEach((s, i) => {
  page.drawText(s, { x: 70, y: height - 525 - i * 22, size: 12, font: sans, color: FOREST });
});

// T&Cs
page.drawText("TERMS", { x: 70, y: 220, size: 9, font: sansB, color: FOREST });
const tcs = [
  "One coupon per customer per booking. Not combinable with other offers.",
  "Travel dates: 1 June – 31 December 2026. Excludes 23–31 Dec, 31 Dec – 2 Jan, 10–20 Aug.",
  "Subject to availability. Standard cancellation terms apply per carrier.",
  "Backpack & Bottle is a Bologna Business School academic project (Group 3).",
];
tcs.forEach((s, i) => {
  page.drawText(s, { x: 70, y: 200 - i * 14, size: 9, font: sans, color: FOREST });
});

// Footer
page.drawText("backpack & bottle", { x: 70, y: 60, size: 14, font: serifB, color: FOREST });
page.drawText("backpackandbottle.com", { x: width - 220, y: 60, size: 10, font: sans, color: FOREST });

const bytes = await pdf.save();
const out = path.resolve("public/backpack-bottle-coupon-BB50.pdf");
await fs.writeFile(out, bytes);
console.log(`Wrote ${out} (${bytes.length} bytes)`);
