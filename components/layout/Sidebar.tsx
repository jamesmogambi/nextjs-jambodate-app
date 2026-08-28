'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Heart,
  Sparkles,
  MessageCircle,
  User,
  ShieldCheck,
  Crown,
  Settings,
  ShieldAlert,
  LogOut,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/context/AuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { VerificationBadge } from '@/components/ui/VerificationBadge';

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, matches, likes, logout, switchUser, allProfiles, profileCompletion } = useAuth();

  const unreadMessagesCount = matches.reduce((acc, m) => {
    return acc + (m.unreadCountByUser?.[currentUser?.id || ''] || 0);
  }, 0);

  const verificationStatus = currentUser?.verificationStatus ?? 'unverified';
  const verificationLabel: Record<string, string> = {
    verified: 'Verified Kenyan Single',
    pending: 'Verification Pending',
    rejected: 'Verification Rejected',
    unverified: 'Not Verified',
  };
  const verificationLabelColor: Record<string, string> = {
    verified: 'text-[#3FAF72]',
    pending: 'text-[#D99A52]',
    rejected: 'text-red-400',
    unverified: 'text-[#A8AAA5]',
  };

  const navItems = [
    {
      label: 'Discover',
      href: '/discover',
      icon: Compass,
    },
    {
      label: 'Likes',
      href: '/likes',
      icon: Heart,
      badge: likes.length > 0 ? likes.length : undefined,
    },
    {
      label: 'Matches',
      href: '/matches',
      icon: Sparkles,
      badge: matches.length > 0 ? matches.length : undefined,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: MessageCircle,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      label: 'My Profile',
      href: '/profile',
      icon: User,
    },
  ];

  const secondaryNav = [
    {
      label: 'Get Verified',
      href: '/verification',
      icon: ShieldCheck,
      highlight: currentUser?.verificationStatus !== 'verified',
    },
    {
      label: 'JamboDate Gold',
      href: '/premium',
      icon: Crown,
      gold: true,
    },
    {
      label: 'Safety Center',
      href: '/safety',
      icon: ShieldAlert,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  if (currentUser?.isAdmin) {
    secondaryNav.push({
      label: 'Admin Moderation',
      href: '/admin',
      icon: ShieldAlert,
    });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-[#272D2A] bg-[#151A18] select-none">
      {/* Brand Header */}
      <div className="p-8 pb-6 border-b border-[#272D2A]">
        <Link href="/discover" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#D85B7A] flex items-center justify-center shrink-0 shadow-sm shadow-[#D85B7A]/30">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.726 4 1.958 1.046-1.232 2.443-1.958 4-1.958 2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#F5F3EF]">JamboDate</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  isActive
                    ? 'text-[#D85B7A] bg-[#D85B7A]/10 font-medium'
                    : 'text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#1B211E]'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#D85B7A]' : 'text-[#A8AAA5] group-hover:text-[#F5F3EF]')} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-bold',
                      isActive ? 'bg-[#D85B7A] text-white' : 'bg-[#272D2A] text-[#F5F3EF]'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#272D2A]">
          <p className="px-3.5 text-[11px] font-bold uppercase tracking-wider text-[#A8AAA5]/70 mb-2">
            Safety & Tools
          </p>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#272D2A] text-[#F5F3EF]'
                    : 'text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#1B211E]',
                  item.gold && 'text-[#D99A52] hover:text-[#E5AF72]'
                )}
              >
                <Icon className={cn('w-4 h-4', item.gold ? 'text-[#D99A52]' : '')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Demo Switcher for ease of testing */}
        <div className="pt-4 border-t border-[#272D2A]">
          <p className="px-3.5 text-[10px] font-bold uppercase tracking-wider text-[#A8AAA5]/60 mb-2 flex items-center gap-1">
            <Users className="w-3 h-3" /> Switch Demo Account
          </p>
          <div className="px-1">
            <select
              value={currentUser?.id || 'user_current'}
              onChange={(e) => switchUser(e.target.value)}
              className="w-full text-xs bg-[#0D1110] border border-[#272D2A] text-[#A8AAA5] rounded-xl px-3 py-2 focus:outline-none focus:border-[#D85B7A] cursor-pointer"
            >
              <option value="user_current">James Mugambi (Active Demo User)</option>
              <option value="user_wangari">Wangari Kamau (Nairobi)</option>
              <option value="user_brian">Brian Otieno (Nairobi)</option>
              <option value="user_amina">Amina Hassan (Mombasa)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Profile Completion Indicator */}
      {currentUser && (
        <div className="px-6 py-3 border-t border-[#272D2A] bg-[#121614]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#A8AAA5] font-medium">Profile Strength</span>
            <span className="font-bold text-[#D99A52]">{profileCompletion.percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0D1110] rounded-full overflow-hidden border border-[#272D2A]">
            <div
              className="h-full bg-gradient-to-r from-[#D85B7A] via-[#D99A52] to-[#3FAF72] transition-all rounded-full"
              style={{ width: `${profileCompletion.percentage}%` }}
            />
          </div>
          {profileCompletion.percentage < 100 && (
            <Link
              href="/profile/edit"
              className="text-[10px] text-[#D85B7A] hover:underline block mt-1 font-medium"
            >
              Complete profile ({profileCompletion.missingFields.length} left) →
            </Link>
          )}
        </div>
      )}

      {/* User Footer Card */}
      {currentUser && (
        <div className="mt-auto p-6 border-t border-[#272D2A] bg-[#151A18]">
          <div className="flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-3 overflow-hidden group">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#D85B7A] to-[#D99A52]">
                <Avatar
                  src={currentUser.photos[0]}
                  name={currentUser.name}
                  size="md"
                  isOnline={true}
                  className="border-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#F5F3EF] truncate group-hover:text-[#D85B7A] transition-colors">
                  {currentUser.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <VerificationBadge status={verificationStatus} />
                  <span className={`text-xs font-semibold ${verificationLabelColor[verificationStatus]}`}>
                    {verificationLabel[verificationStatus]}
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-[#A8AAA5] hover:text-red-400 rounded-lg hover:bg-[#1B211E] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
