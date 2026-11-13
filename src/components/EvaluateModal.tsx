import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ListPlus, X, BookOpen, AlertTriangle, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { searchBookApi, evaluateBulkList, isAmazonUrl } from '../services/evaluator';
import { evaluateWithGemini, evaluateBulkWithGemini } from '../services/geminiEvaluator';
import { prefetchBookCovers } from '../services/imagePrefetch';
import { fetchMoviePoster } from '../services/moviePosters';
import { BookEvaluation } from '../types';
import { BookCover } from './BookCover';
import { AceternityButton } from './AceternityButton';

interface EvaluateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookEvaluated: (book: BookEvaluation) => void;
  onBulkEvaluated: (books: BookEvaluation[]) => void;
  existingBooks?: BookEvaluation[];
  onOpenBook?: (book: BookEvaluation) => void;
}

const EVALUATION_STAGES = [
  {
    label: 'Premissa & Estrutura',
    detail: 'Localizando edição e estruturando premissa central',
  },
  {
    label: 'Prosa & Pacing',
    detail: 'Analisando cadência narrativa e construção de escrita',
  },
  {
    label: 'Worldbuilding & Atmosfera',
    detail: 'Examinando densidade dramática, clima e dilemas morais',
  },
  {
    label: 'Perfil do Leitor',
    detail: 'Cruzando temas e ritmo com o seu histórico de leitura',
  },
  {
    label: 'Veredito & Encaixe',
    detail: 'Calibrando nota técnica, encaixe e justificativa crítica',
  },
];

// Cadência calibrada para raciocínio completo (~6,5s a ~8,5s)
const STEP_INTERVAL_MS = 1450;
const FINISH_HOLD_MS = 260;

// Rotação automática de 4 sugestões inéditas a cada 6 horas (livros) e a cada 1 hora (personagens)
const SUGGESTIONS_ROTATION_MS = 6 * 60 * 60 * 1000;
const CHARACTERS_ROTATION_MS = 1 * 60 * 60 * 1000;
const SUGGESTIONS_STORAGE_KEY = 'veredito_modal_suggestions_v1';
const CHARACTERS_STORAGE_KEY = 'veredito_modal_characters_v2';

import { POPULAR_SUGGESTIONS_POOL } from '../data/suggestionBooks';
import {
  CHARACTER_POOL,
  getCharacterBooks,
  buildEvaluatedTitleSet,
  type CharacterReading,
} from '../data/characterReadings';

function getOrRotateCharacters(): CharacterReading[] {
  const poolById = new Map(CHARACTER_POOL.map((c) => [c.id, c]));
  const now = Date.now();
  let prevIds: string[] = [];

  try {
    const raw = localStorage.getItem(CHARACTERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { ids?: string[]; timestamp?: number };
      if (Array.isArray(parsed.ids) && typeof parsed.timestamp === 'number') {
        prevIds = parsed.ids;
        const isExpired = now - parsed.timestamp >= CHARACTERS_ROTATION_MS;
        if (!isExpired) {
          const validSaved = parsed.ids
            .map((id) => poolById.get(id))
            .filter((c): c is CharacterReading => Boolean(c));
          if (validSaved.length === 4) {
            return validSaved;
          }
        }
      }
    }
  } catch {
    // ignore storage errors
  }

  const prevSet = new Set(prevIds);
  const candidates = CHARACTER_POOL.filter((c) => !prevSet.has(c.id));
  const source = candidates.length >= 4 ? candidates : [...CHARACTER_POOL];
  const shuffled = [...source];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selected = shuffled.slice(0, 4);

  try {
    localStorage.setItem(
      CHARACTERS_STORAGE_KEY,
      JSON.stringify({
        ids: selected.map((c) => c.id),
        timestamp: now,
      })
    );
  } catch {
    // ignore storage errors
  }

  return selected;
}

function normalizeForMatch(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim();
}

function pickRandomFour(
  pool: Partial<BookEvaluation>[],
  excludeIds: Set<string>
): Partial<BookEvaluation>[] {
  const freshCandidates = pool.filter((b) => b.id && !excludeIds.has(b.id));
  const source = freshCandidates.length >= 4 ? freshCandidates : [...pool];
  const shuffled = [...source];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 4);
}

