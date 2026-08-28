import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  helperText,
  required,
  id,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#A8AAA5] flex items-center justify-between">
        <span>
          {label} {required && <span className="text-[#D85B7A]">*</span>}
        </span>
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[#A8AAA5]/80 mt-0.5">{helperText}</p>
      )}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] text-[#F5F3EF] placeholder:text-[#A8AAA5]/50 focus:outline-none focus:border-[#D85B7A] focus:ring-1 focus:ring-[#D85B7A] transition-all text-sm',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] text-[#F5F3EF] placeholder:text-[#A8AAA5]/50 focus:outline-none focus:border-[#D85B7A] focus:ring-1 focus:ring-[#D85B7A] transition-all text-sm resize-none',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-xl bg-[#0D1110] border border-[#272D2A] text-[#F5F3EF] focus:outline-none focus:border-[#D85B7A] focus:ring-1 focus:ring-[#D85B7A] transition-all text-sm cursor-pointer',
          className
        )}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#151A18] text-[#F5F3EF]">
                {opt.label}
              </option>
            ))
          : children}
      </select>
    );
  }
);
Select.displayName = 'Select';
