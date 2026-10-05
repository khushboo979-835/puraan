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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`/api/reader/${slug}/${chapterNumber}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

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
            verses: bookFallback?.chapters.find((c) => c.chapterNumber === chapterNumber)?.verses || [],
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
      <div className="min-h-screen bg-[#ea8913] flex items-center justify-center p-4">
        <div className="bg-[#ffdca3] border-3 border-[#522700] rounded-3xl p-8 text-center space-y-4 shadow-2xl max-w-sm w-full text-[#000000]">
          <div className="w-12 h-12 border-4 border-[#000000] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-base font-serif font-black text-[#000000]">ॐ Synchronizing Sacred Audio Studio...</p>
          <p className="text-xs text-[#2b1400] font-bold">Loading timestamped verse recitation and Hindi meaning</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#ea8913] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#ffdca3] border-3 border-[#522700] rounded-3xl p-8 text-center space-y-4 shadow-2xl text-[#000000]">
          <h2 className="text-xl font-serif font-black text-[#000000]">Unable to Load Chapter</h2>
          <p className="text-xs text-[#2b1400] font-bold">{error || 'An unexpected error occurred.'}</p>
          <a
            href={`/book/${slug}`}
            className="inline-block py-2.5 px-6 bg-[#1f0f00] text-[#ffd99e] font-black text-xs rounded-xl border-2 border-[#522700] shadow-lg"
          >
            ← Back to Book
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
