'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  Lock,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Users,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function SafetyCenterPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-4 border-b border-[#272D2A]">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-[#3FAF72]/20 text-[#3FAF72]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3FAF72]">
              JamboDate Trust & Safety
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight">
            Safety Center & Kenyan Dating Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1">
            Empowering genuine connections while protecting your privacy, dignity, and wellbeing.
          </p>
        </div>

        {/* Emergency Contact Quick Access */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500/15 via-[#151A18] to-[#151A18] border border-red-500/30 space-y-4">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-base font-bold text-red-300">
                Kenyan Emergency Hotlines
              </h3>
              <p className="text-xs text-[#A8AAA5]">
                If you ever feel unsafe or require immediate assistance, these national hotlines are free and active 24/7.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
              <p className="text-[#A8AAA5]">National Police Hotline</p>
              <p className="text-lg font-bold text-[#F5F3EF] mt-0.5">999 or 112</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
              <p className="text-[#A8AAA5]">Gender-Based Violence Helpline</p>
              <p className="text-lg font-bold text-[#3FAF72] mt-0.5">1195 (Toll-Free)</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
              <p className="text-[#A8AAA5]">Child Protection Helpline</p>
              <p className="text-lg font-bold text-[#D99A52] mt-0.5">116 (Toll-Free)</p>
            </div>
          </div>
        </div>

        {/* Essential Rules for Dating in Kenya */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-6">
          <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#3FAF72]" /> 5 Essential Rules for Safe Dating in Kenya
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#A8AAA5] leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] space-y-1">
              <h4 className="font-bold text-[#F5F3EF] text-sm">
                1. Meet in well-known, busy public spaces
              </h4>
              <p>
                Choose busy cafes, popular restaurants, or secure recreational areas for early dates—such as Artcaffe, Java House, CJ&apos;s, Sarit Centre, Two Rivers, or Karura Forest cafe during daytime hours. Never meet in private residences or secluded locations on early dates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] space-y-1">
              <h4 className="font-bold text-[#F5F3EF] text-sm">
                2. Never send money or M-Pesa deposits
              </h4>
              <p>
                Legitimate singles will never ask you to send bus fare, cab money, medical assistance, or emergency cash before meeting. Anyone asking for money or soliciting investments is a scammer. Block and report them immediately.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] space-y-1">
              <h4 className="font-bold text-[#F5F3EF] text-sm">
                3. Secure your own transport
              </h4>
              <p>
                Always have independent means to arrive and leave your date. Use reputable ride-hailing services (Uber, Bolt, Little) or your own vehicle so you remain in full control of your mobility.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] space-y-1">
              <h4 className="font-bold text-[#F5F3EF] text-sm">
                4. Inform a trusted friend or family member
              </h4>
              <p>
                Share your live location with a friend or colleague, let them know who you are meeting, where, and what time you plan to return.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D1110] border border-[#272D2A] space-y-1">
              <h4 className="font-bold text-[#F5F3EF] text-sm">
                5. Keep chats on JamboDate first
              </h4>
              <p>
                Take advantage of JamboDate&apos;s protected messaging before exchanging personal WhatsApp numbers or social media profiles. Our safety team can only monitor behavior within our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Zero Tolerance Policy */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
          <h2 className="text-lg font-bold text-[#F5F3EF] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#D99A52]" /> Zero Tolerance Violations
          </h2>
          <p className="text-xs text-[#A8AAA5]">
            JamboDate immediately deactivates and permanently bans accounts involved in the following:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
              <div>
                <strong className="text-[#F5F3EF] block">Financial Solicitation & Scams</strong>
                <span className="text-[#A8AAA5]">Asking for M-Pesa funds, loan guarantees, or crypto schemes.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
              <div>
                <strong className="text-[#F5F3EF] block">Harassment & Hate Speech</strong>
                <span className="text-[#A8AAA5]">Threatening, abusive, or culturally derogatory messages.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
              <div>
                <strong className="text-[#F5F3EF] block">Underage Usage (Under 18)</strong>
                <span className="text-[#A8AAA5]">JamboDate is strictly for verified adults aged 18 and older.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
              <div>
                <strong className="text-[#F5F3EF] block">Impersonation & Stolen Photos</strong>
                <span className="text-[#A8AAA5]">Using celebrity photos, catalog pictures, or someone else&apos;s face.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification System Explanation */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#F5F3EF]">
              How the Verified Badge Works
            </h3>
            <p className="text-xs text-[#A8AAA5] mt-1">
              Every verified member completed a live selfie pose comparison and optional Kenyan identification document check.
            </p>
          </div>
          <Link href="/verification">
            <Button variant="green" size="sm">
              Apply for Verification
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
