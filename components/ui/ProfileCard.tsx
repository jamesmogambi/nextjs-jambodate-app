'use client';

import React, { useState } from 'react';
import {
  Heart,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { CompatibilityBadge } from './CompatibilityBadge';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { Button } from './Button';
import { ReportModal } from './ReportModal';
import { cn } from '@/lib/utils';
import { filterRealPhotos } from '@/lib/utils';

interface ProfileCardProps {
  profile: UserProfile;
  onLike?: () => void;
  onPass?: () => void;
  showActions?: boolean;
  className?: string;
  id?: string;
}

export function ProfileCard({
  profile,
  onLike,
  onPass,
  showActions = true,
  className,
  id,
}: ProfileCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const realPhotos = filterRealPhotos(profile.photos || []);
  const photos = realPhotos.length > 0
    ? realPhotos
    : ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <div
        id={id || `profile-card-${profile.id}`}
        className={cn(
          'relative w-full max-w-[480px] mx-auto aspect-[4/5] bg-[#151A18] rounded-[2rem] border border-[#272D2A] shadow-2xl overflow-hidden group select-none flex flex-col justify-end',
          className
        )}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[photoIndex]}
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/60 to-transparent pointer-events-none" />

        {/* Top Header Overlay: Compatibility Badge & Photo Counter */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto">
          <CompatibilityBadge percentage={profile.compatibility || 94} />
          
          {/* Photo dots indicator */}
          {photos.length > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151A18]/80 backdrop-blur-md border border-[#272D2A]">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-200',
                    i === photoIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Photo Navigation Touch Areas */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-0 inset-y-20 w-1/3 z-10 flex items-center justify-start pl-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Previous photo"
            >
              <span className="w-9 h-9 rounded-full bg-[#151A18]/80 border border-[#272D2A] text-white flex items-center justify-center hover:bg-white/20">
                <ChevronLeft className="w-5 h-5" />
              </span>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-0 inset-y-20 w-1/3 z-10 flex items-center justify-end pr-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Next photo"
            >
              <span className="w-9 h-9 rounded-full bg-[#151A18]/80 border border-[#272D2A] text-white flex items-center justify-center hover:bg-white/20">
                <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          </>
        )}

        {/* Bottom Profile Details Overlay */}
        <div className="relative z-20 p-6 sm:p-8 text-left">
          {/* Name, Age & Verified badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F3EF] tracking-tight">
                {profile.name}, {profile.age}
              </h2>
              {profile.verificationStatus === 'verified' && (
                <svg className="w-6 h-6 text-[#3FAF72] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <button
              onClick={() => setIsDetailOpen(true)}
              className="p-2 rounded-xl bg-[#151A18]/90 border border-[#272D2A] text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#272D2A] transition-colors cursor-pointer"
              title="View full profile"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Subtitle / Location & Profession */}
          <p className="text-[#F5F3EF] opacity-90 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
            {profile.occupation ? `${profile.occupation} in ${profile.location.split('(')[0].trim()}. ` : `${profile.location.split('(')[0].trim()}. `}
            {profile.bio || 'Looking for someone to share long sunset drives and meaningful conversations.'}
          </p>

          {/* Badges / Tags */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            <span className="px-3 py-1 bg-[#272D2A] rounded-lg text-xs font-medium text-[#F5F3EF]">
              {profile.relationshipIntention}
            </span>
            {profile.interests && profile.interests.slice(0, 3).map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-[#272D2A] rounded-lg text-xs font-medium text-[#F5F3EF]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action Row: Pass Button, Send Interest CTA, Gold Like Button */}
          {showActions && (
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              {/* Pass Button */}
              <button
                id={`pass-btn-${profile.id}`}
                onClick={onPass}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#272D2A] flex items-center justify-center bg-[#151A18] hover:bg-white/10 transition-colors shadow-lg active:scale-95 cursor-pointer shrink-0"
                title="Pass"
                aria-label="Pass"
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 text-[#A8AAA5]" />
              </button>

              {/* Send Interest (Primary Action) */}
              <button
                id={`like-btn-${profile.id}`}
                onClick={onLike}
                className="flex-1 py-3.5 sm:py-4 px-6 sm:px-10 rounded-2xl bg-[#D85B7A] text-white font-bold text-base sm:text-lg hover:bg-[#c04a68] transition-colors shadow-lg shadow-[#D85B7A]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                title="Send Interest"
                aria-label="Send Interest"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Send Interest</span>
              </button>

              {/* Gold Heart / Superlike Button */}
              <button
                onClick={onLike}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#272D2A] flex items-center justify-center bg-[#151A18] hover:bg-white/10 transition-colors shadow-lg active:scale-95 cursor-pointer shrink-0"
                title="Super Like with JamboDate Gold"
                aria-label="Super Like with JamboDate Gold"
              >
                <svg viewBox="0 0 24 24" fill="#D99A52" className="w-7 h-7 sm:w-8 sm:h-8 text-[#D99A52]">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.726 4 1.958 1.046-1.232 2.443-1.958 4-1.958 2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Profile View Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={`${profile.name}, ${profile.age}`}
        maxWidth="lg"
      >
        <div className="space-y-6 text-[#F5F3EF]">
          {/* Photos Grid */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, idx) => (
              <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden border border-[#272D2A] bg-[#0D1110]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p} alt={`${profile.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Intention & Verification */}
          <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-[#A8AAA5]">Relationship Intention</p>
              <p className="text-base font-semibold text-[#D99A52]">{profile.relationshipIntention}</p>
            </div>
            <VerificationBadge status={profile.verificationStatus} showText />
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] mb-2">About</h4>
            <p className="text-sm leading-relaxed text-[#F5F3EF] bg-[#0D1110] p-4 rounded-xl border border-[#272D2A]">
              {profile.bio || 'No bio provided.'}
            </p>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#3FAF72]" />
              <div>
                <p className="text-[11px] text-[#A8AAA5]">Location</p>
                <p className="text-xs font-medium text-[#F5F3EF]">{profile.location}</p>
              </div>
            </div>

            {profile.occupation && (
              <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-[#D99A52]" />
                <div>
                  <p className="text-[11px] text-[#A8AAA5]">Work</p>
                  <p className="text-xs font-medium text-[#F5F3EF]">{profile.occupation}</p>
                </div>
              </div>
            )}

            {profile.education && (
              <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-[#D85B7A]" />
                <div>
                  <p className="text-[11px] text-[#A8AAA5]">Education</p>
                  <p className="text-xs font-medium text-[#F5F3EF]">{profile.education}</p>
                </div>
              </div>
            )}

            {profile.languages && profile.languages.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center gap-3">
                <Languages className="w-4 h-4 text-[#3FAF72]" />
                <div>
                  <p className="text-[11px] text-[#A8AAA5]">Languages</p>
                  <p className="text-xs font-medium text-[#F5F3EF]">{profile.languages.join(', ')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] mb-2">Interests & Passions</h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((int) => (
                  <Badge key={int} variant="surface">
                    {int}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Lifestyle */}
          {profile.lifestyle && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] mb-2">Lifestyle</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {profile.lifestyle.drinking && (
                  <div className="p-2.5 rounded-lg bg-[#0D1110] border border-[#272D2A]">
                    <span className="text-[#A8AAA5]">Drinking: </span>
                    <span className="font-medium text-[#F5F3EF]">{profile.lifestyle.drinking}</span>
                  </div>
                )}
                {profile.lifestyle.smoking && (
                  <div className="p-2.5 rounded-lg bg-[#0D1110] border border-[#272D2A]">
                    <span className="text-[#A8AAA5]">Smoking: </span>
                    <span className="font-medium text-[#F5F3EF]">{profile.lifestyle.smoking}</span>
                  </div>
                )}
                {profile.lifestyle.workout && (
                  <div className="p-2.5 rounded-lg bg-[#0D1110] border border-[#272D2A]">
                    <span className="text-[#A8AAA5]">Exercise: </span>
                    <span className="font-medium text-[#F5F3EF]">{profile.lifestyle.workout}</span>
                  </div>
                )}
                {profile.lifestyle.kids && (
                  <div className="p-2.5 rounded-lg bg-[#0D1110] border border-[#272D2A]">
                    <span className="text-[#A8AAA5]">Kids: </span>
                    <span className="font-medium text-[#F5F3EF]">{profile.lifestyle.kids}</span>
                  </div>
                )}
                {profile.lifestyle.religion && (
                  <div className="p-2.5 rounded-lg bg-[#0D1110] border border-[#272D2A]">
                    <span className="text-[#A8AAA5]">Faith: </span>
                    <span className="font-medium text-[#F5F3EF]">{profile.lifestyle.religion}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Safety Reporting Trigger */}
          <div className="pt-4 border-t border-[#272D2A] flex items-center justify-between">
            <button
              onClick={() => {
                setIsDetailOpen(false);
                setIsReportOpen(true);
              }}
              className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Report or Block {profile.name}
            </button>
            {showActions && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsDetailOpen(false);
                    onPass?.();
                  }}
                >
                  Pass
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsDetailOpen(false);
                    onLike?.();
                  }}
                >
                  <Heart className="w-3.5 h-3.5 fill-white" /> Like Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Safety Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetProfile={profile}
      />
    </>
  );
}
