import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { BookEvaluation, UserRatingsMap, UserRating } from './types';
import { DiscoverView } from './components/DiscoverView';
import { EstanteView } from './components/EstanteView';
import { FichaModal } from './components/FichaModal';
import { EvaluateModal } from './components/EvaluateModal';
import { ProfileModal } from './components/ProfileModal';
import { RateBookModal } from './components/RateBookModal';
import { BottomNavBar } from './components/BottomNavBar';
import { PearlButton } from './components/PearlButton';
import { 
  fetchEvaluations, 
  saveEvaluation, 
  deleteEvaluation,
  toggleSaveBook,
  updateBookCoverInDb,
  getLocalEvaluations 
} from './services/supabase';
import { 
  fetchRatings, 
  upsertRating, 
  deleteRating, 
  getLocalRatings 
} from './services/ratings';
import { prefetchBookCovers } from './services/imagePrefetch';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(() => getLocalEvaluations());
  const [activeTab, setActiveTab] = useState<'discover' | 'shelves'>('discover');
  const [selectedBook, setSelectedBook] = useState<BookEvaluation | null>(null);
  const [ratingBook, setRatingBook] = useState<BookEvaluation | null>(null);
  const [isEvaluateOpen, setIsEvaluateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userRatings, setUserRatings] = useState<UserRatingsMap>(() => getLocalRatings());
  const [savedBookIds, setSavedBookIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('veredito_saved_books');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Load evaluations, saved books and user ratings from Supabase on mount
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

    fetchRatings().then((loadedRatings) => {
      if (isMounted && loadedRatings) {
        setUserRatings(loadedRatings);
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

  const handleSaveRating = async (book: BookEvaluation, rating: number, tags: string[]) => {
    const now = new Date().toISOString();
    const userRating: UserRating = {
      bookId: book.id,
      rating,
      tags,
      ratedAt: userRatings[book.id]?.ratedAt || now,
      updatedAt: now,
    };

    // Optimistic update of ratings
    setUserRatings((prev) => ({
      ...prev,
      [book.id]: userRating,
    }));

    // Q18: Sai de salvos e passa para a prateleira de lidos
    if (savedBookIds.has(book.id) || book.isSaved) {
      setSavedBookIds((prev) => {
        const next = new Set(prev);
        next.delete(book.id);
        return next;
      });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, isSaved: false } : b))
      );
      if (selectedBook?.id === book.id) {
        setSelectedBook((prev) => (prev ? { ...prev, isSaved: false } : null));
      }
      toggleSaveBook(book.id, false);
    }

    // Persist rating to Supabase & local cache
    await upsertRating(userRating);
  };

  const handleDeleteRating = async (bookId: string) => {
    setUserRatings((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
    await deleteRating(bookId);
  };

  const handleDeleteBook = async (bookId: string) => {
    // Optimistic removal
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setSavedBookIds((prev) => {
      const next = new Set(prev);
      next.delete(bookId);
      return next;
    });
    setUserRatings((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
    if (selectedBook?.id === bookId) {
      setSelectedBook(null);
    }
    if (ratingBook?.id === bookId) {
      setRatingBook(null);
    }

    // Persist deletion to Supabase
    await deleteEvaluation(bookId);
    await deleteRating(bookId);
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
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f5f7] md:bg-white text-[#1d1d1f] antialiased w-full">
      {/* Mobile-first frame on phone, seamless edge-to-edge canvas on desktop */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-none min-h-screen flex flex-col bg-white border-x border-neutral-200/80 md:border-none shadow-[0_0_40px_rgba(0,0,0,0.04)] md:shadow-none relative pb-24 md:pb-20">
        
        {/* Mobile Header (Untouched for phone) */}
        <header className="px-6 pt-7 pb-2 text-center select-none md:hidden">
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

        {/* Desktop Sticky Header Bar (Apple macOS Style) */}
        <header className="hidden md:flex items-center justify-between w-full px-8 lg:px-14 2xl:px-20 py-4.5 border-b border-neutral-100 bg-white/85 backdrop-blur-md sticky top-0 z-30 select-none">
          {/* Left: Pure Brand Logo (without subtitle) */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setActiveTab('discover')}
          >
            <h1
              className="text-4xl lg:text-5xl font-normal italic tracking-tight text-[#1d1d1f] leading-none group-hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Veredito
            </h1>
          </div>

          {/* Right Group: Navigation Tabs placed adjacent to Actions */}
          <div className="flex items-center gap-3.5 lg:gap-4.5">
            {/* Desktop Navigation Tabs */}
            <div className="flex items-center bg-neutral-100/90 p-1 rounded-full border border-neutral-200/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('discover')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'discover'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <svg
                  className={`w-4 h-4 transition-colors ${
                    activeTab === 'discover' ? 'text-[#000000]' : 'text-[#86868b]'
                  }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.75a1.25 1.25 0 0 0-.82.31L3.38 9.3a1.5 1.5 0 0 0-.58 1.18V20a1.75 1.75 0 0 0 1.75 1.75h4.2a.75.75 0 0 0 .75-.75v-4.5a1.5 1.5 0 0 1 3 0v4.5a.75.75 0 0 0 .75.75h4.2A1.75 1.75 0 0 0 19.2 20V10.48a1.5 1.5 0 0 0-.58-1.18l-7.8-6.24a1.25 1.25 0 0 0-.82-.31z" />
                </svg>
                <span>Início</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shelves')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'shelves'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <svg
                  className={`w-4 h-4 transition-colors ${
                    activeTab === 'shelves' ? 'text-[#000000]' : 'text-[#86868b]'
                  }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3.5" y="4.5" width="4" height="15.5" rx="1.5" />
                  <rect x="9" y="3.5" width="4.2" height="16.5" rx="1.5" />
                  <rect x="10.35" y="6.5" width="1.5" height="3" rx="0.5" fill="white" />
                  <path d="M15.2 5.5a1.5 1.5 0 0 1 1.9-.8l2.6 1.3a1.5 1.5 0 0 1 .7 2l-6.2 12.4a1.5 1.5 0 0 1-2 .7l-2.6-1.3a1.5 1.5 0 0 1-.7-2L15.2 5.5z" />
                </svg>
                <span>Estante</span>
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="p-2.5 rounded-full border border-neutral-200/80 bg-white hover:bg-neutral-50 text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Calibrador de Perfil"
                aria-label="Calibrador de Perfil"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <PearlButton
                size="nav-rect"
                label="Avaliar livro"
                onClick={() => setIsEvaluateOpen(true)}
              />
            </div>
          </div>
        </header>

        {/* Main Content Views — Persistent mounted DOM for zero-reload instant tab switching */}
        <main className="flex-1 w-full max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 2xl:px-20 py-2 md:py-6">
          <div className={activeTab === 'discover' ? 'block' : 'hidden'}>
            <DiscoverView
              books={books}
              onSelectBook={setSelectedBook}
              onOpenEvaluate={() => setIsEvaluateOpen(true)}
              userRatings={userRatings}
            />
          </div>

          <div className={activeTab === 'shelves' ? 'block' : 'hidden'}>
            <EstanteView
              books={allShelfBooks}
              onSelectBook={setSelectedBook}
              savedBookIds={savedBookIds}
              userRatings={userRatings}
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
              userRating={selectedBook ? userRatings[selectedBook.id] : undefined}
              onOpenRateModal={() => setRatingBook(selectedBook)}
            />
          )}
        </AnimatePresence>

        {/* Rate Book ("Já li") Modal with Adaptive Slider & Exclusive Band Pills */}
        <AnimatePresence>
          {ratingBook && (
            <RateBookModal
              key={`rate-${ratingBook.id}`}
              isOpen={Boolean(ratingBook)}
              book={ratingBook}
              existingRating={ratingBook ? userRatings[ratingBook.id] : null}
              onClose={() => setRatingBook(null)}
              onSaveRating={(rating, tags) => handleSaveRating(ratingBook, rating, tags)}
              onDeleteRating={() => handleDeleteRating(ratingBook.id)}
            />
          )}
        </AnimatePresence>

        {/* Evaluator Engine Search & Bulk Modal */}
        <AnimatePresence>
          {isEvaluateOpen && (
            <EvaluateModal
              isOpen={isEvaluateOpen}
              onClose={() => setIsEvaluateOpen(false)}
              onBookEvaluated={handleBookEvaluated}
              onBulkEvaluated={handleBulkEvaluated}
              existingBooks={books}
              onOpenBook={(book) => {
                setIsEvaluateOpen(false);
                setSelectedBook(book);
              }}
            />
          )}
        </AnimatePresence>

        {/* Calibrated Profile & Criteria Modal */}
        <AnimatePresence>
          {isProfileOpen && (
            <ProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
