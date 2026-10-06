'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Play, Pause, RotateCcw, RotateCw, Volume2, FastForward, Sparkles, BookOpen, Layers, Maximize2 } from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';

interface AudioStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookSlug?: string;
}

export default function AudioStudioDrawer({ isOpen, onClose, initialBookSlug }: AudioStudioDrawerProps) {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(68);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentBook = SEED_BOOKS[selectedBookIndex] || SEED_BOOKS[0];
  const currentChapter = currentBook.chapters[0] || { title: 'Chapter 1', verses: [] };

  useEffect(() => {
    if (initialBookSlug) {
      const idx = SEED_BOOKS.findIndex((b) => b.slug === initialBookSlug);
      if (idx !== -1) setSelectedBookIndex(idx);
    }
  }, [initialBookSlug]);

  useEffect(() => {
    if (isOpen) {
      const audio = new Audio(currentChapter.audioUrl || currentBook.audioPreviewUrl);
      audio.playbackRate = playbackSpeed;
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 68);

        // Highlight verse by time
        const vIndex = currentChapter.verses.findIndex(
          (v) => audio.currentTime >= v.startTime && audio.currentTime <= v.endTime
        );
        if (vIndex !== -1) setActiveVerseIndex(vIndex);
      };
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;

      return () => {
        audio.pause();
      };
    }
  }, [isOpen, selectedBookIndex, currentChapter]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] bento-card rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-[#F59E0B]/50 flex flex-col">
        {/* Top Studio Header */}
        <div className="p-4 sm:p-5 border-b border-[#F59E0B]/20 flex items-center justify-between bg-[#18130E]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#FEF3C7]">
                Interactive Audio Studio (Vani)
              </h3>
              <p className="text-[11px] text-amber-300/80 font-medium">
                Line-by-Line Vocal Highlighting & Shuddh Ucharan Recitation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href={`/reader/${currentBook.slug}/1`}
              onClick={onClose}
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#241B12] border border-[#F59E0B]/40 text-xs font-bold text-amber-200 hover:text-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen Reader</span>
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Body: Split View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Panel: Scripture Selector & Audio Controls */}
          <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-stone-800/80 bg-[#120F0C] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-wider text-stone-400">
                Select Scripture to Recite
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {SEED_BOOKS.map((book, idx) => (
                  <button
                    key={book.slug}
                    onClick={() => {
                      if (audioRef.current) audioRef.current.pause();
                      setIsPlaying(false);
                      setSelectedBookIndex(idx);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedBookIndex === idx
                        ? 'bg-gradient-to-r from-[#2F2113] to-[#1A140F] border border-[#F59E0B] text-[#FEF3C7] shadow-sm'
                        : 'bg-[#18130E] text-stone-300 hover:bg-[#221B14] border border-stone-800/80'
                    }`}
                  >
                    <span className="truncate">{book.title}</span>
                    <span className="text-[10px] text-amber-400/80 ml-2 uppercase font-bold">
                      {book.religion}
                    </span>
                  </button>
                ))}
              </div>

              {/* Recitation Metadata */}
              <div className="p-3.5 rounded-2xl bg-[#17120D] border border-stone-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Now Chanting
                </span>
                <h4 className="font-heading font-bold text-sm text-[#FFFBEB] truncate">
                  {currentBook.title}
                </h4>
                <p className="text-[11px] text-stone-300 truncate">
                  {currentChapter.title}
                </p>
              </div>
            </div>

            {/* Audio Waveform & Player Deck */}
            <div className="bento-card-active rounded-2xl p-4 space-y-4">
              {/* Animated Waveform */}
              <div className="flex items-center justify-center space-x-1.5 h-10">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                      isPlaying ? `animate-wave-${(i % 5) + 1}` : 'h-2 opacity-30'
                    }`}
                  />
                ))}
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
                  <span>{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value);
                    setCurrentTime(time);
                    if (audioRef.current) audioRef.current.currentTime = time;
                  }}
                  className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleSeek(-10)}
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FEF3C7] via-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0A0908] shadow-lg hover:scale-105 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-[#0A0908]" />
                  ) : (
                    <Play className="w-5 h-5 fill-[#0A0908] ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => handleSeek(10)}
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition"
                  title="Forward 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center justify-center space-x-2 pt-2 border-t border-stone-800">
                <span className="text-[10px] font-bold text-stone-400 mr-1">Speed:</span>
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      playbackSpeed === speed
                        ? 'bg-[#F59E0B] text-[#0A0908]'
                        : 'bg-stone-800 text-stone-300 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Synchronized Karaoke Verses Display */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-[#0E0C09] space-y-4 overflow-y-auto max-h-[500px] lg:max-h-full">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                Live Verse Synchronization (Karaoke Text)
              </span>
              <span className="text-xs font-semibold text-stone-400">
                Verse {activeVerseIndex + 1} of {currentChapter.verses?.length || 1}
              </span>
            </div>

            <div className="space-y-4">
              {currentChapter.verses?.map((verse, idx) => {
                const isActive = idx === activeVerseIndex;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2B1F13] to-[#1A140F] border-2 border-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.01]'
                        : 'bg-[#15110D] border border-stone-800 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-400">
                        {isActive ? '▶ Current Recitation' : `Sentence ${idx + 1}`}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {Math.floor(verse.startTime)}s - {Math.floor(verse.endTime)}s
                      </span>
                    </div>

                    <p className={`font-heading text-sm sm:text-base font-bold leading-relaxed mb-2 ${
                      isActive ? 'text-[#FFFBEB] text-shadow-gold' : 'text-stone-300'
                    }`}>
                      {verse.originalScript}
                    </p>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      <strong className="text-amber-400/90 font-semibold">Hindi: </strong>
                      {verse.hindiTranslation}
                    </p>

                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed italic">
                      <strong className="text-stone-300 font-semibold">English: </strong>
                      {verse.englishTranslation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
