import React, { useState } from 'react';
import { FolderComponent } from './FolderComponent';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';

interface FolderOrganizerProps {
  books: BookEvaluation[];
  onSelectBook: (book: BookEvaluation) => void;
}

export const FolderOrganizer: React.FC<FolderOrganizerProps> = ({
  books,
  onSelectBook,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('wishlist');

  const wishlistBooks = books.filter((b) => b.userStatus === 'wishlist');
  const lovedBooks = books.filter((b) => b.userStatus === 'loved');
  const dislikedBooks = books.filter((b) => b.userStatus === 'disliked');
  const analyzedBooks = books.filter((b) => b.userStatus === 'analyzed');

  const getActiveFolderBooks = () => {
    switch (selectedFolder) {
      case 'wishlist':
        return wishlistBooks;
      case 'loved':
        return lovedBooks;
      case 'disliked':
        return dislikedBooks;
      case 'analyzed':
        return analyzedBooks.length > 0 ? analyzedBooks : wishlistBooks;
      default:
        return wishlistBooks;
    }
  };

  const activeBooks = getActiveFolderBooks();

  return (
    <div className="w-full space-y-4 px-6 pt-1">
      {/* Grid of Interactive 3D Apple Glass Folders with Real Covers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
        {/* Wishlist Folder */}
        <div
          onClick={() => setSelectedFolder('wishlist')}
          className={`flex flex-col items-center p-1.5 rounded-2xl cursor-pointer transition-all duration-150 active:scale-95 ${
            selectedFolder === 'wishlist'
              ? 'bg-neutral-100 border border-neutral-300 shadow-xs'
              : 'hover:bg-neutral-50 border border-transparent'
          }`}
        >
          <FolderComponent
            color="black"
            size="sm"
            label="Wishlist"
            badge={wishlistBooks.length}
            cards={wishlistBooks.slice(0, 3).map((b) => ({ title: b.title, coverUrl: b.coverUrl }))}
          />
        </div>

        {/* Loved Books Folder */}
        <div
          onClick={() => setSelectedFolder('loved')}
          className={`flex flex-col items-center p-1.5 rounded-2xl cursor-pointer transition-all duration-150 active:scale-95 ${
            selectedFolder === 'loved'
              ? 'bg-neutral-100 border border-neutral-300 shadow-xs'
              : 'hover:bg-neutral-50 border border-transparent'
          }`}
        >
          <FolderComponent
            color="blue"
            size="sm"
            label="Nota 10"
            badge={lovedBooks.length}
            cards={lovedBooks.slice(0, 3).map((b) => ({ title: b.title, coverUrl: b.coverUrl }))}
          />
        </div>

        {/* Evaluated / Analyzed Folder */}
        <div
          onClick={() => setSelectedFolder('analyzed')}
          className={`flex flex-col items-center p-1.5 rounded-2xl cursor-pointer transition-all duration-150 active:scale-95 ${
            selectedFolder === 'analyzed'
              ? 'bg-neutral-100 border border-neutral-300 shadow-xs'
              : 'hover:bg-neutral-50 border border-transparent'
          }`}
        >
          <FolderComponent
            color="white"
            size="sm"
            label="Avaliados"
            badge={analyzedBooks.length}
            cards={
              (analyzedBooks.length > 0 ? analyzedBooks : books)
                .slice(0, 3)
                .map((b) => ({ title: b.title, coverUrl: b.coverUrl }))
            }
          />
        </div>

        {/* Disliked / Avoid Folder */}
        <div
          onClick={() => setSelectedFolder('disliked')}
          className={`flex flex-col items-center p-1.5 rounded-2xl cursor-pointer transition-all duration-150 active:scale-95 ${
            selectedFolder === 'disliked'
              ? 'bg-neutral-100 border border-neutral-300 shadow-xs'
              : 'hover:bg-neutral-50 border border-transparent'
          }`}
        >
          <FolderComponent
            color="black"
            size="sm"
            label="Rejeição"
            badge={dislikedBooks.length}
            cards={dislikedBooks.slice(0, 3).map((b) => ({ title: b.title, coverUrl: b.coverUrl }))}
          />
        </div>
      </div>

      {/* Selected Folder Book List */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-1.5 px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
            {selectedFolder === 'wishlist' && 'Wishlist'}
            {selectedFolder === 'loved' && 'Obras Nota 10'}
            {selectedFolder === 'disliked' && 'Zona de Rejeição'}
            {selectedFolder === 'analyzed' && 'Avaliados Recentes'}
          </span>
          <span className="text-xs font-score text-[#86868b]">
            {activeBooks.length} títulos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {activeBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="p-3 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-all duration-150 cursor-pointer flex items-center gap-3.5 group active:scale-[0.99] shadow-xs"
            >
              <div className="w-14 shrink-0">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-[#1d1d1f] truncate group-hover:text-black transition-colors">
                    {book.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-score font-extrabold shrink-0 ${
                      book.notaEncaixe >= 8
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : book.notaEncaixe >= 6
                        ? 'bg-sky-50 text-sky-800 border border-sky-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {book.notaEncaixe}/10
                  </span>
                </div>

                <p className="text-xs text-[#86868b] truncate">
                  {book.author}
                </p>

                <p className="text-[11px] text-[#86868b] line-clamp-1 italic">
                  "{book.veredito}"
                </p>

                <div className="flex items-center gap-2 pt-0.5 text-[10px] text-[#86868b] font-score">
                  <span>~{book.pages} págs</span>
                  <span>•</span>
                  <span>Técnica: {book.notaTecnica}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
