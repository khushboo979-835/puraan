'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Compass, X } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAITH_CATEGORIES = [
  {
    name: 'Sanatan Dharma (सनातन धर्म)',
    symbol: 'ॐ',
    color: 'from-amber-600/25 via-[#1C1208] to-[#120B04]',
    borderColor: 'border-[#F59E0B]/40',
    count: '18 Puranas & Gita',
    verses: '15,400+ Shlokas',
    books: [
      { title: 'Shrimad Bhagavad Gita', slug: 'bhagavad-gita' },
      { title: 'Agni Puran', slug: 'agni-puran' },
    ],
  },
  {
    name: 'Islam (अल-क़ुरआन अल-करीम)',
    symbol: '☪',
    color: 'from-emerald-700/25 via-[#0A1A14] to-[#040E0A]',
    borderColor: 'border-emerald-500/40',
    count: '114 Surahs',
    verses: '6,236 Aayats',
    books: [
      { title: 'The Holy Quran (Surah Al-Fatiha)', slug: 'the-holy-quran' },
    ],
  },
  {
    name: 'Christianity (The Holy Bible)',
    symbol: '✝',
    color: 'from-rose-800/25 via-[#1C0A10] to-[#0E0407]',
    borderColor: 'border-rose-500/40',
    count: '66 Books (KJV)',
    verses: '2,400+ Psalms',
    books: [
      { title: 'The Holy Bible (Psalms & Gospels)', slug: 'the-holy-bible-psalms' },
    ],
  },
  {
    name: 'Sikhism (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ)',
    symbol: 'ੴ',
    color: 'from-amber-700/25 via-[#1E1408] to-[#0F0A03]',
    borderColor: 'border-amber-500/40',
    count: '1,430 Angs',
    verses: '38 Pauris (Japji)',
    books: [
      { title: 'Sri Japji Sahib & Guru Granth', slug: 'japji-sahib' },
    ],
  },
  {
    name: 'Buddhism (धम्मपद - बुद्ध वाणी)',
    symbol: '☸',
    color: 'from-yellow-700/25 via-[#1C1608] to-[#0E0B03]',
    borderColor: 'border-yellow-500/40',
    count: '26 Vaggas',
    verses: '423 Verses',
    books: [
      { title: 'The Dhammapada (Yamaka Vagga)', slug: 'dhammapada' },
    ],
  },
  {
    name: 'Jainism (तत्त्वार्थ सूत्र एवं कल्प सूत्र)',
    symbol: '卐',
    color: 'from-orange-800/25 via-[#1C1008] to-[#0E0703]',
    borderColor: 'border-orange-500/40',
    count: '10 Chapters',
    verses: '357 Sutras',
    books: [
      { title: 'Kalpa Sutra & Tattvartha Sutra', slug: 'tattvartha-sutra' },
    ],
  },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop hover-bridge so mouse movement doesn't close prematurely */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        onMouseLeave={onClose}
        className="fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 w-[94vw] max-w-5xl bg-[#0E0B08]/98 backdrop-blur-2xl border-2 border-[#F59E0B]/50 rounded-3xl p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.98)] z-50 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F59E0B]/25">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1C1610] border border-[#F59E0B]/40 text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#FFFBEB]">
                Universal Multi-Faith Scripture Archives
              </h3>
              <p className="text-[11px] text-stone-400">Preserved original manuscripts across 6 world traditions</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/library"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl btn-gold-glow text-[#0A0908] text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <span>Explore All Scriptures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Faith Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {FAITH_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.borderColor} hover:border-[#F59E0B] transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <span className="text-2xl font-serif select-none text-[#F59E0B] group-hover:scale-110 transition-transform flex-shrink-0">
                    {cat.symbol}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#FFFBEB] group-hover:text-amber-200 transition-colors line-clamp-1">
                    {cat.name}
                  </h4>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-stone-400 font-medium mb-2.5">
                  <span className="bg-[#1C1610] px-2 py-0.5 rounded text-amber-300 font-bold border border-stone-800">
                    {cat.count}
                  </span>
                  <span>•</span>
                  <span>{cat.verses}</span>
                </div>
              </div>

              <div className="space-y-1 border-t border-stone-800/80 pt-2">
                {cat.books.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/reader/${book.slug}/1`}
                    onClick={onClose}
                    className="flex items-center justify-between text-xs text-stone-300 hover:text-[#FEF3C7] p-1.5 rounded-lg hover:bg-[#22170E] transition font-medium group/link"
                  >
                    <span className="truncate">{book.title}</span>
                    <ArrowRight className="w-3 h-3 text-amber-500 group-hover/link:translate-x-0.5 transition-transform flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
