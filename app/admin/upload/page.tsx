'use client';

import React, { useState } from 'react';
import { Shield, Plus, Trash2, Save, Sparkles, Clock, CheckCircle, UploadCloud, FileText } from 'lucide-react';

interface VerseInput {
  sentenceId: string;
  originalScript: string;
  hindiTranslation: string;
  englishTranslation: string;
  startTime: number;
  endTime: number;
}

export default function AdminUploadPage() {
  const [title, setTitle] = useState('');
  const [religion, setReligion] = useState('Hinduism');
  const [language, setLanguage] = useState('Sanskrit & Hindi');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(299);
  const [totalChapters, setTotalChapters] = useState(1);
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  // Chapter state
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapterTitle, setChapterTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');

  // Verses state
  const [verses, setVerses] = useState<VerseInput[]>([
    {
      sentenceId: 'v-1',
      originalScript: '',
      hindiTranslation: '',
      englishTranslation: '',
      startTime: 0.0,
      endTime: 10.0,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const addVerseRow = () => {
    const lastEndTime = verses.length > 0 ? verses[verses.length - 1].endTime : 0;
    setVerses([
      ...verses,
      {
        sentenceId: `v-${verses.length + 1}`,
        originalScript: '',
        hindiTranslation: '',
        englishTranslation: '',
        startTime: lastEndTime + 0.1,
        endTime: lastEndTime + 10.0,
      },
    ]);
  };

  const removeVerseRow = (index: number) => {
    setVerses(verses.filter((_, idx) => idx !== index));
  };

  const handleVerseChange = (index: number, field: keyof VerseInput, val: any) => {
    const copy = [...verses];
    copy[index] = { ...copy[index], [field]: val };
    setVerses(copy);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const payload = {
        title,
        religion,
        language,
        author,
        price,
        totalChapters,
        description,
        coverImageUrl,
        chapterNumber,
        chapterTitle,
        audioUrl,
        verses,
      };

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(`✅ Successfully ingested "${title}" Chapter ${chapterNumber} with ${verses.length} timestamped verses!`);
      } else {
        alert(data.error || 'Ingestion failed');
      }
    } catch (err: any) {
      alert('Error during upload: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Curator & Administrative Ingestion Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-100">
          Ingest Sacred Scripture & Timestamp Mappings
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
          Upload scripture manuscripts, set up audio streams, and map sub-second karaoke sentence timestamps for the interactive studio.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Book Metadata */}
        <div className="bg-[#121520] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 border-b border-stone-800">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-stone-100">1. Scripture Book Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">Book Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Agni Puran (अग्नि पुराण)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Religion / Faith Tradition *</label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="Hinduism">Hinduism (सनातन धर्म)</option>
                <option value="Islam">Islam (القرآن)</option>
                <option value="Christianity">Christianity (Gospels & Psalms)</option>
                <option value="Sikhism">Sikhism (ਗੁਰਮੁਖੀ)</option>
                <option value="Buddhism">Buddhism (धम्मपद)</option>
                <option value="Jainism">Jainism (तत्त्वार्थ सूत्र)</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Author / Sage / Revelation</label>
              <input
                type="text"
                placeholder="e.g. Maharshi Ved Vyasa / Lord Agni"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Original Language</label>
              <input
                type="text"
                placeholder="e.g. Sanskrit & Hindi"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Digital Unlock Price (INR ₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Cover Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-300 font-semibold mb-1">Synopsis & Description</label>
              <textarea
                rows={3}
                placeholder="Describe the metaphysical, spiritual, and historical significance of the sacred scripture..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Chapter Details */}
        <div className="bg-[#121520] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 border-b border-stone-800">
            <UploadCloud className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-stone-100">2. Chapter Content & Audio Stream</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">Chapter Number *</label>
              <input
                type="number"
                min="1"
                required
                value={chapterNumber}
                onChange={(e) => setChapterNumber(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                {chapterNumber === 1 ? '✨ Note: Chapter 1 is 100% Free Freemium Tier' : '🔒 Chapter 2+ is Locked behind Digital Access'}
              </p>
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">Chapter Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. अध्याय १: अग्निपुराण माहात्म्य (Cosmic Inception)"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-300 font-semibold mb-1">Audio Recitation Stream URL (MP3 / AAC) *</label>
              <input
                type="url"
                required
                placeholder="https://cdn.pixabay.com/.../audio.mp3"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Verse Timestamp Mappings */}
        <div className="bg-[#121520] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif font-bold text-lg text-stone-100">3. Synced Verse & Timestamp Mappings</h2>
            </div>
            <button
              type="button"
              onClick={addVerseRow}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Verse</span>
            </button>
          </div>

          <div className="space-y-4">
            {verses.map((verse, idx) => (
              <div
                key={idx}
                className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-3 relative group text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-serif">Verse #{idx + 1}</span>
                  {verses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVerseRow(idx)}
                      className="text-stone-400 hover:text-rose-400 p-1"
                      title="Remove Verse"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-400 mb-1">Original Script (Devanagari / Arabic / Gurmukhi / Hebrew)</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="ॐ नमः परमात्मने वासुदेवाय..."
                      value={verse.originalScript}
                      onChange={(e) => handleVerseChange(idx, 'originalScript', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-serif focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1">Hindi Translation / भावार्थ</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="उस परमात्मा वासुदेव को नमस्कार है..."
                      value={verse.hindiTranslation}
                      onChange={(e) => handleVerseChange(idx, 'hindiTranslation', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-serif focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1">English Translation (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Salutations to the Supreme Divine Lord..."
                      value={verse.englishTranslation}
                      onChange={(e) => handleVerseChange(idx, 'englishTranslation', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1">Start Time (Seconds)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={verse.startTime}
                      onChange={(e) => handleVerseChange(idx, 'startTime', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1">End Time (Seconds)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={verse.endTime}
                      onChange={(e) => handleVerseChange(idx, 'endTime', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addVerseRow}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 border border-dashed border-stone-700 rounded-2xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Another Verse Row</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 text-stone-950 font-bold rounded-2xl text-sm shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
        >
          {loading ? (
            <span>Ingesting Manuscript Data...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Publish Scripture & Timestamps to Studio</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
