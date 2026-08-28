import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'rose' | 'gold' | 'green' | 'outline' | 'surface';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#272D2A] text-[#F5F3EF] border-transparent font-medium',
    rose: 'bg-[#D85B7A]/20 text-[#D85B7A] border-[#D85B7A]/30 font-semibold',
    gold: 'bg-[#D99A52]/20 text-[#D99A52] border-[#D99A52]/30 font-semibold',
    green: 'bg-[#3FAF72]/20 text-[#3FAF72] border-[#3FAF72]/30 font-bold',
    outline: 'border-[#272D2A] text-[#A8AAA5] font-medium',
    surface: 'bg-[#151A18] text-[#F5F3EF] border-[#272D2A] font-medium',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-xs sm:text-sm font-medium',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
