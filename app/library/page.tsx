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
import Scripture3DCard from '@/components/Scripture3DCard';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Scripture3DCard
            key={book.slug}
            book={book}
          />
        ))}
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
