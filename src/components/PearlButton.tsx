import React from 'react';

type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  size?: 'default' | 'nav' | 'nav-rect';
  showIconOnly?: boolean;
};

export const PearlButton: React.FC<PearlButtonProps> = React.memo(({
  label = 'Avaliar livro',
  size = 'default',
  showIconOnly = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`pearl-button ${
        size === 'nav-rect' ? 'size-nav-rect' : size === 'nav' ? 'size-nav' : 'size-default'
      } ${showIconOnly ? 'icon-only' : ''} ${className}`}
      {...props}
    >
      <div className="wrap">
        <p>
          {showIconOnly ? (
            <span className="text-[22px] font-bold leading-none text-white/95 select-none">+</span>
          ) : size === 'nav-rect' ? (
            <>
              <span className="text-[17px] font-bold leading-none text-white/95 mr-0.5 select-none">+</span>
              <span className="tracking-tight text-white/95">{label}</span>
            </>
          ) : (
            <span className="tracking-tight text-white/95">{label}</span>
          )}
        </p>
      </div>
    </button>
  );
});

PearlButton.displayName = 'PearlButton';
