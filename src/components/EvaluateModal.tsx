import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBook, evaluateBulkList } from '../services/evaluator';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';

interface EvaluateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookEvaluated: (book: BookEvaluation) => void;
  onBulkEvaluated: (books: BookEvaluation[]) => void;
}

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

  const handleSelectBook = (rawBook: Partial<BookEvaluation>) => {
    setIsLoading(true);
    setTimeout(() => {
      const evaluation = evaluateBook({
        title: rawBook.title || 'Livro',
        author: rawBook.author,
        pages: rawBook.pages,
        description: rawBook.resumo,
        genres: rawBook.genres,
        coverUrl: rawBook.coverUrl,
      });

      if (evaluation.notaEncaixe >= 9.0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#1d1d1f', '#d97706', '#0284c7'],
        });
      }

      onBookEvaluated(evaluation);
      setIsLoading(false);
      onClose();
    }, 280);
  };

  const handleDirectEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const evaluation = evaluateBook({
        title: query.trim(),
        description: `Obra avaliada pelo perfil pessoal: ${query}.`,
      });

      if (evaluation.notaEncaixe >= 9.0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#1d1d1f', '#d97706', '#0284c7'],
        });
      }

      onBookEvaluated(evaluation);
      setIsLoading(false);
      onClose();
    }, 300);
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
    }, 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Apple Translucent Dimming Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"
        />

        {/* Apple Modal Card */}
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-20 w-full max-w-lg bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden text-[#1d1d1f] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-black/[0.06] bg-[#ffffff]/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-[#1d1d1f]">
                <BookOpen className="w-4 h-4" strokeWidth={2} />
              </div>
              <h2 className="text-base font-bold tracking-tight text-[#1d1d1f]">
                Avaliar com o Protocolo
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

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 mx-6 mt-4 rounded-xl bg-neutral-100 border border-neutral-200/70">
            <button
              onClick={() => setTab('single')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 select-none active:scale-[0.98] ${
                tab === 'single'
                  ? 'bg-white text-[#1d1d1f] shadow-sm font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Livro Único</span>
            </button>
            <button
              onClick={() => setTab('bulk')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 select-none active:scale-[0.98] ${
                tab === 'bulk'
                  ? 'bg-white text-[#1d1d1f] shadow-sm font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <ListPlus className="w-3.5 h-3.5" />
              <span>Colar Lista em Massa</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto hide-scrollbar space-y-4">
            {tab === 'single' ? (
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
                      placeholder="Ex: 1984, Duna, Vidas Secas, 9788535914849..."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-100/80 focus:bg-white border border-neutral-200/90 focus:border-neutral-400 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none transition-all duration-150"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#86868b] pt-1">
                    <span>Google Books API (pt-BR) & BrasilAPI (CBL)</span>
                    <button
                      type="submit"
                      disabled={!query.trim() || isLoading}
                      className="px-4 py-2 rounded-xl bg-[#1d1d1f] text-white font-semibold text-xs hover:bg-black transition-all active:scale-[0.97] flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-sm"
                    >
                      {isLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                      <span>Avaliar Direto</span>
                    </button>
                  </div>
                </form>

                {/* Suggestions from Books API */}
                {apiSuggestions.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-neutral-200/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868b] block">
                      Edições em Português Encontradas ({apiSuggestions.length})
                    </span>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {apiSuggestions.map((book, idx) => (
                        <div
                          key={book.id || idx}
                          onClick={() => handleSelectBook(book)}
                          className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/60 hover:border-neutral-300 cursor-pointer transition-all duration-150 active:scale-[0.98]"
                        >
                          <div className="w-11 h-16 shrink-0">
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
                            <span className="text-[10px] text-[#86868b] font-mono">
                              ~{book.pages} páginas {book.year ? `• ${book.year}` : ''}
                            </span>
                          </div>

                          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-200/80 hover:bg-neutral-300 text-[#1d1d1f] shrink-0 transition-colors">
                            Avaliar
                          </button>
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
                    Cole uma lista de livros (um por linha):
                  </label>
                  <p className="text-[11px] text-[#86868b]">
                    O Protocolo irá analisar e classificar todos em ordem decrescente de Nota de Encaixe.
                  </p>
                </div>

                <textarea
                  rows={6}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="1984 — George Orwell&#10;A Estrada — Cormac McCarthy&#10;O Velho e o Mar — Hemingway&#10;Vidas Secas — Graciliano Ramos&#10;Flores para Algernon"
                  className="w-full p-3.5 rounded-2xl bg-neutral-100/80 focus:bg-white border border-neutral-200/90 focus:border-neutral-400 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-xs font-mono focus:outline-none transition-all resize-none"
                />

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs flex items-start gap-2">
                  <span className="font-bold shrink-0">💡</span>
                  <span>
                    O algoritmo aplica os pesos do seu perfil e reordena automaticamente os livros do maior para o menor encaixe.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!bulkText.trim() || isLoading}
                  className="w-full py-3 rounded-2xl bg-[#1d1d1f] text-white font-bold text-xs hover:bg-black transition-all active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-40 shadow-md cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analisando Lista no Protocolo...</span>
                    </>
                  ) : (
                    <span>Calibrar e Ordenar Lista</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
