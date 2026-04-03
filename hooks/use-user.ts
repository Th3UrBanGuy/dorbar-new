"use client";

import { useState, useEffect, useCallback } from 'react';

export type UserRole = 'staff' | 'mureed' | 'user';

export interface UserData {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  specialAccess: boolean;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Read from client-side cookie first for instant hydration
    const match = document.cookie.match(/(^| )dorbar_user=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[2]));
        setUser(parsed as UserData);
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (e) {
      console.error('Failed to refresh user', e);
    }
  }, []);

  const toggleSpecialAccess = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/auth/special-access', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !user.specialAccess }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => prev ? { ...prev, specialAccess: data.specialAccess } : null);
        // Also trigger re-render for other components
        window.dispatchEvent(new Event('userUpdated'));
      }
    } catch (e) {
      console.error('Failed to toggle special access', e);
    }
  }, [user]);

  // Helper booleans
  const isStaff = user?.role === 'staff';
  const isMureed = user?.role === 'mureed';
  const isNormalUser = user?.role === 'user';
  const hasSpecialAccess = user?.specialAccess === true;
  const isLoggedIn = user !== null;

  // Legacy compatibility: hasTag keeps old code working
  const hasTag = useCallback((tag: string): boolean => {
    if (!user) return false;
    if (tag === 'Staff') return user.role === 'staff';
    if (tag === 'Murid') return user.role === 'mureed';
    if (tag === 'Special') return user.specialAccess === true;
    if (tag === 'User') return true; // Everyone is a User baseline
    return false;
  }, [user]);

  return {
    user,
    isLoaded,
    isLoggedIn,
    isStaff,
    isMureed,
    isNormalUser,
    hasSpecialAccess,
    hasTag,
    refreshUser,
    toggleSpecialAccess,

    // Legacy compat — tags array for components that expect it
    tags: user ? [
      'User' as const,
      ...(user.role === 'staff' ? ['Staff' as const] : []),
      ...(user.role === 'mureed' ? ['Murid' as const] : []),
      ...(user.specialAccess ? ['Special' as const] : []),
    ] : ['User' as const],
  };
}
