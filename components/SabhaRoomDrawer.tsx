'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, Volume2, Sparkles, Heart, Flame, Radio, Play, Pause, MessageSquare } from 'lucide-react';

interface SabhaRoomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SabhaRoomDrawer({ isOpen, onClose }: SabhaRoomDrawerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekersCount, setSeekersCount] = useState(1482);
  const [blessingReactions, setBlessingReactions] = useState<{ id: number; symbol: string }[]>([]);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Simulate live seekers joining periodically
      const interval = setInterval(() => {
        setSeekersCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const toggleSabhaAudio = () => {
    if (!audioRef) {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');
      audio.loop = true;
      audio.play().catch(() => {});
      setAudioRef(audio);
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        audioRef.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleSendBlessing = (symbol: string) => {
    const id = Date.now() + Math.random();
    setBlessingReactions((prev) => [...prev, { id, symbol }]);
    setTimeout(() => {
      setBlessingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#120F0C] border-l border-[#F59E0B]/30 flex flex-col shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Floating animated reactions */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {blessingReactions.map((r) => (
            <div
              key={r.id}
              className="absolute bottom-24 right-12 text-3xl animate-bounce"
              style={{
                animationDuration: '1.8s',
                transform: `translateY(-${Math.random() * 100}px) scale(1.4)`,
              }}
            >
              {r.symbol}
            </div>
          ))}
        </div>

        {/* Top Header */}
        <div className="p-5 border-b border-[#F59E0B]/20 flex items-center justify-between bg-[#19130D]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-bold text-lg text-[#FEF3C7]">Sabha / Live Satsang</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium">
                Universal Multi-Faith Chanting Circle
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioRef) audioRef.pause();
              setIsPlaying(false);
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Room Visualizer Card */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="bento-card-active rounded-3xl p-6 text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#F59E0B]/50 p-1 bg-gradient-to-b from-[#2A1E12] to-[#120F0C] shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center">
              <Flame className="w-10 h-10 text-[#F59E0B] animate-pulse" />
            </div>

            <h4 className="font-heading font-bold text-xl text-[#FFFBEB] mb-1">
              Maha Mrityunjaya & Shanti Recitation
            </h4>
            <p className="text-xs text-stone-300 font-serif">
              Acharya Vidyadhar & Universal Choir
            </p>

            {/* Live Seekers Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2A1E12] border border-[#F59E0B]/40 text-xs font-bold text-[#FEF3C7] my-4 shadow-sm">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{seekersCount.toLocaleString()} Seekers Chanting in Sync</span>
            </div>

            {/* Equalizer Visualizer */}
            <div className="flex items-center justify-center space-x-1.5 h-10 my-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-[#F59E0B] transition-all duration-300 ${
                    isPlaying ? `animate-wave-${(i % 5) + 1}` : 'h-2 opacity-40'
                  }`}
                />
              ))}
            </div>

            {/* Join Audio Feed CTA */}
            <button
              onClick={toggleSabhaAudio}
              className="btn-gold-glow w-full py-3 rounded-full text-xs font-bold shadow-lg flex items-center justify-center space-x-2 text-[#0A0908]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-[#0A0908]" />
                  <span>Mute Sabha Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#0A0908]" />
                  <span>Join Live Voice Stream 🎧</span>
                </>
              )}
            </button>
          </div>

          {/* Sacred Blessing Reactions */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-wider font-bold text-stone-400">
              Send Sacred Flowers & Blessings
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {['🙏', '🕉️', '🪔', '🌸', '💖'].map((sym) => (
                <button
                  key={sym}
                  onClick={() => handleSendBlessing(sym)}
                  className="py-3 rounded-2xl bg-[#1C1610] hover:bg-[#2E2215] border border-[#F59E0B]/30 hover:border-[#F59E0B] text-2xl transition hover:scale-110 flex items-center justify-center shadow-xs"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Active Seeker Community */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-wider font-bold text-stone-400">
              Active Listeners in Room
            </h5>
            <div className="space-y-2">
              {[
                { name: 'Dr. Ramesh Sharma', location: 'Patna, Bihar', role: 'Devout Seeker', icon: '🙏' },
                { name: 'Sister Sarah Jenkins', location: 'London, UK', role: 'Bible Scholar', icon: '✝️' },
                { name: 'Harpreet Singh', location: 'Amritsar, Punjab', role: 'Gurbani Devotee', icon: 'ੴ' },
                { name: 'Tenzin Gyatso', location: 'Dharamshala, HP', role: 'Pali Chanter', icon: '☸️' },
              ].map((seeker, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#18130E] border border-stone-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] text-[#0A0908] font-bold text-xs flex items-center justify-center">
                      {seeker.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-200 block">{seeker.name}</span>
                      <span className="text-[10px] text-stone-400 block">{seeker.location}</span>
                    </div>
                  </div>
                  <span className="text-sm">{seeker.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0F0C09] text-[11px] text-stone-400 text-center">
          Audio is streamed with 100% loss-free spatial sacred sound engineering
        </div>
      </div>
    </div>
  );
}
