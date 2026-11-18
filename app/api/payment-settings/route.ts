import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SETTINGS_FILE = path.join(process.cwd(), 'public', 'uploads', 'payment-settings.json');

const DEFAULT_SETTINGS = {
  merchantName: 'UJJWAL KUMAR',
  merchantUpiId: process.env.MERCHANT_UPI_ID || 'ujjwalkumar@phonepe',
  qrImageUrl: '/uploads/phonepe-qr.jpg',
  isCustomQrActive: true,
  singlePrice: 49,
  annualPassPrice: 499,
  upiAppsSupported: ['PhonePe', 'Google Pay', 'Paytm', 'BHIM', 'CRED'],
};

function getSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: any) {
  try {
    const dir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) {}
}

export async function GET() {
  return NextResponse.json({
    success: true,
    settings: getSettings(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getSettings();
    const updated = {
      ...current,
      ...body,
    };
    saveSettings(updated);
    return NextResponse.json({
      success: true,
      message: 'Payment settings updated successfully',
      settings: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
