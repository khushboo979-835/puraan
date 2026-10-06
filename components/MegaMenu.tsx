'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAITH_CATEGORIES = [
  {
    name: 'Hinduism (Sanatan Dharma)',
    symbol: 'ॐ',
    color: 'from-amber-600/30 to-amber-950/40',
    count: '18 Puranas & Gita',
    verses: '15,400+ Shlokas',
    books: [
      { title: 'Agni Puran', slug: 'agni-puran' },
      { title: 'Shrimad Bhagavad Gita', slug: 'bhagavad-gita' },
    ],
  },
  {
    name: 'Islam (अल-क़ुरआन)',
    symbol: '☪',
    color: 'from-emerald-600/20 to-stone-900/50',
    count: '114 Surahs',
    verses: '6,236 Aayats',
    books: [
      { title: 'The Holy Quran', slug: 'the-holy-quran' },
    ],
  },
  {
    name: 'Christianity (The Holy Bible)',
    symbol: '✝',
    color: 'from-amber-700/20 to-stone-900/50',
    count: '66 Books (KJV)',
    verses: '2,400+ Psalms',
    books: [
      { title: 'The Book of Psalms & Gospels', slug: 'the-holy-bible-psalms' },
    ],
  },
  {
    name: 'Sikhism (ਗੁਰਬਾਣੀ)',
    symbol: 'ੴ',
    color: 'from-amber-500/20 to-stone-900/50',
    count: '1,430 Angs',
    verses: '38 Pauris (Japji)',
    books: [
      { title: 'Sri Japji Sahib & Guru Granth', slug: 'japji-sahib' },
    ],
  },
  {
    name: 'Buddhism (धम्मपद)',
    symbol: '☸',
    color: 'from-yellow-600/20 to-stone-900/50',
    count: '26 Vaggas',
    verses: '423 Verses',
    books: [
      { title: 'The Dhammapada (Buddha Vaani)', slug: 'dhammapada' },
    ],
  },
  {
    name: 'Jainism (जैन दर्शन)',
    symbol: '卐',
    color: 'from-orange-600/20 to-stone-900/50',
    count: '10 Chapters',
    verses: '357 Sutras',
    books: [
      { title: 'Tattvartha Sutra', slug: 'tattvartha-sutra' },
    ],
  },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[94vw] max-w-6xl mt-2 bento-card rounded-3xl p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-[#F59E0B]/40 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-[#FEF3C7]">
            Universal Multi-Faith Scripture Archives
          </h3>
        </div>
        <Link
          href="/catalog"
          onClick={onClose}
          className="text-xs font-bold text-[#F59E0B] hover:text-white flex items-center gap-1 transition"
        >
          <span>Explore All Manuscripts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {FAITH_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} border border-[#F59E0B]/20 hover:border-[#F59E0B]/60 transition-all duration-300 group`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-serif select-none text-[#F59E0B] group-hover:scale-110 transition-transform">
                  {cat.symbol}
                </span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#FFFBEB] group-hover:text-amber-200 transition-colors">
                  {cat.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-stone-400 font-medium mb-3">
              <span className="bg-[#1C1610] px-2 py-0.5 rounded text-amber-300/90 font-bold">
                {cat.count}
              </span>
              <span>•</span>
              <span>{cat.verses}</span>
            </div>

            <div className="space-y-1.5 border-t border-stone-800/80 pt-2">
              {cat.books.map((book) => (
                <Link
                  key={book.slug}
                  href={`/reader/${book.slug}/1`}
                  onClick={onClose}
                  className="flex items-center justify-between text-xs text-stone-300 hover:text-[#FEF3C7] p-1.5 rounded-lg hover:bg-[#2A1F13] transition font-medium"
                >
                  <span className="truncate">{book.title}</span>
                  <ArrowRight className="w-3 h-3 text-stone-500 group-hover:text-amber-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
