import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
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
  const recentEvaluations = books.slice(0, 10);

  const renderVereditoMiniPill = (tipo: 'leia' | 'ressalvas' | 'evite') => {
    if (tipo === 'leia') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>LEIA</span>
        </span>
      );
    }
    if (tipo === 'ressalvas') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <AlertTriangle className="w-2.5 h-2.5" />
          <span>RESSALVAS</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
        <XCircle className="w-2.5 h-2.5" />
        <span>EVITE</span>
      </span>
    );
  };

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

      {/* Obras de Alto Encaixe (Nota de Encaixe >= 8) */}
      {topMatches.length > 0 && (
        <div className="space-y-3.5 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                Recomendações de Alto Encaixe
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#86868b]">
              {topMatches.length} {topMatches.length === 1 ? 'obra' : 'obras'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {topMatches.slice(0, 6).map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-3.5 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98] shadow-xs hover:shadow-sm"
              >
                <div className="w-full mb-2.5">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                    notaEncaixe={book.notaEncaixe}
                  />
                </div>
                <div className="space-y-1">
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

      {/* Últimas Avaliações — Visual Apple Card List */}
      {recentEvaluations.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
              Últimas Avaliações
            </h3>
            <span className="text-[11px] font-medium text-[#86868b]">
              {recentEvaluations.length} {recentEvaluations.length === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </div>

          <div className="space-y-3">
            {recentEvaluations.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="p-3 sm:p-3.5 rounded-2xl bg-white hover:bg-neutral-50/90 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-200 cursor-pointer flex items-center gap-3.5 sm:gap-4 group active:scale-[0.99] shadow-xs hover:shadow-sm"
              >
                {/* Visual Book Cover with Prominent Sizing */}
                <div className="w-14 sm:w-16 shrink-0">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                  />
                </div>

                {/* Rich Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#1d1d1f] truncate group-hover:text-black leading-snug">
                        {book.title}
                      </h4>
                      <p className="text-xs text-[#86868b] truncate">
                        {book.author} {book.year ? `• ${book.year}` : ''} {book.pages ? `• ~${book.pages} págs` : ''}
                      </p>
                    </div>

                    {/* Prominent Score Badge */}
                    <div className="shrink-0 flex flex-col items-end">
                      <ScoreBadge score={book.notaEncaixe} size="md" />
                      <span className="text-[9px] font-semibold text-[#86868b] mt-0.5">
                        Encaixe
                      </span>
                    </div>
                  </div>

                  {/* Veredito Preview & Pill */}
                  <div className="flex items-center gap-2 pt-0.5">
                    {renderVereditoMiniPill(book.vereditoTipo)}
                    <p className="text-[11px] text-[#6e6e73] italic truncate flex-1">
                      "{book.veredito}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
