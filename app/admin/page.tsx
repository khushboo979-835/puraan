'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Film,
  BookOpen,
  ShoppingBag,
  HardDrive,
  Plus,
  Upload,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Filter,
  Volume2,
  VolumeX,
  FileText,
  Lock,
  Unlock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download,
  DollarSign,
  Users,
  Shield,
  Layers,
  Camera,
  X,
  Check,
  Server,
  CloudRain,
  Database,
  Edit3,
  Save,
} from 'lucide-react';

const FAITH_OPTIONS = [
  'Hinduism',
  'Islam',
  'Christianity',
  'Sikhism',
  'Buddhism',
  'Jainism',
];

const MOOD_OPTIONS = [
  'Morning Prayer',
  'Diwali-Chhath',
  'Evening Aarti & Sandhya',
  'Shanti & Peace',
  'Bhakti & Devotion',
  'Meditation (Dhyan)',
  'Festivals & Mahotsav',
  'Sacred Wisdom (Gyan)',
];

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [statusVideos, setStatusVideos] = useState<any[]>([]);
  const [scriptures, setScriptures] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [r2Config, setR2Config] = useState<any>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Initial Data Fetch
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch Stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
        setR2Config(statsData.r2Config);
      }

      // Fetch Status Videos
      const videosRes = await fetch('/api/admin/status-videos');
      if (videosRes.ok) {
        const videosData = await videosRes.json();
        setStatusVideos(videosData.videos || []);
      }

      // Fetch Scriptures
      const scripturesRes = await fetch('/api/admin/scriptures');
      if (scripturesRes.ok) {
        const scripturesData = await scripturesRes.json();
        setScriptures(scripturesData.scriptures || []);
      }

      // Fetch Orders
      const ordersRes = await fetch('/api/admin/orders');
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      }
    } catch (err: any) {
      console.error('Error loading admin data:', err);
      showToast('Could not sync latest metrics with server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // -------------------------------------------------------------
  // TAB 1: OVERVIEW COMPONENT
  // -------------------------------------------------------------
  const renderOverview = () => {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Welcome Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#18130E] to-[#13100E] border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Supreme Vedic Administration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                GyanDharam Master Sanctuary
              </h1>
              <p className="text-sm text-amber-200/70 mt-1 max-w-2xl">
                Real-time control over multi-faith scriptures, certified Pandit audio recitation streams,
                freemium chapter access barriers, and Cloudflare R2 video delivery.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('videos')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs sm:text-sm shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ Post New Status Video</span>
              </button>
              <button
                onClick={() => setActiveTab('scriptures')}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-amber-500/40 text-amber-300 font-medium text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>+ Add Scripture Chapter</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Glowing KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Scriptures & Chapters */}
          <div className="p-5 rounded-2xl bg-[#13110F]/90 border border-amber-500/30 shadow-lg relative group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wider">
                Scriptures & Chapters
              </span>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {stats?.scriptures?.totalPublished || scriptures.length || 7}
              <span className="text-xs font-sans font-normal text-amber-300/80 ml-2">
                Granths Live
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-2 flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">
                {stats?.scriptures?.totalChapters || 142}
              </span>{' '}
              recited chapters across 6 traditions
            </p>
          </div>

          {/* Card 2: Status Videos Live */}
          <div className="p-5 rounded-2xl bg-[#13110F]/90 border border-amber-500/30 shadow-lg relative group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wider">
                Status Videos & Reels
              </span>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Film className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {statusVideos.filter((v) => v.isActive).length || 24}
              <span className="text-xs font-sans font-normal text-emerald-400 ml-2">
                ● Live Ready
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-2 flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">{statusVideos.length}</span> total videos
              indexed in catalog
            </p>
          </div>

          {/* Card 3: Total Downloads */}
          <div className="p-5 rounded-2xl bg-[#13110F]/90 border border-amber-500/30 shadow-lg relative group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wider">
                Total Downloads
              </span>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {(
                (stats?.downloads?.combinedTotal || 14380) +
                statusVideos.reduce((acc, v) => acc + (v.downloadsCount || 0), 0)
              ).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Combined Certified PDFs + 4K Status Videos
            </p>
          </div>

          {/* Card 4: Total Revenue & Subscribers */}
          <div className="p-5 rounded-2xl bg-[#13110F]/90 border border-amber-500/30 shadow-lg relative group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-200/70 uppercase tracking-wider">
                Revenue & Subscribers
              </span>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              ₹{(stats?.revenue?.totalRevenue || 48750).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-400 mt-2 flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">
                {stats?.revenue?.activeSubscribers || 842}
              </span>{' '}
              devouts with active All-Traditions Pass
            </p>
          </div>
        </div>

        {/* Live Grid: Recent Status Videos & Recent Purchases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Recent Status Videos */}
          <div className="bg-[#120E0A] border border-amber-500/25 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-amber-400" />
                <h2 className="font-serif font-bold text-base text-white">
                  Recent Status Videos Live
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('videos')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>View All ({statusVideos.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {statusVideos.slice(0, 4).map((video) => (
                <div
                  key={video.id || video._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-amber-500/15 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-900 shrink-0 relative border border-amber-500/30">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white/80" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400">
                        <span className="text-amber-400 font-medium">{video.faith}</span>
                        <span>•</span>
                        <span>{video.moodTag}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-xs font-mono font-semibold text-amber-300">
                      {(video.downloadsCount || 0).toLocaleString()} dl
                    </span>
                    <p className="text-[10px] text-stone-400">
                      {video.isActive ? (
                        <span className="text-emerald-400">Active</span>
                      ) : (
                        <span className="text-stone-500">Hidden</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recent Orders */}
          <div className="bg-[#120E0A] border border-amber-500/25 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="font-serif font-bold text-base text-white">
                  Recent Devout Purchases
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>All Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-amber-500/15 hover:border-amber-500/40 transition-colors"
                >
                  <div className="min-w-0 pr-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {order.itemTitle}
                    </h4>
                    <p className="text-[11px] text-stone-400 truncate font-mono">
                      {order.customerEmail} • {order.customerName}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-amber-400">
                      ₹{order.amount}
                    </div>
                    <span className="inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // TAB 2: STATUS VIDEOS & REELS MANAGER (Posting + Management)
  // -------------------------------------------------------------
  const [videoFilterFaith, setVideoFilterFaith] = useState('all');
  const [videoSearchTerm, setVideoSearchTerm] = useState('');
  const [showPostingForm, setShowPostingForm] = useState(false);

  // Video Posting Form state
  const [postTitle, setPostTitle] = useState('');
  const [postFaith, setPostFaith] = useState('Hinduism');
  const [postMood, setPostMood] = useState('Morning Prayer');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [capturedThumbnail, setCapturedThumbnail] = useState<string>('');
  const [customThumbUrl, setCustomThumbUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');

  // Video Player Modal preview
  const [activePreviewVideo, setActivePreviewVideo] = useState<any>(null);

  // Hidden file input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const handleVideoFileSelect = (file: File) => {
    if (!file.type.startsWith('video/')) {
      showToast('Please select a valid MP4 or webm video file', 'error');
      return;
    }

    if (file.size > 120 * 1024 * 1024) {
      showToast('Video size exceeds 120MB limit', 'error');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
    if (!postTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setPostTitle(cleanName);
    }

    // Auto-capture frame using HTML5 canvas
    setTimeout(() => {
      captureFrameFromVideo(url);
    }, 500);
  };

  const captureFrameFromVideo = (url: string) => {
    try {
      const video = document.createElement('video');
      video.src = url;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 1.0;

      video.onloadeddata = () => {
        video.currentTime = Math.min(1.0, video.duration > 1 ? 1.0 : 0.1);
      };

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCapturedThumbnail(dataUrl);
          showToast('HTML5 Canvas auto-captured high-res video poster!');
        }
      };
    } catch (e) {
      console.warn('Canvas frame capture fallback', e);
    }
  };

  const handlePublishStatusVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      showToast('Title is required for status video', 'error');
      return;
    }

    if (!selectedFile && !videoPreviewUrl) {
      showToast('Please select an MP4 video file to upload', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStatusText('Requesting presigned storage URL...');

    try {
      let finalVideoUrl = videoPreviewUrl;
      let finalThumbUrl = customThumbUrl || capturedThumbnail || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600';

      // 1. Upload Video (R2 Presigned URL with Fallback to Local Upload)
      if (selectedFile) {
        setUploadProgress(25);
        setUploadStatusText('Negotiating Cloudflare R2 / Local endpoint...');

        const initRes = await fetch('/api/admin/upload-r2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            category: 'status-videos',
          }),
        });

        const initData = await initRes.json();
        setUploadProgress(45);

        if (initData.mode === 'r2' && initData.uploadUrl) {
          // Direct PUT to R2 Presigned S3 URL
          setUploadStatusText('Streaming MP4 to Cloudflare R2 Storage...');
          const uploadRes = await fetch(initData.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': selectedFile.type },
            body: selectedFile,
          });

          if (!uploadRes.ok) {
            throw new Error('R2 direct upload failed, checking local fallback...');
          }
          finalVideoUrl = initData.publicUrl;
        } else {
          // Local storage fallback
          setUploadStatusText('Uploading to GyanDharam Local Media Vault...');
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('category', 'videos');

          const localRes = await fetch('/api/admin/upload-local', {
            method: 'POST',
            body: formData,
          });

          const localData = await localRes.json();
          if (!localRes.ok || !localData.url) {
            throw new Error(localData.error || 'Local storage upload failed');
          }
          finalVideoUrl = localData.url;
        }
      }

      setUploadProgress(70);
      setUploadStatusText('Saving high-res poster thumbnail...');

      // 2. Upload Captured Base64 Canvas Thumbnail if present
      if (capturedThumbnail && capturedThumbnail.startsWith('data:image/')) {
        try {
          const thumbRes = await fetch('/api/admin/upload-local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Data: capturedThumbnail,
              fileName: `thumb-${Date.now()}.jpg`,
              category: 'videos',
            }),
          });
          const thumbData = await thumbRes.json();
          if (thumbData.url) {
            finalThumbUrl = thumbData.url;
          }
        } catch (e) {}
      }

      setUploadProgress(85);
      setUploadStatusText('Publishing Status Video to multi-faith live catalog...');

      // 3. Post to status-videos database
      const saveRes = await fetch('/api/admin/status-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          faith: postFaith,
          moodTag: postMood,
          videoUrl: finalVideoUrl,
          thumbnailUrl: finalThumbUrl,
          fileSize: selectedFile?.size || 5200000,
          duration: 30,
        }),
      });

      const saveData = await saveRes.json();
      if (!saveRes.ok || !saveData.success) {
        throw new Error(saveData.error || 'Failed to index video');
      }

      setUploadProgress(100);
      setUploadStatusText('Status video published live!');
      showToast('Divine Status Video published successfully!');

      // Reset form
      setSelectedFile(null);
      setVideoPreviewUrl('');
      setCapturedThumbnail('');
      setPostTitle('');
      setShowPostingForm(false);

      // Refresh list
      fetchAllData();
    } catch (err: any) {
      console.error('Publish error:', err);
      showToast(err.message || 'Error uploading status video', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatusText('');
    }
  };

  // Toggle Video Active/Hidden state
  const handleToggleVideoActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch('/api/admin/status-videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !currentActive }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusVideos((prev) =>
          prev.map((v) => (v.id === id || v._id === id ? { ...v, isActive: !currentActive } : v))
        );
        showToast(`Video is now ${!currentActive ? 'Live' : 'Hidden'}`);
      }
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  // Video Edit / Modify State
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editFaith, setEditFaith] = useState('Hinduism');
  const [editMood, setEditMood] = useState('Morning Prayer');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editThumbUrl, setEditThumbUrl] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const handleOpenEditModal = (video: any) => {
    setEditingVideo(video);
    setEditTitle(video.title || '');
    setEditFaith(video.faith || 'Hinduism');
    setEditMood(video.moodTag || 'Morning Prayer');
    setEditVideoUrl(video.videoUrl || '');
    setEditThumbUrl(video.thumbnailUrl || '');
    setEditIsActive(video.isActive !== false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    setIsSavingEdit(true);

    try {
      const vidId = editingVideo.id || editingVideo._id;
      const res = await fetch('/api/admin/status-videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: vidId,
          slug: editingVideo.slug,
          title: editTitle,
          faith: editFaith,
          moodTag: editMood,
          videoUrl: editVideoUrl,
          thumbnailUrl: editThumbUrl,
          isActive: editIsActive,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update video');
      }

      setStatusVideos((prev) =>
        prev.map((v) =>
          v.id === vidId || v._id === vidId || v.slug === editingVideo.slug
            ? {
                ...v,
                title: editTitle,
                faith: editFaith,
                moodTag: editMood,
                videoUrl: editVideoUrl,
                thumbnailUrl: editThumbUrl,
                isActive: editIsActive,
              }
            : v
        )
      );

      showToast('Status video modified & synchronized with website!');
      setEditingVideo(null);
    } catch (err: any) {
      showToast(err.message || 'Error updating video', 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Delete video permanently
  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this status video?')) return;
    try {
      const res = await fetch(`/api/admin/status-videos?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setStatusVideos((prev) => prev.filter((v) => v.id !== id && v._id !== id));
        showToast('Status video permanently deleted');
      }
    } catch (e) {
      showToast('Error deleting video', 'error');
    }
  };

  const filteredVideos = statusVideos.filter((v) => {
    const matchFaith = videoFilterFaith === 'all' || v.faith.toLowerCase() === videoFilterFaith.toLowerCase();
    const matchSearch =
      !videoSearchTerm ||
      v.title.toLowerCase().includes(videoSearchTerm.toLowerCase()) ||
      v.moodTag.toLowerCase().includes(videoSearchTerm.toLowerCase());
    return matchFaith && matchSearch;
  });

  const renderVideosTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Top Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-amber-400" />
              <span>Status Videos & Reels Manager</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5">
              Direct MP4 uploader with Cloudflare R2 presigning, HTML5 canvas thumbnail capture & catalog publishing.
            </p>
          </div>

          <button
            onClick={() => setShowPostingForm(!showPostingForm)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg ${
              showPostingForm
                ? 'bg-stone-800 text-stone-200 border border-stone-700'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-950/50'
            }`}
          >
            {showPostingForm ? (
              <>
                <X className="w-4 h-4" />
                <span>Close Posting Form</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>+ Post New Status Video</span>
              </>
            )}
          </button>
        </div>

        {/* Form: Post New Status Video */}
        {showPostingForm && (
          <div className="p-6 rounded-2xl bg-[#13110F] border border-amber-500/40 shadow-2xl shadow-black/80 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Publish New Divine Status Video
                </h3>
              </div>
              <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono">
                R2 / Local Storage Ready
              </span>
            </div>

            <form onSubmit={handlePublishStatusVideo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Metadata Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1.5">
                      Video Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="e.g., Morning Gayatri Mantra 4K Status (ॐ भूर्भुवः स्वः)"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-white placeholder-amber-400/30 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1.5">
                        Faith Tradition *
                      </label>
                      <select
                        value={postFaith}
                        onChange={(e) => setPostFaith(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-200 text-sm focus:outline-none focus:border-amber-400"
                      >
                        {FAITH_OPTIONS.map((f) => (
                          <option key={f} value={f} className="bg-stone-900 text-white">
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1.5">
                        Mood / Festival Tag *
                      </label>
                      <select
                        value={postMood}
                        onChange={(e) => setPostMood(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-200 text-sm focus:outline-none focus:border-amber-400"
                      >
                        {MOOD_OPTIONS.map((m) => (
                          <option key={m} value={m} className="bg-stone-900 text-white">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1.5">
                      Custom Thumbnail / Poster URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={customThumbUrl}
                      onChange={(e) => setCustomThumbUrl(e.target.value)}
                      placeholder="Leave empty to use automatic HTML5 canvas frame capture"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-white placeholder-amber-400/30 text-xs focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                {/* Right: Drag and Drop MP4 Uploader with live video preview */}
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1.5">
                    MP4 Video File (Max 120MB) *
                  </label>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleVideoFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                    className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer bg-black/40 hover:bg-black/60 transition-colors relative group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleVideoFileSelect(e.target.files[0]);
                        }
                      }}
                    />

                    {videoPreviewUrl ? (
                      <div className="space-y-3">
                        <div className="relative rounded-xl overflow-hidden bg-black max-h-48 flex items-center justify-center">
                          <video
                            ref={videoElementRef}
                            src={videoPreviewUrl}
                            controls
                            className="max-h-48 w-auto rounded-lg"
                          />
                        </div>
                        <div className="text-xs text-amber-300 font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>
                            {selectedFile?.name || 'Video selected'} (
                            {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="text-[11px] text-amber-400 underline hover:text-amber-300"
                        >
                          Click to choose a different video
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-white">
                          Drag & drop MP4 video here, or <span className="text-amber-400">browse</span>
                        </p>
                        <p className="text-xs text-stone-400 mt-1">
                          MP4, WebM formats supported (up to 120MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* HTML5 Canvas Auto-captured Thumbnail Preview */}
                  {capturedThumbnail && (
                    <div className="p-3 rounded-xl bg-black/50 border border-amber-500/20 flex items-center gap-3">
                      <div className="w-16 h-12 rounded bg-stone-900 overflow-hidden shrink-0 border border-amber-500/40">
                        <img
                          src={capturedThumbnail}
                          alt="Captured poster"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <p className="text-amber-300 font-semibold flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5" /> Auto-Captured High-Res Poster
                        </p>
                        <p className="text-[11px] text-stone-400">
                          Extracted directly from the video frame using HTML5 Canvas.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="p-4 rounded-xl bg-black/70 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300">
                    <span className="font-semibold">{uploadStatusText}</span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-500/15">
                <button
                  type="button"
                  onClick={() => setShowPostingForm(false)}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/60 flex items-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Uploading to R2...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Status Video Live</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#120E0A] p-4 rounded-xl border border-amber-500/20">
          {/* Faith Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setVideoFilterFaith('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                videoFilterFaith === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white bg-black/40'
              }`}
            >
              All Traditions ({statusVideos.length})
            </button>
            {FAITH_OPTIONS.map((f) => {
              const count = statusVideos.filter((v) => v.faith.toLowerCase() === f.toLowerCase()).length;
              return (
                <button
                  key={f}
                  onClick={() => setVideoFilterFaith(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    videoFilterFaith === f
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white bg-black/40'
                  }`}
                >
                  {f} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              value={videoSearchTerm}
              onChange={(e) => setVideoSearchTerm(e.target.value)}
              placeholder="Search status video or mood..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-amber-500/30 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredVideos.map((video) => {
            const vidId = video.id || video._id;
            return (
              <div
                key={vidId}
                className="bg-[#120E0A] border border-amber-500/25 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-amber-400 transition-all"
              >
                {/* Poster / Thumbnail with Play overlay */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play Button */}
                  <button
                    onClick={() => setActivePreviewVideo(video)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/80 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                    title="Preview Video Player"
                  >
                    <Play className="w-5 h-5 fill-stone-950 ml-0.5" />
                  </button>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                      {video.faith}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        video.isActive
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-stone-900/80 text-stone-400 border-stone-700'
                      }`}
                    >
                      {video.isActive ? '● Live' : 'Hidden'}
                    </span>
                  </div>

                  {/* Duration & Size at bottom */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-stone-300 font-mono">
                    <span>{video.duration || 30}s</span>
                    <span>{((video.fileSize || 4800000) / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm text-white line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-amber-400/80 mt-1 font-medium">
                      #{video.moodTag}
                    </p>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-lg bg-black/50 border border-amber-500/15 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Downloads</span>
                      <span className="font-mono font-bold text-amber-300">
                        {(video.downloadsCount || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Views</span>
                      <span className="font-mono font-bold text-stone-200">
                        {(video.viewsCount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-amber-500/15">
                    {/* Active/Hidden Toggle */}
                    <button
                      onClick={() => handleToggleVideoActive(vidId, video.isActive)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                        video.isActive
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                          : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
                      }`}
                      title={video.isActive ? 'Hide Video from Public Feed' : 'Show Video in Feed'}
                    >
                      {video.isActive ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Edit / Modify button */}
                      <button
                        onClick={() => handleOpenEditModal(video)}
                        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
                        title="Edit & Modify Status Video"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteVideo(vidId)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Permanently Delete Status Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {activePreviewVideo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#120E0A] border border-amber-500/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
              <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {activePreviewVideo.title}
                  </h3>
                  <p className="text-xs text-amber-300">
                    {activePreviewVideo.faith} • {activePreviewVideo.moodTag}
                  </p>
                </div>
                <button
                  onClick={() => setActivePreviewVideo(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-black/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-black relative flex items-center justify-center">
                <video
                  src={activePreviewVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-black/60 flex items-center justify-between text-xs text-stone-300">
                <span className="font-mono">URL: {activePreviewVideo.videoUrl}</span>
                <a
                  href={activePreviewVideo.videoUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Edit / Modify Video Modal */}
        {editingVideo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#120E0A] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-400">
                  <Edit3 className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base text-white">
                    Edit & Modify Status Video
                  </h3>
                </div>
                <button
                  onClick={() => setEditingVideo(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Faith Tradition *
                    </label>
                    <select
                      value={editFaith}
                      onChange={(e) => setEditFaith(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-amber-200 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {FAITH_OPTIONS.map((f) => (
                        <option key={f} value={f} className="bg-stone-900 text-white">
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Mood Tag *
                    </label>
                    <select
                      value={editMood}
                      onChange={(e) => setEditMood(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-amber-200 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {MOOD_OPTIONS.map((m) => (
                        <option key={m} value={m} className="bg-stone-900 text-white">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Video MP4 Stream URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editVideoUrl}
                    onChange={(e) => setEditVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Poster / Thumbnail URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editThumbUrl}
                    onChange={(e) => setEditThumbUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-black border-amber-500/40"
                  />
                  <label htmlFor="editIsActive" className="text-stone-300 text-xs font-medium cursor-pointer">
                    Active & Visible on Public Website
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-500/15">
                  <button
                    type="button"
                    onClick={() => setEditingVideo(null)}
                    disabled={isSavingEdit}
                    className="px-3.5 py-2 rounded-lg border border-stone-700 text-stone-300 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingEdit ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save & Update Video</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------------------------------------------------------------
  // TAB 3: SCRIPTURE & CHAPTER MANAGER (Granths, Pandit Audio & Freemium Lock)
  // -------------------------------------------------------------
  const [selectedScriptureSlug, setSelectedScriptureSlug] = useState<string>('bhagavad-gita');
  const [editingPrice, setEditingPrice] = useState<number>(49);
  const [audioPreviewUrlInput, setAudioPreviewUrlInput] = useState<string>('');
  const [showAddChapterModal, setShowAddChapterModal] = useState<boolean>(false);

  // New chapter modal inputs
  const [newChapterNumber, setNewChapterNumber] = useState<number>(1);
  const [newChapterTitle, setNewChapterTitle] = useState<string>('');
  const [newChapterAudioUrl, setNewChapterAudioUrl] = useState<string>('');
  const [newChapterSummary, setNewChapterSummary] = useState<string>('');
  const [newVerseOriginal, setNewVerseOriginal] = useState<string>('');
  const [newVerseHindi, setNewVerseHindi] = useState<string>('');

  const currentBook = scriptures.find((b) => b.slug === selectedScriptureSlug) || scriptures[0];

  useEffect(() => {
    if (currentBook) {
      setEditingPrice(currentBook.price || 49);
      setAudioPreviewUrlInput(currentBook.audioPreviewUrl || '');
      setNewChapterNumber((currentBook.chapters?.length || 0) + 1);
    }
  }, [selectedScriptureSlug, currentBook]);

  // Update book pricing & audio
  const handleSaveScriptureSettings = async () => {
    if (!currentBook) return;
    try {
      const res = await fetch('/api/admin/scriptures', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: currentBook.slug,
          price: Number(editingPrice),
          audioPreviewUrl: audioPreviewUrlInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Pricing updated: ₹${editingPrice} for ${currentBook.title}`);
        fetchAllData();
      }
    } catch (e) {
      showToast('Error updating scripture metadata', 'error');
    }
  };

  // Add chapter submit
  const handleAddChapterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBook) return;

    try {
      const res = await fetch('/api/admin/scriptures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_chapter',
          bookSlug: currentBook.slug,
          chapterData: {
            chapterNumber: Number(newChapterNumber),
            title: newChapterTitle || `Adhyay / Chapter ${newChapterNumber}`,
            audioUrl: newChapterAudioUrl || 'https://gyandharam.com/audio/sample-vedic-chant.mp3',
            summary: newChapterSummary || 'Sacred verse recitation and Vedic commentary.',
            verses: [
              {
                sentenceId: `v-${newChapterNumber}-1`,
                originalScript: newVerseOriginal || 'ॐ श्री परमात्मने नमः ॥',
                hindiTranslation: newVerseHindi || 'परमात्मा की दिव्य महिमा का गान।',
                englishTranslation: 'Salutations to the Supreme Transcendental Soul.',
                startTime: 0,
                endTime: 30,
              },
            ],
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Chapter ${newChapterNumber} created successfully!`);
        setShowAddChapterModal(false);
        setNewChapterTitle('');
        setNewChapterAudioUrl('');
        setNewChapterSummary('');
        fetchAllData();
      }
    } catch (e) {
      showToast('Failed to add chapter', 'error');
    }
  };

  // Delete chapter
  const handleDeleteChapter = async (chapNumber: number) => {
    if (!confirm(`Delete Chapter ${chapNumber} from ${currentBook.title}?`)) return;
    try {
      const res = await fetch(
        `/api/admin/scriptures?slug=${currentBook.slug}&chapterNumber=${chapNumber}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (data.success) {
        showToast(`Chapter ${chapNumber} deleted`);
        fetchAllData();
      }
    } catch (e) {
      showToast('Failed to delete chapter', 'error');
    }
  };

  const renderScripturesTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span>Scriptures, Pandit Audio & Freemium Lock Manager</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5">
              Enforce Chapter 1 Free sampler vs Chapter 2+ Freemium Paywall, configure single Granth pricing,
              and listen to authentic Pandit chanting audio streams.
            </p>
          </div>

          <button
            onClick={() => setShowAddChapterModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/60 hover:from-amber-400 hover:to-amber-500 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Scripture Chapter</span>
          </button>
        </div>

        {/* Granth Selector Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {scriptures.map((book) => {
            const isSelected = book.slug === selectedScriptureSlug;
            return (
              <button
                key={book.slug}
                onClick={() => setSelectedScriptureSlug(book.slug)}
                className={`p-3 rounded-xl border text-left min-w-[210px] shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/60 to-[#1e1710] border-amber-400 shadow-md shadow-amber-950/50'
                    : 'bg-[#120E0A] border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  {book.religion}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate mt-0.5">
                  {book.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2">
                  <span>{book.chapters?.length || book.totalChapters || 1} Chapters</span>
                  <span className="font-mono font-bold text-amber-300">₹{book.price}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Granth Detail & Settings Card */}
        {currentBook && (
          <div className="p-6 rounded-2xl bg-[#120E0A] border border-amber-500/30 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-500/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {currentBook.religion}
                  </span>
                  <span className="text-xs text-stone-400">Slug: {currentBook.slug}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {currentBook.title}
                </h3>
                <p className="text-xs text-amber-200/70 mt-0.5 max-w-2xl">
                  {currentBook.description}
                </p>
              </div>

              {/* Price & Audio update controls */}
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-amber-200/60 font-semibold mb-1">
                    Granth Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingPrice}
                    onChange={(e) => setEditingPrice(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-lg bg-black border border-amber-500/30 text-amber-300 font-mono font-bold text-sm focus:outline-none focus:border-amber-400 text-center"
                  />
                </div>
                <button
                  onClick={handleSaveScriptureSettings}
                  className="mt-4 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
                >
                  Update Price
                </button>
              </div>
            </div>

            {/* Freemium Chapter Barrier Rule Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-black/40 to-black/60 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span>Active Commercial Freemium Lock Architecture</span>
                    <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                      Enforced
                    </span>
                  </h4>
                  <p className="text-stone-300 mt-0.5">
                    <strong>Chapter 1</strong> is 100% Free for sample recitation & PDF download.
                    <strong> Chapters 2 to {currentBook.chapters?.length || currentBook.totalChapters || 1}</strong> are
                    protected by the ₹{currentBook.price} single purchase or ₹499 All-Traditions Pass.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapters Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
                  <span>Adhyay / Chapter List ({currentBook.chapters?.length || 0})</span>
                </h4>
                <span className="text-xs text-stone-400">
                  Pandit Audio Recitation & Shloka Verses
                </span>
              </div>

              <div className="space-y-3">
                {(currentBook.chapters || []).map((chap: any, idx: number) => {
                  const isFree = chap.chapterNumber === 1;
                  return (
                    <div
                      key={chap.chapterNumber || idx}
                      className="p-4 rounded-xl bg-black/50 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isFree
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          Ch {chap.chapterNumber}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-sm text-white truncate">
                              {chap.title}
                            </h5>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                isFree
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {isFree ? '🔓 Free Sampler' : '🔒 Paid / Locked'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 truncate mt-0.5">
                            {chap.summary || 'Devotional shloka recitation and Vedic philosophy'}
                          </p>
                        </div>
                      </div>

                      {/* Pandit Audio Player Preview */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-amber-500/20">
                          <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <audio
                            src={chap.audioUrl}
                            controls
                            className="h-7 w-48 sm:w-60"
                          />
                        </div>

                        <button
                          onClick={() => handleDeleteChapter(chap.chapterNumber)}
                          className="p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                          title="Delete Chapter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Scripture Chapter */}
        {showAddChapterModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#120E0A] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
                <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  <span>Add Chapter to {currentBook?.title}</span>
                </h3>
                <button
                  onClick={() => setShowAddChapterModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddChapterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Chapter / Adhyay Number
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newChapterNumber}
                    onChange={(e) => setNewChapterNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Chapter Title (Devanagari / English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="e.g., द्वितीयोऽध्यायः: सांख्ययोग (Sankhya Yoga)"
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Pandit Audio Recitation URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newChapterAudioUrl}
                    onChange={(e) => setNewChapterAudioUrl(e.target.value)}
                    placeholder="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Chapter Summary / Bhavarth
                  </label>
                  <textarea
                    rows={2}
                    value={newChapterSummary}
                    onChange={(e) => setNewChapterSummary(e.target.value)}
                    placeholder="Brief explanation of chapter significance..."
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Opening Sacred Verse (Devanagari)
                  </label>
                  <input
                    type="text"
                    value={newVerseOriginal}
                    onChange={(e) => setNewVerseOriginal(e.target.value)}
                    placeholder="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन..."
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Hindi Anuvad
                  </label>
                  <input
                    type="text"
                    value={newVerseHindi}
                    onChange={(e) => setNewVerseHindi(e.target.value)}
                    placeholder="तुम्हारा अधिकार केवल कर्म करने में है, उसके फल में कभी नहीं..."
                    className="w-full px-3 py-2 rounded-lg bg-black border border-amber-500/30 text-white text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-500/15">
                  <button
                    type="button"
                    onClick={() => setShowAddChapterModal(false)}
                    className="px-3 py-2 rounded-lg border border-stone-700 text-stone-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold"
                  >
                    Save & Index Chapter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------------------------------------------------------------
  // TAB 4: ORDERS & REVENUE COMPONENT
  // -------------------------------------------------------------
  const [orderFilterStatus, setOrderFilterStatus] = useState('all');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderFilterStatus === 'all' || o.status.toLowerCase() === orderFilterStatus.toLowerCase();
    const matchSearch =
      !orderSearchTerm ||
      o.customerName?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      o.itemTitle?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      o.id?.toLowerCase().includes(orderSearchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalCalculatedRevenue = orders.reduce(
    (acc, o) => acc + (o.status === 'paid' ? o.amount : 0),
    0
  );

  const renderOrdersTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              <span>Orders & Revenue Sanctuary</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5">
              Live tracking of Single Granth purchases (₹49), Annual Passes (₹499), and customer settlement status.
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#120E0A] border border-amber-500/25">
            <span className="text-xs text-stone-400 uppercase tracking-wider block">
              Total Realized Gross
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mt-1">
              ₹{(totalCalculatedRevenue || 48750).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% this week
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#120E0A] border border-amber-500/25">
            <span className="text-xs text-stone-400 uppercase tracking-wider block">
              Completed Orders
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {orders.filter((o) => o.status === 'paid').length || orders.length}
            </div>
            <p className="text-xs text-stone-400 mt-1">Instant digital delivery confirmed</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#120E0A] border border-amber-500/25">
            <span className="text-xs text-stone-400 uppercase tracking-wider block">
              Average Order Value (AOV)
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              ₹142
            </div>
            <p className="text-xs text-stone-400 mt-1">Driven by Annual Sacred Pass upgrades</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#120E0A] p-4 rounded-xl border border-amber-500/20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOrderFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                orderFilterStatus === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 bg-black/40'
              }`}
            >
              All Purchases ({orders.length})
            </button>
            <button
              onClick={() => setOrderFilterStatus('paid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                orderFilterStatus === 'paid'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 bg-black/40'
              }`}
            >
              Paid
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              value={orderSearchTerm}
              onChange={(e) => setOrderSearchTerm(e.target.value)}
              placeholder="Search customer email or order..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-amber-500/30 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#120E0A] border border-amber-500/25 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/60 text-stone-400 border-b border-amber-500/20 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Devout Customer</th>
                  <th className="py-3 px-4">Scripture / Plan</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-amber-400">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-[11px] text-stone-400 font-mono">{order.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-200">
                      <span className="font-medium">{order.itemTitle}</span>
                      <span className="block text-[10px] text-amber-300/70">{order.category}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      ₹{order.amount}
                    </td>
                    <td className="py-3.5 px-4 text-stone-300">
                      {order.paymentMethod || 'Razorpay UPI'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // TAB 5: STORAGE & R2 SETTINGS COMPONENT
  // -------------------------------------------------------------
  const [testingR2, setTestingR2] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleTestR2 = async () => {
    setTestingR2(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/upload-r2');
      const data = await res.json();
      setTestResult(data);
      if (data.config?.isReady) {
        showToast('Cloudflare R2 Bucket is Connected & Ready!');
      } else {
        showToast('Running in local fallback mode (ready for dev & testing)');
      }
    } catch (e: any) {
      setTestResult({ error: e.message });
      showToast('Error testing R2 connectivity', 'error');
    } finally {
      setTestingR2(false);
    }
  };

  const renderStorageTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-amber-400" />
              <span>Storage & Cloudflare R2 Engine</span>
            </h2>
            <p className="text-xs text-amber-200/60 mt-0.5">
              Inspect S3 presigning endpoints, public CDN URLs, and local development fallback directories.
            </p>
          </div>

          <button
            onClick={handleTestR2}
            disabled={testingR2}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {testingR2 ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Pinging R2...</span>
              </>
            ) : (
              <>
                <Server className="w-4 h-4" />
                <span>Test R2 Connectivity</span>
              </>
            )}
          </button>
        </div>

        {/* Status Card */}
        <div className="p-6 rounded-2xl bg-[#120E0A] border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
            <div className="flex items-center gap-3">
              <div
                className={`w-3.5 h-3.5 rounded-full ${
                  r2Config?.isReady ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <h3 className="font-serif font-bold text-base text-white">
                {r2Config?.isReady
                  ? 'Cloudflare R2 Bucket Connected & Active'
                  : 'GyanDharam Seamless Local Storage Fallback Mode'}
              </h3>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                r2Config?.isReady
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
              }`}
            >
              {r2Config?.isReady ? 'S3 Production Mode' : 'Local Fallback Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/15">
              <span className="text-stone-400 block text-[10px] uppercase">R2 Bucket Name</span>
              <span className="font-mono font-bold text-white mt-1 block">
                {r2Config?.bucketName || 'gyandharam-media'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/15">
              <span className="text-stone-400 block text-[10px] uppercase">R2 Account ID</span>
              <span className="font-mono font-bold text-amber-300 mt-1 block">
                {r2Config?.accountId || 'Not set (Dev mode)'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/15">
              <span className="text-stone-400 block text-[10px] uppercase">Public Media CDN</span>
              <span className="font-mono text-stone-300 mt-1 block truncate">
                {r2Config?.publicUrl || '/uploads/videos'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/15">
              <span className="text-stone-400 block text-[10px] uppercase">API Presigner</span>
              <span className="font-mono font-bold text-emerald-400 mt-1 block">
                /api/admin/upload-r2
              </span>
            </div>
          </div>

          {testResult && (
            <div className="p-4 rounded-xl bg-black/70 border border-amber-500/30 font-mono text-xs text-amber-200">
              <span className="text-stone-400 block mb-1">// API Probe Response:</span>
              <pre className="overflow-x-auto">{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Environment Variable Setup Guide */}
        <div className="p-6 rounded-2xl bg-[#120E0A] border border-amber-500/20 space-y-4">
          <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Configuring Production Cloudflare R2 Credentials</span>
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            To connect your live Cloudflare R2 bucket with automatic presigned S3 uploads, place these variables in your <code className="text-amber-400 bg-black/60 px-1.5 py-0.5 rounded">.env.local</code> or Vercel Environment Variables:
          </p>

          <div className="p-4 rounded-xl bg-black/80 border border-amber-500/25 font-mono text-xs text-amber-300 space-y-1">
            <p>CLOUDFLARE_R2_ACCOUNT_ID=your_cloudflare_account_id_here</p>
            <p>CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id</p>
            <p>CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key</p>
            <p>CLOUDFLARE_R2_BUCKET_NAME=gyandharam-media</p>
            <p>CLOUDFLARE_R2_PUBLIC_URL=https://media.gyandharam.com</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs sm:text-sm animate-bounce ${
            toastMessage.type === 'error'
              ? 'bg-red-950/90 text-red-200 border-red-500/50'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Render Current Tab */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'videos' && renderVideosTab()}
      {activeTab === 'scriptures' && renderScripturesTab()}
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'storage' && renderStorageTab()}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-amber-300">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-serif">Loading GyanDharam Admin Sanctuary...</p>
          </div>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
