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
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    if (!user || !user.purchasedBooks) return false;
    return user.purchasedBooks.includes(bookId.toString());
  };

  const unlockBook = async (bookId: string) => {
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
      return false;
    } catch (e) {
      return false;
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
