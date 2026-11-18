import { NextRequest, NextResponse } from 'next/server';
import { getUpiOrders, updateUpiOrderStatus } from '@/lib/orderService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const orders = await getUpiOrders();

    let filtered = [...orders];

    if (status && status !== 'all') {
      filtered = filtered.filter(
        (o) =>
          o.status.toLowerCase() === status.toLowerCase() ||
          (status === 'paid' && o.status === 'approved')
      );
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          (o.customerName && o.customerName.toLowerCase().includes(s)) ||
          (o.userEmail && o.userEmail.toLowerCase().includes(s)) ||
          (o.itemTitle && o.itemTitle.toLowerCase().includes(s)) ||
          (o.utrNumber && o.utrNumber.toLowerCase().includes(s)) ||
          (o.id && o.id.toLowerCase().includes(s))
      );
    }

    const totalRevenue = orders.reduce(
      (acc, o) => acc + (o.status === 'approved' || o.status === 'paid' ? o.amount : 0),
      0
    );

    return NextResponse.json({
      success: true,
      orders: filtered,
      stats: {
        totalOrders: orders.length,
        totalRevenue,
        paidOrders: orders.filter((o) => o.status === 'approved' || o.status === 'paid').length,
        pendingOrders: orders.filter((o) => o.status === 'pending').length,
      },
    });
  } catch (error: any) {
    console.error('Fetch admin orders error:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching orders' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'orderId and status are required' },
        { status: 400 }
      );
    }

    const updated = await updateUpiOrderStatus(orderId, status);
    if (!updated) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error updating order' },
      { status: 500 }
    );
  }
}
