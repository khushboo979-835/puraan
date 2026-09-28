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
  Check,
  Download,
  Sliders,
  Mic,
  Music,
  SkipForward,
  SkipBack,
  Volume1
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

  // Mode: 'vocal' (Speaks text line by line using SpeechSynthesis) or 'instrumental' (Plays background mp3)
  const [audioMode, setAudioMode] = useState<'vocal' | 'instrumental'>('vocal');
  const [vocalVoiceContent, setVocalVoiceContent] = useState<'original' | 'hindi' | 'both'>('both');

  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0.9); // Devotional pacing
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Audio Ref for Instrumental Mode / Background Music
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Active Highlighted Verse
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(
    initialBookmark?.sentenceId || (chapter?.verses?.[0]?.sentenceId ?? null)
  );

  // SpeechSynthesis Utterance Reference
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(false);

  // Reader Settings & Themes
  const [readingTheme, setReadingTheme] = useState<'gold' | 'parchment' | 'dark' | 'sepia'>('gold');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Modals & UI Controls
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [bookmarkSavedToast, setBookmarkSavedToast] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // Verse DOM references for smooth auto-scrolling
  const verseElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const verses = chapter?.verses || [];

  // Initialize SpeechSynthesis and voice list
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (synthRef.current) {
          const v = synthRef.current.getVoices();
          setAvailableVoices(v);
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Determine speech language code based on religion and content
  const getSpeechLanguageCode = () => {
    if (vocalVoiceContent === 'hindi' || vocalVoiceContent === 'both') return 'hi-IN';
    switch (book.religion) {
      case 'Hinduism':
      case 'Jainism':
      case 'Buddhism':
        return 'hi-IN';
      case 'Sikhism':
        return 'hi-IN';
      case 'Islam':
        return 'ar-SA';
      case 'Christianity':
        return 'hi-IN';
      default:
        return 'hi-IN';
    }
  };

  // Find best speech synthesis voice (prefer Indian Hindi voices)
  const getPreferredVoice = (langCode: string) => {
    if (!synthRef.current) return null;
    const allVoices = synthRef.current.getVoices().length > 0 ? synthRef.current.getVoices() : availableVoices;
    const match =
      allVoices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase()) ||
      allVoices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('hi')) ||
      allVoices.find((v) => v.lang.toLowerCase().includes('in')) ||
      allVoices[0];
    return match || null;
  };

  // Speak a specific verse by index in Vocal Mode
  const speakVerse = (index: number) => {
    if (!synthRef.current || index < 0 || index >= verses.length) {
      setIsPlaying(false);
      return;
    }

    synthRef.current.cancel(); // Stop any currently playing utterance

    const targetVerse = verses[index];
    setCurrentVerseIndex(index);
    setActiveSentenceId(targetVerse.sentenceId);

    // Smooth auto-centering scroll
    if (autoScrollEnabled && verseElementsRef.current[targetVerse.sentenceId]) {
      verseElementsRef.current[targetVerse.sentenceId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    // Determine text to speak (Both: speaks Shloka + pauses + speaks Hindi meaning)
    let speechText = '';
    if (vocalVoiceContent === 'original') {
      speechText = targetVerse.originalScript;
    } else if (vocalVoiceContent === 'hindi') {
      speechText = targetVerse.hindiTranslation;
    } else {
      // Both: Speaks original verse, then announces and speaks Hindi meaning
      const hindiPart = targetVerse.hindiTranslation ? `। भावार्थ। ${targetVerse.hindiTranslation}` : '';
      speechText = `${targetVerse.originalScript}${hindiPart}`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    const langCode = getSpeechLanguageCode();
    utterance.lang = langCode;
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : volume;

    const voice = getPreferredVoice(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      // If still playing, automatically proceed to the next verse
      if (isPlayingRef.current) {
        if (index + 1 < verses.length) {
          setTimeout(() => {
            speakVerse(index + 1);
          }, 800); // Respectful pause between verses
        } else {
          setIsPlaying(false);
        }
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      if (index + 1 < verses.length && isPlayingRef.current) {
        setTimeout(() => speakVerse(index + 1), 1000);
      } else {
        setIsPlaying(false);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    saveBookmark(targetVerse.sentenceId, targetVerse.startTime);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (audioMode === 'vocal') {
      if (isPlaying) {
        if (synthRef.current) {
          synthRef.current.cancel();
        }
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        isPlayingRef.current = true;
        speakVerse(currentVerseIndex);
      }
    } else {
      // Instrumental Mode
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.warn('Audio play error:', e));
      }
    }
  };

  // When user clicks ANY verse, immediately speak/jump to that verse!
  const handleVerseClick = (verse: VerseItem, index: number) => {
    setActiveSentenceId(verse.sentenceId);
    setCurrentVerseIndex(index);

    if (audioMode === 'vocal') {
      setIsPlaying(true);
      isPlayingRef.current = true;
      speakVerse(index);
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = verse.startTime;
        setCurrentTime(verse.startTime);
        if (!isPlaying) {
          audioRef.current.play().then(() => setIsPlaying(true));
        }
      }
    }
    saveBookmark(verse.sentenceId, verse.startTime);
  };

  const handleNextVerse = () => {
    if (currentVerseIndex + 1 < verses.length) {
      if (audioMode === 'vocal') {
        speakVerse(currentVerseIndex + 1);
      } else {
        const next = verses[currentVerseIndex + 1];
        handleVerseClick(next, currentVerseIndex + 1);
      }
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex - 1 >= 0) {
      if (audioMode === 'vocal') {
        speakVerse(currentVerseIndex - 1);
      } else {
        const prev = verses[currentVerseIndex - 1];
        handleVerseClick(prev, currentVerseIndex - 1);
      }
    }
  };

  // Change Vocal Playback Speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    if (isPlaying && audioMode === 'vocal') {
      speakVerse(currentVerseIndex);
    }
  };

  // Time update for Instrumental audio mode
  const handleTimeUpdate = () => {
    if (audioMode === 'instrumental' && audioRef.current) {
      const cur = audioRef.current.currentTime;
      setCurrentTime(cur);

      const found = verses.find((v) => cur >= v.startTime && cur <= v.endTime + 0.3);
      if (found && found.sentenceId !== activeSentenceId) {
        setActiveSentenceId(found.sentenceId);
        const idx = verses.findIndex((v) => v.sentenceId === found.sentenceId);
        if (idx >= 0) setCurrentVerseIndex(idx);

        if (autoScrollEnabled && verseElementsRef.current[found.sentenceId]) {
          verseElementsRef.current[found.sentenceId]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }
  };

  // Auto-Save Reading Bookmark
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
      console.warn('Bookmark save error:', e);
    }
  };

  // Typography font size mapping
  const fontClassMap = {
    sm: { script: 'text-xl leading-relaxed', trans: 'text-xs leading-normal' },
    md: { script: 'text-2xl sm:text-3xl leading-relaxed sm:leading-loose', trans: 'text-sm sm:text-base leading-relaxed' },
    lg: { script: 'text-3xl sm:text-4xl leading-relaxed sm:leading-loose', trans: 'text-base sm:text-lg leading-relaxed' },
    xl: { script: 'text-4xl sm:text-5xl leading-relaxed sm:leading-loose', trans: 'text-lg sm:text-xl leading-relaxed' },
  };

  // Theme Styling
  const themeClasses = {
    gold: 'bg-[#ea8913] text-[#000000]',
    parchment: 'bg-[#fffcf4] text-[#1a1a1a]',
    sepia: 'bg-[#faebd1] text-[#2b1802]',
    dark: 'bg-[#0f1118] text-[#f1e9dc]',
  };

  const verseBoxTheme = {
    gold: {
      normal: 'bg-[#ffdca3] hover:bg-[#ffe5b8] border-2 border-[#522700] text-[#000000] shadow-sm',
      active: 'bg-[#fff5dc] border-3 border-[#000000] ring-4 ring-[#ffeaae] shadow-2xl scale-[1.01]',
      textScript: 'text-[#000000] font-black',
      textHindi: 'text-[#1f0f00] font-bold',
      textEng: 'text-[#381b00] font-semibold',
    },
    parchment: {
      normal: 'bg-white hover:bg-[#fffdf8] border-2 border-[#e5cd91] text-[#1a1a1a] shadow-xs',
      active: 'bg-[#fff9eb] border-2 border-[#c59b27] ring-4 ring-[#f5e7c8] shadow-xl',
      textScript: 'text-[#1a1a1a] font-bold',
      textHindi: 'text-[#333333]',
      textEng: 'text-[#555555]',
    },
    sepia: {
      normal: 'bg-[#f4e0bc] border-2 border-[#784805] text-[#2b1802]',
      active: 'bg-[#fff1d6] border-2 border-[#2b1802] ring-3 ring-[#e5c188] shadow-xl',
      textScript: 'text-[#1f0f00] font-bold',
      textHindi: 'text-[#2b1802]',
      textEng: 'text-[#472905]',
    },
    dark: {
      normal: 'bg-[#151822]/80 border border-stone-800 text-stone-200',
      active: 'bg-[#222838] border-2 border-[#e69a28] ring-3 ring-amber-500/30 text-white shadow-2xl',
      textScript: 'text-amber-200 font-bold',
      textHindi: 'text-stone-300',
      textEng: 'text-stone-400',
    },
  };

  const currentTheme = verseBoxTheme[readingTheme];

  if (locked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#ea8913]">
        <div className="max-w-md w-full bg-[#ffdca3] border-3 border-[#522700] rounded-3xl p-8 text-center shadow-2xl space-y-6 text-[#000000]">
          <div className="w-16 h-16 bg-[#1f0f00] border-2 border-[#522700] rounded-full flex items-center justify-center mx-auto text-[#ffd99e]">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#000000] font-black">Premium Scripture</span>
            <h2 className="text-2xl font-heading font-black text-[#000000] mt-1">Chapter {chapterNumber} is Locked</h2>
            <p className="text-xs text-[#2b1400] font-bold mt-2">
              Chapter 1 of {book.title} is 100% free to read and listen. Chapters 2 onwards require full digital access.
            </p>
          </div>

          <div className="p-4 bg-[#fff4d6] rounded-2xl border-2 border-[#522700] text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-bold text-[#2b1400]">Access Type:</span>
              <span className="font-black text-emerald-900">Permanent Lifetime DRM License</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#2b1400]">Unlock Price:</span>
              <span className="font-black text-[#000000] text-sm">₹{book.price}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setUnlockModalOpen(true)}
              className="w-full py-3.5 px-6 bg-[#1f0f00] hover:bg-[#381b00] text-[#ffd99e] font-black rounded-2xl shadow-xl transition border-2 border-[#522700]"
            >
              Unlock All Chapters for ₹{book.price}
            </button>
            <Link
              href={`/reader/${slug}/1`}
              className="block w-full py-2.5 px-4 bg-[#fff4d6] hover:bg-[#ffebbf] text-[#000000] text-xs font-black rounded-xl border-2 border-[#522700] transition"
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
      {/* Hidden Audio Element for Instrumental Mode */}
      <audio
        ref={audioRef}
        src={chapter?.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[#ea8913]/95 border-b-2 border-[#522700] px-4 sm:px-8 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <Link
              href={`/book/${slug}`}
              className="p-2 rounded-xl bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] border-2 border-[#522700] transition font-bold"
              title="Return to Book Overview"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#1f0f00] text-[#ffd99e] border border-[#522700]">
                  {book.religion}
                </span>
                <span className="text-xs text-[#241000] font-bold truncate hidden sm:inline">{book.title}</span>
              </div>
              <h1 className="text-sm sm:text-base font-heading font-black text-[#000000] truncate mt-0.5">
                {chapter.title}
              </h1>
            </div>
          </div>

          {/* Reader Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Ambient Soundscape Controller (Temple Bells / Flute / Rain) */}
            <AmbientSoundscape initialSound="flute" initialVolume={0.25} />

            {/* Bookmark button */}
            <button
              onClick={() => saveBookmark()}
              className="p-2 rounded-xl bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] border-2 border-[#522700] transition font-bold"
              title="Save Bookmark"
            >
              <Bookmark className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Settings trigger */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#ffdca3] hover:bg-[#ffe5b8] text-xs font-black text-[#000000] border-2 border-[#522700] transition"
            >
              <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Settings Drawer */}
        {showSettingsDrawer && (
          <div className="max-w-5xl mx-auto mt-3 p-4 bg-[#ffdca3] border-3 border-[#522700] rounded-2xl shadow-2xl text-[#000000] animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Voice Reciter Content */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#000000] mb-2">
                  Voice Reciter Mode (उच्चारण विकल्प)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => {
                      setVocalVoiceContent('original');
                      if (isPlaying && audioMode === 'vocal') speakVerse(currentVerseIndex);
                    }}
                    className={`py-2 px-1 rounded-lg border-2 text-center font-black ${
                      vocalVoiceContent === 'original'
                        ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                        : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
                    }`}
                  >
                    Original Script
                  </button>
                  <button
                    onClick={() => {
                      setVocalVoiceContent('hindi');
                      if (isPlaying && audioMode === 'vocal') speakVerse(currentVerseIndex);
                    }}
                    className={`py-2 px-1 rounded-lg border-2 text-center font-black ${
                      vocalVoiceContent === 'hindi'
                        ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                        : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
                    }`}
                  >
                    Hindi Meaning
                  </button>
                  <button
                    onClick={() => {
                      setVocalVoiceContent('both');
                      if (isPlaying && audioMode === 'vocal') speakVerse(currentVerseIndex);
                    }}
                    className={`py-2 px-1 rounded-lg border-2 text-center font-black ${
                      vocalVoiceContent === 'both'
                        ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                        : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
                    }`}
                  >
                    Both (दोनों)
                  </button>
                </div>
              </div>

              {/* Font Size Adjuster */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#000000] mb-2">
                  Sacred Typography Size
                </label>
                <div className="flex items-center space-x-1.5">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`flex-1 py-1.5 rounded-lg border-2 text-center font-black uppercase text-xs ${
                        fontSize === sz
                          ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                          : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & Auto Center */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#000000] mb-2">
                  Display Options
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHindi(!showHindi)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border-2 text-center font-black text-[11px] ${
                      showHindi ? 'bg-[#1f0f00] text-[#ffd99e] border-black' : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
                    }`}
                  >
                    Hindi {showHindi ? '✓' : 'Off'}
                  </button>
                  <button
                    onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border-2 text-center font-black text-[11px] ${
                      autoScrollEnabled ? 'bg-[#105c24] text-white border-black' : 'bg-[#fff4d6] border-[#522700] text-[#000000]'
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

      {/* Bookmark Toast */}
      {bookmarkSavedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1f0f00] text-[#ffd99e] font-black px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2 text-xs border-2 border-[#522700] animate-in slide-in-from-top-2 duration-150">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Reading progress synchronized to shelf!</span>
        </div>
      )}

      {/* Main Scripture Verses Reader Stream */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Chapter Header Banner */}
        <div className="text-center mb-10 pb-8 border-b-2 border-[#522700]">
          <span className="text-[#000000] text-3xl font-serif font-black">ॐ</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight mt-2 text-[#000000]">
            {chapter.title}
          </h2>
          {chapter.summary && (
            <p className="mt-3 text-xs sm:text-sm text-[#2b1400] font-bold max-w-2xl mx-auto italic font-serif leading-relaxed">
              "{chapter.summary}"
            </p>
          )}

          {/* Mode Switcher Pill */}
          <div className="inline-flex items-center gap-2 mt-5 p-1.5 bg-[#ffdca3] border-2 border-[#522700] rounded-full shadow-sm">
            <button
              onClick={() => {
                if (isPlaying) {
                  if (synthRef.current) synthRef.current.cancel();
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlaying(false);
                }
                setAudioMode('vocal');
              }}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-black transition ${
                audioMode === 'vocal'
                  ? 'bg-[#1f0f00] text-[#ffd99e] shadow-sm'
                  : 'text-[#000000] hover:bg-[#ffebc2]'
              }`}
            >
              <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>🗣️ Human Voice Reciter (वाणी पाठ)</span>
            </button>
            <button
              onClick={() => {
                if (isPlaying) {
                  if (synthRef.current) synthRef.current.cancel();
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlaying(false);
                }
                setAudioMode('instrumental');
              }}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-black transition ${
                audioMode === 'instrumental'
                  ? 'bg-[#1f0f00] text-[#ffd99e] shadow-sm'
                  : 'text-[#000000] hover:bg-[#ffebc2]'
              }`}
            >
              <Music className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>🎵 Sacred Instrumental (संगीत)</span>
            </button>
          </div>

          {/* Vocal Mode Sub-Options (Shloka + Meaning) */}
          {audioMode === 'vocal' && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-black text-[#000000]">वाचन शैली (Voice Content):</span>
              <button
                onClick={() => {
                  setVocalVoiceContent('both');
                  if (isPlaying) speakVerse(currentVerseIndex);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black border-2 transition ${
                  vocalVoiceContent === 'both'
                    ? 'bg-[#1f0f00] text-[#ffd99e] border-black shadow-md'
                    : 'bg-[#ffdca3] text-[#000000] border-[#522700] hover:bg-[#ffe5b8]'
                }`}
              >
                ✨ श्लोक + भावार्थ (अर्थ सहित बोलें)
              </button>
              <button
                onClick={() => {
                  setVocalVoiceContent('original');
                  if (isPlaying) speakVerse(currentVerseIndex);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black border-2 transition ${
                  vocalVoiceContent === 'original'
                    ? 'bg-[#1f0f00] text-[#ffd99e] border-black shadow-md'
                    : 'bg-[#ffdca3] text-[#000000] border-[#522700] hover:bg-[#ffe5b8]'
                }`}
              >
                📜 केवल श्लोक
              </button>
              <button
                onClick={() => {
                  setVocalVoiceContent('hindi');
                  if (isPlaying) speakVerse(currentVerseIndex);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black border-2 transition ${
                  vocalVoiceContent === 'hindi'
                    ? 'bg-[#1f0f00] text-[#ffd99e] border-black shadow-md'
                    : 'bg-[#ffdca3] text-[#000000] border-[#522700] hover:bg-[#ffe5b8]'
                }`}
              >
                💡 केवल हिंदी भावार्थ (अर्थ)
              </button>
            </div>
          )}

          <div className="flex items-center justify-center space-x-4 mt-3 text-[11px] text-[#241000] font-bold">
            <span>{verses.length} Synced Verses</span>
            <span>•</span>
            <span className="text-[#000000] underline font-black">Click any verse to instantly hear it spoken!</span>
          </div>
        </div>

        {/* Verses List */}
        <div className="space-y-6">
          {verses.map((verse, index) => {
            const isActive = activeSentenceId === verse.sentenceId;
            return (
              <div
                key={verse.sentenceId}
                ref={(el) => {
                  verseElementsRef.current[verse.sentenceId] = el;
                }}
                onClick={() => handleVerseClick(verse, index)}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-7 border-2 transition-all duration-300 relative ${
                  isActive ? currentTheme.active : currentTheme.normal
                }`}
              >
                {/* Active Pill */}
                {isActive && (
                  <div className="absolute -top-3.5 left-6 px-3.5 py-0.5 rounded-full bg-[#000000] text-[#ffdc82] text-[10px] font-black uppercase tracking-widest flex items-center space-x-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#ffdc82] animate-spin" />
                    <span>{isPlaying ? 'Reciting Now (उच्चारित हो रहा है)' : 'Selected Verse'}</span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Verse Number Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black ${
                        isActive
                          ? 'bg-[#000000] text-[#ffdc82] shadow-md'
                          : 'bg-[#fff4d6] text-[#000000] border-2 border-[#522700]'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Verse Content */}
                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Original Script */}
                    <p
                      className={`font-serif tracking-wide ${fontClassMap[fontSize].script} ${
                        isActive ? currentTheme.textScript : 'text-[#000000] font-black'
                      }`}
                    >
                      {verse.originalScript}
                    </p>

                    {/* Hindi Translation */}
                    {showHindi && verse.hindiTranslation && (
                      <div className="pt-2 border-t-2 border-[#522700]/30">
                        <p className={`font-serif ${fontClassMap[fontSize].trans} ${currentTheme.textHindi}`}>
                          <span className="text-[10px] uppercase font-sans font-black text-[#000000] mr-1.5 underline">
                            भावार्थ:
                          </span>
                          {verse.hindiTranslation}
                        </p>
                      </div>
                    )}

                    {/* English Meaning */}
                    {showEnglish && verse.englishTranslation && (
                      <p className={`text-xs sm:text-sm font-sans italic ${currentTheme.textEng}`}>
                        <span className="text-[10px] uppercase font-bold text-[#000000] mr-1.5 not-italic">
                          Meaning:
                        </span>
                        {verse.englishTranslation}
                      </p>
                    )}
                  </div>

                  {/* Play Verse Icon Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerseClick(verse, index);
                      }}
                      className="p-2 rounded-xl bg-[#1f0f00] text-[#ffd99e] hover:bg-[#381b00] transition shadow-xs flex items-center justify-center"
                      title="Speak this verse"
                    >
                      {isActive && isPlaying ? (
                        <Pause className="w-4 h-4 fill-[#ffd99e]" />
                      ) : (
                        <Play className="w-4 h-4 fill-[#ffd99e] ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 pt-8 border-t-2 border-[#522700] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {chapterNumber > 1 ? (
              <Link
                href={`/reader/${slug}/${chapterNumber - 1}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] text-xs font-black border-2 border-[#522700] transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter {chapterNumber - 1}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="text-center font-black text-xs text-[#000000]">
            Chapter {chapterNumber} of {book.totalChapters}
          </div>

          <div>
            {chapterNumber < book.totalChapters && (
              <Link
                href={`/reader/${slug}/${chapterNumber + 1}`}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1f0f00] hover:bg-[#381b00] text-[#ffd99e] text-xs font-black transition shadow-md border-2 border-[#522700]"
              >
                <span>Next Chapter {chapterNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Persistent Bottom Voice & Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1f0f00] border-t-3 border-[#522700] px-4 sm:px-8 py-3.5 shadow-2xl text-[#ffd99e]">
        <div className="max-w-5xl mx-auto space-y-2">
          {/* Controls Strip */}
          <div className="flex items-center justify-between gap-2">
            {/* Left: Current Active Verse Info */}
            <div className="flex items-center space-x-3 max-w-xs truncate">
              <div className="w-10 h-10 rounded-xl bg-[#381b00] border border-[#522700] flex items-center justify-center text-[#ffd99e] font-serif font-black text-sm flex-shrink-0">
                {audioMode === 'vocal' ? '🗣️' : '🎵'}
              </div>
              <div className="truncate">
                <p className="text-xs font-heading font-black text-[#ffffff] truncate">{chapter.title}</p>
                <p className="text-[10px] text-[#ffdc82] font-bold truncate">
                  {audioMode === 'vocal'
                    ? `Voice: Verse ${currentVerseIndex + 1} of ${verses.length}`
                    : `Instrumental: Verse ${currentVerseIndex + 1}`}
                </p>
              </div>
            </div>

            {/* Center: Play / Pause / Next / Prev Controls */}
            <div className="flex items-center space-x-3 sm:space-x-4 mx-auto">
              <button
                onClick={handlePrevVerse}
                disabled={currentVerseIndex === 0}
                className="p-2 text-[#ffd99e] hover:text-white transition disabled:opacity-30"
                title="Previous Verse"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ffd99e] to-[#ffc570] hover:from-white hover:to-[#ffd99e] text-[#1f0f00] font-black flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                title={isPlaying ? 'Pause Recitation' : 'Start Recitation'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-[#1f0f00]" /> : <Play className="w-6 h-6 fill-[#1f0f00] ml-0.5" />}
              </button>

              <button
                onClick={handleNextVerse}
                disabled={currentVerseIndex + 1 >= verses.length}
                className="p-2 text-[#ffd99e] hover:text-white transition disabled:opacity-30"
                title="Next Verse"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Right: Recite Mode & Speed */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Speed Multiplier */}
              <div className="relative group">
                <button className="px-2.5 py-1.5 rounded-lg bg-[#381b00] border border-[#522700] text-xs font-mono font-black text-[#ffdc82] hover:bg-[#522700]">
                  {playbackRate}x
                </button>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex flex-col bg-[#1f0f00] border-2 border-[#522700] rounded-xl p-1.5 shadow-xl z-50">
                  {[0.75, 0.9, 1.0, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition text-left ${
                        playbackRate === rate ? 'bg-[#381b00] text-[#ffdc82] font-black' : 'text-[#ffd99e] hover:bg-[#2b1400]'
                      }`}
                    >
                      {rate}x {rate === 0.9 ? '(Devotional)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume / Mute */}
              <button
                onClick={() => {
                  const newMute = !isMuted;
                  setIsMuted(newMute);
                  if (audioRef.current) audioRef.current.muted = newMute;
                  if (synthRef.current && isPlaying) {
                    speakVerse(currentVerseIndex);
                  }
                }}
                className="p-2 text-[#ffd99e] hover:text-white"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
