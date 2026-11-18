'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Headphones,
  Flame,
  Radio,
  Sliders,
  Sparkles,
} from 'lucide-react';
import AudioStudioDrawer from '@/components/AudioStudioDrawer';
import { useAudioSanctuary, SanctuaryTrack } from '@/context/AudioSanctuaryContext';

export interface GlobalAudioTrack {
  title: string;
  subtitle: string;
  slug: string;
  chapterNumber: number;
  audioUrl: string;
}

interface GlobalAudioPlayerProps {
  currentTrack?: GlobalAudioTrack | null;
  onCloseTrack?: () => void;
}

export default function GlobalAudioPlayer({
  currentTrack: propTrack,
  onCloseTrack: propOnClose,
}: GlobalAudioPlayerProps) {
  const sanctuary = useAudioSanctuary();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [showTanpuraControl, setShowTanpuraControl] = useState(false);

  // Fallback track when idle
  const defaultTrack: SanctuaryTrack = {
    title: 'The Dhammapada (धम्मपद)',
    subtitle: 'Chapter 1: The Twin Verses (Pali Chant)',
    slug: 'dhammapada',
    chapterNumber: 1,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    faith: 'buddhism',
  };

  const activeTrack = sanctuary.currentTrack || (propTrack as SanctuaryTrack) || defaultTrack;
  const isPlaying = sanctuary.isPlaying;
  const currentTime = sanctuary.currentTime;
  const duration = sanctuary.duration || 60;
  const playbackSpeed = sanctuary.playbackSpeed;

  const handleTogglePlay = () => {
    if (!sanctuary.currentTrack && activeTrack) {
      sanctuary.playTrack(activeTrack);
    } else {
      sanctuary.togglePlay();
    }
  };

  const handleSeek = (deltaSeconds: number) => {
    sanctuary.seekTo(currentTime + deltaSeconds);
  };

  const handleClose = () => {
    sanctuary.stopTrack();
    if (propOnClose) propOnClose();
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[92vw] sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="bento-card-active rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-[#F59E0B]/60 backdrop-blur-2xl bg-[#0e0b08]/95">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2 truncate">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md flex-shrink-0">
                <Flame className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-amber-950' : 'text-amber-900'}`} />
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-stone-500'}`} />
                    {isPlaying ? 'Now Chanting 🎵' : 'Sacred Vani 🎧'}
                  </span>
                  {sanctuary.isTanpuraActive && (
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded">
                      432Hz Om
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-bold text-xs text-[#FFFBEB] truncate">
                  {activeTrack.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition cursor-pointer"
                title={isExpanded ? 'Collapse controls' : 'Expand controls'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition cursor-pointer"
                title="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Animated Waveform Visualizer */}
          <div className="flex items-center justify-center space-x-1 h-6 my-2 bg-[#120F0C] rounded-lg p-1 border border-stone-800/80">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-amber-600 to-amber-300 transition-all duration-300 ${
                  isPlaying ? `animate-wave-${(i % 5) + 1}` : 'h-1.5 opacity-30'
                }`}
              />
            ))}
          </div>

          {/* Expanded Controls Drawer */}
          {isExpanded && (
            <div className="space-y-3 pt-2 border-t border-stone-800/80 animate-in fade-in duration-200">
              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>
                    {Math.floor(currentTime / 60)}:
                    {('0' + Math.floor(currentTime % 60)).slice(-2)}
                  </span>
                  <span>
                    {Math.floor(duration / 60)}:
                    {('0' + Math.floor(duration % 60)).slice(-2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    sanctuary.seekTo(parseFloat(e.target.value));
                  }}
                  className="w-full accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Seek & Play buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handleSeek(-10)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FEF3C7] via-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0A0908] shadow-md hover:scale-105 transition cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-[#0A0908]" />
                  ) : (
                    <Play className="w-4 h-4 fill-[#0A0908] ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => handleSeek(10)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
                  title="Forward 10s"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 432Hz Tanpura / Om Pad Ambient Layer Controls */}
              <div className="p-2.5 rounded-xl bg-[#16120D] border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>432Hz Tanpura Drone</span>
                  </div>
                  <button
                    onClick={sanctuary.toggleTanpura}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition ${
                      sanctuary.isTanpuraActive
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {sanctuary.isTanpuraActive ? 'ON' : 'OFF'}
                  </button>
                </div>

                {sanctuary.isTanpuraActive && (
                  <div className="flex items-center gap-2 text-[10px] text-stone-400">
                    <span>Vol:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={sanctuary.tanpuraVolume}
                      onChange={(e) => sanctuary.setTanpuraVolume(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-stone-800 rounded cursor-pointer"
                    />
                    <span className="font-mono text-amber-300">
                      {Math.round(sanctuary.tanpuraVolume * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Cadence Speed Switcher */}
              <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                <span>Vedic Cadence:</span>
                <div className="flex items-center space-x-1">
                  {[0.6, 0.8, 1.0, 1.25].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => sanctuary.setPlaybackSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
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
          )}

          {/* Quick Action Button */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <button
              onClick={handleTogglePlay}
              className="flex-1 py-1.5 px-2 rounded-xl bg-[#20180F] hover:bg-[#342415] border border-[#F59E0B]/40 text-[11px] font-bold text-[#FEF3C7] flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-[#FEF3C7]" />
                  <span>Pause Vani</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-[#FEF3C7]" />
                  <span>Listen (Synced Audio) 🎧</span>
                </>
              )}
            </button>

            {activeTrack.slug && (
              <Link
                href={`/reader/${activeTrack.slug}/${activeTrack.chapterNumber || 1}`}
                className="p-1.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] font-bold text-xs hover:scale-105 transition flex items-center justify-center"
                title="Open Interactive Reader with Karaoke Highlighting"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Audio Studio Drawer Modal */}
      {isStudioOpen && (
        <AudioStudioDrawer
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          initialBookSlug={activeTrack.slug}
        />
      )}
    </>
  );
}
