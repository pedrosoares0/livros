import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, CircleX } from 'lucide-react';
import { AceternityButton, AceternityButtonVariant } from './AceternityButton';

export type CopyState = 'idle' | 'done' | 'error';

export interface CopyStateIconProps {
  state: CopyState;
  idleIcon?: React.ReactNode;
  doneIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

export const CopyStateIcon: React.FC<CopyStateIconProps> = ({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={state}
        initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.6, opacity: 0, rotate: 20 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="inline-flex items-center justify-center shrink-0"
      >
        {state === 'idle' && (idleIcon ?? <Copy className="w-3.5 h-3.5" />)}
        {state === 'done' && (doneIcon ?? <Check className="w-3.5 h-3.5 text-emerald-400" />)}
        {state === 'error' && (errorIcon ?? <CircleX className="w-3.5 h-3.5 text-rose-400" />)}
      </motion.span>
    </AnimatePresence>
  );
};

export interface CopyButtonProps {
  text: string | (() => string);
  variant?: AceternityButtonVariant;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  idleIcon?: React.ReactNode;
  doneIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  idleLabel?: string;
  doneLabel?: string;
  showLabel?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (err: Error) => void;
  children?: React.ReactNode;
  'aria-label'?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  className = '',
  idleIcon,
  doneIcon,
  errorIcon,
  idleLabel = 'Copiar',
  doneLabel = 'Copiado',
  showLabel = true,
  onCopySuccess,
  onCopyError,
  children,
  'aria-label': ariaLabel,
}) => {
  const [state, setState] = useState<CopyState>('idle');

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const content = typeof text === 'function' ? text() : text;
      await navigator.clipboard.writeText(content);
      setState('done');
      onCopySuccess?.();
      setTimeout(() => setState('idle'), 2200);
    } catch (err: any) {
      setState('error');
      onCopyError?.(err);
      setTimeout(() => setState('idle'), 2200);
    }
  };

  return (
    <AceternityButton
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={`will-change-transform ${className}`}
      title={state === 'done' ? 'Copiado para a área de transferência!' : 'Copiar'}
      aria-label={ariaLabel || 'Copiar'}
    >
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon}
      />
      {showLabel && (
        children ? (
          children
        ) : (
          <span className="font-semibold">{state === 'done' ? doneLabel : idleLabel}</span>
        )
      )}
    </AceternityButton>
  );
};

export default CopyButton;
