'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Crown, Bell } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { Avatar } from '@/components/ui/Avatar';

export function AppHeader() {
  const { currentUser } = useAuth();

  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0D1110]/95 backdrop-blur-md border-b border-[#272D2A]">
      <Link href="/discover" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#D85B7A] flex items-center justify-center shrink-0 shadow-sm shadow-[#D85B7A]/30">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.726 4 1.958 1.046-1.232 2.443-1.958 4-1.958 2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-[#F5F3EF]">
          JamboDate
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/safety"
          title="Safety Center"
          className="p-2 text-[#A8AAA5] hover:text-[#3FAF72] transition-colors"
        >
          <ShieldCheck className="w-5 h-5" />
        </Link>
        <Link
          href="/premium"
          title="JamboDate Gold"
          className="p-2 text-[#D99A52] hover:text-[#E5AF72] transition-colors"
        >
          <Crown className="w-5 h-5" />
        </Link>
        <Link href="/profile">
          <Avatar
            src={currentUser?.photos[0]}
            name={currentUser?.name}
            size="sm"
          />
        </Link>
      </div>
    </header>
  );
}
