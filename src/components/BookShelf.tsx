import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';

interface BookShelfProps {
  title: string;
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
}

export const BookShelf: React.FC<BookShelfProps> = ({
  title,
  books,
  onSelectBook,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -320 : 320;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Smooth mouse-wheel scrolling translated to horizontal motion
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollBy({
        left: e.deltaY * 1.2,
        behavior: 'smooth',
      });
    }
  };

  // Direct manipulation: Smooth Grab & Drag with 1:1 tracking
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.1;
    dragDistanceRef.current = Math.abs(x - startXRef.current);
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    isDraggingRef.current = false;
    try {
      scrollContainerRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture release
    }
  };

  const handleBookClick = (book: BookEvaluation) => {
    // Only open if not a drag action (threshold of 6px)
    if (dragDistanceRef.current < 6) {
      onSelectBook(book);
    }
  };

  return (
    <section className="w-full space-y-2 py-3 select-none">
      {/* Category Header Row */}
      <div className="flex items-center justify-between px-6">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1d1d1f] font-sans">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#86868b]">
            {books.length} {books.length === 1 ? 'livro' : 'livros'}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Rolar para esquerda"
              className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/60 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Rolar para direita"
              className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/60 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Books Container with Authentic Apple Shelf Base */}
      <div className="relative w-full overflow-hidden">
        {/* Horizontal Book Row - Smooth Momentum & Pointer Tracking */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex items-end gap-5 overflow-x-auto pt-3 pb-5 px-6 hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            overscrollBehaviorX: 'contain',
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="group relative flex flex-col items-center shrink-0 cursor-pointer transition-transform duration-200 active:scale-[0.98]"
              style={{ width: '150px' }}
            >
              {/* Authentic Book Cover - Full artwork visible */}
              <div className="w-[150px] h-[225px] transition-transform duration-200 group-hover:-translate-y-2 relative z-10">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  notaEncaixe={book.notaEncaixe}
                />
              </div>

              {/* Realistic Contact Shadow on Shelf */}
              <div className="w-full h-3 bg-black/20 blur-sm rounded-full -mt-1.5 transition-all duration-200 group-hover:scale-90 group-hover:opacity-40" />
            </div>
          ))}
        </div>

        {/* Minimalist Apple Books Architectural Shelf Ledge (Underneath the books) */}
        <div className="px-5 -mt-1 pointer-events-none">
          <div
            className="w-full h-2 rounded-full border"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(225, 228, 235, 0.85) 100%)',
              borderColor: 'rgba(210, 215, 225, 0.7)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 1)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
