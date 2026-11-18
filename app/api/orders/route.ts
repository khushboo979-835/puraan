import { NextRequest, NextResponse } from 'next/server';
import { createUpiOrder, getUpiOrders, updateUpiOrderStatus } from '@/lib/orderService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email') || undefined;
    const status = searchParams.get('status') || undefined;

    const orders = await getUpiOrders({ userEmail, status });
    return NextResponse.json({
      success: true,
      orders,
      total: orders.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userEmail,
      customerName,
      scriptureSlug,
      itemTitle,
      amount = 49,
      utrNumber,
      paymentMethod = 'PhonePe UPI QR (Ujjwal Kumar)',
    } = body;

    if (!userEmail) {
      return NextResponse.json({ error: 'Valid user email is required' }, { status: 400 });
    }

    if (!scriptureSlug) {
      return NextResponse.json({ error: 'Scripture slug is required' }, { status: 400 });
    }

    // Strict 12-Digit Numeric UTR validation
    const cleanUtr = (utrNumber || '').toString().trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      return NextResponse.json(
        { error: 'Invalid UPI Transaction ID. Please enter the exact 12-digit numeric UTR from your PhonePe/GPay receipt.' },
        { status: 400 }
      );
    }

    const order = await createUpiOrder({
      userEmail,
      customerName,
      scriptureSlug,
      itemTitle,
      amount: Number(amount),
      utrNumber: cleanUtr,
      paymentMethod,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment received! Granth unlocked successfully for your account.',
      order,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, utrNumber, status } = body;

    const target = orderId || utrNumber;
    if (!target || !status) {
      return NextResponse.json({ error: 'Order reference and status are required' }, { status: 400 });
    }

    const updated = await updateUpiOrderStatus(target, status);
    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
