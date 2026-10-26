import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, BookOpen, ChevronRight, AlertTriangle, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBulkList, evaluateBook, isAmazonUrl } from '../services/evaluator';
import { evaluateWithGemini, evaluateBulkWithGemini } from '../services/geminiEvaluator';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { AceternityButton } from './AceternityButton';

interface EvaluateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookEvaluated: (book: BookEvaluation) => void;
  onBulkEvaluated: (books: BookEvaluation[]) => void;
  existingBooks?: BookEvaluation[];
  onOpenBook?: (book: BookEvaluation) => void;
}

const EVALUATION_STEPS = [
  'Localizando edição e estruturando premissa...',
  'Analisando ritmo narrativo e worldbuilding...',
  'Cruzando temas com o seu perfil pessoal de leitura...',
  'Examinando densidade dramática e dilemas morais...',
  'Calibrando Nota Técnica e Nota de Encaixe...',
  'Mapeando paralelos no cinema e literatura...',
  'Sintetizando veredito final e justificativa crítica...',
];

const ANALYSIS_DIMENSIONS = [
  'Prosa & Ritmo',
  'Worldbuilding',
  'Perfil do Leitor',
  'Nota de Encaixe',
  'Veredito Final',
];

const POPULAR_SUGGESTIONS = [
  'Duna',
  'Neuromancer',
  'O Problema dos Três Corpos',
  'Fundação',
  '1984',
  'Fahrenheit 451',
  'Solaris',
  'Cem Anos de Solidão',
];

