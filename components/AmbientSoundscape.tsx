'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Bell, Wind, CloudRain, Disc3, Sparkles } from 'lucide-react';

export type AmbientSoundType = 'temple_bells' | 'flute' | 'tanpura' | 'rain' | 'none';

interface AmbientSoundscapeProps {
  initialSound?: AmbientSoundType;
  initialVolume?: number;
}

export default function AmbientSoundscape({ initialSound = 'none', initialVolume = 0.25 }: AmbientSoundscapeProps) {
  const [activeSound, setActiveSound] = useState<AmbientSoundType>(initialSound);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const SOUND_SOURCES: Record<Exclude<AmbientSoundType, 'none'>, { label: string; icon: any; url: string; description: string }> = {
    temple_bells: {
      label: 'Temple Bells (घंटी)',
      icon: Bell,
      url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_32c0d8dbf4.mp3',
      description: 'Resonant bronze temple bells and gentle prayer chimes',
    },
    flute: {
      label: 'Bansuri Flute (बांसुरी)',
      icon: Wind,
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      description: 'Meditative bamboo flute melody in raga Bhairavi',
    },
    tanpura: {
      label: 'Tanpura Drone (तानपूरा)',
      icon: Disc3,
      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
      description: 'Continuous sacred acoustic resonance tuned to 432 Hz',
    },
    rain: {
      label: 'Monastery Rain (वर्षा)',
      icon: CloudRain,
      url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db69562720.mp3',
      description: 'Peaceful raindrops over temple rooftops and courtyards',
    },
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (activeSound === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
      return;
    }

    const soundObj = SOUND_SOURCES[activeSound];
    if (soundObj) {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
      }
      audioRef.current.src = soundObj.url;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log('Audio autoplay prevented or paused:', e);
          setIsPlaying(false);
        });
    }
  }, [activeSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
          activeSound !== 'none' && isPlaying
            ? 'bg-[#1f0f00] text-[#ffd99e] border-2 border-black shadow-md'
            : 'bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] border-2 border-[#522700]'
        }`}
        title="Toggle Ambient Soundscape (पृष्ठभूमि संगीत)"
      >
        <Sparkles className={`w-3.5 h-3.5 stroke-[2.5] ${isPlaying ? 'text-[#ffdc82] animate-spin' : 'text-[#000000]'}`} />
        <span className="hidden sm:inline">
          {activeSound === 'none' ? '🎵 Ambient Sound' : SOUND_SOURCES[activeSound as keyof typeof SOUND_SOURCES]?.label.split(' ')[0]}
        </span>
        {activeSound !== 'none' && isPlaying && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl bg-[#ffdca3] border-3 border-[#522700] shadow-2xl z-50 text-[#000000] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#522700]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#000000]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">Devotional Soundscape</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#000000] hover:bg-[#ffebc2] text-xs font-black px-2 py-0.5 rounded-lg border border-[#522700]"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 my-3">
            <button
              onClick={() => {
                setActiveSound('none');
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black transition border-2 ${
                activeSound === 'none'
                  ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                  : 'bg-[#fff4d6] border-[#522700] text-[#000000] hover:bg-[#ffebbf]'
              }`}
            >
              <span>🔇 Silence (No Background Music)</span>
              {activeSound === 'none' && <span className="text-[#ffd99e]">✓</span>}
            </button>

            {(Object.keys(SOUND_SOURCES) as Array<keyof typeof SOUND_SOURCES>).map((key) => {
              const item = SOUND_SOURCES[key];
              const Icon = item.icon;
              const isSelected = activeSound === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSound(key);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-left font-black transition border-2 ${
                    isSelected
                      ? 'bg-[#1f0f00] text-[#ffd99e] border-black'
                      : 'bg-[#fff4d6] border-[#522700] text-[#000000] hover:bg-[#ffebbf]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#ffd99e]' : 'text-[#000000]'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-black">{item.label}</p>
                    <p className="text-[10px] opacity-80 truncate">{item.description}</p>
                  </div>
                  {isSelected && <span className="text-[#ffd99e] text-xs">✓</span>}
                </button>
              );
            })}
          </div>

          {activeSound !== 'none' && (
            <div className="pt-2.5 border-t-2 border-[#522700] space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-black text-[#000000]">
                <span className="flex items-center space-x-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#000000]" />
                  <span>Ambient Volume</span>
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#fff4d6] border border-[#522700] rounded-lg appearance-none cursor-pointer accent-[#1f0f00]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
