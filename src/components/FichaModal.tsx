import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Film, BookOpen, AlertTriangle, CheckCircle2, 
  XCircle, Copy, Share2, Bookmark, Gauge,
  Sparkles, ShieldCheck, Feather, Compass, Zap, Moon, HeartHandshake
} from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { ScoreBadge, getScoreTone } from './ScoreBadge';
import { MovieThumb } from './MovieThumb';

interface FichaModalProps {
  book: BookEvaluation | null;
  onClose: () => void;
  onSaveToWishlist?: (book: BookEvaluation) => void;
  isSaved?: boolean;
}

export const FichaModal: React.FC<FichaModalProps> = ({
  book,
  onClose,
  onSaveToWishlist,
  isSaved = false,
}) => {
  if (!book) return null;

  // Derived inverted metrics for unified 0-10 intuitive scale (higher = better fit)
  const originalidade = Math.round((10 - book.criteria.genericidade) * 10) / 10;
  const maturidade = Math.round((10 - book.criteria.infantilidade) * 10) / 10;

  const copyFichaToClipboard = () => {
    const text = `📋 PROTOCOLO — Ficha de Avaliação
📖 Obra: ${book.title} (${book.author})
📄 Páginas: ~${book.pages} (ed. brasileira)
⭐ Nota Técnica: ${book.notaTecnica}
🎯 Nota de Encaixe: ${book.notaEncaixe}
💡 Veredito: ${book.veredito}

📝 Resumo:
${book.resumo}

🎬 Vibe Cinematográfica: ${book.movieComparisons.join(' • ')}
🎭 Adaptações: ${book.adaptacoes}

📊 Critérios:
• Originalidade: ${originalidade}
• Maturidade: ${maturidade} (${book.criteria.infantilidadeStatus.toUpperCase()})
• Técnica / Prosa: ${book.criteria.qualidadeTecnica}
• Worldbuilding: ${book.criteria.worldbuilding}
• Ritmo: ${book.criteria.ritmo} (${book.criteria.ritmoDescricao})
• Tom Sombrio: ${book.criteria.tomSombrio}
• Impacto Emocional: ${book.criteria.impactoEmocional}

🎯 Análise: ${book.justificativaEncaixe}`;

    navigator.clipboard.writeText(text);
    alert('Ficha copiada para a área de transferência!');
  };

  const getVereditoBadge = () => {
    if (book.vereditoTipo === 'leia') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-xs border border-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>LEIA</span>
        </div>
      );
    }
    if (book.vereditoTipo === 'ressalvas') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-xs shadow-xs border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>VALE COM RESSALVAS</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white font-bold text-xs shadow-xs border border-rose-400">
        <XCircle className="w-3.5 h-3.5" />
        <span>EVITE</span>
      </div>
    );
  };

  const criteriaList = [
    {
      label: 'Originalidade',
      score: originalidade,
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
      tag: originalidade >= 8 ? 'Inovador' : originalidade >= 5 ? 'Equilibrado' : 'Clichê',
      tone: getScoreTone(originalidade),
    },
    {
      label: 'Maturidade',
      score: maturidade,
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      tag: maturidade >= 8 ? 'Adulto (Ideal)' : maturidade >= 5 ? 'Aceitável' : 'Juvenil / Bobo',
      tone: getScoreTone(maturidade),
    },
    {
      label: 'Qualidade Técnica',
      score: book.criteria.qualidadeTecnica,
      icon: <Feather className="w-3.5 h-3.5 text-blue-600" />,
      tag: book.criteria.qualidadeTecnica >= 8 ? 'Primorosa' : book.criteria.qualidadeTecnica >= 5 ? 'Competente' : 'Irregular',
      tone: getScoreTone(book.criteria.qualidadeTecnica),
    },
    {
      label: 'Worldbuilding',
      score: book.criteria.worldbuilding,
      icon: <Compass className="w-3.5 h-3.5 text-purple-600" />,
      tag: book.criteria.worldbuilding >= 8 ? 'Imersivo' : book.criteria.worldbuilding >= 5 ? 'Funcional' : 'Minimalista',
      tone: getScoreTone(book.criteria.worldbuilding),
    },
    {
      label: 'Ritmo / Pacing',
      score: book.criteria.ritmo,
      icon: <Zap className="w-3.5 h-3.5 text-amber-600" />,
      tag: book.criteria.ritmoDescricao || (book.criteria.ritmo >= 8 ? 'Excelente' : 'Cadenciado'),
      tone: getScoreTone(book.criteria.ritmo),
    },
    {
      label: 'Tom Sombrio',
      score: book.criteria.tomSombrio,
      icon: <Moon className="w-3.5 h-3.5 text-stone-700" />,
      tag: book.criteria.tomSombrio >= 8 ? 'Visceral' : book.criteria.tomSombrio >= 5 ? 'Sóbrio' : 'Leve',
      tone: getScoreTone(book.criteria.tomSombrio),
    },
    {
      label: 'Impacto Emocional',
      score: book.criteria.impactoEmocional,
      icon: <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />,
      tag: book.criteria.impactoEmocional >= 8 ? 'Profundo' : book.criteria.impactoEmocional >= 5 ? 'Sensível' : 'Neutro',
      tone: getScoreTone(book.criteria.impactoEmocional),
    },
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

        {/* Modal Container */}
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-black/[0.06] bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                Ficha Veredito
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyFichaToClipboard}
                title="Copiar Ficha"
                className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 py-5 space-y-4 hide-scrollbar">
            {/* Hero Section: Cover + Dual Scores + Title */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div className="relative shrink-0 w-28 sm:w-32">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
                <div className="mt-2 text-center">
                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-md text-[10px] font-score font-semibold text-[#86868b] block">
                    ~{book.pages} págs
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  {book.genres.slice(0, 2).map((g, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 border border-neutral-200/80 text-[#86868b]">
                      {g}
                    </span>
                  ))}
                  {book.year && (
                    <span className="text-[10px] text-[#86868b] font-score">
                      {book.year}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm font-medium text-[#86868b]">
                  {book.author}
                </p>

                {/* Dual Calibrated 3D Score Cards (No /10, 3D Badges) */}
                <div className="pt-1 grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex flex-col items-center sm:items-start shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      Nota Técnica
                    </span>
                    <div className="mt-1">
                      <ScoreBadge score={book.notaTecnica} size="lg" />
                    </div>
                    <span className="text-[9px] text-[#86868b] mt-1 font-medium">
                      Qualidade objetiva
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex flex-col items-center sm:items-start shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      Nota de Encaixe
                    </span>
                    <div className="mt-1">
                      <ScoreBadge score={book.notaEncaixe} size="lg" />
                    </div>
                    <span className="text-[9px] text-[#86868b] mt-1 font-medium">
                      Para o seu perfil
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Veredito Direto */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                  Veredito
                </span>
                <p className="text-sm font-semibold text-[#1d1d1f] italic leading-snug">
                  "{book.veredito}"
                </p>
              </div>
              <div className="shrink-0 self-start sm:self-center">
                {getVereditoBadge()}
              </div>
            </div>

            {/* Premissa & Clima */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                <BookOpen className="w-3.5 h-3.5 text-[#1d1d1f]" />
                <span>Premissa & Clima</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200/70">
                {book.resumo}
              </p>
            </div>

            {/* Vibe Cinematográfica Mundial (2 a 4 filmes com thumbnails visuais) */}
            <div className="p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f]">
                  <Film className="w-3.5 h-3.5 text-amber-700" />
                  <span>Vibe de Filmes (Cinema Mundial)</span>
                </div>
                <span className="text-[10px] text-[#86868b] font-medium">
                  {book.movieComparisons.length} indicações
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {book.movieComparisons.slice(0, 4).map((movie, i) => (
                  <MovieThumb key={i} title={movie} />
                ))}
              </div>
            </div>

            {/* Adaptações */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f]">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>Adaptações & Mídia</span>
              </div>
              <p className="text-xs text-[#1d1d1f] leading-snug">
                {book.adaptacoes}
              </p>
            </div>

            {/* Critérios do Protocolo — Dashboard Visual Intuitivo */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  <Gauge className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span>Critérios do Protocolo</span>
                </div>
                <span className="text-[10px] text-[#86868b] font-score">
                  Visual Telemetry
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {criteriaList.map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/70 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {crit.icon}
                        <span className="text-xs sm:text-[13px] font-bold text-[#1d1d1f] truncate">
                          {crit.label}
                        </span>
                      </div>
                      <ScoreBadge score={crit.score} size="criteria" />
                    </div>

                    {/* Progress track */}
                    <div className="w-full bg-neutral-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          crit.tone === 'green'
                            ? 'bg-emerald-500'
                            : crit.tone === 'yellow'
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(8, crit.score * 10))}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${
                        crit.tone === 'green'
                          ? 'text-emerald-700'
                          : crit.tone === 'yellow'
                          ? 'text-amber-800'
                          : 'text-rose-700'
                      }`}>
                        {crit.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-black/[0.06] bg-[#ffffff] flex items-center gap-3">
            {onSaveToWishlist && (
              <button
                onClick={() => onSaveToWishlist(book)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.97] cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200/80 border border-neutral-200/80'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Salvo na Wishlist' : 'Adicionar à Wishlist'}</span>
              </button>
            )}

            <button
              onClick={copyFichaToClipboard}
              className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-[#1d1d1f] text-white hover:bg-black transition-all active:scale-[0.97] flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Ficha</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
