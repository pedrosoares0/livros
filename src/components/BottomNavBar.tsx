import React from 'react';
import { PearlButton } from './PearlButton';

interface BottomNavBarProps {
  activeTab: 'discover' | 'shelves';
  onSelectTab: (tab: 'discover' | 'shelves') => void;
  onOpenEvaluate: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenEvaluate,
}) => {
  return (
    <nav
      aria-label="Navegação Principal"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[88%] max-w-xs sm:max-w-sm pointer-events-auto"
    >
      <div
        className="flex items-center justify-between px-2.5 py-1.5 rounded-full border"
        style={{
          background: 'rgba(255, 255, 255, 0.76)',
          backdropFilter: 'blur(32px) saturate(190%)',
          WebkitBackdropFilter: 'blur(32px) saturate(190%)',
          borderColor: 'rgba(255, 255, 255, 0.88)',
          boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Tab 1: Início — Apple Books Style Capsule */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-[22px] transition-all duration-150 select-none cursor-pointer active:scale-95 ${
            activeTab === 'discover'
              ? 'bg-black/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.04)] text-[#000000]'
              : 'text-[#6e6e73] hover:text-[#1d1d1f]'
          }`}
        >
          {/* Apple Home Solid Icon */}
          <svg
            className="w-5 h-5 mb-0.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.75a1.25 1.25 0 0 0-.82.31L3.38 9.3a1.5 1.5 0 0 0-.58 1.18V20a1.75 1.75 0 0 0 1.75 1.75h4.2a.75.75 0 0 0 .75-.75v-4.5a1.5 1.5 0 0 1 3 0v4.5a.75.75 0 0 0 .75.75h4.2A1.75 1.75 0 0 0 19.2 20V10.48a1.5 1.5 0 0 0-.58-1.18l-7.8-6.24a1.25 1.25 0 0 0-.82-.31z" />
          </svg>
          <span className={`text-[11px] leading-tight tracking-tight ${activeTab === 'discover' ? 'font-semibold' : 'font-medium'}`}>
            Início
          </span>
        </button>

        {/* Center Action: Pearl Button with ONLY '+' */}
        <div className="px-1 shrink-0 -my-1">
          <PearlButton
            size="nav"
            showIconOnly={true}
            onClick={onOpenEvaluate}
            aria-label="Avaliar novo livro"
            title="Avaliar novo livro"
          />
        </div>

        {/* Tab 2: Estante — Apple Books Style Capsule */}
        <button
          onClick={() => onSelectTab('shelves')}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-[22px] transition-all duration-150 select-none cursor-pointer active:scale-95 ${
            activeTab === 'shelves'
              ? 'bg-black/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.04)] text-[#000000]'
              : 'text-[#6e6e73] hover:text-[#1d1d1f]'
          }`}
        >
          {/* Apple Books Biblioteca 3-Books Solid Icon */}
          <svg
            className="w-5 h-5 mb-0.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Book 1 (Left vertical) */}
            <rect x="3.5" y="4.5" width="4" height="15.5" rx="1.5" />
            {/* Book 2 (Middle vertical with spine ribbon/detail) */}
            <rect x="9" y="3.5" width="4.2" height="16.5" rx="1.5" />
            <rect x="10.35" y="6.5" width="1.5" height="3" rx="0.5" fill="white" />
            {/* Book 3 (Right tilted) */}
            <path d="M15.2 5.5a1.5 1.5 0 0 1 1.9-.8l2.6 1.3a1.5 1.5 0 0 1 .7 2l-6.2 12.4a1.5 1.5 0 0 1-2 .7l-2.6-1.3a1.5 1.5 0 0 1-.7-2L15.2 5.5z" />
          </svg>
          <span className={`text-[11px] leading-tight tracking-tight ${activeTab === 'shelves' ? 'font-semibold' : 'font-medium'}`}>
            Estante
          </span>
        </button>
      </div>
    </nav>
  );
};
