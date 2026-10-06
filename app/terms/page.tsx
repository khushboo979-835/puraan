'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, ChevronLeft, Lock } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4 mb-10 pb-6 border-b border-[#F59E0B]/20">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1C1610] border border-[#F59E0B]/30 text-[11px] text-amber-300 font-bold">
          <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Authorized Legal Document</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#FFFBEB]">
          Terms of Service &amp; Scholastic Usage
        </h1>
        <p className="text-xs text-stone-400">
          Last Updated: October 2026 • Universal Governance for GyanDharam
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed">
        <section className="bento-card rounded-2xl p-6 border border-stone-800 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300">
            1. Universal Access &amp; Chapter 1 Free Guarantee
          </h2>
          <p>
            GyanDharam provides unrestricted free digital access to Chapter 1 of every major sacred scripture in perpetuity. Complete Adhyays/Surahs/Chapters are unlocked with a single contribution (₹49 per book or ₹199 all-access annual pass) that supports open theological manuscript research, server upkeep, and multi-lingual voice synchronization.
          </p>
        </section>

        <section className="bento-card rounded-2xl p-6 border border-stone-800 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300">
            2. Intellectual Property &amp; Manuscript Integrity
          </h2>
          <p>
            All critical editions, phonetics, audio synchronizations, and acoustic synthesized recordings are the intellectual property of GyanDharam and partner oriental archives (BORI, SGPC, King Fahd Quran Complex). Seekers are granted a personal non-commercial lifetime license for spiritual and educational enlightenment.
          </p>
        </section>

        <section className="bento-card rounded-2xl p-6 border border-[#F59E0B]/30 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300">
            3. Contact &amp; Governance
          </h2>
          <p>
            Official Correspondence: <a href="mailto:gyandharamofficial@gmail.com" className="text-amber-300 underline">gyandharamofficial@gmail.com</a> | Helpline: <a href="tel:+917488482052" className="text-amber-300 underline">+91-74884-82052</a>
          </p>
          <p>Address: Near Zero Mile Metro Station, Patna, Bihar - 800007, India</p>
        </section>
      </div>
    </div>
  );
}
