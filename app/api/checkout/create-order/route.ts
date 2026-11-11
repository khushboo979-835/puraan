import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Book, Order, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';
import { SEED_BOOKS } from '@/lib/seedData';

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_sacredreads123';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'sacredreads_secret_key_mock_456';

export async function POST(req: NextRequest) {
  try {
    try {
      await connectToDatabase();
    } catch (e) {}

    const { bookId, amount: customAmount } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
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

    const price = customAmount || book?.price || 49;
    const amountInPaise = Math.round(price * 100);
    const receipt = `rcpt_${Date.now()}_${(book?.slug || 'grantha').slice(0, 10)}`;

    let user: any = null;
    try {
      user = await getCurrentUser(req);
      if (!user) {
        user = await User.findOne({ email: 'seeker@gyandharam.com' });
      }
    } catch (e) {}

    let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('test_sacredreads')) {
        const instance = new Razorpay({
          key_id: key_id,
          key_secret: key_secret,
        });

        const rzpOrder = await instance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt,
          notes: {
            bookTitle: book?.title || 'Universal Granth Access',
            userId: user?._id?.toString() || 'anonymous',
            userEmail: user?.email || 'seeker@gyandharam.com',
          },
        });
        razorpayOrderId = rzpOrder.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay live order creation fallback to simulated mode:', rzpErr);
    }

    if (user && book) {
      try {
        await Order.create({
          userId: user._id,
          bookId: book._id,
          amount: price,
          currency: 'INR',
          razorpayOrderId,
          status: 'created',
          receipt,
        });
      } catch (e) {}
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: key_id,
      book: {
        id: book?._id || bookId,
        title: book?.title || 'Universal Granth',
        price: price,
        coverImageUrl: book?.coverImageUrl,
      },
      user: {
        name: user?.name || 'Devout Seeker',
        email: user?.email || 'seeker@gyandharam.com',
      },
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
