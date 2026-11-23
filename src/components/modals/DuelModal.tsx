import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Share2,
  Gauge,
  Feather,
  Compass,
  Zap,
  Moon,
  HeartHandshake,
  ArrowUpRight,
} from 'lucide-react';
import { BookEvaluation, BookDuelVerdict, UserRatingsMap } from '../../types';
import {
  analyzeBookDuelWithGemini,
  buildInstantDuelVerdict,
  getCachedDuelVerdict,
} from '../../services/geminiEvaluator';
import { getEffectiveScore } from '../../services/ratings';
import { BookCover } from '../BookCover';
import { getScoreTone } from '../ui/ScoreBadge';

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

const INTRO_DURATION_MS = 1050;

export const DuelModal: React.FC<DuelModalProps> = ({
  books,
  userRatings,
  onClose,
  onSelectBook,
}) => {
  const [aiVerdictMap, setAiVerdictMap] = useState<Record<string, BookDuelVerdict>>({});
  const [copiedAlert, setCopiedAlert] = useState(false);

  const booksKey = useMemo(
    () => books.map((b) => b.id).sort().join('|'),
    [books]
  );

  // Controla o estágio de loading/introdução de ~1 segundo antes de revelar o comparativo
  const [settledKey, setSettledKey] = useState<string>('');
  const isIntroLoading = settledKey !== booksKey;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSettledKey(booksKey);
    }, INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [booksKey]);

  const cachedOrAiVerdict = useMemo(() => {
    if (books.length < 2) return null;
    return aiVerdictMap[booksKey] || getCachedDuelVerdict(books);
  }, [books, booksKey, aiVerdictMap]);

  const verdict = useMemo(() => {
    if (books.length < 2) return null;
    return cachedOrAiVerdict || buildInstantDuelVerdict(books);
  }, [books, cachedOrAiVerdict]);

  const isRefiningWithAi = books.length >= 2 && !cachedOrAiVerdict;

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
        // Fallback determinístico permanece ativo
      });

    return () => controller.abort();
  }, [books, booksKey, cachedOrAiVerdict]);

  // Keyboard Escape listener for seamless dismissal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is active
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

  // Coloca sempre a obra vencedora em primeiro lugar
  const orderedBooks = useMemo(() => {
    if (!winnerBook) return books;
    return [
      winnerBook,
      ...books.filter((b) => b.id !== winnerBook.id),
    ];
  }, [books, winnerBook]);

  if (books.length < 2 || !verdict) return null;

  const criteriaList = [
    {
      id: 'originalidade',
      label: 'Originalidade',
      icon: <Compass className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(10 - (b.criteria?.genericidade ?? 3)),
    },
    {
      id: 'qualidadeTecnica',
      label: 'Qualidade Técnica',
      icon: <Feather className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.qualidadeTecnica ?? 8),
    },
    {
      id: 'worldbuilding',
      label: 'Worldbuilding',
      icon: <BookOpen className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.worldbuilding ?? 8),
    },
    {
      id: 'ritmo',
      label: 'Ritmo / Pacing',
      icon: <Zap className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.ritmo ?? 6),
    },
    {
      id: 'tomSombrio',
      label: 'Tom Sombrio',
      icon: <Moon className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.tomSombrio ?? 6),
    },
    {
      id: 'impactoEmocional',
      label: 'Impacto Emocional',
      icon: <HeartHandshake className="w-4 h-4 text-black stroke-[2.25]" />,
      getValue: (b: BookEvaluation) => Math.floor(b.criteria?.impactoEmocional ?? 6),
    },
  ];

  const generateDuelText = () => {
    const header = `📋 VEREDITO — Comparativo de Leitura\n📖 ${books.map((b) => b.title).join(' vs. ')}`;
    const winnerLine = `💡 Recomendado para começar: ${winnerBook?.title} (${winnerBook?.author})`;
    const headlineLine = `"${verdict.headline}"`;
    const scenariosLines = books
      .map((b) => {
        const sc = verdict.scenarios.find((s) => s.bookId === b.id);
        const eff = Math.floor(getEffectiveScore(b, userRatings));
        return `• ${b.title} (${b.pages} págs · Encaixe ${eff} · Técnica ${Math.floor(b.notaTecnica)}): ${sc ? `${sc.label} — ${sc.reason}` : b.veredito}`;
      })
      .join('\n');

    return `${header}\n${winnerLine}\n${headlineLine}\n\n${scenariosLines}`;
  };

  const copyDuelToClipboard = async () => {
    await navigator.clipboard.writeText(generateDuelText());
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2600);
  };

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

      {/* Modal Container — Transiciona suavemente de tamanho entre o loading de 1s e a ficha comparativa */}
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
        className={`relative w-full ${
          isIntroLoading
            ? 'max-w-md sm:max-w-lg md:max-w-xl'
            : 'max-w-lg md:max-w-4xl lg:max-w-[1060px] xl:max-w-[1120px]'
        } max-h-[92vh] sm:max-h-[88vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_65px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 will-change-transform transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      >
        {/* iOS Handle Indicator on mobile */}
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Copy Confirmation Toast */}
        <AnimatePresence>
          {copiedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 420 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1d1d1f] text-white shadow-xl flex items-center gap-2 text-xs font-semibold border border-white/10 pointer-events-none select-none"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Comparativo copiado!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Top Action Bar */}
        <div className="flex items-center justify-end px-6 pt-2.5 pb-1 md:pt-2.5 md:pb-1 bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20">
          <div className="flex items-center gap-1.5">
            {!isIntroLoading && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={copyDuelToClipboard}
                title="Copiar Comparativo"
                className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            )}
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

        {/* Main Content with 1-Second Editorial Intro Stage */}
        <div className="overflow-y-auto px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:pt-1 md:pb-6 hide-scrollbar flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {isIntroLoading ? (
              /* Estágio de Loading de 1 Segundo — Sofisticado, estilo Apple/EvaluateModal */
              <motion.div
                key="duel-intro-loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(3px)' }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="py-8 sm:py-10 flex flex-col items-center justify-center text-center space-y-6 select-none"
              >
                {/* Capas lado a lado parelhas durante a calibragem de 1s */}
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                  {books.map((book, idx) => (
                    <motion.div
                      key={`intro-${book.id}`}
                      initial={{
                        opacity: 0,
                        x: idx === 0 ? -14 : 14,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 26,
                        delay: idx * 0.06,
                      }}
                      className="relative w-24 sm:w-28 md:w-32"
                    >
                      {book.coverUrl && (
                        <div
                          aria-hidden="true"
                          className="absolute -inset-1.5 rounded-2xl overflow-hidden pointer-events-none -z-10 opacity-45"
                          style={{
                            transform: 'translate3d(0, 8px, 0)',
                            filter: 'blur(16px) saturate(1.25)',
                          }}
                        >
                          <img
                            src={book.coverUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <BookCover
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                        notaEncaixe={book.notaEncaixe}
                        userRating={userRatings?.[book.id]?.rating}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Tipografia Shimmer Minimalista + Barra Hairline de 1s */}
                <div className="space-y-2.5 flex flex-col items-center">
                  <p className="text-base sm:text-lg font-semibold tracking-[-0.02em] step-text-shimmer">
                    Cruzando telemetria e perfil
                  </p>
                  <p className="text-xs text-[#86868b] max-w-xs">
                    {books.map((b) => b.title).join(' vs. ')}
                  </p>

                  <div className="w-36 sm:w-44 h-[2px] rounded-full bg-black/[0.07] overflow-hidden mt-1">
                    <motion.div
                      className="h-full bg-[#1d1d1f] rounded-full origin-left"
                      initial={{ scaleX: 0.1 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: INTRO_DURATION_MS / 1000,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Resultado do Comparativo: Mobile = Capas Lado a Lado | Desktop = Capas em 1 Coluna Vertical */
              <motion.div
                key="duel-comparison-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:grid md:grid-cols-12 md:gap-7 lg:gap-8 items-center"
              >
                {/* Left Area: Side-by-side row on Mobile (< md), Single Vertical Column on Desktop (md:) */}
                <div className="w-full md:col-span-4 lg:col-span-3">
                  <div
                    className={`w-full py-1 ${
                      books.length === 3
                        ? 'grid grid-cols-3 gap-2.5 items-center'
                        : 'grid grid-cols-2 gap-4 items-center'
                    } md:flex md:flex-col md:items-center md:justify-center md:space-y-4`}
                  >
                    {orderedBooks.map((book, idx) => {
                      const isWinner = book.id === winnerBook?.id;
                      const effectiveScore = getEffectiveScore(book, userRatings);
                      const isUserRated = Boolean(userRatings?.[book.id]);

                      // Mobile: lado a lado ocupando a coluna do grid; Desktop: larguras diferenciadas na coluna única
                      const coverWidthClass = isWinner
                        ? books.length === 3
                          ? 'w-full max-w-[105px] sm:max-w-[125px] md:w-32'
                          : 'w-full max-w-[138px] sm:max-w-[155px] md:w-38'
                        : books.length === 3
                          ? 'w-full max-w-[92px] sm:max-w-[110px] md:w-22'
                          : 'w-full max-w-[116px] sm:max-w-[132px] md:w-28';

                      return (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 12, scale: 0.94 }}
                          animate={{
                            opacity: isWinner ? 1 : 0.48,
                            y: 0,
                            scale: isWinner ? 1.03 : 0.93,
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: isWinner ? 1.05 : 0.98,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 290,
                            damping: 26,
                            mass: 0.85,
                            delay: idx * 0.06,
                          }}
                          onClick={() => onSelectBook(book)}
                          className={`flex flex-col items-center text-center cursor-pointer group select-none w-full ${
                            !isWinner
                              ? 'saturate-[0.55] hover:saturate-100 transition-[filter] duration-300'
                              : ''
                          }`}
                          title={`Abrir ficha de ${book.title}`}
                        >
                          <div className={`relative ${coverWidthClass} mx-auto mb-2`}>
                            {/* Soft ambient cover glow behind the winning book */}
                            {isWinner && book.coverUrl && (
                              <motion.div
                                aria-hidden="true"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 0.6, scale: 1.05 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute -inset-2 rounded-2xl overflow-hidden pointer-events-none -z-10"
                                style={{
                                  transform: 'translate3d(0, 8px, 0)',
                                  filter: 'blur(18px) saturate(1.35)',
                                }}
                              >
                                <img
                                  src={book.coverUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="eager"
                                  decoding="async"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            )}

                            <BookCover
                              title={book.title}
                              author={book.author}
                              coverUrl={book.coverUrl}
                              notaEncaixe={book.notaEncaixe}
                              userRating={userRatings?.[book.id]?.rating}
                            />
                          </div>

                          {/* Metadata Centered under Each Cover */}
                          <div className="space-y-0.5 max-w-[165px] sm:max-w-[200px] px-1">
                            <h4
                              className={`text-xs sm:text-[13px] truncate leading-snug tracking-tight ${
                                isWinner ? 'font-bold text-[#1d1d1f]' : 'font-semibold text-[#1d1d1f]'
                              }`}
                            >
                              {book.title}
                            </h4>
                            <p className="text-[10.5px] text-[#86868b] truncate">
                              {book.pages} págs • {isUserRated ? 'Nota' : 'Encaixe'}{' '}
                              {Math.floor(effectiveScore)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Staggered Editorial Comparison */}
                <div className="w-full md:col-span-8 lg:col-span-9 space-y-3.5 min-w-0 mt-4 md:mt-0">
                  {/* 1. Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-1 text-center sm:text-left"
                  >
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 border border-neutral-200/80 text-[#86868b]">
                        Comparativo de Leitura
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] text-[#86868b] bg-neutral-100 border border-neutral-200/80 font-score font-semibold">
                        {books.map((b) => `${b.pages} págs`).join(' vs. ')}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-2xl md:text-[24px] font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
                      {books.map((b) => b.title).join(' vs. ')}
                    </h2>
                  </motion.div>

                  {/* 2. Veredito Comparativo Banner + Tactile Black CTA Pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="p-3.5 md:p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/70 border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                        {isRefiningWithAi ? 'Calibrando Veredito Comparativo...' : 'Veredito Comparativo'}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#1d1d1f] italic leading-relaxed">
                        "{verdict.headline}"
                      </p>
                    </div>

                    <div className="shrink-0 self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => winnerBook && onSelectBook(winnerBook)}
                        className="group/cta inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-full bg-gradient-to-b from-[#2e2e33] via-[#1d1d1f] to-[#121214] hover:from-[#3a3a40] hover:to-[#1d1d1f] text-white font-bold text-[11px] tracking-tight border border-black/80 shadow-[0_6px_16px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all cursor-pointer active:scale-95 select-none"
                        title={`Abrir ficha de ${winnerBook?.title}`}
                      >
                        <span className="truncate max-w-[190px]">
                          Comece por {winnerBook?.title}
                        </span>
                        <span className="w-4.5 h-4.5 rounded-full bg-white/15 group-hover/cta:bg-white/25 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3 h-3 text-white stroke-[2.5]" />
                        </span>
                      </button>
                    </div>
                  </motion.div>

                  {/* 3. Compact Side-by-Side Occasion Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid grid-cols-1 ${
                      books.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                    } gap-2.5`}
                  >
                    {books.map((book) => {
                      const scenario = verdict.scenarios.find((s) => s.bookId === book.id);
                      const isWinner = book.id === winnerBook?.id;

                      return (
                        <div
                          key={`scenario-${book.id}`}
                          onClick={() => onSelectBook(book)}
                          className="px-3.5 py-2.5 rounded-xl bg-neutral-50/90 hover:bg-neutral-100/80 border border-neutral-200/75 hover:border-neutral-300 transition-all cursor-pointer group space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isWinner ? 'bg-[#1d1d1f]' : 'bg-neutral-300'
                                }`}
                              />
                              <span className="text-xs font-bold text-[#1d1d1f] truncate group-hover:text-black">
                                {book.title}
                              </span>
                            </div>
                            {scenario && (
                              <span className="text-[10px] font-semibold text-[#86868b] truncate shrink-0">
                                {scenario.label}
                              </span>
                            )}
                          </div>

                          {scenario && (
                            <p className="text-[11px] text-[#636366] leading-snug line-clamp-2">
                              {scenario.reason}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* 4. Critérios do Veredito — Telemetria Comparada com Barras 3D Animadas */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2 pt-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                        <Gauge className="w-3.5 h-3.5 text-[#1d1d1f]" />
                        <span>Critérios do Veredito</span>
                      </div>
                      <span className="text-[10px] text-[#86868b] font-score font-semibold">
                        Telemetria Comparada
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {criteriaList.map((crit, critIdx) => {
                        const scores = books.map((b) => crit.getValue(b));
                        const maxScore = Math.max(...scores);

                        return (
                          <motion.div
                            key={crit.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.28,
                              delay: 0.2 + critIdx * 0.035,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/70 transition-colors space-y-2 shadow-2xs hover:border-neutral-300"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {crit.icon}
                              <span className="text-[13px] font-bold text-[#1d1d1f] tracking-tight truncate">
                                {crit.label}
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              {books.map((book) => {
                                const val = crit.getValue(book);
                                const isLeader = val === maxScore;
                                const tone = getScoreTone(val);
                                const targetWidth = `${Math.min(100, Math.max(8, Math.floor(val) * 10))}%`;

                                return (
                                  <div key={`${crit.id}-${book.id}`} className="space-y-0.5">
                                    <div className="flex items-center justify-between text-[11px] gap-1.5">
                                      <span
                                        className={`truncate ${
                                          isLeader
                                            ? 'font-bold text-[#1d1d1f]'
                                            : 'font-medium text-[#86868b]'
                                        }`}
                                      >
                                        {book.title}
                                      </span>
                                      <span
                                        className={`font-score shrink-0 ${
                                          isLeader
                                            ? 'font-extrabold text-[#1d1d1f]'
                                            : 'font-semibold text-[#86868b]'
                                        }`}
                                      >
                                        {val}
                                      </span>
                                    </div>

                                    {/* 3D Tactile Progress Track with Animated Entrance */}
                                    <div className="w-full h-2 rounded-full overflow-hidden bg-neutral-200/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.16),0_1px_1px_rgba(255,255,255,0.8)] border border-neutral-300/40 p-[1px]">
                                      <motion.div
                                        initial={{ width: '8%' }}
                                        animate={{ width: targetWidth }}
                                        transition={{
                                          duration: 0.55,
                                          delay: 0.24 + critIdx * 0.04,
                                          ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className={`h-full rounded-full relative overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.7)] ${
                                          !isLeader
                                            ? 'bg-gradient-to-b from-neutral-400 to-neutral-500 opacity-55'
                                            : tone === 'green'
                                              ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600'
                                              : tone === 'yellow'
                                                ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500'
                                                : 'bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600'
                                        }`}
                                      >
                                        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/55 to-transparent rounded-t-full pointer-events-none" />
                                      </motion.div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default DuelModal;
