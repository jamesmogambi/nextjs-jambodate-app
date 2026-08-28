import React from 'react';
import { AlertCircle, RefreshCw, FolderSearch, HeartOff } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export function LoadingState({
  message = 'Loading JamboDate...',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center', className)}>
      <div className="relative w-12 h-12 mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#272D2A] border-t-[#D85B7A] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#D85B7A]">
          M
        </div>
      </div>
      <p className="text-sm font-medium text-[#A8AAA5] animate-pulse">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Check back later or adjust your preferences to see more.',
  actionLabel,
  onAction,
  icon: Icon = HeartOff,
  className,
  id = 'empty-state',
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn('flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-[#272D2A] bg-[#151A18]/60', className)}>
      <div className="w-14 h-14 rounded-2xl bg-[#1B211E] border border-[#272D2A] flex items-center justify-center text-[#A8AAA5] mb-4">
        <Icon className="w-6 h-6 text-[#D85B7A]" />
      </div>
      <h3 className="text-lg font-semibold text-[#F5F3EF] mb-1.5">{title}</h3>
      <p className="text-sm text-[#A8AAA5] max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error while loading data. Please try again.',
  onRetry,
  className,
  id = 'error-state',
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn('flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-red-500/20 bg-red-500/5', className)}>
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#F5F3EF] mb-1">{title}</h3>
      <p className="text-xs text-[#A8AAA5] max-w-xs mb-4">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="surface" size="sm">
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Try Again
        </Button>
      )}
    </div>
  );
}
