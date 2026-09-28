import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter, Order, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';
import { generateWatermarkedPdf } from '@/lib/pdfWatermark';
import { SEED_BOOKS } from '@/lib/seedData';

export async function GET(req: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const { bookId } = params;
    await connectToDatabase();

    let user = await getCurrentUser(req);
    if (!user) {
      user = await User.findOne({ email: 'seeker@sacredreads.org' });
    }

    if (!user) {
      return NextResponse.json({ error: 'Authentication required to download licensed PDF' }, { status: 401 });
    }

    let book: any = await Book.findById(bookId);
    let chapters: any[] = [];

    if (!book) {
      // Check if bookId matches a slug or seed book
      const seedBook = SEED_BOOKS.find((b) => b.slug === bookId || b.title.toLowerCase().includes(bookId.toLowerCase()));
      if (seedBook) {
        book = seedBook as any;
        chapters = seedBook.chapters;
      } else {
        return NextResponse.json({ error: 'Sacred book not found' }, { status: 404 });
      }
    } else {
      chapters = await Chapter.find({ bookId: book._id }).sort({ chapterNumber: 1 });
    }

    if (!book) {
      return NextResponse.json({ error: 'Sacred book not found' }, { status: 404 });
    }

    // Purchase Verification Check:
    const targetBookId = book._id ? book._id.toString() : bookId;
    const isPurchased =
      user.purchasedBooks &&
      (user.purchasedBooks.some((pId: any) => pId.toString() === targetBookId) ||
        user.purchasedBooks.some((pId: any) => pId.toString() === bookId));

    if (!isPurchased) {
      return NextResponse.json(
        {
          error: 'Forbidden: You do not own a digital license for this scripture.',
          locked: true,
          price: book.price || 299,
        },
        { status: 403 }
      );
    }

    // Find Order ID for watermark stamping
    const order = await Order.findOne({
      userId: user._id,
      bookId: book._id || bookId,
      status: 'paid',
    }).sort({ createdAt: -1 });

    const orderId = order ? order.razorpayOrderId : `LIC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Generate Dynamic Watermarked PDF
    const pdfBytes = await generateWatermarkedPdf({
      userEmail: user.email,
      orderId,
      book,
      chapters,
    });

    const sanitizedTitle = (book.title || 'Sacred_Scripture')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 30);

    const filename = `SacredReads_${sanitizedTitle}_Watermarked_Licensed.pdf`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', pdfBytes.length.toString());

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('PDF watermark generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
