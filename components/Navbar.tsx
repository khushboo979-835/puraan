'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ChevronRight, User, Menu, X, Database, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [seeding, setSeeding] = useState(false);

  const handleQuickSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/seed');
      if (res.ok) {
        alert('🌟 Sacred Database successfully populated with Agni Puran and all 6 religions!');
        window.location.reload();
      }
    } catch (e) {
      alert('Seeding failed: ' + e);
    } finally {
      setSeeding(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    await login(authEmail, authName);
    setAuthModalOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Scriptures', href: '/catalog' },
    { name: 'My Sacred Shelf', href: '/my-shelf' },
    { name: 'Authenticity', href: '/book/agni-puran' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#ea8913]/95 backdrop-blur-md border-b-2 border-[#522700] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-[#1f0f00] p-0.5 shadow-md flex items-center justify-center text-[#ffd99e] border-2 border-[#522700] group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-[#000000]">
                  SacredReads
                </span>
                <p className="text-[11px] text-[#241000] font-bold tracking-normal -mt-0.5">
                  Universal Digital Scripture Library
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href === '/catalog' && pathname.startsWith('/catalog'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative flex flex-col items-center py-2 text-sm font-bold transition-colors"
                  >
                    <span
                      className={`${
                        isActive
                          ? 'text-[#000000] font-black'
                          : 'text-[#2b1400] hover:text-[#000000]'
                      }`}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-[#2b1400] font-black leading-none -mt-0.5">
                        (active)
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#000000] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side CTAs & Session */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Seed Helper */}
              <button
                onClick={handleQuickSeed}
                disabled={seeding}
                title="Seed / Reset Database with Agni Puran & All Faiths"
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#ffdca3] hover:bg-[#ffe5b8] text-[#000000] border-2 border-[#522700] transition shadow-xs"
              >
                <Database className={`w-3.5 h-3.5 ${seeding ? 'animate-spin text-[#000000]' : 'text-[#000000]'}`} />
                <span>{seeding ? 'Seeding...' : 'Seed DB'}</span>
              </button>

              {user ? (
                <div className="flex items-center space-x-2 bg-[#ffdca3] border-2 border-[#522700] rounded-full px-3.5 py-1.5 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-[#1f0f00] flex items-center justify-center text-[#ffd99e] font-black text-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#000000] truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="text-[11px] text-[#700c00] hover:text-rose-950 font-black ml-1"
                    title="Sign out"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-xs font-black text-[#000000] hover:text-[#381b00] px-3.5 py-1.5 bg-[#ffdca3] rounded-full border-2 border-[#522700]"
                >
                  Sign In
                </button>
              )}

              {/* Explore Library Pill CTA */}
              <Link
                href="/catalog"
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#1f0f00] hover:bg-[#381b00] text-[#ffd99e] text-xs font-black shadow-md border-2 border-[#522700] transition-all"
              >
                <span>Explore Library</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#ffdca3] border-2 border-[#522700] text-[#000000]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#ea8913] border-b-2 border-[#522700] px-4 pt-2 pb-6 space-y-2 text-[#000000]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#cf7406] text-[#000000]'
                      : 'text-[#1f0f00] hover:bg-[#ffdca3]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="text-xs font-black">(active)</span>}
                </Link>
              );
            })}

            <div className="pt-3 border-t-2 border-[#522700] flex flex-col gap-2">
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-[#1f0f00] text-[#ffd99e] font-black rounded-xl text-xs flex items-center justify-center space-x-1 border-2 border-[#522700]"
              >
                <span>Explore Library</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-[#ffdca3] border-3 border-[#3b1c00] rounded-3xl p-6 shadow-2xl text-[#000000]">
            <div className="flex justify-between items-center pb-3 border-b-2 border-[#522700]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#000000]" />
                <h3 className="font-heading font-black text-xl text-[#000000]">Seeker Sign In</h3>
              </div>
              <button onClick={() => setAuthModalOpen(false)} className="text-[#000000] font-black text-lg hover:text-red-900">
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-black text-[#000000] mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fff4d6] border-2 border-[#522700] rounded-xl text-xs text-[#000000] font-bold focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#000000] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="seeker@sacredreads.org"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fff4d6] border-2 border-[#522700] rounded-xl text-xs text-[#000000] font-bold focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1f0f00] text-[#ffd99e] font-black rounded-xl text-xs shadow-md border border-[#522700] hover:bg-[#381b00]"
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
