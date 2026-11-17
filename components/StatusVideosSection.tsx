'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Film,
  Play,
  Pause,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
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

export default function StatusVideosSection() {
  const [videos, setVideos] = useState<SeedStatusVideo[]>(SEED_STATUS_VIDEOS);
  const [selectedFaith, setSelectedFaith] = useState('all');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch live videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/status-videos?limit=12');
        if (res.ok) {
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            setVideos(data.videos);
          }
        }
      } catch (e) {
        // Fallback to seed data
      }
    };
    fetchVideos();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter videos by selected faith
  const filteredVideos = videos.filter((v) => {
    if (selectedFaith === 'all') return true;
    return v.faith.toLowerCase() === selectedFaith.toLowerCase();
  });

  // Handle direct MP4 download
  const handleDownload = async (video: SeedStatusVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(video.id || video.slug);

    try {
      // 1. Notify API counter
      fetch('/api/status-videos/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: video.id, slug: video.slug, type: 'download' }),
      }).catch(() => {});

      // Increment local counter instantly
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id || v.slug === video.slug
            ? { ...v, downloadsCount: (v.downloadsCount || 0) + 1 }
            : v
        )
      );

      // 2. Trigger browser download
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
      // Fallback: direct window open for download
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

  // Handle WhatsApp Share
  const handleWhatsAppShare = (video: SeedStatusVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareText = encodeURIComponent(
      `🪔 *${video.title}*\nDownload daily sacred 4K status videos & reels for free on GyanDharam:\nhttps://www.gyandharam.com/status-videos?play=${video.slug}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const activeVideo = activeVideoIndex !== null ? filteredVideos[activeVideoIndex] : null;

  return (
    <section className="my-14 sm:my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#18130E] border border-amber-400 text-amber-200 text-xs sm:text-sm shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#F59E0B]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>दैनिक पावन स्टेटस एवं रील्स • 100% Free 4K/HD MP4 Download</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#FFFBEB] tracking-tight">
            Daily Devotional Status Videos & Reels
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Har subah shubh shuruat ke liye 4K/HD dharmik videos dekhein aur bina kisi watermark ke{' '}
            <strong className="text-amber-300 font-semibold">WhatsApp Status</strong> ya{' '}
            <strong className="text-amber-300 font-semibold">Instagram Reels</strong> par 1-click me download karein.
          </p>
        </div>

        <Link
          href="/status-videos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18130E] hover:bg-[#251A10] border border-amber-500/30 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 self-start md:self-end"
        >
          <Film className="w-4 h-4 text-amber-400" />
          <span>Explore All Videos ({videos.length}+)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Faith Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {FAITH_TABS.map((tab) => {
          const isSelected = selectedFaith.toLowerCase() === tab.id.toLowerCase();
          const count =
            tab.id === 'all'
              ? videos.length
              : videos.filter((v) => v.faith.toLowerCase() === tab.id.toLowerCase()).length;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFaith(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-[#14100C] text-stone-300 hover:text-white border border-stone-800/80 hover:border-amber-500/40'
              }`}
            >
              <span>{tab.symbol}</span>
              <span>{tab.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-900 text-stone-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Videos Grid (Reels & Shorts Presentation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {filteredVideos.map((video, index) => {
          const isDownloading = downloadingId === (video.id || video.slug);

          return (
            <div
              key={video.id || video.slug || index}
              onClick={() => setActiveVideoIndex(index)}
              className="bg-[#120E0A] rounded-2xl overflow-hidden border border-amber-500/25 hover:border-amber-400/80 shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Poster / Thumbnail Container */}
              <div className="relative aspect-[9/13] sm:aspect-[9/14] bg-stone-950 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Ambient Dark Gradient Overlay */}
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

                {/* Play Button Overlay */}
                <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                  <Play className="w-6 h-6 fill-stone-950 ml-1" />
                </div>

                {/* Bottom Card Overlay: Title & Downloads counter */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                  <div className="inline-block text-[10px] text-amber-400 font-semibold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                    #{video.moodTag}
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug drop-shadow-md">
                    {video.title}
                  </h3>

                  {/* Views & Downloads Stats */}
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

              {/* Action Buttons Bar */}
              <div className="p-3 bg-[#18130E] border-t border-amber-500/15 grid grid-cols-2 gap-2">
                {/* 1-Click WhatsApp Status Download Button */}
                <button
                  type="button"
                  onClick={(e) => handleDownload(video, e)}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all disabled:opacity-50"
                  title="Download MP4 for WhatsApp Status"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isDownloading ? 'Saving...' : 'Status MP4'}</span>
                </button>

                {/* WhatsApp Share Button */}
                <button
                  type="button"
                  onClick={(e) => handleWhatsAppShare(video, e)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#251A10] hover:bg-[#342415] border border-amber-500/30 text-amber-300 font-semibold text-xs active:scale-95 transition-all"
                  title="Share to WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── IMMERSIVE CINEMA REEL VIEWER MODAL ──────────────────────── */}
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
    </section>
  );
}
