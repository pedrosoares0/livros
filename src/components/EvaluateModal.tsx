import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, Loader2, BookOpen, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBulkList, evaluateBook } from '../services/evaluator';
import { evaluateWithGemini } from '../services/geminiEvaluator';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { PearlButton } from './PearlButton';

interface EvaluateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookEvaluated: (book: BookEvaluation) => void;
  onBulkEvaluated: (books: BookEvaluation[]) => void;
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
}) => {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [query, setQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [apiSuggestions, setApiSuggestions] = useState<Partial<BookEvaluation>[]>([]);

  if (!isOpen) return null;

  const handleInputChange = async (val: string) => {
    setQuery(val);

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

      if (evaluation.notaEncaixe >= 8.5) {
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
    runEvaluationWithProgress(query.trim());
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const results = evaluateBulkList(bulkText);
      onBulkEvaluated(results);
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
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100 bg-white/90 backdrop-blur-lg sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                Avaliador do Protocolo
              </span>
            </div>
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
              <div className="py-10 px-4 text-center space-y-5">
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
                <form onSubmit={handleDirectEvaluate} className="space-y-3">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Digite o título do livro ou ISBN:
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ex: 1984, Duna, Vidas Secas, O Processo..."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-100/80 focus:bg-white border border-neutral-200/90 focus:border-neutral-400 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none transition-all duration-150"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#86868b]">Motor Gemini 3.8 Flash calibrado</span>
                    <PearlButton
                      type="submit"
                      disabled={!query.trim()}
                      label="Avaliar livro"
                      size="nav"
                      className="disabled:opacity-40"
                    />
                  </div>
                </form>

                {/* Suggestions from Books API */}
                {apiSuggestions.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-neutral-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                      Edições em Português Encontradas ({apiSuggestions.length})
                    </span>

                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {apiSuggestions.map((book, idx) => (
                        <div
                          key={book.id || idx}
                          onClick={() => handleSelectBook(book)}
                          className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/60 hover:border-neutral-300 cursor-pointer transition-all duration-150 active:scale-[0.98]"
                        >
                          <div className="w-10 h-14 shrink-0">
                            <BookCover
                              title={book.title || 'Livro'}
                              author={book.author || 'Autor'}
                              coverUrl={book.coverUrl}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#1d1d1f] truncate">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-[#86868b] truncate">
                              {book.author}
                            </p>
                            <span className="text-[10px] text-[#86868b] font-score">
                              ~{book.pages} páginas
                            </span>
                          </div>

                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-200/80 hover:bg-neutral-300 text-[#1d1d1f] shrink-0 transition-colors">
                            Avaliar
                          </span>
                        </div>
                      ))}
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
                  <PearlButton
                    type="submit"
                    disabled={!bulkText.trim()}
                    label="Avaliar Lista Completa"
                    size="nav"
                    className="disabled:opacity-40"
                  />
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
