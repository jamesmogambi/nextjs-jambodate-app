'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  Zap,
  Rocket,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BoostModal } from '@/components/boost/BoostModal';
import { useAuth } from '@/lib/context/AuthContext';
import { BOOST_PLANS, RECOMMENDED_BOOST_PLAN_ID, BOOST_PLAN_MAP } from '@/lib/boost/config';
import type { BoostPlan } from '@/lib/boost/types';
import { trackEvent } from '@/lib/analytics';
import { isBoostActive } from '@/lib/boost/boostUtils';

export default function PremiumPage() {
  const { currentUser, firebaseUser } = useAuth();
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [selectedBoostPlan, setSelectedBoostPlan] = useState<BoostPlan | null>(null);

  const boostActive = currentUser
    ? isBoostActive(currentUser.boostActive, currentUser.boostExpiresAt)
    : false;

  const handleBoost = (plan: BoostPlan) => {
    trackEvent('boost_viewed', { source: 'premium_page' });
    setSelectedBoostPlan(plan);
    setIsBoostModalOpen(true);
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D99A52]/15 border border-[#D99A52]/30 text-xs font-semibold text-[#E5AF72]">
            <Rocket className="w-3.5 h-3.5" /> Boost Your Profile
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F3EF] tracking-tight">
            Get Seen By More Singles
          </h1>
          <p className="text-sm text-[#A8AAA5] leading-relaxed">
            Thoughtfully priced for the Kenyan market. Boost your profile for 1 day, 1 week, or 1 month and get priority placement in Discovery.
          </p>

          {boostActive && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3FAF72]/15 border border-[#3FAF72]/30 text-xs font-semibold text-[#3FAF72]">
              <Sparkles className="w-3.5 h-3.5" />
              Your profile is currently boosted
            </div>
          )}
        </div>

        {/* Boost Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOOST_PLANS.map((plan) => {
            const isRecommended = plan.id === RECOMMENDED_BOOST_PLAN_ID;
            const isCurrentPlan =
              boostActive && currentUser?.boostPlan === plan.id;
            const isDisabled = !firebaseUser || isCurrentPlan;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  isRecommended
                    ? 'bg-[#18201C] border-2 border-[#D99A52] shadow-2xl shadow-[#D99A52]/10 scale-102'
                    : 'bg-[#151A18] border border-[#272D2A]'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#D99A52] text-[#0D1110] text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#F5F3EF]">{plan.name}</h3>
                    <Badge variant={isRecommended ? 'gold' : 'surface'} size="sm">
                      {isRecommended ? 'Most Popular' : 'Standard'}
                    </Badge>
                  </div>

                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-extrabold text-[#F5F3EF]">
                      KSh {plan.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#A8AAA5]">
                      / {plan.durationDays === 1 ? 'day' : plan.durationDays === 7 ? 'week' : 'month'}
                    </span>
                  </div>

                  <p className="text-xs text-[#A8AAA5] mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-8 text-xs text-[#F5F3EF]">
                    {[
                      'Priority placement in Discovery',
                      `Visible to all Kenyan singles for ${plan.durationDays} day${plan.durationDays > 1 ? 's' : ''}`,
                      isRecommended ? 'Best value — 25% discovery bonus' : '+25% match visibility',
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isRecommended ? 'text-[#D99A52]' : 'text-[#3FAF72]'
                          }`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant={isRecommended ? 'gold' : 'outline'}
                  size="md"
                  className="w-full"
                  disabled={isDisabled}
                  onClick={() => handleBoost(plan)}
                >
                  {isCurrentPlan ? 'Active Now' : isRecommended ? 'Boost Now' : 'Boost'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Kenyan M-Pesa Trust Assurance */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3FAF72]/20 flex items-center justify-center text-[#3FAF72] shrink-0 font-bold">
              MP
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F3EF]">
                Direct Safaricom M-Pesa
              </h4>
              <p className="text-xs text-[#A8AAA5]">
                No credit card required. Secure mobile money STK push with instant Kenyan network coverage.
              </p>
            </div>
          </div>
          <Badge variant="green" size="sm">
            Instant Activation
          </Badge>
        </div>
      </div>

      <BoostModal
        isOpen={isBoostModalOpen}
        onClose={() => {
          setSelectedBoostPlan(null);
          setIsBoostModalOpen(false);
        }}
        initialPlan={selectedBoostPlan ?? undefined}
      />
    </AppShell>
  );
}
