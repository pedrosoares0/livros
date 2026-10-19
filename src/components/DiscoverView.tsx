import React, { useState } from 'react';
import { BookOpen, ArrowUpDown } from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { ScoreBadge } from './ScoreBadge';
import { PearlButton } from './PearlButton';

interface DiscoverViewProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onOpenEvaluate: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  books,
  onSelectBook,
  onOpenEvaluate,
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const topMatches = books
    .filter((b) => b.notaEncaixe >= 8)
    .sort((a, b) => (sortOrder === 'desc' ? b.notaEncaixe - a.notaEncaixe : a.notaEncaixe - b.notaEncaixe));

  const recentEvaluations = books.slice(0, 10);

  return (
    <div className="w-full space-y-7 px-5 sm:px-6 pt-3 pb-24">
      {/* Single Unified Hero Card */}
      <div className="p-7 text-center rounded-3xl bg-neutral-50/90 border border-neutral-200/80 shadow-xs space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#1d1d1f] shadow-xs">
          <BookOpen className="w-6 h-6 stroke-[1.75]" />
        </div>

        <div className="space-y-1.5 max-w-sm mx-auto">
          <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
            Avaliador Pessoal
          </h2>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Analise qualquer livro ou HQ com base no seu perfil de leitura, preferências e aversões calibradas pelo Gemini.
          </p>
        </div>

        <div className="pt-1 flex justify-center">
          <PearlButton
            label="Avaliar livro"
            onClick={onOpenEvaluate}
          />
        </div>
      </div>

      {/* Empty State when database has no evaluations yet */}
      {books.length === 0 && (
        <div className="py-10 text-center space-y-2">
          <p className="text-sm font-semibold text-[#1d1d1f]">
            Nenhum livro avaliado ainda
          </p>
          <p className="text-xs text-[#86868b] max-w-xs mx-auto">
            Utilize o botão acima para pesquisar e avaliar livros. Suas avaliações e prateleiras são sincronizadas em tempo real com o banco de dados.
          </p>
        </div>
      )}

      {/* Obras de Alto Encaixe com Filtro Interativo Maior/Menor Nota */}
      {topMatches.length > 0 && (
        <div className="space-y-3.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
              Recomendações
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-[11px] font-semibold text-[#1d1d1f] hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
                title="Alternar ordenação da maior para a menor nota ou vice-versa"
              >
                <ArrowUpDown className="w-3 h-3 text-[#86868b]" />
                <span>{sortOrder === 'desc' ? 'Maior Nota' : 'Menor Nota'}</span>
              </button>
              <span className="text-xs font-semibold text-[#86868b]">
                {topMatches.length} {topMatches.length === 1 ? 'obra' : 'obras'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {topMatches.slice(0, 6).map((book) => (
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
                        <span className="text-[10px] text-[#86868b] font-medium font-score shrink-0">~{book.pages} págs</span>
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
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
              Últimas Avaliações
            </h3>
            <span className="text-[11px] font-medium text-[#86868b]">
              {recentEvaluations.length} {recentEvaluations.length === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </div>

          <div className="space-y-3.5">
            {recentEvaluations.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-neutral-50/90 border border-white hover:border-white transition-all duration-200 cursor-pointer flex items-center gap-4 sm:gap-5 group active:scale-[0.99] shadow-xs hover:shadow-sm"
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
                        {book.author} {book.year ? `• ${book.year}` : ''} {book.pages ? `• ~${book.pages} págs` : ''}
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
    </div>
  );
};
