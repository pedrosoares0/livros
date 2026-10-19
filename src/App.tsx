import { useState, useEffect } from 'react';
import { BookEvaluation } from './types';
import { INITIAL_BOOKS } from './data/initialBooks';
import { DiscoverView } from './components/DiscoverView';
import { BookShelf } from './components/BookShelf';
import { EstanteView } from './components/EstanteView';
import { FichaModal } from './components/FichaModal';
import { EvaluateModal } from './components/EvaluateModal';
import { ProfileModal } from './components/ProfileModal';
import { BottomNavBar } from './components/BottomNavBar';
import { 
  fetchEvaluations, 
  saveEvaluation, 
  getLocalEvaluations 
} from './services/supabase';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(() => getLocalEvaluations());
  const [activeTab, setActiveTab] = useState<'discover' | 'shelves'>('discover');
  const [selectedBook, setSelectedBook] = useState<BookEvaluation | null>(null);
  const [isEvaluateOpen, setIsEvaluateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // Load evaluations from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    fetchEvaluations().then((loaded) => {
      if (isMounted && loaded) {
        setBooks(loaded);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookEvaluated = async (newBook: BookEvaluation) => {
    setBooks((prev) => [newBook, ...prev.filter((b) => b.id !== newBook.id)]);
    setSelectedBook(newBook);
    await saveEvaluation(newBook);
  };

  const handleBulkEvaluated = async (newBooks: BookEvaluation[]) => {
    setBooks((prev) => [...newBooks, ...prev]);
    setActiveTab('discover');
    if (newBooks.length > 0) {
      setSelectedBook(newBooks[0]);
    }
    for (const b of newBooks) {
      await saveEvaluation(b);
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

  // Merge evaluated books with initial favorite catalog for the Estante view
  const allShelfBooks = [
    ...books,
    ...INITIAL_BOOKS.filter(
      (init) => !books.some((b) => b.id === init.id || b.title.toLowerCase() === init.title.toLowerCase())
    ),
  ];

  const recentEvaluated = books;
  const sciFiBooks = allShelfBooks.filter(
    (b) => b.categoryShelf === 'Ficção Científica' || b.genres.some((g) => g.toLowerCase().includes('ficção'))
  );
  const classicsDrama = allShelfBooks.filter(
    (b) => b.categoryShelf === 'Clássicos & Drama Humano' || b.genres.some((g) => g.toLowerCase().includes('clássico'))
  );
  const darkFantasyDystopia = allShelfBooks.filter(
    (b) => b.categoryShelf === 'Fantasia Sombria & Distopia' || b.genres.some((g) => g.toLowerCase().includes('distopia'))
  );
  const graphicNovels = allShelfBooks.filter(
    (b) => b.categoryShelf === 'Graphic Novels & Contos' || b.genres.some((g) => g.toLowerCase().includes('graphic'))
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Mobile-First Frame (Clean Apple Container) */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl min-h-screen flex flex-col bg-[#ffffff] border-x border-neutral-200/80 shadow-[0_0_40px_rgba(0,0,0,0.04)] relative pb-24">
        
        {/* Minimalist Apple Header with Instrument Serif font in italic and larger */}
        <header className="px-6 pt-7 pb-2 text-center select-none">
          <h1
            className="text-5xl sm:text-6xl font-normal italic tracking-tight text-[#1d1d1f] leading-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Veredito
          </h1>
          <p className="text-[11px] font-medium tracking-wider text-[#86868b] uppercase pt-1.5">
            Avaliador Pessoal de Livros & HQs
          </p>
        </header>

        {/* Main Content Views */}
        <main className="flex-1 py-1">
          {activeTab === 'discover' && (
            <DiscoverView
              books={books}
              onSelectBook={setSelectedBook}
              onOpenEvaluate={() => setIsEvaluateOpen(true)}
            />
          )}

          {activeTab === 'shelves' && (
            <EstanteView
              books={allShelfBooks}
              onSelectBook={setSelectedBook}
            />
          )}
        </main>

        {/* Apple-style Bottom Navigation Bar (Início, +, Estante) */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenEvaluate={() => setIsEvaluateOpen(true)}
        />

        {/* Ficha Veredito Modal */}
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
