import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, ArrowUpDown, Search, X, Check, Bookmark, Trash2, CheckSquare } from 'lucide-react';
import { BookEvaluation, UserRatingsMap } from '../../types';
import { isUserEvaluation } from '../../data/initialBooks';
import { getEffectiveScore } from '../../services/ratings';
import { BookCover } from '../BookCover';
import { ScoreBadge } from '../ui/ScoreBadge';
import { PearlButton } from '../ui/PearlButton';
import { BorderBeam } from '../ui/BorderBeam';

interface DiscoverViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onOpenEvaluate: () => void;
  userRatings?: UserRatingsMap;
  savedBookIds?: Set<string>;
  onBulkToggleSave?: (bookIds: string[], willBeSaved: boolean) => void;
  onBulkDeleteBooks?: (bookIds: string[]) => void;
  isActive?: boolean;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export const DiscoverView: React.FC<DiscoverViewProps> = React.memo(({
  books,
  onSelectBook,
  onOpenEvaluate,
  userRatings,
  savedBookIds,
  onBulkToggleSave,
  onBulkDeleteBooks,
  isActive = true,
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScoreFilters, setSelectedScoreFilters] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const toggleScoreFilter = (score: number) => {
    setSelectedScoreFilters((prev) =>
      prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]
    );
  };

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => {
      if (prev) {
        setSelectedIds(new Set());
      }
      return !prev;
    });
  }, []);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  }, []);

  const toggleSelectBook = useCallback((bookId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  }, []);

  // Fecha o modo de seleção com a tecla Escape
  useEffect(() => {
    if (!isSelectionMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitSelectionMode();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSelectionMode, exitSelectionMode]);

  // Limpa IDs que já foram excluídos
  useEffect(() => {
    if (selectedIds.size === 0) return;
    const existingIds = new Set(books.map((b) => b.id));
    setSelectedIds((prev) => {
      let changed = false;
      const next = new Set<string>();
      prev.forEach((id) => {
        if (existingIds.has(id)) {
          next.add(id);
        } else {
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [books, selectedIds.size]);

  // Precomputa normalização de texto apenas quando a lista muda
  const indexedBooks = useMemo(
    () =>
      books.map((book) => ({
        book,
        searchBlob: `${normalize(book.title || '')}\n${normalize(book.author || '')}\n${
          book.originalTitle ? normalize(book.originalTitle) : ''
        }`,
      })),
    [books]
  );

  // Apenas as avaliações reais do usuário (exclui catálogo inicial, que fica na Estante)
  const userEvaluations = useMemo(() => books.filter(isUserEvaluation), [books]);

  const cleanQuery = searchQuery.trim();
  const normalizedQuery = useMemo(() => (cleanQuery ? normalize(cleanQuery) : ''), [cleanQuery]);

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return indexedBooks
      .filter(({ book, searchBlob }) => {
        const score = Math.floor(getEffectiveScore(book, userRatings));
        if (selectedScoreFilters.length > 0 && !selectedScoreFilters.includes(score)) {
          return false;
        }
        return searchBlob.includes(normalizedQuery);
      })
      .map(({ book }) => book)
      .sort((a, b) => {
        const scoreA = getEffectiveScore(a, userRatings);
        const scoreB = getEffectiveScore(b, userRatings);
        return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
      });
  }, [indexedBooks, normalizedQuery, selectedScoreFilters, sortOrder, userRatings]);

  const topMatches = useMemo(
    () =>
      userEvaluations
        .filter((b) => {
          const score = Math.floor(getEffectiveScore(b, userRatings));
          if (selectedScoreFilters.length > 0) {
            return selectedScoreFilters.includes(score);
          }
          return score >= 7;
        })
        .sort((a, b) => {
          const scoreA = getEffectiveScore(a, userRatings);
          const scoreB = getEffectiveScore(b, userRatings);
          return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
        }),
    [userEvaluations, selectedScoreFilters, sortOrder, userRatings]
  );

  const recentEvaluations = userEvaluations;

  const visibleSelectableIds = useMemo(() => {
    if (cleanQuery.length > 0) {
      return searchResults.map((b) => b.id);
    }
    const set = new Set<string>();
    topMatches.forEach((b) => set.add(b.id));
    recentEvaluations.forEach((b) => set.add(b.id));
    return Array.from(set);
  }, [cleanQuery.length, searchResults, topMatches, recentEvaluations]);

  const allVisibleSelected =
    visibleSelectableIds.length > 0 && visibleSelectableIds.every((id) => selectedIds.has(id));

  const handleToggleSelectAllVisible = useCallback(() => {
    if (allVisibleSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleSelectableIds));
    }
  }, [allVisibleSelected, visibleSelectableIds]);

  const selectedArray = useMemo(() => Array.from(selectedIds), [selectedIds]);

  const allSelectedAreSaved = useMemo(() => {
    if (selectedArray.length === 0) return false;
    return selectedArray.every((id) => savedBookIds?.has(id));
  }, [selectedArray, savedBookIds]);

  const handleBulkSave = useCallback(() => {
    if (selectedArray.length === 0 || !onBulkToggleSave) return;
    onBulkToggleSave(selectedArray, !allSelectedAreSaved);
    exitSelectionMode();
  }, [selectedArray, onBulkToggleSave, allSelectedAreSaved, exitSelectionMode]);

  const handleBulkDelete = useCallback(() => {
    if (selectedArray.length === 0 || !onBulkDeleteBooks) return;
    onBulkDeleteBooks(selectedArray);
    exitSelectionMode();
  }, [selectedArray, onBulkDeleteBooks, exitSelectionMode]);

  const renderFilterAndSelectionToolbar = (count: number) => (
    <div className="flex items-center flex-wrap justify-end gap-1.5">
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

      {/* Filtros multi-seleção de notas 10, 9 e 8 */}
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

      {/* Botão "Selecionar" ao lado dos filtros das notas */}
      <button
        type="button"
        onClick={toggleSelectionMode}
        className={`h-7 sm:h-7.5 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 justify-center ${
          isSelectionMode
            ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs'
            : 'bg-white text-[#636366] hover:text-[#1d1d1f] border-neutral-200/90 hover:border-neutral-300 shadow-3xs hover:bg-neutral-50'
        }`}
        title={isSelectionMode ? 'Cancelar seleção' : 'Selecionar vários livros para salvar ou excluir'}
      >
        <span>{isSelectionMode ? 'Cancelar' : 'Selecionar'}</span>
      </button>

      {/* Ações rápidas inline quando o modo de seleção está ativo */}
      {isSelectionMode && (
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            disabled={selectedIds.size === 0}
            onClick={handleBulkSave}
            className="h-7 sm:h-7.5 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 justify-center bg-white text-[#1d1d1f] hover:bg-neutral-50 border-neutral-200/90 hover:border-neutral-300 shadow-3xs disabled:opacity-40 disabled:pointer-events-none"
            title={allSelectedAreSaved ? 'Remover selecionados dos salvos' : 'Salvar selecionados na estante'}
          >
            <Bookmark className={`w-3 h-3 ${allSelectedAreSaved ? 'fill-[#1d1d1f]' : ''}`} />
            <span>
              {allSelectedAreSaved ? 'Remover salvo' : 'Salvar'}
              {selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
            </span>
          </button>

          <button
            type="button"
            disabled={selectedIds.size === 0}
            onClick={handleBulkDelete}
            className="h-7 sm:h-7.5 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 justify-center bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200/90 shadow-3xs disabled:opacity-40 disabled:pointer-events-none"
            title="Excluir livros selecionados"
          >
            <Trash2 className="w-3 h-3" />
            <span>
              Excluir{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
            </span>
          </button>
        </div>
      )}

      <span className="text-xs font-semibold text-[#86868b] ml-1">
        {count} {count === 1 ? 'obra' : 'obras'}
      </span>
    </div>
  );

  const renderGridBookCard = (book: BookEvaluation) => {
    const isSelected = selectedIds.has(book.id);
    const isBookSaved = Boolean(savedBookIds?.has(book.id) || book.isSaved);

    return (
      <div
        key={book.id}
        onClick={() => {
          if (isSelectionMode) {
            toggleSelectBook(book.id);
          } else {
            onSelectBook(book);
          }
        }}
        className="flex flex-col cursor-pointer group active:scale-[0.98] transition-transform duration-200 select-none"
      >
        <div
          className={`relative w-full mb-3 transition-all duration-200 ${
            isSelectionMode
              ? isSelected
                ? 'ring-2 ring-[#1d1d1f] ring-offset-2 rounded-[4px] scale-[0.98]'
                : 'opacity-85 hover:opacity-100'
              : 'group-hover:-translate-y-1.5'
          }`}
        >
          <BookCover
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
            notaEncaixe={book.notaEncaixe}
            userRating={userRatings?.[book.id]?.rating}
          />

          {/* Selection Checkbox Overlay */}
          {isSelectionMode && (
            <div
              className={`absolute top-2 left-2 z-30 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${
                isSelected
                  ? 'bg-[#1d1d1f] text-white border-[1.5px] border-white shadow-md scale-105'
                  : 'bg-black/40 backdrop-blur-md border-[1.5px] border-white/90 text-transparent shadow-xs group-hover:bg-black/55'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          {/* Subtle Saved Bookmark Badge when saved */}
          {isBookSaved && (
            <div
              className="absolute bottom-2 right-2 z-20 w-5 h-5 rounded-full bg-black/65 backdrop-blur-xs text-white flex items-center justify-center shadow-xs pointer-events-none"
              title="Salvo na sua estante"
            >
              <Bookmark className="w-2.5 h-2.5 fill-white text-white" />
            </div>
          )}
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
    );
  };

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
          active={isActive}
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
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
              Resultados da busca
            </h3>
            {renderFilterAndSelectionToolbar(searchResults.length)}
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-6 xl:gap-x-7 gap-y-9 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
              {searchResults.map((book) => renderGridBookCard(book))}
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
          {/* Obras de Alto Encaixe com Filtro Interativo Maior/Menor Nota, Filtros de Notas 10, 9 e 8 e Botão Selecionar */}
          {(topMatches.length > 0 || selectedScoreFilters.length > 0) && (
            <div className="space-y-4 md:space-y-6 pt-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                  Recomendações
                </h3>
                {renderFilterAndSelectionToolbar(topMatches.length)}
              </div>

              {topMatches.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-6 xl:gap-x-7 gap-y-9 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
                  {topMatches.map((book) => renderGridBookCard(book))}
                </div>
              ) : (
                <div className="py-10 text-center space-y-1.5">
                  <p className="text-xs font-semibold text-[#1d1d1f]">
                    Nenhuma obra com a nota filtrada
                  </p>
                  <p className="text-[11px] text-[#86868b]">
                    Clique novamente no filtro de nota acima para exibir todas as recomendações.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Últimas Avaliações — Large Visual Cards com Borda Branca */}
          {recentEvaluations.length > 0 && (
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-14">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  Últimas Avaliações
                </h3>
                <div className="flex items-center gap-2">
                  {topMatches.length === 0 && selectedScoreFilters.length === 0 && (
                    <button
                      type="button"
                      onClick={toggleSelectionMode}
                      className={`h-7 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 justify-center ${
                        isSelectionMode
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs'
                          : 'bg-white text-[#636366] hover:text-[#1d1d1f] border-neutral-200/90 hover:border-neutral-300 shadow-3xs hover:bg-neutral-50'
                      }`}
                    >
                      <span>{isSelectionMode ? 'Cancelar' : 'Selecionar'}</span>
                    </button>
                  )}
                  <span className="text-[11px] font-medium text-[#86868b]">
                    {recentEvaluations.length} {recentEvaluations.length === 1 ? 'avaliação' : 'avaliações'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4.5">
                {recentEvaluations.map((book) => {
                  const isSelected = selectedIds.has(book.id);
                  const isBookSaved = Boolean(savedBookIds?.has(book.id) || book.isSaved);

                  return (
                    <div
                      key={book.id}
                      onClick={() => {
                        if (isSelectionMode) {
                          toggleSelectBook(book.id);
                        } else {
                          onSelectBook(book);
                        }
                      }}
                      className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-4 sm:gap-5 group active:scale-[0.99] select-none ${
                        isSelectionMode
                          ? isSelected
                            ? 'bg-neutral-50 border-2 border-[#1d1d1f] shadow-sm'
                            : 'bg-white hover:bg-neutral-50/90 border border-neutral-200/80 opacity-85 hover:opacity-100 shadow-xs'
                          : 'bg-white hover:bg-neutral-50/90 border border-white hover:border-neutral-200/60 md:hover:-translate-y-0.5 md:hover:shadow-md shadow-xs'
                      }`}
                    >
                      {/* Large Visual Book Cover */}
                      <div className="relative w-20 sm:w-24 shrink-0 transition-transform duration-200 group-hover:scale-[1.02]">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          coverUrl={book.coverUrl}
                          userRating={userRatings?.[book.id]?.rating}
                        />
                        {isSelectionMode && (
                          <div
                            className={`absolute top-1.5 left-1.5 z-30 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${
                              isSelected
                                ? 'bg-[#1d1d1f] text-white border-[1.5px] border-white shadow-md scale-105'
                                : 'bg-black/40 backdrop-blur-md border-[1.5px] border-white/90 text-transparent shadow-xs group-hover:bg-black/55'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {isBookSaved && (
                          <div
                            className="absolute bottom-1.5 right-1.5 z-20 w-5 h-5 rounded-full bg-black/65 backdrop-blur-xs text-white flex items-center justify-center shadow-xs pointer-events-none"
                            title="Salvo na sua estante"
                          >
                            <Bookmark className="w-2.5 h-2.5 fill-white text-white" />
                          </div>
                        )}
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

                          {/* Prominent Large Round Score Badge (Black 3D if rated by user) */}
                          <div className="shrink-0 flex items-center justify-center">
                            <ScoreBadge
                              score={getEffectiveScore(book, userRatings)}
                              size="lg"
                              isUserRating={Boolean(userRatings?.[book.id])}
                            />
                          </div>
                        </div>

                        {/* Veredito Quote without any fake badges */}
                        <p className="text-xs sm:text-sm text-[#515154] italic leading-relaxed line-clamp-2 border-l-2 border-neutral-200 pl-2.5">
                          "{book.veredito}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Floating Multi-Select Action Dock (Mobile & Desktop) */}
      <AnimatePresence>
        {isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360, mass: 0.8 }}
            className="fixed bottom-24 md:bottom-7 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg pointer-events-auto"
          >
            <div className="px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2 select-none">
              {/* Left: Selection count & Select All toggle */}
              <div className="flex items-center gap-2 min-w-0 pl-1">
                <button
                  type="button"
                  onClick={handleToggleSelectAllVisible}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#1d1d1f] hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer shrink-0"
                  title={allVisibleSelected ? 'Desmarcar todos' : 'Selecionar todos os livros visíveis'}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span className="truncate">
                    {selectedIds.size > 0
                      ? `${selectedIds.size} ${selectedIds.size === 1 ? 'selecionado' : 'selecionados'}`
                      : 'Selecionar todos'}
                  </span>
                </button>
              </div>

              {/* Right: Save, Delete, Cancel */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={selectedIds.size === 0}
                  onClick={handleBulkSave}
                  className="h-9 px-3.5 rounded-full text-xs font-bold bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-35 disabled:pointer-events-none"
                  title={allSelectedAreSaved ? 'Remover selecionados dos salvos' : 'Salvar livros selecionados'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${allSelectedAreSaved ? 'fill-white' : ''}`} />
                  <span>{allSelectedAreSaved ? 'Remover salvo' : 'Salvar'}</span>
                </button>

                <button
                  type="button"
                  disabled={selectedIds.size === 0}
                  onClick={handleBulkDelete}
                  className="h-9 px-3.5 rounded-full text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-35 disabled:pointer-events-none"
                  title="Excluir livros e avaliações selecionados"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir</span>
                </button>

                <button
                  type="button"
                  onClick={exitSelectionMode}
                  className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-[#636366] hover:text-[#1d1d1f] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                  title="Sair da seleção"
                  aria-label="Cancelar seleção"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DiscoverView.displayName = 'DiscoverView';
