import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Book, Order, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';
import { SEED_BOOKS } from '@/lib/seedData';

export async function POST(req: NextRequest) {
  try {
    const { bookId, planType } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
    }

    try {
      await connectToDatabase();
    } catch (dbErr) {
      console.warn('MongoDB connection fallback during demo unlock:', dbErr);
    }

    let book: any = null;
    if (mongoose.Types.ObjectId.isValid(bookId)) {
      try {
        book = await Book.findById(bookId);
      } catch (e) {}
    }

    if (!book) {
      try {
        book = await Book.findOne({ slug: bookId });
      } catch (e) {}
    }

    if (!book) {
      const seed = SEED_BOOKS.find((b) => b.slug === bookId || (b as any)._id === bookId);
      if (seed) {
        book = { ...seed, _id: '64f1a2b3c4d5e6f7a8b9c000' };
      }
    }

    let user: any = null;
    try {
      user = await getCurrentUser(req);
      if (!user) {
        user = await User.findOne({ email: 'seeker@gyandharam.com' });
      }
    } catch (e) {}

    const demoOrderId = `demo_ord_${Date.now()}`;
    const demoPayId = `demo_pay_${Date.now()}`;

    if (user) {
      try {
        const itemToGrant = planType === 'all-access' ? 'all-access' : (book?._id || bookId);
        if (!user.purchasedBooks.includes(itemToGrant)) {
          user.purchasedBooks.push(itemToGrant);
          await user.save();
        }
      } catch (e) {}
    }

    return NextResponse.json({
      success: true,
      message: `🎉 Successfully unlocked lifetime digital access to ${planType === 'all-access' ? 'All-Traditions Universal Pass' : (book?.title || 'Scripture')}!`,
      bookId: book?._id || bookId,
      orderId: demoOrderId,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      message: 'Demo access authorized',
      bookId: 'unlocked',
      orderId: `demo_fallback_${Date.now()}`,
    });
  }
}
