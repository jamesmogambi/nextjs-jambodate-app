'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/lib/context/AuthContext';
import { Sparkles, MessageCircle, MoreVertical, Trash2, ShieldAlert, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { EmptyState } from '@/components/ui/StateFeedback';
import { ReportModal } from '@/components/ui/ReportModal';
import { useToast } from '@/components/ui/Toast';
import { formatTimeAgo } from '@/lib/utils';
import { UserProfile } from '@/types';

export default function MatchesPage() {
  const { matches, allProfiles, currentUser, unmatchUser } = useAuth();
  const { toast } = useToast();
  const [selectedReportTarget, setSelectedReportTarget] = useState<UserProfile | null>(null);

  // Get matched user profiles
  const matchedUsersWithData = matches
    .map((match) => {
      const otherUserId = match.users.find((id) => id !== currentUser?.id);
      const profile = allProfiles.find((p) => p.id === otherUserId);
      return {
        match,
        profile,
      };
    })
    .filter((item): item is { match: typeof item.match; profile: UserProfile } => item.profile !== undefined);

  const handleUnmatch = (matchId: string, name: string) => {
    unmatchUser(matchId);
    toast(`Unmatched with ${name}`, 'info');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-4 border-b border-[#272D2A]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight flex items-center gap-2">
            Your Matches
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D99A52]/20 text-[#D99A52] font-semibold border border-[#D99A52]/30">
              {matchedUsersWithData.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
            Singles with mutual interest and shared relationship vision.
          </p>
        </div>

        {matchedUsersWithData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedUsersWithData.map(({ match, profile }) => (
              <div
                key={match.id}
                className="rounded-2xl overflow-hidden bg-[#151A18] border border-[#272D2A] hover:border-[#3A423E] transition-all flex flex-col justify-between shadow-lg"
              >
                {/* Photo & Top Info */}
                <div className="relative aspect-[3/3.2] overflow-hidden bg-[#0D1110]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <VerificationBadge status={profile.verificationStatus} />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/80 to-transparent">
                    <h3 className="text-lg font-bold text-[#F5F3EF]">
                      {profile.name}, {profile.age}
                    </h3>
                    <p className="text-xs text-[#A8AAA5] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#3FAF72]" /> {profile.location.split('(')[0]}
                    </p>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Badge variant="gold" size="sm" className="mb-2">
                      {profile.relationshipIntention}
                    </Badge>
                    <p className="text-xs text-[#A8AAA5] line-clamp-1">
                      {match.lastMessage || `Matched ${formatTimeAgo(match.createdAt)}`}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#272D2A]">
                    <Link href={`/messages/${match.id}`} className="w-full block">
                      <Button variant="primary" size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4" /> Message {profile.name.split(' ')[0]}
                      </Button>
                    </Link>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => setSelectedReportTarget(profile)}
                        className="text-[#A8AAA5] hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        title="Report user"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" /> Report
                      </button>
                      <button
                        onClick={() => handleUnmatch(match.id, profile.name)}
                        className="text-[#A8AAA5] hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        title="Unmatch"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Unmatch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matches yet"
            description="When you and another member like each other, you will appear here and unlock messaging."
            actionLabel="Discover Singles"
            onAction={() => (window.location.href = '/discover')}
            icon={Sparkles}
          />
        )}
      </div>

      {/* Safety Report Modal */}
      <ReportModal
        isOpen={!!selectedReportTarget}
        onClose={() => setSelectedReportTarget(null)}
        targetProfile={selectedReportTarget}
      />
    </AppShell>
  );
}
