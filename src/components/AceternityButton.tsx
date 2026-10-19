import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export type AceternityButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export interface AceternityButtonProps {
  variant?: AceternityButtonVariant;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const AceternityButton: React.FC<AceternityButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  onClick,
  title,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const variantStyles: Record<AceternityButtonVariant, string> = {
    primary:
      'bg-[#1d1d1f] text-white hover:bg-black active:bg-neutral-900 border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]',
    secondary:
      'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200/80 active:bg-neutral-200 border border-neutral-200/90 shadow-2xs',
    outline:
      'bg-white text-[#1d1d1f] hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300/80 shadow-2xs',
    ghost:
      'bg-transparent text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-100 active:bg-neutral-200/60 border border-transparent',
    destructive:
      'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 active:bg-rose-200/80 border border-rose-200/90 shadow-2xs',
  };

  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs gap-1.5 rounded-xl',
    md: 'py-2.5 px-4 text-xs font-semibold gap-2 rounded-xl',
    lg: 'py-3 px-5 text-sm font-semibold gap-2.5 rounded-2xl',
    icon: 'p-2 rounded-xl',
  };

  return (
    <motion.button
      type={type}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none font-sans font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {isLoading && (
        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5 shrink-0" />
      )}
      {children}
    </motion.button>
  );
};

export default AceternityButton;
