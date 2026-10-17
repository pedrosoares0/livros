import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const getScoreTone = (score: number): 'green' | 'yellow' | 'red' => {
  if (score >= 8) return 'green';
  if (score >= 5) return 'yellow';
  return 'red';
};

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  size = 'md',
  className = '',
  label,
}) => {
  const tone = getScoreTone(score);

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] rounded-md min-w-[20px]',
    sm: 'px-2 py-0.5 text-[11px] rounded-md min-w-[24px]',
    md: 'px-2.5 py-1 text-xs rounded-lg min-w-[28px]',
    lg: 'px-3 py-1 text-sm rounded-xl min-w-[34px]',
    xl: 'px-4 py-2 text-2xl rounded-2xl min-w-[56px]',
  };

  const toneStyles = {
    green: {
      gradient: 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-emerald-400/80',
      shadow: '0 2px 4px rgba(5, 150, 105, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -1.5px 0 rgba(4, 120, 87, 0.6)',
    },
    yellow: {
      gradient: 'bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 border-amber-300',
      shadow: '0 2px 4px rgba(217, 119, 6, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1.5px 0 rgba(180, 83, 9, 0.5)',
    },
    red: {
      gradient: 'bg-gradient-to-b from-rose-500 to-rose-600 text-white border-rose-400/80',
      shadow: '0 2px 4px rgba(225, 29, 72, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -1.5px 0 rgba(190, 18, 60, 0.6)',
    },
  };

  const styleConfig = toneStyles[tone];

  return (
    <div
      className={`inline-flex items-center justify-center font-score font-black leading-none border select-none transition-transform active:scale-95 ${sizeClasses[size]} ${styleConfig.gradient} ${className}`}
      style={{
        boxShadow: styleConfig.shadow,
        textShadow: tone === 'yellow' ? 'none' : '0 1px 1px rgba(0,0,0,0.25)',
      }}
    >
      {label && <span className="text-[9px] font-normal uppercase mr-1 opacity-85">{label}</span>}
      <span>{score}</span>
    </div>
  );
};
