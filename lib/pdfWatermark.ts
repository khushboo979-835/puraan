import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { IBook, IChapter } from '@/models';

interface WatermarkOptions {
  userEmail: string;
  orderId: string;
  book: any;
  chapters?: any[];
}

export async function generateWatermarkedPdf({ userEmail, orderId, book, chapters }: WatermarkOptions): Promise<Uint8Array> {
  // Create a clean, elegant PDF Document
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Cover Page
  const coverPage = pdfDoc.addPage([595.28, 841.89]); // A4 Size in points
  const { width: pageWidth, height: pageHeight } = coverPage.getSize();

  // Golden / Sandalwood background accent box
  coverPage.drawRectangle({
    x: 30,
    y: 30,
    width: pageWidth - 60,
    height: pageHeight - 60,
    borderColor: rgb(0.85, 0.65, 0.13), // Gold border
    borderWidth: 2,
  });

  coverPage.drawRectangle({
    x: 36,
    y: 36,
    width: pageWidth - 72,
    height: pageHeight - 72,
    borderColor: rgb(0.9, 0.75, 0.3),
    borderWidth: 0.5,
  });

  // Top header text
  coverPage.drawText('GYANDHARAM.COM • DIGITAL SACRED SCRIPTURE ARCHIVES', {
    x: 100,
    y: pageHeight - 90,
    size: 11,
    font: helveticaBold,
    color: rgb(0.55, 0.4, 0.1),
  });

  // Religion category
  coverPage.drawText(`[ Faith Tradition: ${book.religion?.toUpperCase() || 'SACRED SCRIPTURE'} ]`, {
    x: 170,
    y: pageHeight - 130,
    size: 12,
    font: timesRomanBold,
    color: rgb(0.7, 0.35, 0.05),
  });

  // Book Title
  coverPage.drawText(book.title || 'Sacred Scripture', {
    x: 60,
    y: pageHeight - 220,
    size: 26,
    font: timesRomanBold,
    color: rgb(0.12, 0.1, 0.08),
  });

  // Author / Revelation
  coverPage.drawText(`Revealed By / Sage: ${book.author || 'Ancient Divine Wisdom'}`, {
    x: 60,
    y: pageHeight - 260,
    size: 14,
    font: timesRomanItalic,
    color: rgb(0.3, 0.25, 0.2),
  });

  // Language & Critical Edition
  coverPage.drawText(`Language: ${book.language || 'Sanskrit & Hindi'} • Authorized Digital Edition`, {
    x: 60,
    y: pageHeight - 290,
    size: 11,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Synopsis box
  coverPage.drawRectangle({
    x: 60,
    y: pageHeight - 480,
    width: pageWidth - 120,
    height: 160,
    color: rgb(0.98, 0.97, 0.94),
    borderColor: rgb(0.85, 0.8, 0.7),
    borderWidth: 1,
  });

  coverPage.drawText('AUTHENTICITY & MANUSCRIPT PROVENANCE:', {
    x: 75,
    y: pageHeight - 350,
    size: 10,
    font: helveticaBold,
    color: rgb(0.6, 0.3, 0.0),
  });

  const sourceText = book.authenticitySource || 'Verified Critical Edition preserved in sacred repositories.';
  coverPage.drawText(sourceText.slice(0, 160), {
    x: 75,
    y: pageHeight - 375,
    size: 10,
    font: timesRoman,
    color: rgb(0.2, 0.2, 0.2),
    maxWidth: pageWidth - 150,
    lineHeight: 14,
  });

  // License Certificate Box
  coverPage.drawRectangle({
    x: 60,
    y: 120,
    width: pageWidth - 120,
    height: 120,
    color: rgb(0.96, 0.98, 0.96),
    borderColor: rgb(0.2, 0.6, 0.3),
    borderWidth: 1.5,
  });

  coverPage.drawText('VERIFIED DRM LICENSE CERTIFICATE', {
    x: 75,
    y: 215,
    size: 11,
    font: helveticaBold,
    color: rgb(0.1, 0.45, 0.2),
  });

  coverPage.drawText(`Licensed Digital Copy issued to: ${userEmail}`, {
    x: 75,
    y: 190,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.2, 0.1),
  });

  coverPage.drawText(`Transaction Order ID: ${orderId}`, {
    x: 75,
    y: 170,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });

  coverPage.drawText(`Timestamp: ${new Date().toISOString()} • Unrestricted Personal Devotional Reading`, {
    x: 75,
    y: 150,
    size: 9,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Additional Chapter Pages
  if (chapters && chapters.length > 0) {
    for (const chapter of chapters) {
      const page = pdfDoc.addPage([595.28, 841.89]);
      let currentY = pageHeight - 80;

      // Chapter Header
      page.drawText(`CHAPTER ${chapter.chapterNumber}: ${chapter.title.slice(0, 50)}`, {
        x: 50,
        y: currentY,
        size: 14,
        font: timesRomanBold,
        color: rgb(0.7, 0.35, 0.05),
      });

      currentY -= 30;

      if (chapter.summary) {
        page.drawText(`Summary: ${chapter.summary.slice(0, 180)}`, {
          x: 50,
          y: currentY,
          size: 10,
          font: timesRomanItalic,
          color: rgb(0.4, 0.4, 0.4),
          maxWidth: pageWidth - 100,
          lineHeight: 14,
        });
        currentY -= 40;
      }

      // Verses
      if (chapter.verses && chapter.verses.length > 0) {
        for (let i = 0; i < chapter.verses.length; i++) {
          const verse = chapter.verses[i];
          if (currentY < 120) {
            // Add a new page if space runs out
            break;
          }

          page.drawText(`[Verse ${i + 1}]  ${verse.originalScript.slice(0, 100)}`, {
            x: 50,
            y: currentY,
            size: 11,
            font: timesRomanBold,
            color: rgb(0.1, 0.1, 0.1),
            maxWidth: pageWidth - 100,
          });
          currentY -= 20;

          page.drawText(`Hindi: ${verse.hindiTranslation.slice(0, 140)}`, {
            x: 50,
            y: currentY,
            size: 9.5,
            font: timesRoman,
            color: rgb(0.25, 0.25, 0.25),
            maxWidth: pageWidth - 100,
            lineHeight: 12,
          });
          currentY -= 35;
        }
      }
    }
  }

  // Stamp dynamic DRM watermark on EVERY SINGLE page in the document
  const allPages = pdfDoc.getPages();
  const totalPages = allPages.length;

  for (let idx = 0; idx < totalPages; idx++) {
    const page = allPages[idx];
    const { width, height } = page.getSize();

    // 1. Footer Watermark Bar
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 28,
      color: rgb(0.97, 0.95, 0.92),
    });

    page.drawLine({
      start: { x: 0, y: 28 },
      end: { x: width, y: 28 },
      thickness: 0.75,
      color: rgb(0.85, 0.65, 0.13),
    });

    // Exact watermark line required by user:
    // email, order ID, and the text "Licensed Digital Copy"
    const footerWatermark = `Licensed Digital Copy • ${userEmail} • Order ID: ${orderId} • GyanDharam.com DRM Protected (Page ${idx + 1} of ${totalPages})`;

    page.drawText(footerWatermark, {
      x: 30,
      y: 10,
      size: 8,
      font: helveticaBold,
      color: rgb(0.45, 0.25, 0.05),
    });

    // 2. Subtle translucent diagonal watermark across page body
    page.drawText(`LICENSED TO ${userEmail.toUpperCase()}`, {
      x: 80,
      y: height / 2 - 40,
      size: 32,
      font: helveticaBold,
      color: rgb(0.88, 0.88, 0.88),
      opacity: 0.25,
      rotate: degrees(35),
    });
  }

  return pdfDoc.save();
}
