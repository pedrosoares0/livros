import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, ArrowLeft, ArrowUpDown, Check, Bookmark, Trash2, CheckSquare, X } from 'lucide-react';
import { BookEvaluation, UserRatingsMap } from '../types';
import { getEffectiveScore } from '../services/ratings';
import { BookShelf } from './BookShelf';
import { BookCover } from './BookCover';

interface EstanteViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  savedBookIds?: Set<string>;
  userRatings?: UserRatingsMap;
  onBulkToggleSave?: (bookIds: string[], willBeSaved: boolean) => void;
  onBulkDeleteBooks?: (bookIds: string[]) => void;
}

type FilterOption = 
  | 'all' 
  | 'lidos'
  | 'salvos'
  | 'obras-primas' 
  | 'recomendados' 
  | 'ressalvas' 
  | 'rejeicao' 
  | 'scifi' 
  | 'classicos' 
  | 'darkside' 
  | 'curtos';

interface ShelfDefinition {
  id: FilterOption;
  title: string;
  chipLabel: string;
  books: BookEvaluation[];
  covers?: string[];
}

// Representantes icônicos e não-repetidos para cada gênero/prateleira
const PREFERRED_REPRESENTATIVES: Record<string, string[]> = {
  scifi: [
    'a-chegada-historia-da-sua-vida',
    'o-cair-da-noite',
    'flores-para-algernon',
    'br-duna',
  ],
  classicos: [
    'noites-brancas',
    'o-inferno-de-dante',
    'entre-quatro-paredes',
    'diario-de-um-homem-superfluo',
  ],
  darkside: [
    'colapso',
    'o-gato-preto',
    'a-menina-do-outro-lado',
    'o-estranho-misterioso',
  ],
  curtos: [
    'de-quanta-terra-precisa-o-homem',
    'contos-de-beedle-o-bardo',
    'a-morte-de-ivan-ilitch',
  ],
  'obras-primas': [
    'senhor-das-moscas',
    'a-revolucao-dos-bichos',
    '1984',
    'a-estrada',
  ],
  rejeicao: [
    'patinando-no-amor',
    'a-cabeca-do-santo',
  ],
};

