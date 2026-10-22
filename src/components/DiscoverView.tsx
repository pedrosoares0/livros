import React, { useState } from 'react';
import { BookOpen, ArrowUpDown, Search, X } from 'lucide-react';
import { BookEvaluation } from '../types';
import { isUserEvaluation } from '../data/initialBooks';
import { BookCover } from './BookCover';
import { ScoreBadge } from './ScoreBadge';
import { PearlButton } from './PearlButton';
import { BorderBeam } from './BorderBeam';

interface DiscoverViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onOpenEvaluate: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = React.memo(({
  books,
  onSelectBook,
  onOpenEvaluate,
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScoreFilters, setSelectedScoreFilters] = useState<number[]>([]);

  const toggleScoreFilter = (score: number) => {
    setSelectedScoreFilters((prev) =>
      prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]
    );
  };

  // Normalização para busca sem acentos e case-insensitive
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Apenas as avaliações reais do usuário (exclui catálogo inicial, que fica na Estante)
  const userEvaluations = books.filter(isUserEvaluation);

  // Busca precisa por título ou autor
  const cleanQuery = searchQuery.trim();
  const normalizedQuery = normalize(cleanQuery);

  const searchResults = cleanQuery
    ? books
        .filter((b) => {
          const score = Math.floor(b.notaEncaixe);
          if (selectedScoreFilters.length > 0 && !selectedScoreFilters.includes(score)) {
            return false;
          }
          const title = normalize(b.title || '');
          const author = normalize(b.author || '');
          const orig = b.originalTitle ? normalize(b.originalTitle) : '';
          return title.includes(normalizedQuery) || author.includes(normalizedQuery) || orig.includes(normalizedQuery);
        })
        .sort((a, b) => (sortOrder === 'desc' ? b.notaEncaixe - a.notaEncaixe : a.notaEncaixe - b.notaEncaixe))
    : [];

  // Recomendações padrão (quando não está pesquisando): apenas avaliações do usuário com nota >= 7, ou filtradas pelas notas selecionadas
  const topMatches = userEvaluations
    .filter((b) => {
      const score = Math.floor(b.notaEncaixe);
      if (selectedScoreFilters.length > 0) {
        return selectedScoreFilters.includes(score);
      }
      return b.notaEncaixe >= 7;
    })
    .sort((a, b) => (sortOrder === 'desc' ? b.notaEncaixe - a.notaEncaixe : a.notaEncaixe - b.notaEncaixe));

  // Últimas avaliações: todas as avaliações do usuário
  const recentEvaluations = userEvaluations;

  return (
    <div className="w-full space-y-8 md:space-y-12 pb-24 md:pb-20">
      {/* Single Unified Hero Card (Mobile only - redundant on PC header) */}
      <div className="p-7 text-center rounded-3xl bg-neutral-50/90 border border-neutral-200/80 shadow-xs space-y-4 md:hidden">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#1d1d1f] shadow-xs">
          <BookOpen className="w-6 h-6 stroke-[1.75]" />
        </div>

        <div className="space-y-1.5 max-w-sm mx-auto">
          <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
            Avaliador Pessoal
          </h2>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Analise qualquer livro ou HQ com base no seu perfil de leitura, preferências e aversões calibradas para você.
          </p>
        </div>

        <div className="pt-1 flex justify-center">
          <PearlButton
            label="Avaliar livro"
            onClick={onOpenEvaluate}
          />
        </div>
      </div>

      {/* Search Bar - Refined tactile Apple style with subtle 3D lighting and soft drop shadow */}
      <div className="w-full max-w-xl mx-auto -mt-2 md:mt-2 md:mb-8 px-2 sm:px-0">
        <BorderBeam
          size="sm"
          theme="light"
          colorVariant="mono"
          borderRadius={28}
          duration={3.5}
          strength={0.65}
          className="w-full"
        >
          <div
            className="relative w-full rounded-[28px] bg-gradient-to-b from-white via-[#ffffff] to-[#f8f9fb] border border-neutral-200/90 flex items-center transition-all duration-200 hover:border-neutral-300 focus-within:border-neutral-400"
            style={{
              boxShadow:
                '0 4px 18px -2px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px rgba(0, 0, 0, 0.02)',
            }}
          >
            <Search className="w-4 h-4 text-[#86868b] absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título ou autor..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="search"
              className="w-full pl-11.5 pr-11 py-3 sm:py-3.5 rounded-[28px] bg-transparent text-xs sm:text-[13.5px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full transition-colors cursor-pointer"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </BorderBeam>
      </div>

      {/* Empty State when user has no evaluations yet and not searching */}
      {!cleanQuery && userEvaluations.length === 0 && (
        <div className="py-10 text-center space-y-2">
          <p className="text-sm font-semibold text-[#1d1d1f]">
            Nenhuma avaliação pessoal ainda
          </p>
          <p className="text-xs text-[#86868b] max-w-xs mx-auto">
            Utilize o botão acima para avaliar livros. Suas avaliações aparecerão aqui e seu catálogo completo está organizado na aba Estante.
          </p>
        </div>
      )}

      {/* Quando pesquisando: exibe Resultados da Busca com todas as obras correspondentes */}
      {cleanQuery.length > 0 && (
        <div className="space-y-4 md:space-y-6 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
              Resultados da busca
            </h3>
            <div className="flex items-center gap-1.5">
              {/* Botão de ordenação apenas com ícone das setinhas */}
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-3xs cursor-pointer select-none flex items-center justify-center shrink-0"
                title={sortOrder === 'desc' ? 'Maior Nota (clique para Menor Nota)' : 'Menor Nota (clique para Maior Nota)'}
                aria-label="Alternar ordenação"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#1d1d1f]" />
              </button>

              {/* Filtros multi-seleção de notas 10, 9 e 8 (levemente maiores) */}
              <div className="flex items-center gap-1.5">
                {[10, 9, 8].map((score) => {
                  const isSelected = selectedScoreFilters.includes(score);
                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => toggleScoreFilter(score)}
                      className={`h-7 sm:h-7.5 px-2.5 sm:px-3 min-w-[30px] rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer select-none border flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs'
                          : 'bg-white text-[#636366] hover:text-[#1d1d1f] border-neutral-200/90 hover:border-neutral-300 shadow-3xs hover:bg-neutral-50'
                      }`}
                      title={`Filtrar nota ${score}`}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-semibold text-[#86868b] ml-1.5">
                {searchResults.length} {searchResults.length === 1 ? 'obra' : 'obras'}
              </span>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-6 xl:gap-x-7 gap-y-9 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className="flex flex-col cursor-pointer group active:scale-[0.98] transition-transform duration-200 select-none"
                >
                  <div className="w-full mb-3 transition-transform duration-200 group-hover:-translate-y-1.5">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      coverUrl={book.coverUrl}
                      notaEncaixe={book.notaEncaixe}
                    />
                  </div>
                  <div className="space-y-0.5 px-0.5">
                    <h4 className="text-xs sm:text-[13px] font-semibold text-[#1d1d1f] truncate group-hover:text-black leading-snug tracking-tight">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-[#86868b] truncate flex items-center gap-1.5 font-normal">
                      <span className="truncate">{book.author}</span>
                      {book.pages && (
                        <>
                          <span className="text-neutral-300 shrink-0">•</span>
                          <span className="text-[10px] text-[#86868b] font-score shrink-0">{book.pages} págs</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-[#1d1d1f]">
                Nenhum livro encontrado
              </p>
              <p className="text-xs text-[#86868b] max-w-xs mx-auto">
                Não encontramos resultados para "{searchQuery}". Tente buscar por outro título ou autor.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quando não está pesquisando: Exibe Recomendações e Últimas Avaliações */}
      {!cleanQuery && (
        <>
          {/* Obras de Alto Encaixe com Filtro Interativo Maior/Menor Nota e Filtros de Notas 10, 9 e 8 */}
          {topMatches.length > 0 && (
            <div className="space-y-4 md:space-y-6 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                  Recomendações
                </h3>
                <div className="flex items-center gap-1.5">
                  {/* Botão de ordenação apenas com ícone das setinhas */}
                  <button
                    type="button"
                    onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                    className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-3xs cursor-pointer select-none flex items-center justify-center shrink-0"
                    title={sortOrder === 'desc' ? 'Maior Nota (clique para Menor Nota)' : 'Menor Nota (clique para Maior Nota)'}
                    aria-label="Alternar ordenação"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  </button>

                  {/* Filtros multi-seleção de notas 10, 9 e 8 (levemente maiores) */}
                  <div className="flex items-center gap-1.5">
                    {[10, 9, 8].map((score) => {
                      const isSelected = selectedScoreFilters.includes(score);
                      return (
                        <button
                          key={score}
                          type="button"
                          onClick={() => toggleScoreFilter(score)}
                          className={`h-7 sm:h-7.5 px-2.5 sm:px-3 min-w-[30px] rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer select-none border flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs'
                              : 'bg-white text-[#636366] hover:text-[#1d1d1f] border-neutral-200/90 hover:border-neutral-300 shadow-3xs hover:bg-neutral-50'
                          }`}
                          title={`Filtrar nota ${score}`}
                        >
                          {score}
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-xs font-semibold text-[#86868b] ml-1.5">
                    {topMatches.length} {topMatches.length === 1 ? 'obra' : 'obras'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-6 xl:gap-x-7 gap-y-9 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
                {topMatches.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="flex flex-col cursor-pointer group active:scale-[0.98] transition-transform duration-200 select-none"
                  >
                    <div className="w-full mb-3 transition-transform duration-200 group-hover:-translate-y-1.5">
                      <BookCover
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                        notaEncaixe={book.notaEncaixe}
                      />
                    </div>
                    <div className="space-y-0.5 px-0.5">
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#1d1d1f] truncate group-hover:text-black leading-snug tracking-tight">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-[#86868b] truncate flex items-center gap-1.5 font-normal">
                        <span className="truncate">{book.author}</span>
                        {book.pages && (
                          <>
                            <span className="text-neutral-300 shrink-0">•</span>
                            <span className="text-[10px] text-[#86868b] font-score shrink-0">{book.pages} págs</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Últimas Avaliações — Large Visual Cards com Borda Branca */}
          {recentEvaluations.length > 0 && (
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-14">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  Últimas Avaliações
                </h3>
                <span className="text-[11px] font-medium text-[#86868b]">
                  {recentEvaluations.length} {recentEvaluations.length === 1 ? 'avaliação' : 'avaliações'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4.5">
                {recentEvaluations.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-neutral-50/90 border border-white hover:border-neutral-200/60 transition-all duration-200 cursor-pointer flex items-center gap-4 sm:gap-5 group active:scale-[0.99] md:hover:-translate-y-0.5 md:hover:shadow-md shadow-xs"
                  >
                    {/* Large Visual Book Cover */}
                    <div className="w-20 sm:w-24 shrink-0 transition-transform duration-200 group-hover:scale-[1.02]">
                      <BookCover
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                      />
                    </div>

                    {/* Rich Book Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-[#1d1d1f] truncate group-hover:text-black leading-snug">
                            {book.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#86868b] truncate pt-0.5">
                            {book.author} {book.year ? `• ${book.year}` : ''} {book.pages ? `• ${book.pages} págs` : ''}
                          </p>
                        </div>

                        {/* Prominent Large Round Score Badge */}
                        <div className="shrink-0 flex items-center justify-center">
                          <ScoreBadge score={book.notaEncaixe} size="lg" />
                        </div>
                      </div>

                      {/* Veredito Quote without any fake badges */}
                      <p className="text-xs sm:text-sm text-[#515154] italic leading-relaxed line-clamp-2 border-l-2 border-neutral-200 pl-2.5">
                        "{book.veredito}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

DiscoverView.displayName = 'DiscoverView';
