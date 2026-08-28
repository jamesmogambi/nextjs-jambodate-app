'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, Heart, X } from 'lucide-react';
import { UserProfile } from '@/types';
import { Button } from './Button';
import { Avatar } from './Avatar';

interface MatchModalProps {
  matchedProfile: UserProfile | null;
  currentUser: UserProfile | null;
  onClose: () => void;
  id?: string;
}

export function MatchModal({
  matchedProfile,
  currentUser,
  onClose,
  id = 'match-celebration-modal',
}: MatchModalProps) {
  if (!matchedProfile || !currentUser) return null;

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="relative w-full max-w-md bg-[#151A18] border border-[#272D2A] rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D85B7A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D99A52]/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A8AAA5] hover:text-[#F5F3EF] p-1.5 rounded-full hover:bg-[#272D2A] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D85B7A]/15 border border-[#D85B7A]/30 text-[#E6819B] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Mutual Connection
        </div>

        <h2 className="text-3xl font-extrabold text-[#F5F3EF] mb-2 tracking-tight">
          It&apos;s a Match!
        </h2>
        <p className="text-sm text-[#A8AAA5] mb-6">
          You and <span className="text-[#F5F3EF] font-semibold">{matchedProfile.name}</span> have expressed mutual interest.
        </p>

        {/* Overlapping profile avatars with heart */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="relative z-10 -mr-4 ring-4 ring-[#151A18] rounded-full">
            <Avatar
              src={currentUser.photos[0]}
              name={currentUser.name}
              size="xl"
            />
          </div>
          <div className="z-20 w-10 h-10 rounded-full bg-[#D85B7A] flex items-center justify-center shadow-lg border-2 border-[#151A18] -my-2">
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          </div>
          <div className="relative z-10 -ml-4 ring-4 ring-[#151A18] rounded-full">
            <Avatar
              src={matchedProfile.photos[0]}
              name={matchedProfile.name}
              size="xl"
            />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] mb-6 text-left">
          <p className="text-xs text-[#A8AAA5] mb-1">Relationship Intention:</p>
          <p className="text-sm font-semibold text-[#D99A52]">
            {matchedProfile.relationshipIntention}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href={`/messages/match_${currentUser.id}_${matchedProfile.id}`}
            onClick={onClose}
            className="w-full"
          >
            <Button variant="primary" size="lg" className="w-full">
              <MessageCircle className="w-4 h-4" /> Start Messaging
            </Button>
          </Link>
          <Button variant="outline" size="md" onClick={onClose} className="w-full">
            Keep Discovering
          </Button>
        </div>
      </div>
    </div>
  );
}
