import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';

interface BookShelfProps {
  title: string;
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
  onTitleClick?: () => void;
}

export const BookShelf: React.FC<BookShelfProps> = ({
  title,
  books,
  onSelectBook,
  onTitleClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse-wheel scrolling translated to horizontal motion without blocking clicks
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollBy({
        left: e.deltaY * 1.2,
        behavior: 'smooth',
      });
    }
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="w-full space-y-2 py-3 select-none">
      {/* Category Header Row */}
      <div className="flex items-center justify-between px-6">
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

        <span className="text-xs font-medium text-[#86868b]">
          {books.length} {books.length === 1 ? 'livro' : 'livros'}
        </span>
      </div>

      {/* Books Container with Frosted Gray Shelf Bar Physically Overlapping the Books */}
      <div className="relative w-full overflow-hidden">
        {/* Horizontal Book Row - Enlarged, Smooth Scrolling */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex items-end gap-5 overflow-x-auto pt-3 pb-8 px-6 hide-scrollbar scroll-smooth"
        >
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="group relative flex flex-col items-center shrink-0 cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              style={{ width: '154px' }}
            >
              {/* Authentic Book Cover - Enlarged (154px x 231px) */}
              <div className="w-[154px] h-[231px] transition-transform duration-200 group-hover:-translate-y-1.5">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  notaEncaixe={book.notaEncaixe}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Standardized Soft Frosted Gray Acrylic Lip (COVERING THE LOWER PART OF THE BOOKS) */}
        <div
          className="absolute left-4 right-4 pointer-events-none z-20"
          style={{ bottom: '18px' }}
        >
          <div
            className="w-full h-14 rounded-2xl flex items-center justify-between px-3.5 border shadow-sm"
            style={{
              background: 'rgba(235, 238, 245, 0.48)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: 'rgba(255, 255, 255, 0.90)',
              boxShadow:
                '0 6px 20px -3px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 1px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Left Silver Screw Rivet */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-300 via-neutral-100 to-neutral-400 shadow-[0_1px_3px_rgba(0,0,0,0.15)] border border-white/90 flex items-center justify-center">
              <div className="w-2.5 h-[1.5px] bg-neutral-600/80 rotate-45 rounded-full" />
            </div>

            {/* Glossy specular highlight in acrylic bar */}
            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {/* Right Silver Screw Rivet */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-300 via-neutral-100 to-neutral-400 shadow-[0_1px_3px_rgba(0,0,0,0.15)] border border-white/90 flex items-center justify-center">
              <div className="w-2.5 h-[1.5px] bg-neutral-600/80 -rotate-45 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
