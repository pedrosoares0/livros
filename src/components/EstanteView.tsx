import React, { useState } from 'react';
import { BookEvaluation } from '../types';
import { BookShelf } from './BookShelf';

interface EstanteViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
}

type FilterOption = 
  | 'all' 
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
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  const filterChips: { id: FilterOption; label: string; icon?: string }[] = [
    { id: 'all', label: 'Todas as Prateleiras' },
    { id: 'obras-primas', label: 'Obras-Primas (10/10)', icon: '👑' },
    { id: 'recomendados', label: 'Recomendados (8 - 9)', icon: '🎯' },
    { id: 'ressalvas', label: 'Com Ressalvas (5 - 7)', icon: '⚠️' },
    { id: 'rejeicao', label: 'Zona de Rejeição (≤ 4)', icon: '🚫' },
    { id: 'scifi', label: 'Sci-Fi & Existencial', icon: '🚀' },
    { id: 'classicos', label: 'Clássicos & Filosofia', icon: '🏛️' },
    { id: 'darkside', label: 'DarkSide & Sombrios', icon: '🌑' },
    { id: 'curtos', label: 'Contos & Obras Curtas', icon: '⚡' },
  ];

  // Helper matching functions for dynamic, intelligent categorization
  const isObrasPrimas = (b: BookEvaluation) => b.notaEncaixe >= 9.5 || b.userStatus === 'loved';
  const isRecomendados = (b: BookEvaluation) => b.notaEncaixe >= 8 && b.notaEncaixe < 9.5;
  const isRessalvas = (b: BookEvaluation) => (b.notaEncaixe >= 5 && b.notaEncaixe < 8) || b.vereditoTipo === 'ressalvas';
  const isRejeicao = (b: BookEvaluation) => b.notaEncaixe < 5 || b.userStatus === 'disliked' || b.vereditoTipo === 'evite';

  const isSciFi = (b: BookEvaluation) => 
    b.categoryShelf === 'Ficção Científica' || 
    b.genres.some((g) => {
      const gl = g.toLowerCase();
      return gl.includes('ficção') || gl.includes('sci-fi') || gl.includes('espaço') || gl.includes('distopia');
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
  const recentlyEvaluated = books.filter((b) => b.id.startsWith('eval-'));
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
                {chip.icon && <span className="text-[11px]">{chip.icon}</span>}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Shelf Presentation */}
      {selectedFilter === 'all' && (
        <div className="space-y-4">
          {/* Se houver livros avaliados recentemente */}
          {recentlyEvaluated.length > 0 && (
            <BookShelf
              title="Avaliados Recentemente"
              books={recentlyEvaluated}
              onSelectBook={onSelectBook}
            />
          )}

          {/* Obras-Primas / Favoritos 10/10 */}
          <BookShelf
            title="Obras-Primas & Favoritos (Nota 10)"
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

          {/* Livros com Ressalvas (ex: avaliações nota 5 a 7 como Choppenhauer) */}
          {ressalvasBooks.length > 0 && (
            <BookShelf
              title="Vale com Ressalvas (Notas 5 a 7)"
              books={ressalvasBooks}
              onSelectBook={onSelectBook}
            />
          )}

          {/* Zona de Rejeição / Evite (O Velho e o Mar, Rama, Carta ao Pai, etc.) */}
          {rejeicaoBooks.length > 0 && (
            <BookShelf
              title="Zona de Rejeição & Evite (Nota ≤ 4)"
              books={rejeicaoBooks}
              onSelectBook={onSelectBook}
            />
          )}
        </div>
      )}

      {selectedFilter === 'obras-primas' && (
        <BookShelf
          title="Obras-Primas do Leitor (10/10)"
          books={obrasPrimasBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'recomendados' && (
        <BookShelf
          title="Recomendados pelo Protocolo (Nota 8 a 9)"
          books={recomendadosBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'ressalvas' && (
        <BookShelf
          title="Vale com Ressalvas (Nota 5 a 7)"
          books={ressalvasBooks}
          onSelectBook={onSelectBook}
        />
      )}

      {selectedFilter === 'rejeicao' && (
        <BookShelf
          title="Zona de Rejeição (Nota ≤ 4)"
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
          title="Contos & Obras Curtas (até 180 págs)"
          books={curtosBooks}
          onSelectBook={onSelectBook}
        />
      )}
    </div>
  );
};
