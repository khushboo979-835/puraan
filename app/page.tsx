'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowUpRight,
  ChevronRight,
  Flame
} from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

interface ScriptureCardItem {
  id: string;
  title: string;
  hindiTitle: string;
  slug: string;
  religion: string;
  audioUrl: string;
  isActive?: boolean;
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
    isActive: true,
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
  { id: 'Hinduism', symbol: 'ॐ', label: 'Sanatan Dharma' },
  { id: 'Islam', symbol: '☪', label: 'Islam' },
  { id: 'Christianity', symbol: '✝', label: 'Christianity' },
  { id: 'Sikhism', symbol: 'ੴ', label: 'Sikhism' },
  { id: 'Buddhism', symbol: '☸', label: 'Buddhism' },
  { id: 'Jainism', symbol: '卐', label: 'Jainism' },
];

export default function HomePage() {
  const router = useRouter();
  const { isPurchased } = useAuth();
  const [activeFaith, setActiveFaith] = useState<string>('Christianity');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play / Pause Audio Preview for cards
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
    <div className="min-h-screen text-[#f1ebd8] pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* ── BENTO HERO SECTION ─────────────────────────────────── */}
      <section className="pt-6 sm:pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Hero Left Bento Panel */}
          <div className="lg:col-span-6 bento-card rounded-[32px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle Top Gold Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#e2ab46]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Pill Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1e170e]/80 border border-[#e2ab46]/30 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#fae0a2] uppercase mb-6 sm:mb-8 shadow-inner">
                <span>UNIVERSAL MULTI-FAITH SCRIPTURES • AUDIO SYNCED</span>
                <Headphones className="w-3 h-3 text-[#f6cb74]" />
              </div>

              {/* Grand Serif Heading */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-[#fff2d1] tracking-tight leading-[1.18] mb-5">
                Dharmik Granth <br />
                Padhne Aur Sunne Ka <br />
                <span className="gold-gradient-text">Pavitra Sangrah</span>
              </h1>

              {/* Subtitle */}
              <p className="text-stone-300/90 text-xs sm:text-sm font-normal leading-relaxed max-w-lg mb-8">
                Sabhi dharmo ke mool granth ek hi jagah. Aawaz ke sath real-time line highlighting,
                shuddh ucharan aur secure offline reading.
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <Link
                href="/reader/agni-puran/1"
                className="btn-gold-glow inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3 rounded-full text-xs font-bold text-[#120b02] shadow-xl hover:scale-105 transition-all"
              >
                <span>Listen & Read Now 🎧</span>
                <span className="text-sm font-black">↗</span>
              </Link>

              <Link
                href="/reader/agni-puran/1"
                className="text-xs font-semibold text-[#fae0a2] hover:text-white flex items-center space-x-1.5 transition py-2"
              >
                <span>Play Free Chapter 1</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Bento Panel (Gyan Jyoti Flame Visualizer) */}
          <div className="lg:col-span-6 bento-card rounded-[32px] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] sm:min-h-[460px]">
            {/* Ambient Deep Golden Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-[#e2ab46]/15 rounded-full blur-[90px]" />
            </div>

            {/* Concentric Golden Resonant Soundwave Rings / Curves in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <svg className="w-full h-full" viewBox="0 0 600 400" fill="none">
                {/* Horizontal Waveforms radiating out */}
                <path
                  d="M0 200 C100 140, 150 260, 250 200 C350 140, 400 260, 600 200"
                  stroke="url(#waveGrad)"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <path
                  d="M0 200 C80 160, 180 240, 270 200 C360 160, 460 240, 600 200"
                  stroke="url(#waveGrad)"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <path
                  d="M0 200 C120 120, 160 280, 260 200 C360 120, 480 280, 600 200"
                  stroke="url(#waveGrad)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                {/* Soundwave bars pattern across center */}
                <g opacity="0.3" stroke="#e2ab46" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="60" y1="185" x2="60" y2="215" />
                  <line x1="80" y1="170" x2="80" y2="230" />
                  <line x1="100" y1="155" x2="100" y2="245" />
                  <line x1="120" y1="175" x2="120" y2="225" />
                  <line x1="140" y1="160" x2="140" y2="240" />
                  <line x1="160" y1="180" x2="160" y2="220" />
                  <line x1="440" y1="180" x2="440" y2="220" />
                  <line x1="460" y1="160" x2="460" y2="240" />
                  <line x1="480" y1="175" x2="480" y2="225" />
                  <line x1="500" y1="155" x2="500" y2="245" />
                  <line x1="520" y1="170" x2="520" y2="230" />
                  <line x1="540" y1="185" x2="540" y2="215" />
                </g>
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e2ab46" stopOpacity="0" />
                    <stop offset="0.3" stopColor="#fae0a2" stopOpacity="0.8" />
                    <stop offset="0.5" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="0.7" stopColor="#fae0a2" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#e2ab46" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Orbiting Faith Symbols in Upper Arc */}
            <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex items-center justify-center">
              {/* Faith Symbol Orbits */}
              <div className="absolute top-2 left-12 text-2xl sm:text-3xl text-[#fae0a2] drop-shadow-[0_0_12px_rgba(246,203,116,0.6)] animate-bounce font-serif select-none" style={{ animationDuration: '4s' }}>
                ॐ
              </div>
              <div className="absolute top-0 sm:top-1 left-28 sm:left-32 text-2xl sm:text-3xl text-[#fae0a2] drop-shadow-[0_0_12px_rgba(246,203,116,0.6)] select-none">
                ☪
              </div>
              <div className="absolute top-0 sm:top-1 right-28 sm:right-32 text-2xl sm:text-3xl text-[#fae0a2] drop-shadow-[0_0_15px_rgba(246,203,116,0.9)] select-none">
                ✝
              </div>
              <div className="absolute top-2 right-12 text-2xl sm:text-3xl text-[#fae0a2] drop-shadow-[0_0_12px_rgba(246,203,116,0.6)] select-none">
                ☸
              </div>
              <div className="absolute top-20 right-2 text-xl sm:text-2xl text-[#fae0a2] drop-shadow-[0_0_10px_rgba(246,203,116,0.5)] select-none">
                卐
              </div>
              <div className="absolute top-20 left-2 text-xl sm:text-2xl text-[#fae0a2] drop-shadow-[0_0_10px_rgba(246,203,116,0.5)] font-serif select-none">
                ੴ
              </div>

              {/* Center Gyan Jyoti Glass Sphere & Flame Visualizer */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-[#fce8bd]/30 shadow-[0_0_40px_rgba(226,171,70,0.35)] flex flex-col items-center justify-end pb-3 backdrop-blur-md bg-gradient-to-b from-white/5 via-amber-950/20 to-black/60 overflow-hidden">
                {/* Internal Refraction and Flame Aura */}
                <div className="absolute inset-0 bg-radial from-amber-400/25 via-amber-600/10 to-transparent blur-xl pointer-events-none" />

                {/* 3D Flame Graphic */}
                <div className="relative z-10 mb-2 flex flex-col items-center">
                  <div className="relative w-20 h-28 flex items-center justify-center">
                    {/* Multi-layered Glowing Flame SVG */}
                    <svg
                      className="w-full h-full drop-shadow-[0_0_25px_rgba(255,200,80,0.9)]"
                      viewBox="0 0 100 140"
                      fill="none"
                    >
                      {/* Outer Golden Flame */}
                      <path
                        d="M50 5 C65 35, 90 70, 75 105 C65 125, 35 125, 25 105 C10 70, 35 35, 50 5 Z"
                        fill="url(#outerFlame)"
                      />
                      {/* Inner Bright Flame */}
                      <path
                        d="M50 25 C60 50, 75 80, 65 105 C58 118, 42 118, 35 105 C25 80, 40 50, 50 25 Z"
                        fill="url(#innerFlame)"
                      />
                      {/* Core White Light */}
                      <path
                        d="M50 50 C55 68, 65 90, 58 105 C54 112, 46 112, 42 105 C35 90, 45 68, 50 50 Z"
                        fill="url(#coreFlame)"
                      />
                      <defs>
                        <linearGradient id="outerFlame" x1="50" y1="5" x2="50" y2="125" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#fff1cc" />
                          <stop offset="0.3" stopColor="#f6cb74" />
                          <stop offset="0.7" stopColor="#e2ab46" />
                          <stop offset="1" stopColor="#965a08" />
                        </linearGradient>
                        <linearGradient id="innerFlame" x1="50" y1="25" x2="50" y2="118" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" />
                          <stop offset="0.4" stopColor="#ffe49e" />
                          <stop offset="0.8" stopColor="#f5aa20" />
                          <stop offset="1" stopColor="#c46200" />
                        </linearGradient>
                        <linearGradient id="coreFlame" x1="50" y1="50" x2="50" y2="112" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" />
                          <stop offset="0.6" stopColor="#fff8e7" />
                          <stop offset="1" stopColor="#f8ca68" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Tiered Golden Base Plinth labeled "Gyan Jyoti" */}
                <div className="relative z-10 w-44 sm:w-48 py-1.5 rounded-xl bg-gradient-to-b from-[#2a2118] via-[#1b150f] to-[#0e0b08] border border-[#e2ab46]/50 shadow-[0_5px_15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,230,160,0.5)] text-center">
                  <span className="font-heading text-xs sm:text-sm font-bold tracking-wider text-[#fae0a2] drop-shadow-md">
                    Gyan Jyoti
                  </span>
                </div>
              </div>

              {/* Multi-tiered circular gold rings base under orb */}
              <div className="absolute -bottom-5 w-60 sm:w-68 h-10 rounded-full border border-[#e2ab46]/30 bg-gradient-to-b from-[#382b1d]/40 to-transparent blur-[1px] pointer-events-none" />
              <div className="absolute -bottom-8 w-72 sm:w-80 h-12 rounded-full border border-[#e2ab46]/20 bg-gradient-to-b from-[#221a11]/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING FAITH-PORTALS SELECTOR & SEARCH CAPSULE ───────── */}
      <section className="relative z-20 my-4 sm:my-6 flex flex-col items-center">
        {/* Curved Faith Icons Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#181410]/90 border border-[#e2ab46]/25 backdrop-blur-xl shadow-2xl mb-4">
          {FAITH_ICONS.map((faith) => {
            const isSelected = activeFaith === faith.id;
            return (
              <button
                key={faith.id}
                onClick={() => handleFaithSelect(faith.id)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 relative group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#3a2d1d] to-[#1d160e] text-[#fce8bd] border-1.5 border-[#f6cb74] shadow-[0_0_20px_rgba(246,203,116,0.35)] scale-105'
                    : 'bg-[#1a140f]/60 text-stone-300 hover:text-[#fae0a2] border border-stone-800/80 hover:border-[#e2ab46]/40 hover:bg-[#261e15]/60'
                }`}
                title={faith.label}
              >
                <span className="font-serif select-none">{faith.symbol}</span>
                {isSelected && (
                  <span className="absolute -bottom-1 w-2 h-0.5 bg-[#f6cb74] rounded-full shadow-[0_0_6px_#f6cb74]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Capsule Bar with Voice/Chant Button */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl mx-auto flex items-center bg-[#15110d]/95 border border-[#e2ab46]/35 rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:border-[#f6cb74]/60"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Explore Shloka, Aayat, Granth..."
            className="w-full bg-transparent pl-5 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none font-medium"
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

      {/* ── FEATURED SCRIPTURES ROW WITH WAVEFORMS ─────────────────── */}
      <section className="mt-8 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {FEATURED_CARDS.map((card) => {
            const isPlaying = activePlayingId === card.id;
            const isHighlighted = card.isActive;

            return (
              <div
                key={card.id}
                className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isHighlighted
                    ? 'bento-card-active'
                    : 'bento-card hover:border-[#e2ab46]/50 hover:-translate-y-1'
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

      {/* ── NOW CHANTING / READING FLOATING WIDGET ─────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bento-card-active rounded-2xl p-3.5 shadow-2xl max-w-[210px] flex flex-col space-y-2 border border-[#f6cb74]/60 backdrop-blur-2xl">
          {/* Header with Glowing Icon */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8f5707] to-[#fae0a2] flex items-center justify-center text-[#120b02] shadow-md">
              <Flame className="w-4 h-4 fill-[#120b02]" />
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

          {/* Equalizer line */}
          <div className="flex items-center justify-center space-x-1 h-3 py-1">
            <div className="w-0.5 h-full bg-amber-400 animate-wave-1 rounded-full" />
            <div className="w-0.5 h-full bg-amber-300 animate-wave-3 rounded-full" />
            <div className="w-0.5 h-full bg-amber-200 animate-wave-2 rounded-full" />
            <div className="w-0.5 h-full bg-amber-400 animate-wave-4 rounded-full" />
            <div className="w-0.5 h-full bg-amber-300 animate-wave-5 rounded-full" />
          </div>

          {/* Action CTA */}
          <Link
            href="/reader/dhammapada/1"
            className="w-full py-1 px-2 rounded-lg bg-gradient-to-r from-[#fae0a2] to-[#e2ab46] text-[#120b02] font-black text-[10px] text-center shadow-xs hover:opacity-90 transition block"
          >
            Open Reader Studio 🎧
          </Link>
        </div>
      </div>

      {/* Unlock Checkout Modal */}
      {selectedBookForUnlock && (
        <UnlockCheckoutModal
          isOpen={!!selectedBookForUnlock}
          onClose={() => setSelectedBookForUnlock(null)}
          book={selectedBookForUnlock}
          onSuccess={() => {
            setSelectedBookForUnlock(null);
          }}
        />
      )}
    </div>
  );
}
