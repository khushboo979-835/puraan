'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Award,
  BookOpen,
  Bookmark,
  LogOut,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SEED_BOOKS } from '@/lib/seedData';

export default function ProfilePage() {
  const { user, isPurchased, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsLoggingIn(true);
    await login(emailInput, nameInput || 'Devout Seeker');
    setIsLoggingIn(false);
  };

  const unlockedBooks = (SEED_BOOKS as any[]).filter((b) => isPurchased(b.slug || b._id));

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>Devout Seeker Spiritual Account</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Sadhana & Reading Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
          Manage your unlocked scriptures, certified DRM reading licenses, and personalized bookmarks.
        </p>
      </div>

      {user ? (
        <div className="space-y-8">
          {/* User Info Bento Card */}
          <div className="bento-card rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] font-black text-2xl shadow-lg flex-shrink-0">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-heading font-bold text-[#FFFBEB]">{user.name}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-bold">
                    Devout Active
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono mt-0.5">{user.email}</p>
                <div className="flex items-center space-x-3 text-xs text-amber-300/80 mt-2">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> Daily Chanting Active
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DRM Certified
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl bg-[#1C1610] hover:bg-rose-950/40 text-stone-300 hover:text-rose-300 border border-stone-800 text-xs font-bold transition flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bento-card rounded-2xl p-5 border border-[#F59E0B]/25 text-center space-y-1">
              <span className="text-2xl font-heading font-bold text-[#FFFBEB]">
                {unlockedBooks.length > 0 ? unlockedBooks.length : 6}
              </span>
              <p className="text-xs text-stone-400">Granths in Sacred Shelf</p>
            </div>
            <div className="bento-card rounded-2xl p-5 border border-[#F59E0B]/25 text-center space-y-1">
              <span className="text-2xl font-heading font-bold text-amber-400">100%</span>
              <p className="text-xs text-stone-400">Chapter 1 Free Access</p>
            </div>
            <div className="bento-card rounded-2xl p-5 border border-[#F59E0B]/25 text-center space-y-1">
              <span className="text-2xl font-heading font-bold text-emerald-400">432Hz</span>
              <p className="text-xs text-stone-400">Offline Synthesizer Active</p>
            </div>
          </div>

          {/* Unlocked Scriptures & Direct Actions */}
          <div className="bento-card rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> Your Scriptures & Reading Licenses
              </h3>
              <Link href="/my-shelf" className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-bold">
                <span>View Full Shelf</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {SEED_BOOKS.slice(0, 4).map((book) => (
                <div
                  key={book.slug}
                  className="p-4 rounded-2xl bg-[#120E0A] border border-stone-800 flex items-center justify-between"
                >
                  <div className="space-y-1 min-w-0 pr-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400">{book.religion}</span>
                    <h4 className="font-heading font-bold text-sm text-[#FFFBEB] truncate">{book.title}</h4>
                    <p className="text-[11px] text-stone-400">{book.totalChapters} Adhyays • Audio Synced</p>
                  </div>
                  <Link
                    href={`/reader/${book.slug}/1`}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl btn-gold-glow text-[#0A0908] text-xs font-bold shadow-md"
                  >
                    Read ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Sign In / Sign Up Form */
        <div className="max-w-md mx-auto bento-card rounded-3xl p-8 border-2 border-[#F59E0B]/40 shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] mx-auto shadow-lg">
            <Flame className="w-7 h-7" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-heading font-bold text-[#FFFBEB]">
              Devout Seeker Login
            </h2>
            <p className="text-xs text-stone-400">
              Access your saved bookmarks, reading streak, and unlocked chapters.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-300 font-bold mb-1.5">Full Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="seeker@gyandharam.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 btn-gold-glow text-[#0A0908] font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition hover:scale-[1.02] disabled:opacity-50"
            >
              <span>{isLoggingIn ? 'Signing In...' : 'Sign In to GyanDharam ↗'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
