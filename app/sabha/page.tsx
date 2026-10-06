'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Radio,
  Users,
  Flame,
  Volume2,
  Sparkles,
  MessageCircle,
  Bell,
  Heart,
  Share2,
  Headphones,
  CheckCircle,
  Send,
  Disc3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SpiritualAmbientSynthesizer } from '@/lib/spiritualAudioEngine';

export default function SabhaPage() {
  const { user } = useAuth();
  const [activeRoomId, setActiveRoomId] = useState('gita-sabha');
  const [seekersCount, setSeekersCount] = useState(1482);
  const [bellChimes, setBellChimes] = useState(128);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Aarav Sharma', text: 'Adhyay 2 Shloka 47 recitation brings absolute clarity 🙏', time: 'Just now' },
    { id: 2, user: 'Dr. Tariq Siddiqui', text: 'MashaAllah, Surah Al-Fatiha recitation cadence is breathtaking ✨', time: '1m ago' },
    { id: 3, user: 'Gurpreet Singh', text: 'Mool Mantar gives profound inner peace. Waheguru Ji 🙏', time: '2m ago' },
    { id: 4, user: 'Sister Maria', text: 'Psalm 23 is such a comfort to start the morning with 🕊️', time: '4m ago' },
  ]);

  const rooms = [
    {
      id: 'gita-sabha',
      title: 'Gita Gyan Sabha: Adhyay 2 Recitation',
      faith: 'Sanatan Dharma',
      activeSeekers: 642,
      scripture: 'Shrimad Bhagavad Gita',
      currentVerse: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन...',
      droneFreq: '432Hz Om / Tanpura',
      color: '#F59E0B',
    },
    {
      id: 'tilawat-circle',
      title: 'Tilawat-e-Quran: Surah Al-Fatiha',
      faith: 'Islam',
      activeSeekers: 384,
      scripture: 'The Holy Quran',
      currentVerse: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...',
      droneFreq: 'Acoustic Maqam',
      color: '#10B981',
    },
    {
      id: 'gurbani-satsang',
      title: 'Gurbani Kirtan: Japji Sahib Pauri 1-5',
      faith: 'Sikhism',
      activeSeekers: 218,
      scripture: 'Sri Guru Granth Sahib',
      currentVerse: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ...',
      droneFreq: 'Harmonium Drone',
      color: '#FB923C',
    },
    {
      id: 'zen-vipassana',
      title: 'Zen Meditative Chanting: Yamakavagga',
      faith: 'Buddhism',
      activeSeekers: 238,
      scripture: 'The Dhammapada',
      currentVerse: 'मनोपुब्बङ्गमा धम्मा मनोसेट्ठा मनोमया...',
      droneFreq: '528Hz Singing Bowl',
      color: '#EAB308',
    },
  ];

  const currentRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([
      {
        id: Date.now(),
        user: user?.name || 'Devout Seeker',
        text: chatMessage,
        time: 'Just now',
      },
      ...messages,
    ]);
    setChatMessage('');
  };

  const handleRingBell = () => {
    setBellChimes((prev) => prev + 1);
    if (typeof window !== 'undefined') {
      const synth = new SpiritualAmbientSynthesizer();
      synth.playZenChime(currentRoom.faith.toLowerCase());
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Sabha Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Universal Digital Sabha • Live Community Sanctuary</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Satsang & Community Chanting Rooms
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Chant scriptures simultaneously with over <strong>{seekersCount.toLocaleString()}+ seekers</strong> worldwide. Experience synchronised recitation and collective spiritual resonance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Rooms Selector & Live Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Sabha Broadcast Card */}
          <div className="bento-card rounded-3xl p-6 sm:p-8 border-2 border-[#F59E0B]/50 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>LIVE BROADCAST</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-amber-300 font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>{currentRoom.activeSeekers} Seekers Listening</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
                {currentRoom.faith} • {currentRoom.droneFreq}
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#FFFBEB]">
                {currentRoom.title}
              </h2>
            </div>

            {/* Chanting Display */}
            <div className="p-6 rounded-2xl bg-[#120E0A] border border-[#F59E0B]/30 text-center space-y-3">
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                Now Chanting Synchronously
              </span>
              <p className="text-lg sm:text-xl font-serif text-[#FFFBEB] leading-relaxed drop-shadow-md">
                &ldquo;{currentRoom.currentVerse}&rdquo;
              </p>
              <p className="text-xs text-amber-200/80 font-sans italic">
                From {currentRoom.scripture}
              </p>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleRingBell}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#18130E] hover:bg-[#2A1F13] text-amber-300 border border-[#F59E0B]/30 text-xs font-bold transition shadow-sm"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Ring Sacred Bell ({bellChimes})</span>
              </button>

              <Link
                href="/library"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl btn-gold-glow text-[#0A0908] text-xs font-bold transition shadow-md"
              >
                <Headphones className="w-4 h-4" />
                <span>Open Reader Studio ↗</span>
              </Link>
            </div>
          </div>

          {/* All Live Rooms Grid */}
          <div className="bento-card rounded-3xl p-5 sm:p-6 border border-[#F59E0B]/30 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" /> All Active Community Rooms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                    activeRoomId === room.id
                      ? 'bg-gradient-to-b from-[#241A10] to-[#18120B] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-[#120E0A] border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold text-amber-400">
                      {room.faith}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {room.activeSeekers}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#FFFBEB] mt-1 line-clamp-1">
                    {room.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 truncate">{room.scripture}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Devout Reflections & Chat (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bento-card rounded-3xl p-5 sm:p-6 border border-[#F59E0B]/30 shadow-xl space-y-4 flex flex-col h-[560px]">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> Live Devout Reflections
              </h3>
              <span className="text-[10px] text-stone-400">Real-time Stream</span>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.map((m) => (
                <div key={m.id} className="p-3 rounded-2xl bg-[#120E0A] border border-stone-800/80 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-amber-300">{m.user}</span>
                    <span className="text-stone-500 text-[10px]">{m.time}</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                placeholder="Share your spiritual reflection..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-[#120E0A] border border-stone-800 rounded-xl text-xs text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl btn-gold-glow text-[#0A0908] font-bold shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
