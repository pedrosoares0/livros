import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Film, BookOpen, AlertTriangle, CheckCircle2, 
  XCircle, Copy, Share2, Bookmark, Gauge,
  Feather, Compass, Zap, Moon, HeartHandshake,
  Trash2, Image as ImageIcon
} from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { ScoreBadge, getScoreTone } from './ScoreBadge';
import { MovieThumb } from './MovieThumb';
import { fetchAlternativeCovers } from '../services/coverSearch';

interface FichaModalProps {
  book: BookEvaluation | null;
  onClose: () => void;
  onSaveToWishlist?: (book: BookEvaluation) => void;
  isSaved?: boolean;
  onDeleteBook?: (bookId: string) => void;
  onUpdateCover?: (bookId: string, newCoverUrl: string) => void;
}

export const FichaModal: React.FC<FichaModalProps> = ({
  book,
  onClose,
  onSaveToWishlist,
  isSaved = false,
  onDeleteBook,
  onUpdateCover,
}) => {
  if (!book) return null;

  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false);
  const [isLoadingCovers, setIsLoadingCovers] = useState(false);
  const [alternativeCovers, setAlternativeCovers] = useState<string[]>([]);
  const [hasFetchedCovers, setHasFetchedCovers] = useState(false);

  const handleOpenCoverPicker = async () => {
    setIsCoverPickerOpen((prev) => !prev);
    if (!hasFetchedCovers) {
      setIsLoadingCovers(true);
      const results = await fetchAlternativeCovers(book.title, book.author, book.coverUrl);
      setAlternativeCovers(results);
      setIsLoadingCovers(false);
      setHasFetchedCovers(true);
    }
  };

  const handleSelectCover = (newCoverUrl: string) => {
    if (onUpdateCover) {
      onUpdateCover(book.id, newCoverUrl);
    }
    setIsCoverPickerOpen(false);
  };

  const handleDeleteBook = () => {
    if (window.confirm(`Tem certeza que deseja excluir "${book.title}" do Veredito?`)) {
      if (onDeleteBook) {
        onDeleteBook(book.id);
      }
      onClose();
    }
  };

  // Derived inverted metrics for unified 0-10 intuitive scale (higher = better fit)
  const originalidade = Math.round((10 - book.criteria.genericidade) * 10) / 10;

  const copyFichaToClipboard = () => {
    const text = `📋 VEREDITO — Ficha de Avaliação
📖 Obra: ${book.title} (${book.author})
📄 Páginas: ~${book.pages} (ed. brasileira)
⭐ Nota Técnica: ${book.notaTecnica}
🎯 Nota de Encaixe: ${book.notaEncaixe}
💡 Veredito: ${book.veredito}

📝 Resumo:
${book.resumo}

🎬 Filmes: ${book.movieComparisons.slice(0, 3).join(' • ')}

📊 Critérios:
• Originalidade: ${originalidade}
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
      icon: <Compass className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: originalidade >= 8 ? 'Inovador' : originalidade >= 5 ? 'Equilibrado' : 'Clichê',
      tone: getScoreTone(originalidade),
    },
    {
      label: 'Qualidade Técnica',
      score: book.criteria.qualidadeTecnica,
      icon: <Feather className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.qualidadeTecnica >= 8 ? 'Primorosa' : book.criteria.qualidadeTecnica >= 5 ? 'Competente' : 'Irregular',
      tone: getScoreTone(book.criteria.qualidadeTecnica),
    },
    {
      label: 'Worldbuilding',
      score: book.criteria.worldbuilding,
      icon: <BookOpen className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.worldbuilding >= 8 ? 'Imersivo' : book.criteria.worldbuilding >= 5 ? 'Funcional' : 'Minimalista',
      tone: getScoreTone(book.criteria.worldbuilding),
    },
    {
      label: 'Ritmo / Pacing',
      score: book.criteria.ritmo,
      icon: <Zap className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.ritmoDescricao || (book.criteria.ritmo >= 8 ? 'Excelente' : 'Cadenciado'),
      tone: getScoreTone(book.criteria.ritmo),
    },
    {
      label: 'Tom Sombrio',
      score: book.criteria.tomSombrio,
      icon: <Moon className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.tomSombrio >= 8 ? 'Visceral' : book.criteria.tomSombrio >= 5 ? 'Sóbrio' : 'Leve',
      tone: getScoreTone(book.criteria.tomSombrio),
    },
    {
      label: 'Impacto Emocional',
      score: book.criteria.impactoEmocional,
      icon: <HeartHandshake className="w-4 h-4 text-black stroke-[2.25]" />,
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
          {/* Minimalist Top Action Bar without 'Ficha Veredito' label */}
          <div className="flex items-center justify-end px-6 pt-3.5 pb-2 bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20">
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyFichaToClipboard}
                title="Copiar Ficha"
                className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 py-5 space-y-4 hide-scrollbar">
            {/* Hero Section: Extra-Large Cover with Ambient Colored Glow + Dual Scores + Title */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Extra-Large Book Cover with Soft Color-Matched Backlight Glow */}
              <div className="relative shrink-0 w-48 sm:w-56 flex flex-col items-center">
                {/* Ambient Soft Glow matching the book cover palette */}
                {book.coverUrl && (
                  <div
                    className="absolute -inset-3 rounded-2xl opacity-45 blur-2xl scale-95 pointer-events-none -z-10 transition-all duration-300"
                    style={{
                      backgroundImage: `url(${book.coverUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                )}

                <div className="w-full">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                  />
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200/90 rounded-lg text-[10px] font-score font-semibold text-[#86868b] inline-block">
                    ~{book.pages} págs
                  </span>

                  {/* Alterar Capa Action */}
                  <button
                    onClick={handleOpenCoverPicker}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 text-[10px] font-semibold text-[#1d1d1f] transition-all cursor-pointer active:scale-95 shadow-2xs"
                    title="Buscar e selecionar capa alternativa"
                  >
                    <ImageIcon className="w-3 h-3 text-[#86868b]" />
                    <span>{isCoverPickerOpen ? 'Fechar capas' : 'Alterar capa'}</span>
                  </button>
                </div>

                {/* Alternative Covers Selector Drawer */}
                {isCoverPickerOpen && (
                  <div className="w-full mt-3 p-3 rounded-2xl bg-neutral-50/95 border border-neutral-200/90 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                        Edições Disponíveis (até 4)
                      </span>
                    </div>

                    {isLoadingCovers ? (
                      <div className="py-5 text-center text-xs text-[#86868b] flex flex-col items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                        <span className="text-[11px]">Buscando capas na API...</span>
                      </div>
                    ) : alternativeCovers.length === 0 ? (
                      <p className="text-[11px] text-[#86868b] text-center py-3">
                        Nenhuma capa alternativa encontrada.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {alternativeCovers.map((coverUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectCover(coverUrl)}
                            className="group relative cursor-pointer rounded-lg overflow-hidden border-2 border-neutral-200 hover:border-black active:scale-95 transition-all shadow-xs"
                          >
                            <img
                              src={coverUrl}
                              alt={`Opção ${idx + 1}`}
                              className="w-full aspect-[2/3] object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                              <span className="opacity-0 group-hover:opacity-100 px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                                Aplicar
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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

            {/* Filmes com atmosfera equivalente (Até 3 filmes em UMA SÓ LINHA com thumbnails via TMDb) */}
            {book.movieComparisons && book.movieComparisons.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f]">
                    <Film className="w-3.5 h-3.5 text-amber-700" />
                    <span>Filmes Relacionados</span>
                  </div>
                  <span className="text-[10px] text-[#86868b] font-medium">
                    {Math.min(3, book.movieComparisons.length)} {Math.min(3, book.movieComparisons.length) === 1 ? 'indicação' : 'indicações'}
                  </span>
                </div>
                
                {/* Single Row of up to 3 Movie Thumbnails */}
                <div className="grid grid-cols-3 gap-2.5">
                  {book.movieComparisons.slice(0, 3).map((movie, i) => (
                    <MovieThumb key={i} title={movie} />
                  ))}
                </div>
              </div>
            )}

            {/* Critérios do Veredito — Dashboard Visual Intuitivo */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  <Gauge className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span>Critérios do Veredito</span>
                </div>
                <span className="text-[10px] text-[#86868b] font-score">
                  Telemetria
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {criteriaList.map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/70 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        {crit.icon}
                        <span className="text-sm sm:text-[15px] font-bold text-[#1d1d1f] tracking-tight truncate">
                          {crit.label}
                        </span>
                      </div>
                      <ScoreBadge score={crit.score} size="criteria" />
                    </div>

                    {/* 3D Tactile Progress Track */}
                    <div className="w-full h-3 rounded-full overflow-hidden bg-neutral-200/90 shadow-[inset_0_1.5px_2.5px_rgba(0,0,0,0.18),0_1px_1px_rgba(255,255,255,0.8)] border border-neutral-300/40 p-[1.5px]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.25)] ${
                          crit.tone === 'green'
                            ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600'
                            : crit.tone === 'yellow'
                            ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500'
                            : 'bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(8, crit.score * 10))}%` }}
                      >
                        {/* 3D Specular highlight reflection */}
                        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/55 to-transparent rounded-t-full pointer-events-none" />
                      </div>
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
          <div className="p-4 border-t border-black/[0.06] bg-[#ffffff] flex items-center gap-2.5">
            {/* Salvar Button (creates/adds to Salvos shelf) */}
            {onSaveToWishlist && (
              <button
                onClick={() => onSaveToWishlist(book)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                    : 'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200/80 border border-neutral-200/80'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-800' : ''}`} />
                <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
              </button>
            )}

            {/* Copiar Ficha */}
            <button
              onClick={copyFichaToClipboard}
              className="py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#1d1d1f] text-white hover:bg-black transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Ficha</span>
            </button>

            {/* Excluir Livro do Programa */}
            {onDeleteBook && (
              <button
                onClick={handleDeleteBook}
                title="Excluir livro do Veredito"
                aria-label="Excluir livro"
                className="py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Excluir</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
