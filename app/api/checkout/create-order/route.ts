import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDatabase } from '@/lib/db';
import { Book, Order, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_sacredreads123';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'sacredreads_secret_key_mock_456';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    let user = await getCurrentUser(req);
    if (!user) {
      // Find or create seeker demo user
      user = await User.findOne({ email: 'seeker@sacredreads.org' });
      if (!user) {
        user = await User.create({
          name: 'Devout Seeker',
          email: 'seeker@sacredreads.org',
          purchasedBooks: [],
          bookmarks: [],
        });
      }
    }

    const amountInPaise = Math.round(book.price * 100);
    const receipt = `rcpt_${Date.now()}_${book.slug.slice(0, 10)}`;

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
            bookTitle: book.title,
            userId: user._id.toString(),
            userEmail: user.email,
          },
        });
        razorpayOrderId = rzpOrder.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay live order creation fallback to simulated mode:', rzpErr);
    }

    const order = await Order.create({
      userId: user._id,
      bookId: book._id,
      amount: book.price,
      currency: 'INR',
      razorpayOrderId,
      status: 'created',
      receipt,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: key_id,
      book: {
        id: book._id,
        title: book.title,
        price: book.price,
        coverImageUrl: book.coverImageUrl,
      },
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
