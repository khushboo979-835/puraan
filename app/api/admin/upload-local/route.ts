import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // Case 1: JSON payload (useful for HTML5 canvas base64 thumbnails)
    if (contentType.includes('application/json')) {
      const { base64Data, fileName = `thumb-${Date.now()}.jpg`, category = 'videos' } = await req.json();
      if (!base64Data) {
        return NextResponse.json({ error: 'base64Data is required' }, { status: 400 });
      }

      const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Clean, 'base64');

      const safeName = `${Date.now()}-${fileName.toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${category}/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName: safeName,
        size: buffer.length,
      });
    }

    // Case 2: Multipart Form Data (file upload for MP4 or images)
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'videos';

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${category}/${safeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: safeName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('Local upload error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
