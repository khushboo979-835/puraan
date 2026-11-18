'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Clock,
  Flame,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UpiScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    _id?: string;
    id?: string;
    slug?: string;
    title: string;
    price: number;
    coverImageUrl?: string;
    religion?: string;
  };
  initialPlanType?: 'single' | 'all-access';
  onSuccess?: (order?: any) => void;
}

export default function UpiScannerModal({
  isOpen,
  onClose,
  book,
  initialPlanType = 'single',
  onSuccess,
}: UpiScannerModalProps) {
  const { user, unlockBook, unlockAllAccess, refreshUser } = useAuth();

  const [planType, setPlanType] = useState<'single' | 'all-access'>(initialPlanType);
  const [utrNumber, setUtrNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState<any>(null);
  const [qrMode, setQrMode] = useState<'phonepe' | 'dynamic'>('phonepe');

  // Merchant details
  const merchantUpiId = 'ujjwalkumar@phonepe';
  const merchantName = 'UJJWAL KUMAR';
  const singlePrice = book.price || 49;
  const annualPrice = 499;
  const activeAmount = planType === 'single' ? singlePrice : annualPrice;

  const targetSlug = book.slug || book.id || 'bhagavad-gita';

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;

  // Dynamic UPI string
  const upiString = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(
    merchantName
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(
    `GyanDharam Unlock: ${planType === 'all-access' ? 'All Pass' : book.title}`
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleVerifyUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUtr = utrNumber.trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      setError('कृपया 12-अंकों का मान्य UPI Reference / UTR Number दर्ज करें (उदा. 431892019482)');
      return;
    }

    if (!userEmail.trim()) {
      setError('कृपया अपना मान्य ईमेल एड्रेस दर्ज करें');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: userEmail.trim(),
          customerName: user?.name || 'Devout Seeker',
          scriptureSlug: planType === 'all-access' ? 'all-access' : targetSlug,
          itemTitle: planType === 'all-access' ? 'Universal All-Traditions Sacred Pass' : book.title,
          amount: activeAmount,
          utrNumber: cleanUtr,
          paymentMethod: `PhonePe UPI QR (${merchantName})`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'भुगतान सत्यापन में समस्या आई, कृपया पुनः प्रयास करें।');
      }

      // Unlock locally in user session
      if (planType === 'all-access') {
        await unlockAllAccess();
      } else {
        await unlockBook(targetSlug);
      }

      // Store in persistent browser storage
      try {
        const stored = JSON.parse(localStorage.getItem('gyandharam_unlocked_books') || '[]');
        if (!stored.includes(targetSlug)) stored.push(targetSlug);
        if (planType === 'all-access') stored.push('all-access');
        localStorage.setItem('gyandharam_unlocked_books', JSON.stringify(stored));
      } catch (e) {}

      await refreshUser();
      setSuccessOrder(data.order);
      if (onSuccess) onSuccess(data.order);
    } catch (err: any) {
      setError(err.message || 'त्रुटि: कृपया सही 12-अंकों का UTR नंबर दर्ज करें');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto selection:bg-amber-500/30">
      <div className="bg-[#120E0A] border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-auto animate-fadeIn text-[#FEF3C7]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1A120B] via-[#24170D] to-[#1A120B] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <Flame className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-1.5">
                <span>Unlock Sacred Granth</span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  UPI 1-Click QR
                </span>
              </h3>
              <p className="text-[11px] text-amber-200/70 truncate max-w-[240px] sm:max-w-xs">
                {book.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Unlocked View */}
        {successOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
                Payment Verified • Granth Unlocked
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-3">
                पावन ग्रंथ सफलतापूर्वक अनलॉक हो गया!
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-sm mx-auto">
                आपका UTR नंबर <strong className="text-amber-300 font-mono">{successOrder.utrNumber}</strong> सत्यापित हो चुका है। अब आप सभी अध्याय व सम्पूर्ण PDF बिना किसी रोक-टोक के पढ़ सकते हैं।
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-4 text-xs font-mono text-stone-300 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-400">Granth:</span>
                <span className="text-white font-semibold">{successOrder.itemTitle || book.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Amount Paid:</span>
                <span className="text-amber-300 font-bold">₹{successOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Account:</span>
                <span className="text-stone-200">{successOrder.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Merchant:</span>
                <span className="text-stone-200">{merchantName} (PhonePe)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Reading Chapter 2 Now 📖🎧</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Payment Flow */
          <div className="p-4 sm:p-6 space-y-5">
            {/* Plan Switcher Pills */}
            <div className="grid grid-cols-2 gap-2 bg-black/60 p-1 rounded-2xl border border-amber-500/20 text-xs">
              <button
                type="button"
                onClick={() => setPlanType('single')}
                className={`py-2 px-3 rounded-xl font-bold transition-all flex flex-col items-center ${
                  planType === 'single'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>Single Granth</span>
                <span className="font-mono text-xs">₹{singlePrice} (Lifetime)</span>
              </button>

              <button
                type="button"
                onClick={() => setPlanType('all-access')}
                className={`py-2 px-3 rounded-xl font-bold transition-all flex flex-col items-center relative ${
                  planType === 'all-access'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-950" />
                  All-Traditions Pass
                </span>
                <span className="font-mono text-xs">₹{annualPrice} (All 6 Faiths)</span>
              </button>
            </div>

            {/* QR Code Scanner Display Box */}
            <div className="bg-black/70 border border-amber-500/30 rounded-2xl p-4 text-center space-y-3">
              {/* QR Mode Switcher */}
              <div className="flex items-center justify-center gap-2 pb-2 border-b border-amber-500/15">
                <button
                  type="button"
                  onClick={() => setQrMode('phonepe')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    qrMode === 'phonepe'
                      ? 'bg-[#5f259f] text-white font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Official PhonePe Scanner
                </button>
                <button
                  type="button"
                  onClick={() => setQrMode('dynamic')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    qrMode === 'dynamic'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Live Vector QR (All Apps)
                </button>
              </div>

              {/* QR Image / Vector */}
              <div className="flex items-center justify-center">
                {qrMode === 'phonepe' ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#5f259f] shadow-xl max-w-[210px] sm:max-w-[240px] bg-black">
                    <img
                      src="/uploads/phonepe-qr.jpg"
                      alt="PhonePe QR Code - Ujjwal Kumar"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-amber-400 inline-block">
                    <QRCodeSVG
                      value={upiString}
                      size={180}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                )}
              </div>

              {/* Merchant Details */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-white tracking-wide">
                  Merchant: <span className="text-amber-400">{merchantName}</span>
                </p>
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-300 font-mono">
                  <span>UPI ID: {merchantUpiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1 hover:text-amber-300 text-amber-400 transition"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-sm font-bold text-amber-300 pt-1">
                  Amount to Pay: <span className="text-lg">₹{activeAmount}</span>
                </div>
              </div>

              {/* Mobile Direct UPI Deep Links */}
              <div className="pt-2 grid grid-cols-3 gap-2">
                <a
                  href={`phonepe://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(merchantName)}&am=${activeAmount}&cu=INR`}
                  className="py-1.5 px-2 rounded-xl bg-[#5f259f] hover:bg-[#501c87] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>PhonePe</span>
                </a>
                <a
                  href={`gpay://upi/pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(merchantName)}&am=${activeAmount}&cu=INR`}
                  className="py-1.5 px-2 rounded-xl bg-[#1a73e8] hover:bg-[#1558b0] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Google Pay</span>
                </a>
                <a
                  href={`paytmmp://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(merchantName)}&am=${activeAmount}&cu=INR`}
                  className="py-1.5 px-2 rounded-xl bg-[#00b9f1] hover:bg-[#0092bf] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Paytm / UPI</span>
                </a>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* 12-Digit UTR Verification Form */}
            <form onSubmit={handleVerifyUtr} className="space-y-3.5">
              <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl text-[11px] text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300">चरण (Steps): </span>
                1. ऊपर दिए QR कोड पर ₹{activeAmount} का भुगतान करें।<br />
                2. भुगतान विवरण से <strong>12-अंकों का UPI Transaction ID / UTR</strong> यहाँ दर्ज करें।
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-200/80 mb-1">
                  12-Digit UPI UTR / Transaction Reference ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="उदा. 431892019482 (12 Digits)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-amber-500/40 text-white font-mono text-sm tracking-widest placeholder-stone-600 focus:outline-none focus:border-amber-400 text-center"
                  />
                  {utrNumber.length === 12 && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <Check className="w-4 h-4" /> 12 Digits
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-200/80 mb-1">
                  Email ID (For Order License & Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full px-4 py-2 rounded-xl bg-black/80 border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading || utrNumber.length !== 12}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-950/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying 12-Digit UTR...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Unlock Granth (₹{activeAmount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
