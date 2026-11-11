'use client';

import React from 'react';
import { X, Printer, Download, Sparkles, BookOpen, ShieldCheck, Lock } from 'lucide-react';

interface SacredBookPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    slug: string;
    religion: string;
    author: string;
    language: string;
    totalChapters: number;
    price?: number;
  };
  chapters: Array<{
    chapterNumber: number;
    title: string;
    summary?: string;
    verses: Array<{
      sentenceId: string;
      originalScript: string;
      hindiTranslation: string;
      englishTranslation?: string;
      transliteration?: string;
      aiInsight?: {
        symbolism: string;
        lifeLesson: string;
        mantraBenefit: string;
      };
    }>;
  }>;
  isUnlocked: boolean;
  onUnlockClick?: () => void;
}

export default function SacredBookPdfModal({
  isOpen,
  onClose,
  book,
  chapters,
  isUnlocked,
  onUnlockClick,
}: SacredBookPdfModalProps) {
  if (!isOpen) return null;

  const getAuspiciousMantra = () => {
    const s = (book.slug || '').toLowerCase();
    const r = (book.religion || '').toLowerCase();
    if (s.includes('durga') || s.includes('chandi')) return '॥ ॐ नमश्चण्डिकायै ॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥';
    if (r.includes('hindu') || s.includes('gita')) return '॥ श्री गणेशाय नमः ॥ ॐ नमो भगवते वासुदेवाय ॥';
    if (r.includes('islam') || s.includes('quran')) return 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ';
    if (r.includes('christian') || s.includes('bible')) return 'In the Name of the Father, and of the Son, and of the Holy Spirit';
    if (r.includes('sikh') || s.includes('japji')) return 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥ ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ ॥';
    if (r.includes('buddh') || s.includes('dhamma')) return 'नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स';
    if (r.includes('jain') || s.includes('tattvartha')) return '॥ ॐ नमो अरिहंताणं ॥ परस्परोपग्रहो जीवानाम् ॥';
    return '॥ ॐ तत् सत् ॥ ज्ञानधर्म सर्वधर्म पावन ग्रंथावली ॥';
  };

  const handlePrint = () => {
    window.print();
  };

  const displayedChapters = isUnlocked ? chapters : chapters.slice(0, 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Top Controls Toolbar (Hidden in Print) */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0A0908] font-bold text-xs shadow-xl hover:scale-105 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Save as PDF / Print (प्रिंट व PDF सेव करें)</span>
        </button>

        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-[#1A120B] text-[#FEF3C7] border border-[#F59E0B]/40 hover:bg-[#2A1F13] transition cursor-pointer"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Manuscript Sheet */}
      <div className="relative w-full max-w-4xl my-auto bg-[#FFFDF9] text-[#1A1208] shadow-[0_25px_70px_rgba(0,0,0,0.85)] rounded-2xl overflow-hidden print:shadow-none print:rounded-none print:w-full print:m-0 print:p-0">
        
        {/* Sacred Double Red & Gold Borders */}
        <div className="p-4 sm:p-8 m-3 sm:m-5 border-4 border-double border-[#8B0000] relative bg-[#FFFCF5]">
          <div className="p-4 sm:p-6 border border-[#D4AF37] relative">
            
            {/* Auspicious Corner Florets */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#D4AF37] border-2 border-[#8B0000] rounded-sm transform rotate-45 flex items-center justify-center text-[10px] text-[#8B0000] font-black">
              卐
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#D4AF37] border-2 border-[#8B0000] rounded-sm transform rotate-45 flex items-center justify-center text-[10px] text-[#8B0000] font-black">
              ॐ
            </div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#D4AF37] border-2 border-[#8B0000] rounded-sm transform rotate-45 flex items-center justify-center text-[10px] text-[#8B0000] font-black">
              ॐ
            </div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#D4AF37] border-2 border-[#8B0000] rounded-sm transform rotate-45 flex items-center justify-center text-[10px] text-[#8B0000] font-black">
              卐
            </div>

            {/* Header */}
            <div className="text-center border-b-2 border-[#8B0000] pb-5 mb-8">
              <div className="text-sm sm:text-base font-serif font-black text-[#8B0000] tracking-wider mb-2">
                {getAuspiciousMantra()}
              </div>

              <div className="text-2xl sm:text-4xl font-serif font-black text-[#1A1208] tracking-tight mt-1">
                {book.title}
              </div>

              <div className="text-xs sm:text-sm font-serif italic text-[#78350F] mt-1 font-bold">
                {book.author} • {book.language}
              </div>

              <div className="inline-block mt-3 px-3 py-1 bg-[#FDF6E2] border border-[#D4AF37] rounded-full text-[11px] font-serif font-bold text-[#8B0000]">
                ज्ञानधर्म प्रामाणिक डिजिटल पाण्डुलिपि • Publisher-Grade Critical Edition
              </div>
            </div>

            {/* Chapters Stream */}
            <div className="space-y-10">
              {displayedChapters.map((ch) => (
                <div key={ch.chapterNumber} className="space-y-6">
                  {/* Chapter Header */}
                  <div className="text-center py-2 bg-[#FBF3DC] border-y border-[#D4AF37]">
                    <h3 className="text-lg sm:text-xl font-serif font-black text-[#8B0000]">
                      अध्याय {ch.chapterNumber}: {ch.title}
                    </h3>
                    {ch.summary && (
                      <p className="text-xs font-serif italic text-[#451A03] mt-1 max-w-2xl mx-auto px-4">
                        &ldquo;{ch.summary}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Verses List */}
                  <div className="space-y-6">
                    {ch.verses.map((verse, vIdx) => (
                      <div
                        key={verse.sentenceId || vIdx}
                        className="p-4 sm:p-5 rounded-xl bg-[#FFFDF7] border border-[#E7D6B5] space-y-3"
                      >
                        {/* Shloka in Authentic Bold Devanagari */}
                        <div className="text-base sm:text-lg font-serif font-bold text-[#1A1208] text-center leading-relaxed whitespace-pre-line border-b border-[#D4AF37]/40 pb-3">
                          {verse.originalScript}
                        </div>

                        {/* Padached / Transliteration */}
                        {verse.transliteration && (
                          <div className="text-xs font-mono text-[#78350F] bg-[#FAF1D6] p-2 rounded-lg border border-[#E7D6B5] text-center">
                            <strong>पदच्छेद / उच्चारण:</strong> {verse.transliteration}
                          </div>
                        )}

                        {/* Hindi Bhavarth */}
                        <div className="text-xs sm:text-sm font-serif text-[#2B1B0D] leading-relaxed">
                          <strong className="text-[#8B0000]">॥ शुद्ध हिन्दी भावार्थ ॥ : </strong>
                          {verse.hindiTranslation}
                        </div>

                        {/* English Meaning & Insight */}
                        {verse.englishTranslation && (
                          <div className="text-xs font-serif text-[#444] italic border-t border-[#E7D6B5]/60 pt-2">
                            <strong>English Translation: </strong> {verse.englishTranslation}
                          </div>
                        )}

                        {/* AI Spiritual Lesson */}
                        {verse.aiInsight?.lifeLesson && (
                          <div className="text-[11px] font-sans text-[#78350F] bg-[#FFF8E7] px-3 py-1.5 rounded-md border-l-2 border-[#D4AF37]">
                            <strong>जीवन संदेश: </strong> {verse.aiInsight.lifeLesson}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* If Chapter 1 Free Sampler: Unlock Notice */}
            {!isUnlocked && book.totalChapters > 1 && (
              <div className="mt-10 p-6 rounded-2xl bg-[#FFF5E6] border-2 border-dashed border-[#8B0000] text-center space-y-3 print:hidden">
                <div className="w-12 h-12 rounded-full bg-[#8B0000] text-[#FFFBEB] flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#8B0000]">
                  सम्पूर्ण पावन ग्रंथ अनलॉक करें (अध्याय २ से {book.totalChapters})
                </h4>
                <p className="text-xs text-[#522504] max-w-md mx-auto">
                  आप वर्तमान में नि:शुल्क अध्याय १ का अध्ययन कर रहे हैं। सम्पूर्ण ग्रंथ, ऑडियो सिंक्रोनाइज़ेशन व १४+ पृष्ठों की पूर्ण पाण्डुलिपि डाउनलोड करने हेतु अनलॉक करें।
                </p>
                {onUnlockClick && (
                  <button
                    onClick={onUnlockClick}
                    className="py-2.5 px-6 rounded-xl bg-[#8B0000] text-[#FFFBEB] font-bold text-xs shadow-lg hover:bg-[#680000] transition cursor-pointer"
                  >
                    Unlock Full Scripture (मात्र ₹{book.price || 49}) ↗
                  </button>
                )}
              </div>
            )}

            {/* Bottom Publisher DRM Seal */}
            <div className="mt-12 pt-6 border-t-2 border-[#8B0000] flex flex-col sm:flex-row items-center justify-between text-xs text-[#555] gap-3">
              <div>
                <strong className="text-[#8B0000]">GyanDharam Universal Sanctuary Archives</strong><br />
                Certified Devotional Study Edition • gyandharam.com
              </div>
              <div className="text-center sm:text-right font-mono text-[10px] text-[#78350F]">
                DRM LICENSED DIGITAL EDITION<br />
                TIMESTAMP: {new Date().toLocaleDateString()}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}