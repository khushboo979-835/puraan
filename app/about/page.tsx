'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Headphones,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Flame,
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Authenticity & Manuscript Verification</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Pavitra Gyan Ka Amrit Dhara
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          GyanDharam is an international digital preservation institute dedicated to making universal sacred scriptures accessible with line-by-line vocal synchronization, critical manuscripts, and meditative acoustic soundscapes.
        </p>
      </div>

      {/* Bento Grid: Mission & Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bento-card rounded-3xl p-6 sm:p-7 border border-[#F59E0B]/30 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-heading font-bold text-[#FFFBEB]">Critical Manuscript Fidelity</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Every shloka, surah, ayat, pauri, and sutra is rigorously cross-referenced with peer-reviewed oriental and theological manuscripts.
          </p>
        </div>

        <div className="bento-card rounded-3xl p-6 sm:p-7 border border-[#F59E0B]/30 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-heading font-bold text-[#FFFBEB]">Karaoke Synced Audio</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Proprietary word-by-word timestamps illuminate sacred texts in glowing gold as authentic AI voices chant each syllable in resonant clarity.
          </p>
        </div>

        <div className="bento-card rounded-3xl p-6 sm:p-7 border border-[#F59E0B]/30 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-heading font-bold text-[#FFFBEB]">432Hz Ambient Synthesizers</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Web Audio API generates 100% offline, zero-latency Tanpura drones, Tibetan singing bowls, Maqam reverberations, and cathedral acoustics.
          </p>
        </div>
      </div>

      {/* Verification & Institutional Board */}
      <div className="bento-card rounded-3xl p-7 sm:p-10 border border-[#F59E0B]/30 shadow-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#FFFBEB] mb-6 flex items-center gap-2.5">
          <Award className="w-6 h-6 text-amber-400" />
          <span>Theological Verification & Academic Standards</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#120E0A] border border-stone-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Sanatan Shastras (Gita & Puran)</span>
            </div>
            <p className="text-stone-300">
              Verified against Bhandarkar Oriental Research Institute (BORI) critical editions and Gita Press traditional commentaries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#120E0A] border border-stone-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>The Holy Quran & Hadith</span>
            </div>
            <p className="text-stone-300">
              Authentic Uthmani script recitation and transliteration cross-referenced with King Fahd Quran Complex & classical tajweed standards.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#120E0A] border border-stone-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Sri Guru Granth Sahib</span>
            </div>
            <p className="text-stone-300">
              Standard 1430 Ang format adhering strictly to Shiromani Gurdwara Parbandhak Committee (SGPC) Gurmukhi phonetics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#120E0A] border border-stone-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Pali Canon & Dhammapada</span>
            </div>
            <p className="text-stone-300">
              Preserved in classical Roman Pali & Devanagari by the Pali Text Society (PTS) with authentic Zen meditative cadence.
            </p>
          </div>
        </div>
      </div>

      {/* Official Contact & Patna Office Address */}
      <div className="bento-card rounded-3xl p-7 sm:p-10 border border-[#F59E0B]/40 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
              Headquarters & Devout Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#FFFBEB]">
              Contact GyanDharam
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Have manuscript corrections, scholar collaborations, or corporate/institution access requests? Reach out directly to our preservation council.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-200 block">Office Address:</span>
                  <span className="text-stone-300">
                    Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-stone-200 block">Helpline / WhatsApp:</span>
                  <a href="tel:+917488482052" className="text-amber-300 hover:underline font-bold">
                    +91-74884-82052
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-stone-200 block">Official Email:</span>
                  <a href="mailto:gyandharamofficial@gmail.com" className="text-amber-300 hover:underline font-bold">
                    gyandharamofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-stone-200 block">Official Portal:</span>
                  <a href="https://www.gyandharam.com/" target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                    https://www.gyandharam.com/
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#120E0A] border border-[#F59E0B]/30 space-y-3">
            <h3 className="text-sm font-heading font-bold text-[#FFFBEB]">Explore Digital Scriptures</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Begin your sacred journey with free Chapter 1 access on every major scripture across all faiths.
            </p>
            <div className="pt-2">
              <Link
                href="/library"
                className="w-full py-3 px-4 btn-gold-glow text-[#0A0908] text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Browse Sacred Library</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
