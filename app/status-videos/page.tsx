'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Film,
  Play,
  Download,
  Share2,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Filter,
  ArrowLeft,
  Shield,
  Layers,
} from 'lucide-react';
import { SEED_STATUS_VIDEOS, SeedStatusVideo } from '@/lib/seedStatusVideos';

const FAITH_TABS = [
  { id: 'all', name: 'All Traditions (सभी धर्म)', symbol: '✨' },
  { id: 'Hinduism', name: 'Sanatan Dharma (सनातन धर्म)', symbol: 'ॐ' },
  { id: 'Islam', name: 'Islam (इस्लाम)', symbol: '☪' },
  { id: 'Christianity', name: 'Christianity (ईसाई धर्म)', symbol: '✝' },
  { id: 'Sikhism', name: 'Sikhism (सिख धर्म)', symbol: 'ੴ' },
  { id: 'Buddhism', name: 'Buddhism (बौद्ध धर्म)', symbol: '☸' },
  { id: 'Jainism', name: 'Jainism (जैन धर्म)', symbol: '卐' },
];

const MOOD_TAGS = [
  'All Moods',
  'Morning Prayer',
  'Shanti',
  'Diwali-Chhath',
  'Evening Aarti & Sandhya',
  'Bhakti & Devotion',
  'Meditation (Dhyan)',
];

