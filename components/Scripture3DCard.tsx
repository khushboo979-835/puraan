'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Volume2,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Play
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ScriptureCardProps {
  book: {
    _id?: string;
    id?: string;
    slug: string;
    title: string;
    religion: string;
    language: string;
    author: string;
    description: string;
    coverImageUrl?: string;
    price: number;
    totalChapters: number;
    rating?: number;
  };
  isPlayingThis?: boolean;
  onPlayAudio?: (book: any) => void;
}

export const FAITH_THEMES: Record<string, {
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  symbol: string;
  colorName: string;
  pillBg: string;
}> = {
  Hinduism: {
    bgGradient: 'from-[#2B1005] via-[#1A0A03] to-[#0D0502]',
    borderColor: 'border-[#F59E0B]/60',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    symbol: 'ॐ',
    colorName: '#F59E0B',
    pillBg: 'from-[#F59E0B] to-[#D97706]',
  },
  'Sanatan Dharma': {
    bgGradient: 'from-[#2B1005] via-[#1A0A03] to-[#0D0502]',
    borderColor: 'border-[#F59E0B]/60',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    symbol: 'ॐ',
    colorName: '#F59E0B',
    pillBg: 'from-[#F59E0B] to-[#D97706]',
  },
  Islam: {
    bgGradient: 'from-[#06261C] via-[#031711] to-[#010C09]',
    borderColor: 'border-emerald-500/60',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    symbol: '☪️',
    colorName: '#10B981',
    pillBg: 'from-[#10B981] to-[#059669]',
  },
  Christianity: {
    bgGradient: 'from-[#2B0B14] via-[#1A070D] to-[#0D0306]',
    borderColor: 'border-rose-500/60',
    glowColor: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
    symbol: '✝️',
    colorName: '#F43F5E',
    pillBg: 'from-[#F43F5E] to-[#E11D48]',
  },
  Sikhism: {
    bgGradient: 'from-[#0B1E42] via-[#071329] to-[#030914]',
    borderColor: 'border-amber-400/60',
    glowColor: 'shadow-[0_0_25px_rgba(251,146,60,0.25)]',
    symbol: 'ੴ',
    colorName: '#FB923C',
    pillBg: 'from-[#FB923C] to-[#EA580C]',
  },
  Buddhism: {
    bgGradient: 'from-[#241A08] via-[#171005] to-[#0A0702]',
    borderColor: 'border-yellow-500/60',
    glowColor: 'shadow-[0_0_25px_rgba(234,179,8,0.25)]',
    symbol: '☸️',
    colorName: '#EAB308',
    pillBg: 'from-[#EAB308] to-[#CA8A04]',
  },
  Jainism: {
    bgGradient: 'from-[#241306] via-[#170C04] to-[#0A0502]',
    borderColor: 'border-amber-500/60',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    symbol: '卐',
    colorName: '#F59E0B',
    pillBg: 'from-[#F59E0B] to-[#D97706]',
  },
};