export const EstanteView: React.FC<EstanteViewProps> = React.memo(({
  books,
  onSelectBook,
  savedBookIds,
  userRatings,
  onBulkToggleSave,
  onBulkDeleteBooks,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  }, []);

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => {
      if (prev) {
        setSelectedIds(new Set());
      }
      return !prev;
    });
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

  // Memoize savedBooks to prevent recalculations
  const savedBooks = useMemo(
    () => books.filter((b) => savedBookIds?.has(b.id) || b.isSaved),
    [books, savedBookIds]
  );

  // Memoize all categorized shelves dynamically
  const allShelves: ShelfDefinition[] = useMemo(() => {
    // Livros lidos e avaliados pessoalmente pelo leitor
    const lidosBooks = books.filter((b) => Boolean(userRatings?.[b.id]));

    // Helper matching functions for dynamic, intelligent categorization driven by effective score
    const isRejeicao = (b: BookEvaluation) => {
      const eff = getEffectiveScore(b, userRatings);
      return Math.floor(eff) < 5 || b.userStatus === 'disliked' || b.vereditoTipo === 'evite';
    };

    const isObrasPrimas = (b: BookEvaluation) => {
      const eff = getEffectiveScore(b, userRatings);
      return !isRejeicao(b) && (Math.floor(eff) >= 9 || b.userStatus === 'loved');
    };

    const isRecomendados = (b: BookEvaluation) => {
      const eff = getEffectiveScore(b, userRatings);
      return !isRejeicao(b) && !isObrasPrimas(b) && Math.floor(eff) >= 8;
    };

    const isRessalvas = (b: BookEvaluation) => {
      const eff = getEffectiveScore(b, userRatings);
      return !isRejeicao(b) && !isObrasPrimas(b) && !isRecomendados(b) && (Math.floor(eff) >= 5 || b.vereditoTipo === 'ressalvas');
    };

    const isSciFi = (b: BookEvaluation) => 
      b.categoryShelf === 'Ficção Científica' || 
      b.genres.some((g) => {
        const gl = g.toLowerCase();
        return gl.includes('ficção') || gl.includes('sci-fi') || gl.includes('espaço') || gl.includes('distopia') || gl.includes('cyberpunk');
      });

    const isClassicos = (b: BookEvaluation) =>
      b.categoryShelf === 'Clássicos & Drama Humano' ||
      b.genres.some((g) => {
        const gl = g.toLowerCase();
        return gl.includes('clássico') || gl.includes('filosofia') || gl.includes('teatro') || gl.includes('moral') || gl.includes('ensaio');
      });

    const isDarkSide = (b: BookEvaluation) =>
      b.categoryShelf === 'Fantasia Sombria & Distopia' ||
      b.genres.some((g) => {
        const gl = g.toLowerCase();
        return gl.includes('darkside') || gl.includes('sombria') || gl.includes('gótico') || gl.includes('horror') || gl.includes('thriller');
      });

    const isCurtos = (b: BookEvaluation) =>
      b.pages <= 180 ||
      b.categoryShelf === 'Graphic Novels & Contos' ||
      b.genres.some((g) => {
        const gl = g.toLowerCase();
        return gl.includes('conto') || gl.includes('novela') || gl.includes('graphic');
      });

    // Calculate shelf groups
    const obrasPrimasBooks = books.filter(isObrasPrimas);
    const recomendadosBooks = books.filter(isRecomendados);
    const ressalvasBooks = books.filter(isRessalvas);
    const rejeicaoBooks = books.filter(isRejeicao);

    const sciFiBooks = books.filter(isSciFi);
    const classicosBooks = books.filter(isClassicos);
    const darkSideBooks = books.filter(isDarkSide);
    const curtosBooks = books.filter(isCurtos);

    return [
      ...(lidosBooks.length > 0 ? [{ id: 'lidos' as FilterOption, title: 'Lidos & Avaliados por Você', chipLabel: 'Lidos', books: lidosBooks }] : []),
      ...(savedBooks.length > 0 ? [{ id: 'salvos' as FilterOption, title: 'Salvos', chipLabel: 'Salvos', books: savedBooks }] : []),
      ...(obrasPrimasBooks.length > 0 ? [{ id: 'obras-primas' as FilterOption, title: 'Obras-Primas & Favoritos', chipLabel: 'Obras-Primas', books: obrasPrimasBooks }] : []),
      ...(sciFiBooks.length > 0 ? [{ id: 'scifi' as FilterOption, title: 'Ficção Científica & Existencial', chipLabel: 'Ficção Científica', books: sciFiBooks }] : []),
      ...(classicosBooks.length > 0 ? [{ id: 'classicos' as FilterOption, title: 'Clássicos, Filosofia & Drama Humano', chipLabel: 'Clássicos', books: classicosBooks }] : []),
      ...(darkSideBooks.length > 0 ? [{ id: 'darkside' as FilterOption, title: 'Fantasia Sombria, DarkSide & Contos', chipLabel: 'DarkSide', books: darkSideBooks }] : []),
      ...(curtosBooks.length > 0 ? [{ id: 'curtos' as FilterOption, title: 'Contos & Obras Curtas', chipLabel: 'Contos Curtos', books: curtosBooks }] : []),
      ...(recomendadosBooks.length > 0 ? [{ id: 'recomendados' as FilterOption, title: 'Recomendados pelo Veredito', chipLabel: 'Recomendados', books: recomendadosBooks }] : []),
      ...(ressalvasBooks.length > 0 ? [{ id: 'ressalvas' as FilterOption, title: 'Vale com Ressalvas', chipLabel: 'Ressalvas', books: ressalvasBooks }] : []),
      ...(rejeicaoBooks.length > 0 ? [{ id: 'rejeicao' as FilterOption, title: 'Zona de Rejeição & Evite', chipLabel: 'Zona de Rejeição', books: rejeicaoBooks }] : []),
    ];
  }, [books, savedBooks, userRatings]);

  // Atribuição de duas capas representativas para cada filtro, sem repetição entre eles
  const shelvesWithCovers = useMemo(() => {
    const usedCoverUrls = new Set<string>();

    return allShelves.map((shelf) => {
      const selectedCovers: string[] = [];
      const preferredIds = PREFERRED_REPRESENTATIVES[shelf.id] || [];

      // 1. Tentar representantes icônicos pré-definidos se ainda não foram usados
      for (const prefId of preferredIds) {
        if (selectedCovers.length >= 2) break;
        const book = shelf.books.find(
          (b) => (b.id === prefId || b.id.includes(prefId)) && b.coverUrl && !usedCoverUrls.has(b.coverUrl)
        );
        if (book?.coverUrl) {
          selectedCovers.push(book.coverUrl);
          usedCoverUrls.add(book.coverUrl);
        }
      }

      // 2. Se ainda faltar capa, buscar livros não utilizados pertencentes a esta prateleira
      if (selectedCovers.length < 2) {
        for (const book of shelf.books) {
          if (selectedCovers.length >= 2) break;
          if (book.coverUrl && !usedCoverUrls.has(book.coverUrl)) {
            selectedCovers.push(book.coverUrl);
            usedCoverUrls.add(book.coverUrl);
          }
        }
      }

      // 3. Fallback seguro: se a prateleira tem poucos livros, pegar livros distintos da própria prateleira
      if (selectedCovers.length < 2) {
        for (const book of shelf.books) {
          if (selectedCovers.length >= 2) break;
          if (book.coverUrl && !selectedCovers.includes(book.coverUrl)) {
            selectedCovers.push(book.coverUrl);
          }
        }
      }

      // 4. Se só houver 1 livro cadastrado na prateleira inteira, usar como capa única/dupla
      if (selectedCovers.length === 1 && shelf.books[0]?.coverUrl) {
        selectedCovers.push(shelf.books[0].coverUrl);
      }

      return {
        ...shelf,
        covers: selectedCovers,
      };
    });
  }, [allShelves]);

  const activeShelf = shelvesWithCovers.find((s) => s.id === selectedFilter);

  const sortedActiveBooks = useMemo(() => {
    if (!activeShelf) return [];
    return [...activeShelf.books].sort((a, b) => {
      const scoreA = getEffectiveScore(a, userRatings);
      const scoreB = getEffectiveScore(b, userRatings);
      return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });
  }, [activeShelf, sortOrder, userRatings]);

  const handleSelectShelf = (id: FilterOption) => {
    setSelectedFilter(id);
    exitSelectionMode();
  };

  const selectedArray = useMemo(() => Array.from(selectedIds), [selectedIds]);
  const allSelectedAreSaved = useMemo(() => {
    if (selectedArray.length === 0) return false;
    return selectedArray.every((id) => savedBookIds?.has(id));
  }, [selectedArray, savedBookIds]);

  const allShelfSelected =
    sortedActiveBooks.length > 0 && sortedActiveBooks.every((b) => selectedIds.has(b.id));

  const handleToggleSelectAllShelf = useCallback(() => {
    if (allShelfSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedActiveBooks.map((b) => b.id)));
    }
  }, [allShelfSelected, sortedActiveBooks]);

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

  return (
    <div className="space-y-4 pb-12 md:pb-16">
      {/* Smart Filter Pills Row */}
      <div className="px-5 sm:px-6 md:px-8 lg:px-12 pt-1 pb-1.5">
        <div className="flex items-center gap-2.5 overflow-x-auto md:flex-wrap md:overflow-visible py-2 px-1 hide-scrollbar select-none -mx-1">
          {shelvesWithCovers.map((shelf) => {
            const isActive = selectedFilter === shelf.id;
            const [cover1, cover2] = shelf.covers || [];

            return (
              <button
                key={shelf.id}
                type="button"
                onClick={() => handleSelectShelf(isActive ? 'all' : shelf.id)}
                className={`h-11 sm:h-11.5 pl-2 sm:pl-2.5 pr-4.5 sm:pr-5 rounded-full flex items-center gap-2.5 sm:gap-3 shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#1d1d1f] text-white border border-[#1d1d1f] shadow-[0_4px_14px_rgba(0,0,0,0.2)]'
                    : 'bg-white text-[#1d1d1f] hover:bg-neutral-50/90 border border-neutral-100/90 shadow-[0_2.5px_10px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]'
                }`}
              >
                {/* Duas capas quadradas sobrepostas com cantos arredondados e borda branca */}
                <div className="flex items-center shrink-0">
                  {cover1 && (
                    <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-[8px] sm:rounded-[9px] overflow-hidden bg-neutral-100 border-[1.5px] sm:border-2 border-white shadow-xs shrink-0 flex items-center justify-center">
                      <img
                        src={cover1}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {cover2 && (
                    <div className="relative -ml-3.5 sm:-ml-4 z-10 w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-[8px] sm:rounded-[9px] overflow-hidden bg-neutral-100 border-[1.5px] sm:border-2 border-white shadow-sm shrink-0 flex items-center justify-center">
                      <img
                        src={cover2}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Título do Gênero/Prateleira */}
                <span className="text-xs sm:text-[13.5px] font-semibold tracking-tight whitespace-nowrap">
                  {shelf.chipLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State when no books exist in DB */}
      {books.length === 0 && (
        <div className="py-20 text-center px-6 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-[#86868b]">
            <BookOpen className="w-6 h-6 stroke-[1.75]" />
          </div>
          <p className="text-sm font-semibold text-[#1d1d1f]">
            Sua estante está vazia
          </p>
          <p className="text-xs text-[#86868b] max-w-xs mx-auto">
            Avalie ou salve livros no Veredito para que suas prateleiras sejam organizadas automaticamente e sincronizadas com o banco.
          </p>
        </div>
      )}

      {/* View All Shelves (Horizontal Carousels with Clickable Titles) - 2 columns on PC, single column on mobile */}
      {selectedFilter === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-start pt-2 md:pt-4">
          {allShelves.map((shelf) => (
            <div key={shelf.id} className="min-w-0 w-full overflow-hidden">
              <BookShelf
                title={shelf.title}
                books={shelf.books}
                onSelectBook={onSelectBook}
                onTitleClick={() => handleSelectShelf(shelf.id)}
                userRatings={userRatings}
              />
            </div>
          ))}
        </div>
      )}

      {/* Single Shelf Opened as List/Grid View */}
      {selectedFilter !== 'all' && activeShelf && (
        <div className="space-y-6 pt-1 pb-24 md:pb-16">
          {/* Shelf Navigation and Controls Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => handleSelectShelf('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-xs font-semibold text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Prateleiras</span>
            </button>

            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sort Order Toggle - apenas setinhas */}
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-3xs cursor-pointer select-none flex items-center justify-center shrink-0"
                title={sortOrder === 'desc' ? 'Maior Nota (clique para Menor Nota)' : 'Menor Nota (clique para Maior Nota)'}
                aria-label="Alternar ordenação"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#1d1d1f]" />
              </button>

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

              {isSelectionMode && (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={selectedIds.size === 0}
                    onClick={handleBulkSave}
                    className="h-7 sm:h-7.5 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 justify-center bg-white text-[#1d1d1f] hover:bg-neutral-50 border-neutral-200/90 hover:border-neutral-300 shadow-3xs disabled:opacity-40 disabled:pointer-events-none"
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
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>
                      Excluir{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
                    </span>
                  </button>
                </div>
              )}

              <span className="text-xs font-semibold text-[#86868b] ml-1">
                {activeShelf.books.length} {activeShelf.books.length === 1 ? 'obra' : 'obras'}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#1d1d1f] font-sans">
              {activeShelf.title}
            </h2>
          </div>

          {/* Grid presentation matching Início */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-6 xl:gap-x-7 gap-y-9 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
            {sortedActiveBooks.map((book) => {
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
            })}
          </div>

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
                  <div className="flex items-center gap-2 min-w-0 pl-1">
                    <button
                      type="button"
                      onClick={handleToggleSelectAllShelf}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#1d1d1f] hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-[#1d1d1f]" />
                      <span className="truncate">
                        {selectedIds.size > 0
                          ? `${selectedIds.size} ${selectedIds.size === 1 ? 'selecionado' : 'selecionados'}`
                          : 'Selecionar todos'}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={selectedIds.size === 0}
                      onClick={handleBulkSave}
                      className="h-9 px-3.5 rounded-full text-xs font-bold bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-35 disabled:pointer-events-none"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${allSelectedAreSaved ? 'fill-white' : ''}`} />
                      <span>{allSelectedAreSaved ? 'Remover salvo' : 'Salvar'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedIds.size === 0}
                      onClick={handleBulkDelete}
                      className="h-9 px-3.5 rounded-full text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-35 disabled:pointer-events-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>

                    <button
                      type="button"
                      onClick={exitSelectionMode}
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-[#636366] hover:text-[#1d1d1f] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
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
      )}
    </div>
  );
});

EstanteView.displayName = 'EstanteView';