export const EvaluateModal: React.FC<EvaluateModalProps> = ({
  isOpen,
  onClose,
  onBookEvaluated,
  onBulkEvaluated,
  existingBooks = [],
  onOpenBook,
}) => {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [query, setQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [evaluatingBook, setEvaluatingBook] = useState<{
    title: string;
    author?: string;
    coverUrl?: string;
  } | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<BookEvaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [apiSuggestions, setApiSuggestions] = useState<Partial<BookEvaluation>[]>([]);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  // Keyboard Escape listener for seamless dismissal on PC
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, isLoading]);

  // Lock body scroll while modal is active for native app feel
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isOpen) return null;

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim();

  const findAlreadyEvaluated = (targetTitle: string): BookEvaluation | null => {
    if (!existingBooks || existingBooks.length === 0) return null;
    const normTarget = normalizeText(targetTitle);
    if (!normTarget || normTarget.length < 3) return null;

    return (
      existingBooks.find((b) => {
        const normTitle = normalizeText(b.title);
        if (normTitle === normTarget) return true;
        if (b.originalTitle && normalizeText(b.originalTitle) === normTarget) return true;
        if (normTarget.length >= 4 && normTitle.length >= 4) {
          if (normTitle.includes(normTarget) || normTarget.includes(normTitle)) return true;
        }
        return false;
      }) || null
    );
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (duplicateWarning) setDuplicateWarning(null);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    const trimmed = val.trim();
    if (trimmed.length < 3) {
      setApiSuggestions([]);
      setIsSearching(false);
      return;
    }

    const isAmazon = isAmazonUrl(trimmed);
    setIsSearching(true);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchBookApi(trimmed);
        setApiSuggestions(results);
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setIsSearching(false);
      }
    }, isAmazon ? 50 : 280);
  };

  const handleClearQuery = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    setQuery('');
    setApiSuggestions([]);
    setIsSearching(false);
    setDuplicateWarning(null);
  };

  const runEvaluationWithProgress = async (
    title: string,
    extraContext?: {
      author?: string;
      description?: string;
      coverUrl?: string;
      pages?: number;
      year?: number;
      genres?: string[];
    }
  ) => {
    setEvalError(null);
    setEvaluatingBook({
      title,
      author: extraContext?.author,
      coverUrl: extraContext?.coverUrl,
    });
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => prev + 1);
    }, 1700);

    try {
      const evaluation = await evaluateWithGemini(title, extraContext);

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (evaluation.notaEncaixe >= 8) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#1d1d1f', '#10b981', '#f59e0b'],
        });
      }

      onBookEvaluated(evaluation);
      onClose();
    } catch (err: any) {
      console.error('Fatal evaluation error:', err);
      setEvalError(
        'Falha ao obter avaliação do Veredito. Por favor, tente novamente em alguns segundos.'
      );
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStepIndex(0);
      setEvaluatingBook(null);
    }
  };

  const handleRequestEvaluation = (rawBook: Partial<BookEvaluation>) => {
    // Dismiss mobile keyboard on selection
    (document.activeElement as HTMLElement)?.blur();
    setEvalError(null);

    const existing = findAlreadyEvaluated(rawBook.title || query);
    if (existing) {
      setDuplicateWarning(existing);
      return;
    }
    setDuplicateWarning(null);

    runEvaluationWithProgress(rawBook.title || query.trim() || 'Livro', {
      author: rawBook.author,
      description: rawBook.resumo,
      coverUrl: rawBook.coverUrl,
      pages: rawBook.pages,
      year: rawBook.year,
      genres: rawBook.genres,
    });
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    (document.activeElement as HTMLElement)?.blur();

    const trimmed = query.trim();
    if (trimmed.length < 3) return;

    if (apiSuggestions.length > 0) {
      handleRequestEvaluation(apiSuggestions[0]);
      return;
    }

    if (isAmazonUrl(trimmed)) {
      if (!isSearching) {
        setIsSearching(true);
        try {
          const results = await searchBookApi(trimmed);
          setApiSuggestions(results);
          if (results.length > 0) {
            handleRequestEvaluation(results[0]);
          }
        } catch (e) {
          console.error('Amazon search error:', e);
        } finally {
          setIsSearching(false);
        }
      }
      return;
    }

    // Se o usuário apertar Enter no teclado e não houver sugestões prontas (busca por título comum)
    if (!isSearching) {
      const existing = findAlreadyEvaluated(trimmed);
      if (existing) {
        setDuplicateWarning(existing);
        return;
      }
      runEvaluationWithProgress(trimmed);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    (document.activeElement as HTMLElement)?.blur();
    setEvalError(null);
    const lines = bulkText.split(/[\n;]+/).map((l) => l.trim()).filter((l) => l.length > 2);
    setEvaluatingBook({
      title: 'Avaliação em lote',
      author: `${lines.length} ${lines.length === 1 ? 'livro selecionado' : 'livros na lista'}`,
    });
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => prev + 1);
    }, 1800);

    try {
      let results: BookEvaluation[];
      try {
        results = await evaluateBulkWithGemini(lines);
      } catch (geminiError) {
        console.warn('Gemini bulk call failed, falling back:', geminiError);
        results = evaluateBulkList(bulkText);
      }

      const newOnly = results.filter((b) => !findAlreadyEvaluated(b.title));
      if (newOnly.length === 0 && results.length > 0) {
        const firstDup = findAlreadyEvaluated(results[0].title);
        if (firstDup) {
          setDuplicateWarning(firstDup);
          setIsLoading(false);
          return;
        }
      }
      onBulkEvaluated(newOnly.length > 0 ? newOnly : results);
      onClose();
    } catch (err: any) {
      console.error('Bulk error:', err);
      setEvalError('Falha ao avaliar a lista. Tente novamente.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStepIndex(0);
      setEvaluatingBook(null);
    }
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
          onClick={() => !isLoading && onClose()}
          className="absolute inset-0 bg-black/45 backdrop-blur-sm z-10"
        />

        {/* Modal Window — Apple & Raycast-grade Command Palette for Desktop, Touch Sheet on Mobile */}
        <motion.div
          initial={{ y: 32, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 32, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          className="relative w-full max-w-lg md:max-w-3xl lg:max-w-4xl max-h-[92dvh] sm:max-h-[88vh] md:max-h-[88vh] bg-white border border-neutral-200/90 rounded-t-3xl sm:rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 pb-safe will-change-transform"
        >
          {/* iOS Handle Indicator on mobile */}
          <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

          {/* Minimalist Top Close Bar */}
          <div className="flex items-center justify-end px-5 sm:px-6 md:px-8 pt-3 pb-1 sticky top-0 z-20 bg-white/95 backdrop-blur-md">
            {!isLoading && (
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="p-2 -mr-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200/70 text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          {!isLoading && (
            <div className="flex p-1 mx-5 sm:mx-6 md:mx-8 mt-2.5 rounded-xl bg-neutral-100 border border-neutral-200/70 shrink-0 max-w-xs md:max-w-sm">
              <button
                onClick={() => setTab('single')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 select-none active:scale-[0.98] cursor-pointer ${
                  tab === 'single'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-bold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Livro Único</span>
              </button>
              <button
                onClick={() => setTab('bulk')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 select-none active:scale-[0.98] cursor-pointer ${
                  tab === 'bulk'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-bold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>Colar Lista</span>
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-5 sm:p-6 md:px-8 overflow-y-auto hide-scrollbar space-y-4 flex-1">
            {isLoading ? (
              /* Cinematic AI Telemetry Deck on Desktop, Compact Centered on Mobile */
              <div className="py-2 sm:py-4 md:py-6">
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-center">
                  
                  {/* Left Column: Book Cover with Ambient Chromatic Glow */}
                  <div className="w-full md:col-span-5 flex flex-col items-center justify-center space-y-4 md:border-r md:border-neutral-200/80 md:pr-6 text-center">
                    <div className="relative mx-auto flex flex-col items-center">
                      {evaluatingBook?.coverUrl ? (
                        <motion.div
                          animate={{
                            scale: [1.04, 1.15, 1.04],
                            opacity: [0.55, 0.8, 0.55],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none -z-10"
                          style={{
                            transform: 'translateY(12px)',
                            filter: 'blur(26px)',
                          }}
                        >
                          <img
                            src={evaluatingBook.coverUrl}
                            alt=""
                            className="w-full h-full object-cover scale-125"
                            loading="eager"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.35, 0.55, 0.35],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-sky-500/25 blur-2xl pointer-events-none -z-10"
                        />
                      )}

                      <div className="relative w-32 sm:w-36 md:w-44 shadow-[0_16px_40px_rgba(0,0,0,0.22)] rounded-xl overflow-hidden border border-black/10 z-10">
                        {evaluatingBook?.coverUrl ? (
                          <BookCover
                            title={evaluatingBook.title}
                            author={evaluatingBook.author || ''}
                            coverUrl={evaluatingBook.coverUrl}
                          />
                        ) : (
                          <div className="w-full aspect-[2/3] rounded-xl bg-neutral-100 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-neutral-400" />
                          </div>
                        )}
                      </div>

                      {/* Live telemetry badge */}
                      <div className="relative -mt-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1d1d1f] text-white shadow-lg border border-white/10 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Análise em tempo real</span>
                      </div>
                    </div>

                    <div className="space-y-1 max-w-xs">
                      <h3 className="text-sm md:text-base font-bold text-[#1d1d1f] line-clamp-2">
                        {evaluatingBook ? evaluatingBook.title : 'Avaliando obra'}
                      </h3>
                      {evaluatingBook?.author && (
                        <p className="text-xs text-[#86868b] truncate">
                          {evaluatingBook.author}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Step Ticker, Telemetry Dimensions Cards, Progress Bar */}
                  <div className="w-full md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5 text-center md:text-left md:pl-2 mt-4 md:mt-0">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Análise Crítica</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-[#1d1d1f]">
                        Processando Telemetria da Obra
                      </h4>

                      {/* Step Ticker */}
                      <div className="h-8 flex items-center justify-center md:justify-start overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={loadingStepIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="text-xs md:text-sm text-neutral-700 font-medium"
                          >
                            {loadingStepIndex < EVALUATION_STEPS.length
                              ? EVALUATION_STEPS[loadingStepIndex]
                              : 'Sintetizando veredito final e justificativa crítica...'}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Telemetry Dimensions Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {ANALYSIS_DIMENSIONS.map((dim, i) => {
                        const isCompleted = loadingStepIndex > i;
                        const isCurrent = loadingStepIndex === i;
                        return (
                          <div
                            key={dim}
                            className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                              isCurrent
                                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm scale-[1.02]'
                                : isCompleted
                                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                                : 'bg-neutral-50/70 border-neutral-200/50 text-neutral-400 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="truncate">{dim}</span>
                              {isCurrent && <Loader2 className="w-3 h-3 animate-spin shrink-0 text-white" />}
                              {isCompleted && <Check className="w-3 h-3 shrink-0 text-emerald-600 stroke-[3]" />}
                            </div>
                            <span className="text-[9px] font-medium mt-1">
                              {isCurrent ? 'Calibrando...' : isCompleted ? 'Calibrado ✓' : 'Aguardando'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Continuous Dynamic Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="w-full h-1.5 rounded-full bg-neutral-200/70 overflow-hidden relative">
                        <motion.div
                          className="h-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-black rounded-full relative overflow-hidden"
                          initial={{ width: '15%' }}
                          animate={{
                            width: `${Math.min(18 + loadingStepIndex * 13, 94)}%`,
                          }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#86868b] font-mono">
                        <span>CALIBRAGEM CRÍTICA</span>
                        <span>{Math.min(20 + loadingStepIndex * 13, 95)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : tab === 'single' ? (
              <div className="space-y-3.5">
                {/* Duplicate Book Warning Banner */}
                <AnimatePresence>
                  {duplicateWarning && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      className="p-3.5 rounded-2xl bg-amber-50/95 border border-amber-200 shadow-sm flex flex-col gap-2.5"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded-md">
                              Já avaliado
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-amber-950 mt-1">
                            Esse livro já foi avaliado
                          </h4>
                          <p className="text-[11px] text-amber-900/85 mt-0.5 leading-relaxed">
                            <strong>"{duplicateWarning.title}"</strong> ({duplicateWarning.author}) já está no seu acervo com Nota <strong>{Math.floor(duplicateWarning.notaEncaixe)}</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-amber-200/70">
                        <button
                          type="button"
                          onClick={() => setDuplicateWarning(null)}
                          className="px-2.5 py-1 text-xs font-semibold text-amber-800 hover:text-amber-950 rounded-lg transition-colors cursor-pointer"
                        >
                          Tentar outro
                        </button>
                        {onOpenBook && (
                          <AceternityButton
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              onClose();
                              onOpenBook(duplicateWarning);
                            }}
                            className="!bg-amber-950 hover:!bg-black !text-white text-xs font-bold"
                          >
                            Ver Ficha
                          </AceternityButton>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Evaluation Error Banner */}
                <AnimatePresence>
                  {evalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-950 text-xs flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                        </div>
                        <span className="leading-snug font-medium text-[11px] text-rose-900">{evalError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEvalError(null)}
                        className="text-rose-700 hover:text-rose-950 text-[11px] font-bold px-2 py-1 rounded-lg hover:bg-rose-100/70 transition-colors cursor-pointer shrink-0"
                      >
                        Fechar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Command Palette Styled Search Bar */}
                <form onSubmit={handleSearchSubmit} className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Pesquise por título, autor, ISBN ou cole um link da Amazon:
                  </label>

                  <div className="relative w-full">
                    <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#86868b] pointer-events-none" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ex: Duna, Neuromancer ou cole link da Amazon..."
                      className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 rounded-2xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-sm md:text-base focus:outline-none transition-all duration-150 shadow-2xs"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="words"
                      spellCheck={false}
                      enterKeyHint="search"
                    />

                    {isSearching ? (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-neutral-600 animate-spin" />
                      </div>
                    ) : query.trim().length > 0 ? (
                      <button
                        type="button"
                        onClick={handleClearQuery}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
                        aria-label="Limpar campo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>

                  {isSearching && isAmazonUrl(query) && (
                    <div className="flex items-center gap-1.5 pt-0.5 px-0.5 text-xs text-[#86868b]">
                      <Loader2 className="w-3 h-3 animate-spin text-neutral-700" />
                      <span>Reconhecendo livro da Amazon...</span>
                    </div>
                  )}
                </form>

                {/* Suggestions from Books API — 2 Column Responsive Grid on Desktop */}
                {apiSuggestions.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-neutral-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                        {apiSuggestions[0]?.id?.startsWith('amz-')
                          ? 'Livro Reconhecido da Amazon'
                          : `Edições Encontradas (${apiSuggestions.length})`}
                      </span>
                      <span className="text-[10px] text-[#86868b]">
                        Selecione para avaliar com o Veredito
                      </span>
                    </div>

                    {/* Touch-optimized scroll area with auto-blur on scroll */}
                    <div
                      onTouchMove={() => (document.activeElement as HTMLElement)?.blur()}
                      className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-3 max-h-72 sm:max-h-80 md:max-h-96 overflow-y-auto pr-1"
                    >
                      {apiSuggestions.map((book, idx) => {
                        const isAlready = findAlreadyEvaluated(book.title || '');
                        const isFromAmazon = book.id?.startsWith('amz-');
                        return (
                          <div
                            key={book.id || idx}
                            onClick={() => handleRequestEvaluation(book)}
                            className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 active:bg-neutral-200/60 border border-neutral-200/70 hover:border-neutral-300 cursor-pointer transition-all active:scale-[0.99] shadow-2xs hover:shadow-xs"
                          >
                            {/* Generous Cover with 2:3 Aspect Ratio */}
                            <div className="w-14 sm:w-16 md:w-18 shrink-0">
                              <BookCover
                                title={book.title || 'Livro'}
                                author={book.author || 'Autor'}
                                coverUrl={book.coverUrl}
                              />
                            </div>

                            {/* Descriptive Metadata */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <h4 className="text-xs sm:text-sm font-bold text-[#1d1d1f] line-clamp-2 leading-snug group-hover:text-black">
                                {book.title}
                              </h4>
                              <p className="text-[11px] text-[#86868b] truncate">
                                {book.author}
                              </p>
                              <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                                {isAlready ? (
                                  <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-200/80 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                    <Check className="w-2.5 h-2.5 text-amber-700" />
                                    Já avaliado
                                  </span>
                                ) : (
                                  <>
                                    {isFromAmazon && (
                                      <span className="text-[9px] font-semibold text-[#1d1d1f] bg-neutral-200/80 px-1.5 py-0.5 rounded-md">
                                        Amazon
                                      </span>
                                    )}
                                    {book.pages ? (
                                      <span className="text-[9px] font-medium text-[#6e6e73] bg-neutral-200/60 px-1.5 py-0.5 rounded-md">
                                        {book.pages} págs
                                      </span>
                                    ) : null}
                                  </>
                                )}
                                {book.year && (
                                  <span className="text-[9px] font-medium text-[#6e6e73]">
                                    {book.year}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Botão de Avaliar ao lado de cada livro */}
                            <div className="shrink-0 flex items-center">
                              {isAlready ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                    onOpenBook?.(isAlready);
                                  }}
                                  className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 hover:text-black bg-neutral-200/70 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                                >
                                  Ver Ficha
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRequestEvaluation(book);
                                  }}
                                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                                >
                                  <span>Avaliar</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : query.trim().length >= 3 && !isSearching ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/70 text-center space-y-2.5">
                    <p className="text-xs sm:text-sm font-bold text-[#1d1d1f]">
                      Nenhuma edição direta encontrada na busca rápida
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#86868b] max-w-sm mx-auto leading-relaxed">
                      Deseja avaliar <strong>"{query.trim()}"</strong> agora no Veredito?
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleRequestEvaluation({
                          title: query.trim(),
                          author: 'Autor a consultar',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-xs cursor-pointer mt-1"
                    >
                      <span>Avaliar "{query.trim()}"</span>
                    </button>
                  </div>
                ) : (
                  /* Initial Empty State on Desktop: Quick Suggestions */
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                      Sugestões Populares para Avaliar
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SUGGESTIONS.map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => handleInputChange(title)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/80 text-xs font-medium text-neutral-800 transition-colors cursor-pointer active:scale-95 flex items-center gap-1"
                        >
                          <span>{title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Bulk Mode ("Colar Lista") */
              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-xs font-semibold text-[#1d1d1f] block">
                      Cole sua lista de títulos (um por linha):
                    </label>
                    <p className="text-[11px] text-[#86868b]">
                      Formato recomendado: <em>Título - Autor</em> ou apenas <em>Título</em>.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200 font-score">
                    {bulkText.split(/[\n;]+/).filter((l) => l.trim().length > 2).length} livros detectados
                  </span>
                </div>

                <textarea
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={"Duna - Frank Herbert\nNeuromancer - William Gibson\nFundação - Isaac Asimov\n1984 - George Orwell"}
                  rows={6}
                  className="w-full p-3.5 rounded-2xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-xs font-mono focus:outline-none transition-all duration-150 resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="hidden md:inline text-[11px] text-[#86868b]">
                    Cada livro receberá Nota Técnica, Nota de Encaixe e Veredito Crítico.
                  </span>
                  <AceternityButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!bulkText.trim()}
                    className="font-bold text-xs"
                  >
                    Avaliar Lista em Lote
                  </AceternityButton>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


