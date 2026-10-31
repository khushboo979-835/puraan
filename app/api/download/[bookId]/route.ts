import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter } from '@/models';
import { getCurrentUser } from '@/lib/auth';
import { generateWatermarkedPdf } from '@/lib/pdfWatermark';
import { SEED_BOOKS } from '@/lib/seedData';

export async function GET(req: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const { bookId } = params;
    const searchParams = req.nextUrl.searchParams;
    const forceOriginal = searchParams.get('source') === 'original' || searchParams.get('original') === 'true';

    // 1. Identify Scripture (Search Seed Books and Database)
    let book: any = SEED_BOOKS.find(
      (b) => b.slug === bookId || b.slug === bookId.toLowerCase() || (b as any)._id === bookId
    );
    let chapters: any[] = book ? book.chapters : [];

    try {
      await connectToDatabase();
      if (!book) {
        book = await Book.findById(bookId);
        if (book) {
          chapters = await Chapter.find({ bookId: book._id }).sort({ chapterNumber: 1 });
        }
      }
    } catch (dbErr) {
      // Graceful fallback to SEED_BOOKS if MongoDB Atlas is offline or not whitelisted
      console.warn('MongoDB connection fallback during download:', dbErr);
    }

    if (!book) {
      // Secondary search in seed books by partial title or slug
      book = SEED_BOOKS.find((b) => b.title.toLowerCase().includes(bookId.toLowerCase()));
      if (book) chapters = book.chapters;
    }

    if (!book) {
      return NextResponse.json({ error: 'Sacred book not found' }, { status: 404 });
    }

    // 2. If Original Authentic Geeta Press / Archive Edition requested and URL exists, redirect directly
    if (forceOriginal && (book as any).originalPdfUrl) {
      return NextResponse.redirect((book as any).originalPdfUrl, 307);
    }

    // 3. User Resolution for Watermark
    let userEmail = 'devout.seeker@gyandharam.com';
    let orderId = `MAHAPARV-FESTIVE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      const user = await getCurrentUser(req);
      if (user && user.email) {
        userEmail = user.email;
        orderId = `LIC-${user._id?.toString().slice(-6).toUpperCase() || 'USER'}`;
      }
    } catch (userErr) {
      // Continue with default festive seeker watermark
    }

    // 4. Generate Certified Watermarked PDF (100% Free under Diwali & Chhath Puja Mahaparv Offer)
    const pdfBytes = await generateWatermarkedPdf({
      userEmail,
      orderId,
      book,
      chapters,
    });

    const sanitizedTitle = (book.slug || book.title || 'Sacred_Scripture')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 30);

    const filename = `GyanDharam_${sanitizedTitle}_Certified_Edition.pdf`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', pdfBytes.length.toString());

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('PDF download error:', error);
    // If generation error occurs, fallback redirect to original PDF URL if available
    const seedBook = SEED_BOOKS.find(
      (b) => b.slug === params.bookId || b.slug === params.bookId.toLowerCase()
    );
    if (seedBook && seedBook.originalPdfUrl) {
      return NextResponse.redirect(seedBook.originalPdfUrl, 307);
    }
    return NextResponse.json({ error: error.message || 'Failed to generate PDF' }, { status: 500 });
  }
}
