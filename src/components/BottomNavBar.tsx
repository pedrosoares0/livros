import React from 'react';
import { motion } from 'motion/react';
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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm pointer-events-auto"
    >
      <div
        className="flex items-center justify-between p-1.5 rounded-[28px] border"
        style={{
          background: 'rgba(255, 255, 255, 0.84)',
          backdropFilter: 'blur(36px) saturate(210%)',
          WebkitBackdropFilter: 'blur(36px) saturate(210%)',
          borderColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow:
            '0 18px 45px -10px rgba(0, 0, 0, 0.14), 0 2px 10px -2px rgba(0, 0, 0, 0.05), inset 0 1px 1.5px rgba(255, 255, 255, 1)',
        }}
      >
        {/* Tab 1: Início */}
        <button
          onClick={() => onSelectTab('discover')}
          className="relative flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-[22px] select-none cursor-pointer active:scale-95 transition-transform duration-100"
        >
          {activeTab === 'discover' && (
            <motion.div
              layoutId="nav-bubble"
              className="absolute inset-0 rounded-[22px] bg-black/[0.08] border border-black/[0.04] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.03)]"
              transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            />
          )}
          <span className="relative z-10 flex flex-col items-center justify-center">
            {/* Apple Home Solid Icon */}
            <svg
              className={`w-5 h-5 mb-0.5 transition-colors duration-200 ${
                activeTab === 'discover' ? 'text-[#000000]' : 'text-[#86868b]'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.75a1.25 1.25 0 0 0-.82.31L3.38 9.3a1.5 1.5 0 0 0-.58 1.18V20a1.75 1.75 0 0 0 1.75 1.75h4.2a.75.75 0 0 0 .75-.75v-4.5a1.5 1.5 0 0 1 3 0v4.5a.75.75 0 0 0 .75.75h4.2A1.75 1.75 0 0 0 19.2 20V10.48a1.5 1.5 0 0 0-.58-1.18l-7.8-6.24a1.25 1.25 0 0 0-.82-.31z" />
            </svg>
            <span
              className={`text-[11px] leading-tight tracking-tight transition-colors duration-200 ${
                activeTab === 'discover' ? 'font-bold text-[#000000]' : 'font-medium text-[#86868b]'
              }`}
            >
              Início
            </span>
          </span>
        </button>

        {/* Center Action: Rectangular Pearl Button */}
        <div className="px-1.5 shrink-0">
          <PearlButton
            size="nav-rect"
            label="Avaliar"
            onClick={onOpenEvaluate}
            aria-label="Avaliar novo livro ou HQ"
            title="Avaliar novo livro"
          />
        </div>

        {/* Tab 2: Estante */}
        <button
          onClick={() => onSelectTab('shelves')}
          className="relative flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-[22px] select-none cursor-pointer active:scale-95 transition-transform duration-100"
        >
          {activeTab === 'shelves' && (
            <motion.div
              layoutId="nav-bubble"
              className="absolute inset-0 rounded-[22px] bg-black/[0.08] border border-black/[0.04] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.03)]"
              transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            />
          )}
          <span className="relative z-10 flex flex-col items-center justify-center">
            {/* Apple Books Biblioteca 3-Books Solid Icon */}
            <svg
              className={`w-5 h-5 mb-0.5 transition-colors duration-200 ${
                activeTab === 'shelves' ? 'text-[#000000]' : 'text-[#86868b]'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="3.5" y="4.5" width="4" height="15.5" rx="1.5" />
              <rect x="9" y="3.5" width="4.2" height="16.5" rx="1.5" />
              <rect x="10.35" y="6.5" width="1.5" height="3" rx="0.5" fill="white" />
              <path d="M15.2 5.5a1.5 1.5 0 0 1 1.9-.8l2.6 1.3a1.5 1.5 0 0 1 .7 2l-6.2 12.4a1.5 1.5 0 0 1-2 .7l-2.6-1.3a1.5 1.5 0 0 1-.7-2L15.2 5.5z" />
            </svg>
            <span
              className={`text-[11px] leading-tight tracking-tight transition-colors duration-200 ${
                activeTab === 'shelves' ? 'font-bold text-[#000000]' : 'font-medium text-[#86868b]'
              }`}
            >
              Estante
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
};
