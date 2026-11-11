'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Volume2,
  VolumeX,
  Download,
  X,
  MessageSquare,
  BookOpen,
  Award,
  Flame,
  ChevronDown,
  RefreshCw,
  Printer
} from 'lucide-react';
import { getPanditVoice } from '@/lib/spiritualAudioEngine';

interface Message {
  id: string;
  sender: 'user' | 'pandit';
  text: string;
  scriptureRef?: string;
  originalText?: string;
  timestamp: string;
}

const QUICK_TOPICS = [
  { label: 'कर्मण्येवाधिकारस्ते (Gita 2.47)', query: 'गीता अध्याय २ श्लोक ४७ का सरल अर्थ और व्यावहारिक जीवन में इसका प्रयोग समझाइए।' },
  { label: 'दुर्गा सप्तशती कवच माहात्म्य', query: 'दुर्गा सप्तशती के देवी कवच का क्या माहात्म्य है और इसका पाठ कैसे करना चाहिए?' },
  { label: 'Surah Al-Fatiha का सार', query: 'क़ुरआन की पहली सूरत (अल-फ़ातिहा) का आध्यात्मिक अर्थ और संदेश क्या है?' },
  { label: 'मूल मंतर (Ik Onkar)', query: 'श्री जपजी साहिब के मूल मंतर "ੴ सति नामु" का क्या अर्थ है?' },
  { label: 'धम्मपद: मन की शांति', query: 'धम्मपद के अनुसार क्रोध और अशांत मन को कैसे वश में किया जा सकता है?' },
  { label: 'अहिंसा परमो धर्मः (जैन दर्शन)', query: 'तत्त्वार्थ सूत्र में अहिंसा और जीवों के परस्पर उपकार का क्या सिद्धांत है?' },
];

