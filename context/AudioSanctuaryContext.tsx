'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  SpiritualAmbientSynthesizer,
  FaithType,
} from '@/lib/spiritualAudioEngine';

export interface VerseTimeSegment {
  sentenceId: string;
  originalScript: string;
  hindiTranslation?: string;
  englishTranslation?: string;
  startTime: number;
  endTime: number;
}

export interface SanctuaryTrack {
  title: string;
  subtitle: string;
  slug: string;
  chapterNumber: number;
  audioUrl: string;
  coverUrl?: string;
  faith?: FaithType;
  verses?: VerseTimeSegment[];
}

interface AudioSanctuaryContextValue {
  // Current Track & Playback State
  currentTrack: SanctuaryTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  activeVerseIndex: number;
  activeVerseId: string | null;
  volume: number;
  isMuted: boolean;

  // 432Hz Ambient Tanpura / Om Drone State
  isTanpuraActive: boolean;
  tanpuraVolume: number;

  // Methods
  playTrack: (track: SanctuaryTrack) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seekTo: (seconds: number) => void;
  seekToVerse: (index: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleTanpura: () => void;
  setTanpuraVolume: (vol: number) => void;
  stopTrack: () => void;
}

const AudioSanctuaryContext = createContext<AudioSanctuaryContextValue | undefined>(
  undefined
);

export function AudioSanctuaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTrack, setCurrentTrack] = useState<SanctuaryTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60);
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(0.8); // 0.8x measured Vedic cadence
  const [volume, setVolumeState] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 432Hz Ambient Tanpura drone
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(true);
  const [tanpuraVolume, setTanpuraVolumeState] = useState<number>(0.25);

  // Active Verse index for Millisecond Karaoke Highlighting
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(-1);
  const [activeVerseId, setActiveVerseId] = useState<string | null>(null);

  // Audio & Synthesizer DOM Elements
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpiritualAmbientSynthesizer | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Initialize Audio & Synthesizer once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioElementRef.current = audio;
      synthRef.current = new SpiritualAmbientSynthesizer();

      audio.onended = () => {
        setIsPlaying(false);
        synthRef.current?.stopDrone();
      };

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      audio.onerror = () => {
        // Graceful handle of stream/network error
        console.warn('AudioSanctuary: stream source error or interrupted');
      };
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
      synthRef.current?.stopDrone();
    };
  }, []);

  // Synchronize 432Hz Ambient Tanpura drone with audio playback
  useEffect(() => {
    if (!synthRef.current) return;

    if (isPlaying && isTanpuraActive) {
      const faith = currentTrack?.faith || 'hinduism';
      synthRef.current.startDrone(faith, tanpuraVolume);
    } else {
      synthRef.current.stopDrone();
    }
  }, [isPlaying, isTanpuraActive, tanpuraVolume, currentTrack?.faith]);

  // Millisecond Karaoke Sync Loop (via requestAnimationFrame while playing)
  const syncPlaybackPosition = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const time = audio.currentTime;
    setCurrentTime(time);

    // Compute active verse index
    const verses = currentTrack?.verses;
    if (verses && verses.length > 0) {
      let matchedIndex = -1;
      for (let i = 0; i < verses.length; i++) {
        const v = verses[i];
        if (time >= v.startTime && time <= v.endTime) {
          matchedIndex = i;
          break;
        }
      }

      // If between verses, keep the closest verse or last played
      if (matchedIndex !== -1) {
        setActiveVerseIndex(matchedIndex);
        setActiveVerseId(verses[matchedIndex].sentenceId);
      }
    }

    if (isPlaying) {
      rafIdRef.current = requestAnimationFrame(syncPlaybackPosition);
    }
  }, [currentTrack?.verses, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      rafIdRef.current = requestAnimationFrame(syncPlaybackPosition);
    } else if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlaying, syncPlaybackPosition]);

  // Methods
  const playTrack = useCallback((track: SanctuaryTrack) => {
    const audio = audioElementRef.current;
    if (!audio) return;

    setCurrentTrack(track);
    setActiveVerseIndex(-1);
    setActiveVerseId(null);
    setCurrentTime(0);

    // Fallback safe URL
    const validUrl =
      track.audioUrl ||
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

    audio.src = validUrl;
    audio.playbackRate = playbackSpeed;
    audio.volume = isMuted ? 0 : volume;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Audio play request blocked or postponed by browser:', err);
        setIsPlaying(false);
      });
  }, [playbackSpeed, isMuted, volume]);

  const togglePlay = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      synthRef.current?.stopDrone();
    } else {
      if (!audio.src && currentTrack) {
        audio.src = currentTrack.audioUrl;
      }
      if (audio.src) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [isPlaying, currentTrack]);

  const pause = useCallback(() => {
    const audio = audioElementRef.current;
    if (audio) audio.pause();
    setIsPlaying(false);
    synthRef.current?.stopDrone();
  }, []);

  const resume = useCallback(() => {
    const audio = audioElementRef.current;
    if (audio && audio.src) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const seekTo = useCallback(
    (seconds: number) => {
      const audio = audioElementRef.current;
      if (!audio) return;
      const target = Math.max(0, Math.min(duration, seconds));
      audio.currentTime = target;
      setCurrentTime(target);
    },
    [duration]
  );

  const seekToVerse = useCallback(
    (index: number) => {
      const verses = currentTrack?.verses;
      if (!verses || index < 0 || index >= verses.length) return;
      const targetVerse = verses[index];
      seekTo(targetVerse.startTime);
      if (!isPlaying) {
        resume();
      }
    },
    [currentTrack?.verses, seekTo, isPlaying, resume]
  );

  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(speed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = speed;
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const toggleTanpura = useCallback(() => {
    setIsTanpuraActive((prev) => !prev);
  }, []);

  const setTanpuraVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setTanpuraVolumeState(clamped);
    synthRef.current?.setVolume(clamped);
  }, []);

  const stopTrack = useCallback(() => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
    setActiveVerseIndex(-1);
    setActiveVerseId(null);
    synthRef.current?.stopDrone();
  }, []);

  return (
    <AudioSanctuaryContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        activeVerseIndex,
        activeVerseId,
        volume,
        isMuted,
        isTanpuraActive,
        tanpuraVolume,
        playTrack,
        togglePlay,
        pause,
        resume,
        seekTo,
        seekToVerse,
        setPlaybackSpeed,
        setVolume,
        toggleMute,
        toggleTanpura,
        setTanpuraVolume,
        stopTrack,
      }}
    >
      {children}
    </AudioSanctuaryContext.Provider>
  );
}

export function useAudioSanctuary() {
  const ctx = useContext(AudioSanctuaryContext);
  if (!ctx) {
    throw new Error(
      'useAudioSanctuary must be used within an AudioSanctuaryProvider'
    );
  }
  return ctx;
}
