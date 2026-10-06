'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Play,
  Pause,
  Volume2,
  Mic,
  Sparkles,
  Headphones,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Radio,
  Flame,
  Star
} from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import GlobalAudioPlayer, { GlobalAudioTrack } from '@/components/GlobalAudioPlayer';
import CommandPaletteModal from '@/components/CommandPaletteModal';
import AudioStudioDrawer from '@/components/AudioStudioDrawer';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

interface FaithPortalInfo {
  id: string;
  name: string;
  symbol: string;
  count: string;
  desc: string;
}

const FAITH_PORTALS: FaithPortalInfo[] = [
  { id: 'All', name: 'All Wisdom', symbol: '✦', count: '6 Faiths', desc: 'Universal Archive' },
  { id: 'Hinduism', name: 'Sanatan Dharma', symbol: 'ॐ', count: '18 Puranas & Gita', desc: 'Vedas, Puranas & Gita' },
  { id: 'Islam', name: 'Islamic Granth', symbol: '☪', count: '114 Surahs', desc: 'Quran & Hadith' },
  { id: 'Christianity', name: 'Christian Bible', symbol: '✝', count: '66 Books (KJV)', desc: 'Psalms & Gospels' },
  { id: 'Sikhism', name: 'Sikh Granth', symbol: 'ੴ', count: '1,430 Angs', desc: 'Guru Granth Sahib' },
  { id: 'Buddhism', name: 'Buddha Vaani', symbol: '☸', count: '423 Verses', desc: 'Dhammapada & Suttas' },
  { id: 'Jainism', name: 'Jain Darshan', symbol: '卐', count: '357 Sutras', desc: 'Tattvartha Sutra' },
];

