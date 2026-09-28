import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    let user = await getCurrentUser(req);

    // If no user found, return a default seeker session for instant interactive demo
    if (!user) {
      let defaultUser = await User.findOne({ email: 'seeker@sacredreads.org' }).populate('purchasedBooks');
      if (!defaultUser) {
        defaultUser = await User.create({
          name: 'Devout Seeker',
          email: 'seeker@sacredreads.org',
          purchasedBooks: [],
          bookmarks: [],
          role: 'user',
        });
      }
      return NextResponse.json({
        authenticated: false,
        user: {
          id: defaultUser._id,
          name: defaultUser.name,
          email: defaultUser.email,
          role: defaultUser.role,
          purchasedBooks: defaultUser.purchasedBooks,
          bookmarks: defaultUser.bookmarks,
        },
      });
    }

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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('sacred_auth_token');
  return response;
}
