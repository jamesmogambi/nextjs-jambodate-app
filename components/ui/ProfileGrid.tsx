'use client';

import React from 'react';
import { UserProfile } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { CompatibilityBadge } from './CompatibilityBadge';
import { Badge } from './Badge';
import { MapPin, Heart } from 'lucide-react';
import { Button } from './Button';

interface ProfileGridProps {
  profiles: UserProfile[];
  onSelect?: (profile: UserProfile) => void;
  onLike?: (profileId: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProfileGrid({
  profiles,
  onSelect,
  onLike,
}: ProfileGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {profiles.map((profile) => {
        const photo = profile.photos?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

        return (
          <div
            key={profile.id}
            onClick={() => onSelect?.(profile)}
            className="group relative rounded-2xl overflow-hidden bg-[#151A18] border border-[#272D2A] hover:border-[#3A423E] transition-all duration-300 flex flex-col justify-end aspect-[3/4] cursor-pointer shadow-lg"
          >
            {/* Background Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={profile.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Top Match Badge */}
            <div className="absolute top-3 left-3 z-10">
              <CompatibilityBadge percentage={profile.compatibility || 85} />
            </div>

            {/* Bottom Gradient & Info */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/90 to-transparent pt-12">
              <div className="flex items-center gap-1.5 mb-1">
                <h4 className="text-lg font-bold text-[#F5F3EF]">
                  {profile.name}, {profile.age}
                </h4>
                <VerificationBadge status={profile.verificationStatus} />
              </div>

              <p className="text-xs text-[#A8AAA5] flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-[#3FAF72]" /> {profile.location.split('(')[0]}
              </p>

              <div className="flex items-center justify-between gap-2">
                <Badge variant="gold" size="sm">
                  {profile.relationshipIntention}
                </Badge>
                {onLike && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(profile.id);
                    }}
                    className="p-2 rounded-full bg-[#D85B7A] text-white hover:bg-[#C24D6B] transition-colors shadow-md cursor-pointer"
                    title="Like"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
