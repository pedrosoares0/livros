import React, { useState, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BookEvaluation, UserRatingsMap } from '../types';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import { BookCover } from './BookCover';

interface BookShelfProps {
  title: string;
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onTitleClick?: () => void;
  userRatings?: UserRatingsMap;
}

export const BookShelf: React.FC<BookShelfProps> = React.memo(({
  title,
  books,
  onSelectBook,
  onTitleClick,
  userRatings,
}) => {
  const {
    scrollRef: scrollContainerRef,
    isDragging,
    onMouseDown,
    onDragStart,
    shouldSuppressClick,
  } = useHorizontalDragScroll<HTMLDivElement>();

  const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });

  const updateScrollEdges = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const left = el.scrollLeft > 8;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
    setScrollEdges((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right }
    );
  }, [scrollContainerRef]);

  useEffect(() => {
    updateScrollEdges();
    const el = scrollContainerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [books.length, scrollContainerRef, updateScrollEdges]);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="w-full space-y-1.5 py-3 select-none" style={{ contain: 'layout style' }}>
      {/* Category Header Row */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-3 lg:px-4">
        {onTitleClick ? (
          <button
            type="button"
            onClick={onTitleClick}
            className="group flex items-center gap-1.5 text-left cursor-pointer select-none active:scale-[0.98] transition-transform py-0.5 -ml-1 pl-1 pr-2 rounded-lg hover:bg-neutral-100/80"
            title={`Abrir "${title}" como lista`}
          >
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1d1d1f] group-hover:text-black transition-colors font-sans flex items-center gap-1">
              <span>{title}</span>
              <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-0.5 transition-all shrink-0" />
            </h3>
          </button>
        ) : (
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1d1d1f] font-sans">
            {title}
          </h3>
        )}

        <span className="text-[12px] font-medium text-[#86868b] tabular-nums">
          {books.length} {books.length === 1 ? 'livro' : 'livros'}
        </span>
      </div>

      {/* Books Container with Refined Frosted Acrylic Shelf Bar */}
      <div className="relative w-full overflow-hidden group/shelf">
        {/* Left Scroll Chevron (Desktop Only, shown only when scrolled) */}
        {scrollEdges.left && (
          <button
            type="button"
            onClick={() => scrollByAmount(-320)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-7 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#1d1d1f] shadow-[0_6px_18px_rgba(0,0,0,0.12)] border border-black/[0.06] items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Rolar estante para esquerda"
            title="Rolar para esquerda"
          >
            <ChevronLeft className="w-4 h-4 text-[#1d1d1f]" />
          </button>
        )}

        {/* Right Scroll Chevron (Desktop Only, shown only when more items exist) */}
        {scrollEdges.right && (
          <button
            type="button"
            onClick={() => scrollByAmount(320)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-7 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#1d1d1f] shadow-[0_6px_18px_rgba(0,0,0,0.12)] border border-black/[0.06] items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Rolar estante para direita"
            title="Rolar para direita"
          >
            <ChevronRight className="w-4 h-4 text-[#1d1d1f]" />
          </button>
        )}

        {/* Horizontal Book Row - Smooth scrolling + mouse drag on desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollEdges}
          onMouseDown={onMouseDown}
          onDragStart={onDragStart}
          className={`flex items-end gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain pt-2.5 pb-7 px-3 sm:px-4 md:px-3 lg:px-4 hide-scrollbar ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
        >
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => {
                if (shouldSuppressClick()) return;
                onSelectBook(book);
              }}
              className={`group relative flex flex-col items-center shrink-0 transition-transform duration-200 active:scale-[0.97] w-[142px] sm:w-[154px] lg:w-[138px] xl:w-[146px] ${
                isDragging ? 'cursor-grabbing' : 'cursor-pointer'
              }`}
            >
              {/* Authentic Book Cover */}
              <div className="w-[142px] h-[213px] sm:w-[154px] sm:h-[231px] lg:w-[138px] lg:h-[207px] xl:w-[146px] xl:h-[219px] transition-transform duration-200 group-hover:-translate-y-1.5">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  notaEncaixe={book.notaEncaixe}
                  userRating={userRatings?.[book.id]?.rating}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Refined Layered Frosted Acrylic Shelf Lip (Braun / Apple Hardware aesthetic) */}
        <div
          className="absolute left-2 sm:left-3 md:left-2 lg:left-3 right-2 sm:right-3 md:right-2 lg:right-3 pointer-events-none z-20"
          style={{ bottom: '15px' }}
        >
          <div
            className="relative w-full h-12 rounded-2xl flex items-center justify-between px-3.5 overflow-hidden border will-change-transform"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 244, 249, 0.74) 52%, rgba(224, 230, 240, 0.88) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderColor: 'rgba(255, 255, 255, 0.92)',
              boxShadow:
                '0 12px 24px -8px rgba(15, 23, 42, 0.12), 0 3px 8px -2px rgba(15, 23, 42, 0.06), inset 0 1px 0.5px rgba(255, 255, 255, 0.98), inset 0 -1.5px 2px rgba(148, 163, 184, 0.22)',
              transform: 'translateZ(0)',
            }}
          >
            {/* Top beveled glass edge highlight */}
            <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

            {/* Left Machined Silver Screw Rivet */}
            <div className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-300 via-neutral-50 to-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.16)] ring-1 ring-black/[0.08] border border-white/95 flex items-center justify-center">
              <div className="w-2.5 h-[1.5px] bg-neutral-600/80 rotate-45 rounded-full" />
            </div>

            {/* Subtle internal acrylic bevel refraction */}
            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-white/30 via-white/95 to-white/30" />

            {/* Right Machined Silver Screw Rivet */}
            <div className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-300 via-neutral-50 to-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.16)] ring-1 ring-black/[0.08] border border-white/95 flex items-center justify-center">
              <div className="w-2.5 h-[1.5px] bg-neutral-600/80 -rotate-45 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BookShelf.displayName = 'BookShelf';
