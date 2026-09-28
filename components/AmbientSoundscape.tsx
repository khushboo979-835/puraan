'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Bell, Wind, CloudRain, Disc3, Sparkles } from 'lucide-react';

export type AmbientSoundType = 'temple_bells' | 'flute' | 'tanpura' | 'rain' | 'none';

interface AmbientSoundscapeProps {
  initialSound?: AmbientSoundType;
  initialVolume?: number;
}

export default function AmbientSoundscape({ initialSound = 'none', initialVolume = 0.35 }: AmbientSoundscapeProps) {
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

  useEffect(() => {
    if (activeSound === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
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
          console.log('Audio autoplay prevented, user interaction required:', e);
          setIsPlaying(false);
        });
    }
  }, [activeSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayState = () => {
    if (!audioRef.current || activeSound === 'none') {
      setActiveSound('temple_bells');
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          activeSound !== 'none' && isPlaying
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
            : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border border-stone-700'
        }`}
        title="Toggle Ambient Soundscape"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-400 animate-spin' : 'text-stone-400'}`} />
        <span className="hidden sm:inline">
          {activeSound === 'none' ? 'Ambient Sound' : SOUND_SOURCES[activeSound as keyof typeof SOUND_SOURCES]?.label.split(' ')[0]}
        </span>
        {activeSound !== 'none' && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-3 w-72 p-4 rounded-2xl bg-[#151821] border border-amber-900/40 shadow-2xl z-50 backdrop-blur-xl text-stone-200 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-200">Devotional Soundscape</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-200 text-xs px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 my-3">
            <button
              onClick={() => setActiveSound('none')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                activeSound === 'none'
                  ? 'bg-stone-800 text-stone-200 font-semibold border border-stone-700'
                  : 'text-stone-400 hover:bg-stone-900/60'
              }`}
            >
              <span>Silence (No Ambient)</span>
              {activeSound === 'none' && <span className="text-amber-400">✓</span>}
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
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-left transition ${
                    isSelected
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200 font-medium'
                      : 'hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{item.label}</p>
                    <p className="text-[10px] text-stone-400 truncate">{item.description}</p>
                  </div>
                  {isSelected && <span className="text-amber-400 text-xs">✓</span>}
                </button>
              );
            })}
          </div>

          {activeSound !== 'none' && (
            <div className="pt-3 border-t border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center space-x-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
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
                className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
