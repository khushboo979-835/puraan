'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GyanAiPandit from '@/components/GyanAiPandit';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Dedicated enterprise Admin mode: Completely isolate from public consumer navbar, festival banners, and widgets
  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#070605] text-amber-50 antialiased">{children}</div>;
  }

  // Consumer Public Website
  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <GyanAiPandit />
      <Footer />
    </>
  );
}
