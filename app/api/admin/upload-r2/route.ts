import { NextRequest, NextResponse } from 'next/server';
import { isR2Configured, getR2Config, createPresignedUploadUrl } from '@/lib/r2';

export async function GET() {
  try {
    const config = getR2Config();
    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching R2 status' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { fileName, fileType = 'video/mp4', category = 'status-videos' } = body;

    const safeName = (fileName || `media-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9_.-]/g, '-')
      .replace(/-+/g, '-');

    const key = `${category}/${Date.now()}-${safeName}`;

    // Check if Cloudflare R2 is configured
    if (!isR2Configured()) {
      return NextResponse.json({
        success: true,
        mode: 'local',
        message: 'R2 credentials not set in environment. Using GyanDharam Local Storage fallback.',
        fallbackUploadUrl: '/api/admin/upload-local',
        key,
      });
    }

    // Generate S3/R2 presigned URL
    const presigned = await createPresignedUploadUrl(key, fileType);
    if (!presigned) {
      return NextResponse.json({
        success: true,
        mode: 'local',
        message: 'Presigning unavailable, defaulting to local storage fallback.',
        fallbackUploadUrl: '/api/admin/upload-local',
        key,
      });
    }

    return NextResponse.json({
      success: true,
      mode: 'r2',
      uploadUrl: presigned.uploadUrl,
      publicUrl: presigned.publicUrl,
      key,
    });
  } catch (error: any) {
    console.error('R2 upload endpoint error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize upload' }, { status: 500 });
  }
}
