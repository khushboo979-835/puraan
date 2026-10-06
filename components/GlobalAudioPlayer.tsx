'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, RotateCw, Volume2, X, ChevronUp, ChevronDown, Maximize2, Headphones, Flame } from 'lucide-react';
import AudioStudioDrawer from '@/components/AudioStudioDrawer';

export interface GlobalAudioTrack {
  title: string;
  subtitle: string;
  slug: string;
  chapterNumber: number;
  audioUrl: string;
}

interface GlobalAudioPlayerProps {
  currentTrack: GlobalAudioTrack | null;
  onCloseTrack?: () => void;
}

export default function GlobalAudioPlayer({ currentTrack, onCloseTrack }: GlobalAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultTrack: GlobalAudioTrack = {
    title: 'The Dhammapada (धम्मपद)',
    subtitle: 'Chapter 1: The Twin Verses (Pali Chant)',
    slug: 'dhammapada',
    chapterNumber: 1,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  };

  const track = currentTrack || defaultTrack;

  useEffect(() => {
    const audio = new Audio(track.audioUrl);
    audio.playbackRate = playbackSpeed;
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 60);
    };
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;

    if (currentTrack) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
    };
  }, [track.audioUrl]);

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

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[92vw] sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="bento-card-active rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-[#F59E0B]/60 backdrop-blur-2xl">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2 truncate">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md flex-shrink-0">
                <Flame className="w-4 h-4 animate-pulse" />
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400">
                    Now Chanting 🎵
                  </span>
                </div>
                <h4 className="font-heading font-bold text-xs text-[#FFFBEB] truncate">
                  {track.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
                title={isExpanded ? 'Collapse controls' : 'Expand controls'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              {onCloseTrack && (
                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    onCloseTrack();
                  }}
                  className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
                  title="Close player"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Real-time Animated Waveform Visualizer */}
          <div className="flex items-center justify-center space-x-1 h-6 my-2 bg-[#120F0C] rounded-lg p-1 border border-stone-800/80">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
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
                  <span>{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
                  <span>{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCurrentTime(val);
                    if (audioRef.current) audioRef.current.currentTime = val;
                  }}
                  className="w-full accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Seek & Play buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => seek(-10)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FEF3C7] via-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0A0908] shadow-md hover:scale-105 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-[#0A0908]" />
                  ) : (
                    <Play className="w-4 h-4 fill-[#0A0908] ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => seek(10)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  title="Forward 10s"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speed Switcher */}
              <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                <span>Vocal Speed:</span>
                <div className="flex items-center space-x-1">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changeSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded font-bold transition ${
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
              onClick={togglePlay}
              className="flex-1 py-1.5 px-2 rounded-xl bg-[#20180F] hover:bg-[#342415] border border-[#F59E0B]/40 text-[11px] font-bold text-[#FEF3C7] flex items-center justify-center space-x-1.5 transition"
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

            <button
              onClick={() => setIsStudioOpen(true)}
              className="p-1.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0A0908] font-bold text-xs hover:scale-105 transition"
              title="Open Full Reader Studio with Karaoke Highlighting"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Audio Studio Drawer Modal */}
      {isStudioOpen && (
        <AudioStudioDrawer
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          initialBookSlug={track.slug}
        />
      )}
    </>
  );
}
