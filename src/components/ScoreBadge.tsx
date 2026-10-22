import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'criteria';
  className?: string;
  label?: string;
}

/**
 * Floor rounds score to integer (removes all decimals, rounding broken scores down e.g., 8.6 -> 8, 10.0 -> 10)
 */
export const roundScore = (val: number): number => {
  return Math.floor(val);
};

export const roundToHalf = roundScore;

export const getScoreTone = (score: number): 'green' | 'yellow' | 'red' => {
  const floored = Math.floor(score);
  if (floored >= 8) return 'green';
  if (floored >= 5) return 'yellow';
  return 'red';
};

export const ScoreBadge: React.FC<ScoreBadgeProps> = React.memo(({
  score,
  size = 'md',
  className = '',
  label,
}) => {
  const roundedScore = Math.floor(score);
  const formattedScore = String(roundedScore);
  const tone = getScoreTone(roundedScore);

  // Tactile circular badges proportioned compactly around the numbers
  const sizeClasses = {
    xs: 'w-[20px] h-[20px] text-[9px] font-black rounded-full',
    sm: 'w-[26px] h-[26px] text-[11px] font-black rounded-full',
    md: 'w-[28px] h-[28px] text-xs font-black rounded-full',
    lg: 'w-[32px] h-[32px] text-base font-black rounded-full',
    xl: 'w-[40px] h-[40px] text-xl font-black rounded-full',
    criteria: 'w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] text-xs sm:text-sm font-black rounded-full',
  };

  const toneStyles = {
    green: {
      gradient: 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-emerald-400/80',
      shadow: '0 2px 6px -1px rgba(5, 150, 105, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(4, 120, 87, 0.6)',
    },
    yellow: {
      gradient: 'bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 border-amber-300',
      shadow: '0 2px 6px -1px rgba(217, 119, 6, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.65), inset 0 -1px 0 rgba(180, 83, 9, 0.5)',
    },
    red: {
      gradient: 'bg-gradient-to-b from-rose-500 to-rose-600 text-white border-rose-400/80',
      shadow: '0 2px 6px -1px rgba(225, 29, 72, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(190, 18, 60, 0.6)',
    },
  };

  const styleConfig = toneStyles[tone];

  return (
    <div
      className={`inline-flex items-center justify-center font-score leading-none border select-none transition-transform active:scale-95 shrink-0 ${sizeClasses[size]} ${styleConfig.gradient} ${className}`}
      style={{
        boxShadow: styleConfig.shadow,
        textShadow: tone === 'yellow' ? 'none' : '0 1px 1.5px rgba(0,0,0,0.3)',
      }}
    >
      {label && <span className="text-[9px] font-normal uppercase mr-1 opacity-85">{label}</span>}
      <span className="tracking-tight">{formattedScore}</span>
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';
