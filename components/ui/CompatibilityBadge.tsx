import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompatibilityBadgeProps {
  percentage?: number;
  className?: string;
}

export function CompatibilityBadge({
  percentage = 94,
  className,
}: CompatibilityBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 bg-[#3FAF72]/20 text-[#3FAF72] backdrop-blur-md border border-[#3FAF72]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm select-none',
        className
      )}
    >
      <Sparkles className="w-3 h-3 text-[#3FAF72]" />
      <span>{percentage}% Compatible</span>
    </div>
  );
}
