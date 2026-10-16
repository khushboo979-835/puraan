'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, BookOpen, Download, X, ChevronRight, Award, Info, Heart, CheckCircle2 } from 'lucide-react';

export default function NavratriBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [vidhiModalOpen, setVidhiModalOpen] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-[#2B040B] border-b border-amber-500/30 py-1.5 px-4 text-center">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs font-bold text-amber-300 hover:text-amber-200 inline-flex items-center gap-1.5 transition cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span>🌺 नवरात्रि व दुर्गा पूजा विशेष ऑफर: संपूर्ण श्री दुर्गा सप्तशती पाठ निःशुल्क उपलब्ध (क्लिक करें)</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="relative z-50 bg-gradient-to-r from-[#240308] via-[#480614] to-[#240308] border-b border-amber-500/40 text-stone-100 shadow-[0_4px_25px_rgba(72,6,20,0.6)]">
        {/* Subtle festive background pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 relative flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Column: Festive Badge & Offer Headline */}
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-lg flex-shrink-0 animate-pulse">
              <div className="w-full h-full rounded-full bg-[#200206] flex items-center justify-center text-amber-300 text-lg">
                🔱
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> नवरात्रि व दुर्गा पूजा महामहोत्सव ऑफर
                </span>
                <span className="text-[11px] font-bold text-amber-300/90 hidden md:inline">
                  • 100% निःशुल्क चंडी पाठ
                </span>
              </div>

              <h2 className="text-sm sm:text-base font-heading font-black text-[#FEF3C7] tracking-tight mt-0.5">
                सम्पूर्ण श्री दुर्गा सप्तशती (700 श्लोक • गीता प्रेस गोरखपुर) अब ज्ञानधर्म पर उपलब्ध!
              </h2>

              <p className="text-[11px] text-stone-300/90 font-sans hidden lg:block mt-0.5">
                श्लोकवार संस्कृत, शुद्ध हिंदी व अंग्रेजी भावार्थ, AI वोकल रिसाइटेशन, एवं मूल गीता प्रेस PDF का निःशुल्क संग्रह।
              </p>
            </div>
          </div>

          {/* Right Column: Action Buttons */}
          <div className="flex items-center flex-wrap justify-center gap-2 flex-shrink-0 w-full md:w-auto">
            {/* Start Free Reading CTA */}
            <Link
              href="/reader/durga-saptashati/1"
              className="py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-black shadow-[0_0_18px_rgba(245,158,11,0.45)] hover:scale-105 transition flex items-center space-x-1.5 border border-amber-300 cursor-pointer"
            >
              <span>🔱 निःशुल्क पाठ शुरू करें</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>

            {/* Gita Press PDF Download */}
            <a
              href="https://archive.org/download/durga-saptashati-geetapress/Durga_Saptashati.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 sm:py-2 px-3 rounded-xl bg-[#3B0813] hover:bg-[#520B1A] text-amber-200 hover:text-white text-xs font-bold border border-amber-500/30 transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="गीता प्रेस गोरखपुर की मूल PDF डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>गीता प्रेस PDF</span>
            </a>

            {/* Chandi Path Vidhi Modal Trigger */}
            <button
              onClick={() => setVidhiModalOpen(true)}
              className="py-1.5 sm:py-2 px-3 rounded-xl bg-[#200206] hover:bg-[#33050C] text-stone-300 hover:text-amber-300 text-xs font-medium border border-stone-800 transition flex items-center space-x-1 cursor-pointer"
              title="पाठ विधि एवं महत्व जानें"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">पाठ विधि</span>
            </button>

            {/* Dismiss / Minimize button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-black/30 transition ml-1 cursor-pointer"
              aria-label="Dismiss banner"
              title="बैनर छोटा करें"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Durga Saptashati Vidhi & Significance Modal */}
      {vidhiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#180308] border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-stone-100 shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setVidhiModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A050D] text-stone-300 hover:text-white border border-amber-500/30 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-stone-950 font-black text-xl shadow-md flex-shrink-0">
                🔱
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                  मार्कण्डेय पुराणोक्त देवी माहात्म्य
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#FEF3C7] mt-1">
                  श्री दुर्गा सप्तशती पाठ विधि एवं आध्यात्मिक महत्व
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#2A050D] border border-amber-500/30 text-amber-100">
                <p className="font-serif italic">
                  <strong>॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥</strong><br />
                  "दुर्गासप्तशती पाठ एक दिव्य देवी उपासना ग्रंथ है, जिसमें सात सौ श्लोकों का समावेश किया गया है। इसके पाठ से सभी प्रकार के भय, बाधा और जीवन की परेशानियाँ दूर होकर सुख, समृद्धि और आत्मज्ञान की प्राप्ति होती है।"
                </p>
              </div>

              {/* 3 Charitras */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> सप्तशती के तीन दिव्य चरित्र:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#200207] border border-stone-800">
                    <span className="font-bold text-rose-300 block">१. प्रथम चरित्र (महाकाली)</span>
                    <p className="text-stone-400 text-[11px] mt-1">अध्याय १ — तमोगुण का नाश, मधु-कैटभ वध, ब्रह्माजी द्वारा महामाया स्तुति।</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#200207] border border-stone-800">
                    <span className="font-bold text-amber-300 block">२. मध्यम चरित्र (महालक्ष्मी)</span>
                    <p className="text-stone-400 text-[11px] mt-1">अध्याय २ से ४ — रजोगुण पर विजय, देवी प्रादुर्भाव, महिषासुरमर्दिनी रूप।</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#200207] border border-stone-800">
                    <span className="font-bold text-yellow-300 block">३. उत्तम चरित्र (महासरस्वती)</span>
                    <p className="text-stone-400 text-[11px] mt-1">अध्याय ५ से १३ — सत्त्वगुण की प्रतिष्ठा, शुम्भ-निशुम्भ वध, नारायणी स्तुति।</p>
                  </div>
                </div>
              </div>

              {/* Path Vidhi Steps */}
              <div className="space-y-2 pt-2">
                <h4 className="font-heading font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> सरल पाठ विधि (चंडी विधान):
                </h4>
                <ul className="space-y-2 text-stone-300 text-xs sm:text-[13px]">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
                    <span><strong>शुद्धि व संकल्प:</strong> प्रातः स्नान कर लाल या पीले वस्त्र धारण करें। शुद्ध घी का दीपक प्रज्वलित कर आचमन और प्रार्थना करें।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
                    <span><strong>पूर्वांग पाठ:</strong> श्री देवी कवच, अर्गला स्तोत्र एवं कीलक का पाठ करें (ज्ञानधर्म पर उपलब्ध)।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
                    <span><strong>सप्तशती के १३ अध्याय:</strong> शांत मन से अध्यायवार श्लोक व भावार्थ पढ़ें या AI वोकल रिसाइटेशन के साथ लयबद्ध श्रवण करें।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span>
                    <span><strong>आरती व क्षमा प्रार्थना:</strong> पाठ समाप्ति पर देवी माँ को पुष्प अर्पित करें, 'अपराधक्षमापनस्तोत्रम्' पढ़ें और आरती करें।</span>
                  </li>
                </ul>
              </div>

              {/* Source Verification Badge */}
              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-stone-400">
                  प्रमाणिक स्रोत: <strong>गीता प्रेस गोरखपुर (कोड ११८)</strong> एवं मार्कण्डेय पुराण
                </span>
                <div className="flex gap-2">
                  <a
                    href="https://archive.org/download/durga-saptashati-geetapress/Durga_Saptashati.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-amber-900/50 hover:bg-amber-900 text-amber-200 text-xs font-bold border border-amber-500/40 transition flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> मूल PDF डाउनलोड
                  </a>
                  <Link
                    href="/reader/durga-saptashati/1"
                    onClick={() => setVidhiModalOpen(false)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition flex items-center gap-1"
                  >
                    अभी पाठ करें <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
