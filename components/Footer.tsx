'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart, MapPin, Phone, Mail, Globe, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  const religions = [
    { name: 'Sanatan Dharma (सनातन धर्म)', symbol: 'ॐ', count: 'Bhagavad Gita & Puranas', href: '/reader/bhagavad-gita/1' },
    { name: 'Islamic Revelations (إسلام)', symbol: '☪', count: 'The Holy Quran', href: '/reader/the-holy-quran/1' },
    { name: 'Christian Gospels (ईसाई)', symbol: '✝', count: 'Psalms & Gospels', href: '/reader/the-holy-bible-psalms/1' },
    { name: 'Sikh Granth (ਸਿੱਖ)', symbol: 'ੴ', count: 'Sri Guru Granth Sahib', href: '/reader/japji-sahib/1' },
    { name: 'Buddha Vaani (बौद्ध)', symbol: '☸', count: 'The Dhammapada', href: '/reader/dhammapada/1' },
    { name: 'Jain Philosophy (जैन)', symbol: '卐', count: 'Kalpa & Tattvartha Sutra', href: '/reader/tattvartha-sutra/1' },
  ];

  return (
    <footer className="border-t border-amber-500/20 bg-[#080604] text-stone-300 text-xs mt-auto pb-36 sm:pb-40 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        
        {/* Six Faith Traditions Top Banner */}
        <div className="mb-12 pb-8 border-b border-stone-800/80">
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              Universal Wisdom Sanctuary
            </span>
            <h3 className="text-stone-200 font-heading text-sm sm:text-base font-bold mt-2">
              Six Sacred Traditions Preserved in Digital Harmony
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {religions.map((rel) => (
              <Link
                key={rel.name}
                href={rel.href}
                className="group p-3 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900 transition-all text-center flex flex-col items-center justify-center shadow-xs"
              >
                <span className="text-xl font-serif text-amber-400 group-hover:scale-110 transition-transform mb-1">
                  {rel.symbol}
                </span>
                <p className="font-bold text-stone-200 text-xs truncate w-full group-hover:text-amber-300 transition-colors">
                  {rel.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-stone-400 truncate w-full">{rel.count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 4-Column Footer Main Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.45)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] group-hover:scale-105 transition-all bg-[#18130E] flex-shrink-0">
                <img src="/logo.jpg" alt="GyanDharam Logo" className="w-full h-full object-cover scale-105" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tight gold-gradient-text leading-tight">
                  GyanDharam
                </span>
                <span className="text-[10px] text-stone-400 font-medium">gyandharam.com</span>
              </div>
            </Link>
            
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Universal Multi-Faith Digital Library &amp; Synchronized Voice Reader. Preserving original manuscripts across Sanatan Dharma, Islam, Christianity, Sikhism, Buddhism, and Jainism with line-by-line vocal recitation.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-amber-400/90 font-medium bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Razorpay 256-bit Secured &amp; Watermarked DRM</span>
            </div>
          </div>

          {/* Col 2: Navigation & Legal (2 cols) */}
          <div className="space-y-2.5 lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Navigation &amp; Legal
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/library" className="hover:text-amber-300 transition">
                  Sacred Library
                </Link>
              </li>
              <li>
                <Link href="/interactive-audio" className="hover:text-amber-300 transition">
                  Audio Studio (Vani)
                </Link>
              </li>
              <li>
                <Link href="/my-shelf" className="hover:text-amber-300 transition">
                  My Shelf &amp; PDFs
                </Link>
              </li>
              <li>
                <Link href="/sabha" className="hover:text-amber-300 transition">
                  Live Sabha Room
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  About Us &amp; Lineages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sacred Scriptures (3 cols) */}
          <div className="space-y-2.5 lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Sacred Scriptures
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/reader/bhagavad-gita/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Shrimad Bhagavad Gita</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/the-holy-quran/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Holy Quran (القرآن)</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/the-holy-bible-psalms/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Holy Bible (Psalms)</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/japji-sahib/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Sri Guru Granth Sahib</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/dhammapada/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Dhammapada (धम्मपद)</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/tattvartha-sutra/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Kalpa &amp; Tattvartha Sutra</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/agni-puran/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Agni Puran (अग्नि पुराण)</span>
                  <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">Free Ch 1</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact Card (3 cols) */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Official Contact (कार्यालय)
            </h4>
            
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/25 space-y-3 shadow-md">
              <div className="flex items-start space-x-2.5 text-stone-300">
                <div className="w-6 h-6 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Headquarters:</span>
                  <p className="text-xs text-stone-200 font-medium leading-snug">
                    Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2.5 border-t border-stone-800">
                <div className="w-6 h-6 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Helpline / Phone:</span>
                  <a href="tel:+917488482052" className="text-xs text-stone-100 font-bold hover:text-amber-300 transition block">
                    +91-74884-82052
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2.5 border-t border-stone-800">
                <div className="w-6 h-6 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Official Support Email:</span>
                  <a href="mailto:gyandharamofficial@gmail.com" className="text-xs text-amber-300 font-bold hover:underline block break-all">
                    gyandharamofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2.5 border-t border-stone-800">
                <div className="w-6 h-6 rounded-md bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Official Portal:</span>
                  <a href="https://www.gyandharam.com/" className="text-xs text-stone-200 font-medium hover:text-amber-300 transition block">
                    https://www.gyandharam.com/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer DDIS Spotlight Bar (Dedicated Row with Glowing Aura) */}
        <div className="py-6 border-t border-stone-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-stone-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Digital Engineering &amp; Global Sacred Preservation Architecture</span>
          </div>

          {/* DDIS Animated Luxury Credit Badge */}
          <div>
            <a
              href="https://www.digitalinfinityddis.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-stone-900 via-[#1c140c] to-stone-900 border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Subtle animated background ping/glow */}
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/30 to-amber-500/30 blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs text-stone-200 group-hover:text-white font-medium">
                Designed &amp; Developed by
              </span>
              <span className="text-xs font-black gold-gradient-text flex items-center gap-1">
                Digital Infinity DDIS
                <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </a>
          </div>
        </div>

        {/* Copyright & Theological Integrity */}
        <div className="pt-4 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} GyanDharam (gyandharam.com). All Rights Reserved. Universal Multi-Faith Digital Library.</p>
          <p className="text-amber-500/70">Verified with BORI, SGPC, King Fahd Quran Complex &amp; PTS Standards</p>
        </div>

      </div>
    </footer>
  );
}
