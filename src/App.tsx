import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SlidersHorizontal, CheckCircle2, RotateCcw } from 'lucide-react';
import { BookEvaluation, UserRatingsMap, UserRating } from './types';
import { DiscoverView } from './components/views/DiscoverView';
import { EstanteView } from './components/views/EstanteView';
import { FichaModal } from './components/modals/FichaModal';
import { CharacterModal } from './components/modals/CharacterModal';
import { EvaluateModal } from './components/modals/EvaluateModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { RateBookModal } from './components/modals/RateBookModal';
import { DuelModal } from './components/modals/DuelModal';
import { BottomNavBar } from './components/ui/BottomNavBar';
import { PearlButton } from './components/ui/PearlButton';
import { VereditoGlassIntro } from './components/ui/liquid-glass-logo-reveal';
import {
  CHARACTER_POOL,
  CharacterReading,
  getCharacterCustomCovers,
  saveCharacterCustomCover,
  getCharacterCover,
} from './data/characterReadings';
import {
  fetchEvaluations,
  saveEvaluation,
  deleteEvaluation,
  deleteEvaluationsBulk,
  toggleSaveBook,
  toggleSaveBooksBulk,
  updateBookCoverInDb,
  getLocalEvaluations,
} from './services/supabase';
import {
  fetchRatings,
  upsertRating,
  deleteRating,
  deleteRatingsBulk,
  getLocalRatings,
} from './services/ratings';
import { prefetchBookCovers } from './services/imagePrefetch';

