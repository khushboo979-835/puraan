import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '@/lib/db';
import { Order, IOrder, User } from '@/models';

const ORDERS_FILE = path.join(process.cwd(), 'public', 'uploads', 'orders.json');

export interface SeedOrderRecord {
  id: string;
  userEmail: string;
  customerName: string;
  scriptureSlug: string;
  itemTitle?: string;
  amount: number;
  currency: string;
  utrNumber: string;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
}

const DEFAULT_ORDERS: SeedOrderRecord[] = [
  {
    id: 'ord_upi_884901',
    userEmail: 'aarav.sharma@gmail.com',
    customerName: 'Aarav Sharma',
    scriptureSlug: 'bhagavad-gita',
    itemTitle: 'Shrimad Bhagavad Gita (Complete 18 Chapters)',
    amount: 49,
    currency: 'INR',
    utrNumber: '431892019482',
    paymentMethod: 'PhonePe UPI QR (Ujjwal Kumar)',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'ord_upi_884902',
    userEmail: 'priya.mehra@outlook.com',
    customerName: 'Priya Mehra',
    scriptureSlug: 'durga-saptashati',
    itemTitle: 'Shri Durga Saptashati (Chandi Path Sampurna Edition)',
    amount: 49,
    currency: 'INR',
    utrNumber: '431872619420',
    paymentMethod: 'PhonePe UPI QR (Ujjwal Kumar)',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'ord_upi_884903',
    userEmail: 'gurpreet.singh@sikhheritage.org',
    customerName: 'Gurpreet Singh',
    scriptureSlug: 'guru-granth-sahib',
    itemTitle: 'Universal All-Traditions Sacred Pass (Annual Access)',
    amount: 499,
    currency: 'INR',
    utrNumber: '431852018834',
    paymentMethod: 'PhonePe UPI QR (Ujjwal Kumar)',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
  {
    id: 'ord_upi_884904',
    userEmail: 'mohammed.tariq@yahoo.com',
    customerName: 'Mohammed Tariq',
    scriptureSlug: 'the-holy-quran',
    itemTitle: 'The Holy Quran (Surah Al-Baqarah & Complete 114 Surahs)',
    amount: 49,
    currency: 'INR',
    utrNumber: '431841927911',
    paymentMethod: 'PhonePe UPI QR (Ujjwal Kumar)',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
  },
  {
    id: 'ord_upi_884905',
    userEmail: 'sunita.mishra108@gmail.com',
    customerName: 'Sunita Mishra',
    scriptureSlug: 'all-access',
    itemTitle: 'Universal All-Traditions Sacred Pass (Annual Access)',
    amount: 499,
    currency: 'INR',
    utrNumber: '431821016430',
    paymentMethod: 'PhonePe UPI QR (Ujjwal Kumar)',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
  },
];

let memoryOrders: SeedOrderRecord[] | null = null;

function loadOrdersFromDisk(): SeedOrderRecord[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Orders disk read fallback', e);
  }
  const initial = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
  saveOrdersToDisk(initial);
  return initial;
}

function saveOrdersToDisk(orders: SeedOrderRecord[]) {
  try {
    const dir = path.dirname(ORDERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Orders disk save error', e);
  }
}

function getCache(): SeedOrderRecord[] {
  if (!memoryOrders) {
    memoryOrders = loadOrdersFromDisk();
  }
  return memoryOrders;
}

// ─────────────────────────────────────────────────────────────
// 1. CREATE ORDER (With 12-digit UPI UTR Number)
// ─────────────────────────────────────────────────────────────
export async function createUpiOrder(data: {
  userEmail: string;
  customerName?: string;
  scriptureSlug: string;
  itemTitle?: string;
  amount: number;
  utrNumber: string;
  paymentMethod?: string;
}) {
  const {
    userEmail,
    customerName = 'Devout Seeker',
    scriptureSlug,
    itemTitle = scriptureSlug,
    amount = 49,
    utrNumber,
    paymentMethod = 'PhonePe UPI QR (Ujjwal Kumar)',
  } = data;

  const orderId = `ord_upi_${Date.now()}`;
  const newOrder: SeedOrderRecord = {
    id: orderId,
    userEmail: userEmail.toLowerCase().trim(),
    customerName,
    scriptureSlug,
    itemTitle,
    amount: Number(amount),
    currency: 'INR',
    utrNumber: utrNumber.trim(),
    paymentMethod,
    status: 'approved', // Instant unlock upon 12-digit UTR submission
    createdAt: new Date().toISOString(),
  };

  // 1. Try DB save
  try {
    await connectToDatabase();
    await Order.create({
      userEmail: newOrder.userEmail,
      customerName: newOrder.customerName,
      scriptureSlug: newOrder.scriptureSlug,
      amount: newOrder.amount,
      currency: newOrder.currency,
      utrNumber: newOrder.utrNumber,
      paymentMethod: newOrder.paymentMethod,
      status: 'approved',
      razorpayOrderId: orderId,
    });
  } catch (e) {
    console.warn('DB offline during order creation, saved to local JSON fallback');
  }

  // 2. Save in memory & disk
  const cache = getCache();
  cache.unshift(newOrder);
  saveOrdersToDisk(cache);

  return newOrder;
}

// ─────────────────────────────────────────────────────────────
// 2. GET ALL ORDERS (With status / email filters)
// ─────────────────────────────────────────────────────────────
export async function getUpiOrders(options?: {
  userEmail?: string;
  status?: string;
  limit?: number;
}) {
  const { userEmail, status, limit = 100 } = options || {};

  try {
    await connectToDatabase();
    const query: any = {};
    if (userEmail) query.userEmail = userEmail.toLowerCase().trim();
    if (status && status !== 'all') query.status = status;

    const dbOrders = await Order.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    if (dbOrders.length > 0) {
      return dbOrders.map((o: any) => ({
        id: o.razorpayOrderId || o._id.toString(),
        userEmail: o.userEmail,
        customerName: o.customerName || 'Devout Seeker',
        scriptureSlug: o.scriptureSlug,
        itemTitle: o.scriptureSlug,
        amount: o.amount || 49,
        currency: o.currency || 'INR',
        utrNumber: o.utrNumber || 'N/A',
        paymentMethod: o.paymentMethod || 'PhonePe UPI QR',
        status: o.status || 'approved',
        createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
      }));
    }
  } catch (e) {}

  let list = [...getCache()];
  if (userEmail) {
    list = list.filter((o) => o.userEmail.toLowerCase() === userEmail.toLowerCase());
  }
  if (status && status !== 'all') {
    list = list.filter((o) => o.status.toLowerCase() === status.toLowerCase());
  }

  return list.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────
// 3. UPDATE ORDER STATUS (Approve / Reject)
// ─────────────────────────────────────────────────────────────
export async function updateUpiOrderStatus(orderIdOrUtr: string, status: 'approved' | 'rejected' | 'pending') {
  try {
    await connectToDatabase();
    await Order.findOneAndUpdate(
      { $or: [{ razorpayOrderId: orderIdOrUtr }, { utrNumber: orderIdOrUtr }, { _id: orderIdOrUtr }] },
      { $set: { status } }
    );
  } catch (e) {}

  const cache = getCache();
  const idx = cache.findIndex((o) => o.id === orderIdOrUtr || o.utrNumber === orderIdOrUtr);
  if (idx !== -1) {
    cache[idx].status = status;
    saveOrdersToDisk(cache);
    return cache[idx];
  }

  return null;
}
