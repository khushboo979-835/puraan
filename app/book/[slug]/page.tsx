'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Play,
  Pause,
  Lock,
  Download,
  Star,
  BookOpen,
  Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';
import { SEED_BOOKS } from '@/lib/seedData';

export default function BookDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isPurchased } = useAuth();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBookDetails();
    }
  }, [slug]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/books/${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data.book) {
          setBook(data.book);
          return;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to seed book');
    }

    const found = SEED_BOOKS.find((b) => b.slug === slug);
    if (found) {
      setBook({
        _id: '64f1a2b3c4d5e6f7a8b9c000',
        ...found,
        chapters: found.chapters.map((c) => ({
          chapterNumber: c.chapterNumber,
          title: c.title,
          summary: c.summary,
          versesCount: c.verses.length,
          isFree: c.chapterNumber === 1,
        })),
      });
    }
    setLoading(false);
  };

  const togglePreviewAudio = () => {
    const audioUrl =
      book?.audioPreviewUrl ||
      book?.chapters?.[0]?.audioUrl ||
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

    if (!previewAudio) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlayingPreview(false);
      audio.play();
      setPreviewAudio(audio);
      setIsPlayingPreview(true);
    } else {
      if (isPlayingPreview) {
        previewAudio.pause();
        setIsPlayingPreview(false);
      } else {
        previewAudio.play();
        setIsPlayingPreview(true);
      }
    }
  };

  if (loading && !book) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#000000] font-black font-serif">Opening Sacred Archives...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-heading font-black text-[#000000]">Sacred Manuscript Not Found</h2>
        <p className="text-xs text-[#2b1802] font-bold mt-2">The requested scripture could not be found in our archives.</p>
        <Link href="/catalog" className="mt-4 px-4 py-2 bg-[#1a0e02] text-[#ffdc82] font-black rounded-xl text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFreeBook = (book.price || 0) === 0 || book.slug === 'durga-saptashati';
  const owned = (book._id ? isPurchased(book._id) : false) || isFreeBook;

  return (
    <div className="min-h-screen text-[#000000] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Book Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#faebb8] border-3 border-[#784805] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Cover Column */}
        <div className="lg:col-span-4 w-full">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden relative shadow-md border-2 border-[#784805] bg-[#e0ba63]">
            <img
              src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="text-xs uppercase font-black tracking-widest text-[#000000] bg-[#faebb8]/95 backdrop-blur-xs px-3 py-1 rounded-xl border-2 border-[#784805] shadow-xs">
                {book.religion}
              </span>
            </div>
            {isFreeBook && (
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-xs uppercase font-black tracking-wider text-white bg-gradient-to-r from-amber-700 via-orange-700 to-amber-700 px-3 py-1.5 rounded-xl border border-amber-300 shadow-lg block">
                  🪔 दीपोत्सव व छठ महापर्व विशेष: 100% Free
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#fff4d1] text-[#000000] text-xs font-black border-2 border-[#784805]">
              Critical Manuscript Edition
            </span>
            {isFreeBook ? (
              <>
                <span className="px-3 py-1 rounded-full bg-amber-700 text-amber-100 text-xs font-black border-2 border-amber-950 animate-pulse">
                  🪔 100% Free Complete Access (13 Chapters)
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black border-2 border-amber-700">
                  गीता प्रेस गोरखपुर कोड 118
                </span>
              </>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black border-2 border-emerald-700">
                Chapter 1 100% Free
              </span>
            )}
            {owned && !isFreeBook && (
              <span className="px-3 py-1 rounded-full bg-[#1a0e02] text-[#ffdc82] text-xs font-black border border-[#784805]">
                ✓ Full Access Unlocked
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-[#000000] leading-tight">
            {book.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#2b1802]">
            <span><strong>Author / Sage:</strong> {book.author}</span>
            <span>•</span>
            <span><strong>Language:</strong> {book.language}</span>
            <span>•</span>
            <span><strong>Total Chapters:</strong> {book.totalChapters}</span>
            <span>•</span>
            <div className="flex items-center text-[#000000]">
              <Star className="w-3.5 h-3.5 fill-[#000000] mr-1" />
              <span className="font-black">{book.rating || 4.9} / 5.0</span>
            </div>
          </div>

          <p className="text-[#1a0e02] text-sm sm:text-base font-semibold leading-relaxed font-sans">
            {book.description}
          </p>

          {/* Quick Audio Preview Bar */}
          <div className="p-4 bg-[#fff6db] rounded-2xl border-2 border-[#784805] flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePreviewAudio}
                className="w-10 h-10 rounded-full bg-[#1a0e02] text-[#ffdc82] flex items-center justify-center font-black shadow-md border border-[#784805] transition"
              >
                {isPlayingPreview ? <Pause className="w-4 h-4 fill-[#ffdc82]" /> : <Play className="w-4 h-4 fill-[#ffdc82] ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-black text-[#000000]">
                  {isFreeBook ? 'Devotional Chandi Recitation (Free Audio)' : 'Free Audio Preview (Chapter 1)'}
                </p>
                <p className="text-[10px] text-[#2b1802] font-bold">Experience serene acoustic shloka recitation with Tanpura drone</p>
              </div>
            </div>

            <span className="text-[11px] font-black text-[#000000] bg-[#faebb8] px-3 py-1 rounded-lg border-2 border-[#784805]">
              {isPlayingPreview ? 'Reciting Preview' : 'Click to Play'}
            </span>
          </div>

          {/* Pricing & Unlock Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center gap-3">
            {/* Primary Reading Link */}
            <Link
              href={`/reader/${book.slug}/1`}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1a0e02] via-[#351a02] to-[#1a0e02] hover:bg-[#381e04] text-[#ffdc82] font-black text-sm text-center shadow-lg border-2 border-[#784805] transition flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-[#ffdc82]" />
              <span>
                {isFreeBook
                  ? '🔱 Start Free Path (सभी 13 अध्याय निःशुल्क पढ़ें)'
                  : 'Read Scripture (Audio Synced)'}
              </span>
            </Link>

            {/* Direct Book PDF Download Button */}
            <a
              href={`/api/download/${book._id || book.slug}`}
              download
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#1a0e02] hover:bg-[#351a02] text-[#ffdc82] font-black text-sm text-center shadow-lg border-2 border-[#784805] transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download PDF (पुस्तक डाउनलोड)</span>
            </a>

            {/* Authentic Geeta Press Original PDF (Only for verified Durga Saptashati) */}
            {(book.slug === 'durga-saptashati' || (book.originalPdfUrl && (book.slug === 'durga-saptashati' || book.originalPdfUrl.includes('durga-saptashati')))) && (
              <a
                href={book.originalPdfUrl || 'https://archive.org/download/durga-saptashati-geetapress/Durga_Saptashati.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                download="Durga_Saptashati_GeetaPress.pdf"
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-black text-sm text-center shadow-md transition flex items-center justify-center space-x-2 border border-rose-400 cursor-pointer"
                title="मूल गीता प्रेस प्रामाणिक PDF डाउनलोड करें"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>मूल गीता प्रेस PDF ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Authenticity Provenance Section */}
      <section className="bg-[#faebb8] border-3 border-[#784805] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-[#000000]">
          <Award className="w-5 h-5" />
          <h3 className="font-heading font-black text-lg text-[#000000]">Authenticity & Manuscript Provenance</h3>
        </div>
        <p className="text-xs sm:text-sm text-[#1a0e02] font-bold leading-relaxed">
          {book.authenticitySource ||
            'Preserved from certified critical manuscript archives with verified verse integrity and exact phonetics for accurate devotional recitation.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-[#784805] text-xs">
          <div className="p-3.5 bg-[#fff6db] rounded-xl border-2 border-[#784805]">
            <span className="font-black text-[#000000]">Zero Scanned Lag:</span>
            <p className="text-[#2b1802] font-bold mt-1">Split chapter-by-chapter into fast JSON feeds.</p>
          </div>
          <div className="p-3.5 bg-[#fff6db] rounded-xl border-2 border-[#784805]">
            <span className="font-black text-[#000000]">Karaoke Synchronization:</span>
            <p className="text-[#2b1802] font-bold mt-1">Pre-calculated sentence audio timestamps.</p>
          </div>
          <div className="p-3.5 bg-[#fff6db] rounded-xl border-2 border-[#784805]">
            <span className="font-black text-[#000000]">DRM Security:</span>
            <p className="text-[#2b1802] font-bold mt-1">Dynamic watermarked PDF stamps licensed to you.</p>
          </div>
        </div>
      </section>

      {/* Chapter Index */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-heading font-black text-[#000000]">Chapter Index</h3>
          <span className="text-xs font-black text-[#000000]">
            {book.chapters?.length || 1} Chapters Available
          </span>
        </div>

        <div className="space-y-3">
          {book.chapters?.map((ch: any) => {
            const isChapterFree = ch.chapterNumber === 1 || isFreeBook;
            const canAccess = isChapterFree || owned;

            return (
              <div
                key={ch.chapterNumber}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  canAccess
                    ? 'bg-[#faebb8] hover:bg-[#fff2cc] border-[#784805] shadow-sm'
                    : 'bg-[#e0be70] border-[#8a601c] opacity-85'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading font-black text-[#000000] text-xs">
                      Chapter {ch.chapterNumber}
                    </span>
                    {isFreeBook ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-700 text-white border border-amber-950">
                        🪔 100% Free Festive Access (दीपावली व छठ महापर्व)
                      </span>
                    ) : isChapterFree ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-700">
                        100% Free Audio & Text
                      </span>
                    ) : owned ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#1a0e02] text-[#ffdc82] border border-[#784805]">
                        Unlocked
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#eed599] text-[#000000] border-2 border-[#784805] flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Locked (₹{book.price})
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-black text-[#000000] text-sm sm:text-base">
                    {ch.title}
                  </h4>
                  {ch.summary && <p className="text-xs text-[#2b1802] font-bold line-clamp-1">{ch.summary}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                  {canAccess ? (
                    <Link
                      href={`/reader/${book.slug}/${ch.chapterNumber}`}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#1a0e02] hover:bg-[#331c04] text-[#ffdc82] font-black text-xs flex items-center justify-center space-x-1.5 transition shadow-xs border border-[#784805]"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#ffdc82]" />
                      <span>{isFreeBook ? 'Read Free Adhyay' : isChapterFree ? 'Read Free Chapter 1' : 'Launch Reader'}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setUnlockModalOpen(true)}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#fff4d1] hover:bg-[#ffeab0] text-[#000000] border-2 border-[#784805] text-xs font-black flex items-center justify-center space-x-1.5 transition"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#000000]" />
                      <span>Unlock to Read</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unlock Checkout Modal */}
      <UnlockCheckoutModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        book={book}
        onSuccess={() => {
          setUnlockModalOpen(false);
          fetchBookDetails();
        }}
      />
    </div>
  );
}
