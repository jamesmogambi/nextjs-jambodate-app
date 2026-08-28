'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Camera,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

export default function VerificationPage() {
  const { currentUser, requestVerification } = useAuth();
  const { toast } = useToast();

  const [selfieUrl, setSelfieUrl] = useState<string>('');
  const [idDocUrl, setIdDocUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const samplePoses = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  ];

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelfieUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIdDocUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfieUrl) {
      toast('Please provide a verification selfie matching the requested pose.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      requestVerification(selfieUrl, idDocUrl);
      setIsSubmitting(false);
      toast('Verification submitted! Moderation review takes under 2 hours.', 'success');
    }, 800);
  };

  const status = currentUser?.verificationStatus || 'unverified';

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#272D2A]">
          <Link href="/profile" className="p-1.5 rounded-lg text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#1B211E]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EF] tracking-tight flex items-center gap-2">
              Identity Verification
              <VerificationBadge status={status} />
            </h1>
            <p className="text-xs sm:text-sm text-[#A8AAA5] mt-0.5">
              Build trust with genuine Kenyan singles.
            </p>
          </div>
        </div>

        {/* Status Callout Banner */}
        {status === 'verified' ? (
          <div className="p-6 rounded-2xl bg-[#3FAF72]/15 border border-[#3FAF72]/30 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3FAF72]/20 text-[#3FAF72] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#52C585]">
                Your Profile is Verified!
              </h3>
              <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1 leading-relaxed">
                You have the green verified single badge displayed proudly on your cards. You are featured with priority in Kenyan discovery feeds.
              </p>
            </div>
          </div>
        ) : status === 'pending' ? (
          <div className="p-6 rounded-2xl bg-[#D99A52]/15 border border-[#D99A52]/30 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D99A52]/20 text-[#D99A52] flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#E5AF72]">
                Verification In Review
              </h3>
              <p className="text-xs sm:text-sm text-[#A8AAA5] mt-1 leading-relaxed">
                Our Nairobi moderation team is reviewing your selfie against your profile pictures. Reviews typically conclude in under 2 hours.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-3">
            <h3 className="text-base font-bold text-[#F5F3EF] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D99A52]" /> Why Get Verified?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#A8AAA5] pt-1">
              <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                <p className="font-semibold text-[#F5F3EF] mb-1">3x More Matches</p>
                <p>Singles on JamboDate strongly prefer verified accounts.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                <p className="font-semibold text-[#F5F3EF] mb-1">Dating Badge</p>
                <p>Displays an authentic green trust badge on your cards.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1110] border border-[#272D2A]">
                <p className="font-semibold text-[#F5F3EF] mb-1">Fraud Shield</p>
                <p>Confirms that nobody else can impersonate your identity.</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification Form */}
        {status !== 'verified' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Live Selfie Pose */}
            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D85B7A] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-[#F5F3EF]">
                  Take or Upload a Verification Selfie
                </h3>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1110] border border-[#272D2A] text-xs text-[#A8AAA5] space-y-1">
                <p className="font-semibold text-[#F5F3EF]">Instruction Pose:</p>
                <p>Please snap a clear photo holding up a ✌️ peace sign next to your cheek. Your face must be clearly lit without sunglasses.</p>
              </div>

              {selfieUrl ? (
                <div className="relative w-48 aspect-[3/4] mx-auto rounded-2xl overflow-hidden border border-[#272D2A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selfieUrl} alt="Selfie preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setSelfieUrl('')}
                    className="absolute top-2 right-2 text-xs bg-black/70 px-2 py-1 rounded text-white hover:bg-black"
                  >
                    Retake
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#272D2A] rounded-2xl p-6 hover:border-[#3A423E] transition-colors">
                  <Camera className="w-10 h-10 text-[#D85B7A] mb-2" />
                  <p className="text-sm font-medium text-[#F5F3EF] mb-1">
                    Upload verification selfie
                  </p>
                  <p className="text-xs text-[#A8AAA5] mb-4">
                    Photo will remain private and only used for identity validation
                  </p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleSelfieUpload}
                      className="hidden"
                    />
                    <span className="px-4 py-2 rounded-xl bg-[#1B211E] border border-[#272D2A] text-xs font-medium text-[#F5F3EF] hover:bg-[#272D2A] transition-colors">
                      Choose Photo / Use Camera
                    </span>
                  </label>

                  {/* Or pick sample for quick reviewer demonstration */}
                  <div className="mt-4 pt-3 border-t border-[#272D2A] text-center">
                    <p className="text-[11px] text-[#A8AAA5] mb-1.5">Or use demo pose:</p>
                    <div className="flex gap-2 justify-center">
                      {samplePoses.map((pose, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelfieUrl(pose)}
                          className="w-10 h-10 rounded-lg overflow-hidden border border-[#272D2A] hover:border-[#3FAF72]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={pose} alt="demo" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Optional Kenyan ID Document */}
            <div className="p-6 rounded-2xl bg-[#151A18] border border-[#272D2A] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#272D2A] text-[#F5F3EF] text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-bold text-[#F5F3EF]">
                    Kenyan National ID or Passport
                  </h3>
                </div>
                <Badge variant="outline" size="sm">
                  Optional
                </Badge>
              </div>

              <p className="text-xs text-[#A8AAA5] leading-relaxed">
                Uploading your National ID document speeds up review and grants the top-tier &quot;Kenyan Citizen Verified&quot; emblem. Personal serial numbers are automatically hashed and never shared.
              </p>

              {idDocUrl ? (
                <div className="p-4 rounded-xl bg-[#0D1110] border border-[#3FAF72]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#3FAF72]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ID Document Attached</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIdDocUrl('')}
                    className="text-xs text-[#A8AAA5] hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border border-[#272D2A] rounded-xl p-4 cursor-pointer hover:bg-[#1B211E] transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleIdUpload}
                    className="hidden"
                  />
                  <FileText className="w-6 h-6 text-[#A8AAA5] mb-1" />
                  <span className="text-xs font-medium text-[#F5F3EF]">
                    Attach Kenyan National ID or Passport
                  </span>
                  <span className="text-[10px] text-[#A8AAA5]">PNG, JPG, PDF up to 10MB</span>
                </label>
              )}
            </div>

            <Button
              type="submit"
              variant="green"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              <ShieldCheck className="w-4 h-4" /> Submit for Verification
            </Button>
          </form>
        )}
      </div>
    </AppShell>
  );
}
