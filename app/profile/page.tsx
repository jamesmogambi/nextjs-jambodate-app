'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Edit3,
  ShieldCheck,
  Crown,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  Eye,
  Settings,
  Sparkles,
  Clock,
  XCircle,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { ProfileCard } from '@/components/ui/ProfileCard';

const VERIFICATION_CALLTOACTION: Record<string, { label: string; variant: 'green' | 'primary' }> = {
  unverified: { label: 'Start Verification', variant: 'green' },
  rejected: { label: 'Resubmit Documents', variant: 'primary' },
  pending: { label: 'View Submission', variant: 'primary' },
  verified: { label: 'View Badge', variant: 'primary' },
};

export default function ProfilePage() {
  const { currentUser, profileCompletion } = useAuth();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!currentUser) {
    return (
      <AppShell>
        <div className="text-center py-16">
          <p className="text-sm text-[#A8AAA5]">Please sign in to view your profile.</p>
          <Link href="/login" className="mt-4 inline-block">
            <Button variant="primary" size="md">
              Sign In
            </Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Edit & Preview Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272D2A]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
              Manage your personal representation and authentic identity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPreviewMode
                  ? 'bg-[#D99A52] text-[#0D1110] border-[#D99A52]'
                  : 'bg-[#151A18] text-[#A8AAA5] hover:text-[#F5F3EF] border-[#272D2A]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {isPreviewMode ? 'Exit Preview' : 'Preview As Match'}
            </button>

            <Link href="/profile/edit">
              <Button variant="primary" size="sm">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Preview Mode Rendering */}
        {isPreviewMode ? (
          <div className="py-4">
            <div className="p-3 mb-4 rounded-xl bg-[#D99A52]/10 border border-[#D99A52]/20 text-xs text-[#E5AF72] text-center">
              ✨ This is exactly how other Kenyan singles see your card in Discover.
            </div>
            <ProfileCard profile={currentUser} showActions={false} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Completion Meter Card */}
            <div className="bg-[#151A18] rounded-2xl border border-[#272D2A] p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${profileCompletion.percentage >= 80 ? 'bg-[#3FAF72]' : 'bg-[#D99A52]'}`} />
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F3EF]">
                    Your profile is {profileCompletion.percentage}% complete
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#D85B7A]">
                  {profileCompletion.percentage >= 90 ? 'All-Star Kenyan Profile' : 'Complete missing fields for higher matches'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[#0D1110] rounded-full overflow-hidden border border-[#272D2A]">
                <div
                  className="h-full bg-gradient-to-r from-[#D85B7A] via-[#D99A52] to-[#3FAF72] transition-all duration-500 rounded-full"
                  style={{ width: `${profileCompletion.percentage}%` }}
                />
              </div>

              {profileCompletion.missingFields.length > 0 ? (
                <div className="pt-2 border-t border-[#272D2A]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[#A8AAA5]">
                    <span className="text-[#D99A52] font-semibold">Recommended to add: </span>
                    {profileCompletion.missingFields.join(', ')}
                  </div>
                  <Link href="/profile/edit" className="shrink-0">
                    <Button variant="outline" size="sm">
                      Complete Missing Fields
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-xs text-[#3FAF72] font-medium pt-1">
                  🎉 Perfect! Your profile is 100% complete with photos, bio, and lifestyle preferences.
                </p>
              )}
            </div>

            {/* Verification Status Callout — dynamic by current status */}
            {(() => {
              const status = currentUser.verificationStatus;
              const icon =
                status === 'pending' ? <Clock className="w-5 h-5" /> :
                status === 'rejected' ? <XCircle className="w-5 h-5" /> :
                <ShieldCheck className="w-5 h-5" />;
              const iconWrap =
                status === 'pending'
                  ? 'bg-[#D99A52]/20 text-[#D99A52]'
                  : status === 'rejected'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-[#3FAF72]/20 text-[#3FAF72]';
              const border =
                status === 'pending'
                  ? 'border-[#D99A52]/30'
                  : status === 'rejected'
                  ? 'border-red-500/30'
                  : 'border-[#3FAF72]/30';
              const gradientFrom =
                status === 'pending'
                  ? 'from-[#D99A52]/15'
                  : status === 'rejected'
                  ? 'from-red-500/15'
                  : 'from-[#3FAF72]/15';

              let heading: React.ReactNode;
              let message: string;
              if (status === 'verified') {
                heading = (
                  <VerificationBadge status={status} showText />
                );
                message = 'Your identity is confirmed. Enjoy priority discovery and the trusted badge on your cards.';
              } else if (status === 'pending') {
                heading = <h3 className="text-sm font-bold text-[#F5F3EF]">Verification In Review</h3>;
                message = 'Our Nairobi moderation team is reviewing your documents. Reviews conclude in a few hours.';
              } else if (status === 'rejected') {
                heading = <h3 className="text-sm font-bold text-red-400">Verification Needs Resubmission</h3>;
                message = 'Your documents couldn‘t be confirmed. Please resubmit clearer photos.';
              } else {
                heading = <h3 className="text-sm font-bold text-[#F5F3EF]">Get Verified on JamboDate</h3>;
                message = 'Verified singles receive 3x more meaningful connections and unlock trusted status.';
              }

              const cta = VERIFICATION_CALLTOACTION[status] ?? VERIFICATION_CALLTOACTION.unverified;
              const showCta = status !== 'verified' && status !== 'pending';

              return (
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${gradientFrom} via-[#151A18] to-[#151A18] border ${border} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${iconWrap} flex items-center justify-center shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      {heading}
                      <p className="text-xs text-[#A8AAA5] mt-1">{message}</p>
                    </div>
                  </div>
                  {showCta && (
                    <Link href="/verification" className="shrink-0">
                      <Button variant={cta.variant} size="sm">{cta.label}</Button>
                    </Link>
                  )}
                  {status === 'pending' && (
                    <div className="shrink-0">
                      <VerificationBadge status={status} showText />
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Profile Overview Card */}
            <div className="bg-[#151A18] rounded-2xl border border-[#272D2A] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#272D2A] shrink-0 bg-[#0D1110]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser.photos[0]}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-[#F5F3EF]">
                      {currentUser.name}, {currentUser.age}
                    </h2>
                    <VerificationBadge status={currentUser.verificationStatus} showText />
                  </div>

                  <p className="text-xs text-[#A8AAA5] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#3FAF72]" /> {currentUser.location}
                  </p>

                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <Badge variant="gold" size="sm">
                      {currentUser.relationshipIntention}
                    </Badge>
                    {currentUser.subscriptionTier !== 'free' && (
                      <Badge variant="rose" size="sm">
                        <Crown className="w-3 h-3" /> JamboDate {currentUser.subscriptionTier.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="pt-4 border-t border-[#272D2A]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] mb-2">
                  About Me
                </h4>
                <p className="text-sm text-[#F5F3EF] leading-relaxed bg-[#0D1110] p-4 rounded-xl border border-[#272D2A]">
                  {currentUser.bio || 'No bio written yet. Click edit to add your story.'}
                </p>
              </div>

              {/* Photos Grid */}
              <div className="pt-4 border-t border-[#272D2A]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5]">
                    Profile Photos ({currentUser.photos.length})
                  </h4>
                  <Link href="/profile/edit" className="text-xs text-[#D85B7A] hover:underline">
                    Manage Photos
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {currentUser.photos.map((p, idx) => (
                    <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden border border-[#272D2A] bg-[#0D1110] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Career, Education & Languages */}
              <div className="pt-4 border-t border-[#272D2A] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                  <p className="text-[#A8AAA5] flex items-center gap-1 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#D99A52]" /> Career
                  </p>
                  <p className="font-semibold text-[#F5F3EF] truncate">{currentUser.occupation || 'Not specified'}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                  <p className="text-[#A8AAA5] flex items-center gap-1 mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#D85B7A]" /> Education
                  </p>
                  <p className="font-semibold text-[#F5F3EF] truncate">{currentUser.education || 'Not specified'}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                  <p className="text-[#A8AAA5] flex items-center gap-1 mb-1">
                    <Languages className="w-3.5 h-3.5 text-[#3FAF72]" /> Languages
                  </p>
                  <p className="font-semibold text-[#F5F3EF] truncate">{currentUser.languages?.join(', ') || 'English, Swahili'}</p>
                </div>
              </div>

              {/* Interests */}
              {currentUser.interests && currentUser.interests.length > 0 && (
                <div className="pt-4 border-t border-[#272D2A]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] mb-2">
                    Interests & Hobbies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.interests.map((int) => (
                      <Badge key={int} variant="surface">
                        {int}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
