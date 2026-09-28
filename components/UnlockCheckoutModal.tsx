'use client';

import React, { useState } from 'react';
import { CheckCircle, ShieldCheck, Lock, Sparkles, BookOpen, Download, Volume2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UnlockCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    _id?: string;
    id?: string;
    title: string;
    price: number;
    coverImageUrl?: string;
    religion?: string;
    author?: string;
  };
  onSuccess?: () => void;
}

export default function UnlockCheckoutModal({ isOpen, onClose, book, onSuccess }: UnlockCheckoutModalProps) {
  const { user, unlockBook, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'instant'>('instant');
  const [successState, setSuccessState] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  if (!isOpen) return null;

  const bookId = book._id || book.id || '';

  const handleSimulatePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/demo-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderInfo(data);
        setSuccessState(true);
        await refreshUser();
        if (onSuccess) onSuccess();
      } else {
        alert(data.error || 'Payment failed');
      }
    } catch (e: any) {
      alert('Payment processing error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayLiveCheckout = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'SacredReads',
          description: `Digital Access to ${book.title}`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                bookId,
              }),
            });
            if (verifyRes.ok) {
              setSuccessState(true);
              await refreshUser();
              if (onSuccess) onSuccess();
            }
          },
          prefill: {
            name: user?.name || 'Devout Seeker',
            email: user?.email || 'seeker@sacredreads.org',
          },
          theme: {
            color: '#784805',
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } else {
        const verifyRes = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            bookId,
          }),
        });
        if (verifyRes.ok) {
          setSuccessState(true);
          await refreshUser();
          if (onSuccess) onSuccess();
        }
      }
    } catch (err: any) {
      alert(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faebb8] border-3 border-[#784805] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#000000] overflow-hidden">
        {successState ? (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-900">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-950 font-black">Access Granted</span>
              <h3 className="text-2xl font-heading font-black text-[#000000] mt-1">Scripture Permanently Unlocked</h3>
              <p className="text-sm font-bold text-[#2b1802] mt-2 max-w-sm mx-auto">
                You now have unrestricted lifetime access to all chapters, interactive synced audio reader, and personal watermarked PDF downloads.
              </p>
            </div>

            <div className="p-4 bg-[#fff4d1] rounded-2xl border-2 border-[#784805] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-[#2b1802]">Book:</span>
                <span className="font-black text-[#000000]">{book.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#2b1802]">License Holder:</span>
                <span className="font-mono font-black text-[#000000]">{user?.email || 'seeker@sacredreads.org'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#2b1802]">Order ID:</span>
                <span className="font-mono text-emerald-950 font-black">{orderInfo?.orderId || 'ORD-COMPLETE'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="flex-1 py-3 px-4 bg-[#1a0e02] hover:bg-[#331c04] text-[#ffdc82] font-black rounded-xl transition shadow-lg border border-[#784805] flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Begin Interactive Reading</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start pb-4 border-b-2 border-[#784805]">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#fff4d1] rounded-xl border-2 border-[#784805] text-[#000000]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-black text-[#000000]">Unlock Full Digital Access</h3>
                  <p className="text-xs font-bold text-[#2b1802]">One-time purchase • Lifetime permanent access</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#000000] font-black text-lg hover:text-red-900 p-1.5 rounded-lg hover:bg-[#fff4d1]"
              >
                ✕
              </button>
            </div>

            <div className="my-5 p-4 bg-[#fff6db] rounded-2xl border-2 border-[#784805] flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-18 bg-[#e0ba63] rounded-lg overflow-hidden border-2 border-[#784805] shadow-xs">
                  <img
                    src={book.coverImageUrl || 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop'}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#000000] tracking-wider uppercase">
                    {book.religion || 'Sacred Scripture'}
                  </span>
                  <h4 className="font-heading font-black text-[#000000] text-sm">{book.title}</h4>
                  <p className="text-xs font-bold text-[#2b1802]">{book.author || 'Critical Manuscript Edition'}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#553606] line-through font-bold">₹{book.price + 300}</span>
                <p className="text-2xl font-black font-heading text-[#000000]">₹{book.price}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-black text-[#000000] uppercase tracking-wider">What’s Included:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#000000] font-bold">
                <div className="flex items-center space-x-2 bg-[#fff4d1] p-2.5 rounded-xl border border-[#784805]">
                  <BookOpen className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
                  <span>All chapters unlocked</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#fff4d1] p-2.5 rounded-xl border border-[#784805]">
                  <Volume2 className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
                  <span>Karaoke audio sync</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#fff4d1] p-2.5 rounded-xl border border-[#784805]">
                  <Download className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
                  <span>Watermarked PDF copy</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#fff4d1] p-2.5 rounded-xl border border-[#784805]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#000000] flex-shrink-0" />
                  <span>Personal DRM license</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs text-[#000000] font-bold">
                <span>Select Payment Gateway:</span>
                <span className="text-[#000000] font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Secured
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('instant')}
                  className={`p-2.5 rounded-xl border-2 text-xs font-black flex flex-col items-center justify-center transition ${
                    paymentMethod === 'instant'
                      ? 'bg-[#1a0e02] text-[#ffdc82] border-black shadow-xs'
                      : 'bg-[#fff4d1] border-[#784805] text-[#000000] hover:bg-[#ffeab0]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mb-1" />
                  <span>1-Click Test</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border-2 text-xs font-black flex flex-col items-center justify-center transition ${
                    paymentMethod === 'upi'
                      ? 'bg-[#1a0e02] text-[#ffdc82] border-black shadow-xs'
                      : 'bg-[#fff4d1] border-[#784805] text-[#000000] hover:bg-[#ffeab0]'
                  }`}
                >
                  <span className="text-sm font-black mb-0.5">UPI / GPay</span>
                  <span className="text-[10px] font-normal">Instant QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border-2 text-xs font-black flex flex-col items-center justify-center transition ${
                    paymentMethod === 'card'
                      ? 'bg-[#1a0e02] text-[#ffdc82] border-black shadow-xs'
                      : 'bg-[#fff4d1] border-[#784805] text-[#000000] hover:bg-[#ffeab0]'
                  }`}
                >
                  <span className="text-sm font-black mb-0.5">Card / Net</span>
                  <span className="text-[10px] font-normal">All Banks</span>
                </button>
              </div>
            </div>

            <button
              onClick={paymentMethod === 'instant' ? handleSimulatePayment : handleRazorpayLiveCheckout}
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#1a0e02] hover:bg-[#381e04] text-[#ffdc82] font-black rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-2 border-2 border-[#784805] disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[#ffdc82] border-t-transparent rounded-full animate-spin" />
                  <span>Securing Sacred License...</span>
                </div>
              ) : (
                <>
                  <span>Pay ₹{book.price} & Unlock Permanently</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
