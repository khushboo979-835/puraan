import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models';

export async function GET(req: NextRequest) {
  try {
    try {
      await connectToDatabase();
      const user = await getCurrentUser(req);
      if (user) {
        return NextResponse.json({
          authenticated: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            purchasedBooks: user.purchasedBooks,
            bookmarks: user.bookmarks,
          },
        });
      }
    } catch (dbErr) {
      console.warn('Auth DB check notice (falling back to guest session):', dbErr);
    }

    // Default guest session fallback
    return NextResponse.json({
      authenticated: false,
      user: {
        id: 'guest_seeker',
        name: 'Devout Seeker',
        email: 'seeker@sacredreads.org',
        role: 'user',
        purchasedBooks: [],
        bookmarks: [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      authenticated: false,
      user: {
        id: 'guest_seeker',
        name: 'Devout Seeker',
        email: 'seeker@sacredreads.org',
        role: 'user',
        purchasedBooks: [],
        bookmarks: [],
      },
    });
  }
}

export async function POST(req: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('sacred_auth_token');
  return response;
}
