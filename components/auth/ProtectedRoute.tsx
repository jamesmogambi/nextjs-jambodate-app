'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({
  children,
  requireOnboarding = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!currentUser) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (requireOnboarding && currentUser.onboardingCompleted === false && pathname !== '/onboarding') {
      router.replace('/onboarding');
    }
  }, [currentUser, isLoading, router, pathname, requireOnboarding]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1110] flex flex-col items-center justify-center text-[#F5F3EF] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D85B7A] to-[#D99A52] p-0.5 animate-pulse">
            <div className="w-full h-full bg-[#0D1110] rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-2xl text-[#F5F3EF]">J</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FAF72] animate-ping" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5]">
              Loading JamboDate...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
