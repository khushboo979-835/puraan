'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import InteractiveReader from '@/components/InteractiveReader';
import { SEED_BOOKS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';

export default function ReaderPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const chapterNumber = parseInt((params?.chapterNumber as string) || '1', 10);
  const { isPurchased } = useAuth();

  const [data, setData] = useState<{
    book: any;
    chapter: any;
    locked?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug && chapterNumber) {
      loadChapterData();
    }
  }, [slug, chapterNumber]);

  const loadChapterData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/reader/${slug}/${chapterNumber}`);

      if (res.status === 403) {
        const forbiddenData = await res.json();
        // Chapter is locked behind purchase
        const bookFallback = SEED_BOOKS.find((b) => b.slug === slug);
        setData({
          book: {
            _id: forbiddenData.bookId || '64f1a2b3c4d5e6f7a8b9c000',
            title: forbiddenData.bookTitle || bookFallback?.title || 'Sacred Scripture',
            slug: slug,
            religion: bookFallback?.religion || 'Sacred Scripture',
            author: bookFallback?.author || 'Ancient Sage',
            language: bookFallback?.language || 'Sanskrit & Hindi',
            totalChapters: bookFallback?.totalChapters || 1,
            price: forbiddenData.price || bookFallback?.price || 299,
            coverImageUrl: bookFallback?.coverImageUrl,
          },
          chapter: {
            chapterNumber,
            title: `Chapter ${chapterNumber}`,
            audioUrl: '',
            verses: [],
          },
          locked: true,
        });
        setLoading(false);
        return;
      }

      if (res.ok) {
        const payload = await res.json();
        setData({
          book: payload.book,
          chapter: payload.chapter,
          locked: payload.locked || false,
        });
      } else {
        throw new Error('Failed to load chapter');
      }
    } catch (e: any) {
      // Resilient fallback from seed data
      const seedBook = SEED_BOOKS.find((b) => b.slug === slug);
      if (seedBook) {
        const seedChapter = seedBook.chapters.find((c) => c.chapterNumber === chapterNumber);
        const isLocked = chapterNumber > 1 && !isPurchased('64f1a2b3c4d5e6f7a8b9c000');

        if (seedChapter) {
          setData({
            book: {
              _id: '64f1a2b3c4d5e6f7a8b9c000',
              ...seedBook,
            },
            chapter: seedChapter,
            locked: isLocked,
          });
        } else {
          setError(`Chapter ${chapterNumber} not found in this scripture.`);
        }
      } else {
        setError('Scripture not found.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1017] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-serif text-amber-300">Synchronizing Sacred Audio Studio...</p>
          <p className="text-xs text-stone-500">Loading timestamped verse mappings</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0e1017] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#131620] border border-stone-800 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-xl font-serif font-bold text-stone-200">Unable to Load Chapter</h2>
          <p className="text-xs text-stone-400">{error || 'An unexpected error occurred.'}</p>
          <a
            href={`/book/${slug}`}
            className="inline-block py-2.5 px-5 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl"
          >
            Back to Book
          </a>
        </div>
      </div>
    );
  }

  // Load saved local bookmark if available
  let savedBookmark = undefined;
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(`sacred_progress_${slug}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.chapterNumber === chapterNumber) {
          savedBookmark = parsed;
        }
      } catch (e) {}
    }
  }

  return (
    <InteractiveReader
      slug={slug}
      chapterNumber={chapterNumber}
      book={data.book}
      chapter={data.chapter}
      locked={data.locked}
      initialBookmark={savedBookmark}
    />
  );
}
