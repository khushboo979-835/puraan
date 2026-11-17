import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { StatusVideo } from '@/models';
import { SEED_STATUS_VIDEOS } from '@/lib/seedStatusVideos';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const faith = searchParams.get('faith');
    const search = searchParams.get('search');
    const limit = Number(searchParams.get('limit')) || 24;

    let dbVideos: any[] = [];
    let dbConnected = false;

    try {
      await connectToDatabase();
      dbConnected = true;

      const query: any = { isActive: true };
      if (faith && faith !== 'all' && faith !== 'All') {
        query.faith = new RegExp(`^${faith}$`, 'i');
      }
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      dbVideos = await StatusVideo.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    } catch (e) {
      console.warn('MongoDB offline during status videos query, using seed fallback');
    }

    if (!dbConnected || dbVideos.length === 0) {
      let filtered = SEED_STATUS_VIDEOS.filter((v) => v.isActive);
      if (faith && faith !== 'all' && faith !== 'All') {
        filtered = filtered.filter((v) => v.faith.toLowerCase() === faith.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((v) => v.title.toLowerCase().includes(s) || v.moodTag.toLowerCase().includes(s));
      }
      return NextResponse.json({
        success: true,
        videos: filtered.slice(0, limit),
        total: filtered.length,
        source: 'seed',
      });
    }

    return NextResponse.json({
      success: true,
      videos: dbVideos,
      total: dbVideos.length,
      source: 'database',
    });
  } catch (error: any) {
    console.error('Public fetch status videos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
