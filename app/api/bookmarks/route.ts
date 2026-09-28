import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { bookId, chapterNumber, sentenceId, audioTimestamp } = await req.json();

    if (!bookId || !chapterNumber) {
      return NextResponse.json({ error: 'Missing required bookmark fields' }, { status: 400 });
    }

    let user = await getCurrentUser(req);
    if (!user) {
      user = await User.findOne({ email: 'seeker@sacredreads.org' });
    }

    if (!user) {
      return NextResponse.json({ success: true, message: 'Bookmark stored locally (guest)' });
    }

    // Update existing bookmark or push new
    const existingIndex = user.bookmarks.findIndex((b: any) => b.bookId.toString() === bookId.toString());

    const bookmarkData = {
      bookId,
      chapterNumber: Number(chapterNumber),
      sentenceId: sentenceId || '',
      audioTimestamp: Number(audioTimestamp) || 0,
      updatedAt: new Date(),
    };

    if (existingIndex >= 0) {
      user.bookmarks[existingIndex] = bookmarkData as any;
    } else {
      user.bookmarks.push(bookmarkData as any);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Reading progress synchronized',
      bookmark: bookmarkData,
    });
  } catch (error: any) {
    console.error('Bookmark save error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    let user = await getCurrentUser(req);
    if (!user) {
      user = await User.findOne({ email: 'seeker@sacredreads.org' });
    }

    if (!user) {
      return NextResponse.json({ bookmarks: [] });
    }

    return NextResponse.json({ bookmarks: user.bookmarks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
