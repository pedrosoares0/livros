import React from 'react';
import { BookOpen, Library } from 'lucide-react';
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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[84%] max-w-xs sm:max-w-sm pointer-events-auto"
    >
      <div
        className="flex items-center justify-between px-4 py-1.5 rounded-full border"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Tab 1: Início */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'discover'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'discover' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Início</span>
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

        {/* Tab 2: Estante */}
        <button
          onClick={() => onSelectTab('shelves')}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'shelves'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <Library className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'shelves' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Estante</span>
        </button>
      </div>
    </nav>
  );
};
