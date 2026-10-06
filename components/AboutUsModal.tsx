'use client';

import React from 'react';
import { X, ShieldCheck, Award, BookOpen, MapPin, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[88vh] bento-card rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-[#F59E0B]/40 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#F59E0B]/20 flex items-center justify-between bg-[#18130E]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-[#FEF3C7]">
                About GyanDharam & Authenticity
              </h3>
              <p className="text-xs text-amber-300/80 font-medium">
                Universal Multi-Faith Digital Library & Synchronized Voice Reader
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed">
          {/* Mission Section */}
          <div className="bento-card-active rounded-2xl p-5 border border-[#F59E0B]/40">
            <div className="flex items-center space-x-2 text-[#FEF3C7] mb-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <h4 className="font-heading font-bold text-base">Our Sacred Mission</h4>
            </div>
            <p className="text-stone-200">
              GyanDharam was founded to bridge humanity through the immortal wisdom of all sacred traditions—Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism. We provide 100% verified original critical texts, line-by-line vocal synchronization, and authentic Sanskrit/Pali/Arabic/Hebrew/Gurmukhi phonetic accuracy.
            </p>
          </div>

          {/* Certified Manuscript Archives */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FEF3C7] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Manuscript Lineages</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Vedas & Puranas', source: 'Varanasi Sanskrit Mahavidyalaya & BORI Archive' },
                { title: 'The Holy Quran', source: 'King Fahd Glorious Quran Printing Complex' },
                { title: 'The Holy Bible', source: 'Ecumenical Standard Biblical Manuscript Archives' },
                { title: 'Sri Guru Granth Sahib', source: 'SGPC Standard Authentic Gurmukhi Edition' },
                { title: 'The Dhammapada', source: 'Pali Text Society Canonical Editions' },
                { title: 'Jain Granthas', source: 'Shrimad Rajchandra & Oriental Institute Manuscripts' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#17120D] border border-stone-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-bold text-stone-100 text-xs">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1 pl-6">{item.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Headquarters Information */}
          <div className="p-4 rounded-2xl bg-[#15100B] border border-[#F59E0B]/30 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FEF3C7]">
              Official Headquarters & Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Office Address:</strong> Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <span>
                  <strong>Helpline / WhatsApp:</strong> +91-74884-82052
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <span>
                  <strong>Inquiries:</strong> support@gyandharam.com | contact@gyandharam.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0E0B08] text-center">
          <button
            onClick={onClose}
            className="btn-gold-glow px-8 py-2 rounded-full font-bold text-xs text-[#0A0908]"
          >
            Close & Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
}
