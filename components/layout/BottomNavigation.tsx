'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart, Sparkles, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/context/AuthContext';

export function BottomNavigation() {
  const pathname = usePathname();
  const { matches, likes, currentUser } = useAuth();

  const unreadMessagesCount = matches.reduce((acc, m) => {
    return acc + (m.unreadCountByUser?.[currentUser?.id || ''] || 0);
  }, 0);

  const items = [
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
      label: 'Profile',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151A18]/95 backdrop-blur-md border-t border-[#272D2A] px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all',
                isActive ? 'text-[#D85B7A]' : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              )}
            >
              <div className="relative">
                <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#D85B7A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-1 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
