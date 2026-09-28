import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';
import { SEED_BOOKS } from '@/lib/seedData';
import { ensureSeeded } from '@/lib/dataService';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string; chapterNumber: string } }
) {
  try {
    const slug = params.slug;
    const chapterNumber = parseInt(params.chapterNumber, 10);

    if (isNaN(chapterNumber) || chapterNumber < 1) {
      return NextResponse.json({ error: 'Invalid chapter number' }, { status: 400 });
    }

    await ensureSeeded();
    await connectToDatabase();

    let book: any = await Book.findOne({ slug }).lean();
    let chapter: any = null;

    if (book) {
      chapter = await Chapter.findOne({ bookId: book._id, chapterNumber }).lean();
    } else {
      // Fallback from SEED_BOOKS
      const fallbackBook = SEED_BOOKS.find((b) => b.slug === slug);
      if (fallbackBook) {
        book = { _id: '64f1a2b3c4d5e6f7a8b9c000' as any, ...fallbackBook };
        chapter = fallbackBook.chapters.find((c) => c.chapterNumber === chapterNumber);
      }
    }

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // DRM Access Control Rule:
    // If chapterNumber == 1, return content publicly without restrictions.
    // If chapterNumber > 1, check authentication and purchase ownership.
    if (chapterNumber > 1) {
      const user = await getCurrentUser(req);
      const isPurchased =
        user &&
        user.purchasedBooks &&
        user.purchasedBooks.some((pId: any) => pId.toString() === book._id.toString());

      if (!isPurchased) {
        return NextResponse.json(
          {
            error: 'Access Forbidden: Chapter Locked',
            locked: true,
            price: book.price,
            bookId: book._id,
            bookTitle: book.title,
            slug: book.slug,
            chapterNumber,
            message: `Chapter ${chapterNumber} is locked behind digital access. Unlock the full sacred scripture for ₹${book.price}.`,
          },
          { status: 403 }
        );
      }
    }

    if (!chapter) {
      return NextResponse.json({ error: `Chapter ${chapterNumber} not found` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      locked: false,
      book: {
        _id: book._id,
        title: book.title,
        slug: book.slug,
        religion: book.religion,
        author: book.author,
        language: book.language,
        totalChapters: book.totalChapters,
        price: book.price,
        coverImageUrl: book.coverImageUrl,
      },
      chapter: {
        _id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        audioUrl: chapter.audioUrl,
        summary: chapter.summary,
        verses: chapter.verses,
      },
    });
  } catch (error: any) {
    console.error('Reader DRM fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
