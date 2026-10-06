'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Volume2, ShieldCheck, Mail, Phone, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  category: 'access' | 'audio' | 'authenticity' | 'drm';
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  highlight?: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'ch1-free',
    category: 'access',
    questionEn: 'Is Chapter 1 completely free to read and listen for all scriptures?',
    questionHi: 'क्या सभी पवित्र ग्रंथों का पहला अध्याय पढ़ना और सुनना बिल्कुल मुफ़्त है?',
    answerEn: 'Yes, 100% free! Every scripture in the GyanDharam sanctuary (Bhagavad Gita, Holy Quran, Holy Bible, Japji Sahib, Dhammapada, Kalpa Sutra, Agni Puran) offers Chapter 1 completely free with full synchronized vocal recitation, translations, and word-by-word meanings with zero signup barrier.',
    answerHi: 'हाँ, बिल्कुल 100% मुफ़्त! ज्ञानधर्म के सभी पवित्र ग्रंथों (भगवद्गीता, पवित्र कुरआन, पवित्र बाइबिल, जपजी साहिब, धम्मपद, कल्पसूत्र, अग्निपुराण) का पहला अध्याय सम्पूर्ण प्रामाणिक वाणी उच्चारण, हिंदी/अंग्रेजी अनुवाद और शब्दार्थ के साथ हमेशा मुफ़्त उपलब्ध है।',
    highlight: '100% Free Forever'
  },
  {
    id: 'karaoke-sync',
    category: 'audio',
    questionEn: 'How does the Karaoke-Style Real-time Highlighting work?',
    questionHi: 'कराओके-स्टाइल रियल-टाइम श्लोक/आयत हाईलाइटिंग कैसे काम करती है?',
    answerEn: 'Our proprietary Vani Reader synchronizes acoustic audio timestamps down to the millisecond with authentic scripture text. As the sacred verse is chanted or recited, the current shloka/aayat lights up in glowing golden amber, keeping you effortlessly in spiritual rhythm. You can click on any verse to jump audio directly to that exact moment.',
    answerHi: 'हमारा वाणी रीडर ऑडियो टाइमस्टैम्प्स को मिलीसेकंड स्तर पर पवित्र मूल पाठ के साथ सिंक करता है। जैसे ही वाणी का पाठ होता है, स्क्रीन पर वही श्लोक या आयत सुनहरे एम्बर रंग में प्रकाशित होकर स्वतः स्क्रॉल होती है। आप किसी भी श्लोक पर क्लिक करके ऑडियो को तुरंत वहीं से सुन सकते हैं।',
    highlight: 'Millisecond Precision'
  },
  {
    id: 'faith-voices',
    category: 'audio',
    questionEn: 'What are the Multi-Faith Voice Profiles and 432Hz Ambient Synthesizer?',
    questionHi: 'मल्टी-फेथ वॉयस प्रोफाइल्स और 432Hz तानपुरा बैकग्राउंड क्या है?',
    answerEn: 'Each faith tradition has dedicated acoustic soundscapes: Vedic chant with continuous 432Hz Tanpura drone for Hindu Shastras; soulful Tarteel/Tilawat resonance for Islamic Quran; crystal-clear choral narrator for Christian Gospels; devotional Gurbani Kirtan warmth for Sikh Granth; and slow Zen meditative breathing pace for Buddhist Dhammapada. You can toggle ambient drone and adjust playback speed anytime.',
    answerHi: 'प्रत्येक धर्म के लिए विशिष्ट ध्वनि वातावरण तैयार किया गया है: हिंदू शास्त्रों के लिए 432Hz तानपुरा/ओम ड्रोन संग वैदिक मंत्रोच्चार; पवित्र कुरआन के लिए मेलोडिक तरतील/तिलावत; बाइबिल के लिए स्पष्ट कथा वाचन; सिख परंपरा के लिए गुरबाणी कीर्तन रस; और बौद्ध धम्मपद के लिए शांत ज़ेन ध्यान गति।',
    highlight: '432Hz Sacred Frequency'
  },
  {
    id: 'manuscript-lineage',
    category: 'authenticity',
    questionEn: 'How do you ensure theological authenticity of verses and translations?',
    questionHi: 'आप ग्रंथों के अनुवाद और मूल पाठ की प्रामाणिकता कैसे सुनिश्चित करते हैं?',
    answerEn: 'All texts on GyanDharam are cross-verified against globally recognized authority archives: Bhandarkar Oriental Research Institute (BORI) and Gita Press for Hindu Shastras; King Fahd Complex (Medina) for the Holy Quran; Shiromani Gurdwara Parbandhak Committee (SGPC) for Sri Guru Granth Sahib; Pali Text Society (PTS) for Dhammapada; and recognized Ecumenical councils for the Holy Bible.',
    answerHi: 'ज्ञानधर्म के सभी ग्रंथों का सत्यापन विश्वविख्यात प्रामाणिक संस्थानों से किया गया है: हिंदू शास्त्रों हेतु BORI एवं गीता प्रेस; पवित्र कुरआन हेतु किंग फहद कॉम्प्लेक्स मदीना; गुरु ग्रंथ साहिब हेतु SGPC अमृतसर; बौद्ध ग्रंथों हेतु पाली टेक्स्ट सोसाइटी (PTS); एवं बाइबिल हेतु प्रामाणिक वैश्विक परिषदें।',
    highlight: 'BORI & SGPC Certified'
  },
  {
    id: 'drm-pdf',
    category: 'drm',
    questionEn: 'What are DRM-Protected Watermarked PDFs and how can I access them?',
    questionHi: 'डीआरएम प्रोटेक्टेड वाटरमार्क पीडीएफ क्या हैं और इन्हें कैसे प्राप्त करें?',
    answerEn: 'When you unlock a complete scripture or subscribe to GyanDharam, you receive a personal high-resolution PDF edition cryptographically stamped with your legal name, email, and unique authenticity signature. This protects sacred texts from unauthorized commercial scraping while giving you a permanent offline reading artifact.',
    answerHi: 'जब आप किसी सम्पूर्ण ग्रंथ को अनलॉक करते हैं, तो आपको आपके नाम और ईमेल के साथ डिजिटल वाटरमार्क की गई उच्च गुणवत्ता वाली पीडीएफ मिलती है। यह पवित्र ग्रंथों की शुद्धता की रक्षा करती है और आपको ऑफ़लाइन अध्ययन की सुविधा देती है।',
    highlight: 'Cryptographic Security'
  },
  {
    id: 'pricing-unlock',
    category: 'access',
    questionEn: 'What are the pricing options for unlocking complete scriptures?',
    questionHi: 'सम्पूर्ण ग्रंथ अनलॉक करने के क्या शुल्क और विकल्प हैं?',
    answerEn: 'We offer single-scripture lifetime access at just ₹49 (including all chapters, synchronized audio, and downloadable PDF) or the GyanDharam All-Access Sacred Pass at ₹199/year for unlimited access across all 6 faith traditions and upcoming live sabha features.',
    answerHi: 'आप केवल ₹49 में किसी भी एक ग्रंथ का आजीवन एक्सेस (सभी अध्याय, सिंक ऑडियो, वाटरमार्क पीडीएफ सहित) ले सकते हैं, अथवा केवल ₹199/वर्ष में सभी 6 धर्मों के सभी ग्रंथों का अनलिमिटेड आल-एक्सेस पास प्राप्त कर सकते हैं।',
    highlight: 'Starting at ₹49 Only'
  },
  {
    id: 'contact-support',
    category: 'authenticity',
    questionEn: 'How can scholars, researchers, or devotees contact the GyanDharam team?',
    questionHi: 'विद्वान, शोधकर्ता या पाठक ज्ञानधर्म टीम से कैसे संपर्क कर सकते हैं?',
    answerEn: 'You can write directly to our editorial and theological desk at gyandharamofficial@gmail.com, call/WhatsApp our helpline at +91-74884-82052, or visit our headquarters near Zero Mile Metro Station, Patna, Bihar - 800007, India.',
    answerHi: 'आप हमारे संपादकीय एवं शोध दल से सीधे ईमेल gyandharamofficial@gmail.com पर, हेल्पलाइन/व्हाट्सएप +91-74884-82052 पर, या पटना (जीरो माइल मेट्रो स्टेशन के समीप) स्थित हमारे कार्यालय में संपर्क कर सकते हैं।',
    highlight: 'Direct Support SLA'
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'access' | 'audio' | 'authenticity' | 'drm'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['ch1-free', 'karaoke-sync']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      faq.questionEn.toLowerCase().includes(query) ||
      faq.questionHi.toLowerCase().includes(query) ||
      faq.answerEn.toLowerCase().includes(query) ||
      faq.answerHi.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="faq-section">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18130E] border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Frequently Asked Questions &amp; Clarifications</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#FFFBEB] tracking-tight">
          Common Queries About <span className="gold-gradient-text">GyanDharam</span>
        </h2>
        <p className="mt-3 text-sm text-stone-400 leading-relaxed">
          Everything you need to know about our chapter access policies, karaoke audio sync, theological authenticity lineages, and subscription models.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All FAQs (सभी प्रश्न)' },
            { id: 'access', label: 'Access & Pricing (मुफ़्त व शुल्क)' },
            { id: 'audio', label: 'Karaoke & Audio (वाणी उच्चारण)' },
            { id: 'authenticity', label: 'Authenticity (प्रामाणिकता)' },
            { id: 'drm', label: 'PDF & DRM (सुरक्षा)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:border-amber-500/40 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 focus:border-amber-500 text-xs text-stone-200 placeholder-stone-500 outline-none transition"
          />
        </div>
      </div>

      {/* Accordion Grid */}
      <div className="space-y-3.5 max-w-4xl mx-auto">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#14100B] border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                  : 'bg-stone-900/40 border-stone-800/80 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {faq.highlight && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        {faq.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-100 font-heading leading-snug">
                    {faq.questionEn}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium">
                    {faq.questionHi}
                  </p>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-amber-500 text-stone-950 rotate-180' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 mt-1 space-y-3">
                  <p className="text-stone-300 leading-relaxed">{faq.answerEn}</p>
                  <p className="text-amber-100/90 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/15">
                    <strong className="text-amber-300 font-bold block mb-1">हिंदी विवरण:</strong>
                    {faq.answerHi}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500 bg-stone-900/30 rounded-2xl border border-stone-800">
            No questions match your query. Have another question? Feel free to contact our support desk directly.
          </div>
        )}
      </div>

      {/* Support Strip */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#17120B] via-[#21170A] to-[#17120B] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-lg">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-100 font-heading">Still have a question or theological inquiry?</h4>
            <p className="text-xs text-stone-400">Our editorial council in Patna responds to all inquiries within 24 hours.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs text-center transition shadow-md shadow-amber-500/20"
          >
            Contact Support Team
          </Link>
          <a
            href="mailto:gyandharamofficial@gmail.com"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-500/40 text-stone-300 text-xs transition"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
