'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  Disc3,
  Sliders,
  Sparkles,
  BookOpen,
  Headphones,
  Flame,
  Radio,
  Music2,
  SkipForward,
  SkipBack,
  Layers,
  Compass
} from 'lucide-react';
import { SEED_BOOKS } from '@/lib/seedData';
import { FAITH_PROFILES, FaithType, SpiritualAmbientSynthesizer } from '@/lib/spiritualAudioEngine';

export default function InteractiveAudioPage() {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIdx, setCurrentVerseIdx] = useState(0);
  const [droneActive, setDroneActive] = useState(true);
  const [droneVolume, setDroneVolume] = useState(0.3);
  const [speed, setSpeed] = useState(0.88);
  const [voiceMode, setVoiceMode] = useState<'both' | 'original' | 'hindi'>('both');

  const synthEngineRef = useRef<SpiritualAmbientSynthesizer | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isPlayingRef = useRef(false);

  const currentBook = SEED_BOOKS[selectedBookIndex] || SEED_BOOKS[0];
  const verses = currentBook.chapters?.[0]?.verses || [];

  const faithKey: FaithType = (
    ['hinduism', 'islam', 'christianity', 'sikhism', 'buddhism', 'jainism'].includes(
      (currentBook.religion || '').toLowerCase()
    )
      ? (currentBook.religion.toLowerCase() as FaithType)
      : 'hinduism'
  );
  const faithProfile = FAITH_PROFILES[faithKey] || FAITH_PROFILES.hinduism;

  // Initialize Web Audio Engine
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthEngineRef.current = new SpiritualAmbientSynthesizer();
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }

    return () => {
      stopRecitation();
    };
  }, []);

  useEffect(() => {
    if (synthEngineRef.current) {
      if (droneActive && isPlaying) {
        synthEngineRef.current.startDrone(faithKey, droneVolume);
      } else {
        synthEngineRef.current.stopDrone();
      }
    }
  }, [droneActive, isPlaying, droneVolume, faithKey]);

  const stopRecitation = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (synthEngineRef.current) {
      synthEngineRef.current.stopDrone();
    }
  };

  const playVerse = (idx: number) => {
    if (!synthRef.current || idx < 0 || idx >= verses.length) {
      stopRecitation();
      return;
    }

    synthRef.current.cancel();
    setCurrentVerseIdx(idx);
    setIsPlaying(true);
    isPlayingRef.current = true;

    if (droneActive && synthEngineRef.current) {
      synthEngineRef.current.startDrone(faithKey, droneVolume);
    }

    const verse = verses[idx];
    const textToSpeak =
      voiceMode === 'hindi'
        ? verse.hindiTranslation
        : voiceMode === 'original'
        ? verse.originalScript
        : `${verse.originalScript} । भावार्थ: ${verse.hindiTranslation}`;

    const utt = new SpeechSynthesisUtterance(textToSpeak);
    utt.lang = faithProfile.preferredLangs[0] || 'hi-IN';
    utt.rate = speed * faithProfile.rate;
    utt.pitch = faithProfile.pitch;

    utt.onend = () => {
      if (!isPlayingRef.current) return;
      if (idx + 1 < verses.length) {
        setTimeout(() => {
          if (!isPlayingRef.current) return;
          playVerse(idx + 1);
        }, 800);
      } else {
        stopRecitation();
      }
    };

    utt.onerror = () => {
      if (!isPlayingRef.current) return;
      stopRecitation();
    };

    synthRef.current.speak(utt);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopRecitation();
    } else {
      playVerse(currentVerseIdx);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <Headphones className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Audio Sanctuary & Vani Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Swar & Vani Synchronizer
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Experience authentic multi-faith acoustic drones (432Hz Om / Tanpura, Maqam reverberation, Gurbani Sur-mandal, 528Hz Tibetan Zen singing bowl) paired with real-time vocal recitation.
        </p>
      </div>

      {/* Main Studio Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Scripture Selector & Waveform Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Faith Scriptures Carousel Tabs */}
          <div className="bento-card rounded-3xl p-5 border border-[#F59E0B]/30 shadow-xl space-y-3">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Select Sacred Granth:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SEED_BOOKS.map((b, idx) => (
                <button
                  key={b.slug}
                  onClick={() => {
                    stopRecitation();
                    setSelectedBookIndex(idx);
                    setCurrentVerseIdx(0);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedBookIndex === idx
                      ? 'bg-gradient-to-b from-[#241A10] to-[#18120B] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]'
                      : 'bg-[#120E0A] border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <span className="text-[9px] uppercase font-bold text-amber-400/80 block truncate">
                    {b.religion}
                  </span>
                  <span className="text-xs font-heading font-bold text-[#FFFBEB] block truncate mt-0.5">
                    {b.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Audio Visualizer & Deck */}
          <div className="bento-card rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/40 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-lg">
                  <Flame className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {faithProfile.name}
                  </span>
                  <h2 className="text-xl font-heading font-bold text-[#FFFBEB] truncate">
                    {currentBook.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setDroneActive(!droneActive)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center space-x-1.5 ${
                    droneActive
                      ? 'bg-[#F59E0B] text-[#0A0908]'
                      : 'bg-[#18130E] text-stone-400 border border-stone-800'
                  }`}
                >
                  <Disc3 className={`w-3.5 h-3.5 ${droneActive && isPlaying ? 'animate-spin' : ''}`} />
                  <span>{faithProfile.droneName.split(' ')[0]} Drone</span>
                </button>
              </div>
            </div>

            {/* Dynamic Waveform Visualizer */}
            <div className="h-28 bg-[#0D0A07] rounded-2xl border border-stone-800/80 p-4 flex items-center justify-center gap-1.5 overflow-hidden relative">
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
              {[...Array(32)].map((_, i) => {
                const heightPercent = isPlaying
                  ? Math.sin(i * 0.4 + Date.now() * 0.005) * 40 + 50
                  : Math.max(8, (i % 5) * 6 + 10);
                return (
                  <div
                    key={i}
                    style={{ height: `${heightPercent}%` }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isPlaying
                        ? 'bg-gradient-to-t from-[#D97706] via-[#F59E0B] to-[#FEF3C7] shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                        : 'bg-stone-800'
                    }`}
                  />
                );
              })}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-stone-400">
                <span>Verse <strong>{currentVerseIdx + 1}</strong> of {verses.length}</span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (currentVerseIdx > 0) playVerse(currentVerseIdx - 1);
                  }}
                  disabled={currentVerseIdx <= 0}
                  className="p-2 rounded-xl bg-[#18130E] text-stone-300 hover:text-white disabled:opacity-30 border border-stone-800 transition"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-4 rounded-2xl btn-gold-glow text-[#0A0908] shadow-xl hover:scale-105 transition"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-[#0A0908]" /> : <Play className="w-6 h-6 fill-[#0A0908] ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    if (currentVerseIdx + 1 < verses.length) playVerse(currentVerseIdx + 1);
                  }}
                  disabled={currentVerseIdx >= verses.length - 1}
                  className="p-2 rounded-xl bg-[#18130E] text-stone-300 hover:text-white disabled:opacity-30 border border-stone-800 transition"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <Link
                href={`/reader/${currentBook.slug}/1`}
                className="px-3.5 py-2 rounded-xl bg-[#1C1610] text-amber-300 hover:text-white text-xs font-bold border border-[#F59E0B]/30 transition flex items-center space-x-1"
              >
                <span>Full Reader</span>
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Verses Stream & Synthesizer Mixer (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Synthesizer & Acoustic Controls */}
          <div className="bento-card rounded-3xl p-5 border border-[#F59E0B]/30 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Acoustic Ambience & Pace Mixer
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Ambient Drone Volume:</span>
                  <span className="text-amber-300 font-bold">{Math.round(droneVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={droneVolume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setDroneVolume(v);
                    if (synthEngineRef.current) synthEngineRef.current.setVolume(v);
                  }}
                  className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-stone-400 mt-1">{faithProfile.droneDescription}</p>
              </div>

              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Recitation Speed:</span>
                  <span className="text-amber-300 font-bold">{speed}x</span>
                </div>
                <div className="flex gap-2">
                  {[0.75, 0.88, 1.0, 1.25].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                        speed === s
                          ? 'bg-[#F59E0B] text-[#0A0908]'
                          : 'bg-[#18130E] text-stone-400 border border-stone-800'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Karaoke Synchronized Verses List */}
          <div className="bento-card rounded-3xl p-5 border border-[#F59E0B]/30 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Music2 className="w-3.5 h-3.5" /> Live Synced Verses Stream
            </h3>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {verses.map((v, i) => {
                const isActive = currentVerseIdx === i;
                return (
                  <div
                    key={v.sentenceId}
                    onClick={() => playVerse(i)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2A1E12] to-[#120E0A] border-l-4 border-l-[#F59E0B] border-[#F59E0B]/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-[#120E0A] border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400">
                        {i + 1}
                      </span>
                      <p className={`text-xs font-serif leading-relaxed flex-1 ${isActive ? 'text-[#FFFBEB] font-semibold' : 'text-stone-300'}`}>
                        {v.originalScript}
                      </p>
                    </div>
                    {v.hindiTranslation && (
                      <p className="text-[11px] text-stone-400 font-sans mt-1 pl-5">
                        {v.hindiTranslation}
                      </p>
                    )}
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
