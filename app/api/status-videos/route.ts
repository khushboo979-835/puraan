import { NextRequest, NextResponse } from 'next/server';
import { getAllStatusVideos } from '@/lib/statusVideoService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const faith = searchParams.get('faith') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = Number(searchParams.get('limit')) || 36;

    // Public website only fetches active videos
    const videos = await getAllStatusVideos({
      faith,
      search,
      activeOnly: true,
      limit,
    });

    return NextResponse.json({
      success: true,
      videos,
      total: videos.length,
    });
  } catch (error: any) {
    console.error('Public fetch status videos error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
