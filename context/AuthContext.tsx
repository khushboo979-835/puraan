'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
  purchasedBooks: string[];
  bookmarks?: any[];
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isPurchased: (bookId: string) => boolean;
  unlockBook: (bookId: string) => Promise<boolean>;
  unlockAllAccess: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [localPurchases, setLocalPurchases] = useState<string[]>([]);

  // Load persistent local purchases on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('gyandharam_purchases');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setLocalPurchases(parsed);
          }
        }
      } catch (e) {
        console.warn('Failed to parse local purchases:', e);
      }
    }
  }, []);

  const saveLocalPurchase = (id: string) => {
    if (typeof window !== 'undefined') {
      try {
        const updated = Array.from(new Set([...localPurchases, id.toLowerCase(), id]));
        setLocalPurchases(updated);
        localStorage.setItem('gyandharam_purchases', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          // Normalize purchasedBooks to string array
          const rawPurchased = data.user.purchasedBooks || [];
          const normalizedPurchased = rawPurchased.map((p: any) =>
            typeof p === 'object' && p !== null ? p._id?.toString() || p.toString() : p.toString()
          );

          setUser({
            ...data.user,
            purchasedBooks: normalizedPurchased,
          });
        }
      }
    } catch (e) {
      console.error('Failed to fetch session:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, name?: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, isRegister: false }),
      });
      if (res.ok) {
        await refreshUser();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'POST' });
      setUser(null);
      await refreshUser();
    } catch (e) {
      setUser(null);
    }
  };

  const isPurchased = (bookId: string) => {
    if (!bookId) return false;
    const normalized = bookId.toString().toLowerCase();

    // 1. Check local storage purchases
    if (localPurchases.includes('all-access') || localPurchases.includes('all-traditions-pass')) {
      return true;
    }
    if (localPurchases.includes(normalized) || localPurchases.includes(bookId.toString())) {
      return true;
    }

    // 2. Check remote user account
    if (user && user.purchasedBooks) {
      if (user.purchasedBooks.includes('all-access')) return true;
      return user.purchasedBooks.some(
        (pId) => pId.toString().toLowerCase() === normalized || pId.toString() === bookId.toString()
      );
    }

    return false;
  };

  const unlockBook = async (bookId: string) => {
    saveLocalPurchase(bookId);
    try {
      const res = await fetch('/api/checkout/demo-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      if (res.ok) {
        await refreshUser();
        return true;
      }
      return true;
    } catch (e) {
      return true;
    }
  };

  const unlockAllAccess = async () => {
    saveLocalPurchase('all-access');
    saveLocalPurchase('all-traditions-pass');
    try {
      const res = await fetch('/api/checkout/demo-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: 'all-access', planType: 'all-access' }),
      });
      if (res.ok) {
        await refreshUser();
      }
      return true;
    } catch (e) {
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isPurchased,
        unlockBook,
        unlockAllAccess,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
