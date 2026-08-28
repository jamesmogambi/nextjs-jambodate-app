'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/lib/context/AuthContext';
import { Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { CompatibilityBadge } from '@/components/ui/CompatibilityBadge';
import { EmptyState } from '@/components/ui/StateFeedback';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function LikesPage() {
  const { allProfiles, likes, matches, likeProfile, currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Profiles that have liked the current user (demo simulated inbound likes: e.g. Wangari, Brian, Sharon)
  const receivedLikesProfiles = allProfiles.filter(
    (p) =>
      p.id !== currentUser?.id &&
      ['user_wangari', 'user_brian', 'user_sharon', 'user_faith'].includes(p.id) &&
      !matches.some((m) => m.users.includes(p.id))
  );

  // Profiles that current user has liked
  const sentLikesProfiles = allProfiles.filter((p) => likes.includes(p.id));

  const handleMatchBack = async (profileId: string) => {
    const res = await likeProfile(profileId);
    if (res.isMatch) {
      toast("It's a Match! You can now start chatting.", 'success');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272D2A]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight">
              Likes & Admirers
            </h1>
            <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
              Connect with singles who expressed interest in your profile.
            </p>
          </div>

          <div className="p-1 rounded-xl bg-[#151A18] border border-[#272D2A] flex shrink-0">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'received'
                  ? 'bg-[#D85B7A] text-white'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Received ({receivedLikesProfiles.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'sent'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              Sent ({sentLikesProfiles.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Likes Received */}
        {activeTab === 'received' && (
          <div>
            {receivedLikesProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {receivedLikesProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="relative rounded-2xl overflow-hidden bg-[#151A18] border border-[#272D2A] shadow-xl flex flex-col group"
                  >
                    <div className="relative aspect-[3/3.8] overflow-hidden bg-[#0D1110]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profile.photos[0]}
                        alt={profile.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <CompatibilityBadge percentage={profile.compatibility || 90} />
                      </div>
                      <div className="absolute top-3 right-3">
                        <VerificationBadge status={profile.verificationStatus} />
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/80 to-transparent">
                        <h3 className="text-xl font-bold text-[#F5F3EF]">
                          {profile.name}, {profile.age}
                        </h3>
                        <p className="text-xs text-[#A8AAA5] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#3FAF72]" /> {profile.location.split('(')[0]}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <Badge variant="gold" size="sm" className="mb-2">
                          {profile.relationshipIntention}
                        </Badge>
                        <p className="text-xs text-[#A8AAA5] line-clamp-2">
                          {profile.bio}
                        </p>
                      </div>

                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleMatchBack(profile.id)}
                        className="w-full"
                      >
                        <Sparkles className="w-4 h-4" /> Match Back & Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No new received likes right now"
                description="Keep your profile fresh and verified to attract more Kenyan singles."
                actionLabel="Discover More Singles"
                onAction={() => (window.location.href = '/discover')}
                icon={Heart}
              />
            )}
          </div>
        )}

        {/* Tab 2: Likes Sent */}
        {activeTab === 'sent' && (
          <div>
            {sentLikesProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sentLikesProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="relative rounded-2xl overflow-hidden bg-[#151A18] border border-[#272D2A] shadow-md flex flex-col"
                  >
                    <div className="relative aspect-[3/3.8] overflow-hidden bg-[#0D1110]">
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
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/80 to-transparent">
                        <h3 className="text-lg font-bold text-[#F5F3EF]">
                          {profile.name}, {profile.age}
                        </h3>
                        <p className="text-xs text-[#A8AAA5]">{profile.location.split('(')[0]}</p>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-[#A8AAA5] mb-2">
                        <span>Intention:</span>
                        <span className="font-semibold text-[#D99A52]">{profile.relationshipIntention}</span>
                      </div>
                      <span className="text-[11px] text-center text-[#3FAF72] bg-[#3FAF72]/10 py-1 rounded-md border border-[#3FAF72]/20">
                        Like Sent • Awaiting Response
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="You haven't liked anyone yet"
                description="Explore profiles on Discover and send likes to singles who catch your eye."
                actionLabel="Go to Discover"
                onAction={() => (window.location.href = '/discover')}
                icon={Heart}
              />
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
