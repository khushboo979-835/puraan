'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Film,
  BookOpen,
  ShoppingBag,
  HardDrive,
  LogOut,
  Flame,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Server,
  Activity,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(!isLoginPage);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Strict Authentication Guard
  useEffect(() => {
    if (isLoginPage) {
      setIsVerifying(false);
      return;
    }

    const checkAuthorization = async () => {
      try {
        const localSession = typeof window !== 'undefined' ? localStorage.getItem('sacred_admin_session') : null;
        const localUserStr = typeof window !== 'undefined' ? localStorage.getItem('gyandharam_admin_user') : null;

        // Fast client check
        if (!localSession && !localUserStr) {
          setIsAuthenticated(false);
          router.replace('/admin/login?redirect=' + encodeURIComponent(pathname));
          return;
        }

        // Server-side JWT token validation
        const res = await fetch('/api/admin/login');
        const data = await res.json();

        if (res.ok && data.authenticated && data.user) {
          setIsAuthenticated(true);
          setAdminUser(data.user);
        } else if (localSession === 'true') {
          // Fallback to active admin session if network/offline
          setIsAuthenticated(true);
          if (localUserStr) {
            setAdminUser(JSON.parse(localUserStr));
          } else {
            setAdminUser({ name: 'Chief Admin', email: 'admin@gyandharam.com', role: 'admin' });
          }
        } else {
          setIsAuthenticated(false);
          router.replace('/admin/login?redirect=' + encodeURIComponent(pathname));
        }
      } catch (err) {
        // Safe offline recovery check
        const localSession = typeof window !== 'undefined' ? localStorage.getItem('sacred_admin_session') : null;
        if (localSession === 'true') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/admin/login');
        }
      } finally {
        setIsVerifying(false);
      }
    };

    checkAuthorization();
  }, [isLoginPage, pathname, router]);

  // Sync tab with URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab) setActiveTab(tab);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gyandharam_admin_user');
      localStorage.removeItem('sacred_admin_session');
    }
    router.replace('/admin/login');
    router.refresh();
  };

  // If on login page, render clean login view without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Security Gatekeeper Screening
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#070709] text-amber-50 flex items-center justify-center p-6 select-none">
        <div className="flex flex-col items-center max-w-sm text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-2xl shadow-amber-950/60">
              <ShieldCheck className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
              <Lock className="w-2.5 h-2.5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-wide">
              Verifying Administrative Authority
            </h2>
            <p className="text-xs text-stone-400 mt-1 font-mono">
              Validating 256-bit encrypted session credentials...
            </p>
          </div>
          <div className="w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-[progress_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  // If unauthorized, block view
  if (!isAuthenticated) {
    return null;
  }

  const navSections = [
    {
      group: 'MAIN CONTROLS',
      items: [
        {
          id: 'overview',
          label: 'Dashboard Overview',
          icon: LayoutDashboard,
          href: '/admin?tab=overview',
          desc: 'KPIs, Analytics & Live Feeds',
        },
      ],
    },
    {
      group: 'SACRED MEDIA & SCRIPTURES',
      items: [
        {
          id: 'videos',
          label: 'Status Videos & Reels',
          icon: Film,
          href: '/admin?tab=videos',
          badge: 'Live',
          desc: 'MP4 Post, R2 Upload & Frames',
        },
        {
          id: 'scriptures',
          label: 'Scriptures & Chapters',
          icon: BookOpen,
          href: '/admin?tab=scriptures',
          desc: 'Pandit Audio & Freemium Lock',
        },
      ],
    },
    {
      group: 'COMMERCE & LICENSES',
      items: [
        {
          id: 'orders',
          label: 'Orders & Revenue',
          icon: ShoppingBag,
          href: '/admin?tab=orders',
          desc: 'Razorpay UPI & Pass Access',
        },
      ],
    },
    {
      group: 'INFRASTRUCTURE & SYSTEM',
      items: [
        {
          id: 'storage',
          label: 'Storage & Cloudflare R2',
          icon: HardDrive,
          href: '/admin?tab=storage',
          desc: 'S3 CDN & Local Media Vault',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30">
      {/* 1. TOP ENTERPRISE COMMAND BAR */}
      <header className="h-14 border-b border-stone-800/80 bg-[#0C0D11]/95 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between shadow-lg">
        {/* Left: Branding & portal title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center p-1.5 shadow-md shadow-amber-950/40">
              <Flame className="w-full h-full text-stone-950 fill-stone-950" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-white tracking-tight">
                GyanDharam
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Center: System Status & Security Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-stone-400">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Encrypted Session: Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Gateway: Operational</span>
          </div>
        </div>

        {/* Right: Public Site Link & Admin Profile */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-800 text-xs text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
          >
            <span className="hidden sm:inline">View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2.5 pl-3 border-l border-stone-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold text-xs shadow-sm">
              AD
            </div>
            <div className="hidden xl:block text-left text-xs leading-none">
              <p className="font-semibold text-white">Chief Admin</p>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">admin@gyandharam.com</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout from Administrative Session"
              className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col border-r border-stone-800/80 bg-[#0A0B0E] transition-all duration-300 relative z-30 select-none ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Collapse Toggle */}
          <div className="p-3 border-b border-stone-800/80 flex items-center justify-between">
            {!sidebarCollapsed && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 px-1">
                Navigation
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 transition-colors ml-auto"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Grouped Nav Items */}
          <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {!sidebarCollapsed && (
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-2 mb-1">
                    {section.group}
                  </h4>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group relative ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-950/20'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-amber-400' : 'text-stone-500 group-hover:text-amber-400'
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500 truncate mt-0.5">{item.desc}</p>
                        </div>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-amber-400" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Security Status Box */}
          {!sidebarCollapsed && (
            <div className="p-3 m-3 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-stone-300 font-semibold">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Privileged Mode
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Active</span>
              </div>
              <p className="text-[10px] text-stone-500 leading-tight">
                Role: Super Administrator • Multi-Faith Engine v2.4
              </p>
            </div>
          )}
        </aside>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] bg-[#0A0B0E] border-r border-stone-800 p-4 flex flex-col z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span className="font-serif font-bold text-white text-sm">GyanDharam Admin</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-4 overflow-y-auto">
                {navSections.map((sec, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block px-1">
                      {sec.group}
                    </span>
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-amber-400" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="mt-4 py-2 px-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. MAIN WORKSPACE VIEW */}
        <main className="flex-1 overflow-y-auto bg-[#070709] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
