'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  BookOpen,
  Download,
  X,
  ChevronRight,
  Award,
  Info,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export default function NavratriBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [vidhiModalOpen, setVidhiModalOpen] = useState(false);

  if (isDismissed) {
    return (
      <aside aria-label="Navratri Festive Offer" className="bg-gradient-to-r from-[#200206] via-[#3B0510] to-[#200206] border-b border-amber-500/40 py-2 px-4 text-center shadow-md">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-100 inline-flex items-center gap-2 transition cursor-pointer"
        >
          <img
            src="/durga-maa.jpg"
            alt="Maa Durga"
            className="w-5 h-5 rounded-full object-cover border border-amber-400"
          />
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span>🌺 नवरात्रि व दुर्गा पूजा महापर्व: संपूर्ण श्री दुर्गा सप्तशती पाठ निःशुल्क उपलब्ध (बैनर देखें ↗)</span>
        </button>
      </aside>
    );
  }

  return (
    <>
      {/* ── EXPANDED PROFESSIONAL FESTIVE NAVRATRI BANNER ── */}
      <aside aria-label="Navratri Festive Offer" className="relative z-50 bg-gradient-to-r from-[#170104] via-[#35040F] to-[#170104] border-b-2 border-amber-400/50 text-stone-100 shadow-[0_10px_35px_rgba(53,4,15,0.7)] transition-all">
        {/* Subtle decorative glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-rose-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left: Maa Durga Divine Portrait & Title Info */}
            <div className="flex items-center space-x-3.5 sm:space-x-5 w-full lg:w-auto">
              {/* Divine Maa Durga Image Frame */}
              <div className="relative flex-shrink-0 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.55)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.85)] group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#240207] relative">
                    <img
                      src="/durga-maa.jpg"
                      alt="Maa Durga Sherawali Devi"
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Auspicious Trishul Badge */}
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center border border-stone-950 shadow-md">
                  🔱
                </div>
              </div>

              {/* Text Information */}
              <div className="flex flex-col min-w-0">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> नवरात्रि व दुर्गा पूजा विशेष
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-200 border border-rose-500/40">
                    100% निःशुल्क चंडी पाठ
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300/90 hidden sm:inline">
                    • गीता प्रेस गोरखपुर कोड 118
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-base sm:text-xl font-heading font-black text-[#FEF3C7] tracking-tight leading-tight flex items-center gap-1.5">
                  <span>सम्पूर्ण श्री दुर्गा सप्तशती (चंडी पाठ) अब ज्ञानधर्म पर लाइव</span>
                  <span className="text-amber-400 text-sm hidden md:inline">॥ ॐ दुं दुर्गायै नमः ॥</span>
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13px] text-stone-300/90 font-sans mt-0.5 line-clamp-1 sm:line-clamp-none">
                  13 अध्याय • 700 श्लोक • शब्दशः हिंदी व अंग्रेजी भावार्थ • AI वोकल रिसाइटेशन • मूल गीता प्रेस PDF
                </p>
              </div>
            </div>

            {/* Right: High-Impact Action Buttons */}
            <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2.5 flex-shrink-0 w-full lg:w-auto pt-1 lg:pt-0 border-t border-amber-500/20 lg:border-t-0">
              {/* Start Free Reading CTA */}
              <Link
                href="/reader/durga-saptashati/1"
                className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-black shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 transition flex items-center space-x-1.5 border border-amber-300 cursor-pointer"
              >
                <span>🔱 निःशुल्क पाठ शुरू करें</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>

              {/* Gita Press Original PDF */}
              <a
                href="https://archive.org/download/durga-saptashati-geetapress/Durga_Saptashati.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl bg-[#3B0713] hover:bg-[#520A1A] text-amber-200 hover:text-white text-xs sm:text-sm font-bold border border-amber-500/40 transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
                title="गीता प्रेस गोरखपुर की मूल PDF डाउनलोड करें"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>गीता प्रेस PDF</span>
              </a>

              {/* Vidhi & Significance Modal Trigger */}
              <button
                onClick={() => setVidhiModalOpen(true)}
                className="py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl bg-[#200206] hover:bg-[#38040E] text-stone-300 hover:text-amber-300 text-xs sm:text-sm font-medium border border-stone-800 transition flex items-center space-x-1 cursor-pointer"
                title="पाठ विधि एवं महत्व जानें"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>पाठ विधि</span>
              </button>

              {/* Minimize button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-black/40 border border-stone-800/80 transition cursor-pointer ml-0.5"
                aria-label="Minimize banner"
                title="बैनर छोटा करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </aside>

      {/* ── DURGA SAPTASHATI VIDHI & SIGNIFICANCE MODAL ── */}
      {vidhiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#180308] border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-stone-100 shadow-[0_25px_80px_rgba(0,0,0,0.98)] max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setVidhiModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A050D] text-stone-300 hover:text-white border border-amber-500/30 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md flex-shrink-0">
                <img
                  src="/durga-maa.jpg"
                  alt="Maa Durga"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/70 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                  मार्कण्डेय पुराणोक्त देवी माहात्म्य
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#FEF3C7] mt-1">
                  श्री दुर्गा सप्तशती पाठ विधि एवं आध्यात्मिक महत्व
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#2A050D] border border-amber-500/30 text-amber-100">
                <p className="font-serif italic text-sm">
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
