import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ArrowUpDown, LayoutGrid, Rows } from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookShelf } from './BookShelf';
import { BookCover } from './BookCover';

interface EstanteViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  savedBookIds?: Set<string>;
}

type FilterOption = 
  | 'all' 
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
}

export const EstanteView: React.FC<EstanteViewProps> = ({
  books,
  onSelectBook,
  savedBookIds,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  const savedBooks = books.filter((b) => savedBookIds?.has(b.id) || b.isSaved);

  // Helper matching functions for dynamic, intelligent categorization
  const isRejeicao = (b: BookEvaluation) =>
    Math.floor(b.notaEncaixe) < 5 || b.userStatus === 'disliked' || b.vereditoTipo === 'evite';

  const isObrasPrimas = (b: BookEvaluation) =>
    !isRejeicao(b) && (Math.floor(b.notaEncaixe) >= 10 || b.userStatus === 'loved');

  const isRecomendados = (b: BookEvaluation) =>
    !isRejeicao(b) && !isObrasPrimas(b) && Math.floor(b.notaEncaixe) >= 8;

  const isRessalvas = (b: BookEvaluation) =>
    !isRejeicao(b) && !isObrasPrimas(b) && !isRecomendados(b) && (Math.floor(b.notaEncaixe) >= 5 || b.vereditoTipo === 'ressalvas');

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

  // Calculate shelves dynamically
  const obrasPrimasBooks = books.filter(isObrasPrimas);
  const recomendadosBooks = books.filter(isRecomendados);
  const ressalvasBooks = books.filter(isRessalvas);
  const rejeicaoBooks = books.filter(isRejeicao);

  const sciFiBooks = books.filter(isSciFi);
  const classicosBooks = books.filter(isClassicos);
  const darkSideBooks = books.filter(isDarkSide);
  const curtosBooks = books.filter(isCurtos);

  const allShelves: ShelfDefinition[] = [
    ...(savedBooks.length > 0 ? [{ id: 'salvos' as FilterOption, title: 'Salvos', chipLabel: `Salvos (${savedBooks.length})`, books: savedBooks }] : []),
    ...(obrasPrimasBooks.length > 0 ? [{ id: 'obras-primas' as FilterOption, title: 'Obras-Primas & Favoritos', chipLabel: `Obras-Primas (${obrasPrimasBooks.length})`, books: obrasPrimasBooks }] : []),
    ...(recomendadosBooks.length > 0 ? [{ id: 'recomendados' as FilterOption, title: 'Recomendados pelo Veredito', chipLabel: `Recomendados (${recomendadosBooks.length})`, books: recomendadosBooks }] : []),
    ...(sciFiBooks.length > 0 ? [{ id: 'scifi' as FilterOption, title: 'Ficção Científica & Existencial', chipLabel: `Sci-Fi & Existencial (${sciFiBooks.length})`, books: sciFiBooks }] : []),
    ...(classicosBooks.length > 0 ? [{ id: 'classicos' as FilterOption, title: 'Clássicos, Filosofia & Drama Humano', chipLabel: `Clássicos & Filosofia (${classicosBooks.length})`, books: classicosBooks }] : []),
    ...(darkSideBooks.length > 0 ? [{ id: 'darkside' as FilterOption, title: 'Fantasia Sombria, DarkSide & Contos', chipLabel: `DarkSide & Sombrios (${darkSideBooks.length})`, books: darkSideBooks }] : []),
    ...(curtosBooks.length > 0 ? [{ id: 'curtos' as FilterOption, title: 'Contos & Obras Curtas', chipLabel: `Contos & Obras Curtas (${curtosBooks.length})`, books: curtosBooks }] : []),
    ...(ressalvasBooks.length > 0 ? [{ id: 'ressalvas' as FilterOption, title: 'Vale com Ressalvas', chipLabel: `Vale com Ressalvas (${ressalvasBooks.length})`, books: ressalvasBooks }] : []),
    ...(rejeicaoBooks.length > 0 ? [{ id: 'rejeicao' as FilterOption, title: 'Zona de Rejeição & Evite', chipLabel: `Zona de Rejeição (${rejeicaoBooks.length})`, books: rejeicaoBooks }] : []),
  ];

  const filterChips: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'Todas as Prateleiras' },
    ...allShelves.map((s) => ({ id: s.id, label: s.chipLabel })),
  ];

  const activeShelf = allShelves.find((s) => s.id === selectedFilter);

  const handleSelectShelf = (id: FilterOption) => {
    setSelectedFilter(id);
    if (id !== 'all') {
      setViewMode('grid');
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Smart Filter Pills Row */}
      <div className="px-6 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto py-1 hide-scrollbar select-none">
          {filterChips.map((chip) => {
            const isActive = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => handleSelectShelf(chip.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'bg-neutral-100/90 text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/80 border border-neutral-200/60'
                }`}
              >
                <span>{chip.label}</span>
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

      {/* View All Shelves (Horizontal Carousels with Clickable Titles) */}
      {selectedFilter === 'all' && (
        <div className="space-y-4">
          {allShelves.map((shelf) => (
            <BookShelf
              key={shelf.id}
              title={shelf.title}
              books={shelf.books}
              onSelectBook={onSelectBook}
              onTitleClick={() => handleSelectShelf(shelf.id)}
            />
          ))}
        </div>
      )}

      {/* Single Shelf Opened as List/Grid View (like Início) */}
      {selectedFilter !== 'all' && activeShelf && (
        <div className="space-y-4 px-5 sm:px-6 pt-1 pb-24">
          {/* Shelf Navigation and Controls Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-xs font-semibold text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Todas as Prateleiras</span>
            </button>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle (Grid vs Shelf Carousel) */}
              <div className="flex items-center bg-neutral-100 p-0.5 rounded-full border border-neutral-200/60">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#1d1d1f] shadow-2xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                  title="Ver em grade (lista)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('carousel')}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    viewMode === 'carousel' ? 'bg-white text-[#1d1d1f] shadow-2xs' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                  title="Ver em carrossel"
                >
                  <Rows className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sort Order Toggle */}
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-[11px] font-semibold text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
                title="Alternar ordenação da maior para a menor nota ou vice-versa"
              >
                <ArrowUpDown className="w-3 h-3 text-[#86868b]" />
                <span>{sortOrder === 'desc' ? 'Maior Nota' : 'Menor Nota'}</span>
              </button>

              <span className="text-xs font-semibold text-[#86868b]">
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
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {[...activeShelf.books]
                .sort((a, b) => (sortOrder === 'desc' ? b.notaEncaixe - a.notaEncaixe : a.notaEncaixe - b.notaEncaixe))
                .map((book) => (
                  <div
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="p-3.5 rounded-2xl bg-white hover:bg-neutral-50/80 border border-white hover:border-white transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] shadow-xs hover:shadow-sm"
                  >
                    <div className="w-full mb-2.5">
                      <BookCover
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                        notaEncaixe={book.notaEncaixe}
                      />
                    </div>
                    <div className="space-y-0.5 pt-0.5">
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#1d1d1f] truncate group-hover:text-black leading-snug">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-[#86868b] truncate flex items-center gap-1.5">
                        <span className="truncate">{book.author}</span>
                        {book.pages && (
                          <>
                            <span className="text-neutral-300 shrink-0">•</span>
                            <span className="text-[10px] text-[#86868b] font-medium font-score shrink-0">{book.pages} págs</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="-mx-5 sm:-mx-6">
              <BookShelf
                title={activeShelf.title}
                books={activeShelf.books}
                onSelectBook={onSelectBook}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
