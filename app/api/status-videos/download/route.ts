import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { StatusVideo } from '@/models';
import { SEED_STATUS_VIDEOS } from '@/lib/seedStatusVideos';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, slug, type = 'download' } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: 'id or slug is required' }, { status: 400 });
    }

    const incField = type === 'view' ? { viewsCount: 1 } : { downloadsCount: 1 };

    let dbUpdated = null;
    try {
      await connectToDatabase();
      const query = id ? { _id: id } : { slug };
      dbUpdated = await StatusVideo.findOneAndUpdate(query, { $inc: incField }, { new: true });
    } catch (e) {
      console.warn('DB offline during status video counter increment');
    }

    // In-memory fallback
    const seedItem = SEED_STATUS_VIDEOS.find((v) => v.id === id || v.slug === slug);
    if (seedItem) {
      if (type === 'view') {
        seedItem.viewsCount = (seedItem.viewsCount || 0) + 1;
      } else {
        seedItem.downloadsCount = (seedItem.downloadsCount || 0) + 1;
      }
    }

    return NextResponse.json({
      success: true,
      downloadsCount: dbUpdated?.downloadsCount || seedItem?.downloadsCount || 1,
      viewsCount: dbUpdated?.viewsCount || seedItem?.viewsCount || 1,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
