'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Play,
  Pause,
  Mic,
  Headphones,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

interface ScriptureCardItem {
  id: string;
  title: string;
  hindiTitle: string;
  slug: string;
  religion: string;
  audioUrl: string;
  isHighlighted?: boolean;
}

const FEATURED_CARDS: ScriptureCardItem[] = [
  {
    id: 'agni-puran',
    title: 'Agni Puran',
    hindiTitle: 'अग्नि पुराण',
    slug: 'agni-puran',
    religion: 'Hinduism',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 'the-holy-quran',
    title: 'The Holy Quran',
    hindiTitle: 'अल-क़ुरआन',
    slug: 'the-holy-quran',
    religion: 'Islam',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
    isHighlighted: true,
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    hindiTitle: 'भगवद् गीता',
    slug: 'bhagavad-gita',
    religion: 'Hinduism',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
  {
    id: 'the-holy-bible',
    title: 'The Holy Bible',
    hindiTitle: 'पवित्र बाइबिल',
    slug: 'the-holy-bible-psalms',
    religion: 'Christianity',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
  {
    id: 'japji-sahib',
    title: 'Sri Japji Sahib',
    hindiTitle: 'श्री जपजी साहिब',
    slug: 'japji-sahib',
    religion: 'Sikhism',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 'dhammapada',
    title: 'The Dhammapada',
    hindiTitle: 'धम्मपद',
    slug: 'dhammapada',
    religion: 'Buddhism',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
];

const FAITH_ICONS = [
  { id: 'Hinduism', symbol: 'ॐ', label: 'Hinduism' },
  { id: 'Islam', symbol: '☪', label: 'Islam' },
  { id: 'Christianity', symbol: '✝', label: 'Christianity' },
  { id: 'Sikhism', symbol: 'ੴ', label: 'Sikhism' },
  { id: 'Buddhism', symbol: '☸', label: 'Buddhism' },
  { id: 'Jainism', symbol: '卐', label: 'Jainism' },
];

export default function HomePage() {
  const router = useRouter();
  const [activeFaith, setActiveFaith] = useState<string>('Christianity');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (card: ScriptureCardItem) => {
    if (activePlayingId === card.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setActivePlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(card.audioUrl);
      audio.onended = () => setActivePlayingId(null);
      audio.play().catch(() => {});
      audioRef.current = audio;
      setActivePlayingId(card.id);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/catalog');
    }
  };

  const handleFaithSelect = (faithId: string) => {
    setActiveFaith(faithId);
    router.push(`/catalog?religion=${encodeURIComponent(faithId)}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f1ebd8] pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* ── BENTO HERO SECTION ─────────────────────────────────── */}
      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Hero Left Bento Panel */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#1c1611]/90 via-[#130f0c]/95 to-[#0b0907] border border-[#e2ab46]/25 p-7 sm:p-10 lg:p-11 flex flex-col justify-between relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#e2ab46]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Tag Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#18120c] border border-[#e2ab46]/35 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#fae0a2] uppercase mb-6 sm:mb-8">
                <span>UNIVERSAL MULTI-FAITH SCRIPTURES • AUDIO SYNCED</span>
                <Headphones className="w-3 h-3 text-[#f6cb74]" />
              </div>

              {/* Serif Headline with Gold highlights */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold text-[#fff4db] tracking-tight leading-[1.16] mb-5">
                Dharmik Granth <br />
                Padhne Aur Sunne Ka <br />
                <span className="text-[#f6cb74] text-shadow-gold">Pavitra Sangrah</span>
              </h1>

              {/* Subtitle */}
              <p className="text-stone-300/85 text-xs sm:text-[13px] sm:leading-relaxed font-normal max-w-lg mb-8">
                Sabhi dharmo ke mool granth ek hi jagah. Aawaz ke sath real-time line highlighting,
                shuddh ucharan aur secure offline reading.
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <Link
                href="/reader/agni-puran/1"
                className="btn-gold-glow inline-flex items-center space-x-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-[#120b02] shadow-xl hover:scale-105 transition-all"
              >
                <span>Listen & Read Now 🎧</span>
                <span className="text-xs font-black">↗</span>
              </Link>

              <Link
                href="/reader/agni-puran/1"
                className="text-xs sm:text-sm font-semibold text-[#fae0a2] hover:text-white transition py-2"
              >
                Play Free Chapter 1
              </Link>
            </div>
          </div>

          {/* Hero Right Bento Panel (Gyan Jyoti 3D Flame Orb) */}
          <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#18130e]/90 via-[#100d0a]/95 to-[#080706] border border-[#e2ab46]/25 relative overflow-hidden flex items-center justify-center p-2 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[360px] sm:min-h-[440px]">
            {/* 3D Realistic Gyan Jyoti Image */}
            <div className="relative w-full h-full max-h-[440px] flex items-center justify-center">
              <img
                src="/gyan-jyoti-hero.jpg"
                alt="Gyan Jyoti Sacred Flame Orb"
                className="w-full h-full max-h-[420px] object-contain rounded-2xl drop-shadow-[0_0_35px_rgba(226,171,70,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAITH-PORTALS SELECTOR & SEARCH CAPSULE ────────────────── */}
      <section className="relative z-20 my-4 sm:my-6 flex flex-col items-center">
        {/* Faith Icons Curved Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#14100c]/90 border border-[#e2ab46]/30 backdrop-blur-xl shadow-2xl mb-4">
          {FAITH_ICONS.map((faith) => {
            const isSelected = activeFaith === faith.id;
            return (
              <button
                key={faith.id}
                onClick={() => handleFaithSelect(faith.id)}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#382a1a] to-[#1a130c] text-[#fce8bd] border-1.5 border-[#f6cb74] shadow-[0_0_22px_rgba(246,203,116,0.45)] scale-105'
                    : 'bg-[#18120c]/60 text-stone-300 hover:text-[#fae0a2] border border-stone-800/80 hover:border-[#e2ab46]/40 hover:bg-[#221910]'
                }`}
                title={faith.label}
              >
                <span className="font-serif select-none">{faith.symbol}</span>
                {isSelected && (
                  <span className="absolute -bottom-1 w-2 h-0.5 bg-[#f6cb74] rounded-full shadow-[0_0_8px_#f6cb74]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Capsule Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl mx-auto flex items-center bg-[#14100c]/95 border border-[#e2ab46]/35 rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:border-[#f6cb74]/60"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Explore Shloka, Aayat, Granth..."
            className="w-full bg-transparent pl-5 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none font-normal"
          />

          <button
            type="submit"
            className="flex-shrink-0 inline-flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#2c2217] via-[#201911] to-[#16110b] border border-[#e2ab46]/50 hover:border-[#f6cb74] text-[#fae0a2] hover:text-white text-xs font-semibold shadow-md transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-[#e2ab46] text-[#120b02] flex items-center justify-center font-bold text-[10px] group-hover:scale-110 transition-transform">
              <Mic className="w-3 h-3 text-[#120b02]" />
            </div>
            <span className="hidden xs:inline">Search by Chant</span>
            <span className="xs:hidden">Search</span>
          </button>
        </form>
      </section>

      {/* ── 6 FEATURED SCRIPTURES ROW WITH SOUNDWAVES ──────────────── */}
      <section className="mt-8 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURED_CARDS.map((card) => {
            const isPlaying = activePlayingId === card.id;
            const isHighlighted = card.isHighlighted;

            return (
              <div
                key={card.id}
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#241c14] to-[#120e0a] border-1.5 border-[#f6cb74] shadow-[0_0_30px_rgba(246,203,116,0.25)]'
                    : 'bg-[#15100c]/80 border border-[#e2ab46]/20 hover:border-[#e2ab46]/50 hover:-translate-y-1 backdrop-blur-xl'
                }`}
              >
                {/* Top Title & Subtitle */}
                <div>
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-[#fff2d1] tracking-tight group-hover:text-[#fae0a2] transition-colors truncate">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 font-medium font-serif mt-0.5 truncate">
                    {card.hindiTitle}
                  </p>
                </div>

                {/* Animated Golden Audio Waveform Graphic */}
                <div className="my-5 flex items-center justify-center space-x-1 sm:space-x-1.5 h-8">
                  <div
                    className={`w-1 rounded-full bg-[#f6cb74] ${
                      isPlaying ? 'animate-wave-1' : 'h-2 group-hover:h-4'
                    } transition-all duration-300`}
                  />
                  <div
                    className={`w-1 rounded-full bg-[#e2ab46] ${
                      isPlaying ? 'animate-wave-2' : 'h-5 group-hover:h-7'
                    } transition-all duration-300`}
                  />
                  <div
                    className={`w-1 rounded-full bg-[#fff2d1] ${
                      isPlaying ? 'animate-wave-3' : 'h-3 group-hover:h-6'
                    } transition-all duration-300`}
                  />
                  <div
                    className={`w-1 rounded-full bg-[#f6cb74] ${
                      isPlaying ? 'animate-wave-4' : 'h-6 group-hover:h-8'
                    } transition-all duration-300`}
                  />
                  <div
                    className={`w-1 rounded-full bg-[#b87c1e] ${
                      isPlaying ? 'animate-wave-5' : 'h-2 group-hover:h-4'
                    } transition-all duration-300`}
                  />
                  <div
                    className={`w-1 rounded-full bg-[#fae0a2] ${
                      isPlaying ? 'animate-wave-2' : 'h-4 group-hover:h-6'
                    } transition-all duration-300`}
                  />
                </div>

                {/* Listen (Synced Audio) Button */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => toggleAudio(card)}
                    className="w-full py-1.5 px-2 rounded-xl bg-[#221a12]/80 hover:bg-[#34271a] border border-[#e2ab46]/30 hover:border-[#f6cb74] text-[10px] font-semibold text-[#fce8bd] flex items-center justify-center space-x-1 transition shadow-xs"
                  >
                    {isPlaying ? (
                      <Pause className="w-2.5 h-2.5 fill-[#fce8bd]" />
                    ) : (
                      <Play className="w-2.5 h-2.5 fill-[#fce8bd]" />
                    )}
                    <span className="truncate">Listen (Synced Audio) 🎧</span>
                  </button>

                  <Link
                    href={`/reader/${card.slug}/1`}
                    className="block text-center text-[10px] text-stone-400 hover:text-amber-300 font-medium transition"
                  >
                    Open Studio ↗
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FLOATING NOW CHANTING WIDGET (As on Figma right) ──────── */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-[#18130e]/95 border-1.5 border-[#f6cb74]/70 rounded-2xl p-3 shadow-2xl max-w-[210px] flex flex-col space-y-2 backdrop-blur-2xl">
          {/* Mini Header */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#e2ab46]/50 flex-shrink-0 bg-[#0d0c0b]">
              <img
                src="/gyan-jyoti-hero.jpg"
                alt="Chanting Flame"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div className="truncate">
              <span className="block text-[9px] uppercase tracking-wider text-amber-300 font-bold">
                Now Chanting 🎵
              </span>
              <span className="block text-xs font-bold text-stone-100 truncate">
                The Dhammapada
              </span>
            </div>
          </div>

          {/* Equalizer animation */}
          <div className="flex items-center justify-center space-x-1 h-3 py-0.5">
            <div className="w-0.5 h-full bg-amber-400 animate-wave-1 rounded-full" />
            <div className="w-0.5 h-full bg-amber-300 animate-wave-3 rounded-full" />
            <div className="w-0.5 h-full bg-amber-200 animate-wave-2 rounded-full" />
            <div className="w-0.5 h-full bg-amber-400 animate-wave-4 rounded-full" />
            <div className="w-0.5 h-full bg-amber-300 animate-wave-5 rounded-full" />
          </div>

          {/* CTA */}
          <Link
            href="/reader/dhammapada/1"
            className="w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#fae0a2] to-[#e2ab46] text-[#120b02] font-black text-[10px] text-center shadow-xs hover:opacity-90 transition block"
          >
            Listen (Synced Audio) 🎧
          </Link>
        </div>
      </div>

      {/* Unlock Modal */}
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
