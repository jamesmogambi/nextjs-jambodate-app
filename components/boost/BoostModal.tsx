'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Crown, Phone, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FormField, Input } from '@/components/ui/FormField';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { trackEvent } from '@/lib/analytics';
import { BOOST_PLANS, RECOMMENDED_BOOST_PLAN_ID } from '@/lib/boost/config';
import { isBoostActive, getBoostStatus } from '@/lib/boost/boostUtils';
import type { BoostPlan, BoostPlanId } from '@/lib/boost/types';
import type { UserProfile } from '@/types';

const PAYMENT_POLL_INTERVAL_MS = 1500;
const PAYMENT_POLL_TIMEOUT_MS = 90000;

export interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BoostStep = 'select' | 'checkout' | 'processing';

export function BoostModal({ isOpen, onClose }: BoostModalProps) {
  const { currentUser, getIdToken, firebaseUser } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<BoostStep>('select');
  const [selectedPlan, setSelectedPlan] = useState<BoostPlan | null>(null);
  const [phone, setPhone] = useState('+254 712 345 678');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('select');
      setSelectedPlan(null);
      setPaymentId(null);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const alreadyActive = currentUser ? isBoostActive(currentUser.boostActive, currentUser.boostExpiresAt) : false;

  const handleSelectPlan = (plan: BoostPlan) => {
    setSelectedPlan(plan);
    setError(null);
    trackEvent('boost_plan_selected', { planId: plan.id, price: plan.price });
    setStep('checkout');
  };

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setError(null);

    const idToken = await getIdToken();
    if (!idToken) {
      setError('You must be signed in to purchase a boost.');
      toast('Sign in to boost your profile.', 'error');
      return;
    }

       setStep('processing');
    setIsSubmitting(true);
    trackEvent('boost_payment_started', { userId: currentUser?.id, planId: selectedPlan.id });

    try {
      const res = await fetch('/api/boost/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          phoneNumber: phone,
          idToken,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        const msg = data.error || 'Unable to start the boost payment.';
        setError(msg);
        toast(msg, 'error');
        trackEvent('boost_payment_failed', { planId: selectedPlan.id, error: msg });
        setStep('checkout');
        setIsSubmitting(false);
        return;
      }
      setPaymentId(data.paymentId);

      // Poll the confirm endpoint for payment confirmation / activation.
      pollConfirm(idToken, data.paymentId, selectedPlan);
    } catch (err) {
      const msg = 'Network error starting boost payment. Please try again.';
      setError(msg);
      toast(msg, 'error');
      trackEvent('boost_payment_failed', { planId: selectedPlan.id, error: msg });
      setStep('checkout');
      setIsSubmitting(false);
    }
  };

  const pollConfirm = useCallback(
    async (idToken: string, pid: string, plan: BoostPlan) => {
      const startedAt = Date.now();
      const check = async () => {
        try {
          const res = await fetch('/api/boost/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: pid, idToken }),
          });
          const data = await res.json();
          if (!data.ok) {
            throw new Error(data.error || 'Verification failed');
          }
          if (data.activated) {
            trackEvent('boost_payment_success', { planId: plan.id });
            trackEvent('boost_activated', { planId: plan.id, userId: currentUser?.id });
            toast(`🔥 Boost active! Your profile now gets priority visibility.`, 'success');
            onClose();
          } else if (data.status === 'failed' || data.status === 'cancelled') {
            throw new Error('Payment was not completed.');
          } else {
            // pending → keep polling
            if (Date.now() - startedAt < PAYMENT_POLL_TIMEOUT_MS) {
              setTimeout(check, PAYMENT_POLL_INTERVAL_MS);
            } else {
              throw new Error('Payment verification timed out. Please check your M-Pesa STK prompt or contact support.');
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Payment verification failed';
          setError(msg);
          toast(msg, 'error');
          trackEvent('boost_payment_failed', { planId: plan.id, error: msg });
          setStep('checkout');
        }
      };
      check();
     }, [currentUser?.id, onClose, toast]
  );

  if (alreadyActive && currentUser) {
    const status = getBoostStatus(
      currentUser.boostActive,
      currentUser.boostPlan,
      currentUser.boostStartedAt,
      currentUser.boostExpiresAt
    );
    const expiresAt = status.expiresAt ? status.expiresAt.toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) : '—';
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="🔥 Boost Active" maxWidth="sm">
        <div className="text-center py-2 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D99A52]/20 text-[#D99A52] flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7 fill-[#D99A52]/20" />
          </div>
          <p className="text-sm text-[#A8AAA5]">
            Your profile is currently getting increased visibility in Discovery.
          </p>
          <p className="text-xs text-[#F5F3EF]/80">Expires: {expiresAt}</p>
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🔥 Boost Your Profile"
      description="Get more visibility and increase your chances of getting matches."
      maxWidth="3xl"
    >
      <div className="pt-2 space-y-5">
        {/* Step: Plan Selection */}
        {step === 'select' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BOOST_PLANS.map((plan) => {
              const isRecommended = plan.id === RECOMMENDED_BOOST_PLAN_ID;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border p-6 flex flex-col text-center transition-all ${
                    isRecommended
                      ? 'bg-[#18201C] border-2 border-[#D99A52] shadow-2xl shadow-[#D99A52]/10'
                      : 'bg-[#151A18] border-[#272D2A] hover:border-[#3A423E]'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#D99A52] text-[#0D1110] text-[10px] font-extrabold uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[#F5F3EF] capitalize">
                    {plan.name.replace('_', ' ')}
                  </h3>
                  <p className="text-xs text-[#A8AAA5] mt-1">{plan.description}</p>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-[#F5F3EF]">KSh {plan.price.toLocaleString()}</span>
                    <span className="text-xs text-[#A8AAA5]"> / {plan.durationDays === 1 ? 'day' : plan.durationDays === 7 ? 'week' : 'month'}</span>
                  </div>
                  <Badge variant={isRecommended ? 'gold' : 'surface'} size="sm" className="mt-2">
                    {isRecommended ? 'Most Popular' : 'Standard'}
                  </Badge>
                  <Button
                    variant={isRecommended ? 'gold' : 'outline'}
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={!firebaseUser}
                  >
                    {plan.durationDays === 7 ? 'Boost Now' : 'Boost'}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Step: Checkout */}
        {step === 'checkout' && selectedPlan && (
          <form onSubmit={handleInitiate} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] flex items-center justify-between">
              <div className="text-xs text-[#A8AAA5]">
                <span className="text-[#F5F3EF] font-semibold">Plan:</span> {selectedPlan.name.replace('_', ' ')} · KSh {selectedPlan.price.toLocaleString()}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep('select')}
              >
                Change
              </Button>
            </div>

            <FormField label="Safaricom M-Pesa Phone" id="boost-mpesa" required helperText="An STK push prompt will appear on your phone to enter your M-Pesa PIN." error={error || undefined}>
              <div className="relative">
                <Input
                  id="boost-mpesa"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 font-mono"
                  required
                />
                <Phone className="w-4 h-4 text-[#3FAF72] absolute left-3 top-3" />
              </div>
            </FormField>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              <Sparkles className="w-4 h-4" /> Pay KSh {selectedPlan.price.toLocaleString()} &amp; Boost
            </Button>
          </form>
        )}

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="text-center py-6 space-y-4">
            <Loader2 className="w-7 h-7 text-[#D99A52] animate-spin mx-auto" />
            <p className="text-sm text-[#F5F3EF] font-medium">Processing your boost payment…</p>
            <p className="text-xs text-[#A8AAA5]">
              {selectedPlan
                ? `Confirm your ${selectedPlan.name.replace('_', ' ')} (KSh ${selectedPlan.price.toLocaleString()}) on M-Pesa.`
                : 'Waiting for payment confirmation.'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
