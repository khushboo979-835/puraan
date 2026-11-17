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
  ShieldCheck,
  User,
  Sparkles,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isLoginPage) return;

    // Check admin authentication
    const userStr = localStorage.getItem('gyandharam_admin_user');
    const sessionMarker = localStorage.getItem('sacred_admin_session');

    if (!userStr && !sessionMarker) {
      // In production, allow quick auto-recovery or redirect
      // router.push('/admin/login');
    } else if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {}
    }
  }, [isLoginPage, router]);

  // Handle URL tab sync
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
    localStorage.removeItem('gyandharam_admin_user');
    localStorage.removeItem('sacred_admin_session');
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      href: '/admin?tab=overview',
    },
    {
      id: 'videos',
      label: 'Status Videos & Reels',
      icon: Film,
      href: '/admin?tab=videos',
      badge: 'Live',
    },
    {
      id: 'scriptures',
      label: 'Scriptures & Chapters',
      icon: BookOpen,
      href: '/admin?tab=scriptures',
    },
    {
      id: 'orders',
      label: 'Orders & Revenue',
      icon: ShoppingBag,
      href: '/admin?tab=orders',
    },
    {
      id: 'storage',
      label: 'Storage & R2 Settings',
      icon: HardDrive,
      href: '/admin?tab=storage',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0908] text-amber-50 flex flex-col font-sans selection:bg-amber-500/30">
      {/* Top sacred header bar */}
      <header className="h-16 border-b border-amber-500/20 bg-[#120E0A]/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-black/40 border border-amber-500/20 text-amber-400 hover:text-amber-300 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Portal title */}
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/60 p-1.5 transition-transform group-hover:scale-105">
              <Flame className="w-full h-full text-stone-950 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                  GyanDharam
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-amber-200/50 hidden sm:block">
                Universal Multi-Faith Master Command
              </p>
            </div>
          </Link>
        </div>

        {/* Right header controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Live Production Server pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Production Server</span>
          </div>

          {/* Public sanctuary link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 border border-amber-500/25 text-xs text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-colors"
          >
            <span className="hidden sm:inline">View Sanctuary</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* User profile pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-amber-500/20">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
              AD
            </div>
            <div className="hidden xl:block text-left text-xs leading-tight">
              <p className="font-semibold text-white">Chief Admin</p>
              <p className="text-[10px] text-amber-200/60 font-mono">admin@gyandharam.com</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout from Admin Sanctuary"
              className="p-1.5 rounded-lg text-amber-400/70 hover:text-red-400 hover:bg-red-950/30 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside
          className={`hidden md:flex flex-col border-r border-amber-500/20 bg-[#100D0B] transition-all duration-300 relative z-30 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Collapse toggle */}
          <div className="p-3 border-b border-amber-500/15 flex justify-end">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-black/40 border border-amber-500/20 text-amber-400 hover:text-amber-300 transition-colors"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-950/40'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-amber-500/5'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-amber-400'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate flex-1 tracking-wide">{item.label}</span>
                  )}
                  {!sidebarCollapsed && item.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-amber-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Card */}
          {!sidebarCollapsed && (
            <div className="p-3 m-3 rounded-xl bg-black/50 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vedic R2 Engine</span>
              </div>
              <p className="text-[11px] text-stone-400">
                High-speed Cloudflare S3 & Local Dev fallback operational.
              </p>
            </div>
          )}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] bg-[#100D0B] border-r border-amber-500/30 p-4 flex flex-col z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-amber-400" />
                  <span className="font-serif font-bold text-white">GyanDharam</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-stone-300 hover:text-amber-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-amber-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="mt-auto py-2.5 px-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0A0908] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
