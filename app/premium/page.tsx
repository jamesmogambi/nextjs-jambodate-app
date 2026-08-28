'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Zap,
  RotateCcw,
  Eye,
  Heart,
  ArrowRight,
  X,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { FormField, Input } from '@/components/ui/FormField';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { SubscriptionTier } from '@/types';

export default function PremiumPage() {
  const { currentUser, updateProfile } = useAuth();
  const { toast } = useToast();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier | null>(null);
  const [mpesaPhone, setMpesaPhone] = useState('+254 712 345 678');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const currentTier = currentUser?.subscriptionTier || 'free';

  const handleSelectPlan = (tier: SubscriptionTier) => {
    if (tier === 'free') return;
    setSelectedPlan(tier);
  };

  const handleMpesaCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsProcessingPayment(true);
    // Simulate realistic M-Pesa STK push response
    setTimeout(() => {
      setIsProcessingPayment(false);
      updateProfile({ subscriptionTier: selectedPlan });
      setSelectedPlan(null);
      setIsSuccessModalOpen(true);
      toast(`M-Pesa payment received! You are now on JamboDate ${selectedPlan.toUpperCase()}.`, 'success');
    }, 1800);
  };

  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Free Member',
      priceMonthly: 'KES 0',
      priceQuarterly: 'KES 0',
      description: 'Essential features for intentional Kenyan singles.',
      features: [
        '30 daily discovery likes',
        'Direct messaging with mutual matches',
        'Standard identity verification request',
        'Basic county and age filters',
      ],
      badge: 'Free Tier',
      buttonText: currentTier === 'free' ? 'Current Plan' : 'Standard',
      buttonVariant: 'outline' as const,
      disabled: currentTier === 'free',
    },
    {
      id: 'plus' as SubscriptionTier,
      name: 'JamboDate Plus',
      priceMonthly: 'KES 499',
      priceQuarterly: 'KES 1,299',
      description: 'Accelerate connections with unlimited reach.',
      features: [
        'Unlimited discovery likes',
        'Rewind accidental passes',
        'County location passport',
        'Turn off public active status',
        'No advertisements or sponsored items',
      ],
      badge: 'Great Value',
      buttonText: currentTier === 'plus' ? 'Current Plan' : 'Get JamboDate Plus',
      buttonVariant: 'outline' as const,
      disabled: currentTier === 'plus',
    },
    {
      id: 'gold' as SubscriptionTier,
      name: 'JamboDate Gold',
      priceMonthly: 'KES 950',
      priceQuarterly: 'KES 2,490',
      description: 'Our most popular tier for serious relationship seekers.',
      features: [
        'See who already liked your profile',
        '5 Super Connect notes per week',
        '1 Free monthly Profile Boost',
        'Priority queue for identity verification',
        'All JamboDate Plus features included',
      ],
      badge: 'Most Popular',
      popular: true,
      buttonText: currentTier === 'gold' ? 'Current Plan' : 'Get JamboDate Gold',
      buttonVariant: 'gold' as const,
      disabled: currentTier === 'gold',
    },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D99A52]/15 border border-[#D99A52]/30 text-xs font-semibold text-[#E5AF72]">
            <Crown className="w-3.5 h-3.5" /> Premium Kenyan Memberships
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F3EF] tracking-tight">
            Connect Faster With JamboDate Gold
          </h1>
          <p className="text-sm text-[#A8AAA5] leading-relaxed">
            Thoughtfully priced for the Kenyan market with instant Safaricom M-Pesa integration.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#151A18] border border-[#272D2A] mt-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-[#272D2A] text-[#F5F3EF]'
                  : 'text-[#A8AAA5] hover:text-[#F5F3EF]'
              }`}
            >
              <span>3 Months</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#3FAF72]/20 text-[#3FAF72]">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#18201C] border-2 border-[#D99A52] shadow-2xl shadow-[#D99A52]/10 scale-102'
                  : 'bg-[#151A18] border border-[#272D2A]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#D99A52] text-[#0D1110] text-[10px] font-extrabold uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#F5F3EF]">{plan.name}</h3>
                  <Badge variant={plan.popular ? 'gold' : 'surface'} size="sm">
                    {plan.badge}
                  </Badge>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-extrabold text-[#F5F3EF]">
                    {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceQuarterly}
                  </span>
                  <span className="text-xs text-[#A8AAA5]">
                    {billingCycle === 'monthly' ? '/ mo' : '/ 3 mo'}
                  </span>
                </div>

                <p className="text-xs text-[#A8AAA5] mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-3 mb-8 text-xs text-[#F5F3EF]">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.popular ? 'text-[#D99A52]' : 'text-[#3FAF72]'
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={plan.buttonVariant}
                size="md"
                className="w-full"
                disabled={plan.disabled}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Kenyan M-Pesa Trust Assurance */}
        <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3FAF72]/20 flex items-center justify-center text-[#3FAF72] shrink-0 font-bold">
              MP
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F3EF]">
                Direct M-Pesa STK Push
              </h4>
              <p className="text-xs text-[#A8AAA5]">
                No credit card required. Fast, secure mobile money debit directly through Safaricom.
              </p>
            </div>
          </div>
          <Badge variant="green" size="sm">
            Instant Activation
          </Badge>
        </div>
      </div>

      {/* M-Pesa STK Push Payment Modal */}
      {selectedPlan && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          title={`Upgrade to JamboDate ${selectedPlan.toUpperCase()}`}
          description="Confirm payment using Safaricom M-Pesa mobile money."
          maxWidth="sm"
        >
          <form onSubmit={handleMpesaCheckout} className="space-y-4 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center justify-between text-xs">
              <span className="text-[#A8AAA5]">Amount to pay:</span>
              <span className="text-base font-bold text-[#D99A52]">
                {selectedPlan === 'gold' ? 'KES 950' : 'KES 499'}
              </span>
            </div>

            <FormField
              label="Safaricom M-Pesa Phone"
              id="mpesa-number"
              required
              helperText="An STK prompt will appear on your Safaricom phone to enter M-Pesa PIN."
            >
              <div className="relative">
                <Input
                  id="mpesa-number"
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="pl-9 font-mono"
                  required
                />
                <Phone className="w-4 h-4 text-[#3FAF72] absolute left-3 top-3" />
              </div>
            </FormField>

            <Button
              type="submit"
              variant="green"
              size="lg"
              className="w-full mt-2"
              isLoading={isProcessingPayment}
            >
              Send M-Pesa STK Push Prompt
            </Button>
          </form>
        </Modal>
      )}

      {/* Success Celebration Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Welcome to JamboDate Gold!"
        maxWidth="sm"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D99A52]/20 text-[#D99A52] flex items-center justify-center mx-auto">
            <Crown className="w-8 h-8" />
          </div>
          <p className="text-sm text-[#A8AAA5]">
            Your account has been upgraded. You now enjoy priority discovery visibility and full insights.
          </p>
          <Button
            variant="gold"
            size="md"
            className="w-full"
            onClick={() => setIsSuccessModalOpen(false)}
          >
            Start Exploring
          </Button>
        </div>
      </Modal>
    </AppShell>
  );
}
