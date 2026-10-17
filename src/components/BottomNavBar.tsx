import React from 'react';
import { Sparkles, History, Award } from 'lucide-react';
import { PearlButton } from './PearlButton';

interface BottomNavBarProps {
  activeTab: 'discover' | 'history' | 'ranking';
  onSelectTab: (tab: 'discover' | 'history' | 'ranking') => void;
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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xs sm:max-w-sm pointer-events-auto"
    >
      <div
        className="flex items-center justify-between px-3 py-1.5 rounded-full border"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Tab 1: Descobrir / Avaliador */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'discover'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'discover' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Descobrir</span>
        </button>

        {/* Center Action: Pearl Button (+) */}
        <div className="px-1 shrink-0 -my-1">
          <PearlButton
            size="nav"
            showIconOnly={true}
            onClick={onOpenEvaluate}
            aria-label="Avaliar nova obra"
            title="Avaliar nova obra"
          />
        </div>

        {/* Tab 2: Histórico (Substituiu Pastas 3D) */}
        <button
          onClick={() => onSelectTab('history')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'history'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <History className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'history' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Histórico</span>
        </button>

        {/* Tab 3: Ranking */}
        <button
          onClick={() => onSelectTab('ranking')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'ranking'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <Award className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'ranking' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Ranking</span>
        </button>
      </div>
    </nav>
  );
};
