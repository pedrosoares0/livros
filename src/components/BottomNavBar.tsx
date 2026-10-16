import React from 'react';
import { BookOpen, FolderArchive, Award, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavBarProps {
  activeTab: 'shelves' | 'folders' | 'ranking';
  onSelectTab: (tab: 'shelves' | 'folders' | 'ranking') => void;
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
        className="flex items-center justify-between px-3 py-1.5 rounded-full border"
        style={{
          background: 'rgba(255, 255, 255, 0.68)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          borderColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Tab 1: Estantes */}
        <button
          onClick={() => onSelectTab('shelves')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'shelves'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'shelves' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Estantes</span>
        </button>

        {/* Tab 2: Pastas 3D */}
        <button
          onClick={() => onSelectTab('folders')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-150 select-none cursor-pointer active:scale-[0.93] ${
            activeTab === 'folders'
              ? 'text-[#1d1d1f] font-bold bg-neutral-200/50'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          <FolderArchive className="w-4 h-4 mb-0.5" strokeWidth={activeTab === 'folders' ? 2.3 : 1.75} />
          <span className="text-[10px] tracking-tight">Pastas 3D</span>
        </button>

        {/* Center Action: + Only */}
        <div className="px-1 shrink-0">
          <motion.button
            whileTap={{ scale: 0.90 }}
            onClick={onOpenEvaluate}
            aria-label="Avaliar novo livro"
            className="w-10 h-10 rounded-full bg-[#1d1d1f] text-white shadow-md hover:bg-black transition-colors cursor-pointer select-none flex items-center justify-center"
            style={{
              boxShadow: '0 6px 16px -2px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.button>
        </div>

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
