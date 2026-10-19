import React, { useState } from 'react';
import { BookEvaluation } from '../types';
import { Search, X } from 'lucide-react';
import { BookCover } from './BookCover';
import { ScoreBadge } from './ScoreBadge';

interface RankingViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
}

export const RankingView: React.FC<RankingViewProps> = ({ books, onSelectBook }) => {
  const [sortBy, setSortBy] = useState<'encaixe' | 'tecnica'>('encaixe');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [search, setSearch] = useState('');

  const genres = ['all', 'Ficção Científica', 'Distopia', 'Clássico', 'Drama Humano', 'Graphic Novel'];

  const filtered = books
    .filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchGenre = filterGenre === 'all' || b.genres.some((g) => g.toLowerCase().includes(filterGenre.toLowerCase()));
      return matchSearch && matchGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'encaixe') {
        return b.notaEncaixe - a.notaEncaixe;
      }
      return b.notaTecnica - a.notaTecnica;
    });

  return (
    <div
      className="w-full space-y-4 px-6 pt-2"
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
            placeholder="Filtrar por título ou autor..."
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

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <span className="text-[11px] text-[#86868b] font-medium mr-1">Ordenar:</span>
          <button
            onClick={() => setSortBy('encaixe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              sortBy === 'encaixe'
                ? 'bg-[#1d1d1f] text-white shadow-xs font-bold'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/70'
            }`}
          >
            Nota de Encaixe
          </button>
          <button
            onClick={() => setSortBy('tecnica')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              sortBy === 'tecnica'
                ? 'bg-[#1d1d1f] text-white shadow-xs font-bold'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/70'
            }`}
          >
            Nota Técnica
          </button>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setFilterGenre(g)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
              filterGenre === g
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] border border-neutral-200/60'
            }`}
          >
            {g === 'all' ? 'Todos os Gêneros' : g}
          </button>
        ))}
      </div>

      {/* Ranked Books Table / Cards */}
      <div className="space-y-2.5">
        {filtered.map((book, index) => {
          const gap = Math.round((book.notaTecnica - book.notaEncaixe) * 10) / 10;
          const isGapWarning = gap >= 3.0;

          return (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="p-3 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-6 text-center font-score font-bold text-xs text-[#86868b]">
                  #{index + 1}
                </span>

                <div className="w-12 shrink-0">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                  />
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#1d1d1f] truncate">
                      {book.title}
                    </h4>
                    {isGapWarning && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap">
                        Alerta de Dissenso
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#86868b] truncate">
                    {book.author} • <span className="font-score text-[#86868b]">~{book.pages} págs</span>
                  </p>
                  <p className="text-[11px] text-[#86868b] italic line-clamp-1">
                    "{book.veredito}"
                  </p>
                </div>
              </div>

              {/* Score Badges */}
              <div className="flex items-center justify-end gap-3 pl-9 sm:pl-0 shrink-0">
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] text-[#86868b] block uppercase font-medium mb-0.5">Técnica</span>
                  <ScoreBadge score={book.notaTecnica} size="sm" />
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] text-[#86868b] block uppercase font-medium mb-0.5">Encaixe</span>
                  <ScoreBadge score={book.notaEncaixe} size="md" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
