'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    await login(authEmail, authName);
    setAuthModalOpen(false);
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(navSearchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sacred Library', href: '/catalog' },
    { name: 'Interactive Audio', href: '/reader/agni-puran/1' },
    { name: 'My Shelf', href: '/my-shelf' },
    { name: 'About Us', href: '/book/agni-puran' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0d0c0b]/95 backdrop-blur-xl border-b border-[#e2ab46]/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex items-center justify-center border border-[#e2ab46]/50 shadow-md group-hover:scale-105 transition-transform bg-[#18130e]">
                <img
                  src="/logo.jpg"
                  alt="GyanDharam Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-[#fce8bd] group-hover:text-[#fae0a2] transition-colors">
                GyanDharam
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href === '/catalog' && pathname.startsWith('/catalog'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-[#fce8bd] font-semibold text-shadow-gold'
                        : 'text-stone-300 hover:text-[#fae0a2] font-normal'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-stone-300 hover:text-[#fae0a2] p-1.5 transition"
                title="Search Scriptures"
              >
                <Search className="w-4 h-4 stroke-[2]" />
              </button>
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center space-x-3.5">
              {/* Join Sabha / Room ↗ CTA */}
              <Link
                href="/reader/agni-puran/1"
                className="btn-gold-glow flex items-center space-x-1.5 px-5 py-2 rounded-full text-xs font-bold shadow-lg text-[#120b02]"
              >
                <span>Join Sabha / Room</span>
                <span className="text-xs">↗</span>
              </Link>

              {/* User Avatar */}
              {user ? (
                <div className="flex items-center space-x-2 bg-[#1a140f] border border-[#e2ab46]/40 rounded-full pl-1 pr-2.5 py-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#b87c1e] to-[#fae0a2] flex items-center justify-center text-[#120b02] font-black text-xs shadow-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-medium text-stone-200 truncate max-w-[70px]">
                    {user.name?.split(' ')[0]}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="text-[10px] text-stone-400 hover:text-amber-300 ml-1"
                    title="Sign Out"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#3a2c1d] to-[#1a140f] border border-[#e2ab46]/50 flex items-center justify-center text-[#fce8bd] hover:border-[#fce8bd] hover:scale-105 transition shadow-sm"
                  title="Sign In"
                >
                  <User className="w-4 h-4 text-[#fae0a2]" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2.5">
              <Link
                href="/reader/agni-puran/1"
                className="btn-gold-glow px-3 py-1.5 rounded-full text-xs font-bold text-[#120b02]"
              >
                <span>Sabha ↗</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Dropdown */}
          {searchOpen && (
            <div className="py-3 border-t border-stone-800/80 animate-in fade-in slide-in-from-top-2">
              <form onSubmit={handleNavSearch} className="max-w-2xl mx-auto flex items-center">
                <div className="relative w-full flex items-center bg-[#15110d] border border-[#e2ab46]/40 rounded-full overflow-hidden px-4 py-2">
                  <Search className="w-4 h-4 text-amber-400/80 mr-2.5 flex-shrink-0" />
                  <input
                    type="text"
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    placeholder="Search granth, shloka, aayat, ya vachan..."
                    className="w-full bg-transparent text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-gold-glow px-4 py-1.5 rounded-full text-xs font-bold ml-2 text-[#120b02]"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#120f0c] border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 text-stone-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#221c16] text-[#fae0a2] border border-[#e2ab46]/30'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="text-xs text-amber-400 font-bold">●</span>}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bento-card rounded-3xl p-6 shadow-2xl text-stone-200">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-xl text-[#fce8bd]">Seeker Sign In</h3>
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
                <label className="block text-xs font-semibold text-stone-300 mb-1">Your Name</label>
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
                className="btn-gold-glow w-full py-2.5 font-bold rounded-xl text-xs shadow-lg text-[#120b02]"
              >
                Continue into Sacred Studio
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
