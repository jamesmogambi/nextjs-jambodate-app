'use client';

import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MapPin,
  Heart,
  X,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/StateFeedback';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { KENYAN_COUNTIES_CITIES, RELATIONSHIP_INTENTIONS } from '@/lib/data/kenyanProfiles';

export default function DiscoverPage() {
  const { allProfiles, currentUser, likes, passes, blocks, likeProfile, passProfile } = useAuth();
  const { toast } = useToast();

  // Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIntention, setSelectedIntention] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Available discovery candidates (excluding current user, already liked, passed, or blocked)
  const candidateProfiles = useMemo(() => {
    return allProfiles.filter((p) => {
      if (!currentUser) return true;
      if (p.id === currentUser.id) return false;
      if (blocks.includes(p.id)) return false;
      if (likes.includes(p.id)) return false;
      if (passes.includes(p.id)) return false;

      if (selectedIntention !== 'all' && p.relationshipIntention !== selectedIntention) {
        return false;
      }
      if (selectedCounty !== 'all' && !p.location.toLowerCase().includes(selectedCounty.toLowerCase())) {
        return false;
      }
      if (verifiedOnly && p.verificationStatus !== 'verified') {
        return false;
      }
      return true;
    });
  }, [allProfiles, currentUser, likes, passes, blocks, selectedIntention, selectedCounty, verifiedOnly]);

  const currentProfile = candidateProfiles[currentIndex] || null;

  const handleLike = async () => {
    if (!currentProfile) return;
    const result = await likeProfile(currentProfile.id);
    if (!result.isMatch) {
      toast(`Liked ${currentProfile.name}`, 'info');
    }
    // Advance to next profile
    if (currentIndex >= candidateProfiles.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handlePass = () => {
    if (!currentProfile) return;
    passProfile(currentProfile.id);
    toast(`Passed on ${currentProfile.name}`, 'info');
    if (currentIndex >= candidateProfiles.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleResetFilters = () => {
    setSelectedIntention('all');
    setSelectedCounty('all');
    setVerifiedOnly(false);
    setCurrentIndex(0);
    toast('Filters reset to default', 'info');
  };

  return (
    <AppShell>
      <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
        {/* Page Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F5F3EF] tracking-tight">Discover</h1>
            <p className="text-[#A8AAA5] text-sm">
              Finding meaningful connections in {selectedCounty === 'all' ? 'Nairobi & across Kenya' : selectedCounty}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick Intentions & Verification Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setSelectedIntention('all')}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedIntention === 'all'
                    ? 'bg-[#D85B7A] text-white font-bold shadow-xs'
                    : 'bg-[#151A18] text-[#A8AAA5] hover:text-[#F5F3EF] border border-[#272D2A]'
                }`}
              >
                All Intentions
              </button>
              <button
                onClick={() => setSelectedIntention('Marriage')}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedIntention === 'Marriage'
                    ? 'bg-[#D99A52] text-[#0D1110] font-bold shadow-xs'
                    : 'bg-[#151A18] text-[#A8AAA5] hover:text-[#F5F3EF] border border-[#272D2A]'
                }`}
              >
                💍 Marriage
              </button>
              <button
                onClick={() => setSelectedIntention('Serious relationship')}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedIntention === 'Serious relationship'
                    ? 'bg-[#D85B7A] text-white font-bold shadow-xs'
                    : 'bg-[#151A18] text-[#A8AAA5] hover:text-[#F5F3EF] border border-[#272D2A]'
                }`}
              >
                Serious
              </button>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1 transition-all cursor-pointer ${
                  verifiedOnly
                    ? 'bg-[#3FAF72] text-[#0D1110] font-bold shadow-xs'
                    : 'bg-[#151A18] text-[#A8AAA5] hover:text-[#F5F3EF] border border-[#272D2A]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                showFilters
                  ? 'bg-[#272D2A] border-[#3FAF72] text-[#3FAF72]'
                  : 'bg-[#151A18] border-[#272D2A] text-[#A8AAA5] hover:text-white hover:bg-[#1B211E]'
              }`}
              title="Toggle Detailed Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Expandable Filter Tray */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#272D2A]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5F3EF] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#D99A52]" /> Detailed Preferences
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#A8AAA5] hover:text-[#F5F3EF] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#A8AAA5] mb-1.5 block">
                  Location / Kenyan County
                </label>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full bg-[#0D1110] border border-[#272D2A] rounded-xl px-3.5 py-2.5 text-[#F5F3EF] text-xs focus:outline-none focus:border-[#D85B7A] cursor-pointer"
                >
                  <option value="all">All Kenya (All Counties)</option>
                  <option value="Nairobi">Nairobi Metropolitan</option>
                  <option value="Mombasa">Mombasa & Coast</option>
                  <option value="Kisumu">Kisumu City</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8AAA5] mb-1.5 block">
                  Relationship Goal
                </label>
                <select
                  value={selectedIntention}
                  onChange={(e) => setSelectedIntention(e.target.value)}
                  className="w-full bg-[#0D1110] border border-[#272D2A] rounded-xl px-3.5 py-2.5 text-[#F5F3EF] text-xs focus:outline-none focus:border-[#D85B7A] cursor-pointer"
                >
                  <option value="all">All Intentions</option>
                  {RELATIONSHIP_INTENTIONS.map((int) => (
                    <option key={int} value={int}>
                      {int}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Center Stage & Side Info Panels */}
        <div className="flex-1 flex gap-8 items-center justify-center relative my-auto py-2">
          {/* Main Profile Card Stage */}
          <div className="w-full max-w-[480px]">
            {currentProfile ? (
              <ProfileCard
                profile={currentProfile}
                onLike={handleLike}
                onPass={handlePass}
              />
            ) : (
              <EmptyState
                title="You've seen all singles in this criteria"
                description="Expand your location filters or reset passed profiles to meet more Kenyan singles."
                actionLabel="Reset Discovery Filters"
                onAction={handleResetFilters}
                icon={Sparkles}
              />
            )}
          </div>

          {/* Desktop Right Side Widgets matching Professional Polish design */}
          <div className="hidden xl:flex flex-col gap-4 w-52 shrink-0">
            <div className="p-5 bg-[#151A18] border border-[#272D2A] rounded-2xl shadow-lg">
              <h4 className="text-xs font-bold text-[#D99A52] uppercase mb-2 tracking-wider flex items-center gap-1.5">
                Safety Tip
              </h4>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Always meet in public places for your first few dates. Trust your instincts.
              </p>
            </div>

            <div className="p-5 bg-[#151A18] border border-[#272D2A] rounded-2xl shadow-lg">
              <h4 className="text-xs font-bold text-[#D85B7A] uppercase mb-2 tracking-wider flex items-center gap-1.5">
                JamboDate Premium
              </h4>
              <p className="text-xs text-[#A8AAA5] mb-3 leading-relaxed">
                See who already liked you & unlock priority compatibility.
              </p>
              <a href="/premium" className="text-xs font-bold text-[#D85B7A] hover:underline inline-flex items-center gap-1">
                Upgrade Now →
              </a>
            </div>
          </div>
        </div>

        {/* Discovery Summary stats */}
        {currentProfile && (
          <p className="text-center text-xs text-[#A8AAA5] pt-4">
            {candidateProfiles.length} compatible Kenyan singles nearby • Tap photos to view angles
          </p>
        )}
      </div>
    </AppShell>
  );
}
