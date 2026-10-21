import React, { useState } from 'react';
import { BookEvaluation } from '../types';
import { Search, Trash2, Clock, CheckCircle2, AlertTriangle, XCircle, ArrowUpDown, X } from 'lucide-react';
import { BookCover } from './BookCover';
import { ScoreBadge } from './ScoreBadge';
import { PearlButton } from './PearlButton';

interface HistoryViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onDeleteBook?: (id: string) => void;
  onOpenEvaluate: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  books,
  onSelectBook,
  onDeleteBook,
  onOpenEvaluate,
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'leia' | 'ressalvas' | 'evite'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'encaixe' | 'tecnica'>('date');

  const filtered = books
    .filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'all' || b.vereditoTipo === filterType;
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'encaixe') return b.notaEncaixe - a.notaEncaixe;
      if (sortBy === 'tecnica') return b.notaTecnica - a.notaTecnica;
      // Default: date descending
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

  const getVereditoPill = (tipo: 'leia' | 'ressalvas' | 'evite') => {
    if (tipo === 'leia') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          LEIA
        </span>
      );
    }
    if (tipo === 'ressalvas') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          RESSALVAS
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200">
        <XCircle className="w-3 h-3 text-rose-500" />
        EVITE
      </span>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recente';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch {
      return 'Recente';
    }
  };

  return (
    <div
      className="w-full space-y-4 px-6 pt-2 pb-24"
      onTouchMove={() => (document.activeElement as HTMLElement)?.blur()}
    >
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#86868b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar no histórico por título ou autor..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-neutral-100 border border-neutral-200/90 text-[16px] sm:text-xs text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-150"
          />
          {search.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#86868b] hover:text-[#1d1d1f] rounded-full transition-colors cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#86868b] mr-1" />
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              sortBy === 'date'
                ? 'bg-[#1d1d1f] text-white shadow-xs font-bold'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            Recentes
          </button>
          <button
            onClick={() => setSortBy('encaixe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              sortBy === 'encaixe'
                ? 'bg-[#1d1d1f] text-white shadow-xs font-bold'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            Nota Encaixe
          </button>
          <button
            onClick={() => setSortBy('tecnica')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              sortBy === 'tecnica'
                ? 'bg-[#1d1d1f] text-white shadow-xs font-bold'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            Nota Técnica
          </button>
        </div>
      </div>

      {/* Unified Monochrome Apple Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
            filterType === 'all'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] border border-neutral-200/60'
          }`}
        >
          Todas ({books.length})
        </button>
        <button
          onClick={() => setFilterType('leia')}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
            filterType === 'leia'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] border border-neutral-200/60'
          }`}
        >
          Recomendados (LEIA)
        </button>
        <button
          onClick={() => setFilterType('ressalvas')}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
            filterType === 'ressalvas'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] border border-neutral-200/60'
          }`}
        >
          Com Ressalvas
        </button>
        <button
          onClick={() => setFilterType('evite')}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
            filterType === 'evite'
              ? 'bg-[#1d1d1f] text-white shadow-xs'
              : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] border border-neutral-200/60'
          }`}
        >
          Reprovados (EVITE)
        </button>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12 px-4 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 space-y-4">
          <Clock className="w-10 h-10 text-neutral-300 mx-auto stroke-1" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#1d1d1f]">
              {search ? 'Nenhum resultado para esta busca' : 'Nenhuma avaliação encontrada'}
            </h3>
            <p className="text-xs text-[#86868b] max-w-sm mx-auto">
              Digite o título de qualquer livro para gerar uma ficha calibrada pelo Gemini.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <PearlButton
              label="Avaliar livro"
              onClick={onOpenEvaluate}
            />
          </div>
        </div>
      )}

      {/* Evaluations List */}
      <div className="space-y-2.5">
        {filtered.map((book) => (
          <div
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="p-3.5 rounded-2xl bg-white hover:bg-neutral-50/90 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group active:scale-[0.99] shadow-xs"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 shrink-0">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-[#1d1d1f] truncate group-hover:text-black transition-colors">
                    {book.title}
                  </h4>
                  {getVereditoPill(book.vereditoTipo)}
                </div>

                <p className="text-xs text-[#86868b] truncate">
                  {book.author} • <span className="font-score text-[#86868b]">{book.pages} págs</span>
                  {book.createdAt && ` • ${formatDate(book.createdAt)}`}
                </p>

                <p className="text-[11px] text-[#86868b] italic line-clamp-1">
                  "{book.veredito}"
                </p>
              </div>
            </div>

            {/* Scores & Actions */}
            <div className="flex items-center justify-end gap-3 pl-9 sm:pl-0 shrink-0">
              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] text-[#86868b] block uppercase font-medium mb-0.5">Técnica</span>
                <ScoreBadge score={book.notaTecnica} size="sm" />
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] text-[#86868b] block uppercase font-medium mb-0.5">Encaixe</span>
                <ScoreBadge score={book.notaEncaixe} size="md" />
              </div>

              {onDeleteBook && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Remover "${book.title}" do histórico?`)) {
                      onDeleteBook(book.id);
                    }
                  }}
                  title="Excluir avaliação"
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
