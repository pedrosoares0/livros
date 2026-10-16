import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { INITIAL_BOOKS } from './data/initialBooks';
import { BookEvaluation } from './types';
import { BookShelf } from './components/BookShelf';
import { FolderOrganizer } from './components/FolderOrganizer';
import { RankingView } from './components/RankingView';
import { FichaModal } from './components/FichaModal';
import { EvaluateModal } from './components/EvaluateModal';
import { ProfileModal } from './components/ProfileModal';
import { BottomNavBar } from './components/BottomNavBar';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(INITIAL_BOOKS);
  const [activeTab, setActiveTab] = useState<'shelves' | 'folders' | 'ranking'>('shelves');
  const [selectedBook, setSelectedBook] = useState<BookEvaluation | null>(null);
  const [isEvaluateOpen, setIsEvaluateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(INITIAL_BOOKS.filter((b) => b.userStatus === 'wishlist').map((b) => b.id))
  );

  // Group books by shelf categories
  const sciFiBooks = books.filter(
    (b) => b.categoryShelf === 'Ficção Científica' || b.genres.some((g) => g.includes('Ficção'))
  );
  const classicsDrama = books.filter(
    (b) => b.categoryShelf === 'Clássicos & Drama Humano' || b.genres.some((g) => g.includes('Clássico'))
  );
  const darkFantasyDystopia = books.filter(
    (b) => b.categoryShelf === 'Fantasia Sombria & Distopia' || b.genres.some((g) => g.includes('Distopia'))
  );
  const graphicNovels = books.filter(
    (b) => b.categoryShelf === 'Graphic Novels & Contos' || b.genres.some((g) => g.includes('Graphic Novel'))
  );
  const recentAnalyzed = books.filter((b) => b.userStatus === 'analyzed');

  const handleBookEvaluated = (newBook: BookEvaluation) => {
    setBooks((prev) => [newBook, ...prev]);
    setSelectedBook(newBook);
  };

  const handleBulkEvaluated = (newBooks: BookEvaluation[]) => {
    setBooks((prev) => [...newBooks, ...prev]);
    setActiveTab('ranking');
    if (newBooks.length > 0) {
      setSelectedBook(newBooks[0]);
    }
  };

  const handleToggleWishlist = (book: BookEvaluation) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(book.id)) {
        next.delete(book.id);
      } else {
        next.add(book.id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Mobile-First Frame (Clean Apple Container) */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl min-h-screen flex flex-col bg-[#ffffff] border-x border-neutral-200/80 shadow-[0_0_40px_rgba(0,0,0,0.04)] relative pb-28">
        
        {/* Minimalist Apple Header */}
        <header className="px-6 pt-6 pb-2 text-center">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-widest font-serif uppercase text-[#1d1d1f]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            LIVROS
          </h1>
        </header>

        {/* Clean Apple Quick Search Bar */}
        <div className="px-6 pb-2">
          <button
            onClick={() => setIsEvaluateOpen(true)}
            aria-label="Abrir busca e avaliador de livros"
            className="w-full py-2.5 px-4 rounded-2xl flex items-center justify-between text-left transition-all duration-150 active:scale-[0.99] group bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200/80 cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2.5 text-[#86868b] group-hover:text-[#1d1d1f]">
              <Search className="w-4 h-4 text-[#86868b]" />
              <span className="text-xs font-medium">Digite o título, autor ou ISBN...</span>
            </div>
            <div className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-white text-[#1d1d1f] border border-neutral-200 shadow-xs">
              Avaliar
            </div>
          </button>
        </div>

        {/* Main Content Views */}
        <main className="flex-1 py-1">
          {activeTab === 'shelves' && (
            <div className="space-y-4">
              {recentAnalyzed.length > 0 && (
                <BookShelf
                  title="Avaliados Recentemente"
                  books={recentAnalyzed}
                  onSelectBook={setSelectedBook}
                />
              )}

              {/* Shelf 1: Ficção Científica & Existencial */}
              <BookShelf
                title="Ficção Científica & Existencial"
                books={sciFiBooks}
                onSelectBook={setSelectedBook}
              />

              {/* Shelf 2: Clássicos & Drama Humano Pesado */}
              <BookShelf
                title="Clássicos & Drama Humano Pesado"
                books={classicsDrama}
                onSelectBook={setSelectedBook}
              />

              {/* Shelf 3: Fantasia Sombria & Distopias */}
              <BookShelf
                title="Fantasia Sombria & Distopias"
                books={darkFantasyDystopia}
                onSelectBook={setSelectedBook}
              />

              {/* Shelf 4: Graphic Novels & Fábulas */}
              {graphicNovels.length > 0 && (
                <BookShelf
                  title="Graphic Novels & Fábulas"
                  books={graphicNovels}
                  onSelectBook={setSelectedBook}
                />
              )}
            </div>
          )}

          {activeTab === 'folders' && (
            <FolderOrganizer
              books={books}
              onSelectBook={setSelectedBook}
            />
          )}

          {activeTab === 'ranking' && (
            <RankingView
              books={books}
              onSelectBook={setSelectedBook}
            />
          )}
        </main>

        {/* Apple-style Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenEvaluate={() => setIsEvaluateOpen(true)}
        />

        {/* Ficha Protocolo Modal */}
        <FichaModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSaveToWishlist={handleToggleWishlist}
          isSaved={selectedBook ? wishlistIds.has(selectedBook.id) : false}
        />

        {/* Evaluator Engine Search & Bulk Modal */}
        <EvaluateModal
          isOpen={isEvaluateOpen}
          onClose={() => setIsEvaluateOpen(false)}
          onBookEvaluated={handleBookEvaluated}
          onBulkEvaluated={handleBulkEvaluated}
        />

        {/* Calibrated Profile & Criteria Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
