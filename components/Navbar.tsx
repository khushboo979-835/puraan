'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, Menu, X, Sparkles, ChevronDown, Flame, Radio, Bookmark, Volume2, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import MegaMenu from '@/components/MegaMenu';
import CommandPaletteModal from '@/components/CommandPaletteModal';
import SabhaRoomDrawer from '@/components/SabhaRoomDrawer';
import MyShelfDrawer from '@/components/MyShelfDrawer';
import AboutUsModal from '@/components/AboutUsModal';
import AudioStudioDrawer from '@/components/AudioStudioDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();

  // Modals & Drawers State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [sabhaRoomOpen, setSabhaRoomOpen] = useState(false);
  const [myShelfOpen, setMyShelfOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [audioStudioOpen, setAudioStudioOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    await login(authEmail, authName);
    setAuthModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A0908]/95 backdrop-blur-2xl border-b border-[#F59E0B]/20 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center border border-[#F59E0B]/60 shadow-md group-hover:scale-105 transition-transform bg-[#18130E]">
                <img
                  src="/logo.jpg"
                  alt="GyanDharam Brand Flame"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight gold-gradient-text">
                  GyanDharam
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 relative">
              <Link
                href="/"
                className={`text-sm transition-all duration-200 ${
                  pathname === '/' ? 'text-[#FEF3C7] font-bold text-shadow-gold' : 'text-stone-300 hover:text-[#F59E0B]'
                }`}
              >
                Home
              </Link>

              {/* Sacred Library Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
              >
                <button
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className="text-sm text-stone-300 hover:text-[#F59E0B] transition flex items-center gap-1 font-medium py-2"
                >
                  <span>Sacred Library</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
              </div>

              {/* Interactive Audio (Vani) Trigger */}
              <button
                onClick={() => setAudioStudioOpen(true)}
                className="text-sm text-stone-300 hover:text-[#F59E0B] transition flex items-center gap-1.5 font-medium"
              >
                <span>Interactive Audio (Vani)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              </button>

              {/* My Shelf Trigger */}
              <button
                onClick={() => setMyShelfOpen(true)}
                className="text-sm text-stone-300 hover:text-[#F59E0B] transition font-medium"
              >
                My Shelf
              </button>

              {/* About Us Trigger */}
              <button
                onClick={() => setAboutUsOpen(true)}
                className="text-sm text-stone-300 hover:text-[#F59E0B] transition font-medium"
              >
                About Us
              </button>

              {/* Command Palette Trigger (Cmd+K) */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="text-stone-300 hover:text-[#F59E0B] p-2 rounded-xl hover:bg-stone-900/60 transition flex items-center gap-1 border border-transparent hover:border-[#F59E0B]/30"
                title="Search Scriptures (Cmd + K)"
              >
                <Search className="w-4 h-4 stroke-[2]" />
                <span className="text-[10px] font-mono bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded">⌘K</span>
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-3.5">
              {/* Join Sabha / Room ↗ Button */}
              <button
                onClick={() => setSabhaRoomOpen(true)}
                className="btn-gold-glow flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-xs font-bold shadow-lg text-[#0A0908]"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Join Sabha / Room</span>
                <span className="text-xs">↗</span>
              </button>

              {/* User Profile Avatar / Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 bg-[#18130E] border border-[#F59E0B]/40 rounded-full pl-1 pr-3 py-1 hover:border-[#F59E0B] transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] font-black text-xs shadow-sm">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-semibold text-stone-200 truncate max-w-[80px]">
                      {user.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bento-card rounded-2xl p-2 shadow-2xl border border-[#F59E0B]/40 z-50 animate-in fade-in">
                      <div className="px-3 py-2 border-b border-stone-800">
                        <span className="text-xs font-bold text-[#FEF3C7] block truncate">{user.name}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{user.email}</span>
                      </div>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMyShelfOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:text-amber-200 hover:bg-[#20180F] rounded-lg transition flex items-center gap-2"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                        <span>My Reading Shelf</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3A2A1A] to-[#18130E] border border-[#F59E0B]/50 flex items-center justify-center text-[#FEF3C7] hover:border-[#FEF3C7] hover:scale-105 transition shadow-sm"
                  title="Devout Sign In"
                >
                  <User className="w-4 h-4 text-[#F59E0B]" />
                </button>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200"
                title="Search"
              >
                <Search className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => setSabhaRoomOpen(true)}
                className="btn-gold-glow px-3 py-1.5 rounded-full text-xs font-bold text-[#0A0908]"
              >
                <span>Sabha ↗</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#120F0C] border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 text-stone-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Home</span>
            </Link>

            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Sacred Library</span>
              <span className="text-xs text-amber-400">6 Traditions</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAudioStudioOpen(true);
              }}
              className="w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Interactive Audio (Vani)</span>
              <span className="text-xs text-amber-400">Live Player 🎧</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setMyShelfOpen(true);
              }}
              className="w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>My Shelf</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAboutUsOpen(true);
              }}
              className="w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>About Us & Authenticity</span>
            </button>
          </div>
        )}
      </header>

      {/* Global Modals & Drawers */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onPlayAudio={(title, url) => {
          setCommandPaletteOpen(false);
          setAudioStudioOpen(true);
        }}
      />

      <SabhaRoomDrawer
        isOpen={sabhaRoomOpen}
        onClose={() => setSabhaRoomOpen(false)}
      />

      <MyShelfDrawer
        isOpen={myShelfOpen}
        onClose={() => setMyShelfOpen(false)}
        onPlayAudio={() => {
          setMyShelfOpen(false);
          setAudioStudioOpen(true);
        }}
      />

      <AboutUsModal
        isOpen={aboutUsOpen}
        onClose={() => setAboutUsOpen(false)}
      />

      <AudioStudioDrawer
        isOpen={audioStudioOpen}
        onClose={() => setAudioStudioOpen(false)}
      />

      {/* Devout Sign In Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bento-card rounded-3xl p-6 shadow-2xl text-stone-200 border border-[#F59E0B]/40">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-heading font-bold text-xl text-[#FEF3C7]">Seeker Sign In</h3>
              </div>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="text-stone-400 hover:text-stone-100 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="seeker@gyandharam.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="btn-gold-glow w-full py-2.5 font-bold rounded-xl text-xs shadow-lg text-[#0A0908]"
              >
                Enter Sacred Library
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
