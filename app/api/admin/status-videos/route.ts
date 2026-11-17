import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { StatusVideo } from '@/models';
import { SEED_STATUS_VIDEOS } from '@/lib/seedStatusVideos';

let inMemoryVideos = [...SEED_STATUS_VIDEOS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const faith = searchParams.get('faith');
    const search = searchParams.get('search');
    const activeOnly = searchParams.get('active') === 'true';

    let dbVideos: any[] = [];
    let dbConnected = false;

    try {
      await connectToDatabase();
      dbConnected = true;

      const query: any = {};
      if (faith && faith !== 'all') {
        query.faith = new RegExp(`^${faith}$`, 'i');
      }
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (activeOnly) {
        query.isActive = true;
      }

      dbVideos = await StatusVideo.find(query).sort({ createdAt: -1 }).lean();
    } catch (e) {
      console.warn('MongoDB query fallback for status videos');
    }

    if (!dbConnected || dbVideos.length === 0) {
      let filtered = [...inMemoryVideos];
      if (faith && faith !== 'all') {
        filtered = filtered.filter((v) => v.faith.toLowerCase() === faith.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((v) => v.title.toLowerCase().includes(s) || v.moodTag.toLowerCase().includes(s));
      }
      if (activeOnly) {
        filtered = filtered.filter((v) => v.isActive);
      }
      return NextResponse.json({ success: true, videos: filtered, source: 'seed' });
    }

    return NextResponse.json({ success: true, videos: dbVideos, source: 'database' });
  } catch (error: any) {
    console.error('Fetch status videos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, faith, moodTag, videoUrl, thumbnailUrl, fileSize, duration } = body;

    if (!title || !faith || !videoUrl) {
      return NextResponse.json({ error: 'Title, Faith category, and Video URL are required' }, { status: 400 });
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${Date.now().toString(36)}`;

    const newVideoData = {
      title,
      slug,
      faith,
      moodTag: moodTag || 'Devotional',
      videoUrl,
      thumbnailUrl:
        thumbnailUrl ||
        'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
      fileSize: Number(fileSize) || 4500000,
      duration: Number(duration) || 30,
      downloadsCount: 0,
      viewsCount: 0,
      likesCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    let createdDb = null;
    try {
      await connectToDatabase();
      createdDb = await StatusVideo.create(newVideoData);
    } catch (dbErr) {
      console.warn('DB write fallback for status video');
    }

    inMemoryVideos.unshift({
      id: `custom-${Date.now()}`,
      ...newVideoData,
    });

    return NextResponse.json({
      success: true,
      message: 'Status video successfully posted & live!',
      video: createdDb || inMemoryVideos[0],
    });
  } catch (error: any) {
    console.error('Post status video error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, slug, isActive, title, moodTag } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: 'Video ID or slug required' }, { status: 400 });
    }

    let updatedDb: any = null;
    try {
      await connectToDatabase();
      const query = id ? { _id: id } : { slug };
      const updates: any = {};
      if (typeof isActive === 'boolean') updates.isActive = isActive;
      if (title) updates.title = title;
      if (moodTag) updates.moodTag = moodTag;

      updatedDb = await StatusVideo.findOneAndUpdate(query, { $set: updates }, { new: true });
    } catch (e) {}

    // Update in-memory
    const idx = inMemoryVideos.findIndex((v) => v.id === id || v.slug === slug);
    if (idx !== -1) {
      if (typeof isActive === 'boolean') inMemoryVideos[idx].isActive = isActive;
      if (title) inMemoryVideos[idx].title = title;
      if (moodTag) inMemoryVideos[idx].moodTag = moodTag;
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      video: updatedDb || (idx !== -1 ? inMemoryVideos[idx] : null),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!id && !slug) {
      return NextResponse.json({ error: 'Video ID or slug required' }, { status: 400 });
    }

    try {
      await connectToDatabase();
      if (id) await StatusVideo.findByIdAndDelete(id);
      else if (slug) await StatusVideo.findOneAndDelete({ slug });
    } catch (e) {}

    inMemoryVideos = inMemoryVideos.filter((v) => v.id !== id && v.slug !== slug);

    return NextResponse.json({
      success: true,
      message: 'Status video removed successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
