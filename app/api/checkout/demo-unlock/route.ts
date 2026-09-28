import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Book, Order, User } from '@/models';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    let user = await getCurrentUser(req);
    if (!user) {
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

    const demoOrderId = `demo_ord_${Date.now()}`;
    const demoPayId = `demo_pay_${Date.now()}`;

    await Order.create({
      userId: user._id,
      bookId: book._id,
      amount: book.price,
      currency: 'INR',
      razorpayOrderId: demoOrderId,
      razorpayPaymentId: demoPayId,
      status: 'paid',
      receipt: `demo_${book.slug}`,
    });

    if (!user.purchasedBooks.includes(book._id)) {
      user.purchasedBooks.push(book._id);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: `🎉 Successfully unlocked full lifetime digital access to "${book.title}"!`,
      bookId: book._id,
      orderId: demoOrderId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
