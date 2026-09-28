'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, Play, Compass, ArrowRight } from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import UnlockCheckoutModal from '@/components/UnlockCheckoutModal';

export default function CatalogPage() {
  const { isPurchased } = useAuth();
  const [books, setBooks] = useState<any[]>(SEED_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<any | null>(null);

  const religions = ['All', 'Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism'];
  const languages = ['All', 'Sanskrit', 'Hindi', 'Arabic', 'Gurmukhi', 'Hebrew', 'Pali', 'English'];

  useEffect(() => {
    fetchCatalog();
  }, [selectedReligion, selectedLanguage]);

  const fetchCatalog = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedReligion !== 'All') params.set('religion', selectedReligion);
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
      console.warn('API error, using seed books');
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchTerm === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReligion = selectedReligion === 'All' || book.religion === selectedReligion;
    const matchesLanguage =
      selectedLanguage === 'All' ||
      book.language.toLowerCase().includes(selectedLanguage.toLowerCase());
    const matchesPrice = book.price <= maxPrice;

    return matchesSearch && matchesReligion && matchesLanguage && matchesPrice;
  });

  return (
    <div className="min-h-screen text-[#000000] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#faebb8] border-2 border-[#784805] text-[#000000] text-xs font-black shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#000000]" />
          <span>Universal Sacred Scripture Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-[#000000]">
          Sacred Texts & Critical Editions
        </h1>
        <p className="text-sm font-bold text-[#2b1802] max-w-xl mx-auto">
          Explore authentic scriptures from all major world faiths. Chapter 1 is always free with interactive synchronized audio.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#faebb8] border-3 border-[#784805] rounded-3xl p-6 mb-10 space-y-4 shadow-md">
        {/* Search Row */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#000000] absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search by scripture title, sage / author, or keyword (e.g. Agni Puran, Gita, Quran)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[#fff6db] border-2 border-[#784805] rounded-2xl text-xs sm:text-sm text-[#000000] placeholder-[#5c3b10] focus:outline-none focus:border-black font-bold shadow-xs"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t-2 border-[#784805] text-xs">
          {/* Religion Filter */}
          <div>
            <label className="block text-[#000000] font-black mb-1.5">Faith Tradition</label>
            <select
              value={selectedReligion}
              onChange={(e) => setSelectedReligion(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#fff6db] border-2 border-[#784805] rounded-xl text-[#000000] font-bold focus:outline-none focus:border-black"
            >
              {religions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-[#000000] font-black mb-1.5">Original Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#fff6db] border-2 border-[#784805] rounded-xl text-[#000000] font-bold focus:outline-none focus:border-black"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between text-[#000000] font-black mb-1.5">
              <span>Max Digital Price:</span>
              <span className="text-[#000000]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="199"
              max="500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#d6a542] rounded-lg appearance-none cursor-pointer accent-[#1a0e02]"
            />
          </div>
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-[#000000]">
          Showing <strong className="text-[#000000] text-sm underline">{filteredBooks.length}</strong> sacred scriptures
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const owned = book._id ? isPurchased(book._id) : false;
          return (
            <div
              key={book.slug}
              className="bg-[#faebb8] hover:bg-[#fff2cc] border-2 border-[#784805] hover:border-black rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative bg-[#e0ba63] border-2 border-[#784805]">
                  <img
                    src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#000000] bg-[#faebb8]/95 backdrop-blur-xs px-2.5 py-1 rounded-md border-2 border-[#784805] shadow-xs">
                      {book.religion}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#106b2b] text-white shadow-xs border border-[#063b15]">
                      Ch 1 Free
                    </span>
                    {owned && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#1a0e02] text-[#ffdc82] border border-[#784805]">
                        Unlocked
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-heading font-black text-lg text-[#000000] group-hover:underline transition-all line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-[#2b1802] mt-0.5 line-clamp-1 font-bold">
                  {book.author} • {book.language}
                </p>

                <p className="text-xs text-[#1a0e02] font-semibold mt-3 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-[#a87625] text-xs text-[#000000]">
                  <div className="flex items-center space-x-1 text-[#000000] font-black">
                    <Star className="w-3.5 h-3.5 fill-[#000000]" />
                    <span>{book.rating || 4.9}</span>
                  </div>
                  <span className="font-bold">{book.totalChapters} Chapters</span>
                  <span className="font-black text-[#000000] text-sm">₹{book.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <Link
                  href={`/reader/${book.slug}/1`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#1a0e02] hover:bg-[#331c04] text-[#ffdc82] font-black text-xs text-center transition flex items-center justify-center space-x-1.5 shadow-sm border border-[#784805]"
                >
                  <Play className="w-3 h-3 fill-[#ffdc82]" />
                  <span>Free Ch 1 Reader</span>
                </Link>

                <Link
                  href={`/book/${book.slug}`}
                  className="p-2.5 rounded-xl bg-[#fff3d4] hover:bg-[#ffeab3] text-[#000000] border-2 border-[#784805] transition font-bold"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {selectedBookForUnlock && (
        <UnlockCheckoutModal
          isOpen={!!selectedBookForUnlock}
          onClose={() => setSelectedBookForUnlock(null)}
          book={selectedBookForUnlock}
          onSuccess={() => {
            setSelectedBookForUnlock(null);
            fetchCatalog();
          }}
        />
      )}
    </div>
  );
}
