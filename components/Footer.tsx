import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const religions = [
    { name: 'Sanatan Dharma (सनातन धर्म)', symbol: 'ॐ', count: 'Vedas, Upanishads & Puranas' },
    { name: 'Islamic Granth (إسلام)', symbol: '☪', count: 'Quran & Hadith' },
    { name: 'Christian Gospels (ईसाई)', symbol: '✝', count: 'Psalms & Gospels' },
    { name: 'Sikh Granth (ਸਿੱਖ)', symbol: 'ੴ', count: 'Sri Guru Granth Sahib' },
    { name: 'Buddha Vaani (बौद्ध)', symbol: '☸', count: 'Dhammapada & Sutras' },
    { name: 'Jain Philosophy (जैन)', symbol: '卐', count: 'Tattvartha Sutra & Agamas' },
  ];

  return (
    <footer className="bg-[#b35e00] border-t-3 border-[#3d1e00] text-[#000000] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Six Religions Banner */}
        <div className="mb-10 pb-8 border-b-2 border-[#522700]">
          <p className="text-center text-[12px] uppercase tracking-widest text-[#000000] font-black mb-6">
            All Six Sacred Wisdom Traditions In One Harmonious Digital Sanctuary
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {religions.map((rel) => (
              <div
                key={rel.name}
                className="p-3.5 bg-[#ffdca3] rounded-2xl border-2 border-[#522700] shadow-xs hover:bg-[#ffe5b8] transition-colors"
              >
                <div className="text-2xl font-serif text-[#000000] font-black mb-1">{rel.symbol}</div>
                <p className="font-black text-[#000000] text-xs truncate">{rel.name.split(' ')[0]}</p>
                <p className="text-[10px] text-[#241000] font-bold truncate">{rel.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Overview */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-[#1f0f00] rounded-lg flex items-center justify-center text-[#ffd99e] font-black">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-[#000000] text-base">SacredReads</span>
            </div>
            <p className="text-[#1a0e02] font-bold text-xs leading-relaxed">
              Dharmik granth padhne aur sunne ka pavitra sangrah. Chapter 1 is always free. Chapter 2+ unlocks lifetime synchronized audio reading and personal DRM watermarked PDF downloads.
            </p>
            <div className="flex items-center space-x-1 text-[#000000] text-xs font-black">
              <ShieldCheck className="w-4 h-4" />
              <span>Razorpay 256-bit Secured DRM Platform</span>
            </div>
          </div>

          {/* Col 2: Faith Portals */}
          <div>
            <h4 className="font-black text-[#000000] uppercase tracking-wider mb-3 text-sm">Faith Portals</h4>
            <ul className="space-y-2 font-bold text-[#1a0e02]">
              <li>
                <Link href="/catalog?religion=Hinduism" className="hover:text-white hover:underline transition">
                  Hindu Sacred Texts
                </Link>
              </li>
              <li>
                <Link href="/catalog?religion=Islam" className="hover:text-white hover:underline transition">
                  Islamic Revelations
                </Link>
              </li>
              <li>
                <Link href="/catalog?religion=Christianity" className="hover:text-white hover:underline transition">
                  Christian Scriptures
                </Link>
              </li>
              <li>
                <Link href="/catalog?religion=Sikhism" className="hover:text-white hover:underline transition">
                  Sikh Holy Hymns
                </Link>
              </li>
              <li>
                <Link href="/catalog?religion=Buddhism" className="hover:text-white hover:underline transition">
                  Buddhist Dhammapada
                </Link>
              </li>
              <li>
                <Link href="/catalog?religion=Jainism" className="hover:text-white hover:underline transition">
                  Jain Tattvartha Sutras
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Explore Sanctuary */}
          <div>
            <h4 className="font-black text-[#000000] uppercase tracking-wider mb-3 text-sm">Explore Sanctuary</h4>
            <ul className="space-y-2 font-bold text-[#1a0e02]">
              <li>
                <Link href="/catalog" className="hover:text-white hover:underline transition">
                  Complete Scriptures Catalog
                </Link>
              </li>
              <li>
                <Link href="/book/agni-puran" className="hover:text-white hover:underline transition">
                  Agni Puran Critical Edition
                </Link>
              </li>
              <li>
                <Link href="/reader/agni-puran/1" className="hover:text-white hover:underline transition">
                  Agni Puran Ch 1 (Free Karaoke Audio)
                </Link>
              </li>
              <li>
                <Link href="/my-shelf" className="hover:text-white hover:underline transition">
                  My Sacred Shelf & Watermarked PDFs
                </Link>
              </li>
              <li>
                <Link href="/admin/upload" className="hover:text-white hover:underline transition">
                  Curator Ingestion Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Office & Contact Information */}
          <div className="space-y-3">
            <h4 className="font-black text-[#000000] uppercase tracking-wider mb-3 text-sm">Office & Contact (कार्यालय)</h4>
            <div className="p-3.5 bg-[#ffdca3] rounded-2xl border-2 border-[#522700] space-y-3 text-xs">
              <div className="flex items-start space-x-2.5 text-[#000000]">
                <MapPin className="w-4 h-4 text-[#1f0f00] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <span className="font-black block text-[11px] uppercase tracking-wider text-[#3d1e00]">Office Address:</span>
                  <p className="font-bold text-xs text-[#000000] leading-snug">
                    Near Zero Mile Metro Station, Patna, Bihar - 800007, India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-[#000000] pt-2 border-t border-[#522700]/30">
                <Phone className="w-4 h-4 text-[#1f0f00] flex-shrink-0 stroke-[2.5]" />
                <div>
                  <span className="font-black block text-[10px] uppercase tracking-wider text-[#3d1e00]">Contact / Helpline:</span>
                  <a
                    href="tel:+917488482052"
                    className="font-black text-xs text-[#000000] hover:underline"
                  >
                    +91-74884-82052
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 text-[#000000] pt-2 border-t border-[#522700]/30">
                <Mail className="w-4 h-4 text-[#1f0f00] flex-shrink-0 stroke-[2.5]" />
                <div>
                  <span className="font-black block text-[10px] uppercase tracking-wider text-[#3d1e00]">Support Email:</span>
                  <a
                    href="mailto:support@gyandharam.com"
                    className="font-bold text-xs text-[#000000] hover:underline"
                  >
                    support@gyandharam.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-[#522700] flex flex-col sm:flex-row items-center justify-between text-[#000000] font-bold gap-4">
          <p>© {new Date().getFullYear()} SacredReads. All sacred scriptures preserved with reverence.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted for spiritual seekers worldwide</span>
            <Heart className="w-3.5 h-3.5 text-[#3b1c00] fill-[#3b1c00]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
