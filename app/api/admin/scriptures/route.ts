import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter } from '@/models';
import { SEED_BOOKS, SeedBook } from '@/lib/seedData';

// Mutable in-memory store fallback for development / offline DB
let inMemoryBooks: SeedBook[] = JSON.parse(JSON.stringify(SEED_BOOKS));

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const religion = searchParams.get('religion');
    const search = searchParams.get('search');
    const slug = searchParams.get('slug');

    let dbConnected = false;
    let booksData: any[] = [];

    try {
      await connectToDatabase();
      dbConnected = true;

      const query: any = {};
      if (religion && religion !== 'all') {
        query.religion = new RegExp(`^${religion}$`, 'i');
      }
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (slug) {
        query.slug = slug;
      }

      const books = await Book.find(query).sort({ title: 1 }).lean();
      if (books.length > 0) {
        // Fetch chapters for these books
        const bookIds = books.map((b) => b._id);
        const chapters = await Chapter.find({ bookId: { $in: bookIds } }).sort({ chapterNumber: 1 }).lean();

        booksData = books.map((book) => {
          const bookChapters = chapters.filter((c) => c.bookId.toString() === book._id.toString());
          return {
            ...book,
            chapters: bookChapters.length > 0 ? bookChapters : (SEED_BOOKS.find((sb) => sb.slug === book.slug)?.chapters || []),
          };
        });
      }
    } catch (e) {
      console.warn('DB offline or empty, using in-memory scripture store');
    }

    if (!dbConnected || booksData.length === 0) {
      let filtered = [...inMemoryBooks];
      if (religion && religion !== 'all') {
        filtered = filtered.filter((b) => b.religion.toLowerCase() === religion.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((b) => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s));
      }
      if (slug) {
        filtered = filtered.filter((b) => b.slug === slug);
      }
      return NextResponse.json({ success: true, scriptures: filtered, source: 'seed' });
    }

    return NextResponse.json({ success: true, scriptures: booksData, source: 'database' });
  } catch (error: any) {
    console.error('Fetch scriptures error:', error);
    return NextResponse.json({ error: error.message || 'Error fetching scriptures' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, bookSlug, chapterData, bookData } = body;

    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
    } catch (e) {}

    // Case 1: Add Chapter
    if (action === 'add_chapter' || chapterData) {
      const targetSlug = bookSlug || chapterData?.bookSlug;
      const targetChapterNumber = Number(chapterData?.chapterNumber) || 1;
      const targetTitle = chapterData?.title || `Adhyay / Chapter ${targetChapterNumber}`;
      const targetAudioUrl = chapterData?.audioUrl || 'https://gyandharam.com/audio/sample-vedic-chant.mp3';
      const targetSummary = chapterData?.summary || 'Sacred verse recitation and Vedic commentary.';
      const verses = chapterData?.verses || [
        {
          sentenceId: 'verse-1',
          originalScript: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
          hindiTranslation: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अन्तःकरण में धारण करें।',
          englishTranslation: 'We meditate upon the auspicious glory of the Divine Supreme Being who illumines our intellect.',
          startTime: 0,
          endTime: 25,
        },
      ];

      if (dbConnected) {
        const book = await Book.findOne({ slug: targetSlug });
        if (book) {
          await Chapter.create({
            bookId: book._id,
            chapterNumber: targetChapterNumber,
            title: targetTitle,
            audioUrl: targetAudioUrl,
            summary: targetSummary,
            verses,
          });
          book.totalChapters = Math.max(book.totalChapters, targetChapterNumber);
          await book.save();
        }
      }

      // Update in-memory
      const targetBook = inMemoryBooks.find((b) => b.slug === targetSlug);
      if (targetBook) {
        const existingChapIdx = targetBook.chapters.findIndex((c) => c.chapterNumber === targetChapterNumber);
        const newChap = {
          chapterNumber: targetChapterNumber,
          title: targetTitle,
          audioUrl: targetAudioUrl,
          summary: targetSummary,
          verses,
        };
        if (existingChapIdx >= 0) {
          targetBook.chapters[existingChapIdx] = newChap;
        } else {
          targetBook.chapters.push(newChap);
          targetBook.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
          targetBook.totalChapters = targetBook.chapters.length;
        }
      }

      return NextResponse.json({ success: true, message: 'Chapter created and indexed successfully' });
    }

    // Case 2: Create new Granth / Book
    if (action === 'create_book' || bookData) {
      const data = bookData || body;
      const slug =
        data.slug ||
        data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

      if (dbConnected) {
        await Book.findOneAndUpdate(
          { slug },
          {
            title: data.title,
            slug,
            religion: data.religion || 'Hinduism',
            language: data.language || 'Sanskrit & Hindi',
            author: data.author || 'Ancient Sage',
            description: data.description || 'Sacred scripture',
            synopsis: data.synopsis || data.description,
            coverImageUrl: data.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800',
            price: Number(data.price) || 49,
            totalChapters: Number(data.totalChapters) || 1,
            masterPdfKey: `master-${slug}.pdf`,
            audioPreviewUrl: data.audioPreviewUrl || '',
          },
          { upsert: true, new: true }
        );
      }

      const newSeedBook: SeedBook = {
        title: data.title,
        slug,
        religion: data.religion || 'Hinduism',
        language: data.language || 'Sanskrit & Hindi',
        author: data.author || 'Ancient Sage',
        description: data.description || 'Sacred scripture',
        synopsis: data.synopsis || data.description,
        coverImageUrl: data.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800',
        price: Number(data.price) || 49,
        totalChapters: Number(data.totalChapters) || 1,
        masterPdfKey: `master-${slug}.pdf`,
        rating: 4.9,
        versesCount: 100,
        featured: Boolean(data.featured),
        authenticitySource: data.authenticitySource || 'Sacred Archive',
        audioPreviewUrl: data.audioPreviewUrl || '',
        chapters: [
          {
            chapterNumber: 1,
            title: 'Adhyay 1: Prarambhik Path (प्रारम्भिक पाठ)',
            audioUrl: 'https://gyandharam.com/audio/sample-vedic-chant.mp3',
            summary: 'Introductory sacred verses.',
            verses: [
              {
                sentenceId: 'v1',
                originalScript: 'ॐ श्री परमात्मने नमः',
                hindiTranslation: 'परमपिता परमात्मा को नमस्कार है।',
                englishTranslation: 'Salutations to the Supreme Divine Self.',
                startTime: 0,
                endTime: 10,
              },
            ],
          },
        ],
      };

      inMemoryBooks.unshift(newSeedBook);
      return NextResponse.json({ success: true, message: 'Scripture Granth published successfully', slug });
    }

    return NextResponse.json({ error: 'Unrecognized scripture action' }, { status: 400 });
  } catch (error: any) {
    console.error('Create scripture error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save scripture' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, price, audioPreviewUrl, featured, totalChapters, title, description } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Book slug is required' }, { status: 400 });
    }

    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
      const updateFields: any = {};
      if (price !== undefined) updateFields.price = Number(price);
      if (audioPreviewUrl !== undefined) updateFields.audioPreviewUrl = audioPreviewUrl;
      if (featured !== undefined) updateFields.featured = Boolean(featured);
      if (totalChapters !== undefined) updateFields.totalChapters = Number(totalChapters);
      if (title !== undefined) updateFields.title = title;
      if (description !== undefined) updateFields.description = description;

      await Book.findOneAndUpdate({ slug }, updateFields);
    } catch (e) {}

    // Update in-memory
    const book = inMemoryBooks.find((b) => b.slug === slug);
    if (book) {
      if (price !== undefined) book.price = Number(price);
      if (audioPreviewUrl !== undefined) book.audioPreviewUrl = audioPreviewUrl;
      if (featured !== undefined) book.featured = Boolean(featured);
      if (totalChapters !== undefined) book.totalChapters = Number(totalChapters);
      if (title !== undefined) book.title = title;
      if (description !== undefined) book.description = description;
    }

    return NextResponse.json({ success: true, message: 'Scripture metadata updated successfully' });
  } catch (error: any) {
    console.error('Update scripture error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update scripture' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const chapterNumber = searchParams.get('chapterNumber');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    let dbConnected = false;
    try {
      await connectToDatabase();
      dbConnected = true;
    } catch (e) {}

    if (chapterNumber) {
      const chapNum = Number(chapterNumber);
      if (dbConnected) {
        const book = await Book.findOne({ slug });
        if (book) {
          await Chapter.deleteOne({ bookId: book._id, chapterNumber: chapNum });
        }
      }
      const b = inMemoryBooks.find((item) => item.slug === slug);
      if (b) {
        b.chapters = b.chapters.filter((c) => c.chapterNumber !== chapNum);
      }
      return NextResponse.json({ success: true, message: `Chapter ${chapNum} deleted successfully` });
    } else {
      if (dbConnected) {
        const book = await Book.findOne({ slug });
        if (book) {
          await Chapter.deleteMany({ bookId: book._id });
          await Book.deleteOne({ _id: book._id });
        }
      }
      inMemoryBooks = inMemoryBooks.filter((item) => item.slug !== slug);
      return NextResponse.json({ success: true, message: `Scripture ${slug} deleted successfully` });
    }
  } catch (error: any) {
    console.error('Delete scripture error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 });
  }
}
