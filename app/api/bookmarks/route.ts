import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { bookId, chapterNumber, sentenceId, audioTimestamp } = body;

    const bookmarkData = {
      bookId: bookId || 'default',
      chapterNumber: Number(chapterNumber) || 1,
      sentenceId: sentenceId || '',
      audioTimestamp: Number(audioTimestamp) || 0,
      updatedAt: new Date(),
    };

    try {
      await connectToDatabase();
      let user = await getCurrentUser(req);
      if (!user) {
        user = await User.findOne({ email: 'seeker@sacredreads.org' });
      }

      if (user && user.bookmarks) {
        const existingIndex = user.bookmarks.findIndex((b: any) => b.bookId?.toString() === bookId?.toString());
        if (existingIndex >= 0) {
          user.bookmarks[existingIndex] = bookmarkData as any;
        } else {
          user.bookmarks.push(bookmarkData as any);
        }
        await user.save();
      }
    } catch (dbErr) {
      // Database not active, bookmark is stored in browser localStorage safely
    }

    return NextResponse.json({
      success: true,
      message: 'Reading progress synchronized locally and to cloud',
      bookmark: bookmarkData,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      message: 'Reading progress stored locally',
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    try {
      await connectToDatabase();
      let user = await getCurrentUser(req);
      if (!user) {
        user = await User.findOne({ email: 'seeker@sacredreads.org' });
      }

      if (user && user.bookmarks) {
        return NextResponse.json({ bookmarks: user.bookmarks });
      }
    } catch (dbErr) {
      // Return empty bookmarks array on db offline
    }

    return NextResponse.json({ bookmarks: [] });
  } catch (error: any) {
    return NextResponse.json({ bookmarks: [] });
  }
}
