'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Server,
  Shield,
} from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Security Lockout Protection
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const fillDefaultCredentials = () => {
    setEmail('admin@gyandharam.com');
    setPassword('GyanAdmin@2026');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) {
      setError(`Security lockout active. Please wait ${lockoutTimer}s before retrying.`);
      return;
    }

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
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutTimer(60);
          throw new Error('Too many failed authorization attempts. System temporarily locked for 60 seconds.');
        }

        throw new Error(data.error || 'Invalid credentials. Access denied.');
      }

      setSuccess('Administrative credentials authenticated. Launching master console...');

      if (typeof window !== 'undefined') {
        localStorage.setItem('gyandharam_admin_user', JSON.stringify(data.user));
        localStorage.setItem('sacred_admin_session', 'true');
      }

      setTimeout(() => {
        router.replace(redirectTarget);
        router.refresh();
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-stone-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Subtle Tech-Grid Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Top Security Banner */}
      <div className="w-full max-w-md mx-auto pt-4 flex items-center justify-between text-[11px] text-stone-500 font-mono relative z-10">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Shield className="w-3.5 h-3.5" />
          <span>GyanDharam Master Vault</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>TLS 1.3 / 256-bit Encrypted</span>
        </div>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10">
        {/* Emblem & Portal Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-amber-500/15 to-stone-900 border border-amber-500/30 shadow-xl shadow-black/80 mb-3 group">
            <Flame className="w-8 h-8 text-amber-400 fill-amber-400/20" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-white flex items-center justify-center gap-2">
            GyanDharam <span className="text-amber-400 font-sans text-[11px] uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 font-semibold">Admin</span>
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Privileged Management Console • Multi-Faith Sanctuary
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#0C0D11] border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-800">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Administrative Sign-In
              </h2>
              <p className="text-[11px] text-stone-400">Restricted zone. Authorized personnel only.</p>
            </div>
            {lockoutTimer > 0 && (
              <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                Locked: {lockoutTimer}s
              </span>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Admin Email ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  required
                  disabled={lockoutTimer > 0 || loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gyandharam.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Secret Access Key
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutTimer > 0 || loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-black/60 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || lockoutTimer > 0}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Validating Authority...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-5 pt-4 border-t border-stone-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-stone-400 text-[11px]">Super-Admin Identity</span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3 h-3" />
                Autofill Credentials
              </button>
            </div>
            <div className="bg-black/40 rounded-lg p-2.5 font-mono text-[11px] border border-stone-800/80 text-stone-300 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-stone-500">Email:</span>
                <span className="text-amber-300">admin@gyandharam.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Password:</span>
                <span className="text-amber-300">GyanAdmin@2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
          >
            ← Return to GyanDharam Public Sanctuary
          </Link>
        </div>
      </div>

      {/* Footer Security Watermark */}
      <div className="w-full max-w-md mx-auto pb-4 text-center text-[10px] text-stone-600 font-mono">
        GyanDharam Administrative Security Engine • Confidential & Authorized IP Access Only
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070709] flex items-center justify-center text-amber-300">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
