import { NextRequest, NextResponse } from 'next/server';
import { getAllBooks } from '@/lib/dataService';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const religion = searchParams.get('religion') || undefined;
    const language = searchParams.get('language') || undefined;
    const search = searchParams.get('search') || undefined;

    const books = await getAllBooks({ religion, language, search });
    return NextResponse.json({ success: true, count: books.length, books });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
