'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/lib/context/AuthContext';
import { MessageCircle, ShieldCheck, Sparkles, Clock, CheckCheck } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { EmptyState } from '@/components/ui/StateFeedback';
import { formatTimeAgo } from '@/lib/utils';
import { UserProfile } from '@/types';

export default function MessagesInboxPage() {
  const { matches, allProfiles, currentUser } = useAuth();

  const conversationItems = matches
    .map((match) => {
      const otherUserId = match.users.find((id) => id !== currentUser?.id);
      const profile = allProfiles.find((p) => p.id === otherUserId);
      const unreadCount = match.unreadCountByUser?.[currentUser?.id || ''] || 0;
      return {
        match,
        profile,
        unreadCount,
      };
    })
    .filter((item): item is { match: typeof item.match; profile: UserProfile; unreadCount: number } => item.profile !== undefined)
    .sort((a, b) => new Date(b.match.lastMessageAt || b.match.createdAt).getTime() - new Date(a.match.lastMessageAt || a.match.createdAt).getTime());

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="pb-4 border-b border-[#272D2A]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight flex items-center gap-2">
            Conversations
            {conversationItems.some((c) => c.unreadCount > 0) && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#D85B7A]" />
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
            Private, safe messaging between verified Kenyan mutual matches.
          </p>
        </div>

        {/* Safety Note Banner */}
        <div className="p-3.5 rounded-xl bg-[#151A18] border border-[#272D2A] flex items-center justify-between text-xs text-[#A8AAA5]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3FAF72]" />
            Never send money, airtime, or financial details to anyone on JamboDate.
          </span>
          <Link href="/safety" className="text-[#D85B7A] hover:underline font-medium shrink-0 ml-2">
            Safety Tips
          </Link>
        </div>

        {conversationItems.length > 0 ? (
          <div className="divide-y divide-[#272D2A] rounded-2xl border border-[#272D2A] bg-[#151A18] overflow-hidden">
            {conversationItems.map(({ match, profile, unreadCount }) => (
              <Link
                key={match.id}
                href={`/messages/${match.id}`}
                className="flex items-center gap-4 p-4 hover:bg-[#1B211E] transition-colors group"
              >
                <Avatar
                  src={profile.photos[0]}
                  name={profile.name}
                  size="lg"
                  isOnline={profile.isOnline}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-sm sm:text-base font-bold text-[#F5F3EF] truncate group-hover:text-[#D85B7A] transition-colors">
                        {profile.name}
                      </span>
                      <VerificationBadge status={profile.verificationStatus} />
                    </div>
                    <span className="text-[11px] text-[#A8AAA5] shrink-0">
                      {formatTimeAgo(match.lastMessageAt || match.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs sm:text-sm truncate ${unreadCount > 0 ? 'text-[#F5F3EF] font-semibold' : 'text-[#A8AAA5]'}`}>
                      {match.lastMessage || 'Say habari and break the ice!'}
                    </p>
                    {unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#D85B7A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active conversations"
            description="When you match with someone, your private conversation room will appear here."
            actionLabel="Discover Kenyan Singles"
            onAction={() => (window.location.href = '/discover')}
            icon={MessageCircle}
          />
        )}
      </div>
    </AppShell>
  );
}
