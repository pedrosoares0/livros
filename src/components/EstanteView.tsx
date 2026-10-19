import React, { useState } from 'react';
import { BookEvaluation } from '../types';
import { BookShelf } from './BookShelf';

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

export const EstanteView: React.FC<EstanteViewProps> = ({
  books,
  onSelectBook,
  savedBookIds,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  const savedBooks = books.filter((b) => savedBookIds?.has(b.id));

  const filterChips: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'Todas as Prateleiras' },
    ...(savedBooks.length > 0 ? [{ id: 'salvos' as FilterOption, label: `Salvos (${savedBooks.length})` }] : []),
    { id: 'obras-primas', label: 'Obras-Primas' },
    { id: 'recomendados', label: 'Recomendados' },
    { id: 'ressalvas', label: 'Vale com Ressalvas' },
    { id: 'rejeicao', label: 'Zona de Rejeição' },
    { id: 'scifi', label: 'Sci-Fi & Existencial' },
    { id: 'classicos', label: 'Clássicos & Filosofia' },
    { id: 'darkside', label: 'DarkSide & Sombrios' },
    { id: 'curtos', label: 'Contos & Obras Curtas' },
  ];

  // Helper matching functions for dynamic, intelligent categorization
  const isRejeicao = (b: BookEvaluation) =>
    b.notaEncaixe < 5 || b.userStatus === 'disliked' || b.vereditoTipo === 'evite';

  const isObrasPrimas = (b: BookEvaluation) =>
    !isRejeicao(b) && (b.notaEncaixe >= 9.5 || b.userStatus === 'loved');

  const isRecomendados = (b: BookEvaluation) =>
    !isRejeicao(b) && !isObrasPrimas(b) && b.notaEncaixe >= 8 && b.notaEncaixe < 9.5;

  const isRessalvas = (b: BookEvaluation) =>
    !isRejeicao(b) && !isObrasPrimas(b) && !isRecomendados(b) && ((b.notaEncaixe >= 5 && b.notaEncaixe < 8) || b.vereditoTipo === 'ressalvas');

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
  const recentlyEvaluated = books.filter(
    (b) =>
      b.userStatus === 'analyzed' ||
      b.id.startsWith('eval-') ||
      b.id.startsWith('book-') ||
      b.id.startsWith('cbl-')
  );
  const obrasPrimasBooks = books.filter(isObrasPrimas);
  const recomendadosBooks = books.filter(isRecomendados);
  const ressalvasBooks = books.filter(isRessalvas);
  const rejeicaoBooks = books.filter(isRejeicao);

  const sciFiBooks = books.filter(isSciFi);
  const classicosBooks = books.filter(isClassicos);
  const darkSideBooks = books.filter(isDarkSide);
  const curtosBooks = books.filter(isCurtos);

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
                onClick={() => setSelectedFilter(chip.id)}
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

      {/* Dynamic Shelf Presentation */}
      {selectedFilter === 'all' && (
        <div className="space-y-4">
          {/* Prateleira de Livros Salvos pelo Usuário */}
          {savedBooks.length > 0 && (
            <BookShelf
              title="Salvos"
              books={savedBooks}
              onSelectBook={onSelectBook}
            />
          )}

          {/* Se houver livros avaliados recentemente */}
          {recentlyEvaluated.length > 0 && (
            <BookShelf
              title="Avaliados Recentemente"
              books={recentlyEvaluated}
              onSelectBook={onSelectBook}
            />
          )}

          {/* Obras-Primas / Favoritos */}
          <BookShelf
            title="Obras-Primas & Favoritos"
            books={obrasPrimasBooks}
            onSelectBook={onSelectBook}
          />

          {/* Ficção Científica & Existencial */}
          <BookShelf
            title="Ficção Científica & Existencial"
            books={sciFiBooks}
            onSelectBook={onSelectBook}
          />

          {/* Clássicos & Filosofia */}
          <BookShelf
            title="Clássicos, Filosofia & Drama Humano"
            books={classicosBooks}
            onSelectBook={onSelectBook}
          />

          {/* Fantasia Sombria & DarkSide */}
          <BookShelf
            title="Fantasia Sombria, DarkSide & Contos"
            books={darkSideBooks}
            onSelectBook={onSelectBook}
          />

          {/* Livros com Ressalvas */}
          {ressalvasBooks.length > 0 && (
            <BookShelf
              title="Vale com Ressalvas"
              books={ressalvasBooks}
              onSelectBook={onSelectBook}
            />
          )}

          {/* Zona de Rejeição / Evite */}
          {rejeicaoBooks.length > 0 && (
            <BookShelf
              title="Zona de Rejeição & Evite"
              books={rejeicaoBooks}
              onSelectBook={onSelectBook}
            />
          )}
        </div>
      )}

      {selectedFilter === 'salvos' && (
        <BookShelf
          title="Salvos"
          books={savedBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'obras-primas' && (
        <BookShelf
          title="Obras-Primas do Leitor"
          books={obrasPrimasBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'recomendados' && (
        <BookShelf
          title="Recomendados pelo Veredito"
          books={recomendadosBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'ressalvas' && (
        <BookShelf
          title="Vale com Ressalvas"
          books={ressalvasBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'rejeicao' && (
        <BookShelf
          title="Zona de Rejeição"
          books={rejeicaoBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'scifi' && (
        <BookShelf
          title="Ficção Científica & Existencial"
          books={sciFiBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'classicos' && (
        <BookShelf
          title="Clássicos, Filosofia & Drama Humano"
          books={classicosBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'darkside' && (
        <BookShelf
          title="Fantasia Sombria & DarkSide"
          books={darkSideBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'curtos' && (
        <BookShelf
          title="Contos & Obras Curtas"
          books={curtosBooks}
          onSelectBook={onSelectBook}
        />
      )}
    </div>
  );
};
