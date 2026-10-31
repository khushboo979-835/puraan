import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

interface WatermarkOptions {
  userEmail: string;
  orderId: string;
  book: any;
  chapters?: any[];
}

function cleanForPdf(text: string): string {
  if (!text) return '';
  // StandardFonts in pdf-lib (Helvetica, TimesRoman) use WinAnsiEncoding (Latin-1 / printable ASCII)
  return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function generateWatermarkedPdf({ userEmail, orderId, book, chapters }: WatermarkOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const safeEmail = cleanForPdf(userEmail || 'seeker@gyandharam.com');
  const safeOrderId = cleanForPdf(orderId || 'FESTIVE-GIFT-2026');
  const safeTitle = cleanForPdf(book.title || 'Sacred Scripture');
  const safeAuthor = cleanForPdf(book.author || 'Ancient Divine Wisdom');
  const safeReligion = cleanForPdf(book.religion || 'Sacred Tradition');
  const safeLanguage = cleanForPdf(book.language || 'Sanskrit & Hindi');

  // ── 1. COVER PAGE ──────────────────────────────────────────────
  const coverPage = pdfDoc.addPage([595.28, 841.89]); // A4 Size
  const { width: pageWidth, height: pageHeight } = coverPage.getSize();

  // Outer Gold Decorative Border
  coverPage.drawRectangle({
    x: 30,
    y: 30,
    width: pageWidth - 60,
    height: pageHeight - 60,
    borderColor: rgb(0.85, 0.65, 0.13),
    borderWidth: 2,
  });

  // Inner Subtle Border
  coverPage.drawRectangle({
    x: 36,
    y: 36,
    width: pageWidth - 72,
    height: pageHeight - 72,
    borderColor: rgb(0.9, 0.75, 0.3),
    borderWidth: 0.5,
  });

  // Top Archive Header
  coverPage.drawText('GYANDHARAM.COM - DIGITAL SACRED SCRIPTURE ARCHIVES', {
    x: 80,
    y: pageHeight - 90,
    size: 11,
    font: helveticaBold,
    color: rgb(0.55, 0.4, 0.1),
  });

  // Religion category
  coverPage.drawText(`[ Faith Tradition: ${safeReligion.toUpperCase()} ]`, {
    x: 160,
    y: pageHeight - 130,
    size: 12,
    font: timesRomanBold,
    color: rgb(0.7, 0.35, 0.05),
  });

  // Book Title
  coverPage.drawText(safeTitle.slice(0, 45), {
    x: 60,
    y: pageHeight - 210,
    size: 24,
    font: timesRomanBold,
    color: rgb(0.12, 0.1, 0.08),
  });

  // Author / Revelation
  coverPage.drawText(`Sage / Revelation: ${safeAuthor.slice(0, 50)}`, {
    x: 60,
    y: pageHeight - 250,
    size: 13,
    font: timesRomanItalic,
    color: rgb(0.3, 0.25, 0.2),
  });

  // Language & Critical Edition
  coverPage.drawText(`Language: ${safeLanguage} - Certified Digital Edition`, {
    x: 60,
    y: pageHeight - 280,
    size: 11,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Synopsis / Authenticity Provenance box
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

  const rawSource = book.authenticitySource || 'Verified Critical Edition preserved in sacred archives with line-by-line vocal synchronization.';
  const safeSource = cleanForPdf(rawSource);
  coverPage.drawText(safeSource.slice(0, 240), {
    x: 75,
    y: pageHeight - 380,
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
    height: 125,
    color: rgb(0.96, 0.98, 0.96),
    borderColor: rgb(0.2, 0.6, 0.3),
    borderWidth: 1.5,
  });

  coverPage.drawText('VERIFIED DRM LICENSE CERTIFICATE', {
    x: 75,
    y: 220,
    size: 11,
    font: helveticaBold,
    color: rgb(0.1, 0.45, 0.2),
  });

  coverPage.drawText(`Licensed Digital Copy issued to: ${safeEmail}`, {
    x: 75,
    y: 195,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.2, 0.1),
  });

  coverPage.drawText(`Transaction Order ID: ${safeOrderId}`, {
    x: 75,
    y: 175,
    size: 9,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });

  coverPage.drawText(`Timestamp: ${new Date().toISOString()} - Devotional Study Rights`, {
    x: 75,
    y: 155,
    size: 9,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  coverPage.drawText('Authorized by GyanDharam Council for lifetime educational study.', {
    x: 75,
    y: 135,
    size: 8,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });

  // ── 2. CHAPTER & VERSE PAGES ──────────────────────────────────
  if (chapters && chapters.length > 0) {
    for (const chapter of chapters) {
      const page = pdfDoc.addPage([595.28, 841.89]);
      let currentY = pageHeight - 80;

      const safeChapterTitle = cleanForPdf(chapter.title || `Chapter ${chapter.chapterNumber}`);
      page.drawText(`CHAPTER ${chapter.chapterNumber}: ${safeChapterTitle.slice(0, 50)}`, {
        x: 50,
        y: currentY,
        size: 13,
        font: timesRomanBold,
        color: rgb(0.7, 0.35, 0.05),
      });

      currentY -= 25;

      if (chapter.summary) {
        const safeSummary = cleanForPdf(chapter.summary);
        page.drawText(`Summary: ${safeSummary.slice(0, 180)}`, {
          x: 50,
          y: currentY,
          size: 9.5,
          font: timesRomanItalic,
          color: rgb(0.35, 0.35, 0.35),
          maxWidth: pageWidth - 100,
          lineHeight: 13,
        });
        currentY -= 35;
      }

      // Verses
      if (chapter.verses && chapter.verses.length > 0) {
        for (let i = 0; i < chapter.verses.length; i++) {
          const verse = chapter.verses[i];
          if (currentY < 120) break; // Keep room for footer watermark

          const safeTranslit = cleanForPdf(verse.transliteration || verse.englishTranslation || '');
          const safeEnglish = cleanForPdf(verse.englishTranslation || '');

          page.drawText(`[Verse ${i + 1}] ${safeTranslit.slice(0, 95)}`, {
            x: 50,
            y: currentY,
            size: 10,
            font: timesRomanBold,
            color: rgb(0.1, 0.1, 0.1),
            maxWidth: pageWidth - 100,
          });
          currentY -= 18;

          if (safeEnglish) {
            page.drawText(`Meaning: ${safeEnglish.slice(0, 140)}`, {
              x: 50,
              y: currentY,
              size: 9,
              font: timesRoman,
              color: rgb(0.25, 0.25, 0.25),
              maxWidth: pageWidth - 100,
              lineHeight: 12,
            });
            currentY -= 30;
          } else {
            currentY -= 15;
          }
        }
      }
    }
  }

  // ── 3. DYNAMIC DRM WATERMARK ON EVERY PAGE ────────────────────
  const allPages = pdfDoc.getPages();
  const totalPages = allPages.length;

  for (let idx = 0; idx < totalPages; idx++) {
    const page = allPages[idx];
    const { width, height } = page.getSize();

    // Footer Watermark Bar
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

    const footerWatermark = cleanForPdf(
      `Licensed Digital Copy - ${safeEmail} - Order ID: ${safeOrderId} - GyanDharam.com (Page ${idx + 1} of ${totalPages})`
    );

    page.drawText(footerWatermark, {
      x: 30,
      y: 10,
      size: 8,
      font: helveticaBold,
      color: rgb(0.45, 0.25, 0.05),
    });

    // Subtle translucent diagonal watermark across page body
    const bodyWatermark = cleanForPdf(`LICENSED TO ${safeEmail.toUpperCase()}`);
    page.drawText(bodyWatermark.slice(0, 40), {
      x: 80,
      y: height / 2 - 40,
      size: 28,
      font: helveticaBold,
      color: rgb(0.88, 0.88, 0.88),
      opacity: 0.2,
      rotate: degrees(35),
    });
  }

  return pdfDoc.save();
}
