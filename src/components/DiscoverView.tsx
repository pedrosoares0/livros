import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Loader2, ListPlus } from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { ScoreBadge } from './ScoreBadge';
import { PearlButton } from './PearlButton';
import { searchBookApi } from '../services/evaluator';

interface DiscoverViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onEvaluateDirect: (title: string, rawBook?: Partial<BookEvaluation>) => void;
  onOpenBulk: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  books,
  onSelectBook,
  onEvaluateDirect,
  onOpenBulk,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<BookEvaluation>[]>([]);

  const handleInputChange = async (val: string) => {
    setQuery(val);
    if (val.trim().length >= 3) {
      setIsSearching(true);
      try {
        const results = await searchBookApi(val);
        setSuggestions(results.slice(0, 4));
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onEvaluateDirect(query.trim());
    setQuery('');
    setSuggestions([]);
  };

  const handleSelectSuggestion = (book: Partial<BookEvaluation>) => {
    onEvaluateDirect(book.title || query, book);
    setQuery('');
    setSuggestions([]);
  };

  const topMatches = books.filter((b) => b.notaEncaixe >= 8);
  const recentEvaluations = books.slice(0, 6);

  return (
    <div className="w-full space-y-6 px-6 pt-2 pb-24">
      {/* Hero Analyzer Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-neutral-50 to-neutral-100/70 border border-neutral-200/90 shadow-sm space-y-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black text-white">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Avaliador Instantâneo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Qual livro você quer analisar agora?
          </h2>
          <p className="text-xs text-[#86868b]">
            Digite qualquer título, autor ou ISBN para calcular a Nota Técnica e a Nota de Encaixe com o seu perfil.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Ex: Duna, Neuromancer, Flores para Algernon..."
              className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black/5 text-sm text-[#1d1d1f] placeholder-[#86868b] shadow-xs focus:outline-none transition-all duration-150"
            />
            <Search className="w-4 h-4 text-[#86868b] absolute left-4 pointer-events-none" />

            <div className="absolute right-2 flex items-center gap-1.5">
              {isSearching && <Loader2 className="w-4 h-4 animate-spin text-[#86868b] mr-1" />}
              <button
                type="submit"
                disabled={!query.trim()}
                className="px-3.5 py-2 rounded-xl bg-[#1d1d1f] text-white text-xs font-semibold hover:bg-black transition-all active:scale-95 disabled:opacity-40 cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span>Avaliar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#86868b] px-1 pt-0.5">
            <span>Busca direta na Google Books & CBL (pt-BR)</span>
            <button
              type="button"
              onClick={onOpenBulk}
              className="text-[#1d1d1f] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ListPlus className="w-3 h-3" />
              <span>Colar lista em lote</span>
            </button>
          </div>
        </form>

        {/* Autocomplete Dropdown */}
        {suggestions.length > 0 && (
          <div className="p-2 rounded-2xl bg-white border border-neutral-200/90 shadow-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] px-2 pt-1 block">
              Sugestões Encontradas
            </span>
            {suggestions.map((s, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSuggestion(s)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <div className="w-8 shrink-0">
                  <BookCover title={s.title || ''} author={s.author || ''} coverUrl={s.coverUrl} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1d1d1f] truncate">{s.title}</h4>
                  <p className="text-[11px] text-[#86868b] truncate">{s.author} • ~{s.pages} págs</p>
                </div>
                <span className="text-[11px] font-semibold text-neutral-800 px-2 py-0.5 rounded bg-neutral-100">
                  Avaliar
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State when no evaluations exist */}
      {books.length === 0 && (
        <div className="p-8 text-center rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-3">
          <Sparkles className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-sm font-bold text-[#1d1d1f]">
            Nenhuma obra no histórico ainda
          </h3>
          <p className="text-xs text-[#86868b] max-w-sm mx-auto">
            Digite o nome de qualquer livro ou cole uma lista para gerar sua primeira avaliação conectada ao Supabase.
          </p>
          <div className="pt-2">
            <PearlButton
              label="Avaliar Primeiro Livro"
              onClick={() => onEvaluateDirect('Duna')}
            />
          </div>
        </div>
      )}

      {/* Destaques de Alto Encaixe (Nota de Encaixe >= 8) */}
      {topMatches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                Obras de Alto Encaixe (Nota ≥ 8)
              </h3>
            </div>
            <span className="text-xs font-score text-[#86868b]">
              {topMatches.length} recomendados
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {topMatches.slice(0, 6).map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-3 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98] shadow-xs"
              >
                <div className="w-full mb-2">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                    notaEncaixe={book.notaEncaixe}
                  />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#1d1d1f] truncate group-hover:text-black">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-[#86868b] truncate">
                    {book.author}
                  </p>
                  <p className="text-[10px] text-[#86868b] italic line-clamp-1 pt-0.5">
                    "{book.veredito}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recém Avaliados */}
      {recentEvaluations.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
              Últimas Avaliações
            </h3>
            <span className="text-[10px] text-[#86868b] font-score">
              Sincronizado via Supabase
            </span>
          </div>

          <div className="space-y-2">
            {recentEvaluations.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-3 rounded-2xl bg-white hover:bg-neutral-50/90 border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 shrink-0">
                    <BookCover title={book.title} author={book.author} coverUrl={book.coverUrl} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1d1d1f] truncate group-hover:text-black">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-[#86868b] truncate">
                      {book.author} • ~{book.pages} págs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <ScoreBadge score={book.notaEncaixe} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