function getOrRotateSuggestions(existingBooks: BookEvaluation[]): Partial<BookEvaluation>[] {
  const evaluatedTitles = new Set(
    existingBooks.map((b) => normalizeForMatch(b.title)).filter(Boolean)
  );
  const availablePool = POPULAR_SUGGESTIONS_POOL.filter(
    (b) => !evaluatedTitles.has(normalizeForMatch(b.title || ''))
  );
  const poolToUse = availablePool.length >= 4 ? availablePool : POPULAR_SUGGESTIONS_POOL;
  const poolById = new Map(poolToUse.map((b) => [b.id!, b]));

  const now = Date.now();
  let prevIds: string[] = [];

  try {
    const raw = localStorage.getItem(SUGGESTIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { ids?: string[]; timestamp?: number };
      if (Array.isArray(parsed.ids) && typeof parsed.timestamp === 'number') {
        prevIds = parsed.ids;
        const isExpired = now - parsed.timestamp >= SUGGESTIONS_ROTATION_MS;
        if (!isExpired) {
          const validSaved = parsed.ids
            .map((id) => poolById.get(id))
            .filter((b): b is Partial<BookEvaluation> => Boolean(b));
          if (validSaved.length === 4) {
            return validSaved;
          }
          // Se algum dos 4 livros foi avaliado nesse meio-tempo, repõe apenas os faltantes
          if (validSaved.length > 0) {
            const currentIds = new Set(validSaved.map((b) => b.id!));
            const replacements = pickRandomFour(poolToUse, currentIds).slice(
              0,
              4 - validSaved.length
            );
            const combined = [...validSaved, ...replacements];
            localStorage.setItem(
              SUGGESTIONS_STORAGE_KEY,
              JSON.stringify({
                ids: combined.map((b) => b.id),
                timestamp: parsed.timestamp,
              })
            );
            return combined;
          }
        }
      }
    }
  } catch {
    // fallback silencioso caso localStorage esteja indisponível
  }

  // Sorteia 4 novos livros inéditos (excluindo os 4 da janela anterior de 6h)
  const selected = pickRandomFour(poolToUse, new Set(prevIds));
  try {
    localStorage.setItem(
      SUGGESTIONS_STORAGE_KEY,
      JSON.stringify({
        ids: selected.map((b) => b.id),
        timestamp: now,
      })
    );
  } catch {
    // ignore storage errors
  }

  return selected;
}

