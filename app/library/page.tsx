'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Headphones,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

export default function LibraryPage() {
  const { isPurchased } = useAuth();
  const [books, setBooks] = useState<any[]>(SEED_BOOKS as any[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);

  const religions = ['All', 'Sanatan Dharma', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism'];
  const languages = ['All', 'Sanskrit', 'Hindi', 'Arabic', 'Gurmukhi', 'English', 'Pali'];

  useEffect(() => {
    fetchCatalog();
  }, [selectedReligion, selectedLanguage]);

  const fetchCatalog = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedReligion !== 'All') {
        const mappedRel = selectedReligion === 'Sanatan Dharma' ? 'Hinduism' : selectedReligion;
        params.set('religion', mappedRel);
      }
      if (selectedLanguage !== 'All') params.set('language', selectedLanguage);
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/books?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.books && data.books.length > 0) {
          setBooks(data.books);
        }
      }
    } catch (e) {
      // Fallback
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchTerm === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const relNormalized = selectedReligion === 'Sanatan Dharma' ? 'Hinduism' : selectedReligion;
    const matchesReligion = selectedReligion === 'All' || book.religion === relNormalized || (selectedReligion === 'Sanatan Dharma' && book.religion === 'Sanatan Dharma');
    const matchesLanguage =
      selectedLanguage === 'All' ||
      book.language?.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesReligion && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Universal Sacred Scripture Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Pavitra Granth & Critical Editions
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Preserved original manuscripts across 6 world traditions. Chapter 1 is 100% free with line-by-line synchronized audio recitations and certified Sanskrit/Pali/Arabic transliterations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bento-card rounded-3xl p-5 sm:p-6 mb-10 space-y-4 border border-[#F59E0B]/30 shadow-2xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by scripture title, verse, author, or keyword (e.g. Bhagavad Gita, Quran, Dhammapada)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[#120E0A] border border-[#F59E0B]/30 rounded-2xl text-xs sm:text-sm text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B] transition"
          />
        </div>

        {/* Faith Badges Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-800">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter className="w-3 h-3" /> Traditions:
          </span>
          {religions.map((rel) => (
            <button
              key={rel}
              onClick={() => setSelectedReligion(rel)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedReligion === rel
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-md'
                  : 'bg-[#18130E] text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* Books Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const unlocked = isPurchased(book.slug || book._id);
          return (
            <div
              key={book._id || book.slug}
              className="bento-card rounded-3xl p-5 border border-[#F59E0B]/25 hover:border-[#F59E0B]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Top Badge & Cover */}
                <div className="relative h-56 rounded-2xl overflow-hidden border border-[#F59E0B]/30 mb-4 bg-[#120E0A]">
                  <img
                    src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-black/30" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#0A0908]/90 text-amber-300 border border-[#F59E0B]/40 backdrop-blur-md">
                      {book.religion}
                    </span>
                  </div>

                  {unlocked ? (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1C1610]/90 border border-[#F59E0B]/50 text-amber-300 text-[10px] font-bold backdrop-blur-md">
                      Ch 1 Free • ₹{book.price || 49}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-heading font-bold text-lg text-[#FFFBEB] drop-shadow-md">
                      {book.title}
                    </h3>
                    <p className="text-[11px] text-amber-200/80 font-medium">
                      {book.author || 'Critical Manuscript Edition'}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-4">
                  {book.description}
                </p>

                {/* Badges */}
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-5">
                  <span className="px-2 py-0.5 rounded-lg bg-[#18130E] border border-stone-800">
                    {book.totalChapters || 1} Adhyays / Surahs
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#18130E] border border-stone-800">
                    {book.language || 'Multi-Lingual'}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#18130E] border border-stone-800 text-amber-300">
                    Audio Synced 🎧
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-800/80">
                <Link
                  href={`/reader/${book.slug}/1`}
                  className="py-2.5 px-3 rounded-xl bg-[#1C1610] hover:bg-[#2A1F13] text-amber-200 text-xs font-bold border border-[#F59E0B]/30 transition flex items-center justify-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Verse</span>
                </Link>

                <Link
                  href={`/reader/${book.slug}/1`}
                  className="py-2.5 px-3 rounded-xl btn-gold-glow text-[#0A0908] text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen Vani 🎧</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <UnlockCheckoutModal
        isOpen={!!selectedBookForUnlock}
        onClose={() => setSelectedBookForUnlock(null)}
        book={selectedBookForUnlock || SEED_BOOKS[0]}
        onSuccess={() => {
          setSelectedBookForUnlock(null);
          fetchCatalog();
        }}
      />
    </div>
  );
}