export default function Scripture3DCard({
  book,
  isPlayingThis = false,
  onPlayAudio,
}: ScriptureCardProps) {
  const { isPurchased } = useAuth();
  const bookId = book._id || book.id || book.slug;
  const owned = isPurchased(bookId);

  const theme = FAITH_THEMES[book.religion] || FAITH_THEMES.Hinduism;

  const getCoverUrl = () => {
    const slug = (book.slug || '').toLowerCase();
    if (slug.includes('quran')) return '/covers/holy-quran.svg';
    if (slug.includes('gita')) return '/covers/bhagavad-gita.svg';
    if (slug.includes('bible')) return '/covers/holy-bible.svg';
    if (slug.includes('japji') || slug.includes('granth')) return '/covers/guru-granth-sahib.svg';
    if (slug.includes('dhammapada')) return '/covers/dhammapada.svg';
    if (slug.includes('kalpa') || slug.includes('tattvartha')) return '/covers/kalpa-sutra.svg';
    if (slug.includes('agni')) return '/covers/agni-puran.svg';
    if (book.coverImageUrl && book.coverImageUrl.startsWith('/covers/')) return book.coverImageUrl;
    return '/covers/bhagavad-gita.svg';
  };

  return (
    <div className="bento-card rounded-3xl p-5 border border-[#F59E0B]/25 hover:border-[#F59E0B]/70 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl relative overflow-hidden bg-[#110D0A]">
      <div>
        {/* Top 3D Vertical Book Cover Mockup Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-[#18130E] to-[#0A0806] border border-[#F59E0B]/30 flex items-center justify-center p-3 group-hover:border-[#F59E0B]/80 transition-colors shadow-inner">
          
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity"
            style={{
              background: `radial-gradient(circle at center, ${theme.colorName}33 0%, transparent 70%)`,
            }}
          />

          {/* 3D Realistic Hardcover Book Asset */}
          <div className="relative h-full aspect-[3/4] rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.85)] overflow-hidden border border-[#F59E0B]/50 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 bg-[#150F0B]">
            {/* Left Gold Spine Foil */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-[#F59E0B] via-[#FEF3C7] to-[#B45309] z-10 opacity-90 shadow-sm" />
            
            {/* Main Cover Image (SVG / Vector) */}
            <img
              src={getCoverUrl()}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== '/covers/bhagavad-gita.svg') {
                  target.src = '/covers/bhagavad-gita.svg';
                }
              }}
            />
          </div>

          {/* Top Left Faith Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={`text-[10px] uppercase font-bold tracking-wider text-[#0A0908] bg-gradient-to-r ${theme.pillBg} px-2.5 py-1 rounded-full shadow-md flex items-center gap-1`}>
              <span>{theme.symbol}</span>
              <span>{book.religion}</span>
            </span>
          </div>

          {/* Top Right Access Badge */}
          <div className="absolute top-3 right-3 z-20 flex gap-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-md">
              Ch 1 Free
            </span>
            {owned && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A1F10]/90 text-amber-300 border border-[#F59E0B]/50 backdrop-blur-md">
                Unlocked ✓
              </span>
            )}
          </div>
        </div>

        {/* Title & Author Info */}
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#FFFBEB] group-hover:text-amber-300 transition-colors line-clamp-1">
            {book.title}
          </h3>

          <p className="text-xs text-amber-200/80 font-medium line-clamp-1">
            {book.author}
          </p>

          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed pt-1">
            {book.description}
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-stone-800 text-xs text-stone-400">
          <div className="flex items-center space-x-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
            <span>{book.rating || 4.98}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#18130E] border border-stone-800 text-[11px]">
            {book.totalChapters} Chapters
          </span>
          <span className="text-[#FEF3C7] font-bold">₹{book.price || 49}</span>
        </div>

        {/* Waveform Animation */}
        <div className="flex items-center justify-center space-x-1 h-4 my-2.5 bg-[#0D0A08] rounded-lg px-2 border border-stone-800/80">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                isPlayingThis ? 'h-3 animate-pulse' : 'h-1 opacity-30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dual CTAs ("Read Verse" and "Listen Vani 🎧") */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <Link
          href={`/reader/${book.slug}/1`}
          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FEF3C7] to-[#F59E0B] hover:from-[#FFFFFF] hover:to-[#FBBF24] text-[#0A0908] font-bold text-xs text-center transition flex items-center justify-center space-x-1.5 shadow-md"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#0A0908]" />
          <span>Read Verse</span>
        </Link>

        <button
          onClick={() => {
            if (onPlayAudio) {
              onPlayAudio(book);
            }
          }}
          className="py-2.5 px-3 rounded-xl bg-[#1F1710] hover:bg-[#332415] border border-[#F59E0B]/40 text-[#FEF3C7] font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-sm"
          title="Listen Vani Audio"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Listen Vani 🎧</span>
        </button>
      </div>
    </div>
  );
}
