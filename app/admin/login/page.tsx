'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fillDefaultCredentials = () => {
    setEmail('admin@gyandharam.com');
    setPassword('GyanAdmin@2026');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setSuccess('Authorization confirmed! Entering Sacred Admin Sanctuary...');

      // Store local session marker
      if (typeof window !== 'undefined') {
        localStorage.setItem('gyandharam_admin_user', JSON.stringify(data.user));
        localStorage.setItem('sacred_admin_session', 'true');
      }

      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Failed to login to admin console');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden selection:bg-amber-500/30">
      {/* Sacred Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/15 via-amber-800/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-700/10 rounded-full blur-2xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-950/40 border border-amber-500/40 shadow-xl shadow-amber-950/40 mb-4 group transition-all duration-300 hover:border-amber-400">
            <Flame className="w-9 h-9 text-amber-400 fill-amber-400/20 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white flex items-center justify-center gap-2">
            GyanDharam <span className="text-amber-400 font-sans text-xs uppercase px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 tracking-widest font-semibold">Admin</span>
          </h1>
          <p className="text-amber-200/60 text-xs sm:text-sm mt-1.5 font-sans">
            Universal Multi-Faith Scripture & Media Sanctuary
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#13110F]/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-7 sm:p-8 shadow-2xl shadow-black/80">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-amber-500/15">
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Vedic Master Portal
              </h2>
              <p className="text-xs text-amber-200/50">Enter authorized credentials to continue</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gyandharam.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-amber-500/30 rounded-xl text-amber-50 placeholder-amber-400/30 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5 uppercase tracking-wider">
                Secret Access Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-black/60 border border-amber-500/30 rounded-xl text-amber-50 placeholder-amber-400/30 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-semibold text-sm shadow-lg shadow-amber-950/50 hover:shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Vedic Authority...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Admin Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-amber-500/15">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-amber-300/70 font-medium">Chief Admin Credentials</span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Fill Credentials
              </button>
            </div>
            <div className="bg-black/50 rounded-lg p-2.5 font-mono text-[11px] text-amber-200/80 border border-amber-500/20 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-stone-400">Email:</span>
                <span className="text-amber-300">admin@gyandharam.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Password:</span>
                <span className="text-amber-300">GyanAdmin@2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Sanctuary */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
          >
            ← Return to GyanDharam Public Sanctuary
          </Link>
        </div>
      </div>
    </div>
  );
}
