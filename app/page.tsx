"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Heart,
  Users,
  Compass,
  ArrowRight,
  Lock,
  CheckCircle2,
  PhoneCall,
  Crown,
  ChevronDown,
  Rocket,
  BarChart3,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { INITIAL_KENYAN_PROFILES } from "@/lib/data/kenyanProfiles";
import { useAuth } from "@/lib/context/AuthContext";
import { filterRealPhotos } from "@/lib/utils";

export default function HomePage() {
  const { currentUser, allProfiles } = useAuth();

  const featured = useMemo(() => {
    return allProfiles
      .filter((p) => {
        if (currentUser && p.id === currentUser.id) return false;
        return filterRealPhotos(p.photos || []).length > 0;
      })
      .sort((a, b) => {
        if (
          a.verificationStatus === "verified" &&
          b.verificationStatus !== "verified"
        )
          return -1;
        if (
          b.verificationStatus === "verified" &&
          a.verificationStatus !== "verified"
        )
          return 1;
        if ((a.compatibility ?? 0) !== (b.compatibility ?? 0)) {
          return (b.compatibility ?? 0) - (a.compatibility ?? 0);
        }
        return 0;
      })
      .slice(0, 4);
  }, [currentUser, allProfiles]);

  return (
    <div className="min-h-screen bg-[#0D1110] text-[#F5F3EF] flex flex-col selection:bg-[#D85B7A]/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Subtle Warm Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#D85B7A]/15 via-[#D99A52]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151A18] border border-[#272D2A] text-xs font-medium text-[#A8AAA5] mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#3FAF72]" />
            Designed exclusively for Kenyan singles aged 18+
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
            Find Someone Who <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F5F3EF] via-[#E5AF72] to-[#D85B7A] bg-clip-text text-transparent">
              Shares Your Journey
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#A8AAA5] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Meet genuine Kenyan singles looking for meaningful connections.
            Grounded in authenticity, verified identities, and clear intentions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                Create Free Profile <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/discover" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                Preview Discovery
              </Button>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto pt-8 border-t border-[#272D2A]/60">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#F5F3EF]">
                100%
              </p>
              <p className="text-xs text-[#A8AAA5] mt-1">
                ID & Selfie Verified Option
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#D99A52]">
                47
              </p>
              <p className="text-xs text-[#A8AAA5] mt-1">Counties Supported</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#3FAF72]">
                Zero
              </p>
              <p className="text-xs text-[#A8AAA5] mt-1">Tolerance for Scams</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#D85B7A]">
                Real
              </p>
              <p className="text-xs text-[#A8AAA5] mt-1">
                Meaningful Intentions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section className="py-16 bg-[#151A18] border-y border-[#272D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3FAF72]">
              Trust & Authenticity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F3EF] mt-2">
              A Platform Built on Accountability
            </h2>
            <p className="text-sm text-[#A8AAA5] mt-2 leading-relaxed">
              Dating should feel respectful and safe. JamboDate incorporates
              strict identity checks and proactive safety standards tailored for
              Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D1110] border border-[#272D2A]">
              <div className="w-12 h-12 rounded-xl bg-[#3FAF72]/15 flex items-center justify-center text-[#3FAF72] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-2">
                Verified Kenyan Singles
              </h3>
              <p className="text-xs sm:text-sm text-[#A8AAA5] leading-relaxed">
                Members verify their accounts through real-time selfie posture
                matching and national identity checks to eliminate fake
                profiles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1110] border border-[#272D2A]">
              <div className="w-12 h-12 rounded-xl bg-[#D99A52]/15 flex items-center justify-center text-[#D99A52] mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-2">
                Private & Controlled Chat
              </h3>
              <p className="text-xs sm:text-sm text-[#A8AAA5] leading-relaxed">
                Only mutual matches can initiate conversations. Unsolicited
                messages, financial solicitations, and harassment are barred by
                design.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1110] border border-[#272D2A]">
              <div className="w-12 h-12 rounded-xl bg-[#D85B7A]/15 flex items-center justify-center text-[#D85B7A] mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-2">
                Intentional Matching
              </h3>
              <p className="text-xs sm:text-sm text-[#A8AAA5] leading-relaxed">
                Filter and match by explicit life goals—whether you are seeking
                marriage, a serious partnership, or authentic companionship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D99A52]">
              Simple & Dignified
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
              How JamboDate Works
            </h2>
            <p className="text-sm text-[#A8AAA5] mt-2">
              From creating your profile to sharing a quiet cup of coffee in
              Nairobi or Nyali.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#151A18] border border-[#272D2A] flex items-center justify-center text-lg font-extrabold text-[#F5F3EF] mb-4 shadow-sm">
                1
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-1.5">
                Share Your Journey
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Set your relationship intention, hobbies, lifestyle choices, and
                upload authentic portraits.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#151A18] border border-[#272D2A] flex items-center justify-center text-lg font-extrabold text-[#F5F3EF] mb-4 shadow-sm">
                2
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-1.5">
                Verify Your Identity
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Gain the green verification badge to build trust and increase
                compatibility matches by 3x.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#151A18] border border-[#272D2A] flex items-center justify-center text-lg font-extrabold text-[#F5F3EF] mb-4 shadow-sm">
                3
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-1.5">
                Discover Compatible Singles
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Explore thoughtfully matched profiles in Nairobi, Mombasa,
                Kisumu, Eldoret, and beyond.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#151A18] border border-[#272D2A] flex items-center justify-center text-lg font-extrabold text-[#F5F3EF] mb-4 shadow-sm">
                4
              </div>
              <h3 className="text-base font-bold text-[#F5F3EF] mb-1.5">
                Connect With Purpose
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                When mutual interest is shared, unlock private messaging and
                plan safe public dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-20 bg-[#151A18]/50 border-t border-[#272D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D85B7A]">
                Real Members
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F3EF] mt-1">
                Meet Singles on JamboDate
              </h2>
              <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
                Educated, ambitious, and genuine Kenyans seeking shared life
                values.
              </p>
            </div>
            <Link href="/discover">
              <Button variant="outline" size="sm">
                Explore All Profiles <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((profile) => (
              <div
                key={profile.id}
                className="rounded-2xl overflow-hidden bg-[#151A18] border border-[#272D2A] shadow-lg flex flex-col group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0D1110]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={filterRealPhotos(profile.photos || [])[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <VerificationBadge status={profile.verificationStatus} />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0D1110] via-[#0D1110]/80 to-transparent">
                    <p className="text-base font-bold text-[#F5F3EF]">
                      {profile.name}, {profile.age}
                    </p>
                    <p className="text-xs text-[#A8AAA5] truncate">
                      {profile.location.split("(")[0]}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <Badge variant="gold" size="sm" className="w-fit mb-2">
                    {profile.relationshipIntention}
                  </Badge>
                  <p className="text-xs text-[#A8AAA5] line-clamp-2 mb-3">
                    {profile.bio}
                  </p>
                  <Link href={`/login?redirect=/discover`}>
                    <Button
                      variant="surface"
                      size="sm"
                      className="w-full text-xs"
                    >
                      View on JamboDate
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relationship Intentions Section */}
      <section id="intentions" className="py-20 border-t border-[#272D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D99A52]">
              Clarity From Day One
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
              Match by Shared Intentions
            </h2>
            <p className="text-sm text-[#A8AAA5] mt-2">
              No guessing games. Connect only with people whose life vision
              aligns with yours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] hover:border-[#D99A52]/50 transition-colors">
              <Badge variant="gold" size="sm" className="mb-4">
                Marriage
              </Badge>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-2">
                Long-Term Union
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                For singles seeking a lifelong partner to build a shared family,
                legacy, and home in Kenya.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] hover:border-[#D85B7A]/50 transition-colors">
              <Badge variant="rose" size="sm" className="mb-4">
                Serious Relationship
              </Badge>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-2">
                Committed Partnership
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Exclusive dating focused on mutual emotional support,
                intentional growth, and shared dreams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] hover:border-[#3FAF72]/50 transition-colors">
              <Badge variant="green" size="sm" className="mb-4">
                Dating
              </Badge>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-2">
                Authentic Dating
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Open to exploring romance and compatibility with thoughtful
                dates without rushing the process.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] hover:border-[#F5F3EF]/30 transition-colors">
              <Badge variant="default" size="sm" className="mb-4">
                Friendship
              </Badge>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-2">
                Meaningful Company
              </h3>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Expanding your social circle with principled individuals for
                hiking, art, and intellectual conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section
        id="safety"
        className="py-20 bg-[#151A18] border-t border-[#272D2A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3FAF72]">
                Your Peace of Mind
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2 mb-4">
                Kenyan Dating Safety, Handled With Care
              </h2>
              <p className="text-sm text-[#A8AAA5] leading-relaxed mb-6">
                From emergency helpline integrations to safe public meeting
                guides in Nairobi and Mombasa, JamboDate prioritizes your safety
                before, during, and after every interaction.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#3FAF72]/20 text-[#3FAF72] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3EF]">
                      Proactive Moderation
                    </h4>
                    <p className="text-xs text-[#A8AAA5]">
                      Suspicious activity, financial fraud, and inappropriate
                      content result in instant bans.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#3FAF72]/20 text-[#3FAF72] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3EF]">
                      Strict 18+ Verification
                    </h4>
                    <p className="text-xs text-[#A8AAA5]">
                      Underage accounts are strictly blocked during onboarding
                      with automated verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#3FAF72]/20 text-[#3FAF72] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F3EF]">
                      In-App Incident Reporting
                    </h4>
                    <p className="text-xs text-[#A8AAA5]">
                      One-tap blocking and direct escalation to our
                      Nairobi-based trust team.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/safety">
                <Button variant="surface" size="md">
                  Explore JamboDate Safety Center{" "}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-[#0D1110] border border-[#272D2A] space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#272D2A]">
                <PhoneCall className="w-5 h-5 text-[#3FAF72]" />
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3EF]">
                    Kenyan Emergency Helplines
                  </h4>
                  <p className="text-xs text-[#A8AAA5]">
                    Integrated directly into member settings
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#151A18] border border-[#272D2A]">
                  <p className="text-[#A8AAA5]">GBV Toll-Free</p>
                  <p className="text-base font-bold text-[#F5F3EF] mt-0.5">
                    1195
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#151A18] border border-[#272D2A]">
                  <p className="text-[#A8AAA5]">Police Hotline</p>
                  <p className="text-base font-bold text-[#F5F3EF] mt-0.5">
                    999 / 112
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Always meet first in reputable, well-lit public venues—like
                Artcaffe, Java House, or Karura Forest cafe—and notify a trusted
                friend of your location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boost Visibility Packages Section */}
      <section id="boost" className="py-20 border-t border-[#272D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D85B7A]">
              Get Discovered
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
              Boost Your Visibility
            </h2>
            <p className="text-sm text-[#A8AAA5] mt-2">
              Stand out in discovery search and get seen by more compatible
              singles. Priced in KES with M-Pesa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 1 Day Boost */}
            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col text-center">
              <div className="w-12 h-12 rounded-xl bg-[#D85B7A]/15 flex items-center justify-center text-[#D85B7A] mb-4 mx-auto">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-1">
                1 Day Boost
              </h3>
              <p className="text-xs text-[#A8AAA5] mb-4">
                A single-day spike in visibility — ideal for high-traffic
                evenings.
              </p>
              <div className="text-2xl font-extrabold text-[#F5F3EF] mb-4">
                KES 100
              </div>
              <ul className="space-y-2 text-xs text-[#A8AAA5] mb-6 flex-1">
                <li>25x discovery ranking boost</li>
                <li>Priority placement in feeds</li>
                <li>Real-time profile spotlight</li>
              </ul>
              <Link href="/premium" className="mt-auto">
                <Button variant="surface" size="sm" className="w-full">
                  Boost Now
                </Button>
              </Link>
            </div>

            {/* 1 Week Boost — Recommended */}
            <div className="relative p-6 rounded-2xl bg-[#151A18] border-2 border-[#D99A52]/60 shadow-xl shadow-[#D99A52]/5 flex flex-col text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D99A52] text-[#0D1110] text-[11px] font-bold uppercase tracking-wider">
                Most Popular
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#D99A52]/15 flex items-center justify-center text-[#D99A52] mb-4 mx-auto">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-1">
                1 Week Boost
              </h3>
              <p className="text-xs text-[#A8AAA5] mb-4">
                Our most popular plan — consistent top placement all week.
              </p>
              <div className="text-2xl font-extrabold text-[#F5F3EF] mb-4">
                KES 500
              </div>
              <ul className="space-y-2 text-xs text-[#A8AAA5] mb-6 flex-1">
                <li>25x discovery ranking boost</li>
                <li>Priority placement in feeds</li>
                <li>Real-time profile spotlight</li>
                <li>Daily feature notifications</li>
              </ul>
              <Link href="/premium" className="mt-auto">
                <Button variant="gold" size="sm" className="w-full">
                  Boost Now
                </Button>
              </Link>
            </div>

            {/* 1 Month Boost */}
            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#3FAF72]/40 flex flex-col text-center">
              <div className="w-12 h-12 rounded-xl bg-[#3FAF72]/15 flex items-center justify-center text-[#3FAF72] mb-4 mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F3EF] mb-1">
                1 Month Boost
              </h3>
              <p className="text-xs text-[#A8AAA5] mb-4">
                Maximum exposure with priority placement for a full month.
              </p>
              <div className="text-2xl font-extrabold text-[#F5F3EF] mb-4">
                KES 1,500
              </div>
              <ul className="space-y-2 text-xs text-[#A8AAA5] mb-6 flex-1">
                <li>25x discovery ranking boost</li>
                <li>Priority placement in feeds</li>
                <li>Real-time profile spotlight</li>
                <li>Daily feature notifications</li>
                <li>Exclusive "Hot Profile" badge</li>
              </ul>
              <Link href="/premium" className="mt-auto">
                <Button variant="surface" size="sm" className="w-full">
                  Boost Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Preview Section - temporarily disabled
      <section id="premium" className="py-20 border-t border-[#272D2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D99A52]">
              Enhanced Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
              Upgrade with JamboDate Gold & Plus
            </h2>
            <p className="text-sm text-[#A8AAA5] mt-2">
              Priced reasonably in Kenya Shillings (KES) with seamless M-Pesa compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#151A18] border border-[#272D2A] flex flex-col justify-between">
              <div>
                <Badge variant="outline" size="sm" className="mb-4">
                  JamboDate Plus
                </Badge>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-[#F5F3EF]">KES 499</span>
                  <span className="text-xs text-[#A8AAA5]">/ month</span>
                </div>
                <p className="text-xs text-[#A8AAA5] mb-6">
                  Essential tools for active singles looking to broaden their reach.
                </p>
                <ul className="space-y-3 text-xs text-[#F5F3EF] mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FAF72]" /> Unlimited daily likes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FAF72]" /> Rewind accidental passes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FAF72]" /> County location passport
                  </li>
                </ul>
              </div>
              <Link href="/premium">
                <Button variant="outline" size="md" className="w-full">
                  Choose Plus
                </Button>
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-[#151A18] border-2 border-[#D99A52]/60 shadow-xl shadow-[#D99A52]/5 flex flex-col justify-between relative">
              <span className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-[#D99A52] text-[#0D1110] text-[11px] font-bold uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="gold" size="sm">
                    JamboDate Gold
                  </Badge>
                  <Crown className="w-4 h-4 text-[#D99A52]" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-[#F5F3EF]">KES 950</span>
                  <span className="text-xs text-[#A8AAA5]">/ month</span>
                </div>
                <p className="text-xs text-[#A8AAA5] mb-6">
                  Maximum visibility, see who liked you, and priority match introductions.
                </p>
                <ul className="space-y-3 text-xs text-[#F5F3EF] mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D99A52]" /> See who already liked you
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D99A52]" /> 5 Super Connects per week
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D99A52]" /> 1 Free Profile Boost per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D99A52]" /> Priority verification queue
                  </li>
                </ul>
              </div>
              <Link href="/premium">
                <Button variant="gold" size="md" className="w-full">
                  Get JamboDate Gold
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 bg-[#151A18]/50 border-t border-[#272D2A]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8AAA5]">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#151A18] border border-[#272D2A]">
              <h4 className="text-sm font-semibold text-[#F5F3EF] mb-1.5">
                How does JamboDate differ from conventional dating apps?
              </h4>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                JamboDate is crafted specifically for Kenyan singles seeking
                meaningful relationships, marriage, or genuine companionship. We
                require explicit relationship intentions, prioritize verified
                profiles, and maintain strict standards against scams and hookup
                culture.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151A18] border border-[#272D2A]">
              <h4 className="text-sm font-semibold text-[#F5F3EF] mb-1.5">
                Is JamboDate free to join?
              </h4>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Yes! Creating an account, getting verified, discovering
                profiles, matching, and messaging are completely free. Optional
                premium memberships offer convenience features like seeing who
                liked you or extra boosts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151A18] border border-[#272D2A]">
              <h4 className="text-sm font-semibold text-[#F5F3EF] mb-1.5">
                How does identity verification work?
              </h4>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                You can take a quick in-app selfie mirroring a specific gesture.
                Our moderation team reviews the selfie against your uploaded
                photos to grant the verified badge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151A18] border border-[#272D2A]">
              <h4 className="text-sm font-semibold text-[#F5F3EF] mb-1.5">
                What age group is JamboDate designed for?
              </h4>
              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                JamboDate is strictly for adults aged 18 and older. Our primary
                demographic includes young professionals, career builders, and
                mature Kenyan singles ready for intentional dating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Bottom CTA */}
      <section className="py-20 border-t border-[#272D2A] relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F3EF] mb-4">
            Your Meaningful Kenyan Connection Awaits
          </h2>
          <p className="text-sm sm:text-base text-[#A8AAA5] max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of authentic Kenyan singles who value respect, shared
            dreams, and lasting relationships.
          </p>
          <Link href="/register">
            <Button variant="primary" size="lg" className="text-base px-8">
              Create Free Profile
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#272D2A] bg-[#0A0D0C] py-12 text-[#A8AAA5] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#D85B7A] flex items-center justify-center text-[#0D1110] font-bold text-xs">
              M
            </div>
            <span className="font-bold text-sm text-[#F5F3EF]">
              JamboDate Kenya
            </span>
            <span className="text-[#A8AAA5]">
              — Real people. Meaningful connections.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/safety"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              Safety Center
            </Link>
            <Link
              href="/verification"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              Verification
            </Link>
            <Link
              href="/premium"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              JamboDate Gold
            </Link>
            <Link
              href="/login"
              className="hover:text-[#F5F3EF] transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p>
            © {new Date().getFullYear()} JamboDate Technologies Ltd. Nairobi,
            Kenya.
          </p>
        </div>
      </footer>
    </div>
  );
}
