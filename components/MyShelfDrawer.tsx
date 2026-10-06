'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Bookmark, Clock, Download, Play, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';

interface MyShelfDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAudio?: (title: string, audioUrl: string) => void;
}

export default function MyShelfDrawer({ isOpen, onClose, onPlayAudio }: MyShelfDrawerProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks' | 'downloads'>('history');

  const recentHistory = [
    {
      title: 'Agni Puran (अग्नि पुराण)',
      slug: 'agni-puran',
      chapter: 1,
      chapterTitle: 'अध्याय १: अग्निपुराण माहात्म्य एवं उपोद्घात',
      progress: 'Verse 4 / 6',
      time: '10 mins ago',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    },
    {
      title: 'Shrimad Bhagavad Gita',
      slug: 'bhagavad-gita',
      chapter: 1,
      chapterTitle: 'अध्याय १: अर्जुनविषादयोग',
      progress: 'Verse 2 / 2',
      time: 'Yesterday',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    },
    {
      title: 'The Holy Quran',
      slug: 'the-holy-quran',
      chapter: 1,
      chapterTitle: 'سورة الفاتحة (The Opening)',
      progress: 'Verse 4 / 4',
      time: '2 days ago',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
    },
  ];

  const bookmarkedVerses = [
    {
      bookTitle: 'Agni Puran',
      slug: 'agni-puran',
      chapter: 1,
      script: 'ॐ नमः परमात्मने वासुदेवाय। यतो वा इमानि भूतानि जायन्ते...',
      meaning: 'उस सच्चिदानन्दघन परमात्मा वासुदेव को बारंबार नमस्कार है...',
      date: 'Saved Oct 04',
    },
    {
      bookTitle: 'Sri Japji Sahib',
      slug: 'japji-sahib',
      chapter: 1,
      script: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ...',
      meaning: 'ईश्वर एक है, उसका नाम सत्य है, वह सृष्टिकर्ता है...',
      date: 'Saved Oct 02',
    },
    {
      bookTitle: 'The Dhammapada',
      slug: 'dhammapada',
      chapter: 1,
      script: 'मनोपुब्बङ्गमा धम्मा मनोसेट्ठा मनोमया...',
      meaning: 'सभी मानसिक अवस्थाओं का आधार मन ही है...',
      date: 'Saved Sep 28',
    },
  ];

  const offlineDownloads = [
    {
      title: 'Agni Puran - Chapter 1 Audio & Manuscript',
      size: '14.2 MB',
      status: 'Ready Offline',
      slug: 'agni-puran',
      chapter: 1,
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    },
    {
      title: 'Bhagavad Gita - Complete Chapter 1 Chant',
      size: '9.8 MB',
      status: 'Ready Offline',
      slug: 'bhagavad-gita',
      chapter: 1,
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#120F0C] border-l border-[#F59E0B]/30 flex flex-col shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-5 border-b border-[#F59E0B]/20 flex items-center justify-between bg-[#18130E]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#FEF3C7]">My Sacred Shelf</h3>
              <p className="text-[11px] text-amber-300/80 font-medium">
                Personal Sanctuary & Reading Progress
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-[#0E0B08] border-b border-stone-800 flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-md'
                : 'text-stone-300 hover:text-amber-200 hover:bg-[#1A140F]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-md'
                : 'text-stone-300 hover:text-amber-200 hover:bg-[#1A140F]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarks</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'downloads'
                ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-md'
                : 'text-stone-300 hover:text-amber-200 hover:bg-[#1A140F]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Offline ({offlineDownloads.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'history' && (
            <div className="space-y-3">
              {recentHistory.map((item, idx) => (
                <div key={idx} className="bento-card rounded-2xl p-4 transition hover:border-[#F59E0B]/60">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#FFFBEB]">{item.title}</h4>
                      <span className="text-[11px] text-amber-300/80 font-medium block">
                        {item.chapterTitle}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-semibold">{item.time}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-800/80">
                    <span className="text-[11px] text-stone-300 font-bold bg-[#1C1610] px-2 py-0.5 rounded-md">
                      {item.progress}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayAudio && onPlayAudio(item.title, item.audioUrl)}
                        className="p-1.5 rounded-lg bg-[#2A1E12] hover:bg-[#3E2B18] text-[#FEF3C7] border border-[#F59E0B]/30 transition"
                        title="Resume Audio"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#FEF3C7]" />
                      </button>
                      <Link
                        href={`/reader/${item.slug}/${item.chapter}`}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0A0908] text-xs font-bold transition flex items-center gap-1"
                      >
                        <span>Resume</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-3">
              {bookmarkedVerses.map((verse, idx) => (
                <div key={idx} className="bento-card rounded-2xl p-4 transition hover:border-[#F59E0B]/60">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-amber-300">{verse.bookTitle}</span>
                    <span className="text-[10px] text-stone-400">{verse.date}</span>
                  </div>
                  <p className="font-heading text-xs text-[#FFFBEB] font-semibold mb-1 leading-relaxed">
                    {verse.script}
                  </p>
                  <p className="text-[11px] text-stone-300 line-clamp-2">{verse.meaning}</p>
                  <div className="mt-3 pt-2 border-t border-stone-800 flex justify-end">
                    <Link
                      href={`/reader/${verse.slug}/${verse.chapter}`}
                      onClick={onClose}
                      className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Open in Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="space-y-3">
              {offlineDownloads.map((item, idx) => (
                <div key={idx} className="bento-card rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#FFFBEB]">{item.title}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold mt-1 block">
                      ● {item.status} ({item.size})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPlayAudio && onPlayAudio(item.title, item.audioUrl)}
                      className="p-2 rounded-xl bg-[#F59E0B] text-[#0A0908] hover:scale-105 transition"
                      title="Play Offline"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#0A0908]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0E0B08] text-center">
          <Link
            href="/my-shelf"
            onClick={onClose}
            className="text-xs font-bold text-amber-300 hover:text-white underline"
          >
            Manage Complete Shelf & Watermarked Books ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
