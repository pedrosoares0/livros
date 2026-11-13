import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, Film, Tv, ShieldAlert, Award, User } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const topMovies = [
    'Seven', 'De Olhos Bem Fechados', 'After Hours', 'Planeta dos Macacos',
    'Interestelar', 'Goodfellas', 'Manchester à Beira-Mar', 'Klaus',
    'Nada de Novo no Front', 'Bastardos Inglórios', 'Blade Runner 2049',
    'Aftersun', 'O Poderoso Chefão', 'Clube da Luta'
  ];

  const topSeries = [
    'The Bear', 'Game of Thrones', 'Love, Death & Robots', 'Arcane',
    'Sherlock', 'Rick and Morty', 'Mr. Robot', 'Chernobyl',
    'Planeta dos Abutres', 'Os Sopranos'
  ];

  const favoriteCharacters = [
    'Viktor (Arcane)', 'Ekko (Arcane)', 'Ultron', 'Thanos', 'Tony Stark',
    'Visão (Marvel)', 'Loki', 'Bruce Wayne', 'O Coringa', 'Sherlock Holmes',
    'Cooper, Dra. Brand & Murph (Interestelar)', 'Anakin Skywalker',
    'Harry Potter, Sirius Black & Snape', 'Abby & Ellie (TLOU Jogo)',
    'Carmy & Richie (The Bear)', 'K (Blade Runner 2049)', 'César (Planeta dos Macacos)',
    'Michael Corleone', 'Juiz Holden', 'Katniss Everdeen', 'Sebastian (La La Land)',
    'Tai Lung', 'Jack (Senhor das Moscas)', 'Vegeta', 'Logan'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] md:max-h-[85vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-black/[0.06] bg-[#ffffff]/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-[#1d1d1f]">
                <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              </div>
              <h2 className="text-base font-bold tracking-tight text-[#1d1d1f]">
                Calibrador do Veredito
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="p-1.5 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-5 space-y-5 hide-scrollbar">
            {/* User Archetype */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
                <h3 className="text-sm font-bold text-[#1d1d1f]">
                  Perfil Literário: Densidade Existencial & Trágica
                </h3>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Preferência estrita por livros curtos a médios em português, com seriedade, densidade moral, worldbuilding imersivo e sem concessões para sentimentalismo superficial.
              </p>
            </div>

            {/* Positive vs Negative Weights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Pesos Positivos (Alta Nota)</span>
                </div>
                <ul className="text-[11px] text-emerald-950 space-y-1">
                  <li>• Tragédia, culpa, dilemas morais e perda</li>
                  <li>• Queda do personagem e obsessão</li>
                  <li>• Violência com consequências reais</li>
                  <li>• Distopia e Sci-Fi existencial/filosófico</li>
                  <li>• Fantasia sombria & worldbuilding denso</li>
                  <li>• Novelas curtas e impacto condensado</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                  <span>Pesos Negativos (Rejeição)</span>
                </div>
                <ul className="text-[11px] text-rose-950 space-y-1">
                  <li>• Prolixidade sem payoff / ritmo sem tensão</li>
                  <li>• Romance como motor central ou fórmula</li>
                  <li>• Tom de fábula fofa / misticismo acolhedor</li>
                  <li>• Protagonismo adolescente genérico (YA)</li>
                  <li>• Comédia romântica ou drama clichê</li>
                  <li>• Autoajuda disfarçada de ficção</li>
                </ul>
              </div>
            </div>

            {/* Calibrated Movies & Series Inspiration */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                <Film className="w-3.5 h-3.5 text-amber-700" />
                <span>Filmes de Referência</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topMovies.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-medium text-[#1d1d1f]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                <Tv className="w-3.5 h-3.5 text-sky-700" />
                <span>Séries de Referência</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topSeries.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-medium text-[#1d1d1f]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                <User className="w-3.5 h-3.5 text-purple-700" />
                <span>Personagens Favoritos</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {favoriteCharacters.map((c, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-medium text-[#1d1d1f]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