function StatusVideosContent() {
  const searchParams = useSearchParams();
  const playSlug = searchParams.get('play');

  const [videos, setVideos] = useState<SeedStatusVideo[]>(SEED_STATUS_VIDEOS);
  const [selectedFaith, setSelectedFaith] = useState('all');
  const [selectedMood, setSelectedMood] = useState('All Moods');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/status-videos?limit=48');
        if (res.ok) {
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            setVideos(data.videos);
            // If play query is provided, auto-open that video
            if (playSlug) {
              const idx = data.videos.findIndex((v: any) => v.slug === playSlug);
              if (idx !== -1) setActiveVideoIndex(idx);
            }
          }
        }
      } catch (e) {}
    };
    fetchVideos();
  }, [playSlug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter videos
  const filteredVideos = videos.filter((v) => {
    const matchFaith = selectedFaith === 'all' || v.faith.toLowerCase() === selectedFaith.toLowerCase();
    const matchMood = selectedMood === 'All Moods' || v.moodTag.toLowerCase().includes(selectedMood.toLowerCase());
    const matchSearch =
      !searchTerm ||
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.moodTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.faith.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFaith && matchMood && matchSearch;
  });

  // Download Handler
  const handleDownload = async (video: SeedStatusVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(video.id || video.slug);

    try {
      fetch('/api/status-videos/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: video.id, slug: video.slug, type: 'download' }),
      }).catch(() => {});

      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id || v.slug === video.slug
            ? { ...v, downloadsCount: (v.downloadsCount || 0) + 1 }
            : v
        )
      );

      const response = await fetch(video.videoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `GyanDharam-${video.slug || 'status'}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

      showToast(`📥 "${video.title}" downloaded! Set it as your WhatsApp status!`);
    } catch (err) {
      const a = document.createElement('a');
      a.href = video.videoUrl;
      a.target = '_blank';
      a.download = `GyanDharam-${video.slug || 'status'}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Downloading status video...');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleWhatsAppShare = (video: SeedStatusVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareText = encodeURIComponent(
      `🪔 *${video.title}*\nDownload daily sacred 4K status videos & reels on GyanDharam:\nhttps://www.gyandharam.com/status-videos?play=${video.slug}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const activeVideo = activeVideoIndex !== null ? filteredVideos[activeVideoIndex] : null;

  return (
    <div className="min-h-screen bg-[#0A0908] text-stone-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-amber-500/30">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#18130E] border border-amber-400 text-amber-200 text-xs sm:text-sm shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-amber-500/20 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Sanctuary</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full font-mono">
            {filteredVideos.length} Videos Available
          </span>
          <Link
            href="/admin?tab=videos"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-stone-400 hover:text-amber-400 transition-colors"
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span>Post New Video (Admin)</span>
          </Link>
        </div>
      </div>

      {/* Title & Description Hero */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Dharmik WhatsApp Status & Reels Vault • Daily Updated</span>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#FFFBEB] tracking-tight">
          Devotional Status Videos & Reels
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
          Pratidin naye vedic shloka, aarti, tilawat, japji sahib, aur dhyan status videos bina kisi watermark ke 4K/HD quality mein 1-click download karein.
        </p>
      </div>

      {/* Search & Filters Capsule */}
      <div className="bg-[#120E0A] border border-amber-500/25 rounded-2xl p-4 sm:p-5 shadow-xl mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search status video by mantra, shloka, deity, festival (e.g. Gayatri Mantra, Ar-Rahman, Japji Sahib)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-amber-500/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Faith Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FAITH_TABS.map((tab) => {
            const isSelected = selectedFaith.toLowerCase() === tab.id.toLowerCase();
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFaith(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md scale-105'
                    : 'bg-[#18130E] text-stone-300 hover:text-white border border-stone-800 hover:border-amber-500/40'
                }`}
              >
                <span>{tab.symbol}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Mood Tags Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-amber-500/10 text-xs scrollbar-none">
          <span className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            <span>Mood:</span>
          </span>
          {MOOD_TAGS.map((tag) => {
            const isSelected = selectedMood === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedMood(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-amber-300 bg-black/40'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="py-16 text-center text-stone-400 space-y-3 bg-[#120E0A] rounded-2xl border border-stone-800">
          <Film className="w-10 h-10 text-amber-400/50 mx-auto" />
          <p className="text-base font-semibold text-white">No status videos found matching your filters</p>
          <button
            onClick={() => {
              setSelectedFaith('all');
              setSelectedMood('All Moods');
              setSearchTerm('');
            }}
            className="text-xs text-amber-400 underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => {
            const isDownloading = downloadingId === (video.id || video.slug);

            return (
              <div
                key={video.id || video.slug || index}
                onClick={() => setActiveVideoIndex(index)}
                className="bg-[#120E0A] rounded-2xl overflow-hidden border border-amber-500/25 hover:border-amber-400 shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Poster / Thumbnail Container */}
                <div className="relative aspect-[9/14] bg-stone-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      {video.faith}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/70 text-stone-300 backdrop-blur-md">
                      {video.duration || 30}s
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-6 h-6 fill-stone-950 ml-1" />
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    <span className="inline-block text-[10px] text-amber-400 font-semibold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                      #{video.moodTag}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug drop-shadow-md">
                      {video.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-[11px] text-stone-300 font-mono pt-1">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Download className="w-3.5 h-3.5" />
                        <span>{(video.downloadsCount || 1200).toLocaleString('en-IN')} dl</span>
                      </span>
                      <span className="text-stone-400">
                        {((video.fileSize || 4800000) / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="p-3 bg-[#18130E] border-t border-amber-500/15 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleDownload(video, e)}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{isDownloading ? 'Saving...' : 'Status MP4'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleWhatsAppShare(video, e)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#251A10] hover:bg-[#342415] border border-amber-500/30 text-amber-300 font-semibold text-xs active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CINEMA REEL VIEWER MODAL ─────────────────────────────── */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-[#120E0A] border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-amber-500/20 flex items-center justify-between bg-black/60 shrink-0">
              <div className="min-w-0 pr-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                  {activeVideo.faith}
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate mt-1">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoIndex(null)}
                className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden aspect-[9/14] max-h-[60vh]">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-[#18130E] border-t border-amber-500/20 shrink-0 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-300">
                <span className="text-amber-300 font-medium">#{activeVideo.moodTag}</span>
                <span className="font-mono text-emerald-400">
                  {(activeVideo.downloadsCount || 0).toLocaleString()} Devouts Downloaded
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownload(activeVideo)}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Status MP4</span>
                </button>

                <button
                  onClick={() => handleWhatsAppShare(activeVideo)}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Share</span>
                </button>
              </div>

              {/* Prev / Next Reels Switcher */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-500/10 text-xs text-stone-400">
                <button
                  disabled={activeVideoIndex === 0}
                  onClick={() => setActiveVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                  className="flex items-center gap-1 hover:text-amber-300 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Reel</span>
                </button>
                <span className="font-mono text-[11px]">
                  {activeVideoIndex! + 1} of {filteredVideos.length}
                </span>
                <button
                  disabled={activeVideoIndex === filteredVideos.length - 1}
                  onClick={() => setActiveVideoIndex((prev) => (prev !== null && prev < filteredVideos.length - 1 ? prev + 1 : prev))}
                  className="flex items-center gap-1 hover:text-amber-300 disabled:opacity-30"
                >
                  <span>Next Reel</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatusVideosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0908] flex items-center justify-center text-amber-300">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <StatusVideosContent />
    </Suspense>
  );
}