export default function GyanAiPandit() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'pandit',
      text: 'सादर प्रणाम! 🙏 मैं आपका "ज्ञान AI सहायक" हूँ। आप मुझसे श्रीमद्भगवद्गीता, श्री दुर्गा सप्तशती, पवित्र क़ुरआन, बाइबिल, जपजी साहिब, धम्मपद अथवा किसी भी धर्मग्रंथ के श्लोक, अर्थ, साधना विधि या आध्यात्मिक जिज्ञासा पर मार्गदर्शन प्राप्त कर सकते हैं।',
      scriptureRef: 'ज्ञानधर्म सर्वधर्म संगम (Universal Wisdom Sanctuary)',
      timestamp: 'अभी',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  const speakText = (text: string, messageId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking && speakingMessageId === messageId) {
      stopVoice();
      return;
    }

    window.speechSynthesis.cancel();

    // Clean for speech (remove markdown symbols)
    const cleanSpeech = text
      .replace(/[*#_~`]/g, '')
      .replace(/॥.*?॥/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.82; // Calibrated dignified Pandit cadence
    utterance.pitch = 0.78; // Deep resonant tone

    const voices = window.speechSynthesis.getVoices();
    const voice = getPanditVoice(voices, 'hinduism');
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    setIsSpeaking(true);
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Vedic Pandit AI Response Generation
    setTimeout(() => {
      const qLower = q.toLowerCase();
      let responseText = '';
      let scriptureRef = 'ज्ञानधर्म ग्रंथ संगम';
      let originalText = '';

      if (qLower.includes('2.47') || qLower.includes('कर्मण्येवाधिकारस्ते') || qLower.includes('nishkama')) {
        scriptureRef = 'श्रीमद्भगवद्गीता (अध्याय २, श्लोक ४७)';
        originalText = 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥';
        responseText = `भगवान श्रीकृष्ण अर्जुन से कहते हैं कि तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल की आसक्ति से मुक्त होकर कर्तव्य पालन करो, और कर्म न करने (आलस्य) में भी तुम्हारी प्रीति न हो।\n\n📌 व्यावहारिक शिक्षा: परीक्षा, व्यवसाय या जीवन में परिणाम की चिंता किए बिना अपना १००% सर्वश्रेष्ठ कर्म करें। परिणाम स्वतः ईश्वर कृपा से कल्याणकारी होगा।`;
      } else if (qLower.includes('कवच') || qLower.includes('सप्तशती') || qLower.includes('चंडी') || qLower.includes('durga')) {
        scriptureRef = 'श्री दुर्गा सप्तशती (देवी कवचम् - मार्कण्डेय पुराण)';
        originalText = 'ॐ यद्गुह्यं परमं लोके सर्वरक्षाकरं नृणाम्।\nयन्न कस्यचिदाख्यातं तन्मे ब्रूहि पितामह॥';
        responseText = `देवी कवच भगवान ब्रह्मा द्वारा महर्षि मार्कण्डेय को प्रदान किया गया परम गोपनीय और अचूक रक्षा-स्तोत्र है। इसमें माँ दुर्गा के नौ रूपों (शैलपुत्री, ब्रह्मचारिणी आदि) तथा दसों दिशाओं में अंग-अंग की रक्षा की प्रार्थना की जाती है।\n\n📌 साधना विधि: प्रातः स्नान के बाद आचमन कर पूर्व या उत्तर दिशा की ओर मुख करके श्रद्धापूर्वक इसका पाठ करने से समस्त भय, रोग, और नकारात्मक शक्तियों से पूर्ण सुरक्षा प्राप्त होती है।`;
      } else if (qLower.includes('fatiha') || qLower.includes('फ़ातिहा') || qLower.includes('कुरआन') || qLower.includes('quran')) {
        scriptureRef = 'पवित्र अल-क़ुरआन (सूरत अल-फ़ातिहा १:१-७)';
        originalText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ';
        responseText = `सूरह अल-फ़ातिहा क़ुरआन मजीद का आरंभिक और सर्वाधिक महत्वपूर्ण अध्याय है। यह परमेश्वर की स्तुति से प्रारंभ होता है: "समस्त प्रशंसा अल्लाह के लिए है, जो सम्पूर्ण ब्रह्मांड का पालनकर्ता है, जो अत्यंत दयालु और कृपावान है।"\n\n📌 संदेश: यह मनुष्य को ईश्वर से सीधा मार्गदर्शन मांगने और सत्य एवं सदाचार के मार्ग ('सिरातल मुस्तकीम') पर चलने की प्रेरणा देता है।`;
      } else if (qLower.includes('जपजी') || qLower.includes('mool') || qLower.includes('मंतर') || qLower.includes('onkar')) {
        scriptureRef = 'श्री गुरु ग्रंथ साहिब (जपजी साहिब - श्री गुरु नानक देव जी)';
        originalText = 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥';
        responseText = `मूल मंतर सिख धर्म का मूल आधार है। गुरु नानक देव जी प्रकट करते हैं कि परमात्मा एक (ੴ) है, उसका नाम ही सत्य है, वह सृष्टिकर्ता, निर्भय, निर्वैर, काल से परे, अजन्मा, स्वयंभू और गुरु की कृपा से प्राप्य है।\n\n📌 संदेश: जब हम उस एक परमपिता को जान लेते हैं, तो मन से वैर और भय स्वतः मिट जाते हैं।`;
      } else if (qLower.includes('धम्मपद') || qLower.includes('बुद्ध') || qLower.includes('dhammapada') || qLower.includes('anger')) {
        scriptureRef = 'धम्मपद (यमकवग्गो - बुद्ध वाणी)';
        originalText = 'न हि वेरेन वेरानि सम्मन्तीध कुदाचनं।\nअवेरेन च सम्मन्ति एस धम्मो सनन्तनो॥';
        responseText = `तथागत गौतम बुद्ध फरमाते हैं: "इस संसार में कभी भी बैर से बैर शांत नहीं होता; केवल प्रेम और करुणा (अवेर) से ही बैर शांत होता है—यही सनातन शाश्वत नियम है।"\n\n📌 ध्यान सूत्र: यदि कोई आप पर क्रोध करे, तो प्रति-उत्तर में मौन व मैत्री भावना रखें। इससे नकारात्मक चक्र तत्काल टूट जाता है।`;
      } else if (qLower.includes('अहिंसा') || qLower.includes('जैन') || qLower.includes('tattvartha') || qLower.includes('jain')) {
        scriptureRef = 'तत्त्वार्थ सूत्र (आचार्य उमास्वामी - जैन दर्शन)';
        originalText = 'परस्परोपग्रहो जीवानाम्॥ अहिंसा परमो धर्मः';
        responseText = `जैन धर्म का मूल सूत्र है 'परस्परोपग्रहो जीवानाम्' अर्थात सभी जीव एक-दूसरे के उपकार और कल्याण के लिए हैं।\n\n📌 संदेश: मन, वचन और काया से किसी भी प्राणी को कष्ट न पहुँचाना ही सर्वोच्च धर्म है। सम्यक् दर्शन, सम्यक् ज्ञान और सम्यक् चारित्र से ही मोक्ष प्राप्त होता है।`;
      } else {
        scriptureRef = 'ज्ञानधर्म वैदिक शोध केंद्र';
        originalText = 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥';
        responseText = `आपके प्रश्न "${q}" के संदर्भ में धर्मशास्त्रों का उपदेश है कि अंतःकरण की शुद्धि, सत्य भाषण, और प्राणीमात्र के प्रति दया ही सभी धर्मों का सर्वोच्च सार है।\n\nआप किसी विशेष ग्रंथ जैसे गीता, दुर्गा सप्तशती, क़ुरआन, धम्मपद या जपजी साहिब के किसी भी श्लोक या जीवन दर्शन के विषय में विस्तार से पूछ सकते हैं।`;
      }

      const panditMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pandit',
        text: responseText,
        scriptureRef,
        originalText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, panditMsg]);
      setLoading(false);
    }, 600);
  };

  // Generate on-demand 1-Page Printable PDF Certificate of AI Explanation
  const printExplanationPdf = (msg: Message) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('कृपया पॉपअप विंडो को अनुमति दें ताकि PDF प्रिंट हो सके।');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GyanDharam_Spiritual_Guidance.pdf</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              background-color: #FAF6ED;
              color: #1A1208;
              margin: 0;
              padding: 24px;
            }
            .certificate-border {
              border: 3px double #8B0000;
              padding: 24px;
              position: relative;
              background: #FFFDF9;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .inner-border {
              border: 1px solid #D4AF37;
              padding: 24px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #8B0000;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            .header-mantra {
              font-size: 14pt;
              font-weight: bold;
              color: #8B0000;
              letter-spacing: 1px;
            }
            .header-title {
              font-size: 24pt;
              font-weight: bold;
              color: #B45309;
              margin: 6px 0 2px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .header-subtitle {
              font-size: 9pt;
              color: #555;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .citation-box {
              background: #FDF8ED;
              border-left: 4px solid #B45309;
              padding: 10px 14px;
              margin-bottom: 16px;
              font-size: 11pt;
              font-weight: bold;
              color: #8B0000;
            }
            .original-script {
              background: #FFF8E7;
              border: 1px dashed #D4AF37;
              padding: 14px;
              border-radius: 6px;
              font-size: 13pt;
              font-weight: bold;
              color: #1A1208;
              text-align: center;
              white-space: pre-line;
              margin-bottom: 18px;
              line-height: 1.6;
            }
            .explanation-text {
              font-size: 11.5pt;
              line-height: 1.8;
              color: #2D241E;
              white-space: pre-line;
              margin-bottom: 24px;
            }
            .seal-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-top: 1px solid #D4AF37;
              padding-top: 16px;
              margin-top: 30px;
              font-size: 8.5pt;
              color: #666;
            }
            .seal-gold {
              border: 2px solid #D4AF37;
              padding: 6px 12px;
              border-radius: 8px;
              color: #8B0000;
              font-weight: bold;
              text-align: center;
              font-size: 8pt;
            }
            @media print {
              body { background: transparent; }
              .certificate-border { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate-border">
            <div class="inner-border">
              <div class="header">
                <div class="header-mantra">॥ ॐ श्री परमात्मने नमः ॥</div>
                <div class="header-title">GyanDharam</div>
                <div class="header-subtitle">Universal Sacred Scripture Archives • Vedic Guidance Certificate</div>
              </div>

              <div class="citation-box">
                संदर्भ: ${msg.scriptureRef || 'ज्ञानधर्म सत्संग'}
              </div>

              ${
                msg.originalText
                  ? `<div class="original-script">${msg.originalText}</div>`
                  : ''
              }

              <div class="explanation-text">
                ${msg.text}
              </div>

              <div class="seal-row">
                <div>
                  <strong>ज्ञानधर्म वैदिक AI शोध संवर्ग</strong><br />
                  Digital Timestamp: ${new Date().toLocaleString('hi-IN')}<br />
                  Source: gyandharam.com/sacred-archives
                </div>
                <div class="seal-gold">
                  CERTIFIED SCRIPTURAL GUIDANCE<br />
                  AUTHENTICATED BY GYANDHARAM
                </div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <>
      {/* ── FLOATING LAUNCHER PILL (Bottom-Left) ──────────────────── */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B] text-[#0A0908] font-black text-xs shadow-[0_10px_35px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300 border-2 border-[#FEF3C7] cursor-pointer"
          title="Open Gyan AI Pandit (आध्यात्मिक सहायक)"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0A0908]" />
          </span>
          <span className="text-base">🪔</span>
          <span className="tracking-wide">Gyan AI Sahayak</span>
          <span className="text-[10px] bg-[#120E0A] text-amber-300 px-2 py-0.5 rounded-full font-bold ml-1">
            24×7
          </span>
        </button>
      </div>

      {/* ── FLOATING GLASSMORPHISM CHAT SANCTUARY ─────────────────── */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#100C09]/95 backdrop-blur-2xl border-2 border-[#F59E0B]/50 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-[#FEF3C7] animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1A120B] via-[#24170D] to-[#1A120B] border-b border-[#F59E0B]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] text-[#0A0908] flex items-center justify-center font-bold shadow-md">
                🪔
              </div>
              <div>
                <h3 className="text-sm font-heading font-black text-[#FFFBEB] flex items-center gap-1.5">
                  <span>Gyan AI Pandit</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 font-sans">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-amber-200/80">सर्वधर्म शास्त्र मार्गदर्शक • 100% Free</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {isSpeaking && (
                <button
                  onClick={stopVoice}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition"
                  title="Stop Recitation Voice"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-[#140E0A] border-b border-[#F59E0B]/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(topic.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#1F1710] hover:bg-[#332415] text-amber-300 border border-[#F59E0B]/30 transition shrink-0 cursor-pointer"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto text-xs">
            {messages.map((m) => {
              const isPandit = m.sender === 'pandit';
              const isCurrentPlaying = isSpeaking && speakingMessageId === m.id;

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isPandit ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 space-y-2 ${
                      isPandit
                        ? 'bg-[#19120B] border border-[#F59E0B]/30 text-[#FFFBEB] shadow-md'
                        : 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-[#0A0908] font-medium shadow-md'
                    }`}
                  >
                    {isPandit && m.scriptureRef && (
                      <div className="text-[10px] font-bold text-amber-400 flex items-center space-x-1 border-b border-amber-500/20 pb-1">
                        <BookOpen className="w-3 h-3 text-amber-400" />
                        <span>{m.scriptureRef}</span>
                      </div>
                    )}

                    {isPandit && m.originalText && (
                      <div className="p-2.5 rounded-xl bg-[#0D0A07] border border-amber-500/20 text-amber-200 font-serif font-bold text-center text-xs whitespace-pre-line leading-relaxed">
                        {m.originalText}
                      </div>
                    )}

                    <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
                      {m.text}
                    </div>

                    {/* Pandit Actions: Audio Speech & Download 1-Page PDF */}
                    {isPandit && m.id !== 'welcome' && (
                      <div className="pt-2 border-t border-[#F59E0B]/20 flex items-center justify-between gap-2 text-[10px]">
                        <button
                          onClick={() => speakText(m.text, m.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-lg font-bold transition ${
                            isCurrentPlaying
                              ? 'bg-amber-400 text-[#0A0908]'
                              : 'bg-[#2A1D13] hover:bg-[#3D2919] text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{isCurrentPlaying ? 'बोल रहे हैं 🎧' : 'सुनें (पंडित वाणी)'}</span>
                        </button>

                        <button
                          onClick={() => printExplanationPdf(m)}
                          className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#2A1D13] hover:bg-[#3D2919] text-amber-300 font-bold border border-amber-500/30 transition cursor-pointer"
                          title="Save this spiritual guidance as printable PDF on GyanDharam letterhead"
                        >
                          <Printer className="w-3 h-3 text-amber-400" />
                          <span>PDF डाउनलोड 📄</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-stone-300 mt-1 px-1">{m.timestamp}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-amber-300 p-2 rounded-xl bg-[#18130E] border border-amber-500/20">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>पंडित जी शास्त्रों का अवलोकन कर रहे हैं...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#160F0B] border-t border-[#F59E0B]/30 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="किसी भी श्लोक, आयत, या मंत्र का अर्थ पूछें..."
              className="flex-1 bg-[#0E0A07] border border-[#F59E0B]/30 rounded-2xl px-3.5 py-2.5 text-xs text-[#FFFBEB] placeholder-stone-300 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0A0908] font-bold hover:scale-105 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}