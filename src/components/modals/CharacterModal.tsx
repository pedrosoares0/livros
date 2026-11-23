import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Film,
  BookOpen,
  CheckCircle2,
  Share2,
  User,
  Image as ImageIcon,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';
import { BookEvaluation, UserRatingsMap } from '../../types';
import {
  CharacterReading,
  getCharacterMeta,
  getCharacterCover,
  getCharacterRecommendedTrio,
  buildEvaluatedTitleSet,
} from '../../data/characterReadings';
import { prefetchBookCovers } from '../../services/imagePrefetch';
import { BookCover } from '../BookCover';
import { MovieThumb } from '../MovieThumb';
import { CopyButton } from '../ui/CopyButton';
import { PearlButton } from '../ui/PearlButton';

interface CharacterModalProps {
  character: CharacterReading | null;
  onClose: () => void;
  existingBooks: BookEvaluation[];
  userRatings?: UserRatingsMap;
  onSelectEvaluatedBook: (book: BookEvaluation) => void;
  onEvaluateRecommendedBook: (rawBook: Partial<BookEvaluation>) => void;
  customCoverUrl?: string;
  onUpdateCharacterCover?: (characterId: string, newCoverUrl: string) => void;
}

const normalizeTitle = (text: string) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim();

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  existingBooks,
  userRatings,
  onSelectEvaluatedBook,
  onEvaluateRecommendedBook,
  customCoverUrl,
  onUpdateCharacterCover,
}) => {
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showCoverAlert, setShowCoverAlert] = useState(false);
  const [bookRotationIndex, setBookRotationIndex] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  // Keyboard Escape listener for seamless dismissal
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is active for native app feel
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const evaluatedSet = useMemo(() => buildEvaluatedTitleSet(existingBooks), [existingBooks]);

  const recommendedBooks = useMemo(() => {
    if (!character) return [];
    return getCharacterRecommendedTrio(character, evaluatedSet, bookRotationIndex);
  }, [character, evaluatedSet, bookRotationIndex]);

  useEffect(() => {
    if (recommendedBooks.length > 0) {
      prefetchBookCovers(
        recommendedBooks.map((b) => b.coverUrl),
        true
      );
    }
  }, [recommendedBooks]);

  if (!character) return null;

  const meta = getCharacterMeta(character);
  const activeCoverUrl = customCoverUrl || getCharacterCover(character);

  const findEvaluatedMatch = (rawBook: Partial<BookEvaluation>): BookEvaluation | null => {
    if (!rawBook.title || !existingBooks || existingBooks.length === 0) return null;
    const normTarget = normalizeTitle(rawBook.title);
    const mainTarget = rawBook.title.includes(':')
      ? normalizeTitle(rawBook.title.split(':')[0])
      : normTarget;

    return (
      existingBooks.find((b) => {
        if (rawBook.id && b.id === rawBook.id) return true;
        const normTitle = normalizeTitle(b.title);
        if (normTitle === normTarget) return true;
        if (b.originalTitle && normalizeTitle(b.originalTitle) === normTarget) return true;
        if (b.title.includes(':') || rawBook.title!.includes(':')) {
          const mainTitle = normalizeTitle(b.title.split(':')[0]);
          if (mainTitle.length >= 4 && mainTarget.length >= 4 && mainTitle === mainTarget) {
            return true;
          }
        }
        return false;
      }) || null
    );
  };

  const handleRotateBooks = () => {
    setSpinCount((prev) => prev + 1);
    setBookRotationIndex((prev) => prev + 1);
  };

  const handleApplyCustomCover = () => {
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    onUpdateCharacterCover?.(character.id, trimmed);
    setCustomUrlInput('');
    setIsCoverPickerOpen(false);
    setShowCoverAlert(true);
    setTimeout(() => setShowCoverAlert(false), 2800);
  };

  const handleResetDefaultCover = () => {
    if (character.imageUrl) {
      onUpdateCharacterCover?.(character.id, character.imageUrl);
      setIsCoverPickerOpen(false);
      setShowCoverAlert(true);
      setTimeout(() => setShowCoverAlert(false), 2800);
    }
  };

  const generateCharacterFichaText = () => {
    const booksList = recommendedBooks
      .map((b, i) => `${i + 1}. ${b.title} (${b.author})`)
      .join('\n');
    return `🎭 VEREDITO — Ficha de Personagem
👤 Personagem: ${character.name} (${character.source})
💡 Fio Dramático: "${character.thread}"

📝 Sobre o Personagem:
${meta.resumo}

🎬 Filmes na Mesma Pegada: ${meta.movieComparisons.slice(0, 3).join(' • ')}

📚 3 Livros Recomendados a partir de ${character.name}:
${booksList}`;
  };

  const copyFichaToClipboard = async () => {
    await navigator.clipboard.writeText(generateCharacterFichaText());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-3 lg:p-4 overflow-hidden">
      {/* Backdrop with smooth opacity fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm z-10 cursor-pointer"
      />

      {/* Modal Container with Aceternity-grade Spring physics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 320,
          mass: 0.85,
        }}
        className="relative w-full max-w-lg md:max-w-4xl lg:max-w-[1080px] xl:max-w-[1160px] max-h-[92vh] sm:max-h-[88vh] md:max-h-[88vh] lg:max-h-[89vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_65px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 will-change-transform"
      >
        {/* Cover Change Success Alert */}
        <AnimatePresence>
          {showCoverAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 420 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1d1d1f] text-white shadow-xl flex items-center gap-2 text-xs font-semibold border border-white/10 pointer-events-none select-none"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Capa do personagem atualizada!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Top Action Bar */}
        <div className="flex items-center justify-end px-6 pt-3.5 pb-2 md:pt-2.5 md:pb-1 bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={copyFichaToClipboard}
              title="Copiar Ficha do Personagem"
              className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Fechar"
              className="p-2 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Scrollable Content: 12-Column Editorial Grid on Desktop, Single Column on Mobile */}
        <div className="overflow-y-auto px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:pt-2 md:pb-5 hide-scrollbar flex-1">
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-7 lg:gap-8 items-start md:items-stretch">
            {/* Left Column (Desktop Hero: 3D Character Portrait & Cover Tools) */}
            <div className="w-full md:col-span-4 lg:col-span-3">
              <div
                className={`w-full flex flex-col items-center space-y-3.5 md:sticky md:top-0 ${
                  isCoverPickerOpen
                    ? 'md:justify-start md:pt-2'
                    : 'md:min-h-[430px] lg:min-h-[460px] md:justify-center'
                }`}
              >
                {/* Extra-Large Clean 3D Portrait Cover */}
                <div className="w-48 sm:w-56 md:w-full max-w-[260px] md:max-w-[240px] mx-auto">
                  <BookCover
                    title={character.name}
                    author={character.source}
                    coverUrl={activeCoverUrl}
                  />
                </div>

                {/* Cover Controls */}
                <div className="w-full max-w-[260px] md:max-w-[240px] flex items-center justify-between gap-2 mx-auto">
                  <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200/90 rounded-lg text-[10px] font-semibold text-[#86868b] truncate max-w-[125px]">
                    {character.source}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsCoverPickerOpen((prev) => !prev)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 text-[10px] font-semibold text-[#1d1d1f] transition-all cursor-pointer active:scale-95 shadow-2xs"
                    title="Alterar imagem do personagem"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#86868b]" />
                    <span>{isCoverPickerOpen ? 'Fechar capa' : 'Alterar capa'}</span>
                  </button>
                </div>

                {/* Custom Image URL Drawer */}
                <AnimatePresence>
                  {isCoverPickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                      className="w-full max-w-[260px] md:max-w-[240px] mx-auto p-3 rounded-2xl bg-neutral-50/95 border border-neutral-200/90 space-y-2 shadow-xs overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                          Imagem do Personagem
                        </span>
                        {customCoverUrl && customCoverUrl !== character.imageUrl && (
                          <button
                            type="button"
                            onClick={handleResetDefaultCover}
                            className="text-[10px] font-semibold text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                          >
                            Restaurar padrão
                          </button>
                        )}
                      </div>

                      <div className="space-y-1.5 pt-0.5">
                        <label className="text-[10px] font-semibold text-[#86868b] block">
                          Cole o link direto da imagem:
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="url"
                            value={customUrlInput}
                            onChange={(e) => setCustomUrlInput(e.target.value)}
                            placeholder="https://exemplo.com/foto.jpg"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck={false}
                            enterKeyHint="done"
                            className="flex-1 px-2.5 py-1 text-[16px] sm:text-xs bg-white border border-neutral-200/90 rounded-lg text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-black"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleApplyCustomCover}
                            disabled={!customUrlInput.trim()}
                            className="px-2.5 py-1 text-[11px] font-bold bg-[#1d1d1f] text-white rounded-lg hover:bg-black disabled:opacity-40 cursor-pointer"
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column (Header, Fio Dramático, Resumo, Filmes Relacionados, 3 Livros Recomendados) */}
            <div className="w-full md:col-span-8 lg:col-span-9 space-y-4 md:space-y-3.5 min-w-0 mt-5 md:mt-0">
              {/* Header: Archetype Tags, Character Name, Source Work */}
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  {meta.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 border border-neutral-200/80 text-[#86868b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
                  {character.name}
                </h2>
                <p className="text-sm md:text-[15px] font-semibold text-[#86868b]">
                  {character.source}
                </p>
              </div>

              {/* Fio Dramático Banner (same visual card language as Veredito Crítico) */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/70 border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                    Núcleo & Fio Dramático
                  </span>
                  <p className="text-sm md:text-[15px] font-semibold text-[#1d1d1f] italic leading-snug">
                    "{character.thread}"
                  </p>
                </div>
              </div>

              {/* Leve Resumo sobre o Personagem + Filmes Relacionados / Mesma Pegada (lado a lado no PC) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                {/* Sobre o Personagem */}
                <div className="flex flex-col space-y-1.5 lg:col-span-7">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                    <User className="w-3.5 h-3.5 text-[#1d1d1f]" />
                    <span>Sobre o Personagem</span>
                  </div>
                  <p className="flex-1 text-xs sm:text-sm text-[#1d1d1f] leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/70">
                    {meta.resumo}
                  </p>
                </div>

                {/* Filmes Relacionados ou com a Mesma Pegada */}
                <div className="lg:col-span-5 p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex flex-col justify-between space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f] min-w-0">
                      <Film className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">Filmes na Mesma Pegada</span>
                    </div>
                    <span className="text-[10px] text-[#86868b] font-medium shrink-0">
                      {Math.min(3, meta.movieComparisons.length)}{' '}
                      {Math.min(3, meta.movieComparisons.length) === 1 ? 'filme' : 'filmes'}
                    </span>
                  </div>

                  {/* Single Row of 3 Movie Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {meta.movieComparisons.slice(0, 3).map((movie, i) => (
                      <MovieThumb key={`${character.id}-movie-${i}-${movie}`} title={movie} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Livros Recomendados a partir do Personagem */}
              <div className="space-y-2.5 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                    <BookOpen className="w-3.5 h-3.5 text-[#1d1d1f]" />
                    <span>3 Livros Recomendados a partir dele</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRotateBooks}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#6e6e73] hover:text-[#1d1d1f] bg-neutral-100 hover:bg-neutral-200/75 border border-neutral-200/80 transition-all cursor-pointer active:scale-95 select-none"
                    title="Trocar os 3 livros recomendados deste personagem"
                  >
                    <RefreshCw
                      className="w-3 h-3 transition-transform duration-300 ease-out"
                      style={{ transform: `rotate(${spinCount * 180}deg)` }}
                    />
                    <span>Trocar trio</span>
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={recommendedBooks.map((b) => b.id || b.title).join('|')}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                  >
                    {recommendedBooks.map((recBook, idx) => {
                      const evaluatedMatch = findEvaluatedMatch(recBook);
                      const userRating = evaluatedMatch
                        ? userRatings?.[evaluatedMatch.id]?.rating
                        : undefined;

                      return (
                        <div
                          key={recBook.id || `${character.id}-rec-${idx}`}
                          onClick={() => {
                            if (evaluatedMatch) {
                              onSelectEvaluatedBook(evaluatedMatch);
                            } else {
                              onEvaluateRecommendedBook(recBook);
                            }
                          }}
                          className="p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100/85 border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer group flex flex-col justify-between gap-2.5 shadow-2xs active:scale-[0.98] select-none"
                        >
                          <div className="flex items-start gap-3">
                            {/* 3D Book Cover */}
                            <div className="w-14 sm:w-15 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                              <BookCover
                                title={recBook.title || 'Livro'}
                                author={recBook.author || ''}
                                coverUrl={evaluatedMatch?.coverUrl || recBook.coverUrl}
                                notaEncaixe={evaluatedMatch?.notaEncaixe}
                                userRating={userRating}
                              />
                            </div>

                            {/* Title, Author, Pages & Status Badge */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <h4 className="text-xs sm:text-[13px] font-bold text-[#1d1d1f] group-hover:text-black line-clamp-2 leading-snug tracking-tight">
                                {recBook.title}
                              </h4>
                              <p className="text-[11px] text-[#86868b] truncate">
                                {recBook.author}
                              </p>

                              <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                                {recBook.pages ? (
                                  <span className="text-[9.5px] font-score font-semibold text-[#6e6e73] bg-neutral-200/70 px-1.5 py-0.5 rounded-md">
                                    {recBook.pages} págs
                                  </span>
                                ) : null}

                                {evaluatedMatch ? (
                                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-1.5 py-0.5 rounded-md">
                                    <span>Ver Ficha</span>
                                    <ArrowUpRight className="w-2.5 h-2.5" />
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-[#1d1d1f] bg-white border border-neutral-200/90 group-hover:bg-[#1d1d1f] group-hover:text-white group-hover:border-[#1d1d1f] transition-colors px-1.5 py-0.5 rounded-md shadow-3xs">
                                    <span>Avaliar</span>
                                    <ArrowUpRight className="w-2.5 h-2.5" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Short subtle book premise */}
                          {recBook.resumo && (
                            <p className="text-[11px] text-[#515154] leading-relaxed line-clamp-2 border-t border-neutral-200/60 pt-2">
                              {recBook.resumo}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions — Centered Action Bar matching FichaModal */}
        <div className="p-3.5 sm:p-4 md:py-3 md:px-8 border-t border-black/[0.06] bg-[#ffffff] flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
            <PearlButton
              size="nav-rect"
              label="Trocar livros"
              onClick={handleRotateBooks}
              title="Sortear outros 3 livros recomendados deste personagem"
              className="shrink-0"
            />

            <CopyButton
              variant="secondary"
              size="md"
              text={generateCharacterFichaText}
              showLabel={false}
              aria-label="Copiar ficha do personagem"
              className="shrink-0 px-3.5"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
