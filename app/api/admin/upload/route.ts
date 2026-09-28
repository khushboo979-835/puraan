import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Chapter } from '@/models';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      title,
      slug,
      religion,
      language,
      author,
      description,
      synopsis,
      coverImageUrl,
      price,
      totalChapters,
      chapterNumber,
      chapterTitle,
      audioUrl,
      verses,
    } = body;

    if (!title || !religion) {
      return NextResponse.json({ error: 'Title and religion are required' }, { status: 400 });
    }

    const calculatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    let book = await Book.findOne({ slug: calculatedSlug });

    if (!book) {
      book = await Book.create({
        title,
        slug: calculatedSlug,
        religion,
        language: language || 'Sanskrit & Hindi',
        author: author || 'Ancient Sage',
        description: description || `Sacred scripture of ${religion}`,
        synopsis: synopsis || description,
        coverImageUrl:
          coverImageUrl ||
          'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop',
        price: Number(price) || 299,
        totalChapters: Number(totalChapters) || 1,
        masterPdfKey: `master-${calculatedSlug}.pdf`,
      });
    }

    if (chapterNumber && chapterTitle) {
      const parsedVerses = Array.isArray(verses)
        ? verses
        : typeof verses === 'string'
        ? JSON.parse(verses)
        : [];

      let chapter = await Chapter.findOne({ bookId: book._id, chapterNumber: Number(chapterNumber) });
      if (chapter) {
        chapter.title = chapterTitle;
        chapter.audioUrl = audioUrl || chapter.audioUrl;
        chapter.verses = parsedVerses;
        await chapter.save();
      } else {
        chapter = await Chapter.create({
          bookId: book._id,
          chapterNumber: Number(chapterNumber),
          title: chapterTitle,
          audioUrl: audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
          summary: `Chapter ${chapterNumber} of ${book.title}`,
          verses: parsedVerses,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Book and chapter successfully ingested into sacred catalog!',
      book,
    });
  } catch (error: any) {
    console.error('Admin upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
