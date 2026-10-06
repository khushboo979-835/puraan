'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Flame,
  Radio,
  Bookmark,
  Volume2,
  ShieldCheck,
  LogOut,
  Headphones,
  BookOpen,
  Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import MegaMenu from '@/components/MegaMenu';
import CommandPaletteModal from '@/components/CommandPaletteModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();

  // Modals & Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
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
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center border-2 border-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.45)] group-hover:shadow-[0_0_28px_rgba(245,158,11,0.8)] group-hover:scale-105 transition-all bg-[#18130E] flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="GyanDharam Brand Flame"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl sm:text-[26px] tracking-tight gold-gradient-text leading-none">
                  GyanDharam
                </span>
                <span className="text-[10px] text-amber-300/80 font-semibold tracking-wider uppercase mt-0.5 hidden sm:block">
                  Universal Sanctuary
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 relative">
              <Link
                href="/"
                className={`text-sm transition-all duration-200 ${
                  pathname === '/'
                    ? 'text-[#FEF3C7] font-bold text-shadow-gold'
                    : 'text-stone-300 hover:text-[#F59E0B]'
                }`}
              >
                Home
              </Link>

              {/* Sacred Library Link + Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <Link
                  href="/library"
                  className={`text-sm transition-all duration-200 flex items-center gap-1 py-2 font-medium ${
                    pathname === '/library' || pathname === '/catalog'
                      ? 'text-[#FEF3C7] font-bold text-shadow-gold'
                      : 'text-stone-300 hover:text-[#F59E0B]'
                  }`}
                >
                  <span>Sacred Library</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </Link>

                <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
              </div>

              {/* Interactive Audio (Vani) URL Link */}
              <Link
                href="/interactive-audio"
                className={`text-sm transition-all duration-200 flex items-center gap-1.5 font-medium ${
                  pathname === '/interactive-audio'
                    ? 'text-[#FEF3C7] font-bold text-shadow-gold'
                    : 'text-stone-300 hover:text-[#F59E0B]'
                }`}
              >
                <span>Interactive Audio (Vani)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              </Link>

              {/* My Shelf URL Link */}
              <Link
                href="/my-shelf"
                className={`text-sm transition-all duration-200 font-medium ${
                  pathname === '/my-shelf'
                    ? 'text-[#FEF3C7] font-bold text-shadow-gold'
                    : 'text-stone-300 hover:text-[#F59E0B]'
                }`}
              >
                My Shelf
              </Link>

              {/* About Us URL Link */}
              <Link
                href="/about"
                className={`text-sm transition-all duration-200 font-medium ${
                  pathname === '/about'
                    ? 'text-[#FEF3C7] font-bold text-shadow-gold'
                    : 'text-stone-300 hover:text-[#F59E0B]'
                }`}
              >
                About Us
              </Link>

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
              {/* Join Sabha / Room ↗ Button Link */}
              <Link
                href="/sabha"
                className="btn-gold-glow flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-xs font-bold shadow-lg text-[#0A0908] hover:scale-105 transition"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Join Sabha / Room</span>
                <span className="text-xs">↗</span>
              </Link>

              {/* User Profile Avatar / Dropdown Link */}
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

                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:text-amber-200 hover:bg-[#20180F] rounded-lg transition flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>Profile & Sadhana</span>
                      </Link>

                      <Link
                        href="/my-shelf"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:text-amber-200 hover:bg-[#20180F] rounded-lg transition flex items-center gap-2"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                        <span>My Reading Shelf</span>
                      </Link>

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
                <Link
                  href="/profile"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3A2A1A] to-[#18130E] border border-[#F59E0B]/50 flex items-center justify-center text-[#FEF3C7] hover:border-[#FEF3C7] hover:scale-105 transition shadow-sm"
                  title="Devout Profile / Sign In"
                >
                  <User className="w-4 h-4 text-[#F59E0B]" />
                </Link>
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

              <Link
                href="/sabha"
                className="btn-gold-glow px-3 py-1.5 rounded-full text-xs font-bold text-[#0A0908]"
              >
                <span>Sabha ↗</span>
              </Link>

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
              href="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Sacred Library</span>
              <span className="text-xs text-amber-400">6 Traditions</span>
            </Link>

            <Link
              href="/interactive-audio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Interactive Audio (Vani)</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </Link>

            <Link
              href="/my-shelf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>My Shelf</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>About Us</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1E1710]"
            >
              <span>Devout Profile</span>
              <User className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        )}
      </header>

      {/* Global Command Palette Modal (Cmd+K) */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
