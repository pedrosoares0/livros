import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, BookOpen, ChevronRight, AlertTriangle, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBulkList, evaluateBook } from '../services/evaluator';
import { evaluateWithGemini } from '../services/geminiEvaluator';
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
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [query, setQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [duplicateWarning, setDuplicateWarning] = useState<BookEvaluation | null>(null);
  const [apiSuggestions, setApiSuggestions] = useState<Partial<BookEvaluation>[]>([]);

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

  const handleInputChange = async (val: string) => {
    setQuery(val);
    if (duplicateWarning) setDuplicateWarning(null);

    if (val.trim().length >= 3) {
      try {
        const results = await searchBookApi(val);
        setApiSuggestions(results);
      } catch (e) {
        console.error(e);
      }
    } else {
      setApiSuggestions([]);
    }
  };

  const handleClearQuery = () => {
    setQuery('');
    setApiSuggestions([]);
    setDuplicateWarning(null);
  };

  const runEvaluationWithProgress = async (
    title: string,
    extraContext?: { author?: string; description?: string; coverUrl?: string; pages?: number; genres?: string[] }
  ) => {
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      // 1. Try real Gemini 3.8 Flash evaluation with user taste profile
      let evaluation: BookEvaluation;
      try {
        evaluation = await evaluateWithGemini(title, extraContext);
      } catch (geminiError) {
        console.warn('Gemini call failed, using calibrated fallback engine:', geminiError);
        evaluation = evaluateBook({
          title,
          author: extraContext?.author,
          pages: extraContext?.pages,
          description: extraContext?.description,
          genres: extraContext?.genres,
          coverUrl: extraContext?.coverUrl,
        });
      }

      // Ensure minimum thinking time so user can see the analysis steps
      await new Promise((resolve) => setTimeout(resolve, 800));

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
    } catch (err) {
      console.error('Fatal evaluation error:', err);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStepIndex(0);
    }
  };

  const handleSelectBook = (rawBook: Partial<BookEvaluation>) => {
    const existing = findAlreadyEvaluated(rawBook.title || query);
    if (existing) {
      setDuplicateWarning(existing);
      return;
    }
    setDuplicateWarning(null);
    runEvaluationWithProgress(rawBook.title || 'Livro', {
      author: rawBook.author,
      description: rawBook.resumo,
      coverUrl: rawBook.coverUrl,
      pages: rawBook.pages,
      genres: rawBook.genres,
    });
  };

  const handleDirectEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const existing = findAlreadyEvaluated(query.trim());
    if (existing) {
      setDuplicateWarning(existing);
      return;
    }
    setDuplicateWarning(null);
    runEvaluationWithProgress(query.trim());
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const results = evaluateBulkList(bulkText);
      // Filter out any titles already evaluated
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
      setIsLoading(false);
      onClose();
    }, 1200);
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
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg max-h-[90vh] bg-white border border-neutral-200/90 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20"
        >
          {/* Clean Top Action Bar with Close Button */}
          <div className="flex items-center justify-end px-6 pt-3.5 pb-1 sticky top-0 z-20 bg-white/95 backdrop-blur-md">
            {!isLoading && (
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="p-1.5 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-all duration-150 active:scale-90 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          {!isLoading && (
            <div className="flex p-1 mx-6 mt-4 rounded-xl bg-neutral-100 border border-neutral-200/70">
              <button
                onClick={() => setTab('single')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 select-none active:scale-[0.98] cursor-pointer ${
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
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 select-none active:scale-[0.98] cursor-pointer ${
                  tab === 'bulk'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-bold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>Colar Lista em Lote</span>
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-6 overflow-y-auto hide-scrollbar space-y-4">
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

                {/* Progress Indicators */}
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
              <div className="space-y-4">
                {/* Duplicate Book Warning Banner */}
                <AnimatePresence>
                  {duplicateWarning && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      className="p-4 rounded-2xl bg-amber-50/95 border border-amber-200 shadow-sm flex flex-col gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4 text-amber-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                              Já avaliado
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-amber-950 mt-1">
                            Esse livro já foi avaliado
                          </h4>
                          <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
                            <strong>"{duplicateWarning.title}"</strong> ({duplicateWarning.author}) já está cadastrado no seu acervo do Veredito com Nota de Encaixe <strong>{Math.floor(duplicateWarning.notaEncaixe)}</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200/70">
                        <button
                          type="button"
                          onClick={() => setDuplicateWarning(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
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
                            Ver Ficha Existente
                          </AceternityButton>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleDirectEvaluate} className="space-y-3">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Digite o título do livro ou ISBN:
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ex: Neuromancer, Duna, 1984, Vidas Secas..."
                      className="w-full pl-11 pr-10 py-3 rounded-2xl bg-neutral-100/80 focus:bg-white border border-neutral-200/90 focus:border-neutral-400 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none transition-all duration-150"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
                    {query.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearQuery}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <AceternityButton
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={!query.trim()}
                    >
                      Avaliar livro
                    </AceternityButton>
                  </div>
                </form>

                {/* Suggestions from Books API with Generous Visual Covers */}
                {apiSuggestions.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-neutral-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                        Edições em Português ({apiSuggestions.length})
                      </span>
                      <span className="text-[10px] text-[#86868b]">
                        Toque no livro para avaliar
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {apiSuggestions.map((book, idx) => {
                        const isAlready = findAlreadyEvaluated(book.title || '');
                        return (
                          <div
                            key={book.id || idx}
                            onClick={() => handleSelectBook(book)}
                            className="group flex items-center gap-4 sm:gap-4.5 p-3 sm:p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/70 hover:border-neutral-300 cursor-pointer transition-all duration-200 active:scale-[0.98] shadow-2xs hover:shadow-xs"
                          >
                            {/* Generous Large Cover with 2:3 Aspect Ratio */}
                            <div className="w-24 sm:w-28 shrink-0 transition-transform duration-200 group-hover:scale-105">
                              <BookCover
                                title={book.title || 'Livro'}
                                author={book.author || 'Autor'}
                                coverUrl={book.coverUrl}
                              />
                            </div>

                            {/* Descriptive Metadata */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-[#1d1d1f] truncate group-hover:text-black leading-snug">
                                  {book.title}
                                </h4>
                              </div>
                              <p className="text-xs text-[#86868b] truncate">
                                {book.author}
                              </p>
                              <div className="flex items-center gap-2 pt-0.5">
                                {isAlready ? (
                                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <Check className="w-3 h-3 text-amber-700" />
                                    Já avaliado
                                  </span>
                                ) : book.pages ? (
                                  <span className="text-[10px] font-medium text-[#6e6e73] bg-neutral-200/60 px-2 py-0.5 rounded-md">
                                    ~{book.pages} págs
                                  </span>
                                ) : null}
                                {book.year && (
                                  <span className="text-[10px] font-medium text-[#6e6e73]">
                                    {book.year}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Subtle Elegant Action Indicator */}
                            <div className="shrink-0 p-2 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-0.5 transition-all">
                              <ChevronRight className="w-5 h-5 stroke-[2]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3.5">
                <div className="space-y-1">
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
                  placeholder={`Vidas Secas - Graciliano Ramos&#10;1984 - George Orwell&#10;A Estrada - Cormac McCarthy&#10;Kallocaína - Karin Boye`}
                  rows={6}
                  className="w-full p-3.5 rounded-2xl bg-neutral-100/80 focus:bg-white border border-neutral-200/90 focus:border-neutral-400 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-xs font-mono focus:outline-none transition-all duration-150 resize-none leading-relaxed"
                />

                <div className="flex justify-end pt-1">
                  <AceternityButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!bulkText.trim()}
                  >
                    Avaliar Lista Completa
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

