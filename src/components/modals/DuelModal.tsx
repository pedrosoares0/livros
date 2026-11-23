import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Swords,
  Crown,
  BookOpen,
  Compass,
  Feather,
  Zap,
  Moon,
  HeartHandshake,
  Clock,
  Share2,
  Bookmark,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { BookEvaluation, BookDuelVerdict, UserRatingsMap } from '../../types';
import {
  analyzeBookDuelWithGemini,
  buildInstantDuelVerdict,
  getCachedDuelVerdict,
} from '../../services/geminiEvaluator';
import { getEffectiveScore } from '../../services/ratings';
import { BookCover } from '../BookCover';
import { ScoreBadge, getScoreTone } from '../ui/ScoreBadge';
import { CopyButton } from '../ui/CopyButton';

interface DuelModalProps {
  books: BookEvaluation[];
  allBooks?: BookEvaluation[];
  userRatings?: UserRatingsMap;
  savedBookIds?: Set<string>;
  onClose: () => void;
  onSelectBook: (book: BookEvaluation) => void;
  onToggleSave?: (book: BookEvaluation) => void;
  onChangeDuelBooks?: (nextBooks: BookEvaluation[]) => void;
}

/**
 * Estima o tempo de leitura em horas considerando páginas e cadência (ritmo) da obra.
 */
function estimateReadingHours(pages: number, ritmoScore: number): string {
  const safePages = pages && pages > 20 ? pages : 240;
  // Ritmo 8-10: ~42 págs/h | Ritmo 5-7: ~34 págs/h | Ritmo 0-4: ~26 págs/h
  const pagesPerHour = ritmoScore >= 8 ? 42 : ritmoScore >= 5 ? 34 : 27;
  const hours = safePages / pagesPerHour;
  if (hours < 1.5) return '~1h de leitura';
  return `~${Math.round(hours)}h de leitura`;
}

