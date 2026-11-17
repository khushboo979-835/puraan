import { NextRequest, NextResponse } from 'next/server';
import {
  getAllStatusVideos,
  createStatusVideo,
  updateStatusVideo,
  deleteStatusVideo,
} from '@/lib/statusVideoService';

export const dynamic = 'force-dynamic';

// GET: Retrieve status videos for Admin (all, or filtered by faith/search)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const faith = searchParams.get('faith') || undefined;
    const search = searchParams.get('search') || undefined;
    const activeOnly = searchParams.get('active') === 'true';

    const videos = await getAllStatusVideos({
      faith,
      search,
      activeOnly,
      limit: 100,
    });

    return NextResponse.json({
      success: true,
      videos,
      total: videos.length,
    });
  } catch (error: any) {
    console.error('Admin fetch status videos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create / Publish New Status Video
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, faith, moodTag, videoUrl, thumbnailUrl, fileSize, duration } = body;

    if (!title || !faith || !videoUrl) {
      return NextResponse.json(
        { error: 'Title, Faith category, and Video URL are required' },
        { status: 400 }
      );
    }

    const created = await createStatusVideo({
      title,
      faith,
      moodTag,
      videoUrl,
      thumbnailUrl,
      fileSize,
      duration,
    });

    return NextResponse.json({
      success: true,
      message: 'Status video created and live on website!',
      video: created,
    });
  } catch (error: any) {
    console.error('Admin create status video error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update / Modify Status Video (Title, Faith, Mood, URLs, Active status)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, slug, title, faith, moodTag, videoUrl, thumbnailUrl, isActive, downloadsCount } = body;

    const target = id || slug;
    if (!target) {
      return NextResponse.json({ error: 'Video ID or slug is required for update' }, { status: 400 });
    }

    const updates: any = {};
    if (typeof title === 'string') updates.title = title.trim();
    if (faith) updates.faith = faith;
    if (typeof moodTag === 'string') updates.moodTag = moodTag.trim();
    if (typeof videoUrl === 'string') updates.videoUrl = videoUrl.trim();
    if (typeof thumbnailUrl === 'string') updates.thumbnailUrl = thumbnailUrl.trim();
    if (typeof isActive === 'boolean') updates.isActive = isActive;
    if (typeof downloadsCount === 'number') updates.downloadsCount = downloadsCount;

    const updated = await updateStatusVideo(target, updates);

    return NextResponse.json({
      success: true,
      message: 'Status video updated and synchronized successfully!',
      video: updated,
    });
  } catch (error: any) {
    console.error('Admin update status video error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete Status Video Permanently
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    const target = id || slug;
    if (!target) {
      return NextResponse.json({ error: 'Video ID or slug is required for deletion' }, { status: 400 });
    }

    await deleteStatusVideo(target);

    return NextResponse.json({
      success: true,
      message: 'Status video deleted permanently from system and website!',
    });
  } catch (error: any) {
    console.error('Admin delete status video error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
