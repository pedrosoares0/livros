import { useState, useEffect } from 'react';
import { BookEvaluation } from './types';
import { DiscoverView } from './components/DiscoverView';
import { HistoryView } from './components/HistoryView';
import { RankingView } from './components/RankingView';
import { FichaModal } from './components/FichaModal';
import { EvaluateModal } from './components/EvaluateModal';
import { ProfileModal } from './components/ProfileModal';
import { BottomNavBar } from './components/BottomNavBar';
import { evaluateBook } from './services/evaluator';
import { 
  fetchEvaluations, 
  saveEvaluation, 
  deleteEvaluation,
  getLocalEvaluations 
} from './services/supabase';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(() => getLocalEvaluations());
  const [activeTab, setActiveTab] = useState<'discover' | 'history' | 'ranking'>('discover');
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
    setActiveTab('history');
    if (newBooks.length > 0) {
      setSelectedBook(newBooks[0]);
    }
    for (const b of newBooks) {
      await saveEvaluation(b);
    }
  };

  const handleDeleteBook = async (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
    await deleteEvaluation(id);
  };

  const handleEvaluateDirect = async (title: string, rawBook?: Partial<BookEvaluation>) => {
    const evaluation = evaluateBook({
      title,
      author: rawBook?.author,
      pages: rawBook?.pages,
      description: rawBook?.resumo,
      genres: rawBook?.genres,
      coverUrl: rawBook?.coverUrl,
    });
    await handleBookEvaluated(evaluation);
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
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl min-h-screen flex flex-col bg-[#ffffff] border-x border-neutral-200/80 shadow-[0_0_40px_rgba(0,0,0,0.04)] relative pb-24">
        
        {/* Minimalist Apple Header */}
        <header className="px-6 pt-6 pb-2 text-center">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-widest font-serif uppercase text-[#1d1d1f]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            PROTOCOLO
          </h1>
          <p className="text-[11px] font-medium tracking-wide text-[#86868b] uppercase pt-0.5">
            Avaliador Pessoal de Livros & HQs
          </p>
        </header>

        {/* Main Content Views */}
        <main className="flex-1 py-1">
          {activeTab === 'discover' && (
            <DiscoverView
              books={books}
              onSelectBook={setSelectedBook}
              onEvaluateDirect={handleEvaluateDirect}
              onOpenBulk={() => setIsEvaluateOpen(true)}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              books={books}
              onSelectBook={setSelectedBook}
              onDeleteBook={handleDeleteBook}
              onOpenEvaluate={() => setIsEvaluateOpen(true)}
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
