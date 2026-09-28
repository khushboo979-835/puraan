import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter, User } from '@/models';
import { SEED_BOOKS } from '@/lib/seedData';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    await Book.deleteMany({});
    await Chapter.deleteMany({});

    let defaultUser = await User.findOne({ email: 'seeker@sacredreads.org' });
    if (!defaultUser) {
      defaultUser = await User.create({
        name: 'Devout Seeker',
        email: 'seeker@sacredreads.org',
        purchasedBooks: [],
        bookmarks: [],
        role: 'user',
      });
    }

    const seeded = [];
    for (const bookData of SEED_BOOKS) {
      const { chapters, ...bookFields } = bookData;
      const createdBook = await Book.create(bookFields);
      for (const ch of chapters) {
        await Chapter.create({
          bookId: createdBook._id,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          audioUrl: ch.audioUrl,
          summary: ch.summary,
          verses: ch.verses,
        });
      }
      seeded.push(createdBook.title);
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Agni Puran and 6 religions!',
      seededBooks: seeded,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