export function App() {
  const [books, setBooks] = useState<BookEvaluation[]>(() => getLocalEvaluations());
  const [activeTab, setActiveTab] = useState<'discover' | 'shelves'>('discover');
  const [selectedBook, setSelectedBook] = useState<BookEvaluation | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterReading | null>(null);
  const [characterCustomCovers, setCharacterCustomCovers] = useState<Record<string, string>>(() =>
    getCharacterCustomCovers()
  );
  const [pendingBookToEvaluate, setPendingBookToEvaluate] =
    useState<Partial<BookEvaluation> | null>(null);
  const [ratingBook, setRatingBook] = useState<BookEvaluation | null>(null);
  const [duelBooks, setDuelBooks] = useState<BookEvaluation[]>([]);
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

    // Pré-aquece as capas da estante de personagens em background sem competir com o carregamento inicial
    prefetchBookCovers(
      CHARACTER_POOL.map((c) => getCharacterCover(c)),
      false
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookEvaluated = useCallback(async (newBook: BookEvaluation) => {
    setBooks((prev) => [newBook, ...prev.filter((b) => b.id !== newBook.id)]);
    setSelectedBook(newBook);
    await saveEvaluation(newBook);
  }, []);

  const handleBulkEvaluated = useCallback(async (newBooks: BookEvaluation[]) => {
    setBooks((prev) => [...newBooks, ...prev.filter((b) => !newBooks.some((n) => n.id === b.id))]);
    setActiveTab('discover');
    if (newBooks.length > 0) {
      setSelectedBook(newBooks[0]);
    }
    await Promise.all(newBooks.map((b) => saveEvaluation(b)));
  }, []);

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

  const [bulkToast, setBulkToast] = useState<{
    message: string;
    canUndo?: boolean;
  } | null>(null);
  const lastDeletedRef = useRef<{
    books: BookEvaluation[];
    ratings: UserRating[];
    savedIds: string[];
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showBulkToast = useCallback((message: string, canUndo = false) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setBulkToast({ message, canUndo });
    toastTimerRef.current = setTimeout(() => {
      setBulkToast(null);
      lastDeletedRef.current = null;
    }, 5000);
  }, []);

  const handleBulkToggleSave = useCallback(
    async (bookIds: string[], willBeSaved: boolean) => {
      if (bookIds.length === 0) return;
      const idSet = new Set(bookIds);

      setSavedBookIds((prev) => {
        const next = new Set(prev);
        for (const id of bookIds) {
          if (willBeSaved) {
            next.add(id);
          } else {
            next.delete(id);
          }
        }
        return next;
      });

      setBooks((prev) =>
        prev.map((b) => (idSet.has(b.id) ? { ...b, isSaved: willBeSaved } : b))
      );

      setSelectedBook((prev) =>
        prev && idSet.has(prev.id) ? { ...prev, isSaved: willBeSaved } : prev
      );

      const count = bookIds.length;
      showBulkToast(
        willBeSaved
          ? `${count} ${count === 1 ? 'livro salvo na estante' : 'livros salvos na estante'}`
          : `${count} ${count === 1 ? 'livro removido dos salvos' : 'livros removidos dos salvos'}`,
        false
      );

      await toggleSaveBooksBulk(bookIds, willBeSaved);
    },
    [showBulkToast]
  );

  const handleBulkDeleteBooks = useCallback(
    async (bookIds: string[]) => {
      if (bookIds.length === 0) return;
      const idSet = new Set(bookIds);

      const deletedBooks = books.filter((b) => idSet.has(b.id));
      const deletedRatings = bookIds
        .map((id) => userRatings[id])
        .filter((r): r is UserRating => Boolean(r));
      const deletedSavedIds = bookIds.filter((id) => savedBookIds.has(id));

      lastDeletedRef.current = {
        books: deletedBooks,
        ratings: deletedRatings,
        savedIds: deletedSavedIds,
      };

      setBooks((prev) => prev.filter((b) => !idSet.has(b.id)));
      setSavedBookIds((prev) => {
        const next = new Set(prev);
        bookIds.forEach((id) => next.delete(id));
        return next;
      });
      setUserRatings((prev) => {
        const next = { ...prev };
        bookIds.forEach((id) => delete next[id]);
        return next;
      });
      if (selectedBook && idSet.has(selectedBook.id)) {
        setSelectedBook(null);
      }
      if (ratingBook && idSet.has(ratingBook.id)) {
        setRatingBook(null);
      }

      const count = bookIds.length;
      showBulkToast(
        `${count} ${count === 1 ? 'livro excluído' : 'livros excluídos'}`,
        true
      );

      await Promise.all([
        deleteEvaluationsBulk(bookIds),
        deleteRatingsBulk(bookIds),
      ]);
    },
    [books, userRatings, savedBookIds, selectedBook, ratingBook, showBulkToast]
  );

  const handleUndoBulkDelete = useCallback(async () => {
    const backup = lastDeletedRef.current;
    if (!backup) return;
    lastDeletedRef.current = null;
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setBulkToast(null);

    const restoredIds = new Set(backup.books.map((b) => b.id));
    setBooks((prev) => [
      ...backup.books,
      ...prev.filter((b) => !restoredIds.has(b.id)),
    ]);

    if (backup.savedIds.length > 0) {
      setSavedBookIds((prev) => new Set([...prev, ...backup.savedIds]));
    }

    if (backup.ratings.length > 0) {
      setUserRatings((prev) => {
        const next = { ...prev };
        for (const r of backup.ratings) {
          next[r.bookId] = r;
        }
        return next;
      });
    }

    await Promise.all([
      ...backup.books.map((b) => saveEvaluation(b)),
      ...backup.ratings.map((r) => upsertRating(r)),
      ...(backup.savedIds.length > 0
        ? [toggleSaveBooksBulk(backup.savedIds, true)]
        : []),
    ]);
  }, []);

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
    await Promise.all([deleteEvaluation(bookId), deleteRating(bookId)]);
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

  // Callbacks estáveis: preservam o React.memo das views (evita re-render de todas as capas)
  const openEvaluate = useCallback(() => setIsEvaluateOpen(true), []);
  const closeEvaluate = useCallback(() => {
    setIsEvaluateOpen(false);
    setPendingBookToEvaluate(null);
  }, []);
  const closeFicha = useCallback(() => setSelectedBook(null), []);
  const closeCharacterModal = useCallback(() => setSelectedCharacter(null), []);
  const closeRating = useCallback(() => setRatingBook(null), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);
  const closeDuel = useCallback(() => setDuelBooks([]), []);

  const handleOpenDuelByIds = useCallback(
    (bookIds: string[]) => {
      const idSet = new Set(bookIds);
      const selected = books.filter((b) => idSet.has(b.id)).slice(0, 3);
      if (selected.length >= 2) {
        setDuelBooks(selected);
      }
    },
    [books]
  );

  const handleSelectBookFromDuel = useCallback((book: BookEvaluation) => {
    setDuelBooks([]);
    setSelectedBook(book);
  }, []);
  const openBookFromEvaluate = useCallback((book: BookEvaluation) => {
    setIsEvaluateOpen(false);
    setSelectedBook(book);
  }, []);
  const openEvaluateFromFicha = useCallback(() => {
    setSelectedBook(null);
    setIsEvaluateOpen(true);
  }, []);
  const handleSelectEvaluatedBookFromCharacter = useCallback((book: BookEvaluation) => {
    setSelectedCharacter(null);
    setSelectedBook(book);
  }, []);
  const handleEvaluateRecommendedBookFromCharacter = useCallback(
    (rawBook: Partial<BookEvaluation>) => {
      setSelectedCharacter(null);
      setPendingBookToEvaluate(rawBook);
      setIsEvaluateOpen(true);
    },
    []
  );
  const handleClearPendingBook = useCallback(() => {
    setPendingBookToEvaluate(null);
  }, []);
  const handleUpdateCharacterCover = useCallback((characterId: string, newCoverUrl: string) => {
    saveCharacterCustomCover(characterId, newCoverUrl);
    setCharacterCustomCovers((prev) => ({ ...prev, [characterId]: newCoverUrl }));
  }, []);

  // Shelves display only real books synchronized with the Supabase database
  const allShelfBooks = books;
  const isAnyModalOpen = Boolean(
    selectedBook ||
      selectedCharacter ||
      isEvaluateOpen ||
      ratingBook ||
      isProfileOpen ||
      duelBooks.length > 0
  );
  const isDiscoverActive = activeTab === 'discover' && !isAnyModalOpen;

  // Controle centralizado de scroll do body: evita race condition do AnimatePresence
  // quando um modal abre enquanto outro ainda está executando animação de saída.
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#f5f5f7] md:bg-white text-[#1d1d1f] antialiased w-full">
      {/* Liquid Glass Logo Intro on Site Entry & Page Reload */}
      <VereditoGlassIntro />

      {/* Mobile-first frame on phone, seamless edge-to-edge canvas on desktop */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-none min-h-screen flex flex-col bg-white border-x border-neutral-200/80 md:border-none shadow-[0_0_40px_rgba(0,0,0,0.04)] md:shadow-none relative pb-24 md:pb-20">

        {/* Mobile Header */}
        <header className="px-6 pt-7 pb-2 text-center select-none md:hidden">
          <img
            src="/logo-app.webp"
            alt="Veredito"
            className="h-12 sm:h-14 w-auto mx-auto object-contain"
          />
          <p className="text-[11px] font-medium tracking-wider text-[#86868b] uppercase pt-2">
            Avaliador Pessoal de Livros & HQs
          </p>
        </header>

        {/* Desktop Sticky Header Bar */}
        <header className="hidden md:flex items-center justify-between w-full px-8 lg:px-14 2xl:px-20 py-4 bg-white/90 backdrop-blur-xs sticky top-0 z-30 select-none">
          {/* Left: Brand Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setActiveTab('discover')}
          >
            <img
              src="/logo-app.webp"
              alt="Veredito"
              className="h-10 lg:h-11 w-auto object-contain group-hover:opacity-85 transition-opacity"
            />
          </div>

          {/* Right Group: Navigation Tabs placed adjacent to Actions */}
          <div className="flex items-center gap-3.5 lg:gap-4.5">
            {/* Desktop Navigation Tabs */}
            <div className="relative flex items-center bg-neutral-100/90 p-1 rounded-full border border-neutral-200/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('discover')}
                className="relative px-5 py-2 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer select-none active:scale-[0.97]"
              >
                {activeTab === 'discover' && (
                  <motion.div
                    layoutId="desktop-nav-bubble"
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-black/[0.04]"
                    transition={{ type: 'spring', damping: 26, stiffness: 380, mass: 0.8 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeTab === 'discover' ? 'text-[#1d1d1f]' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-200 ${activeTab === 'discover' ? 'text-[#000000]' : 'text-[#86868b]'
                      }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.75a1.25 1.25 0 0 0-.82.31L3.38 9.3a1.5 1.5 0 0 0-.58 1.18V20a1.75 1.75 0 0 0 1.75 1.75h4.2a.75.75 0 0 0 .75-.75v-4.5a1.5 1.5 0 0 1 3 0v4.5a.75.75 0 0 0 .75.75h4.2A1.75 1.75 0 0 0 19.2 20V10.48a1.5 1.5 0 0 0-.58-1.18l-7.8-6.24a1.25 1.25 0 0 0-.82-.31z" />
                  </svg>
                  <span>Início</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shelves')}
                className="relative px-5 py-2 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer select-none active:scale-[0.97]"
              >
                {activeTab === 'shelves' && (
                  <motion.div
                    layoutId="desktop-nav-bubble"
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-black/[0.04]"
                    transition={{ type: 'spring', damping: 26, stiffness: 380, mass: 0.8 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeTab === 'shelves' ? 'text-[#1d1d1f]' : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-200 ${activeTab === 'shelves' ? 'text-[#000000]' : 'text-[#86868b]'
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
                </span>
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
                onClick={openEvaluate}
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
              onOpenEvaluate={openEvaluate}
              userRatings={userRatings}
              savedBookIds={savedBookIds}
              onBulkToggleSave={handleBulkToggleSave}
              onBulkDeleteBooks={handleBulkDeleteBooks}
              onOpenDuel={handleOpenDuelByIds}
              isActive={isDiscoverActive}
            />
          </div>

          <div className={activeTab === 'shelves' ? 'block' : 'hidden'}>
            <EstanteView
              books={allShelfBooks}
              onSelectBook={setSelectedBook}
              onSelectCharacter={setSelectedCharacter}
              characterCustomCovers={characterCustomCovers}
              savedBookIds={savedBookIds}
              userRatings={userRatings}
              onBulkToggleSave={handleBulkToggleSave}
              onBulkDeleteBooks={handleBulkDeleteBooks}
              onOpenDuel={handleOpenDuelByIds}
            />
          </div>
        </main>

        {/* Feedback Toast para ações em lote (Salvar / Excluir com opção Desfazer) */}
        <AnimatePresence>
          {bulkToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 420 }}
              className="fixed top-4 md:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1d1d1f] text-white shadow-xl flex items-center gap-3 text-xs font-semibold border border-white/10 select-none"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{bulkToast.message}</span>
              {bulkToast.canUndo && (
                <button
                  type="button"
                  onClick={handleUndoBulkDelete}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition-colors cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Desfazer</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Apple-style Bottom Navigation Bar (Início, +, Estante) */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenEvaluate={openEvaluate}
        />

        {/* Ficha Veredito Modal */}
        <AnimatePresence>
          {selectedBook && (
            <FichaModal
              key={selectedBook.id}
              book={selectedBook}
              onClose={closeFicha}
              onSaveToWishlist={handleToggleSave}
              isSaved={savedBookIds.has(selectedBook.id)}
              onDeleteBook={handleDeleteBook}
              onUpdateCover={handleUpdateBookCover}
              userRating={selectedBook ? userRatings[selectedBook.id] : undefined}
              onOpenRateModal={() => setRatingBook(selectedBook)}
              onOpenEvaluate={openEvaluateFromFicha}
            />
          )}
        </AnimatePresence>

        {/* Duelo de Livros ("Qual eu leio primeiro?") Modal */}
        <AnimatePresence>
          {duelBooks.length > 0 && (
            <DuelModal
              key="duel-modal"
              books={duelBooks}
              allBooks={books}
              userRatings={userRatings}
              savedBookIds={savedBookIds}
              onClose={closeDuel}
              onSelectBook={handleSelectBookFromDuel}
              onToggleSave={handleToggleSave}
              onChangeDuelBooks={setDuelBooks}
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
              onClose={closeRating}
              onSaveRating={(rating, tags) => handleSaveRating(ratingBook, rating, tags)}
              onDeleteRating={() => handleDeleteRating(ratingBook.id)}
            />
          )}
        </AnimatePresence>

        {/* Ficha de Personagem Modal */}
        <AnimatePresence>
          {selectedCharacter && (
            <CharacterModal
              key={selectedCharacter.id}
              character={selectedCharacter}
              onClose={closeCharacterModal}
              existingBooks={books}
              userRatings={userRatings}
              onSelectEvaluatedBook={handleSelectEvaluatedBookFromCharacter}
              onEvaluateRecommendedBook={handleEvaluateRecommendedBookFromCharacter}
              customCoverUrl={characterCustomCovers[selectedCharacter.id]}
              onUpdateCharacterCover={handleUpdateCharacterCover}
            />
          )}
        </AnimatePresence>

        {/* Evaluator Engine Search & Bulk Modal */}
        <AnimatePresence>
          {isEvaluateOpen && (
            <EvaluateModal
              isOpen={isEvaluateOpen}
              onClose={closeEvaluate}
              onBookEvaluated={handleBookEvaluated}
              onBulkEvaluated={handleBulkEvaluated}
              existingBooks={books}
              onOpenBook={openBookFromEvaluate}
              initialBookToEvaluate={pendingBookToEvaluate}
              onClearInitialBook={handleClearPendingBook}
            />
          )}
        </AnimatePresence>

        {/* Calibrated Profile & Criteria Modal */}
        <AnimatePresence>
          {isProfileOpen && (
            <ProfileModal
              isOpen={isProfileOpen}
              onClose={closeProfile}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
