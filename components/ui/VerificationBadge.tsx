import React from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { VerificationStatus } from '@/types';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showText?: boolean;
  className?: string;
}

export function VerificationBadge({
  status,
  showText = false,
  className,
}: VerificationBadgeProps) {
  if (status === 'unverified') return null;

  if (status === 'pending') {
    return (
      <span
        title="Verification pending review"
        className={cn(
          'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#D99A52]/10 text-[#D99A52] border border-[#D99A52]/30',
          className
        )}
      >
        <Clock className="w-3.5 h-3.5" />
        {showText && <span>Verification Pending</span>}
      </span>
    );
  }

  if (status === 'verified') {
    return (
      <span
        title="Verified Authentic Profile"
        className={cn(
          'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#3FAF72]/15 text-[#3FAF72] border border-[#3FAF72]/30 font-medium',
          className
        )}
      >
        <ShieldCheck className="w-3.5 h-3.5 fill-[#3FAF72]/20" />
        {showText && <span>Verified Kenyan Single</span>}
      </span>
    );
  }

  return null;
}
