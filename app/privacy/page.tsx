'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ChevronLeft, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Authorized Legal Document</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#FFFBEB]">
          Privacy Policy &amp; Data Protection
        </h1>
        <p className="text-xs text-stone-400">
          Last Updated: October 2026 • Effective Worldwide for GyanDharam Digital Library
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed">
        <section className="bento-card rounded-2xl p-6 border border-stone-800 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" /> 1. Commitment to Spiritual Privacy
          </h2>
          <p>
            At <strong>GyanDharam</strong> (<a href="https://www.gyandharam.com" className="text-amber-300 underline">https://www.gyandharam.com/</a>), we honor the sanctity and confidentiality of every seeker’s spiritual study. We ensure that your reading habits, bookmarked shlokas, prayer history, and personal details remain encrypted and strictly protected under global data protection standards (GDPR, IT Act 2000, and DPDP Act 2023).
          </p>
        </section>

        <section className="bento-card rounded-2xl p-6 border border-stone-800 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300 flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" /> 2. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-300">
            <li><strong>Account &amp; Authentication:</strong> Name, Email Address for saving reading bookmarks and chapter progress across devices.</li>
            <li><strong>Reading &amp; Audio Telemetry:</strong> Timestamp offsets, favorite verses, and playback speed preferences stored locally and encrypted on database servers.</li>
            <li><strong>Payment &amp; Licensing Data:</strong> One-time digital chapter unlocks (₹49 / ₹199) processed securely via PCI-DSS compliant Razorpay and UPI gateways. We never store credit card PINs or bank passwords.</li>
          </ul>
        </section>

        <section className="bento-card rounded-2xl p-6 border border-stone-800 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" /> 3. Digital Rights &amp; Watermarked PDF Security
          </h2>
          <p>
            When downloading licensed offline manuscript PDFs, personal DRM watermarking is generated embedding your authorized seeker email to prevent unlawful redistribution while granting you unconditional personal lifetime study rights.
          </p>
        </section>

        <section className="bento-card rounded-2xl p-6 border border-[#F59E0B]/30 space-y-3">
          <h2 className="text-base font-heading font-bold text-amber-300">
            4. Data Grievance Officer &amp; Contact
          </h2>
          <p>
            For privacy inquiries, account data deletion, or theological manuscript inquiries, please reach out to our privacy council:
          </p>
          <div className="space-y-1.5 pt-2 text-stone-200">
            <p><strong>Official Email:</strong> <a href="mailto:gyandharamofficial@gmail.com" className="text-amber-300 underline">gyandharamofficial@gmail.com</a></p>
            <p><strong>Helpline:</strong> <a href="tel:+917488482052" className="text-amber-300 underline">+91-74884-82052</a></p>
            <p><strong>Headquarters:</strong> Near Zero Mile Metro Station, Patna, Bihar - 800007, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
