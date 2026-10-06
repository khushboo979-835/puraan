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
    <footer className="border-t border-amber-500/20 bg-[#080604] text-stone-300 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
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
                className="group p-3 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900 transition-all text-center flex flex-col items-center justify-center"
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

        {/* 4-Column Footer Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-500/40 bg-[#18130E] flex-shrink-0">
                <img src="/logo.jpg" alt="GyanDharam Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg gold-gradient-text block">GyanDharam</span>
                <span className="text-[10px] text-stone-400 font-medium block -mt-1">gyandharam.com</span>
              </div>
            </div>
            
            <p className="text-stone-400 text-xs leading-relaxed">
              Universal Multi-Faith Digital Library &amp; Synchronized Voice Reader. Preserving original manuscripts across Sanatan Dharma, Islam, Christianity, Sikhism, Buddhism, and Jainism with line-by-line vocal recitation.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-amber-400/90 font-medium bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Razorpay 256-bit Secured &amp; Watermarked DRM</span>
            </div>
          </div>

          {/* Col 2: Quick Links & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Navigation &amp; Legal
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/library" className="hover:text-amber-300 transition">
                  Sacred Library (6 Faiths)
                </Link>
              </li>
              <li>
                <Link href="/interactive-audio" className="hover:text-amber-300 transition">
                  Interactive Audio Studio (Vani)
                </Link>
              </li>
              <li>
                <Link href="/my-shelf" className="hover:text-amber-300 transition">
                  My Shelf &amp; Watermarked PDFs
                </Link>
              </li>
              <li>
                <Link href="/sabha" className="hover:text-amber-300 transition">
                  Live Sabha &amp; Satsang Room
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  About Us &amp; Theological Lineages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition">
                  Contact Us &amp; Patna Headquarters
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition">
                  Privacy Policy &amp; DPDP Compliance
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition">
                  Terms of Service &amp; Free Ch 1 Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sacred Scriptures */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Sacred Scriptures
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/reader/bhagavad-gita/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Shrimad Bhagavad Gita</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/the-holy-quran/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Holy Quran (القرآن)</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/the-holy-bible-psalms/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Holy Bible (Psalms)</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/japji-sahib/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Sri Guru Granth Sahib</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/dhammapada/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>The Dhammapada (बुद्ध वाणी)</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/tattvartha-sutra/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Kalpa &amp; Tattvartha Sutra</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
              <li>
                <Link href="/reader/agni-puran/1" className="hover:text-amber-300 transition flex items-center justify-between">
                  <span>Agni Puran (अग्नि पुराण)</span>
                  <span className="text-[10px] text-amber-500/80">Ch 1 Free</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact Card */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFFBEB] uppercase tracking-wider">
              Official Contact (कार्यालय)
            </h4>
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <div className="flex items-start space-x-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Headquarters:</span>
                  <p className="text-xs text-stone-300 leading-snug">
                    Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2 border-t border-stone-800">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Helpline / Phone:</span>
                  <a href="tel:+917488482052" className="text-xs text-stone-200 font-semibold hover:text-amber-300 transition">
                    +91-74884-82052
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2 border-t border-stone-800">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Official Support Email:</span>
                  <a href="mailto:gyandharamofficial@gmail.com" className="text-xs text-amber-300 font-semibold hover:underline">
                    gyandharamofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-stone-300 pt-2 border-t border-stone-800">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Official Portal:</span>
                  <a href="https://www.gyandharam.com/" className="text-xs text-stone-300 hover:text-amber-300 transition">
                    https://www.gyandharam.com/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Credit & Copyright Strip */}
        <div className="pt-8 border-t border-stone-800/90 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400">
          <div className="text-center md:text-left space-y-1">
            <p className="text-xs font-medium text-stone-300">
              © {new Date().getFullYear()} GyanDharam (gyandharam.com). All Rights Reserved. Universal Scripture Library.
            </p>
            <p className="text-[11px] text-stone-500">
              Verified with BORI, SGPC, King Fahd Quran Complex, &amp; PTS theological benchmarks.
            </p>
          </div>

          {/* DDIS Developer Credit with Luxury Animated Glow */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.digitalinfinityddis.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-stone-900 via-[#1c140c] to-stone-900 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Subtle animated background ping/glow */}
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[11px] text-stone-300 group-hover:text-stone-100 font-medium">
                Designed &amp; Developed by
              </span>
              <span className="text-xs font-bold gold-gradient-text flex items-center gap-1">
                Digital Infinity DDIS
                <ExternalLink className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
