import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '@/lib/db';
import { StatusVideo, IStatusVideo, StatusFaithType } from '@/models';
import { SEED_STATUS_VIDEOS, SeedStatusVideo } from '@/lib/seedStatusVideos';

const STORAGE_FILE = path.join(process.cwd(), 'public', 'uploads', 'status-videos.json');

// In-memory master cache shared across requests
let memoryCache: SeedStatusVideo[] | null = null;

// Helper to load persisted JSON from disk
function loadFromDisk(): SeedStatusVideo[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading status videos from disk storage:', e);
  }
  // Initialize with seed videos
  const initial = JSON.parse(JSON.stringify(SEED_STATUS_VIDEOS));
  saveToDisk(initial);
  return initial;
}

// Helper to save current cache to disk
function saveToDisk(videos: SeedStatusVideo[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(videos, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Error writing status videos to disk storage:', e);
  }
}

// Ensure in-memory cache is populated
function getCache(): SeedStatusVideo[] {
  if (!memoryCache) {
    memoryCache = loadFromDisk();
  }
  return memoryCache;
}

// Sync seed items to MongoDB if collection is empty
export async function ensureStatusVideosSeeded() {
  try {
    await connectToDatabase();
    const count = await StatusVideo.countDocuments();
    if (count === 0) {
      console.log('🔄 Seeding initial status videos into MongoDB collection...');
      for (const item of SEED_STATUS_VIDEOS) {
        await StatusVideo.create({
          title: item.title,
          slug: item.slug,
          faith: item.faith,
          moodTag: item.moodTag,
          videoUrl: item.videoUrl,
          thumbnailUrl: item.thumbnailUrl,
          fileSize: item.fileSize,
          duration: item.duration,
          downloadsCount: item.downloadsCount,
          viewsCount: item.viewsCount,
          likesCount: item.likesCount,
          isActive: item.isActive,
        });
      }
    }
  } catch (e) {
    // Non-fatal, resilient mode
  }
}

// ─────────────────────────────────────────────────────────────
// 1. READ (Get all status videos with filters)
// ─────────────────────────────────────────────────────────────
export async function getAllStatusVideos(options?: {
  faith?: string;
  search?: string;
  activeOnly?: boolean;
  limit?: number;
}) {
  const { faith, search, activeOnly = false, limit = 50 } = options || {};

  let dbVideos: any[] = [];
  let dbConnected = false;

  try {
    await ensureStatusVideosSeeded();
    dbConnected = true;

    const query: any = {};
    if (activeOnly) {
      query.isActive = true;
    }
    if (faith && faith !== 'all' && faith !== 'All') {
      query.faith = new RegExp(`^${faith}$`, 'i');
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { moodTag: { $regex: search, $options: 'i' } },
      ];
    }

    dbVideos = await StatusVideo.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    if (dbVideos.length > 0) {
      return dbVideos.map((doc: any) => ({
        id: doc._id.toString(),
        _id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        faith: doc.faith,
        moodTag: doc.moodTag,
        videoUrl: doc.videoUrl,
        thumbnailUrl: doc.thumbnailUrl,
        fileSize: doc.fileSize,
        duration: doc.duration,
        downloadsCount: doc.downloadsCount,
        viewsCount: doc.viewsCount,
        likesCount: doc.likesCount,
        isActive: doc.isActive,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      }));
    }
  } catch (e) {
    // Fall back to disk / memory store
  }

  // Resilient Fallback to unified cache/disk
  let list = [...getCache()];

  if (activeOnly) {
    list = list.filter((v) => v.isActive);
  }
  if (faith && faith !== 'all' && faith !== 'All') {
    list = list.filter((v) => v.faith.toLowerCase() === faith.toLowerCase());
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(
      (v) => v.title.toLowerCase().includes(s) || v.moodTag.toLowerCase().includes(s)
    );
  }

  return list.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────
// 2. CREATE (Post new status video)
// ─────────────────────────────────────────────────────────────
export async function createStatusVideo(input: {
  title: string;
  faith: StatusFaithType;
  moodTag?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  fileSize?: number;
  duration?: number;
}) {
  const { title, faith, moodTag = 'Devotional', videoUrl, thumbnailUrl, fileSize, duration } = input;

  const cleanSlug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString(36)}`;

  const newVideo: SeedStatusVideo = {
    id: `vid-${Date.now()}`,
    title,
    slug: cleanSlug,
    faith,
    moodTag,
    videoUrl,
    thumbnailUrl:
      thumbnailUrl ||
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    fileSize: Number(fileSize) || 4800000,
    duration: Number(duration) || 30,
    downloadsCount: 0,
    viewsCount: 1,
    likesCount: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  // 1. Try DB insert
  try {
    await connectToDatabase();
    const doc = await StatusVideo.create(newVideo);
    newVideo.id = doc._id.toString();
  } catch (e) {
    console.warn('DB offline during status video creation, persisting to file storage');
  }

  // 2. Update memory & disk
  const cache = getCache();
  cache.unshift(newVideo);
  saveToDisk(cache);

  return newVideo;
}

// ─────────────────────────────────────────────────────────────
// 3. UPDATE / MODIFY (Edit existing status video)
// ─────────────────────────────────────────────────────────────
export async function updateStatusVideo(
  idOrSlug: string,
  updates: {
    title?: string;
    faith?: StatusFaithType;
    moodTag?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    isActive?: boolean;
    downloadsCount?: number;
  }
) {
  let updatedDoc: any = null;

  // 1. Try DB update
  try {
    await connectToDatabase();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { $or: [{ slug: idOrSlug }, { id: idOrSlug }] };

    updatedDoc = await StatusVideo.findOneAndUpdate(query, { $set: updates }, { new: true }).lean();
  } catch (e) {}

  // 2. Update memory & disk
  const cache = getCache();
  const idx = cache.findIndex((v) => v.id === idOrSlug || v.slug === idOrSlug);
  if (idx !== -1) {
    cache[idx] = {
      ...cache[idx],
      ...updates,
    };
    saveToDisk(cache);
    return cache[idx];
  }

  return updatedDoc;
}

// ─────────────────────────────────────────────────────────────
// 4. DELETE (Remove status video permanently)
// ─────────────────────────────────────────────────────────────
export async function deleteStatusVideo(idOrSlug: string) {
  // 1. Try DB delete
  try {
    await connectToDatabase();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { $or: [{ slug: idOrSlug }, { id: idOrSlug }] };
    await StatusVideo.findOneAndDelete(query);
  } catch (e) {}

  // 2. Remove from memory & disk
  const cache = getCache();
  const nextCache = cache.filter((v) => v.id !== idOrSlug && v.slug !== idOrSlug);
  memoryCache = nextCache;
  saveToDisk(nextCache);

  return { success: true };
}

// ─────────────────────────────────────────────────────────────
// 5. INCREMENT COUNTER (Downloads / Views)
// ─────────────────────────────────────────────────────────────
export async function incrementStatusVideoCounter(idOrSlug: string, type: 'download' | 'view' = 'download') {
  const incField = type === 'view' ? { viewsCount: 1 } : { downloadsCount: 1 };

  try {
    await connectToDatabase();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { $or: [{ slug: idOrSlug }, { id: idOrSlug }] };
    await StatusVideo.findOneAndUpdate(query, { $inc: incField });
  } catch (e) {}

  const cache = getCache();
  const item = cache.find((v) => v.id === idOrSlug || v.slug === idOrSlug);
  if (item) {
    if (type === 'view') {
      item.viewsCount = (item.viewsCount || 0) + 1;
    } else {
      item.downloadsCount = (item.downloadsCount || 0) + 1;
    }
    saveToDisk(cache);
    return { downloadsCount: item.downloadsCount, viewsCount: item.viewsCount };
  }

  return { downloadsCount: 1, viewsCount: 1 };
}
