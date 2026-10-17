import React from 'react';
import { BookOpen } from 'lucide-react';
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
  const topMatches = books.filter((b) => b.notaEncaixe >= 8);
  const recentEvaluations = books.slice(0, 8);

  return (
    <div className="w-full space-y-6 px-6 pt-3 pb-24">
      {/* Single Unified Hero Card */}
      <div className="p-8 text-center rounded-3xl bg-neutral-50/90 border border-neutral-200/80 shadow-xs space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#1d1d1f]">
          <BookOpen className="w-6 h-6 stroke-[1.75]" />
        </div>

        <div className="space-y-1 max-w-sm mx-auto">
          <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
            Avaliador Pessoal
          </h2>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Analise qualquer livro ou HQ com base no seu perfil de leitura, preferências e aversões calibradas pelo Gemini.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <PearlButton
            label="Avaliar livro"
            onClick={onOpenEvaluate}
          />
        </div>
      </div>

      {/* Obras de Alto Encaixe (Nota de Encaixe >= 8) */}
      {topMatches.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
              Recomendações de Alto Encaixe
            </h3>
            <span className="text-xs font-score text-[#86868b]">
              {topMatches.length} obras
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

      {/* Últimas Avaliações */}
      {recentEvaluations.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
              Últimas Avaliações
            </h3>
            <span className="text-[10px] text-[#86868b] font-score">
              Supabase
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