export const EvaluateModal: React.FC<EvaluateModalProps> = ({
  isOpen,
  onClose,
  onBookEvaluated,
  onBulkEvaluated,
  existingBooks = [],
  onOpenBook,
}) => {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [query, setQuery] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [evaluatingBook, setEvaluatingBook] = useState<{
    title: string;
    author?: string;
    coverUrl?: string;
  } | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<BookEvaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [apiSuggestions, setApiSuggestions] = useState<Partial<BookEvaluation>[]>([]);
  const [popularSuggestions, setPopularSuggestions] = useState<Partial<BookEvaluation>[]>(() =>
    getOrRotateSuggestions(existingBooks)
  );
  const [characterSuggestions, setCharacterSuggestions] = useState<CharacterReading[]>(() =>
    getOrRotateCharacters()
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchAbortRef = useRef<AbortController | null>(null);
  const searchSeqRef = useRef(0);

  useEffect(() => {
    const current = getOrRotateSuggestions(existingBooks);
    const currentChars = getOrRotateCharacters();
    const evalSet = buildEvaluatedTitleSet(existingBooks);
    setPopularSuggestions(current);
    setCharacterSuggestions(currentChars);

    const charCoverUrls = currentChars.flatMap((c) =>
      getCharacterBooks(c, evalSet, 4).map((b) => b.coverUrl)
    );
    prefetchBookCovers(
      [...current.map((s) => s.coverUrl), ...charCoverUrls],
      true
    );

    const rotationCheck = setInterval(() => {
      const updated = getOrRotateSuggestions(existingBooks);
      const updatedChars = getOrRotateCharacters();
      const updatedEvalSet = buildEvaluatedTitleSet(existingBooks);
      setPopularSuggestions(updated);
      setCharacterSuggestions(updatedChars);
      const nextCharCovers = updatedChars.flatMap((c) =>
        getCharacterBooks(c, updatedEvalSet, 4).map((b) => b.coverUrl)
      );
      prefetchBookCovers(
        [...updated.map((s) => s.coverUrl), ...nextCharCovers],
        true
      );
    }, 60_000);

    return () => {
      clearInterval(rotationCheck);
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      searchAbortRef.current?.abort();
    };
  }, [existingBooks]);

  // Keyboard Escape listener for seamless dismissal on PC
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, isLoading]);

  // Lock body scroll while modal is active for native app feel
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isOpen) return null;

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim();

  const findAlreadyEvaluated = (targetTitle: string): BookEvaluation | null => {
    if (!existingBooks || existingBooks.length === 0) return null;
    const normTarget = normalizeText(targetTitle);
    if (!normTarget || normTarget.length < 3) return null;

    return (
      existingBooks.find((b) => {
        const normTitle = normalizeText(b.title);
        if (normTitle === normTarget) return true;
        if (b.originalTitle && normalizeText(b.originalTitle) === normTarget) return true;
        if (normTarget.length >= 4 && normTitle.length >= 4) {
          if (normTitle.includes(normTarget) || normTarget.includes(normTitle)) return true;
        }
        return false;
      }) || null
    );
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (duplicateWarning) setDuplicateWarning(null);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    searchAbortRef.current?.abort();

    const trimmed = val.trim();
    if (trimmed.length < 3) {
      setApiSuggestions([]);
      setIsSearching(false);
      return;
    }

    const isAmazon = isAmazonUrl(trimmed);
    const seq = ++searchSeqRef.current;
    setIsSearching(true);

    searchTimerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      searchAbortRef.current = controller;
      try {
        const results = await searchBookApi(trimmed, controller.signal);
        if (seq !== searchSeqRef.current) return;
        setApiSuggestions(results);
        prefetchBookCovers(results.map((r) => r.coverUrl), true);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error('Search error:', e);
        }
      } finally {
        if (seq === searchSeqRef.current) {
          setIsSearching(false);
        }
      }
    }, isAmazon ? 40 : 240);
  };

  const handleClearQuery = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    searchAbortRef.current?.abort();
    searchSeqRef.current++;
    setQuery('');
    setApiSuggestions([]);
    setIsSearching(false);
    setDuplicateWarning(null);
  };

  const runEvaluationWithProgress = async (
    title: string,
    extraContext?: {
      sourceId?: string;
      author?: string;
      publisher?: string;
      description?: string;
      coverUrl?: string;
      pages?: number;
      year?: number;
      genres?: string[];
    }
  ) => {
    setEvalError(null);
    setEvaluatingBook({
      title,
      author: extraContext?.author,
      coverUrl: extraContext?.coverUrl,
    });
    setIsLoading(true);
    setIsFinishing(false);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => Math.min(prev + 1, EVALUATION_STAGES.length - 1));
    }, STEP_INTERVAL_MS);

    try {
      const evaluation = await evaluateWithGemini(title, extraContext);

      // Pré-aquece capa e pôsteres dos filmes antes da abertura da FichaModal
      prefetchBookCovers([evaluation.coverUrl], true);
      evaluation.movieComparisons.slice(0, 3).forEach((m) => {
        fetchMoviePoster(m);
      });

      clearInterval(stepInterval);
      setLoadingStepIndex(EVALUATION_STAGES.length - 1);
      setIsFinishing(true);
      await new Promise((resolve) => setTimeout(resolve, FINISH_HOLD_MS));

      if (evaluation.notaEncaixe >= 8) {
        confetti({
          particleCount: 45,
          spread: 58,
          origin: { y: 0.6 },
          colors: ['#1d1d1f', '#10b981', '#f59e0b'],
        });
      }

      onBookEvaluated(evaluation);
      onClose();
    } catch (err: any) {
      console.error('Fatal evaluation error:', err);
      setEvalError(
        'Falha ao obter avaliação do Veredito. Por favor, tente novamente em alguns segundos.'
      );
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setIsFinishing(false);
      setLoadingStepIndex(0);
      setEvaluatingBook(null);
    }
  };

  const handleRequestEvaluation = (rawBook: Partial<BookEvaluation>) => {
    (document.activeElement as HTMLElement)?.blur();
    searchAbortRef.current?.abort();
    setEvalError(null);

    const existing = findAlreadyEvaluated(rawBook.title || query);
    if (existing) {
      setDuplicateWarning(existing);
      return;
    }
    setDuplicateWarning(null);

    runEvaluationWithProgress(rawBook.title || query.trim() || 'Livro', {
      sourceId: rawBook.id,
      author: rawBook.author,
      publisher: rawBook.publisher,
      description: rawBook.resumo,
      coverUrl: rawBook.coverUrl,
      pages: rawBook.pages,
      year: rawBook.year,
      genres: rawBook.genres,
    });
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    (document.activeElement as HTMLElement)?.blur();

    const trimmed = query.trim();
    if (trimmed.length < 3) return;

    if (apiSuggestions.length > 0) {
      handleRequestEvaluation(apiSuggestions[0]);
      return;
    }

    if (isAmazonUrl(trimmed)) {
      if (!isSearching) {
        setIsSearching(true);
        try {
          const results = await searchBookApi(trimmed);
          setApiSuggestions(results);
          if (results.length > 0) {
            handleRequestEvaluation(results[0]);
          }
        } catch (e) {
          console.error('Amazon search error:', e);
        } finally {
          setIsSearching(false);
        }
      }
      return;
    }

    if (!isSearching) {
      const existing = findAlreadyEvaluated(trimmed);
      if (existing) {
        setDuplicateWarning(existing);
        return;
      }
      runEvaluationWithProgress(trimmed);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    (document.activeElement as HTMLElement)?.blur();
    setEvalError(null);
    const lines = bulkText
      .split(/[\n;]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 2);
    setEvaluatingBook({
      title: 'Avaliação em lote',
      author: `${lines.length} ${lines.length === 1 ? 'livro selecionado' : 'livros na lista'}`,
    });
    setIsLoading(true);
    setIsFinishing(false);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex((prev) => Math.min(prev + 1, EVALUATION_STAGES.length - 1));
    }, 1400);

    try {
      let results: BookEvaluation[];
      try {
        results = await evaluateBulkWithGemini(lines);
      } catch (geminiError) {
        console.warn('Gemini bulk call failed, falling back:', geminiError);
        results = evaluateBulkList(bulkText);
      }

      clearInterval(stepInterval);
      setLoadingStepIndex(EVALUATION_STAGES.length - 1);
      setIsFinishing(true);
      await new Promise((resolve) => setTimeout(resolve, 220));

      const newOnly = results.filter((b) => !findAlreadyEvaluated(b.title));
      if (newOnly.length === 0 && results.length > 0) {
        const firstDup = findAlreadyEvaluated(results[0].title);
        if (firstDup) {
          setDuplicateWarning(firstDup);
          setIsLoading(false);
          setIsFinishing(false);
          return;
        }
      }
      onBulkEvaluated(newOnly.length > 0 ? newOnly : results);
      onClose();
    } catch (err: any) {
      console.error('Bulk error:', err);
      setEvalError('Falha ao avaliar a lista. Tente novamente.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setIsFinishing(false);
      setLoadingStepIndex(0);
      setEvaluatingBook(null);
    }
  };

  const activeStageIndex = Math.min(loadingStepIndex, EVALUATION_STAGES.length - 1);
  const activeStage = EVALUATION_STAGES[activeStageIndex];
  const progressFraction = isFinishing
    ? 1
    : Math.min((activeStageIndex + 0.65) / EVALUATION_STAGES.length, 0.94);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        onClick={() => !isLoading && onClose()}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm z-10"
      />

      {/* Modal Window — Apple & Raycast-grade Command Palette for Desktop, Touch Sheet on Mobile */}
      <motion.div
        initial={{ y: 28, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.36 }}
        className="relative w-full max-w-lg md:max-w-3xl lg:max-w-4xl max-h-[92dvh] sm:max-h-[88vh] md:max-h-[88vh] bg-white border border-neutral-200/90 rounded-t-3xl sm:rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 pb-safe will-change-transform"
      >
        {/* iOS Handle Indicator on mobile */}
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Minimalist Top Close Bar */}
        <div className="flex items-center justify-end px-5 sm:px-6 md:px-8 pt-3 pb-1 sticky top-0 z-20 bg-white/95 backdrop-blur-md">
          {!isLoading && (
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="p-2 -mr-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200/70 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mode Switcher Tabs */}
        {!isLoading && (
          <div className="flex p-1 mx-5 sm:mx-6 md:mx-8 mt-2.5 rounded-xl bg-neutral-100 border border-neutral-200/70 shrink-0 max-w-xs md:max-w-sm">
            <button
              onClick={() => setTab('single')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 select-none active:scale-[0.98] cursor-pointer ${
                tab === 'single'
                  ? 'bg-white text-[#1d1d1f] shadow-xs font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Livro Único</span>
            </button>
            <button
              onClick={() => setTab('bulk')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 select-none active:scale-[0.98] cursor-pointer ${
                tab === 'bulk'
                  ? 'bg-white text-[#1d1d1f] shadow-xs font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <ListPlus className="w-3.5 h-3.5" />
              <span>Colar Lista</span>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="p-5 sm:p-6 md:px-8 overflow-y-auto hide-scrollbar space-y-4 flex-1">
          {isLoading ? (
            /* Apple-Style Editorial Evaluation Stage: Pure Animated Black Typography */
            <div className="py-3 sm:py-5 md:py-7 select-none">
              <div className="flex flex-col md:grid md:grid-cols-12 md:gap-10 items-center">
                {/* Left Column: Book Cover with Soft Static Ambient Shadow */}
                <div className="w-full md:col-span-5 flex flex-col items-center justify-center space-y-3.5 md:border-r md:border-neutral-200/70 md:pr-8 text-center">
                  <div className="relative mx-auto flex flex-col items-center">
                    {evaluatingBook?.coverUrl && (
                      <div
                        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none -z-10 opacity-50"
                        style={{
                          transform: 'translate3d(0, 12px, 0)',
                          filter: 'blur(24px)',
                        }}
                      >
                        <img
                          src={evaluatingBook.coverUrl}
                          alt=""
                          className="w-full h-full object-cover scale-110"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    )}

                    <div className="relative w-28 sm:w-34 md:w-42 shadow-[0_16px_38px_rgba(0,0,0,0.18)] rounded-xl overflow-hidden border border-black/[0.06] z-10">
                      {evaluatingBook?.coverUrl ? (
                        <BookCover
                          title={evaluatingBook.title}
                          author={evaluatingBook.author || ''}
                          coverUrl={evaluatingBook.coverUrl}
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] rounded-xl bg-neutral-100/90 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-neutral-400 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-0.5 max-w-xs">
                    <h3 className="text-sm md:text-[15px] font-bold text-[#1d1d1f] line-clamp-2 tracking-tight">
                      {evaluatingBook ? evaluatingBook.title : 'Avaliando obra'}
                    </h3>
                    {evaluatingBook?.author && (
                      <p className="text-xs text-[#86868b] truncate">
                        {evaluatingBook.author}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Pure Black Animated Typography (No Cards, No Icons, No Gradients) */}
                <div className="w-full md:col-span-7 flex flex-col items-center md:items-start justify-center space-y-5 md:pl-2 mt-6 md:mt-0 text-center md:text-left">
                  <ol className="flex flex-col items-center md:items-start gap-2 sm:gap-2.5">
                    {EVALUATION_STAGES.map((stage, i) => {
                      const isCurrent = !isFinishing && activeStageIndex === i;
                      const isCompleted = isFinishing
                        ? i < EVALUATION_STAGES.length - 1
                        : activeStageIndex > i;
                      const isFinalLocked = isFinishing && i === EVALUATION_STAGES.length - 1;

                      const targetOpacity = isCurrent || isFinalLocked ? 1 : isCompleted ? 0.34 : 0.16;
                      const targetScale = isCurrent || isFinalLocked ? 1 : 0.985;

                      return (
                        <motion.li
                          key={stage.label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{
                            opacity: targetOpacity,
                            scale: targetScale,
                            y: 0,
                          }}
                          transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.42,
                            delay: i * 0.03,
                          }}
                          aria-current={isCurrent ? 'step' : undefined}
                          className={`origin-center md:origin-left text-[17px] sm:text-[19px] md:text-[21px] leading-tight font-semibold tracking-[-0.024em] ${
                            isCurrent ? 'step-text-shimmer' : 'text-[#1d1d1f]'
                          }`}
                        >
                          {stage.label}
                        </motion.li>
                      );
                    })}
                  </ol>

                  {/* Subtle Crossfading Editorial Detail + Hairline */}
                  <div className="w-full max-w-xs space-y-3 pt-0.5 flex flex-col items-center md:items-start">
                    <div className="h-5 flex items-center justify-center md:justify-start overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={isFinishing ? 'done' : activeStageIndex}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="text-xs md:text-[13px] text-[#86868b] font-normal tracking-[-0.008em]"
                        >
                          {activeStage.detail}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    <div className="w-36 sm:w-44 h-[2px] rounded-full bg-black/[0.07] overflow-hidden">
                      <motion.div
                        className="h-full bg-[#1d1d1f] rounded-full origin-left"
                        initial={{ scaleX: 0.14 }}
                        animate={{ scaleX: progressFraction }}
                        transition={{ type: 'spring', bounce: 0, duration: isFinishing ? 0.28 : 0.55 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : tab === 'single' ? (
            <div className="space-y-3.5">
              {/* Duplicate Book Warning Banner */}
              <AnimatePresence>
                {duplicateWarning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    className="p-3.5 rounded-2xl bg-amber-50/95 border border-amber-200 shadow-sm flex flex-col gap-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded-md">
                            Já avaliado
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-amber-950 mt-1">
                          Esse livro já foi avaliado
                        </h4>
                        <p className="text-[11px] text-amber-900/85 mt-0.5 leading-relaxed">
                          <strong>"{duplicateWarning.title}"</strong> ({duplicateWarning.author}) já está no seu acervo com Nota <strong>{Math.floor(duplicateWarning.notaEncaixe)}</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-amber-200/70">
                      <button
                        type="button"
                        onClick={() => setDuplicateWarning(null)}
                        className="px-2.5 py-1 text-xs font-semibold text-amber-800 hover:text-amber-950 rounded-lg transition-colors cursor-pointer"
                      >
                        Tentar outro
                      </button>
                      {onOpenBook && (
                        <AceternityButton
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            onClose();
                            onOpenBook(duplicateWarning);
                          }}
                          className="!bg-amber-950 hover:!bg-black !text-white text-xs font-bold"
                        >
                          Ver Ficha
                        </AceternityButton>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Evaluation Error Banner */}
              <AnimatePresence>
                {evalError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-950 text-xs flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                      </div>
                      <span className="leading-snug font-medium text-[11px] text-rose-900">{evalError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEvalError(null)}
                      className="text-rose-700 hover:text-rose-950 text-[11px] font-bold px-2 py-1 rounded-lg hover:bg-rose-100/70 transition-colors cursor-pointer shrink-0"
                    >
                      Fechar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Command Palette Styled Search Bar */}
              <form onSubmit={handleSearchSubmit} className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f] block">
                  Cole o link do livro na Amazon:
                </label>

                <div className="relative w-full">
                  <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#86868b] pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Cole aqui o link da Amazon..."
                    className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 rounded-2xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-sm md:text-base focus:outline-none transition-colors duration-150 shadow-2xs"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    enterKeyHint="search"
                  />

                  {isSearching ? (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-neutral-600 animate-spin" />
                    </div>
                  ) : query.trim().length > 0 ? (
                    <button
                      type="button"
                      onClick={handleClearQuery}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
                      aria-label="Limpar campo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>

                {isSearching && isAmazonUrl(query) && (
                  <div className="flex items-center gap-1.5 pt-0.5 px-0.5 text-xs text-[#86868b]">
                    <Loader2 className="w-3 h-3 animate-spin text-neutral-700" />
                    <span>Reconhecendo livro da Amazon...</span>
                  </div>
                )}
              </form>

              {/* Suggestions from Books API — 2 Column Responsive Grid on Desktop */}
              {apiSuggestions.length > 0 ? (
                <div className="space-y-2 pt-2 border-t border-neutral-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                      {apiSuggestions[0]?.id?.startsWith('amz-')
                        ? 'Livro Reconhecido da Amazon'
                        : apiSuggestions[0]?.id?.startsWith('gem-search-')
                        ? `Edições em Destaque no Brasil (${apiSuggestions.length})`
                        : `Edições Encontradas (${apiSuggestions.length})`}
                    </span>
                    <span className="text-[10px] text-[#86868b]">
                      Selecione para avaliar com o Veredito
                    </span>
                  </div>

                  {/* Touch-optimized scroll area with auto-blur on scroll */}
                  <div
                    onTouchMove={() => (document.activeElement as HTMLElement)?.blur()}
                    className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-3 max-h-72 sm:max-h-80 md:max-h-96 overflow-y-auto pr-1"
                  >
                    {apiSuggestions.map((book, idx) => {
                      const isAlready = findAlreadyEvaluated(book.title || '');
                      const isFromAmazon = book.id?.startsWith('amz-');
                      return (
                        <div
                          key={book.id || idx}
                          onClick={() => handleRequestEvaluation(book)}
                          className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100/90 active:bg-neutral-200/60 border border-neutral-200/70 hover:border-neutral-300 cursor-pointer transition-all active:scale-[0.99] shadow-2xs hover:shadow-xs"
                        >
                          {/* Generous Cover with 2:3 Aspect Ratio */}
                          <div className="w-14 sm:w-16 md:w-18 shrink-0">
                            <BookCover
                              title={book.title || 'Livro'}
                              author={book.author || 'Autor'}
                              coverUrl={book.coverUrl}
                            />
                          </div>

                          {/* Descriptive Metadata */}
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-bold text-[#1d1d1f] line-clamp-2 leading-snug group-hover:text-black">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-[#86868b] truncate">
                              {book.author}
                            </p>
                            <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                              {isAlready ? (
                                <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-200/80 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5 text-amber-700" />
                                  Já avaliado
                                </span>
                              ) : (
                                <>
                                  {isFromAmazon && (
                                    <span className="text-[9px] font-semibold text-[#1d1d1f] bg-neutral-200/80 px-1.5 py-0.5 rounded-md">
                                      Amazon
                                    </span>
                                  )}
                                  {book.publisher && (
                                    <span className="text-[9px] font-semibold text-neutral-800 bg-neutral-200/80 px-1.5 py-0.5 rounded-md">
                                      {book.publisher}
                                    </span>
                                  )}
                                  {book.pages ? (
                                    <span className="text-[9px] font-medium text-[#6e6e73] bg-neutral-200/60 px-1.5 py-0.5 rounded-md">
                                      {book.pages} págs
                                    </span>
                                  ) : null}
                                </>
                              )}
                              {book.year && (
                                <span className="text-[9px] font-medium text-[#6e6e73]">
                                  {book.year}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Botão de Avaliar ao lado de cada livro */}
                          <div className="shrink-0 flex items-center">
                            {isAlready ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClose();
                                  onOpenBook?.(isAlready);
                                }}
                                className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 hover:text-black bg-neutral-200/70 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                              >
                                Ver Ficha
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRequestEvaluation(book);
                                }}
                                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                              >
                                <span>Avaliar</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : query.trim().length >= 3 && !isSearching ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/70 text-center space-y-2.5">
                  <p className="text-xs sm:text-sm font-bold text-[#1d1d1f]">
                    Nenhuma edição direta encontrada na busca rápida
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#86868b] max-w-sm mx-auto leading-relaxed">
                    Deseja avaliar <strong>"{query.trim()}"</strong> agora no Veredito?
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleRequestEvaluation({
                        title: query.trim(),
                        author: 'Autor a consultar',
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#1d1d1f] text-white hover:bg-black active:scale-95 transition-all shadow-xs cursor-pointer mt-1"
                  >
                    <span>Avaliar "{query.trim()}"</span>
                  </button>
                </div>
              ) : (
                /* Initial Empty State: Visual Book Suggestions + Character-Driven Recommendations */
                <div className="space-y-4 pt-1.5">
                  {/* Row 1: Popular Book Suggestions */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                      Sugestões Populares para Avaliar
                    </span>
                    <div className="grid grid-cols-4 gap-3 sm:gap-4 pt-0.5">
                      {popularSuggestions.map((book) => (
                        <div
                          key={book.id || book.title}
                          onClick={() => handleRequestEvaluation(book)}
                          className="flex flex-col cursor-pointer group active:scale-[0.97] transition-transform duration-200 select-none"
                        >
                          <div className="w-full mb-2 transition-transform duration-200 group-hover:-translate-y-1">
                            <BookCover
                              title={book.title || 'Livro'}
                              author={book.author || ''}
                              coverUrl={book.coverUrl}
                            />
                          </div>
                          <div className="space-y-0.5 px-0.5">
                            <h4 className="text-[11px] sm:text-xs font-semibold text-[#1d1d1f] truncate group-hover:text-black leading-snug tracking-tight">
                              {book.title}
                            </h4>
                            <p className="text-[10px] text-[#86868b] truncate font-normal">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2: Books by Favorite Characters (4 rotating characters every 6h) */}
                  {(() => {
                    const evaluatedSet = buildEvaluatedTitleSet(existingBooks);
                    const activeCharacter =
                      characterSuggestions.find((c) => c.id === selectedCharacterId) || null;
                    const activeCharacterBooks = activeCharacter
                      ? getCharacterBooks(activeCharacter, evaluatedSet, 4)
                      : [];

                    return (
                      <div className="space-y-2.5 pt-2.5 border-t border-neutral-200/70">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                            Livros de Acordo com Personagens
                          </span>
                          <span className="text-[10px] text-[#86868b]">
                            Toque para ver 4 obras
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                          {characterSuggestions.map((char) => {
                            const isSelected = activeCharacter?.id === char.id;
                            const previewBooks = getCharacterBooks(char, evaluatedSet, 2);
                            const [cover1, cover2] = previewBooks.map((b) => b.coverUrl);

                            return (
                              <button
                                key={char.id}
                                type="button"
                                onClick={() =>
                                  setSelectedCharacterId((prev) =>
                                    prev === char.id ? null : char.id
                                  )
                                }
                                className={`p-2 sm:p-2.5 rounded-2xl flex items-center gap-2.5 text-left transition-all duration-150 cursor-pointer select-none active:scale-[0.98] border ${
                                  isSelected
                                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-[0_6px_18px_rgba(0,0,0,0.16)]'
                                    : 'bg-neutral-50/90 hover:bg-neutral-100/90 text-[#1d1d1f] border-neutral-200/80 hover:border-neutral-300 shadow-2xs'
                                }`}
                              >
                                {/* Mini par de capas reais sobrepostas */}
                                <div className="flex items-center shrink-0">
                                  {cover1 && (
                                    <div className="w-6.5 h-9 sm:w-7 sm:h-10 rounded-[5px] overflow-hidden bg-neutral-200 border border-white shadow-2xs shrink-0">
                                      <img
                                        src={cover1}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                    </div>
                                  )}
                                  {cover2 && (
                                    <div className="relative -ml-3 z-10 w-6.5 h-9 sm:w-7 sm:h-10 rounded-[5px] overflow-hidden bg-neutral-200 border border-white shadow-xs shrink-0">
                                      <img
                                        src={cover2}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h4
                                    className={`text-xs font-bold truncate leading-tight tracking-tight ${
                                      isSelected ? 'text-white' : 'text-[#1d1d1f]'
                                    }`}
                                  >
                                    {char.name}
                                  </h4>
                                  <p
                                    className={`text-[10px] truncate mt-0.5 ${
                                      isSelected ? 'text-neutral-300' : 'text-[#86868b]'
                                    }`}
                                  >
                                    {char.source}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Inline 4-Book Shelf for Selected Character */}
                        <AnimatePresence mode="wait" initial={false}>
                          {activeCharacter && activeCharacterBooks.length > 0 && (
                            <motion.div
                              key={activeCharacter.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                              className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-bold text-[#1d1d1f]">
                                      {activeCharacter.name}
                                    </span>
                                    <span className="text-[10px] text-[#86868b]">
                                      • {activeCharacter.source}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">
                                    {activeCharacter.thread}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setSelectedCharacterId(null)}
                                  aria-label="Fechar seleção de personagem"
                                  className="p-1 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-200/70 transition-colors cursor-pointer shrink-0"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-4 gap-3 sm:gap-4 pt-0.5">
                                {activeCharacterBooks.map((book) => (
                                  <div
                                    key={`${activeCharacter.id}-${book.id || book.title}`}
                                    onClick={() => handleRequestEvaluation(book)}
                                    className="flex flex-col cursor-pointer group active:scale-[0.97] transition-transform duration-200 select-none"
                                  >
                                    <div className="w-full mb-2 transition-transform duration-200 group-hover:-translate-y-1">
                                      <BookCover
                                        title={book.title || 'Livro'}
                                        author={book.author || ''}
                                        coverUrl={book.coverUrl}
                                      />
                                    </div>
                                    <div className="space-y-0.5 px-0.5">
                                      <h4 className="text-[11px] sm:text-xs font-semibold text-[#1d1d1f] truncate group-hover:text-black leading-snug tracking-tight">
                                        {book.title}
                                      </h4>
                                      <p className="text-[10px] text-[#86868b] truncate font-normal">
                                        {book.author}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : (
            /* Bulk Mode ("Colar Lista") */
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-xs font-semibold text-[#1d1d1f] block">
                    Cole sua lista de títulos (um por linha):
                  </label>
                  <p className="text-[11px] text-[#86868b]">
                    Formato recomendado: <em>Título - Autor</em> ou apenas <em>Título</em>.
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200 font-score">
                  {bulkText.split(/[\n;]+/).filter((l) => l.trim().length > 2).length} livros detectados
                </span>
              </div>

              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={"Duna - Frank Herbert\nNeuromancer - William Gibson\nFundação - Isaac Asimov\n1984 - George Orwell"}
                rows={6}
                className="w-full p-3.5 rounded-2xl bg-neutral-100/90 focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:ring-2 focus:ring-black/5 text-[#1d1d1f] placeholder-[#86868b] text-[16px] sm:text-xs font-mono focus:outline-none transition-colors duration-150 resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="hidden md:inline text-[11px] text-[#86868b]">
                  Cada livro receberá Nota Técnica, Nota de Encaixe e Veredito Crítico.
                </span>
                <AceternityButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!bulkText.trim()}
                  className="font-bold text-xs"
                >
                  Avaliar Lista em Lote
                </AceternityButton>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
