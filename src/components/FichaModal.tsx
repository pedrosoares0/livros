import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Film, BookOpen, AlertTriangle, CheckCircle2, 
  XCircle, Copy, Share2, Bookmark, Gauge
} from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';

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

  const copyFichaToClipboard = () => {
    const text = `📋 PROTOCOLO — Ficha de Avaliação
📖 Obra: ${book.title} (${book.author})
📄 Páginas: ~${book.pages} (ed. brasileira)
⭐ Nota Técnica: ${book.notaTecnica}/10
🎯 Nota de Encaixe: ${book.notaEncaixe}/10
💡 Veredito: ${book.veredito}

📝 Resumo:
${book.resumo}

🎬 Vibe Cinematográfica: ${book.movieComparisons.join(' • ')}
🎭 Adaptações: ${book.adaptacoes}

📊 Critérios:
• Genericidade: ${book.criteria.genericidade}/10 (${book.criteria.genericidade <= 2 ? 'Altamente original' : 'Fórmula'})
• Infantilidade: ${book.criteria.infantilidade}/10 (${book.criteria.infantilidadeStatus.toUpperCase()})
• Qualidade Técnica: ${book.criteria.qualidadeTecnica}/10
• Worldbuilding: ${book.criteria.worldbuilding}/10
• Ritmo: ${book.criteria.ritmo}/10 ("${book.criteria.ritmoDescricao}")
• Tom Sombrio: ${book.criteria.tomSombrio}/10
• Impacto Emocional: ${book.criteria.impactoEmocional}/10

🎯 Análise de Encaixe:
${book.justificativaEncaixe}`;

    navigator.clipboard.writeText(text);
    alert('Ficha copiada para a área de transferência!');
  };

  const getVereditoBadge = () => {
    if (book.vereditoTipo === 'leia') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>LEIA</span>
        </div>
      );
    }
    if (book.vereditoTipo === 'ressalvas') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>VALE COM RESSALVAS</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>EVITE</span>
      </div>
    );
  };

  const getInfantilidadeBadge = () => {
    const s = book.criteria.infantilidadeStatus;
    if (s === 'ideal') {
      return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">0-2 Ideal para você</span>;
    }
    if (s === 'aceitavel') {
      return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">3-5 Aceitável</span>;
    }
    if (s === 'risco') {
      return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">6 Zona de Risco</span>;
    }
    return <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">7-10 Não Combina</span>;
  };

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
                Ficha Protocolo
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
          <div className="overflow-y-auto px-6 py-5 space-y-5 hide-scrollbar">
            {/* Hero Section: Cover + Dual Scores + Title */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div className="relative shrink-0 w-28 sm:w-32">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
                <div className="mt-2 text-center">
                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-md text-[10px] font-mono text-[#86868b] block">
                    ~{book.pages} págs (pt-BR)
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
                    <span className="text-[10px] text-[#86868b] font-mono">
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

                {/* Dual Calibrated Score Badges */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex flex-col items-center sm:items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      Nota Técnica
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black text-[#1d1d1f] font-score">
                        {book.notaTecnica}
                      </span>
                      <span className="text-xs text-[#86868b] font-score">/10</span>
                    </div>
                    <span className="text-[10px] text-[#86868b] mt-0.5">
                      Qualidade objetiva
                    </span>
                  </div>

                  <div className={`p-3 rounded-2xl border flex flex-col items-center sm:items-start ${
                    book.notaEncaixe >= 8 
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                      : book.notaEncaixe >= 6 
                      ? 'bg-sky-50/70 border-sky-200 text-sky-900' 
                      : 'bg-rose-50/70 border-rose-200 text-rose-900'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      Nota de Encaixe
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className={`text-2xl font-black font-score ${
                        book.notaEncaixe >= 8 ? 'text-amber-700' : book.notaEncaixe >= 6 ? 'text-sky-700' : 'text-rose-700'
                      }`}>
                        {book.notaEncaixe}
                      </span>
                      <span className="text-xs text-[#86868b] font-score">/10</span>
                    </div>
                    <span className="text-[10px] text-[#86868b] mt-0.5">
                      Para o seu perfil
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Veredito Curto */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868b]">
                  Veredito do Protocolo
                </span>
                {getVereditoBadge()}
              </div>
              <p className="text-sm font-semibold text-[#1d1d1f] italic leading-snug">
                "{book.veredito}"
              </p>
              <p className="text-xs text-[#86868b] pt-1 border-t border-neutral-200/60">
                {book.justificativaEncaixe}
              </p>
            </div>

            {/* Resumo Obrigatório (2-3 linhas sem spoilers) */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                <BookOpen className="w-3.5 h-3.5 text-[#1d1d1f]" />
                <span>Resumo (Premissa & Clima)</span>
              </div>
              <p className="text-sm text-[#1d1d1f] leading-relaxed bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/70">
                {book.resumo}
              </p>
            </div>

            {/* Comparação com Filmes & Adaptações */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f]">
                  <Film className="w-3.5 h-3.5 text-amber-700" />
                  <span>Vibe de Filmes</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {book.movieComparisons.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-100/70 border border-amber-200 text-xs font-medium text-amber-900">
                      {m}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#86868b] pt-1">
                  Para visualizar a atmosfera e tom da narrativa.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f]">
                  <BookOpen className="w-3.5 h-3.5 text-purple-700" />
                  <span>Adaptações</span>
                </div>
                <p className="text-xs text-[#1d1d1f] pt-1 leading-snug">
                  {book.adaptacoes}
                </p>
              </div>
            </div>

            {/* Critérios Obrigatórios (0 a 10) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  <Gauge className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span>Critérios de Avaliação (0 a 10)</span>
                </div>
                <span className="text-[10px] text-[#86868b]">
                  Escala calibrada
                </span>
              </div>

              <div className="space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/70">
                {/* Genericidade */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Genericidade (0 = original | 10 = clichê)</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.genericidade}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-neutral-800"
                      style={{ width: `${book.criteria.genericidade * 10}%` }}
                    />
                  </div>
                </div>

                {/* Infantilidade */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#1d1d1f]">Infantilidade (0 = sombrio | 10 = juvenil)</span>
                    <div className="flex items-center gap-2">
                      {getInfantilidadeBadge()}
                      <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.infantilidade}/10</span>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        book.criteria.infantilidade <= 2 ? 'bg-emerald-600' : book.criteria.infantilidade <= 5 ? 'bg-sky-600' : 'bg-rose-600'
                      }`}
                      style={{ width: `${book.criteria.infantilidade * 10}%` }}
                    />
                  </div>
                </div>

                {/* Qualidade Técnica */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Qualidade Técnica / Prosa</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.qualidadeTecnica}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${book.criteria.qualidadeTecnica * 10}%` }}
                    />
                  </div>
                </div>

                {/* Worldbuilding */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Complexidade de Worldbuilding</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.worldbuilding}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${book.criteria.worldbuilding * 10}%` }}
                    />
                  </div>
                </div>

                {/* Ritmo */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Ritmo / Pacing</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.ritmo}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-600 rounded-full"
                      style={{ width: `${book.criteria.ritmo * 10}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#86868b] italic pt-0.5">
                    "{book.criteria.ritmoDescricao}"
                  </p>
                </div>

                {/* Tom Sombrio */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Tom Sombrio / Psicológico</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.tomSombrio}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-stone-700 rounded-full"
                      style={{ width: `${book.criteria.tomSombrio * 10}%` }}
                    />
                  </div>
                </div>

                {/* Impacto Emocional */}
                <div className="space-y-1 pt-2 border-t border-neutral-200/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1d1d1f]">Impacto Emocional / Moral</span>
                    <span className="font-score font-bold text-[#1d1d1f]">{book.criteria.impactoEmocional}/10</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${book.criteria.impactoEmocional * 10}%` }}
                    />
                  </div>
                </div>
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
