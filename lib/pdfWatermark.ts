import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

interface WatermarkOptions {
  userEmail: string;
  orderId: string;
  book: any;
  chapters?: any[];
  isPaid?: boolean;
}

function cleanForPdf(text: string): string {
  if (!text) return '';
  // StandardFonts in pdf-lib (Helvetica, TimesRoman) use WinAnsiEncoding (Latin-1 / printable ASCII)
  return text
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\(\s*-\s*\)/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/\s*-\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAuspiciousHeaderMantra(religion: string, slug: string): string {
  const r = (religion || '').toLowerCase();
  const s = (slug || '').toLowerCase();

  if (s.includes('durga') || s.includes('chandi')) {
    return '|| OM NAMAŚCAṆḌIKĀYAI || AUM MAHALAKSHMI DEVIYAI NAMAHA ||';
  }
  if (r.includes('hindu') || s.includes('gita')) {
    return '|| OM SHRI GANESHAYA NAMAHA || OM NAMO BHAGAVATE VASUDEVAYA ||';
  }
  if (r.includes('islam') || s.includes('quran')) {
    return '|| BISMILLAH AR-RAHMAN AR-RAHIM || AL-HAMDU LILLAHI RABBIL-ALAMIN ||';
  }
  if (r.includes('christian') || s.includes('bible')) {
    return '|| IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRIT ||';
  }
  if (r.includes('sikh') || s.includes('japji') || s.includes('granth')) {
    return '|| IK ONKAR SATGUR PRASAD || WAHEGURU JI KA KHALSA WAHEGURU JI KI FATEH ||';
  }
  if (r.includes('buddh') || s.includes('dhamma')) {
    return '|| NAMO TASSA BHAGAVATO ARAHATO SAMMASAMBUDDHASSA ||';
  }
  if (r.includes('jain') || s.includes('kalpa') || s.includes('tattvartha')) {
    return '|| OM NAMO ARIHANTANAM || PARASPAROPAGRAHO JIVANAM ||';
  }
  return '|| OM TAT SAT || UNIVERSAL WISDOM ARCHIVES ||';
}

export async function generateWatermarkedPdf({
  userEmail,
  orderId,
  book,
  chapters,
  isPaid = false,
}: WatermarkOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const safeEmail = cleanForPdf(userEmail || 'devout.seeker@gyandharam.com');
  const safeOrderId = cleanForPdf(orderId || 'FESTIVE-GIFT-2026');
  const safeTitle = cleanForPdf(book.title || 'Sacred Scripture');
  const safeAuthor = cleanForPdf(book.author || 'Ancient Divine Wisdom');
  const safeReligion = cleanForPdf(book.religion || 'Sacred Tradition');
  const safeLanguage = cleanForPdf(book.language || 'Sanskrit & Hindi');
  const auspiciousMantra = getAuspiciousHeaderMantra(book.religion, book.slug);

  // Helper to draw sacred traditional double red & gold borders with corner motifs
  const drawSacredBorders = (page: any, width: number, height: number) => {
    // 1. Outer Crimson Red Sacred Border
    page.drawRectangle({
      x: 24,
      y: 24,
      width: width - 48,
      height: height - 48,
      borderColor: rgb(0.55, 0.05, 0.05), // Sacred Deep Red / Sindoor
      borderWidth: 2.5,
    });

    // 2. Inner Imperial Gold Border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: rgb(0.85, 0.65, 0.13), // Antique Gold
      borderWidth: 1.0,
    });

    // 3. Auspicious Corner Motifs (Geometric Decorative Florets)
    const cornerSize = 10;
    const corners = [
      { x: 30, y: height - 30 - cornerSize }, // Top-Left
      { x: width - 30 - cornerSize, y: height - 30 - cornerSize }, // Top-Right
      { x: 30, y: 30 }, // Bottom-Left
      { x: width - 30 - cornerSize, y: 30 }, // Bottom-Right
    ];

    corners.forEach((c) => {
      page.drawRectangle({
        x: c.x,
        y: c.y,
        width: cornerSize,
        height: cornerSize,
        color: rgb(0.85, 0.65, 0.13),
        borderColor: rgb(0.55, 0.05, 0.05),
        borderWidth: 1,
      });
    });
  };

  // ── 1. LUXURY SACRED COVER PAGE ───────────────────────────────
  const coverPage = pdfDoc.addPage([595.28, 841.89]); // A4 Size
  const { width: pageWidth, height: pageHeight } = coverPage.getSize();

  // Draw traditional red & gold sacred borders
  drawSacredBorders(coverPage, pageWidth, pageHeight);

  // Auspicious Header Mantra in Deep Red
  coverPage.drawText(auspiciousMantra, {
    x: 48,
    y: pageHeight - 65,
    size: 9.5,
    font: timesRomanBold,
    color: rgb(0.55, 0.05, 0.05),
    maxWidth: pageWidth - 96,
  });

  // Top Archive Seal Banner
  coverPage.drawText('GYANDHARAM UNIVERSAL SANCTUARY • SACRED SCRIPTURE ARCHIVES', {
    x: 82,
    y: pageHeight - 95,
    size: 9,
    font: helveticaBold,
    color: rgb(0.7, 0.45, 0.1),
  });

  // Faith Category Badge
  coverPage.drawRectangle({
    x: pageWidth / 2 - 100,
    y: pageHeight - 145,
    width: 200,
    height: 24,
    color: rgb(0.98, 0.95, 0.9),
    borderColor: rgb(0.85, 0.65, 0.13),
    borderWidth: 1,
  });

  coverPage.drawText(`[ TRADITION: ${safeReligion.toUpperCase()} ]`, {
    x: pageWidth / 2 - 80,
    y: pageHeight - 138,
    size: 10,
    font: timesRomanBold,
    color: rgb(0.65, 0.1, 0.1),
  });

  // Book Title (Antique Gold & Crimson)
  coverPage.drawText(safeTitle.slice(0, 45), {
    x: 55,
    y: pageHeight - 210,
    size: 26,
    font: timesRomanBold,
    color: rgb(0.12, 0.08, 0.05),
  });

  // Sage / Divine Origin
  coverPage.drawText(`Divine Sage / Lineage: ${safeAuthor.slice(0, 50)}`, {
    x: 55,
    y: pageHeight - 250,
    size: 13,
    font: timesRomanItalic,
    color: rgb(0.35, 0.25, 0.15),
  });

  // Edition Details
  coverPage.drawText(`Language: ${safeLanguage} • Publisher-Grade Devotional Manuscript`, {
    x: 55,
    y: pageHeight - 280,
    size: 10.5,
    font: helvetica,
    color: rgb(0.4, 0.35, 0.3),
  });

  // Provenance & Authenticity Box
  coverPage.drawRectangle({
    x: 55,
    y: pageHeight - 480,
    width: pageWidth - 110,
    height: 165,
    color: rgb(0.99, 0.98, 0.95),
    borderColor: rgb(0.85, 0.65, 0.13),
    borderWidth: 1.5,
  });

  coverPage.drawText('CRITICAL MANUSCRIPT AUTHENTICITY & PROVENANCE:', {
    x: 70,
    y: pageHeight - 345,
    size: 10,
    font: helveticaBold,
    color: rgb(0.55, 0.05, 0.05),
  });

  const rawSource = book.authenticitySource || 'Preserved from sacred critical manuscript archives with verified vocal synchronization.';
  const safeSource = cleanForPdf(rawSource);
  coverPage.drawText(safeSource.slice(0, 240), {
    x: 70,
    y: pageHeight - 375,
    size: 9.5,
    font: timesRoman,
    color: rgb(0.2, 0.18, 0.15),
    maxWidth: pageWidth - 140,
    lineHeight: 14,
  });

  // License Certificate Box
  coverPage.drawRectangle({
    x: 55,
    y: 110,
    width: pageWidth - 110,
    height: 135,
    color: rgb(0.97, 0.99, 0.97),
    borderColor: rgb(0.2, 0.6, 0.3),
    borderWidth: 1.5,
  });

  coverPage.drawText('VERIFIED DRM DEVOTIONAL STUDY LICENSE', {
    x: 70,
    y: 222,
    size: 11,
    font: helveticaBold,
    color: rgb(0.1, 0.45, 0.2),
  });

  coverPage.drawText(`Licensed Digital Devotee: ${safeEmail}`, {
    x: 70,
    y: 198,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.1, 0.2, 0.1),
  });

  coverPage.drawText(`Transaction Order ID: ${safeOrderId} • Status: ${isPaid ? 'COMPLETE ACCESS UNLOCKED' : 'FESTIVE FREE SAMPLER (CHAPTER 1)'}`, {
    x: 70,
    y: 178,
    size: 8.5,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });

  coverPage.drawText(`Timestamp: ${new Date().toISOString()} • Devotional & Educational Use Only`, {
    x: 70,
    y: 158,
    size: 8.5,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  });

  coverPage.drawText('Authorized by GyanDharam Council for lifetime devotional recitation & study.', {
    x: 70,
    y: 138,
    size: 8,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });

  // ── 2. CHAPTER & VERSE PAGES ──────────────────────────────────
  // If not paid, only include Chapter 1 as a free branded sample
  const chaptersToExport = isPaid ? (chapters || []) : (chapters ? chapters.slice(0, 1) : []);

  if (chaptersToExport.length > 0) {
    for (const chapter of chaptersToExport) {
      let page = pdfDoc.addPage([595.28, 841.89]);
      drawSacredBorders(page, pageWidth, pageHeight);

      let currentY = pageHeight - 75;

      // Header Auspicious Mantra on every chapter page
      page.drawText(auspiciousMantra, {
        x: 48,
        y: currentY,
        size: 8.5,
        font: timesRomanBold,
        color: rgb(0.55, 0.05, 0.05),
        maxWidth: pageWidth - 96,
      });

      currentY -= 30;

      const safeChapterTitle = cleanForPdf(chapter.title || `Chapter ${chapter.chapterNumber}`);
      page.drawText(`CHAPTER ${chapter.chapterNumber}: ${safeChapterTitle.slice(0, 50)}`, {
        x: 50,
        y: currentY,
        size: 13,
        font: timesRomanBold,
        color: rgb(0.65, 0.1, 0.1),
      });

      currentY -= 25;

      if (chapter.summary) {
        const safeSummary = cleanForPdf(chapter.summary);
        page.drawText(`Summary: ${safeSummary.slice(0, 180)}`, {
          x: 50,
          y: currentY,
          size: 9.5,
          font: timesRomanItalic,
          color: rgb(0.35, 0.3, 0.25),
          maxWidth: pageWidth - 100,
          lineHeight: 13,
        });
        currentY -= 35;
      }

      // Verses
      if (chapter.verses && chapter.verses.length > 0) {
        for (let i = 0; i < chapter.verses.length; i++) {
          const verse = chapter.verses[i];

          // Check if page full, allocate continuation page
          if (currentY < 140) {
            page = pdfDoc.addPage([595.28, 841.89]);
            drawSacredBorders(page, pageWidth, pageHeight);
            currentY = pageHeight - 75;

            page.drawText(auspiciousMantra, {
              x: 48,
              y: currentY,
              size: 8.5,
              font: timesRomanBold,
              color: rgb(0.55, 0.05, 0.05),
              maxWidth: pageWidth - 96,
            });

            currentY -= 25;
            page.drawText(`CHAPTER ${chapter.chapterNumber} (Contd.): ${safeChapterTitle.slice(0, 45)}`, {
              x: 50,
              y: currentY,
              size: 11,
              font: timesRomanBold,
              color: rgb(0.65, 0.1, 0.1),
            });
            currentY -= 25;
          }

          const safeTranslit = cleanForPdf(verse.transliteration || verse.englishTranslation || '');
          const safeHindi = cleanForPdf(verse.hindiTranslation || '');
          const safeEnglish = cleanForPdf(verse.englishTranslation || '');

          // Shloka Header
          page.drawText(`[VERSE ${i + 1}] ${safeTranslit.slice(0, 85)}`, {
            x: 50,
            y: currentY,
            size: 10,
            font: timesRomanBold,
            color: rgb(0.12, 0.08, 0.05),
            maxWidth: pageWidth - 100,
          });
          currentY -= 18;

          // Padached / Hindi Meaning
          if (safeHindi) {
            page.drawText(`Hindi Bhavarth: ${safeHindi.slice(0, 140)}`, {
              x: 50,
              y: currentY,
              size: 9,
              font: timesRomanItalic,
              color: rgb(0.35, 0.2, 0.05),
              maxWidth: pageWidth - 100,
              lineHeight: 12,
            });
            currentY -= 26;
          }

          // English Meaning
          if (safeEnglish) {
            page.drawText(`English Meaning: ${safeEnglish.slice(0, 140)}`, {
              x: 50,
              y: currentY,
              size: 8.5,
              font: timesRoman,
              color: rgb(0.25, 0.25, 0.25),
              maxWidth: pageWidth - 100,
              lineHeight: 12,
            });
            currentY -= 28;
          } else {
            currentY -= 15;
          }
        }
      }
    }
  }

  // ── 3. IF FREE SAMPLE: APPEND UNLOCK CERTIFICATE ──────────────
  if (!isPaid && book.totalChapters > 1) {
    const unlockPage = pdfDoc.addPage([595.28, 841.89]);
    drawSacredBorders(unlockPage, pageWidth, pageHeight);

    unlockPage.drawText(auspiciousMantra, {
      x: 48,
      y: pageHeight - 75,
      size: 8.5,
      font: timesRomanBold,
      color: rgb(0.55, 0.05, 0.05),
      maxWidth: pageWidth - 96,
    });

    unlockPage.drawRectangle({
      x: 60,
      y: pageHeight / 2 - 120,
      width: pageWidth - 120,
      height: 240,
      color: rgb(0.99, 0.98, 0.94),
      borderColor: rgb(0.85, 0.65, 0.13),
      borderWidth: 2,
    });

    unlockPage.drawText('UNLOCK COMPLETE SACRED GRANTH (CHAPTERS 2 TO ' + (book.totalChapters || 18) + ')', {
      x: 75,
      y: pageHeight / 2 + 80,
      size: 13,
      font: timesRomanBold,
      color: rgb(0.65, 0.1, 0.1),
    });

    unlockPage.drawText(`You have downloaded the Free Chapter 1 Devotional Sample of ${safeTitle}.`, {
      x: 75,
      y: pageHeight / 2 + 50,
      size: 10,
      font: timesRoman,
      color: rgb(0.2, 0.2, 0.2),
    });

    unlockPage.drawText('To unlock the complete 14+ page publisher-grade scripture edition with', {
      x: 75,
      y: pageHeight / 2 + 30,
      size: 10,
      font: timesRoman,
      color: rgb(0.2, 0.2, 0.2),
    });

    unlockPage.drawText('complete Adhyays, audio synchronization, and offline study rights:', {
      x: 75,
      y: pageHeight / 2 + 12,
      size: 10,
      font: timesRoman,
      color: rgb(0.2, 0.2, 0.2),
    });

    unlockPage.drawText(`Lifetime Scripture Access: Only Rs. ${book.price || 49} | Annual All-Traditions Pass: Rs. 499`, {
      x: 75,
      y: pageHeight / 2 - 20,
      size: 11,
      font: helveticaBold,
      color: rgb(0.7, 0.35, 0.05),
    });

    unlockPage.drawText('Visit: https://gyandharam.com/book/' + (book.slug || 'bhagavad-gita'), {
      x: 75,
      y: pageHeight / 2 - 50,
      size: 10,
      font: helveticaBold,
      color: rgb(0.1, 0.45, 0.2),
    });
  }

  // ── 4. DYNAMIC DRM WATERMARK ON EVERY PAGE ────────────────────
  const allPages = pdfDoc.getPages();
  const totalPages = allPages.length;

  for (let idx = 0; idx < totalPages; idx++) {
    const page = allPages[idx];
    const { width, height } = page.getSize();

    // Footer Watermark Bar
    page.drawRectangle({
      x: 24,
      y: 24,
      width: width - 48,
      height: 22,
      color: rgb(0.97, 0.95, 0.92),
    });

    page.drawLine({
      start: { x: 24, y: 46 },
      end: { x: width - 24, y: 46 },
      thickness: 0.75,
      color: rgb(0.85, 0.65, 0.13),
    });

    const footerWatermark = cleanForPdf(
      `Licensed Devotee: ${safeEmail} • Order: ${safeOrderId} • GyanDharam.com (Page ${idx + 1} of ${totalPages})`
    );

    page.drawText(footerWatermark, {
      x: 35,
      y: 31,
      size: 7.5,
      font: helveticaBold,
      color: rgb(0.45, 0.25, 0.05),
    });

    // Subtle translucent diagonal watermark across page body
    const bodyWatermark = cleanForPdf(`GYANDHARAM LICENSED DEVOTIONAL EDITION`);
    page.drawText(bodyWatermark.slice(0, 42), {
      x: 70,
      y: height / 2 - 40,
      size: 26,
      font: helveticaBold,
      color: rgb(0.88, 0.88, 0.88),
      opacity: 0.18,
      rotate: degrees(35),
    });
  }

  return pdfDoc.save();
}