export default function HomePage() {
  const router = useRouter();
  const { isPurchased } = useAuth();

  // State
  const [selectedReligion, setSelectedReligion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTrack, setActiveTrack] = useState<GlobalAudioTrack | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [audioStudioOpen, setAudioStudioOpen] = useState(false);
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setCommandPaletteOpen(true);
    }
  };

  const handlePlayCardAudio = (book: any) => {
    setActiveTrack({
      title: book.title,
      subtitle: `${book.religion} • Chapter 1 Recitation`,
      slug: book.slug,
      chapterNumber: 1,
      audioUrl: book.audioPreviewUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    });
  };

  const filteredBooks =
    selectedReligion === 'All'
      ? SEED_BOOKS
      : SEED_BOOKS.filter((b) => b.religion === selectedReligion);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* ── BENTO HERO SECTION ─────────────────────────────────── */}
      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Hero Left Bento Panel */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#1C1611]/95 via-[#130F0C]/95 to-[#0B0907] border border-[#F59E0B]/30 p-7 sm:p-10 lg:p-11 flex flex-col justify-between relative shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Tag Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A130C] border border-[#F59E0B]/40 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#FEF3C7] uppercase mb-6 sm:mb-8 shadow-inner">
                <span>UNIVERSAL MULTI-FAITH SCRIPTURES • AUDIO SYNCED</span>
                <Headphones className="w-3 h-3 text-[#F59E0B]" />
              </div>

              {/* Serif Headline with Gold highlights */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold text-[#FFFBEB] tracking-tight leading-[1.16] mb-5">
                Dharmik Granth <br />
                Padhne Aur Sunne Ka <br />
                <span className="gold-gradient-text">Pavitra Sangrah</span>
              </h1>

              {/* Subtitle */}
              <p className="text-stone-300/90 text-xs sm:text-[13px] sm:leading-relaxed font-normal max-w-lg mb-8">
                Sabhi dharmo ke mool granth ek hi jagah. Aawaz ke sath real-time line highlighting,
                shuddh ucharan aur secure offline reading.
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <Link
                href="/reader/agni-puran/1"
                className="btn-gold-glow inline-flex items-center space-x-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-[#0A0908] shadow-xl hover:scale-105 transition-all"
              >
                <span>Listen & Read Now 🎧</span>
                <span className="text-xs font-black">↗</span>
              </Link>

              <button
                onClick={() => setAudioStudioOpen(true)}
                className="text-xs sm:text-sm font-semibold text-[#FEF3C7] hover:text-[#F59E0B] transition flex items-center space-x-1.5 py-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#FEF3C7]" />
                <span>Play Free Chapter 1</span>
              </button>
            </div>
          </div>

          {/* Hero Right Bento Panel (Gyan Jyoti 3D Flame Orb) */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#18130E]/95 via-[#100D0A]/95 to-[#080706] border border-[#F59E0B]/30 relative overflow-hidden flex items-center justify-center p-2 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] min-h-[360px] sm:min-h-[440px]">
            {/* 3D Realistic Gyan Jyoti Image */}
            <div className="relative w-full h-full max-h-[440px] flex items-center justify-center">
              <img
                src="/gyan-jyoti-hero.jpg"
                alt="Gyan Jyoti Sacred Flame Orb"
                className="w-full h-full max-h-[420px] object-contain rounded-2xl drop-shadow-[0_0_40px_rgba(245,158,11,0.35)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAITH-PORTALS SELECTOR & SEARCH CAPSULE ────────────────── */}
      <section className="relative z-20 my-4 sm:my-6 flex flex-col items-center">
        {/* Faith Icons Curved Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#14100C]/90 border border-[#F59E0B]/35 backdrop-blur-xl shadow-2xl mb-4 overflow-x-auto max-w-full">
          {FAITH_PORTALS.map((portal) => {
            const isSelected = selectedReligion === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setSelectedReligion(portal.id)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 relative flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#382A1A] to-[#1A130C] text-[#FEF3C7] border-1.5 border-[#F59E0B] shadow-[0_0_22px_rgba(245,158,11,0.45)] scale-105'
                    : 'bg-[#18120C]/60 text-stone-300 hover:text-[#FEF3C7] border border-stone-800/80 hover:border-[#F59E0B]/40 hover:bg-[#221910]'
                }`}
                title={`${portal.name} (${portal.count})`}
              >
                <span className="font-serif select-none">{portal.symbol}</span>
                {isSelected && (
                  <span className="absolute -bottom-1 w-2.5 h-0.5 bg-[#F59E0B] rounded-full shadow-[0_0_8px_#F59E0B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Capsule Bar with Instant Voice/Chant Trigger */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl mx-auto flex items-center bg-[#14100C]/95 border border-[#F59E0B]/40 rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:border-[#F59E0B]"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Explore Shloka, Aayat, Granth..."
            className="w-full bg-transparent pl-5 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none font-normal"
          />

          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex-shrink-0 inline-flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#2C2217] via-[#201911] to-[#16110B] border border-[#F59E0B]/50 hover:border-[#F59E0B] text-[#FEF3C7] hover:text-white text-xs font-semibold shadow-md transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#0A0908] flex items-center justify-center font-bold text-[10px] group-hover:scale-110 transition-transform">
              <Mic className="w-3 h-3 text-[#0A0908]" />
            </div>
            <span className="hidden xs:inline">Search by Chant</span>
            <span className="xs:hidden">Search</span>
          </button>
        </form>
      </section>

      {/* ── COMPREHENSIVE MULTI-FAITH SCRIPTURE CARDS (Bento Grid) ─── */}
      <section className="mt-8 relative">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F59E0B]/20">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#FFFBEB]">
              {selectedReligion === 'All' ? 'Featured Sacred Scriptures' : `${selectedReligion} Granth Archives`}
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Verified original manuscripts with line-by-line vocal recitation & translations
            </p>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-bold text-[#F59E0B] hover:text-white flex items-center gap-1 transition"
          >
            <span>View All ({SEED_BOOKS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredBooks.map((book) => {
            const isPlayingThis = activeTrack?.slug === book.slug;
            const bookId = (book as any)._id || (book as any).id || book.slug;
            const owned = bookId ? isPurchased(bookId) : false;

            return (
              <div
                key={book.slug}
                className="bento-card hover:border-[#F59E0B]/60 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Top Cover Visual with Gold Frame */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative border border-[#F59E0B]/30 bg-[#1A140F]">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Religion Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#0A0908] bg-gradient-to-r from-[#FEF3C7] to-[#F59E0B] px-2.5 py-1 rounded-full shadow-md">
                        {book.religion}
                      </span>
                    </div>

                    {/* Free Ch 1 / Unlocked badge */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 backdrop-blur-xs">
                        Ch 1 Free
                      </span>
                      {owned && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/90 text-amber-200 border border-amber-500/40">
                          Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <h3 className="font-heading font-bold text-lg text-[#FFFBEB] group-hover:text-amber-300 transition-colors line-clamp-1">
                    {book.title}
                  </h3>

                  <p className="text-xs text-amber-200/80 font-medium mt-0.5 line-clamp-1">
                    {book.author} • {book.language}
                  </p>

                  <p className="text-xs text-stone-300/85 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                    {book.description}
                  </p>

                  {/* Rating & Chapters info */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400">
                    <div className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                      <span>{book.rating}</span>
                    </div>
                    <span>{book.totalChapters} Chapters</span>
                    <span className="text-[#FEF3C7] font-bold">₹{book.price}</span>
                  </div>

                  {/* Soundwave equalizer indicator */}
                  <div className="flex items-center justify-center space-x-1 h-5 my-3 bg-[#110E0B] rounded-lg p-1 border border-stone-800/80">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                          isPlayingThis ? `animate-wave-${(i % 5) + 1}` : 'h-1.5 opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dual Action CTAs */}
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href={`/reader/${book.slug}/1`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FEF3C7] to-[#F59E0B] hover:from-[#FFFFFF] hover:to-[#FBBF24] text-[#0A0908] font-bold text-xs text-center transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0A0908]" />
                    <span>Read Verse</span>
                  </Link>

                  <button
                    onClick={() => handlePlayCardAudio(book)}
                    className="py-2.5 px-3.5 rounded-xl bg-[#221A12] hover:bg-[#342618] border border-[#F59E0B]/40 text-[#FEF3C7] font-bold text-xs transition flex items-center justify-center space-x-1 shadow-sm"
                    title="Listen Vani Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Listen Vani 🎧</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PERSISTENT STICKY BOTTOM AUDIO PLAYER ──────────────────── */}
      <GlobalAudioPlayer
        currentTrack={activeTrack}
        onCloseTrack={() => setActiveTrack(null)}
      />

      {/* Modals */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onPlayAudio={(title, url) => {
          setActiveTrack({
            title,
            subtitle: 'Direct Verse Recitation',
            slug: 'agni-puran',
            chapterNumber: 1,
            audioUrl: url,
          });
        }}
      />

      <AudioStudioDrawer
        isOpen={audioStudioOpen}
        onClose={() => setAudioStudioOpen(false)}
      />

      {selectedBookForUnlock && (
        <UnlockCheckoutModal
          isOpen={!!selectedBookForUnlock}
          onClose={() => setSelectedBookForUnlock(null)}
          book={selectedBookForUnlock}
          onSuccess={() => setSelectedBookForUnlock(null)}
        />
      )}
    </div>
  );
}
