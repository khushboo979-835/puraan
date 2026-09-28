import { connectToDatabase } from './db';
import { Book, Chapter, User, IBook, IChapter, IUser } from '@/models';
import { SEED_BOOKS } from './seedData';
import mongoose from 'mongoose';

// Check if database is empty, auto-seed if needed
export async function ensureSeeded() {
  try {
    await connectToDatabase();
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log('🔄 Database is empty, auto-seeding initial scriptures...');
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
      }
      console.log('✅ Auto-seed completed successfully.');
    }
  } catch (err) {
    console.warn('MongoDB connection not available, operating in resilient memory mode:', err);
  }
}

export async function getAllBooks(filter?: { religion?: string; language?: string; search?: string }) {
  try {
    await ensureSeeded();
    const query: any = {};
    if (filter?.religion && filter.religion !== 'All') {
      query.religion = filter.religion;
    }
    if (filter?.language && filter.language !== 'All') {
      query.language = new RegExp(filter.language, 'i');
    }
    if (filter?.search) {
      query.$or = [
        { title: new RegExp(filter.search, 'i') },
        { author: new RegExp(filter.search, 'i') },
        { description: new RegExp(filter.search, 'i') },
      ];
    }
    const books = await Book.find(query).sort({ featured: -1, createdAt: -1 }).lean();
    return books;
  } catch (e) {
    // Fallback in-memory filter
    let results = SEED_BOOKS.map((b, idx) => ({
      _id: new mongoose.Types.ObjectId(`64f1a2b3c4d5e6f7a8b9c00${idx}`),
      ...b,
    }));
    if (filter?.religion && filter.religion !== 'All') {
      results = results.filter((b) => b.religion === filter.religion);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    return results;
  }
}

export async function getBookBySlug(slug: string) {
  try {
    await ensureSeeded();
    const book = await Book.findOne({ slug }).lean();
    if (book) {
      const chapters = await Chapter.find({ bookId: book._id }).select('chapterNumber title summary verses').lean();
      return {
        ...book,
        chapters: chapters.map((c) => ({
          chapterNumber: c.chapterNumber,
          title: c.title,
          summary: c.summary,
          versesCount: c.verses?.length || 0,
          isFree: c.chapterNumber === 1,
        })),
      };
    }
  } catch (e) {
    // Fallback
  }

  const fallback = SEED_BOOKS.find((b) => b.slug === slug);
  if (!fallback) return null;
  return {
    _id: new mongoose.Types.ObjectId('64f1a2b3c4d5e6f7a8b9c000'),
    ...fallback,
    chapters: fallback.chapters.map((c) => ({
      chapterNumber: c.chapterNumber,
      title: c.title,
      summary: c.summary,
      versesCount: c.verses.length,
      isFree: c.chapterNumber === 1,
    })),
  };
}
