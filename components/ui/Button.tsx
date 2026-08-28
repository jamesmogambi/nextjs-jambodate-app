import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'green' | 'outline' | 'ghost' | 'surface' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, id, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-[#D85B7A] text-white font-bold hover:bg-[#c04a68] active:bg-[#b0405c] shadow-lg shadow-[#D85B7A]/20 transition-colors',
      gold: 'bg-[#D99A52] text-[#0D1110] font-bold hover:bg-[#C88A42] active:bg-[#B77B34] shadow-md shadow-[#D99A52]/20 transition-colors',
      green: 'bg-[#3FAF72] text-[#0D1110] font-bold hover:bg-[#349962] active:bg-[#2C8554] shadow-md shadow-[#3FAF72]/20 transition-colors',
      outline: 'border border-[#272D2A] bg-[#151A18] text-[#F5F3EF] hover:bg-[#1B211E] hover:border-[#3A423E] transition-colors',
      ghost: 'bg-transparent text-[#A8AAA5] hover:text-[#F5F3EF] hover:bg-[#151A18] transition-colors',
      surface: 'bg-[#151A18] border border-[#272D2A] text-[#F5F3EF] hover:bg-[#1B211E] hover:border-[#3A423E] transition-colors',
      destructive: 'bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-colors',
    };

    // Horizontal padding is exactly 2x vertical padding per design guidelines
    const sizeStyles = {
      sm: 'py-1.5 px-3 text-xs rounded-lg',
      md: 'py-2.5 px-5 text-sm rounded-xl',
      lg: 'py-3.5 px-7 text-base font-bold rounded-2xl',
      icon: 'p-2.5 rounded-full aspect-square flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        id={id}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
