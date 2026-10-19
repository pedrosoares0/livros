import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, BookOpen, ChevronRight, AlertTriangle, Check, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBulkList, evaluateBook } from '../services/evaluator';
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
  'Localizando edição em português e premissa...',
  'Analisando estrutura, ritmo e temas...',
  'Consultando o Gemini com o seu perfil...',
  'Calibrando Nota Técnica e Nota de Encaixe...',
];

export const EvaluateModal: React.FC<EvaluateModalProps> = ({
  isOpen,
  onClose,
  onBookEvaluated,
  onBulkEvaluated,
  existingBooks = [],
  onOpenBook,
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [query, setQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [duplicateWarning, setDuplicateWarning] = useState<BookEvaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [apiSuggestions, setApiSuggestions] = useState<Partial<BookEvaluation>[]>([]);
  const [bookToConfirm, setBookToConfirm] = useState<Partial<BookEvaluation> | null>(null);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

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
    }, 280);
  };

  const handleClearQuery = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    setQuery('');
    setApiSuggestions([]);
    setIsSearching(false);
    setDuplicateWarning(null);
    setBookToConfirm(null);
  };

  const runEvaluationWithProgress = async (
    title: string,
    extraContext?: { author?: string; description?: string; coverUrl?: string; pages?: number; genres?: string[] }
  ) => {
    setEvalError(null);
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

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
        'Falha ao obter avaliação da IA do Gemini. Por favor, tente novamente em alguns segundos.'
      );
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStepIndex(0);
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
    setBookToConfirm(rawBook);
  };

  const handleConfirmEvaluation = () => {
    if (!bookToConfirm) return;
    const target = bookToConfirm;
    setBookToConfirm(null);

    runEvaluationWithProgress(target.title || query.trim() || 'Livro', {
      author: target.author,
      description: target.resumo,
      coverUrl: target.coverUrl,
      pages: target.pages,
      genres: target.genres,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (document.activeElement as HTMLElement)?.blur();

    // Se o usuário apertar Enter no teclado e não houver sugestões prontas
    if (apiSuggestions.length === 0 && query.trim().length >= 3 && !isSearching) {
      const existing = findAlreadyEvaluated(query.trim());
      if (existing) {
        setDuplicateWarning(existing);
        return;
      }
      setBookToConfirm({
        title: query.trim(),
        author: 'Autor a consultar',
        coverUrl: undefined,
      });
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    (document.activeElement as HTMLElement)?.blur();
    setEvalError(null);
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      const lines = bulkText.split(/[\n;]+/).map((l) => l.trim()).filter((l) => l.length > 2);
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
      setEvalError('Falha ao avaliar a lista com a IA. Tente novamente.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStepIndex(0);
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

        {/* Modal Window — iPhone-optimized bottom sheet with max-h-[92dvh] and pb-safe */}
        <motion.div
          initial={{ y: 32, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 32, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          className="relative w-full max-w-lg max-h-[92dvh] sm:max-h-[86vh] bg-white border border-neutral-200/90 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 pb-safe"
        >
          {/* iOS Handle Indicator on mobile */}
          <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

          {/* Minimalist Top Close Bar with Apple HIG touch target */}
          <div className="flex items-center justify-end px-5 pt-2 pb-1 sticky top-0 z-20 bg-white/95 backdrop-blur-md">
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
            <div className="flex p-1 mx-5 mt-1 rounded-xl bg-neutral-100 border border-neutral-200/70 shrink-0">
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
          <div className="p-5 overflow-y-auto hide-scrollbar space-y-3.5 flex-1">
            {isLoading ? (
              /* Thoughtful Stepped Evaluation Loading State */
              <div className="py-12 px-4 text-center space-y-5">
                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-neutral-200 animate-ping opacity-30" />
                  <div className="w-12 h-12 rounded-full border-2 border-neutral-300 border-t-neutral-900 animate-spin" />
                  <BookOpen className="w-5 h-5 text-neutral-800 absolute" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-[#1d1d1f]">
                    Avaliando com base no seu perfil
                  </h3>
                  <p className="text-xs text-[#86868b] font-medium transition-all duration-300">
                    {EVALUATION_STEPS[loadingStepIndex]}
                  </p>
                </div>

                <div className="flex justify-center gap-1.5 pt-2">
                  {EVALUATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i <= loadingStepIndex ? 'w-6 bg-neutral-900' : 'w-2 bg-neutral-200'
                      }`}
                    />
                  ))}
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

                {/* Integrated Search Bar (No inline Avaliar button, preventing accidental taps) */}
                <form onSubmit={handleSearchSubmit} className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Pesquise por título, autor ou ISBN:
                  </label>

                  <div className="relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b] pointer-events-none" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ex: O massacre da família Hope, Duna, 1984..."
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-sm focus:outline-none transition-all duration-150"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="words"
                      spellCheck={false}
                      enterKeyHint="search"
                    />

                    {isSearching ? (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-neutral-600 animate-spin" />
                      </div>
                    ) : query.trim().length > 0 ? (
                      <button
                        type="button"
                        onClick={handleClearQuery}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
                        aria-label="Limpar campo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>
                </form>

                {/* Suggestions from Books API */}
                {apiSuggestions.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-neutral-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                        Edições Encontradas ({apiSuggestions.length})
                      </span>
                      <span className="text-[10px] text-[#86868b]">
                        Selecione para avaliar
                      </span>
                    </div>

                    {/* Touch-optimized scroll area with auto-blur on scroll */}
                    <div
                      onTouchMove={() => (document.activeElement as HTMLElement)?.blur()}
                      className="space-y-2 max-h-72 sm:max-h-80 overflow-y-auto pr-1"
                    >
                      {apiSuggestions.map((book, idx) => {
                        const isAlready = findAlreadyEvaluated(book.title || '');
                        return (
                          <div
                            key={book.id || idx}
                            onClick={() => handleRequestEvaluation(book)}
                            className="group flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 active:bg-neutral-200/60 border border-neutral-200/70 hover:border-neutral-300 cursor-pointer transition-all active:scale-[0.99] shadow-2xs"
                          >
                            {/* Generous Cover with 2:3 Aspect Ratio */}
                            <div className="w-14 sm:w-16 shrink-0">
                              <BookCover
                                title={book.title || 'Livro'}
                                author={book.author || 'Autor'}
                                coverUrl={book.coverUrl}
                              />
                            </div>

                            {/* Descriptive Metadata */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <h4 className="text-xs sm:text-sm font-bold text-[#1d1d1f] line-clamp-2 leading-snug">
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
                                ) : book.pages ? (
                                  <span className="text-[9px] font-medium text-[#6e6e73] bg-neutral-200/60 px-1.5 py-0.5 rounded-md">
                                    ~{book.pages} págs
                                  </span>
                                ) : null}
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
                                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center gap-1"
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
                  <div className="p-4 rounded-2xl bg-neutral-50/90 border border-neutral-200/70 text-center space-y-2">
                    <p className="text-xs font-bold text-[#1d1d1f]">
                      Nenhuma edição direta encontrada no acervo
                    </p>
                    <p className="text-[11px] text-[#86868b] max-w-xs mx-auto leading-relaxed">
                      Deseja consultar a IA diretamente para avaliar <strong>"{query.trim()}"</strong>?
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleRequestEvaluation({
                          title: query.trim(),
                          author: 'Autor a consultar',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-xs cursor-pointer mt-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Avaliar "{query.trim()}" com a IA</span>
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3">
                <div className="space-y-0.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Cole sua lista (um livro por linha):
                  </label>
                  <p className="text-[11px] text-[#86868b]">
                    Exemplo: <em>Duna - Frank Herbert</em> ou apenas <em>1984</em>.
                  </p>
                </div>

                <textarea
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={"Vidas Secas - Graciliano Ramos\n1984 - George Orwell\nA Estrada - Cormac McCarthy"}
                  rows={5}
                  className="w-full p-3 rounded-xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-xs font-mono focus:outline-none transition-all duration-150 resize-none leading-relaxed"
                />

                <div className="flex justify-end pt-1">
                  <AceternityButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!bulkText.trim()}
                    className="font-bold text-xs"
                  >
                    Avaliar Lista Completa
                  </AceternityButton>
                </div>
              </form>
            )}
          </div>

          {/* Confirmation Modal Alert */}
          <AnimatePresence>
            {bookToConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 14 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 10 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 380 }}
                  className="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl shadow-2xl border border-neutral-200/90 p-5 space-y-3.5 text-center overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Confirmar Avaliação</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookToConfirm(null)}
                      className="p-1 -mr-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="Cancelar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Capa do Livro */}
                  <div className="w-24 sm:w-28 mx-auto drop-shadow-lg rounded-md overflow-hidden">
                    <BookCover
                      title={bookToConfirm.title || 'Livro'}
                      author={bookToConfirm.author || 'Autor'}
                      coverUrl={bookToConfirm.coverUrl}
                    />
                  </div>

                  {/* Título e Autor */}
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] leading-snug line-clamp-2 px-1">
                      {bookToConfirm.title}
                    </h3>
                    <p className="text-xs text-[#86868b]">
                      de <strong className="text-neutral-800 font-semibold">{bookToConfirm.author || 'Autor a verificar'}</strong>
                    </p>

                    <div className="flex items-center justify-center gap-1.5 pt-0.5 flex-wrap">
                      {bookToConfirm.year && (
                        <span className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                          {bookToConfirm.year}
                        </span>
                      )}
                      {bookToConfirm.pages && (
                        <span className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                          ~{bookToConfirm.pages} págs
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#86868b] leading-relaxed px-1">
                    Deseja avaliar esta obra com o perfil literário do Veredito? A IA calibrará as notas técnica e de encaixe.
                  </p>

                  {/* Botões de Ação */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setBookToConfirm(null)}
                      className="flex-1 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/70 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmEvaluation}
                      className="flex-1 py-2.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-black rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Avaliar Livro</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


