'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Check,
  Download,
  Sliders,
  Mic,
  Music,
  SkipForward,
  SkipBack,
  Maximize2,
  Bell,
  Disc3,
  Flame,
  Radio,
  BookOpen
} from 'lucide-react';
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
  const [vocalVoiceContent, setVocalVoiceContent] = useState<'both' | 'original' | 'hindi'>('both');
  const [recitationStage, setRecitationStage] = useState<'shloka' | 'bhavarth' | 'idle'>('idle');

  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0.9);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);

  // Faith-Specific Voice & Ambient Drone
  const [ambientDroneActive, setAmbientDroneActive] = useState(false);
  const [ambientDroneVolume, setAmbientDroneVolume] = useState(0.2);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Active Highlighted Verse
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(
    initialBookmark?.sentenceId || (chapter?.verses?.[0]?.sentenceId ?? null)
  );

  // SpeechSynthesis & Audio Refs
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isPlayingRef = useRef(false);
  const nextVerseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Settings & Display options
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [splitViewMode, setSplitViewMode] = useState(true);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [bookmarkSavedToast, setBookmarkSavedToast] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  // Verse DOM references for smooth auto-scrolling
  const verseElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const verses = chapter?.verses || [];

  // Stop everything reliably
  const stopAllAudioAndRecitation = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setRecitationStage('idle');

    if (nextVerseTimerRef.current) {
      clearTimeout(nextVerseTimerRef.current);
      nextVerseTimerRef.current = null;
    }
    if (stageTimerRef.current) {
      clearTimeout(stageTimerRef.current);
      stageTimerRef.current = null;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Initialize SpeechSynthesis and voice list with cleanup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (synthRef.current) {
          const v = synthRef.current.getVoices();
          if (v && v.length > 0) setAvailableVoices(v);
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      stopAllAudioAndRecitation();
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, []);

  // Ambient Drone Audio Controller (Tanpura / 432Hz Binaural Drone)
  useEffect(() => {
    if (!ambientAudioRef.current && typeof window !== 'undefined') {
      const droneAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3');
      droneAudio.loop = true;
      ambientAudioRef.current = droneAudio;
    }

    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = ambientDroneVolume;
      if (ambientDroneActive) {
        ambientAudioRef.current.play().catch(() => {});
      } else {
        ambientAudioRef.current.pause();
      }
    }
  }, [ambientDroneActive, ambientDroneVolume]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Select Voice matching the specific Faith Tradition
  const getFaithSpecificVoice = () => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices().length > 0 ? synthRef.current.getVoices() : availableVoices;
    if (!voices || voices.length === 0) return null;

    const rel = (book?.religion || '').toLowerCase();

    if (rel === 'islam') {
      // Prefer Urdu / Arabic / Melodic Hindi
      const urdu = voices.find((v) => v.lang.startsWith('ur') || v.lang.startsWith('ar'));
      if (urdu) return urdu;
    }

    if (rel === 'christianity') {
      // Prefer British / Indian Classical English or Hindi
      const eng = voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en-IN') || v.lang.startsWith('en'));
      if (eng) return eng;
    }

    if (rel === 'sikhism') {
      // Prefer Punjabi / Gurmukhi / Hindi
      const pa = voices.find((v) => v.lang.startsWith('pa') || v.lang.startsWith('hi'));
      if (pa) return pa;
    }

    // Default Hindi / Sanskrit resonant voices
    const hindiVoices = voices.filter(
      (v) => v.lang.toLowerCase().startsWith('hi') || v.lang.toLowerCase().replace('_', '-').startsWith('hi-')
    );
    const maleHindi =
      hindiVoices.find((v) => /madhur|hemant|tarun|ravi|male/i.test(v.name)) ||
      hindiVoices[0] ||
      voices[0];

    return maleHindi;
  };

  // Speak a specific verse sequentially
  const speakVerse = (index: number) => {
    if (!synthRef.current || index < 0 || index >= verses.length) {
      stopAllAudioAndRecitation();
      return;
    }

    if (nextVerseTimerRef.current) clearTimeout(nextVerseTimerRef.current);
    if (stageTimerRef.current) clearTimeout(stageTimerRef.current);
    synthRef.current.cancel();

    const targetVerse = verses[index];
    setCurrentVerseIndex(index);
    setActiveSentenceId(targetVerse.sentenceId);
    isPlayingRef.current = true;
    setIsPlaying(true);

    // Smooth auto-centering scroll
    if (autoScrollEnabled && verseElementsRef.current[targetVerse.sentenceId]) {
      verseElementsRef.current[targetVerse.sentenceId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    const voice = getFaithSpecificVoice();

    // Stage 2: Speak Meaning Explanation (भावार्थ)
    const speakBhavarthStage = () => {
      if (!isPlayingRef.current || !synthRef.current) return;
      setRecitationStage('bhavarth');

      const bhavarthText = `॥ भावार्थ ॥ ${targetVerse.hindiTranslation || targetVerse.englishTranslation || ''}`;
      if (!targetVerse.hindiTranslation && !targetVerse.englishTranslation) {
        advanceToNextVerse(index);
        return;
      }

      const bhavarthUtterance = new SpeechSynthesisUtterance(bhavarthText);
      bhavarthUtterance.lang = 'hi-IN';
      bhavarthUtterance.rate = playbackRate * 0.95;
      bhavarthUtterance.pitch = 0.98;
      bhavarthUtterance.volume = isMuted ? 0 : volume;
      if (voice) bhavarthUtterance.voice = voice;

      bhavarthUtterance.onend = () => {
        if (!isPlayingRef.current) return;
        advanceToNextVerse(index);
      };

      bhavarthUtterance.onerror = (e: any) => {
        if (!isPlayingRef.current || e.error === 'canceled' || e.error === 'interrupted') return;
        advanceToNextVerse(index);
      };

      synthRef.current.speak(bhavarthUtterance);
    };

    // Helper to advance to next verse
    const advanceToNextVerse = (curIdx: number) => {
      if (!isPlayingRef.current) return;
      if (curIdx + 1 < verses.length) {
        nextVerseTimerRef.current = setTimeout(() => {
          if (!isPlayingRef.current) return;
          speakVerse(curIdx + 1);
        }, 750);
      } else {
        stopAllAudioAndRecitation();
      }
    };

    // Stage 1: Speak Sacred Script
    const speakShlokaStage = () => {
      setRecitationStage('shloka');
      const shlokaText = targetVerse.originalScript.replace(/\n+/g, ' । ').trim();

      const shlokaUtterance = new SpeechSynthesisUtterance(shlokaText);
      shlokaUtterance.lang = 'hi-IN';
      shlokaUtterance.rate = playbackRate * 0.88;
      shlokaUtterance.pitch = 0.92;
      shlokaUtterance.volume = isMuted ? 0 : volume;
      if (voice) shlokaUtterance.voice = voice;

      shlokaUtterance.onend = () => {
        if (!isPlayingRef.current) return;
        if (vocalVoiceContent === 'both') {
          stageTimerRef.current = setTimeout(() => {
            if (!isPlayingRef.current) return;
            speakBhavarthStage();
          }, 450);
        } else {
          advanceToNextVerse(index);
        }
      };

      shlokaUtterance.onerror = (e: any) => {
        if (!isPlayingRef.current || e.error === 'canceled' || e.error === 'interrupted') return;
        if (vocalVoiceContent === 'both') {
          speakBhavarthStage();
        } else {
          advanceToNextVerse(index);
        }
      };

      synthRef.current?.speak(shlokaUtterance);
    };

    if (vocalVoiceContent === 'hindi') {
      speakBhavarthStage();
    } else {
      speakShlokaStage();
    }

    saveBookmark(targetVerse.sentenceId, targetVerse.startTime);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      stopAllAudioAndRecitation();
    } else {
      if (audioMode === 'vocal') {
        setIsPlaying(true);
        isPlayingRef.current = true;
        speakVerse(currentVerseIndex);
      } else {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    }
  };

  // Click any verse to instantly jump and listen!
  const handleVerseClick = (verse: VerseItem, index: number) => {
    if (activeSentenceId === verse.sentenceId && isPlaying) {
      stopAllAudioAndRecitation();
      return;
    }

    setActiveSentenceId(verse.sentenceId);
    setCurrentVerseIndex(index);

    if (audioMode === 'vocal') {
      speakVerse(index);
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = verse.startTime;
        setCurrentTime(verse.startTime);
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
    saveBookmark(verse.sentenceId, verse.startTime);
  };

  const handleNextVerse = () => {
    if (currentVerseIndex + 1 < verses.length) {
      handleVerseClick(verses[currentVerseIndex + 1], currentVerseIndex + 1);
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex - 1 >= 0) {
      handleVerseClick(verses[currentVerseIndex - 1], currentVerseIndex - 1);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
    if (isPlaying && audioMode === 'vocal') speakVerse(currentVerseIndex);
  };

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

  const saveBookmark = (sentenceId?: string, timestamp?: number) => {
    const sId = sentenceId || activeSentenceId || 'start';
    const ts = timestamp !== undefined ? timestamp : currentTime;

    try {
      if (typeof window !== 'undefined') {
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
        setBookmarkSavedToast(true);
        setTimeout(() => setBookmarkSavedToast(false), 2000);
      }

      fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book._id,
          chapterNumber,
          sentenceId: sId,
          audioTimestamp: ts,
        }),
      }).catch(() => {});
    } catch (e) {}
  };

  // Locked State for Monetization
  if (locked) {
    return (
      <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] flex items-center justify-center p-4">
        <div className="max-w-md w-full bento-card rounded-3xl p-8 text-center border-2 border-[#F59E0B]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center mx-auto text-[#0A0908] shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold bg-[#1C1610] px-3 py-1 rounded-full border border-[#F59E0B]/30">
              Premium Chapter {chapterNumber}
            </span>
            <h2 className="text-2xl font-heading font-bold text-[#FFFBEB] mt-3">
              Unlock Complete Sacred Granth
            </h2>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Chapter 1 is 100% free to read and listen. Unlock complete Adhyays, audio synchronization, and DRM watermarked offline study for <strong>{book.title}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#15110D] border border-stone-800 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-400">Total Chapters:</span>
              <span className="font-bold text-stone-100">{book.totalChapters} Adhyays</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Access:</span>
              <span className="font-bold text-emerald-400">Lifetime Digital License</span>
            </div>
            <div className="flex justify-between border-t border-stone-800 pt-2 text-sm">
              <span className="font-bold text-stone-200">Price:</span>
              <span className="font-black text-[#FEF3C7]">₹{book.price || 49}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setUnlockModalOpen(true)}
              className="btn-gold-glow w-full py-3.5 px-6 font-bold rounded-2xl text-xs text-[#0A0908] shadow-xl hover:scale-105 transition"
            >
              Unlock Complete Granth (₹{book.price || 49}) ↗
            </button>

            <Link
              href={`/reader/${slug}/1`}
              className="block w-full py-2.5 px-4 rounded-xl bg-[#1C1610] text-amber-200 hover:text-white text-xs font-bold border border-stone-800 transition text-center"
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
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] pb-36 relative overflow-x-hidden">
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

      {/* ── TOP STICKY READER STUDIO HEADER ──────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#0E0B08]/95 backdrop-blur-xl border-b border-[#F59E0B]/20 px-4 sm:px-8 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3 min-w-0">
            <Link
              href={`/book/${slug}`}
              className="p-2 rounded-xl bg-[#18130E] hover:bg-[#2A1F13] text-[#FEF3C7] border border-[#F59E0B]/30 transition"
              title="Return to Book Overview"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1C1610] text-[#FEF3C7] border border-[#F59E0B]/40">
                  {book.religion}
                </span>
                <span className="text-xs text-stone-400 font-medium truncate hidden sm:inline">{book.title}</span>
              </div>
              <h1 className="text-sm sm:text-base font-heading font-bold text-[#FFFBEB] truncate mt-0.5">
                {chapter.title}
              </h1>
            </div>
          </div>

          {/* Controls Right */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Ambient Drone Button (Tanpura/Binaural 432Hz) */}
            <button
              onClick={() => setAmbientDroneActive(!ambientDroneActive)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                ambientDroneActive
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'bg-[#18130E] text-stone-300 hover:text-white border border-[#F59E0B]/30'
              }`}
              title="Toggle Ambient 432Hz Tanpura / Drone"
            >
              <Disc3 className={`w-3.5 h-3.5 ${ambientDroneActive ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">432Hz Drone</span>
            </button>

            {/* Split View Toggle */}
            <button
              onClick={() => setSplitViewMode(!splitViewMode)}
              className={`p-2 rounded-xl text-xs font-bold transition ${
                splitViewMode
                  ? 'bg-[#2A1F13] text-amber-300 border border-[#F59E0B]/50'
                  : 'bg-[#18130E] text-stone-400 border border-stone-800'
              }`}
              title="Toggle Split-Screen / Focused Sanctuary View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => saveBookmark()}
              className="p-2 rounded-xl bg-[#18130E] hover:bg-[#2A1F13] text-[#FEF3C7] border border-[#F59E0B]/30 transition"
              title="Save Reading Progress"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#18130E] hover:bg-[#2A1F13] text-xs font-bold text-[#FEF3C7] border border-[#F59E0B]/30 transition"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Options</span>
            </button>
          </div>

        </div>

        {/* Options Drawer */}
        {showSettingsDrawer && (
          <div className="max-w-6xl mx-auto mt-3 p-4 bento-card rounded-2xl border border-[#F59E0B]/40 text-stone-200 text-xs animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Recitation Content */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Vocal Content
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'both', label: 'Script + Meaning' },
                    { id: 'original', label: 'Only Script' },
                    { id: 'hindi', label: 'Only Meaning' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setVocalVoiceContent(opt.id as any);
                        if (isPlaying) speakVerse(currentVerseIndex);
                      }}
                      className={`py-1.5 px-1 rounded-lg text-center font-bold text-[10px] transition ${
                        vocalVoiceContent === opt.id
                          ? 'bg-[#F59E0B] text-[#0A0908]'
                          : 'bg-[#18130E] text-stone-300 border border-stone-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Options */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Display Options
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHindi(!showHindi)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] transition ${
                      showHindi ? 'bg-[#2A1F13] text-amber-300 border border-[#F59E0B]/50' : 'bg-[#18130E] text-stone-400 border border-stone-800'
                    }`}
                  >
                    Hindi {showHindi ? '✓' : 'Off'}
                  </button>
                  <button
                    onClick={() => setShowTransliteration(!showTransliteration)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] transition ${
                      showTransliteration ? 'bg-[#2A1F13] text-amber-300 border border-[#F59E0B]/50' : 'bg-[#18130E] text-stone-400 border border-stone-800'
                    }`}
                  >
                    Roman Script {showTransliteration ? '✓' : 'Off'}
                  </button>
                  <button
                    onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-[11px] transition ${
                      autoScrollEnabled ? 'bg-[#1B3520] text-emerald-300 border border-emerald-500/50' : 'bg-[#18130E] text-stone-400 border border-stone-800'
                    }`}
                  >
                    Auto-Center {autoScrollEnabled ? '✓' : 'Off'}
                  </button>
                </div>
              </div>

              {/* Ambient Volume Slider */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  432Hz Drone Volume
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ambientDroneVolume}
                  onChange={(e) => setAmbientDroneVolume(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bookmark Toast */}
      {bookmarkSavedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1F1710] text-[#FEF3C7] font-bold px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2 text-xs border border-[#F59E0B]/60 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>Reading progress synchronized to My Shelf!</span>
        </div>
      )}

      {/* ── MAIN SCRIPTURE VERSES STREAM (Karaoke Synchronized) ───── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Chapter Header Banner */}
        <div className="text-center mb-8 pb-6 border-b border-[#F59E0B]/20">
          <span className="text-[#F59E0B] text-3xl font-serif">ॐ</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight mt-1 text-[#FFFBEB]">
            {chapter.title}
          </h2>
          {chapter.summary && (
            <p className="mt-2 text-xs sm:text-sm text-stone-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
              &ldquo;{chapter.summary}&rdquo;
            </p>
          )}

          <div className="flex items-center justify-center space-x-3 mt-3 text-xs text-stone-400">
            <span>{verses.length} Synced Verses</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">Click any verse to instantly seek & listen</span>
          </div>
        </div>

        {/* Verses Karaoke Stream */}
        <div className="space-y-5">
          {verses.map((verse, index) => {
            const isActive = activeSentenceId === verse.sentenceId;
            return (
              <div
                key={verse.sentenceId}
                ref={(el) => {
                  verseElementsRef.current[verse.sentenceId] = el;
                }}
                onClick={() => handleVerseClick(verse, index)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-7 border transition-all duration-300 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2A1E12] via-[#1B140D] to-[#120E0A] border-l-4 border-l-[#F59E0B] border-[#F59E0B]/80 shadow-[0_0_35px_rgba(245,158,11,0.22)] scale-[1.01]'
                    : 'bento-card border-[#F59E0B]/20 hover:border-[#F59E0B]/50'
                }`}
              >
                {/* Active Indicator Tag */}
                {isActive && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#F59E0B] text-[#0A0908] text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <span>
                      {isPlaying
                        ? recitationStage === 'shloka'
                          ? 'Reciting Script...'
                          : 'Explaining Meaning...'
                        : 'Current Verse'}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  {/* Verse Number Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold ${
                        isActive
                          ? 'bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] text-[#0A0908] shadow-md'
                          : 'bg-[#18130E] text-stone-300 border border-stone-800'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Verse Content */}
                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Original Script */}
                    <p
                      className={`font-serif text-xl sm:text-2xl leading-relaxed sm:leading-loose ${
                        isActive ? 'text-[#FFFBEB] text-shadow-gold font-semibold' : 'text-stone-100 font-medium'
                      }`}
                    >
                      {verse.originalScript}
                    </p>

                    {/* Transliteration */}
                    {showTransliteration && verse.transliteration && (
                      <p className="text-xs sm:text-sm font-sans italic text-amber-200/70 tracking-wide">
                        {verse.transliteration}
                      </p>
                    )}

                    {/* Hindi Translation */}
                    {showHindi && verse.hindiTranslation && (
                      <div className="pt-2 border-t border-stone-800/80">
                        <p className="font-serif text-xs sm:text-sm text-stone-200 leading-relaxed">
                          <strong className="text-amber-400 font-sans mr-1">भावार्थ:</strong>
                          {verse.hindiTranslation}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    {showEnglish && verse.englishTranslation && (
                      <p className="text-xs sm:text-sm font-sans text-stone-300/85 leading-relaxed">
                        <strong className="text-stone-400 mr-1">Meaning:</strong>
                        {verse.englishTranslation}
                      </p>
                    )}
                  </div>

                  {/* Verse Play Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive && isPlaying) {
                          stopAllAudioAndRecitation();
                        } else {
                          handleVerseClick(verse, index);
                        }
                      }}
                      className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#D97706] text-[#0A0908] hover:scale-105 transition shadow-md flex items-center justify-center cursor-pointer"
                      title={isActive && isPlaying ? 'Pause Recitation' : 'Play This Verse'}
                    >
                      {isActive && isPlaying ? (
                        <Pause className="w-4 h-4 fill-[#0A0908]" />
                      ) : (
                        <Play className="w-4 h-4 fill-[#0A0908] ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Navigation Bottom */}
        <div className="mt-10 pt-6 border-t border-[#F59E0B]/20 flex items-center justify-between">
          <div>
            {chapterNumber > 1 ? (
              <Link
                href={`/reader/${slug}/${chapterNumber - 1}`}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#18130E] hover:bg-[#2A1F13] text-[#FEF3C7] text-xs font-bold border border-[#F59E0B]/30 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Chapter {chapterNumber - 1}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="text-xs text-stone-400 font-bold">
            Chapter {chapterNumber} of {book.totalChapters}
          </div>

          <div>
            {chapterNumber < book.totalChapters && (
              <Link
                href={`/reader/${slug}/${chapterNumber + 1}`}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl btn-gold-glow text-[#0A0908] text-xs font-bold transition shadow-md"
              >
                <span>Chapter {chapterNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* ── PERSISTENT BOTTOM VOICE & AUDIO PLAYER BAR ─────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E0B08]/95 backdrop-blur-2xl border-t border-[#F59E0B]/30 px-4 sm:px-8 py-3.5 shadow-2xl text-[#FEF3C7]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Left: Active Info */}
          <div className="flex items-center space-x-3 max-w-xs truncate w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] font-bold shadow-md flex-shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div className="truncate">
              <p className="text-xs font-heading font-bold text-[#FFFBEB] truncate">{chapter.title}</p>
              <p className="text-[10px] text-amber-300 font-semibold truncate">
                Verse {currentVerseIndex + 1} of {verses.length} • {book.religion}
              </p>
            </div>
          </div>

          {/* Center: Controls & Equalizer */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevVerse}
              disabled={currentVerseIndex === 0}
              className="p-1.5 text-stone-400 hover:text-white transition disabled:opacity-30"
              title="Previous Verse"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FEF3C7] via-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0A0908] shadow-lg hover:scale-105 transition"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-[#0A0908]" /> : <Play className="w-5 h-5 fill-[#0A0908] ml-0.5" />}
            </button>

            <button
              onClick={handleNextVerse}
              disabled={currentVerseIndex + 1 >= verses.length}
              className="p-1.5 text-stone-400 hover:text-white transition disabled:opacity-30"
              title="Next Verse"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Live Equalizer */}
            <div className="hidden md:flex items-center space-x-1 h-5 px-2 bg-[#18130E] rounded-lg border border-stone-800">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                    isPlaying ? `animate-wave-${(i % 5) + 1}` : 'h-1.5 opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Speed & Volume */}
          <div className="flex items-center space-x-2">
            {[0.75, 1, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  playbackRate === rate ? 'bg-[#F59E0B] text-[#0A0908]' : 'bg-[#18130E] text-stone-300 border border-stone-800'
                }`}
              >
                {rate}x
              </button>
            ))}

            <button
              onClick={() => {
                const newMute = !isMuted;
                setIsMuted(newMute);
                if (audioRef.current) audioRef.current.muted = newMute;
              }}
              className="p-2 text-stone-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#F59E0B]" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
