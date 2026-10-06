'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Headphones
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tradition: 'All Traditions',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#FEF3C7] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-white transition mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1C1610] border border-[#F59E0B]/40 text-amber-300 text-xs font-bold shadow-md">
          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>Connect With GyanDharam Council</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#FFFBEB] tracking-tight">
          Get in Touch &amp; Devout Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
          Have questions about scriptures, manuscript preservation, scholar affiliations, or technical audio recitations? Reach out directly to our dedicated support council.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Official Headquarters & Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bento-card rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/30 shadow-2xl space-y-6">
            <h2 className="text-xl font-heading font-bold text-[#FFFBEB]">
              Headquarters &amp; Direct Desk
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-[#1C1610] border border-[#F59E0B]/40 text-amber-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-200 block text-xs uppercase tracking-wider">Office Address:</span>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">
                    Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-[#1C1610] border border-[#F59E0B]/40 text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-200 block text-xs uppercase tracking-wider">Helpline &amp; WhatsApp:</span>
                  <a href="tel:+917488482052" className="text-amber-300 hover:underline font-bold mt-0.5 block">
                    +91-74884-82052
                  </a>
                  <span className="text-[11px] text-stone-400">Available Mon - Sat (9:00 AM - 7:00 PM IST)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-[#1C1610] border border-[#F59E0B]/40 text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-200 block text-xs uppercase tracking-wider">Official Email:</span>
                  <a href="mailto:gyandharamofficial@gmail.com" className="text-amber-300 hover:underline font-bold mt-0.5 block">
                    gyandharamofficial@gmail.com
                  </a>
                  <span className="text-[11px] text-stone-400">Average response time: under 2 hours</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-[#1C1610] border border-[#F59E0B]/40 text-amber-400 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-200 block text-xs uppercase tracking-wider">Official Portal:</span>
                  <a href="https://www.gyandharam.com/" target="_blank" rel="noreferrer" className="text-amber-300 hover:underline font-bold mt-0.5 block">
                    https://www.gyandharam.com/
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 border-t border-stone-800/80 space-y-2 text-xs text-stone-400">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Authorized Theological Verification</span>
              </div>
              <p className="text-[11px]">All manuscripts verified with BORI, SGPC, and King Fahd Quran Archives.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bento-card rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/40 shadow-2xl space-y-6">
            <h2 className="text-xl font-heading font-bold text-[#FFFBEB]">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#120E0A] rounded-2xl border border-emerald-500/40 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-950 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#FFFBEB]">Message Received 🙏</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our manuscript &amp; support team will review your message and reply back to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', tradition: 'All Traditions', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1C1610] text-amber-300 hover:text-white border border-[#F59E0B]/30 text-xs font-bold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-bold mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Vardhan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-bold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="seeker@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-bold mb-1.5">Faith Tradition / Scripture</label>
                    <select
                      value={formData.tradition}
                      onChange={(e) => setFormData({ ...formData, tradition: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] focus:outline-none focus:border-[#F59E0B]"
                    >
                      <option value="All Traditions">All Traditions / General</option>
                      <option value="Sanatan Dharma">Sanatan Dharma (Gita &amp; Puran)</option>
                      <option value="Islam">Islam (The Holy Quran)</option>
                      <option value="Christianity">Christianity (The Holy Bible)</option>
                      <option value="Sikhism">Sikhism (Sri Guru Granth Sahib)</option>
                      <option value="Buddhism">Buddhism (The Dhammapada)</option>
                      <option value="Jainism">Jainism (Tattvartha Sutra)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-bold mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chapter unlock / Manuscript note"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-bold mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your reflection, inquiry, or question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#120E0A] border border-stone-800 rounded-xl text-[#FEF3C7] placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 btn-gold-glow text-[#0A0908] font-bold rounded-xl shadow-xl flex items-center justify-center space-x-2 transition hover:scale-[1.02] disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry to GyanDharam Desk ↗'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
