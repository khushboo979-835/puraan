'use client';

import React, { useState, useEffect } from 'react';
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
  Radio,
  Flame,
  Star,
  Award
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
  { id: 'All', name: 'All Traditions', symbol: '✦', count: '6 Faiths', desc: 'Universal Archive' },
  { id: 'Hinduism', name: 'Sanatan Dharma', symbol: 'ॐ', count: 'Gita & Puranas', desc: 'Vedas, Puranas & Gita' },
  { id: 'Islam', name: 'Islam', symbol: '☪', count: '114 Surahs', desc: 'Quran & Hadith' },
  { id: 'Christianity', name: 'Christianity', symbol: '✝', count: '66 Books', desc: 'Psalms & Gospels' },
  { id: 'Sikhism', name: 'Sikhism', symbol: 'ੴ', count: '1,430 Angs', desc: 'Guru Granth Sahib' },
  { id: 'Buddhism', name: 'Buddhism', symbol: '☸', count: '423 Verses', desc: 'Dhammapada & Suttas' },
  { id: 'Jainism', name: 'Jainism', symbol: '卐', count: '357 Sutras', desc: 'Tattvartha & Kalpa Sutra' },
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
      subtitle: `${book.religion} • Chapter 1 Vocal Recitation`,
      slug: book.slug,
      chapterNumber: 1,
      audioUrl: book.audioPreviewUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    });
  };

  // Re-order books to highlight the 6 main scriptures requested
  const orderedSlugPriority = [
    'bhagavad-gita',
    'the-holy-quran',
    'the-holy-bible-psalms',
    'japji-sahib',
    'dhammapada',
    'tattvartha-sutra',
    'agni-puran',
  ];

  const sortedBooks = [...SEED_BOOKS].sort((a, b) => {
    const idxA = orderedSlugPriority.indexOf(a.slug);
    const idxB = orderedSlugPriority.indexOf(b.slug);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const filteredBooks =
    selectedReligion === 'All'
      ? sortedBooks.slice(0, 6)
      : SEED_BOOKS.filter((b) => b.religion === selectedReligion);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] pb-28 relative overflow-hidden">
      {/* ── AMBIENT GOLD BACKGROUND GLOW ───────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#F59E0B]/12 via-[#D97706]/4 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* ── HERO SHOWCASE SECTION (Compact 100vh Viewport Fit) ─── */}
      <section className="pt-4 sm:pt-6 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Grand Typography */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#18130E]/90 border border-[#F59E0B]/40 shadow-sm backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#FEF3C7] uppercase font-sans">
                Universal Multi-Faith Scriptures • Audio Synced 🎧
              </span>
            </div>

            {/* Grand Serif Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold text-[#FFFBEB] tracking-tight leading-[1.12]">
              Dharmik Granth <br />
              Padhne Aur Sunne Ka <br />
              <span className="gold-gradient-text text-shadow-gold">Pavitra Sangrah</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg font-sans font-normal">
              Sabhi dharmo ke mool granth ek hi sthan par. Aawaz ke sath real-time line-by-line
              highlighting, shuddh Sanskrit/Arabic/Pali ucharan aur certified critical manuscripts.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/reader/bhagavad-gita/1"
                className="btn-gold-glow inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0A0908] shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:scale-105 transition-all"
              >
                <span>Listen & Read Now 🎧</span>
                <span className="text-xs font-black">↗</span>
              </Link>

              <button
                onClick={() => setAudioStudioOpen(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#18130E] hover:bg-[#2A1F13] border border-[#F59E0B]/40 hover:border-[#F59E0B] text-xs sm:text-sm font-bold text-[#FEF3C7] transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-[#FEF3C7]" />
                <span>Play Free Chapter 1</span>
              </button>

              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-stone-400 hover:text-amber-300 font-semibold px-2 py-1 transition"
              >
                <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Explore by Chant (⌘K)</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-5 sm:gap-8 text-[11px] text-stone-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span><strong>6 Traditions</strong> Unified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span><strong>1,480+ Seekers</strong> Chanting Now</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span><strong>BORI & SGPC</strong> Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Seamless 3D Gyan Jyoti Flame Sanctuary */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F59E0B]/20 via-[#D97706]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Orb Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square flex items-center justify-center group">
              <img
                src="/gyan-jyoti-hero.jpg"
                alt="Gyan Jyoti Sacred Flame Orb"
                className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform duration-500 rounded-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── FLOATING FAITH SELECTOR & SEARCH CAPSULE ───────────────── */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-3 sm:my-4">
        <div className="bento-card-active rounded-2xl sm:rounded-3xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.85)] border border-[#F59E0B]/40 flex flex-col items-center space-y-2.5 backdrop-blur-2xl">
          
          {/* Faith Buttons Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 w-full overflow-x-auto py-0.5">
            {FAITH_PORTALS.map((portal) => {
              const isSelected = selectedReligion === portal.id;
              return (
                <button
                  key={portal.id}
                  onClick={() => setSelectedReligion(portal.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-2xl flex items-center space-x-1.5 transition-all duration-300 flex-shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] font-bold shadow-[0_0_18px_rgba(245,158,11,0.5)] scale-105'
                      : 'bg-[#18130E] text-stone-300 hover:text-white border border-stone-800/80 hover:border-[#F59E0B]/50'
                  }`}
                >
                  <span className="text-base sm:text-lg font-serif">{portal.symbol}</span>
                  <span className="text-xs font-semibold">{portal.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Capsule Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center bg-[#100D0A] border border-[#F59E0B]/30 rounded-full p-1 shadow-inner transition hover:border-[#F59E0B]/70"
          >
            <Search className="w-4 h-4 text-amber-400 ml-3.5 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any shloka, aayat, psalm, pauri, or sutra... (e.g. Gita, Quran, Bible)"
              className="w-full bg-transparent pr-3 py-1.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-normal"
            />
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex-shrink-0 inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] text-xs font-bold shadow-md hover:scale-105 transition"
            >
              <Mic className="w-3.5 h-3.5 text-[#0A0908]" />
              <span className="hidden sm:inline">Search by Chant</span>
              <span className="sm:hidden">Search</span>
            </button>
          </form>

        </div>
      </section>

      {/* ── BENTO BOOKS GRID DIRECTLY BELOW SEARCH BAR (6 Cards) ──── */}
      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-2.5 border-b border-[#F59E0B]/20">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#FFFBEB]">
              {selectedReligion === 'All' ? 'Featured Sacred Scriptures' : `${selectedReligion} Granth Archives`}
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Verified original manuscripts with line-by-line vocal recitation & dual read/listen CTAs
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

        {/* 6 Featured Scripture Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredBooks.map((book) => {
            const isPlayingThis = activeTrack?.slug === book.slug;
            const bookId = (book as any)._id || (book as any).id || book.slug;
            const owned = bookId ? isPurchased(bookId) : false;

            return (
              <div
                key={book.slug}
                className="bento-card hover:border-[#F59E0B]/60 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
              >
                <div>
                  {/* High-res Cover Preview */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative border border-[#F59E0B]/25 bg-[#14100C]">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Faith Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#0A0908] bg-gradient-to-r from-[#FEF3C7] to-[#F59E0B] px-3 py-1 rounded-full shadow-md">
                        {book.religion}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-600/40 backdrop-blur-xs">
                        Ch 1 Free
                      </span>
                      {owned && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-200 border border-amber-600/40">
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

                  <p className="text-xs text-stone-300/85 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {book.description}
                  </p>

                  {/* Rating & Chapters */}
                  <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-stone-800 text-xs text-stone-400">
                    <div className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                      <span>{book.rating}</span>
                    </div>
                    <span>{book.totalChapters} Chapters</span>
                    <span className="text-[#FEF3C7] font-bold">₹{book.price}</span>
                  </div>

                  {/* Animated Waveform Equalizer */}
                  <div className="flex items-center justify-center space-x-1 h-5 my-2.5 bg-[#110E0B] rounded-lg p-1 border border-stone-800/80">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                          isPlayingThis ? `animate-wave-${(i % 5) + 1}` : 'h-1.5 opacity-25'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dual Action CTAs ("Read Verse" & "Listen 🎧") */}
                <div className="flex items-center gap-2 mt-1">
                  <Link
                    href={`/reader/${book.slug}/1`}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#FEF3C7] to-[#F59E0B] hover:from-[#FFFFFF] hover:to-[#FBBF24] text-[#0A0908] font-bold text-xs text-center transition flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0A0908]" />
                    <span>Read Verse</span>
                  </Link>

                  <button
                    onClick={() => handlePlayCardAudio(book)}
                    className="py-2 px-3.5 rounded-xl bg-[#201810] hover:bg-[#342415] border border-[#F59E0B]/40 text-[#FEF3C7] font-bold text-xs transition flex items-center justify-center space-x-1 shadow-sm"
                    title="Listen Vani Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Listen 🎧</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PERSISTENT BOTTOM-RIGHT AUDIO PLAYER ───────────────────── */}
      <GlobalAudioPlayer
        currentTrack={activeTrack}
        onCloseTrack={() => setActiveTrack(null)}
      />

      {/* ── GLOBAL MODALS & DRAWERS ────────────────────────────────── */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onPlayAudio={(title, url) => {
          setActiveTrack({
            title,
            subtitle: 'Direct Verse Recitation',
            slug: 'bhagavad-gita',
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
