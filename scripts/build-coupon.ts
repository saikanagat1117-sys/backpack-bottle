import { PDFDocument, PDFPage, rgb, degrees } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateCoupon() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();

  // Forest background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.1176, 0.2275, 0.1804), // #1F3A2E
  });

  // Cream accent bar (top)
  page.drawRectangle({
    x: 0,
    y: height - 80,
    width,
    height: 80,
    color: rgb(0.9608, 0.9373, 0.9020), // #F5EFE6
  });

  // Main coupon box (centered)
  const boxX = 60;
  const boxY = 200;
  const boxW = width - 120;
  const boxH = 400;

  // Cream background for coupon
  page.drawRectangle({
    x: boxX,
    y: boxY,
    width: boxW,
    height: boxH,
    color: rgb(0.9608, 0.9373, 0.9020), // #F5EFE6
  });

  // Burnt orange accent line
  page.drawRectangle({
    x: boxX,
    y: boxY + boxH - 8,
    width: boxW,
    height: 8,
    color: rgb(0.8510, 0.4627, 0.2588), // #D97642
  });

  // Title: "BACKPACK & BOTTLE"
  page.drawText("BACKPACK & BOTTLE", {
    x: boxX + 30,
    y: boxY + boxH - 80,
    size: 24,
    color: rgb(0.1176, 0.2275, 0.1804), // Forest
    maxWidth: boxW - 60,
  });

  // Coupon code (large, bold)
  page.drawText("BB50", {
    x: boxX + 30,
    y: boxY + boxH - 140,
    size: 64,
    color: rgb(0.8510, 0.4627, 0.2588), // Burnt orange
    maxWidth: boxW - 60,
  });

  // Offer text
  page.drawText("€50 OFF", {
    x: boxX + 30,
    y: boxY + boxH - 180,
    size: 28,
    color: rgb(0.1176, 0.2275, 0.1804),
    maxWidth: boxW - 60,
  });

  // Fine print
  const fineText = [
    "Valid on bookings from €300+",
    "Expires in 90 days from issue",
    "Non-transferable • One per email",
    "See full T&Cs on backpack-bottle.vercel.app/privacy",
  ];

  let yPos = boxY + 120;
  for (const line of fineText) {
    page.drawText(line, {
      x: boxX + 30,
      y: yPos,
      size: 10,
      color: rgb(0.3, 0.3, 0.3),
      maxWidth: boxW - 60,
    });
    yPos -= 18;
  }

  // Destinations list
  const destinations = ["Rome", "Barcelona", "Amsterdam", "Lisbon", "Prague"];
  page.drawText("Valid for: " + destinations.join(" • "), {
    x: boxX + 30,
    y: 120,
    size: 9,
    color: rgb(0.1176, 0.2275, 0.1804),
    maxWidth: boxW - 60,
  });

  // Footer
  page.drawText("BACKPACK & BOTTLE", {
    x: width / 2 - 60,
    y: 30,
    size: 10,
    color: rgb(0.1176, 0.2275, 0.1804),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(
    process.cwd(),
    "public",
    "backpack-bottle-coupon-BB50.pdf"
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`✓ Coupon PDF generated: ${outputPath}`);
}

generateCoupon().catch(console.error);
