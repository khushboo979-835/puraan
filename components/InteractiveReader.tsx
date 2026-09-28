'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Lock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Languages,
  Type,
  Sun,
  Moon,
  Compass,
  Check,
  Download,
  Share2,
  Sliders,
  Maximize2
} from 'lucide-react';
import AmbientSoundscape from './AmbientSoundscape';
import UnlockCheckoutModal from './UnlockCheckoutModal';
import { useAuth } from '@/context/AuthContext';

export interface VerseItem {
  sentenceId: string;
  originalScript: string;
  hindiTranslation: string;
  englishTranslation?: string;
  transliteration?: string;
  startTime: number;
  endTime: number;
}

export interface ReaderProps {
  slug: string;
  chapterNumber: number;
  book: {
    _id: string;
    title: string;
    slug: string;
    religion: string;
    author: string;
    language: string;
    totalChapters: number;
    price: number;
    coverImageUrl?: string;
  };
  chapter: {
    _id?: string;
    chapterNumber: number;
    title: string;
    audioUrl: string;
    summary?: string;
    verses: VerseItem[];
  };
  locked?: boolean;
  initialBookmark?: {
    sentenceId?: string;
    audioTimestamp?: number;
  };
}

export default function InteractiveReader({
  slug,
  chapterNumber,
  book,
  chapter,
  locked = false,
  initialBookmark,
}: ReaderProps) {
  const router = useRouter();
  const { user, isPurchased } = useAuth();

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Active Highlighted Verse
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(
    initialBookmark?.sentenceId || (chapter?.verses?.[0]?.sentenceId ?? null)
  );

  // Reader Settings & Themes
  const [readingTheme, setReadingTheme] = useState<'dark' | 'sepia' | 'parchment' | 'midnight'>('dark');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Modals & UI Controls
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [bookmarkSavedToast, setBookmarkSavedToast] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // Verse DOM references for smooth auto-scrolling
  const verseElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const isUnlocked = chapterNumber === 1 || (book?._id && isPurchased(book._id));

  // Determine current active verse based on audio currentTime
  useEffect(() => {
    if (!chapter?.verses || chapter.verses.length === 0) return;

    const currentVerse = chapter.verses.find(
      (v) => currentTime >= v.startTime && currentTime <= v.endTime + 0.3
    );

    if (currentVerse && currentVerse.sentenceId !== activeSentenceId) {
      setActiveSentenceId(currentVerse.sentenceId);

      // Smooth center scroll
      if (autoScrollEnabled && verseElementsRef.current[currentVerse.sentenceId]) {
        verseElementsRef.current[currentVerse.sentenceId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentTime, chapter?.verses, autoScrollEnabled, activeSentenceId]);

  // Audio synchronization handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioLoaded(true);

      // Resume from bookmark if available
      if (initialBookmark?.audioTimestamp && initialBookmark.audioTimestamp > 0) {
        audioRef.current.currentTime = initialBookmark.audioTimestamp;
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Audio playback error:', e);
        });
    }
  };

  // Jump to specific verse when clicked
  const handleVerseClick = (verse: VerseItem) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = verse.startTime;
    setCurrentTime(verse.startTime);
    setActiveSentenceId(verse.sentenceId);
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
    saveBookmark(verse.sentenceId, verse.startTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Auto-Save Reading Bookmark to Database and LocalStorage
  const saveBookmark = async (sentenceId?: string, timestamp?: number) => {
    const sId = sentenceId || activeSentenceId || 'start';
    const ts = timestamp !== undefined ? timestamp : currentTime;

    try {
      localStorage.setItem(
        `sacred_progress_${slug}`,
        JSON.stringify({
          bookId: book._id,
          chapterNumber,
          sentenceId: sId,
          audioTimestamp: ts,
          updatedAt: new Date().toISOString(),
        })
      );

      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book._id,
          chapterNumber,
          sentenceId: sId,
          audioTimestamp: ts,
        }),
      });

      setBookmarkSavedToast(true);
      setTimeout(() => setBookmarkSavedToast(false), 2000);
    } catch (e) {
      console.warn('Bookmark save failed:', e);
    }
  };

  // Auto-save every 15 seconds during continuous playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (activeSentenceId) {
        saveBookmark(activeSentenceId, currentTime);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isPlaying, activeSentenceId, currentTime]);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Typography font size classes
  const fontClassMap = {
    sm: { script: 'text-lg leading-relaxed', trans: 'text-xs leading-normal' },
    md: { script: 'text-2xl sm:text-3xl leading-relaxed sm:leading-loose', trans: 'text-sm sm:text-base leading-relaxed' },
    lg: { script: 'text-3xl sm:text-4xl leading-relaxed sm:leading-loose', trans: 'text-base sm:text-lg leading-relaxed' },
    xl: { script: 'text-4xl sm:text-5xl leading-relaxed sm:leading-loose', trans: 'text-lg sm:text-xl leading-relaxed' },
  };

  // Theme styling
  const themeClasses = {
    dark: 'bg-[#0e1017] text-stone-100',
    sepia: 'bg-[#f7f0e0] text-[#3e2d19]',
    parchment: 'bg-[#fdfaf5] text-[#241d15]',
    midnight: 'bg-[#050608] text-stone-200',
  };

  const verseContainerTheme = {
    dark: {
      normal: 'bg-[#151822]/70 hover:bg-[#1b202e] border-stone-800/80',
      active: 'bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50',
      textScript: 'text-amber-100',
      textHindi: 'text-amber-200/90',
      textEng: 'text-stone-400',
    },
    sepia: {
      normal: 'bg-[#ede3ce]/70 hover:bg-[#e4d7bf] border-[#d8c5a4]',
      active: 'bg-[#faecd1] border-[#c57024] shadow-md ring-1 ring-[#c57024]/50',
      textScript: 'text-[#5a2e0e]',
      textHindi: 'text-[#6b3c1a]',
      textEng: 'text-[#7a5a41]',
    },
    parchment: {
      normal: 'bg-white/90 hover:bg-stone-50 border-stone-200 shadow-sm',
      active: 'bg-[#fff9ed] border-amber-600 shadow-md ring-1 ring-amber-500/40',
      textScript: 'text-stone-900',
      textHindi: 'text-stone-800',
      textEng: 'text-stone-600',
    },
    midnight: {
      normal: 'bg-[#0d0f15]/80 hover:bg-[#141721] border-stone-900',
      active: 'bg-amber-950/30 border-amber-500/90 shadow-xl ring-1 ring-amber-500/60',
      textScript: 'text-amber-200',
      textHindi: 'text-stone-200',
      textEng: 'text-stone-400',
    },
  };

  const currentThemeStyles = verseContainerTheme[readingTheme];

  if (locked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#131620] border border-amber-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Premium Scripture</span>
            <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">Chapter {chapterNumber} is Locked</h2>
            <p className="text-xs text-stone-400 mt-2">
              Chapter 1 of {book.title} is 100% free to read and listen. Chapters 2 onwards require full digital access.
            </p>
          </div>

          <div className="p-4 bg-stone-900/90 rounded-2xl border border-stone-800 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-400">Access Type:</span>
              <span className="font-semibold text-emerald-400">Permanent Lifetime DRM License</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Unlock Price:</span>
              <span className="font-bold text-amber-400 text-sm">₹{book.price}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setUnlockModalOpen(true)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 text-stone-950 font-bold rounded-2xl shadow-xl transition"
            >
              Unlock All Chapters for ₹{book.price}
            </button>
            <Link
              href={`/reader/${slug}/1`}
              className="block w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold rounded-xl border border-stone-800 transition"
            >
              ← Read Free Chapter 1 Instead
            </Link>
          </div>
        </div>

        <UnlockCheckoutModal
          isOpen={unlockModalOpen}
          onClose={() => setUnlockModalOpen(false)}
          book={book}
          onSuccess={() => {
            setUnlockModalOpen(false);
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-36 ${themeClasses[readingTheme]}`}>
      {/* Hidden HTML5 Audio Element for synced playback */}
      <audio
        ref={audioRef}
        src={chapter?.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-opacity-90 border-b border-stone-800/60 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <Link
              href={`/book/${slug}`}
              className="p-2 rounded-xl bg-stone-800/60 hover:bg-stone-700/80 text-stone-300 transition"
              title="Return to Book Overview"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  {book.religion}
                </span>
                <span className="text-xs text-stone-400 truncate hidden sm:inline">{book.title}</span>
              </div>
              <h1 className="text-sm sm:text-base font-serif font-bold text-stone-100 truncate mt-0.5">
                {chapter.title}
              </h1>
            </div>
          </div>

          {/* Reader Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Ambient Soundscape Controller */}
            <AmbientSoundscape initialSound="flute" initialVolume={0.3} />

            {/* Bookmark progress button */}
            <button
              onClick={() => saveBookmark()}
              className="p-2 rounded-xl bg-stone-800/60 hover:bg-stone-700/80 text-amber-400 transition"
              title="Save Bookmark"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Settings trigger */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800/60 hover:bg-stone-700/80 text-xs font-medium text-stone-300 transition"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Settings Drawer */}
        {showSettingsDrawer && (
          <div className="max-w-5xl mx-auto mt-3 p-4 bg-[#141722] border border-amber-900/40 rounded-2xl shadow-2xl text-stone-200 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Theme Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Reading Sanctuary Theme
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => setReadingTheme('dark')}
                    className={`py-2 px-1 rounded-lg border text-center font-medium ${
                      readingTheme === 'dark' ? 'bg-stone-800 border-amber-500 text-amber-300' : 'bg-stone-900 border-stone-800'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setReadingTheme('sepia')}
                    className={`py-2 px-1 rounded-lg border text-center font-medium ${
                      readingTheme === 'sepia' ? 'bg-[#ede3ce] border-amber-700 text-[#3e2d19]' : 'bg-[#e5dac3] text-[#3e2d19]'
                    }`}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => setReadingTheme('parchment')}
                    className={`py-2 px-1 rounded-lg border text-center font-medium ${
                      readingTheme === 'parchment' ? 'bg-white border-amber-600 text-stone-900' : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setReadingTheme('midnight')}
                    className={`py-2 px-1 rounded-lg border text-center font-medium ${
                      readingTheme === 'midnight' ? 'bg-black border-amber-500 text-amber-200' : 'bg-stone-950 border-stone-900'
                    }`}
                  >
                    OLED
                  </button>
                </div>
              </div>

              {/* Font Size Adjuster */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Sacred Typography Size
                </label>
                <div className="flex items-center space-x-1.5">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`flex-1 py-1.5 rounded-lg border text-center font-bold uppercase text-xs ${
                        fontSize === sz ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-900 border-stone-800 text-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multilingual Display Toggles */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Script & Translations
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHindi(!showHindi)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium text-[11px] ${
                      showHindi ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-900 border-stone-800 text-stone-500'
                    }`}
                  >
                    Hindi {showHindi ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium text-[11px] ${
                      showEnglish ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-900 border-stone-800 text-stone-500'
                    }`}
                  >
                    English {showEnglish ? '✓' : ''}
                  </button>
                  <button
                    onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium text-[11px] ${
                      autoScrollEnabled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-stone-900 border-stone-800 text-stone-500'
                    }`}
                  >
                    Auto-Center {autoScrollEnabled ? '✓' : 'Off'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bookmark Saved Notification */}
      {bookmarkSavedToast && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-stone-950 font-bold px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2 text-xs animate-in slide-in-from-top-2 duration-150">
          <Check className="w-4 h-4" />
          <span>Reading progress synchronized to shelf!</span>
        </div>
      )}

      {/* Main Scripture Verses Reader Stream */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Chapter Prologue Header */}
        <div className="text-center mb-10 pb-8 border-b border-stone-800/40">
          <span className="text-amber-500 text-3xl font-serif">ॐ</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight mt-2 text-amber-200">
            {chapter.title}
          </h2>
          {chapter.summary && (
            <p className="mt-3 text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto italic font-serif leading-relaxed">
              "{chapter.summary}"
            </p>
          )}
          <div className="flex items-center justify-center space-x-4 mt-4 text-[11px] text-stone-400">
            <span>{chapter.verses?.length || 0} Synced Verses</span>
            <span>•</span>
            <span>Click any verse to instantly jump audio</span>
            <span>•</span>
            <span>Karaoke Real-Time Highlighting</span>
          </div>
        </div>

        {/* Verses List */}
        <div className="space-y-6">
          {chapter.verses?.map((verse, index) => {
            const isActive = activeSentenceId === verse.sentenceId;
            return (
              <div
                key={verse.sentenceId}
                ref={(el) => {
                  verseElementsRef.current[verse.sentenceId] = el;
                }}
                onClick={() => handleVerseClick(verse)}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-7 border transition-all duration-300 relative ${
                  isActive ? currentThemeStyles.active : currentThemeStyles.normal
                }`}
              >
                {/* Active Playing Indicator Pill */}
                {isActive && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md">
                    <Sparkles className="w-2.5 h-2.5 animate-spin" />
                    <span>Reciting Now</span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Verse Index Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-serif font-bold ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 shadow-md'
                          : 'bg-stone-800/80 text-stone-400 group-hover:text-amber-300'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Sacred Text Content */}
                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Original Script (Devanagari, Arabic, Gurmukhi, Hebrew) */}
                    <p
                      className={`font-serif font-semibold tracking-wide ${fontClassMap[fontSize].script} ${
                        isActive ? currentThemeStyles.textScript : ''
                      }`}
                    >
                      {verse.originalScript}
                    </p>

                    {/* Transliteration if available */}
                    {showTransliteration && verse.transliteration && (
                      <p className="text-xs italic text-amber-400/80 font-serif">
                        {verse.transliteration}
                      </p>
                    )}

                    {/* Hindi Translation */}
                    {showHindi && verse.hindiTranslation && (
                      <div className="pt-2 border-t border-stone-800/40">
                        <p className={`font-serif ${fontClassMap[fontSize].trans} ${currentThemeStyles.textHindi}`}>
                          <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-amber-500/80 mr-1.5">
                            भावार्थ:
                          </span>
                          {verse.hindiTranslation}
                        </p>
                      </div>
                    )}

                    {/* English Meaning */}
                    {showEnglish && verse.englishTranslation && (
                      <p className={`text-xs sm:text-sm font-sans italic opacity-85 ${currentThemeStyles.textEng}`}>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mr-1.5 not-italic">
                          Meaning:
                        </span>
                        {verse.englishTranslation}
                      </p>
                    )}
                  </div>

                  {/* Timestamp Tag */}
                  <div className="flex-shrink-0 text-right opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-stone-400 bg-stone-900/60 px-2 py-1 rounded-md">
                      {formatTime(verse.startTime)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {chapterNumber > 1 ? (
              <Link
                href={`/reader/${slug}/${chapterNumber - 1}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter {chapterNumber - 1}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="text-center">
            <span className="text-xs text-stone-400">
              Chapter {chapterNumber} of {book.totalChapters}
            </span>
          </div>

          <div>
            {chapterNumber < book.totalChapters && (
              <Link
                href={`/reader/${slug}/${chapterNumber + 1}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-md"
              >
                <span>Next Chapter {chapterNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Persistent Bottom Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f17]/95 backdrop-blur-xl border-t border-amber-950/60 px-4 sm:px-8 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto space-y-2">
          {/* Seek Progress Bar */}
          <div className="flex items-center space-x-3 text-[11px] font-mono text-stone-400">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 group flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2 transition-all"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls Strip */}
          <div className="flex items-center justify-between gap-2">
            {/* Left: Current Active Verse Info */}
            <div className="hidden md:flex items-center space-x-3 max-w-xs truncate">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xs flex-shrink-0">
                ॐ
              </div>
              <div className="truncate">
                <p className="text-xs font-serif font-semibold text-stone-200 truncate">{chapter.title}</p>
                <p className="text-[10px] text-amber-400 truncate">
                  {activeSentenceId ? `Syncing Verse ${activeSentenceId}` : 'Ready to recite'}
                </p>
              </div>
            </div>

            {/* Center: Play / Pause / Skip controls */}
            <div className="flex items-center space-x-3 sm:space-x-4 mx-auto">
              <button
                onClick={() => skipSeconds(-5)}
                className="p-2 text-stone-400 hover:text-amber-300 transition"
                title="Rewind 5 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-bold flex items-center justify-center shadow-lg hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
              </button>

              <button
                onClick={() => skipSeconds(5)}
                className="p-2 text-stone-400 hover:text-amber-300 transition"
                title="Forward 5 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Playback Speed & Volume */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Playback speed toggle */}
              <div className="relative group">
                <button className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono font-semibold text-amber-300 hover:bg-stone-800">
                  {playbackRate}x
                </button>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex flex-col bg-stone-900 border border-stone-800 rounded-xl p-1.5 shadow-xl z-50">
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition text-left ${
                        playbackRate === rate ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-stone-400 hover:bg-stone-800'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div className="hidden sm:flex items-center space-x-1.5">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      const newMute = !isMuted;
                      setIsMuted(newMute);
                      audioRef.current.muted = newMute;
                    }
                  }}
                  className="p-1.5 text-stone-400 hover:text-stone-200"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setIsMuted(false);
                    if (audioRef.current) {
                      audioRef.current.volume = v;
                      audioRef.current.muted = false;
                    }
                  }}
                  className="w-16 h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