export const DuelModal: React.FC<DuelModalProps> = ({
  books,
  allBooks = [],
  userRatings,
  savedBookIds,
  onClose,
  onSelectBook,
  onToggleSave,
  onChangeDuelBooks,
}) => {
  const [aiVerdictMap, setAiVerdictMap] = useState<Record<string, BookDuelVerdict>>({});
  const [isAddThirdOpen, setIsAddThirdOpen] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState('');
  const [copiedAlert, setCopiedAlert] = useState(false);

  const booksKey = useMemo(
    () => books.map((b) => b.id).sort().join('|'),
    [books]
  );

  const cachedOrAiVerdict = useMemo(() => {
    if (books.length < 2) return null;
    return aiVerdictMap[booksKey] || getCachedDuelVerdict(books);
  }, [books, booksKey, aiVerdictMap]);

  const verdict = useMemo(() => {
    if (books.length < 2) return null;
    return cachedOrAiVerdict || buildInstantDuelVerdict(books);
  }, [books, cachedOrAiVerdict]);

  const isRefiningWithAi = books.length >= 2 && !cachedOrAiVerdict;

  // Dispara análise comparativa do Gemini se ainda não estiver em cache
  useEffect(() => {
    if (books.length < 2 || cachedOrAiVerdict) return;

    const controller = new AbortController();
    analyzeBookDuelWithGemini(books, controller.signal)
      .then((res) => {
        if (!controller.signal.aborted) {
          setAiVerdictMap((prev) => ({ ...prev, [booksKey]: res }));
        }
      })
      .catch(() => {
        // Fallback determinístico já está ativo
      });

    return () => controller.abort();
  }, [books, booksKey, cachedOrAiVerdict]);

  // Fechar com tecla Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAddThirdOpen) {
          setIsAddThirdOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, isAddThirdOpen]);

  // Travar scroll do body enquanto o modal está aberto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const winnerBook = useMemo(
    () => (verdict ? books.find((b) => b.id === verdict.winnerId) || books[0] : books[0]),
    [books, verdict]
  );

  // Candidatos disponíveis para adicionar ao duelo (oponente ou 3º livro)
  const availableCandidateBooks = useMemo(() => {
    const currentIds = new Set(books.map((b) => b.id));
    const q = addSearchQuery
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    return allBooks
      .filter((b) => !currentIds.has(b.id))
      .filter((b) => {
        if (!q) return true;
        const blob = `${b.title} ${b.author}`
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return blob.includes(q);
      })
      .sort((a, b) => {
        const aSaved = savedBookIds?.has(a.id) || a.isSaved ? 1 : 0;
        const bSaved = savedBookIds?.has(b.id) || b.isSaved ? 1 : 0;
        if (bSaved !== aSaved) return bSaved - aSaved;
        return getEffectiveScore(b, userRatings) - getEffectiveScore(a, userRatings);
      })
      .slice(0, 16);
  }, [allBooks, books, addSearchQuery, savedBookIds, userRatings]);

  if (books.length === 0) return null;

  const handleRemoveBookFromDuel = (bookId: string) => {
    if (books.length <= 1 || !onChangeDuelBooks) return;
    onChangeDuelBooks(books.filter((b) => b.id !== bookId));
  };

  const handleAddBookToDuel = (newBook: BookEvaluation) => {
    if (books.length >= 3 || !onChangeDuelBooks) return;
    onChangeDuelBooks([...books, newBook]);
    setIsAddThirdOpen(false);
    setAddSearchQuery('');
  };

  const criteriaRows = [
    {
      id: 'originalidade',
      label: 'Originalidade',
      icon: <Compass className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(10 - (b.criteria?.genericidade ?? 3)),
    },
    {
      id: 'qualidadeTecnica',
      label: 'Qualidade Técnica',
      icon: <Feather className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.qualidadeTecnica ?? 8),
    },
    {
      id: 'worldbuilding',
      label: 'Worldbuilding',
      icon: <BookOpen className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.worldbuilding ?? 8),
    },
    {
      id: 'ritmo',
      label: 'Ritmo / Pacing',
      icon: <Zap className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.ritmo ?? 6),
    },
    {
      id: 'tomSombrio',
      label: 'Tom Sombrio',
      icon: <Moon className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.tomSombrio ?? 6),
    },
    {
      id: 'impactoEmocional',
      label: 'Impacto Emocional',
      icon: <HeartHandshake className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.impactoEmocional ?? 6),
    },
  ];

  const generateDuelText = () => {
    if (!verdict) return '';
    const header = `⚔️ VEREDITO — Duelo de Leitura (${books.map((b) => b.title).join(' vs. ')})`;
    const winnerLine = `🏆 Escolha #1 para Ler Agora: ${winnerBook?.title} (${winnerBook?.author})`;
    const headlineLine = `💡 Veredito: "${verdict.headline}"`;
    const compLine = `\n📊 Comparativo:\n${verdict.comparativo}`;
    const scenariosLines = books
      .map((b) => {
        const sc = verdict.scenarios.find((s) => s.bookId === b.id);
        const eff = Math.floor(getEffectiveScore(b, userRatings));
        return `• ${b.title} (${b.pages} págs · Encaixe ${eff}/10 · Técnica ${Math.floor(b.notaTecnica)}/10)\n  ↳ ${sc ? `${sc.label}: ${sc.reason}` : b.veredito}`;
      })
      .join('\n');

    return `${header}\n${winnerLine}\n${headlineLine}${compLine}\n\n🎯 Quando escolher cada obra:\n${scenariosLines}`;
  };

  const handleCopyDuel = async () => {
    await navigator.clipboard.writeText(generateDuelText());
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2600);
  };

  const renderVereditoPill = (book: BookEvaluation) => {
    if (book.vereditoTipo === 'leia') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/12 text-emerald-800 border border-emerald-500/25 text-[10px] font-bold">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
          LEIA
        </span>
      );
    }
    if (book.vereditoTipo === 'ressalvas') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30 text-[10px] font-bold">
          <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
          RESSALVAS
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/12 text-rose-800 border border-rose-500/25 text-[10px] font-bold">
        <XCircle className="w-2.5 h-2.5 text-rose-600" />
        EVITE
      </span>
    );
  };

  // Menor número de páginas vence no quesito "Tiro Mais Curto"
  const minPages = Math.min(...books.map((b) => b.pages || 9999));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-3 lg:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm z-10 cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 320,
          mass: 0.85,
        }}
        className="relative w-full max-w-lg md:max-w-4xl lg:max-w-[1080px] xl:max-w-[1160px] max-h-[92vh] sm:max-h-[89vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_65px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 will-change-transform"
      >
        {/* Toast de Cópia */}
        <AnimatePresence>
          {copiedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 420 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1d1d1f] text-white shadow-xl flex items-center gap-2 text-xs font-semibold border border-white/10 pointer-events-none select-none"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Duelo copiado para a área de transferência!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 pt-4 pb-3 border-b border-black/[0.06] bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center shadow-xs shrink-0">
              <Swords className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-[#1d1d1f] truncate">
                  Duelo de Leitura
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 border border-neutral-200/80 text-[#636366]">
                  {books.length} obras
                </span>
              </div>
              <p className="text-[11px] text-[#86868b] truncate hidden sm:block">
                Comparativo direto de ritmo, densidade dramática e encaixe para decidir qual ler primeiro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {books.length === 2 && onChangeDuelBooks && allBooks.length > 2 && (
              <button
                type="button"
                onClick={() => setIsAddThirdOpen((prev) => !prev)}
                className={`h-8 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border ${
                  isAddThirdOpen
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-[#1d1d1f] border-neutral-200/90'
                }`}
                title="Adicionar um 3º livro a este duelo"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3º Livro</span>
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleCopyDuel}
              title="Copiar Duelo"
              className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Fechar"
              className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Drawer opcional para adicionar um oponente (quando há 1 livro) ou 3º livro ao duelo */}
        <AnimatePresence>
          {(books.length === 1 || (isAddThirdOpen && books.length === 2)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="border-b border-neutral-200/80 bg-neutral-50/95 px-5 sm:px-7 py-3.5 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                  {books.length === 1
                    ? `Escolha um livro da sua estante para duelar com "${books[0].title}"`
                    : 'Escolha um 3º livro da sua estante para entrar no duelo'}
                </span>
                <input
                  type="text"
                  value={addSearchQuery}
                  onChange={(e) => setAddSearchQuery(e.target.value)}
                  placeholder="Filtrar por título ou autor..."
                  className="px-3 py-1 text-xs rounded-full bg-white border border-neutral-200/90 text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-black w-48 sm:w-60"
                />
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
                {availableCandidateBooks.map((candidate) => (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => handleAddBookToDuel(candidate)}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200/80 hover:border-neutral-300 shrink-0 max-w-[220px] text-left transition-all active:scale-95 cursor-pointer shadow-2xs"
                  >
                    <div className="w-8 shrink-0">
                      <BookCover
                        title={candidate.title}
                        author={candidate.author}
                        coverUrl={candidate.coverUrl}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1d1d1f] truncate">
                        {candidate.title}
                      </p>
                      <p className="text-[10px] text-[#86868b] truncate">
                        Encaixe {Math.floor(getEffectiveScore(candidate, userRatings))} • {candidate.pages} págs
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-6 hide-scrollbar flex-1">
          {/* 1. Veredito de Desempate Banner (exibido quando há 2 ou 3 livros) */}
          {verdict && books.length >= 2 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1d1d1f] via-[#242428] to-[#151517] text-white shadow-[0_14px_34px_-10px_rgba(0,0,0,0.28)] border border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold tracking-tight">
                  <Crown className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Leia Primeiro: {winnerBook?.title}</span>
                </div>

                {isRefiningWithAi ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-300 font-medium">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span className="step-text-shimmer !text-neutral-200">
                      Calibrando desempate fino...
                    </span>
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Desempate Calibrado para o seu Perfil
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <p className="text-sm sm:text-base md:text-[17px] font-bold text-white leading-snug tracking-tight">
                  "{verdict.headline}"
                </p>
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                  {verdict.comparativo}
                </p>
              </div>
            </div>
          )}

          {/* 2. Arena Lado a Lado (2 ou 3 Colunas) */}
          <div
            className={`grid grid-cols-1 ${
              books.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'
            } gap-3.5 sm:gap-4 items-stretch`}
          >
            {books.map((book) => {
              const isWinner = books.length >= 2 && book.id === winnerBook?.id;
              const effectiveScore = getEffectiveScore(book, userRatings);
              const isUserRated = Boolean(userRatings?.[book.id]);
              const isSaved = Boolean(savedBookIds?.has(book.id) || book.isSaved);
              const scenario = verdict?.scenarios.find((s) => s.bookId === book.id);
              const readingTime = estimateReadingHours(book.pages, book.criteria?.ritmo ?? 6);
              const isShortest = books.length >= 2 && book.pages > 0 && book.pages === minPages;

              return (
                <div
                  key={book.id}
                  className={`relative rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between gap-4 transition-all duration-200 ${
                    isWinner
                      ? 'bg-gradient-to-b from-neutral-50/95 to-white border-2 border-[#1d1d1f] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.14)]'
                      : 'bg-neutral-50/75 hover:bg-neutral-50 border border-neutral-200/85 shadow-2xs'
                  }`}
                >
                  {/* Top Badge Row: Winner Crown or Contender Tag + Optional Remove button (when >= 2 books) */}
                  <div className="flex items-center justify-between gap-2">
                    {isWinner ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1d1d1f] text-white text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                        <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
                        <span>Escolha #1</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-200/75 text-[#636366] text-[10px] font-bold uppercase tracking-wide">
                        {books.length === 1 ? 'Desafiante #1' : 'Alternativa'}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      {renderVereditoPill(book)}
                      {books.length >= 2 && onChangeDuelBooks && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBookFromDuel(book.id)}
                          className="p-1 rounded-full hover:bg-neutral-200/80 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
                          title="Remover deste duelo"
                          aria-label="Remover deste duelo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Book Cover + Core Metadata */}
                  <div className="flex items-start gap-3.5">
                    <div
                      onClick={() => onSelectBook(book)}
                      className="w-20 sm:w-22 shrink-0 cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                      title="Abrir ficha completa"
                    >
                      <BookCover
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                        userRating={userRatings?.[book.id]?.rating}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3
                          onClick={() => onSelectBook(book)}
                          className="text-sm sm:text-[15px] font-extrabold text-[#1d1d1f] hover:text-black cursor-pointer line-clamp-2 leading-snug tracking-tight"
                        >
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#86868b] truncate font-medium">
                          {book.author}
                        </p>
                      </div>

                      {/* Pages & Estimated Reading Time */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-score font-semibold border ${
                            isShortest
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200/90'
                              : 'bg-white text-[#636366] border-neutral-200/80'
                          }`}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          <span>{book.pages} págs</span>
                        </span>
                        <span className="text-[10px] text-[#86868b] font-medium">
                          {readingTime}
                        </span>
                      </div>

                      {/* Dual Scores Mini Deck */}
                      <div className="flex items-center gap-3 pt-0.5">
                        <div className="flex items-center gap-1.5">
                          <ScoreBadge
                            score={effectiveScore}
                            size="sm"
                            isUserRating={isUserRated}
                          />
                          <div className="leading-none">
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#86868b]">
                              {isUserRated ? 'Sua Nota' : 'Encaixe'}
                            </span>
                          </div>
                        </div>

                        <div className="w-[1px] h-5 bg-neutral-200" />

                        <div className="flex items-center gap-1.5">
                          <ScoreBadge score={book.notaTecnica} size="sm" />
                          <div className="leading-none">
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#86868b]">
                              Técnica
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scenario Box: "Quando escolher este" */}
                  {scenario && (
                    <div className="p-3 rounded-xl bg-white border border-neutral-200/80 space-y-1 shadow-3xs">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1d1d1f] block">
                        🎯 {scenario.label}
                      </span>
                      <p className="text-xs text-[#515154] leading-relaxed">
                        {scenario.reason}
                      </p>
                    </div>
                  )}

                  {/* Card Footer Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60">
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="flex-1 h-8 px-3 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Abrir Ficha</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {onToggleSave && (
                      <button
                        type="button"
                        onClick={() => onToggleSave(book)}
                        className={`h-8 px-3 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border ${
                          isSaved
                            ? 'bg-neutral-900 text-white border-neutral-800'
                            : 'bg-white hover:bg-neutral-100 text-[#1d1d1f] border-neutral-200/90'
                        }`}
                        title={isSaved ? 'Salvo na estante' : 'Salvar na estante'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. Comparativo Critério a Critério (Telemetria Lado a Lado) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                Telemetria Lado a Lado (6 Critérios)
              </span>
              <span className="text-[10px] font-score font-semibold text-[#86868b]">
                Destaque para a maior nota em cada eixo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {criteriaRows.map((row) => {
                const values = books.map((b) => row.getValue(b));
                const maxVal = Math.max(...values);

                return (
                  <div
                    key={row.id}
                    className="p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      {row.icon}
                      <span className="text-xs sm:text-[13px] font-bold text-[#1d1d1f] tracking-tight">
                        {row.label}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {books.map((b) => {
                        const val = row.getValue(b);
                        const isLeader = val === maxVal;
                        const tone = getScoreTone(val);

                        return (
                          <div key={`${row.id}-${b.id}`} className="space-y-1">
                            <div className="flex items-center justify-between text-xs gap-2">
                              <span
                                className={`truncate ${
                                  isLeader
                                    ? 'font-bold text-[#1d1d1f]'
                                    : 'font-medium text-[#86868b]'
                                }`}
                              >
                                {b.title}
                              </span>
                              <span
                                className={`font-score text-xs shrink-0 ${
                                  isLeader
                                    ? 'font-black text-[#1d1d1f]'
                                    : 'font-semibold text-[#86868b]'
                                }`}
                              >
                                {val}/10
                              </span>
                            </div>

                            <div className="w-full h-2.5 rounded-full overflow-hidden bg-neutral-200/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.14)] p-[1px]">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  !isLeader
                                    ? 'bg-neutral-400/75'
                                    : tone === 'green'
                                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                      : tone === 'yellow'
                                        ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                        : 'bg-gradient-to-r from-rose-500 to-rose-600'
                                }`}
                                style={{
                                  width: `${Math.min(100, Math.max(8, val * 10))}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:px-7 border-t border-black/[0.06] bg-[#ffffff] flex items-center justify-between gap-3">
          <CopyButton
            variant="secondary"
            size="md"
            text={generateDuelText}
            idleLabel="Copiar comparativo"
            doneLabel="Copiado!"
          />

          <button
            type="button"
            onClick={() => winnerBook && onSelectBook(winnerBook)}
            className="h-10 px-5 rounded-xl bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Ver Ficha de "{winnerBook?.title}"</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DuelModal;
