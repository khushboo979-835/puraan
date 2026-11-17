import { NextRequest, NextResponse } from 'next/server';
import { incrementStatusVideoCounter } from '@/lib/statusVideoService';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, slug, type = 'download' } = body;

    const target = id || slug;
    if (!target) {
      return NextResponse.json({ error: 'id or slug is required' }, { status: 400 });
    }

    const result = await incrementStatusVideoCounter(target, type);

    return NextResponse.json({
      success: true,
      downloadsCount: result.downloadsCount,
      viewsCount: result.viewsCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
