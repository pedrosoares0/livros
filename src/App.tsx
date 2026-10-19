import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { BookEvaluation } from './types';
import { DiscoverView } from './components/DiscoverView';
import { EstanteView } from './components/EstanteView';
import { FichaModal } from './components/FichaModal';
import { EvaluateModal } from './components/EvaluateModal';
import { ProfileModal } from './components/ProfileModal';
import { BottomNavBar } from './components/BottomNavBar';
import { 
  fetchEvaluations, 
  saveEvaluation, 
  deleteEvaluation,
  toggleSaveBook,
  updateBookCoverInDb,
  getLocalEvaluations 
} from './services/supabase';
import { prefetchBookCovers } from './services/imagePrefetch';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(() => getLocalEvaluations());
  const [activeTab, setActiveTab] = useState<'discover' | 'shelves'>('discover');
  const [selectedBook, setSelectedBook] = useState<BookEvaluation | null>(null);
  const [isEvaluateOpen, setIsEvaluateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [savedBookIds, setSavedBookIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('veredito_saved_books');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Load evaluations and saved books from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    fetchEvaluations().then((loaded) => {
      if (isMounted && loaded) {
        setBooks(loaded);
        prefetchBookCovers(loaded.map((b) => b.coverUrl));
        const serverSavedIds = new Set(loaded.filter((b) => b.isSaved).map((b) => b.id));
        setSavedBookIds((prev) => {
          const merged = new Set([...prev, ...serverSavedIds]);
          return merged;
        });
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
    setBooks((prev) => [...newBooks, ...prev.filter((b) => !newBooks.some((n) => n.id === b.id))]);
    setActiveTab('discover');
    if (newBooks.length > 0) {
      setSelectedBook(newBooks[0]);
    }
    for (const b of newBooks) {
      await saveEvaluation(b);
    }
  };

  const handleToggleSave = async (book: BookEvaluation) => {
    const willBeSaved = !savedBookIds.has(book.id);

    // Optimistic state update
    setSavedBookIds((prev) => {
      const next = new Set(prev);
      if (willBeSaved) {
        next.add(book.id);
      } else {
        next.delete(book.id);
      }
      return next;
    });

    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, isSaved: willBeSaved } : b))
    );

    setSelectedBook((prev) => (prev && prev.id === book.id ? { ...prev, isSaved: willBeSaved } : prev));

    // Persist directly to Supabase
    await toggleSaveBook(book.id, willBeSaved);
  };

  const handleDeleteBook = async (bookId: string) => {
    // Optimistic removal
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setSavedBookIds((prev) => {
      const next = new Set(prev);
      next.delete(bookId);
      return next;
    });
    if (selectedBook?.id === bookId) {
      setSelectedBook(null);
    }

    // Persist deletion to Supabase
    await deleteEvaluation(bookId);
  };

  const handleUpdateBookCover = async (bookId: string, newCoverUrl: string) => {
    // Optimistic update
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, coverUrl: newCoverUrl } : b))
    );
    setSelectedBook((prev) => (prev && prev.id === bookId ? { ...prev, coverUrl: newCoverUrl } : prev));

    // Persist cover change to Supabase
    await updateBookCoverInDb(bookId, newCoverUrl);
  };

  // Shelves display only real books synchronized with the Supabase database
  const allShelfBooks = books;

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

        {/* Main Content Views — Persistent mounted DOM for zero-reload instant tab switching */}
        <main className="flex-1 py-1">
          <div className={activeTab === 'discover' ? 'block' : 'hidden'}>
            <DiscoverView
              books={books}
              onSelectBook={setSelectedBook}
              onOpenEvaluate={() => setIsEvaluateOpen(true)}
            />
          </div>

          <div className={activeTab === 'shelves' ? 'block' : 'hidden'}>
            <EstanteView
              books={allShelfBooks}
              onSelectBook={setSelectedBook}
              savedBookIds={savedBookIds}
            />
          </div>
        </main>

        {/* Apple-style Bottom Navigation Bar (Início, +, Estante) */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenEvaluate={() => setIsEvaluateOpen(true)}
        />

        {/* Ficha Veredito Modal */}
        <AnimatePresence>
          {selectedBook && (
            <FichaModal
              key={selectedBook.id}
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
              onSaveToWishlist={handleToggleSave}
              isSaved={savedBookIds.has(selectedBook.id)}
              onDeleteBook={handleDeleteBook}
              onUpdateCover={handleUpdateBookCover}
            />
          )}
        </AnimatePresence>

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
