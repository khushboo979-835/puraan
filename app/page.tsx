'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Play,
  Pause,
  Volume2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Star,
  CheckCircle,
  Download,
  ShieldCheck,
  Headphones,
  ArrowRight
} from 'lucide-react';
import { SEED_BOOKS, DAILY_VERSE } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

export default function HomePage() {
  const router = useRouter();
  const { isPurchased } = useAuth();
  const [selectedReligion, setSelectedReligion] = useState<string>('All');
  const [books, setBooks] = useState<any[]>(SEED_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);

  // Daily Verse Audio Preview State
  const [isDailyAudioPlaying, setIsDailyAudioPlaying] = useState(false);
  const [dailyAudioRef, setDailyAudioRef] = useState<HTMLAudioElement | null>(null);

  const faithPortals = [
    { name: 'All', symbol: '✦', title: 'All Wisdom', subtitle: 'Universal Archive' },
    { name: 'Hinduism', symbol: 'ॐ', title: 'Sanatan Dharma', subtitle: 'Vedas & Puranas' },
    { name: 'Islam', symbol: '☪', title: 'Islamic Granth', subtitle: 'Quran & Hadith' },
    { name: 'Christianity', symbol: '✝', title: 'Christian Bible', subtitle: 'Psalms & Gospels' },
    { name: 'Sikhism', symbol: 'ੴ', title: 'Sikh Granth', subtitle: 'Guru Granth Sahib' },
    { name: 'Buddhism', symbol: '☸', title: 'Buddha Vaani', subtitle: 'Dhammapada' },
    { name: 'Jainism', symbol: '卐', title: 'Jain Granth', subtitle: 'Tattvartha Sutra' },
  ];

  useEffect(() => {
    fetchBooks();
  }, [selectedReligion]);

  const fetchBooks = async () => {
    try {
      const url = selectedReligion === 'All' ? '/api/books' : `/api/books?religion=${selectedReligion}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.books && data.books.length > 0) {
          setBooks(data.books);
        }
      }
    } catch (e) {
      console.warn('Fallback to seed array');
    }
  };

  const toggleDailyVerseAudio = () => {
    if (!dailyAudioRef) {
      const audio = new Audio(DAILY_VERSE.audioUrl);
      audio.onended = () => setIsDailyAudioPlaying(false);
      audio.play();
      setDailyAudioRef(audio);
      setIsDailyAudioPlaying(true);
    } else {
      if (isDailyAudioPlaying) {
        dailyAudioRef.pause();
        setIsDailyAudioPlaying(false);
      } else {
        dailyAudioRef.play();
        setIsDailyAudioPlaying(true);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/catalog');
    }
  };

  const filteredBooks =
    selectedReligion === 'All' ? books : books.filter((b) => b.religion === selectedReligion);

  return (
    <div className="min-h-screen text-[#000000]">
      {/* Hero Section with Vibrant Saffron #ea8913 Oval Plaque */}
      <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative hero-oval-frame rounded-[40px] sm:rounded-[55px] p-8 sm:p-14 text-center overflow-hidden">
          {/* Subtle Deep Bronze Stars */}
          <div className="absolute top-8 left-10 text-[#3d1e00] text-xl select-none font-bold">✦</div>
          <div className="absolute top-16 left-24 text-[#592d03] text-sm select-none">✧</div>
          <div className="absolute bottom-12 left-16 text-[#3d1e00] text-base select-none">✦</div>
          <div className="absolute top-8 right-12 text-[#3d1e00] text-xl select-none font-bold">✦</div>
          <div className="absolute top-20 right-24 text-[#592d03] text-sm select-none">✧</div>
          <div className="absolute bottom-10 right-16 text-[#3d1e00] text-base select-none">✦</div>

          {/* Top Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffeaae] border-2 border-[#522700] text-[11px] sm:text-xs font-black tracking-wider text-[#000000] uppercase mb-6 shadow-sm">
            <span>INTERACTIVE DEVOTIONAL READER • 100% DIGITAL EXPERIENCE</span>
          </div>

          {/* Main Headline with Solid Black Typography */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-black text-[#000000] tracking-tight leading-[1.16] max-w-3xl mx-auto mb-4">
            Dharmik Granth Padhne Aur <br className="hidden sm:inline" />
            Sunne Ka <span className="gold-italic-text">Pavitra Sangrah</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-[#1f0f00] font-bold max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            Sabhi dharmo ke mool granth ek hi jagah. Aawaz ke sath real-time line highlighting,
            shuddh ucharan aur secure offline reading.
          </p>

          {/* Pill Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-[#fff6e0] border-2 border-[#421f00] hover:border-black transition-all">
              <Search className="w-4 h-4 text-[#3d1d00] ml-5 mr-3 flex-shrink-0 stroke-[2.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search granth, shloka, aayat, ya vachan... (e.g. Agni Puran, Gita, Quran)"
                className="w-full py-3.5 pr-6 bg-transparent text-xs sm:text-sm text-[#000000] placeholder-[#572b04] focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="mr-2 px-6 py-2.5 rounded-full bg-[#1f0f00] hover:bg-[#381b00] text-[#ffd99e] text-xs font-black shadow-md transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Daily Shloka of Peace Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-14">
        <div className="daily-shloka-card rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-[#000000]">
                  DAILY SHLOKA OF PEACE
                </span>

                <button
                  onClick={toggleDailyVerseAudio}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#fff4db] hover:bg-[#ffebbf] border-2 border-[#522700] text-[11px] font-black text-[#000000] transition shadow-xs"
                >
                  {isDailyAudioPlaying ? (
                    <Pause className="w-3 h-3 fill-[#000000]" />
                  ) : (
                    <Play className="w-3 h-3 fill-[#000000]" />
                  )}
                  <span>Listen (Shuddh Ucharan)</span>
                </button>
              </div>

              <p className="font-heading font-black text-sm sm:text-base text-[#000000] leading-relaxed">
                <strong>Shlok:</strong> {DAILY_VERSE.originalScript}
              </p>

              <p className="text-xs text-[#1f0f00] font-bold leading-relaxed">
                <strong>Meaning:</strong> {DAILY_VERSE.hindiTranslation}
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <Link
                href={`/reader/${DAILY_VERSE.bookSlug}/${DAILY_VERSE.chapterNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-[#1f0f00] hover:bg-[#381b00] border-2 border-[#522700] text-[#ffd99e] text-xs font-black transition shadow-md"
              >
                <Volume2 className="w-4 h-4 text-[#ffd99e]" />
                <span>Listen in Reader Studio</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Faith Portals Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-[#522700]">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#000000]">
              Faith Portals Filter
            </h2>
            <p className="text-xs text-[#241000] font-bold mt-1">
              Select any sacred path to explore its verified critical manuscripts and chapters
            </p>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-black text-[#000000] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All Scripture Archives</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>

        {/* Faith Filter Tabs / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {faithPortals.map((portal) => {
            const isSelected = selectedReligion === portal.name;
            return (
              <button
                key={portal.name}
                onClick={() => setSelectedReligion(portal.name)}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'bg-[#1f0f00] text-[#ffd99e] border-[#000000] shadow-lg scale-[1.03]'
                    : 'bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] border-[#522700] shadow-xs'
                }`}
              >
                <span
                  className={`text-2xl font-heading mb-0.5 ${
                    isSelected ? 'text-[#ffd99e]' : 'text-[#000000]'
                  }`}
                >
                  {portal.symbol}
                </span>
                <span className="font-black text-xs leading-tight">{portal.name}</span>
                <span
                  className={`text-[10px] truncate max-w-full font-bold ${
                    isSelected ? 'text-[#ebd498]' : 'text-[#381b00]'
                  }`}
                >
                  {portal.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Scripture Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredBooks.map((book) => {
            const owned = book._id ? isPurchased(book._id) : false;
            return (
              <div
                key={book.slug}
                className="bg-[#ffdca3] hover:bg-[#ffe7c2] border-2 border-[#522700] hover:border-black rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative bg-[#e0ba63] border-2 border-[#522700]">
                    <img
                      src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#000000] bg-[#ffdca3]/95 backdrop-blur-xs px-2.5 py-1 rounded-md border-2 border-[#522700] shadow-xs">
                        {book.religion}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0f5c24] text-white shadow-xs border border-[#052b0f]">
                        Ch 1 Free
                      </span>
                      {owned && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#1f0f00] text-[#ffd99e] border border-[#522700]">
                          Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <h3 className="font-heading font-black text-lg text-[#000000] group-hover:underline transition-all line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#2b1400] mt-0.5 line-clamp-1 font-bold">
                    {book.author} • {book.language}
                  </p>

                  <p className="text-xs text-[#1a0e02] font-semibold mt-3 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-[#804207] text-xs text-[#000000]">
                    <div className="flex items-center space-x-1 text-[#000000] font-black">
                      <Star className="w-3.5 h-3.5 fill-[#000000]" />
                      <span>{book.rating || 4.9}</span>
                    </div>
                    <span className="font-bold">{book.totalChapters} Chapters</span>
                    <span className="font-black text-[#000000] text-sm">₹{book.price}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 mt-5">
                  <Link
                    href={`/reader/${book.slug}/1`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1f0f00] hover:bg-[#381b00] text-[#ffd99e] font-black text-xs text-center transition flex items-center justify-center space-x-1.5 shadow-sm border border-[#522700]"
                  >
                    <Play className="w-3 h-3 fill-[#ffd99e]" />
                    <span>Free Ch 1 Reader</span>
                  </Link>

                  <Link
                    href={`/book/${book.slug}`}
                    className="p-2.5 rounded-xl bg-[#fff2d1] hover:bg-[#ffeab3] text-[#000000] border-2 border-[#522700] transition font-bold"
                    title="View Book Overview"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unlock Checkout Modal */}
      {selectedBookForUnlock && (
        <UnlockCheckoutModal
          isOpen={!!selectedBookForUnlock}
          onClose={() => setSelectedBookForUnlock(null)}
          book={selectedBookForUnlock}
          onSuccess={() => {
            setSelectedBookForUnlock(null);
            fetchBooks();
          }}
        />
      )}
    </div>
  );
}
