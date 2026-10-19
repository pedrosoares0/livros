import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
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

  const filterChips: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'Todas as Prateleiras' },
    ...(savedBooks.length > 0 ? [{ id: 'salvos' as FilterOption, label: `Salvos (${savedBooks.length})` }] : []),
    ...(obrasPrimasBooks.length > 0 ? [{ id: 'obras-primas' as FilterOption, label: `Obras-Primas (${obrasPrimasBooks.length})` }] : []),
    ...(recomendadosBooks.length > 0 ? [{ id: 'recomendados' as FilterOption, label: `Recomendados (${recomendadosBooks.length})` }] : []),
    ...(ressalvasBooks.length > 0 ? [{ id: 'ressalvas' as FilterOption, label: `Vale com Ressalvas (${ressalvasBooks.length})` }] : []),
    ...(rejeicaoBooks.length > 0 ? [{ id: 'rejeicao' as FilterOption, label: `Zona de Rejeição (${rejeicaoBooks.length})` }] : []),
    ...(sciFiBooks.length > 0 ? [{ id: 'scifi' as FilterOption, label: `Sci-Fi & Existencial (${sciFiBooks.length})` }] : []),
    ...(classicosBooks.length > 0 ? [{ id: 'classicos' as FilterOption, label: `Clássicos & Filosofia (${classicosBooks.length})` }] : []),
    ...(darkSideBooks.length > 0 ? [{ id: 'darkside' as FilterOption, label: `DarkSide & Sombrios (${darkSideBooks.length})` }] : []),
    ...(curtosBooks.length > 0 ? [{ id: 'curtos' as FilterOption, label: `Contos & Obras Curtas (${curtosBooks.length})` }] : []),
  ];

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
