'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';
import { AppHeader } from './AppHeader';
import { useAuth } from '@/lib/context/AuthContext';
import { MatchModal } from '@/components/ui/MatchModal';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentMatchCelebration, clearMatchCelebration, currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0D1110] text-[#F5F3EF] flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content View */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Mobile Top Header */}
          <AppHeader />

          {/* Dynamic page content */}
          <main className="flex-1 pb-20 md:pb-8 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNavigation />
        </div>

        {/* Global Mutual Match Celebration Dialog */}
        <MatchModal
          matchedProfile={currentMatchCelebration}
          currentUser={currentUser}
          onClose={clearMatchCelebration}
        />
      </div>
    </ProtectedRoute>
  );
}
