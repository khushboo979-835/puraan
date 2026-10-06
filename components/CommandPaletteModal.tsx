'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Volume2, BookOpen, X, ArrowRight, Sparkles, CornerDownLeft } from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAudio?: (title: string, audioUrl: string) => void;
}

export default function CommandPaletteModal({ isOpen, onClose, onPlayAudio }: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hinduism' | 'islam' | 'christianity' | 'sikhism' | 'buddhism' | 'jainism'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten verses for instant search
  const allVerses: Array<{
    bookTitle: string;
    bookSlug: string;
    religion: string;
    chapterNumber: number;
    originalScript: string;
    hindiTranslation: string;
    englishTranslation: string;
    audioUrl?: string;
  }> = [];

  SEED_BOOKS.forEach((book) => {
    book.chapters.forEach((ch) => {
      ch.verses.forEach((v) => {
        allVerses.push({
          bookTitle: book.title,
          bookSlug: book.slug,
          religion: book.religion,
          chapterNumber: ch.chapterNumber,
          originalScript: v.originalScript,
          hindiTranslation: v.hindiTranslation,
          englishTranslation: v.englishTranslation,
          audioUrl: ch.audioUrl,
        });
      });
    });
  });

  const filteredVerses = allVerses.filter((item) => {
    const matchCat =
      selectedCategory === 'all' ||
      item.religion.toLowerCase() === selectedCategory.toLowerCase();
    const q = query.toLowerCase().trim();
    if (!q) return matchCat;
    const matchText =
      item.originalScript.toLowerCase().includes(q) ||
      item.hindiTranslation.toLowerCase().includes(q) ||
      item.englishTranslation.toLowerCase().includes(q) ||
      item.bookTitle.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bento-card rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-[#F59E0B]/40 flex flex-col max-h-[80vh]">
        {/* Top Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F59E0B]/20 flex items-center gap-3 bg-[#15110D]">
          <Search className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any shloka, aayat, psalm, pauri, or sutra..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-100 placeholder-stone-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white text-xs px-2 py-1 bg-stone-800 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-[#0F0C09] border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Wisdom ✦' },
            { id: 'hinduism', label: 'Hinduism ॐ' },
            { id: 'islam', label: 'Islam ☪' },
            { id: 'christianity', label: 'Christianity ✝' },
            { id: 'sikhism', label: 'Sikhism ੴ' },
            { id: 'buddhism', label: 'Buddhism ☸' },
            { id: 'jainism', label: 'Jainism 卐' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-sm'
                  : 'bg-[#1C1610] text-stone-300 hover:text-amber-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-800/60">
          {filteredVerses.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Sparkles className="w-8 h-8 text-[#F59E0B] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold">No sacred verse found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-500 mt-1">Try searching &ldquo;Vasudeva&rdquo;, &ldquo;Al-Fatiha&rdquo;, &ldquo;Shepherd&rdquo;, &ldquo;Ik Onkar&rdquo;, or &ldquo;Nirvana&rdquo;</p>
            </div>
          ) : (
            filteredVerses.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 group hover:bg-[#1A140F]/60 p-2.5 rounded-2xl transition">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#2A1F13] text-[#FEF3C7] border border-[#F59E0B]/30">
                      {item.religion}
                    </span>
                    <span className="text-xs font-bold text-amber-200 truncate max-w-[220px]">
                      {item.bookTitle} • Ch {item.chapterNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.audioUrl && (
                      <button
                        onClick={() => onPlayAudio && onPlayAudio(item.bookTitle, item.audioUrl!)}
                        className="p-1.5 rounded-lg bg-[#241A11] hover:bg-[#382615] text-[#FEF3C7] border border-[#F59E0B]/30 transition"
                        title="Listen Verse Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <Link
                      href={`/reader/${item.bookSlug}/${item.chapterNumber}`}
                      onClick={onClose}
                      className="p-1.5 rounded-lg bg-[#F59E0B] text-[#0A0908] font-bold text-xs hover:bg-[#FBBF24] transition flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <p className="font-heading text-sm text-[#FFFBEB] font-semibold leading-relaxed">
                  {item.originalScript}
                </p>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  <strong className="text-amber-300/80">Meaning:</strong> {item.hindiTranslation}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#0A0908] border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between px-5">
          <span>Search shlokas, aayats, translations across all faiths</span>
          <div className="flex items-center gap-2">
            <span className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px]">ESC</span> to close
          </div>
        </div>
      </div>
    </div>
  );
}
