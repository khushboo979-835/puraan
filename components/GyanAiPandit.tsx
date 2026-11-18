'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
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
  Printer,
  FileText,
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
  {
    label: 'कर्मण्येवाधिकारस्ते (Gita 2.47)',
    query: 'गीता अध्याय २ श्लोक ४७ का सरल अर्थ और व्यावहारिक जीवन में इसका प्रयोग समझाइए।',
  },
  {
    label: 'दुर्गा सप्तशती कवच माहात्म्य',
    query: 'दुर्गा सप्तशती के देवी कवच का क्या माहात्म्य है और इसका पाठ कैसे करना चाहिए?',
  },
  {
    label: 'Surah Al-Fatiha का सार',
    query: 'क़ुरआन की पहली सूरत (अल-फ़ातिहा) का आध्यात्मिक अर्थ और संदेश क्या है?',
  },
  {
    label: 'मूल मंतर (Ik Onkar)',
    query: 'श्री जपजी साहिब के मूल मंतर "ੴ सति नामु" का क्या अर्थ है?',
  },
  {
    label: 'धम्मपद: मन की शांति',
    query: 'धम्मपद के अनुसार क्रोध और अशांत मन को कैसे वश में किया जा सकता है?',
  },
  {
    label: 'अहिंसा परमो धर्मः (जैन दर्शन)',
    query: 'तत्त्वार्थ सूत्र में अहिंसा और जीवों के परस्पर उपकार का क्या सिद्धांत है?',
  },
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
    utterance.rate = 0.8; // Calibrated dignified Pandit cadence
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

  const handleSend = async (textToSend?: string) => {
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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const panditMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'pandit',
          text: data.reply,
          scriptureRef: data.scriptureRef || 'ज्ञानधर्म सत्संग',
          originalText: data.originalText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, panditMsg]);
      } else {
        throw new Error(data.error || 'Failed to fetch response');
      }
    } catch (e: any) {
      // Graceful offline fallback
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pandit',
        text: `आपके प्रश्न "${q}" के संबंध में धर्मशास्त्रों का उपदेश है कि अंतःकरण की शुद्धि, सत्य भाषण और प्राणीमात्र पर दया ही सभी धर्मों का सर्वोच्च सार है।\n\nआप किसी विशेष ग्रंथ जैसे गीता, दुर्गा सप्तशती, क़ुरआन, धम्मपद या जपजी साहिब के किसी भी श्लोक या जीवन दर्शन के विषय में विस्तार से पूछ सकते हैं।`,
        scriptureRef: 'ज्ञानधर्म सर्वधर्म संगम',
        originalText: 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Generate luxury 1-Page PDF using jsPDF
  const downloadExplanationPdf = (msg: Message) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // Double Red and Gold Borders
      doc.setDrawColor(139, 0, 0); // Crimson Red
      doc.setLineWidth(2.5);
      doc.rect(24, 24, 547, 794);

      doc.setDrawColor(212, 175, 55); // Antique Gold
      doc.setLineWidth(1);
      doc.rect(30, 30, 535, 782);

      // Header Mantra
      doc.setFont('times', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(139, 0, 0);
      doc.text('|| OM SHREE PARAMATMANE NAMAHA ||', 297, 65, { align: 'center' });

      // Brand Title
      doc.setFontSize(22);
      doc.setTextColor(180, 83, 9);
      doc.text('GyanDharam', 297, 92, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 100, 70);
      doc.text(
        'UNIVERSAL SACRED SCRIPTURE ARCHIVES • DEVOTIONAL SCHOLAR GUIDANCE',
        297,
        107,
        { align: 'center' }
      );

      // Dividing Line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(1);
      doc.line(46, 120, 548, 120);

      // Scripture Reference Box
      doc.setFillColor(254, 249, 238);
      doc.rect(46, 130, 502, 28, 'F');
      doc.setDrawColor(180, 83, 9);
      doc.rect(46, 130, 502, 28, 'S');
      doc.setFont('times', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(139, 0, 0);
      doc.text(
        `Scripture Reference: ${msg.scriptureRef || 'Sacred Granth Wisdom'}`,
        56,
        148
      );

      let currentY = 180;

      // Original Quote Box if available
      if (msg.originalText) {
        doc.setFillColor(255, 252, 242);
        doc.rect(46, 170, 502, 48, 'F');
        doc.setDrawColor(212, 175, 55);
        doc.rect(46, 170, 502, 48, 'S');

        doc.setFont('times', 'bolditalic');
        doc.setFontSize(11);
        doc.setTextColor(40, 25, 10);
        const splitOriginal = doc.splitTextToSize(msg.originalText, 480);
        doc.text(splitOriginal, 297, 192, { align: 'center' });
        currentY = 236;
      }

      // Scholar Explanation
      doc.setFont('times', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(30, 25, 20);
      const splitText = doc.splitTextToSize(msg.text, 500);
      doc.text(splitText, 48, currentY);

      // Footer Authentication Line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.8);
      doc.line(46, 770, 548, 770);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(110, 110, 110);
      doc.text('GyanDharam Universal Wisdom Sanctuary (gyandharam.com)', 48, 786);
      doc.text(
        `Certified: ${new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}`,
        548,
        786,
        { align: 'right' }
      );

      doc.save(`GyanDharam_Spiritual_Guidance_${Date.now()}.pdf`);
    } catch (err) {
      console.error('jsPDF generation failed:', err);
    }
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
          <div className="w-5 h-5 rounded-full bg-[#18130E] flex items-center justify-center text-amber-400">
            <Flame className="w-3.5 h-3.5 animate-pulse fill-amber-400" />
          </div>
          <span className="font-heading tracking-wide uppercase">
            Gyan AI Sahayak 🪔
          </span>
          <span className="text-[9px] font-bold bg-[#18130E] text-amber-300 px-1.5 py-0.5 rounded-full">
            24×7
          </span>
        </button>
      </div>

      {/* ── CHAT WINDOW DRAWER ────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[420px] h-[550px] max-h-[82vh] bg-[#100C08]/95 backdrop-blur-2xl border-2 border-[#F59E0B]/60 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1E150D] via-[#2D1F13] to-[#1E150D] border-b border-[#F59E0B]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B45309] to-[#FEF3C7] flex items-center justify-center text-[#0A0908] shadow-md border border-amber-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#FFFBEB] flex items-center gap-1.5">
                  <span>ज्ञान AI सहायक</span>
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30">
                    Vedic Pandit
                  </span>
                </h3>
                <p className="text-[10px] text-amber-200/70">
                  सर्वधर्म ग्रन्थ शोध एवं पावन मार्गदर्शन
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
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
                    className={`max-w-[92%] rounded-2xl p-3.5 space-y-2 ${
                      isPandit
                        ? 'bg-[#19120B] border border-[#F59E0B]/30 text-[#FFFBEB] shadow-md'
                        : 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-[#0A0908] font-bold shadow-md'
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

                    {/* Pandit Actions: 🔊 Suniye (Listen) & 📄 PDF Download */}
                    {isPandit && m.id !== 'welcome' && (
                      <div className="pt-2 border-t border-[#F59E0B]/20 flex items-center justify-between gap-2 text-[10px]">
                        <button
                          onClick={() => speakText(m.text, m.id)}
                          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                            isCurrentPlaying
                              ? 'bg-amber-400 text-[#0A0908]'
                              : 'bg-[#2A1D13] hover:bg-[#3D2919] text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isCurrentPlaying ? 'विराम (Pause)' : '🔊 सुनिए (Listen)'}</span>
                        </button>

                        <button
                          onClick={() => downloadExplanationPdf(m)}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#2A1D13] hover:bg-[#3D2919] text-amber-300 font-bold border border-amber-500/30 transition cursor-pointer"
                          title="Download gold-bordered GyanDharam letterhead PDF"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>📄 PDF Download</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-stone-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-amber-300 p-2 rounded-xl bg-[#18130E] border border-amber-500/20 animate-pulse">
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
              className="flex-1 bg-[#0E0A07] border border-[#F59E0B]/30 rounded-2xl px-3.5 py-2.5 text-xs text-[#FFFBEB] placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0A0908] font-bold hover:scale-105 transition disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
