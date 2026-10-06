'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Library,
  BookOpen,
  Download,
  Play,
  CheckCircle,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SEED_BOOKS } from '@/lib/seedData';

interface ShelfItem {
  book: any;
  progress: number;
  lastChapter: number;
  lastSentenceId?: string;
  lastTimestamp?: number;
  updatedAt?: string;
}

export default function MyShelfPage() {
  const { user, isPurchased } = useAuth();
  const [shelfItems, setShelfItems] = useState<ShelfItem[]>([]);
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [allBooks, setAllBooks] = useState<any[]>(SEED_BOOKS);

  useEffect(() => {
    fetchShelf();
  }, [user]);

  const fetchShelf = async () => {
    try {
      const res = await fetch('/api/books');
      let catalog: any[] = SEED_BOOKS;
      if (res.ok) {
        const data = await res.json();
        if (data.books && data.books.length > 0) {
          catalog = data.books;
          setAllBooks(catalog);
        }
      }

      // Filter purchased books
      const purchased = catalog.filter((b: any) => isPurchased(b._id || ''));

      // Check bookmarks
      const bookmarks = user?.bookmarks || [];

      const items: ShelfItem[] = purchased.map((b) => {
        const bm = bookmarks.find((x: any) => x.bookId?.toString() === b._id?.toString());
        const totalChapters = b.totalChapters || 1;
        const currentChapter = bm?.chapterNumber || 1;
        const calcProgress = Math.min(100, Math.round((currentChapter / totalChapters) * 100));

        return {
          book: b,
          progress: calcProgress || 15,
          lastChapter: currentChapter,
          lastSentenceId: bm?.sentenceId,
          lastTimestamp: bm?.audioTimestamp,
          updatedAt: bm?.updatedAt,
        };
      });

      setShelfItems(items);
    } catch (e) {
      console.warn('Shelf load error:', e);
    }
  };

  const handleDownloadPdf = async (bookId: string, title: string) => {
    setDownloadingBookId(bookId);
    try {
      const res = await fetch(`/api/download/${bookId}`);
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to generate licensed watermarked PDF');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GyanDharam_${title.replace(/[^a-zA-Z0-9]/g, '_')}_Watermarked.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e: any) {
      alert('Download error: ' + e.message);
    } finally {
      setDownloadingBookId(null);
    }
  };

  return (
    <div className="min-h-screen text-[#000000] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#784805]">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#faebb8] border-2 border-[#784805] text-[#000000] text-xs font-black mb-2 shadow-xs">
            <Library className="w-3.5 h-3.5 text-[#000000]" />
            <span>Personal Sacred Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-[#000000]">My Sacred Shelf</h1>
          <p className="text-xs sm:text-sm font-bold text-[#2b1802] mt-1">
            Access all your permanently unlocked scriptures, track recitation progress, and download offline DRM watermarked copies.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#faebb8] border-2 border-[#784805] rounded-2xl p-3.5 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-[#000000]" />
          <div className="text-xs">
            <p className="font-black text-[#000000]">License Holder</p>
            <p className="text-[10px] text-[#2b1802] font-mono font-black">{user?.email || 'seeker@sacredreads.org'}</p>
          </div>
        </div>
      </div>

      {shelfItems.length === 0 ? (
        <div className="bg-[#faebb8] border-3 border-[#784805] rounded-3xl p-12 text-center space-y-6 max-w-2xl mx-auto shadow-md">
          <div className="w-16 h-16 rounded-full bg-[#fff4d1] border-2 border-[#784805] flex items-center justify-center mx-auto text-[#000000]">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-heading font-black text-[#000000]">Your Shelf is Currently Empty</h3>
            <p className="text-xs text-[#2b1802] font-bold max-w-md mx-auto">
              You have not unlocked any scriptures yet. Chapter 1 of every book is 100% free to explore, or you can purchase full digital access to unlock lifetime audio recitation and watermarked PDFs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#1a0e02] hover:bg-[#331c04] text-[#ffdc82] font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md border-2 border-[#784805]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Sacred Catalog</span>
            </Link>

            <Link
              href="/reader/agni-puran/1"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#fff4d1] hover:bg-[#ffeab0] text-[#000000] font-black text-xs rounded-xl border-2 border-[#784805] transition"
            >
              Try Agni Puran Chapter 1 Free
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelfItems.map((item) => {
            const { book, progress, lastChapter, lastSentenceId } = item;
            const isDownloading = downloadingBookId === book._id;

            return (
              <div
                key={book.slug}
                className="bg-[#faebb8] border-3 border-[#784805] hover:border-black rounded-3xl p-6 shadow-md hover:shadow-2xl flex flex-col justify-between space-y-5 transition group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 rounded-xl overflow-hidden bg-[#e0ba63] border-2 border-[#784805] flex-shrink-0 shadow-xs">
                      <img
                        src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#000000] bg-[#fff4d1] px-2 py-0.5 rounded border border-[#784805]">
                        {book.religion}
                      </span>
                      <h3 className="font-heading font-black text-base text-[#000000] line-clamp-1 group-hover:underline transition">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#2b1802] font-bold line-clamp-1">{book.author}</p>
                      <p className="text-[11px] text-emerald-950 font-black flex items-center gap-1 pt-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-800" /> Lifetime License
                      </p>
                    </div>
                  </div>

                  {/* Reading Progress Bar */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex justify-between text-xs text-[#000000] font-black">
                      <span>Reading Progress</span>
                      <span className="font-mono text-[#000000]">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#d6a542] rounded-full overflow-hidden border border-[#784805]">
                      <div
                        className="h-full bg-[#1a0e02] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#2b1802] font-bold">
                      Last recited Chapter {lastChapter}
                      {lastSentenceId ? ` • Verse ${lastSentenceId}` : ''}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-3 border-t-2 border-[#784805]">
                  <Link
                    href={`/reader/${book.slug}/${lastChapter}`}
                    className="w-full py-2.5 px-4 bg-[#1a0e02] hover:bg-[#331c04] text-[#ffdc82] font-black text-xs rounded-xl flex items-center justify-center space-x-2 transition shadow-xs border border-[#784805]"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#ffdc82]" />
                    <span>Resume Interactive Reading</span>
                  </Link>

                  <button
                    onClick={() => handleDownloadPdf(book._id, book.title)}
                    disabled={isDownloading}
                    className="w-full py-2 px-4 bg-[#fff4d1] hover:bg-[#ffeab0] text-[#000000] border-2 border-[#784805] text-xs font-black rounded-xl flex items-center justify-center space-x-2 transition disabled:opacity-60 shadow-xs"
                  >
                    <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce text-[#000000]' : ''}`} />
                    <span>{isDownloading ? 'Stamping Watermark...' : 'Download Watermarked PDF'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
