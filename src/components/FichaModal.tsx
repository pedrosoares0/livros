import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Film, BookOpen, AlertTriangle, CheckCircle2, 
  XCircle, Share2, Bookmark, Gauge,
  Feather, Compass, Zap, Moon, HeartHandshake,
  Trash2, Image as ImageIcon, Check
} from 'lucide-react';
import { BookEvaluation, UserRating } from '../types';
import { BookCover } from './BookCover';
import { ScoreBadge, getScoreTone } from './ScoreBadge';
import { MovieThumb } from './MovieThumb';
import { fetchAlternativeCovers } from '../services/coverSearch';
import { getCuratedCovers } from '../data/curatedCovers';
import { INITIAL_BOOKS } from '../data/initialBooks';
import { AceternityButton } from './AceternityButton';
import { CopyButton } from './CopyButton';
import { PearlButton } from './PearlButton';

interface FichaModalProps {
  book: BookEvaluation | null;
  onClose: () => void;
  onSaveToWishlist?: (book: BookEvaluation) => void;
  isSaved?: boolean;
  onDeleteBook?: (bookId: string) => void;
  onUpdateCover?: (bookId: string, newCoverUrl: string) => void;
  userRating?: UserRating | null;
  onOpenRateModal?: () => void;
  onOpenEvaluate?: () => void;
}

export const FichaModal: React.FC<FichaModalProps> = ({
  book,
  onClose,
  onSaveToWishlist,
  isSaved = false,
  onDeleteBook,
  onUpdateCover,
  userRating,
  onOpenRateModal,
  onOpenEvaluate,
}) => {
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false);
  const [isLoadingCovers, setIsLoadingCovers] = useState(false);
  const [alternativeCovers, setAlternativeCovers] = useState<string[]>([]);
  const [hasFetchedCovers, setHasFetchedCovers] = useState(false);

  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCoverImageError = (failedUrl: string) => {
    setAlternativeCovers((prev) => prev.filter((u) => u !== failedUrl));
  };

  const handleOpenCoverPicker = async () => {
    if (!book) return;
    setIsCoverPickerOpen((prev) => !prev);
    if (!hasFetchedCovers) {
      const cleanBookTitle = book.title.toLowerCase().replace(/[?.,!:";]/g, '').trim();
      const initialMatch = INITIAL_BOOKS.find(
        (ib) =>
          ib.id === book.id ||
          ib.title.toLowerCase().replace(/[?.,!:";]/g, '').trim() === cleanBookTitle
      );
      const originalTitle = book.originalTitle || initialMatch?.originalTitle;

      // 1. Instant Curated Covers (0ms - zero waiting)
      const instantCurated = getCuratedCovers(book.title, book.coverUrl);
      if (instantCurated.length > 0) {
        setAlternativeCovers(instantCurated);
      }

      // If we need more covers, fetch additional ones
      if (instantCurated.length < 4) {
        setIsLoadingCovers(instantCurated.length === 0);
        const results = await fetchAlternativeCovers(book.title, book.author, book.coverUrl, originalTitle);
        setAlternativeCovers((prev) => Array.from(new Set([...prev, ...results])));
        setIsLoadingCovers(false);
      }
      setHasFetchedCovers(true);
    }
  };

  const [showCoverAlert, setShowCoverAlert] = useState(false);

  const handleSelectCover = (newCoverUrl: string) => {
    if (onUpdateCover && book) {
      onUpdateCover(book.id, newCoverUrl);
    }
    setIsCoverPickerOpen(false);
    setShowCoverAlert(true);
    setTimeout(() => setShowCoverAlert(false), 2800);
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  // Auto-reset delete confirmation after 4s
  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => setConfirmDelete(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  const handleDeleteBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (onDeleteBook && book) {
      onDeleteBook(book.id);
    }
    onClose();
  };

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

  if (!book) return null;

  // Derived inverted metrics for unified 0-10 intuitive scale (higher = better fit)
  const originalidade = Math.floor(10 - book.criteria.genericidade);

  const generateFichaText = () => {
    return `📋 VEREDITO — Ficha de Avaliação
📖 Obra: ${book.title} (${book.author})
📄 Páginas: ${book.pages} (ed. brasileira)
⭐ Nota Técnica: ${Math.floor(book.notaTecnica)}
🎯 Nota de Encaixe: ${Math.floor(book.notaEncaixe)}${userRating ? `\n👤 Sua Nota: ${userRating.rating}${userRating.tags.length > 0 ? ` (${userRating.tags.join(', ')})` : ''}` : ''}
💡 Veredito: ${book.veredito}

📝 Resumo:
${book.resumo}

🎬 Filmes: ${book.movieComparisons.slice(0, 3).join(' • ')}

📊 Critérios:
• Originalidade: ${Math.floor(originalidade)}
• Técnica / Prosa: ${Math.floor(book.criteria.qualidadeTecnica)}
• Worldbuilding: ${Math.floor(book.criteria.worldbuilding)}
• Ritmo: ${Math.floor(book.criteria.ritmo)} (${book.criteria.ritmoDescricao})
• Tom Sombrio: ${Math.floor(book.criteria.tomSombrio)}
• Impacto Emocional: ${Math.floor(book.criteria.impactoEmocional)}

🎯 Análise: ${book.justificativaEncaixe}`;
  };

  const copyFichaToClipboard = async () => {
    const text = generateFichaText();
    await navigator.clipboard.writeText(text);
  };

  const getVereditoBadge = () => {
    if (book.vereditoTipo === 'leia') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-xs border border-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>LEIA</span>
        </div>
      );
    }
    if (book.vereditoTipo === 'ressalvas') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-xs shadow-xs border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>VALE COM RESSALVAS</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white font-bold text-xs shadow-xs border border-rose-400">
        <XCircle className="w-3.5 h-3.5" />
        <span>EVITE</span>
      </div>
    );
  };

  const criteriaList = [
    {
      label: 'Originalidade',
      score: originalidade,
      icon: <Compass className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: originalidade >= 8 ? 'Inovador' : originalidade >= 5 ? 'Equilibrado' : 'Clichê',
      tone: getScoreTone(originalidade),
    },
    {
      label: 'Qualidade Técnica',
      score: book.criteria.qualidadeTecnica,
      icon: <Feather className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.qualidadeTecnica >= 8 ? 'Primorosa' : book.criteria.qualidadeTecnica >= 5 ? 'Competente' : 'Irregular',
      tone: getScoreTone(book.criteria.qualidadeTecnica),
    },
    {
      label: 'Worldbuilding',
      score: book.criteria.worldbuilding,
      icon: <BookOpen className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.worldbuilding >= 8 ? 'Imersivo' : book.criteria.worldbuilding >= 5 ? 'Funcional' : 'Minimalista',
      tone: getScoreTone(book.criteria.worldbuilding),
    },
    {
      label: 'Ritmo / Pacing',
      score: book.criteria.ritmo,
      icon: <Zap className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.ritmoDescricao || (book.criteria.ritmo >= 8 ? 'Excelente' : 'Cadenciado'),
      tone: getScoreTone(book.criteria.ritmo),
    },
    {
      label: 'Tom Sombrio',
      score: book.criteria.tomSombrio,
      icon: <Moon className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.tomSombrio >= 8 ? 'Visceral' : book.criteria.tomSombrio >= 5 ? 'Sóbrio' : 'Leve',
      tone: getScoreTone(book.criteria.tomSombrio),
    },
    {
      label: 'Impacto Emocional',
      score: book.criteria.impactoEmocional,
      icon: <HeartHandshake className="w-4 h-4 text-black stroke-[2.25]" />,
      tag: book.criteria.impactoEmocional >= 8 ? 'Profundo' : book.criteria.impactoEmocional >= 5 ? 'Sensível' : 'Neutro',
      tone: getScoreTone(book.criteria.impactoEmocional),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
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
        className="relative w-full max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-[1100px] max-h-[92vh] sm:max-h-[88vh] md:max-h-[88vh] bg-[#ffffff] border border-black/[0.08] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_65px_-15px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden text-[#1d1d1f] z-20 will-change-transform"
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
              <span>Capa alterada com sucesso!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Top Action Bar */}
        <div className="flex items-center justify-end px-6 pt-3.5 pb-2 bg-[#ffffff]/90 backdrop-blur-lg sticky top-0 z-20">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={copyFichaToClipboard}
              title="Copiar Ficha"
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
        <div className="overflow-y-auto px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 hide-scrollbar flex-1">
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start">
            
            {/* Left Column (Desktop Hero: Cover, Edition Tools & Metadata) */}
            <div className="w-full md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start space-y-3.5 md:sticky md:top-0">
              {/* Extra-Large Clean Cover */}
              <div className="w-48 sm:w-56 md:w-full max-w-[260px] mx-auto md:mx-0">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  userRating={userRating?.rating}
                />
              </div>

              {/* Cover Controls */}
              <div className="w-full max-w-[260px] flex items-center justify-between gap-2 mx-auto md:mx-0">
                <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200/90 rounded-lg text-[10px] font-score font-semibold text-[#86868b] inline-block">
                  {book.pages} págs
                </span>

                <button
                  onClick={handleOpenCoverPicker}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 text-[10px] font-semibold text-[#1d1d1f] transition-all cursor-pointer active:scale-95 shadow-2xs"
                  title="Buscar e selecionar capa alternativa"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>{isCoverPickerOpen ? 'Fechar capas' : 'Alterar capa'}</span>
                </button>
              </div>

              {/* Alternative Covers Selector Drawer with AnimatePresence */}
              <AnimatePresence>
                {isCoverPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                    className="w-full max-w-[260px] mx-auto md:mx-0 p-3 rounded-2xl bg-neutral-50/95 border border-neutral-200/90 space-y-2 shadow-xs overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                        Edições Disponíveis
                      </span>
                    </div>

                    {isLoadingCovers && alternativeCovers.length === 0 ? (
                      <div className="py-5 text-center text-xs text-[#86868b] flex flex-col items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                        <span className="text-[11px]">Buscando capas na API...</span>
                      </div>
                    ) : (
                      <>
                        {alternativeCovers.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-0.5">
                            {alternativeCovers.map((coverUrl, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleSelectCover(coverUrl)}
                                className="group relative cursor-pointer rounded-lg overflow-hidden border-2 border-neutral-200 hover:border-black transition-colors shadow-xs bg-neutral-100"
                              >
                                <img
                                  src={coverUrl}
                                  alt={`Opção ${idx + 1}`}
                                  className="w-full aspect-[2/3] object-cover"
                                  loading="lazy"
                                  onLoad={(e) => {
                                    const img = e.currentTarget;
                                    if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
                                      handleCoverImageError(coverUrl);
                                    }
                                  }}
                                  onError={() => handleCoverImageError(coverUrl)}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                  <span className="opacity-0 group-hover:opacity-100 px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold">
                                    Aplicar
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Custom Image URL Option */}
                        <div className="pt-2 border-t border-neutral-200/70">
                          {!showCustomInput ? (
                            <button
                              type="button"
                              onClick={() => setShowCustomInput(true)}
                              className="w-full py-1 text-center text-[10px] font-semibold text-[#86868b] hover:text-[#1d1d1f] hover:bg-neutral-100/70 rounded-md transition-colors cursor-pointer"
                            >
                              + Colar link de outra imagem da internet
                            </button>
                          ) : (
                            <div className="space-y-1.5 pt-0.5">
                              <label className="text-[10px] font-semibold text-[#86868b] block">
                                Cole o link direto da imagem:
                              </label>
                              <div className="flex gap-1.5">
                                <input
                                  type="url"
                                  value={customCoverUrl}
                                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                                  placeholder="https://exemplo.com/capa.jpg"
                                  autoCapitalize="none"
                                  autoCorrect="off"
                                  spellCheck={false}
                                  enterKeyHint="done"
                                  className="flex-1 px-2.5 py-1 text-[16px] sm:text-xs bg-white border border-neutral-200/90 rounded-lg text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-black"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (customCoverUrl.trim()) {
                                      handleSelectCover(customCoverUrl.trim());
                                      setCustomCoverUrl('');
                                      setShowCustomInput(false);
                                    }
                                  }}
                                  disabled={!customCoverUrl.trim()}
                                  className="px-2.5 py-1 text-[11px] font-bold bg-[#1d1d1f] text-white rounded-lg hover:bg-black disabled:opacity-40 cursor-pointer"
                                >
                                  Salvar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column (Title, Scoreboard, Veredito, Premissa, Filmes, Critérios) */}
            <div className="w-full md:col-span-8 lg:col-span-8 space-y-4 md:space-y-5 min-w-0 mt-5 md:mt-0">
              
              {/* Header: Tags, Title, Author */}
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  {book.genres.map((g, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 border border-neutral-200/80 text-[#86868b]">
                      {g}
                    </span>
                  ))}
                  {book.year && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] text-[#86868b] bg-neutral-100 border border-neutral-200/80 font-score font-semibold">
                      {book.year}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm md:text-base font-semibold text-[#86868b]">
                  {book.author}
                </p>
              </div>

              {/* Scoreboard: Apple-grade Metrics Deck */}
              <div className={`grid ${userRating ? 'grid-cols-3' : 'grid-cols-2'} gap-2 sm:gap-3`}>
                <div className="p-3 md:p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex flex-col items-center sm:items-start shadow-xs hover:border-neutral-300 transition-all">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#86868b] truncate">
                    Nota Técnica
                  </span>
                  <div className="my-1.5">
                    <ScoreBadge score={book.notaTecnica} size="lg" />
                  </div>
                  <span className="text-[8px] sm:text-[9.5px] text-[#86868b] font-medium truncate leading-tight">
                    Qualidade objetiva
                  </span>
                </div>

                <div className="p-3 md:p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex flex-col items-center sm:items-start shadow-xs hover:border-neutral-300 transition-all">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#86868b] truncate">
                    Nota de Encaixe
                  </span>
                  <div className="my-1.5">
                    <ScoreBadge score={book.notaEncaixe} size="lg" />
                  </div>
                  <span className="text-[8px] sm:text-[9.5px] text-[#86868b] font-medium truncate leading-tight">
                    Para o seu perfil
                  </span>
                </div>

                {userRating && (
                  <div
                    onClick={onOpenRateModal}
                    className="p-3 md:p-3.5 rounded-2xl bg-neutral-50/90 hover:bg-neutral-100/90 border border-neutral-200/80 flex flex-col items-center sm:items-start shadow-xs cursor-pointer transition-all active:scale-95 group/usercard"
                    title="Clique para editar sua nota"
                  >
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#86868b] truncate">
                      Sua Nota
                    </span>
                    <div className="my-1.5">
                      <ScoreBadge score={userRating.rating} size="lg" isUserRating />
                    </div>
                    <span className="text-[8px] sm:text-[9.5px] text-[#86868b] font-medium truncate leading-tight">
                      {userRating.tags.length > 0 ? userRating.tags[0] : 'Avaliado por você'}
                    </span>
                  </div>
                )}
              </div>

              {/* Veredito Direto Banner */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/70 border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                    Veredito Crítico
                  </span>
                  <p className="text-sm md:text-[15px] font-semibold text-[#1d1d1f] italic leading-snug">
                    "{book.veredito}"
                  </p>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  {getVereditoBadge()}
                </div>
              </div>

              {/* Premissa & Clima */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                  <BookOpen className="w-3.5 h-3.5 text-[#1d1d1f]" />
                  <span>Premissa & Clima</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/70">
                  {book.resumo}
                </p>
              </div>

              {/* Filmes com atmosfera equivalente */}
              {book.movieComparisons && book.movieComparisons.length > 0 && (
                <div className="p-3.5 md:p-4 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f]">
                      <Film className="w-3.5 h-3.5 text-amber-700" />
                      <span>Filmes com Atmosfera Equivalente</span>
                    </div>
                    <span className="text-[10px] text-[#86868b] font-medium">
                      {Math.min(3, book.movieComparisons.length)} {Math.min(3, book.movieComparisons.length) === 1 ? 'indicação' : 'indicações'}
                    </span>
                  </div>
                  
                  {/* Single Row of up to 3 Movie Thumbnails */}
                  <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                    {book.movieComparisons.slice(0, 3).map((movie, i) => (
                      <MovieThumb key={i} title={movie} />
                    ))}
                  </div>
                </div>
              )}

              {/* Critérios do Veredito — Telemetria Detalhada */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#86868b]">
                    <Gauge className="w-3.5 h-3.5 text-[#1d1d1f]" />
                    <span>Critérios do Veredito</span>
                  </div>
                  <span className="text-[10px] text-[#86868b] font-score font-semibold">
                    Telemetria Detalhada
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
                  {criteriaList.map((crit, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/70 transition-all space-y-2.5 shadow-2xs hover:border-neutral-300"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          {crit.icon}
                          <span className="text-sm sm:text-[14px] font-bold text-[#1d1d1f] tracking-tight truncate">
                            {crit.label}
                          </span>
                        </div>
                        <ScoreBadge score={crit.score} size="criteria" />
                      </div>

                      {/* 3D Tactile Progress Track */}
                      <div className="w-full h-3 rounded-full overflow-hidden bg-neutral-200/90 shadow-[inset_0_1.5px_2.5px_rgba(0,0,0,0.18),0_1px_1px_rgba(255,255,255,0.8)] border border-neutral-300/40 p-[1.5px]">
                        <div
                          className={`h-full rounded-full transition-all duration-300 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.25)] ${
                            crit.tone === 'green'
                              ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600'
                              : crit.tone === 'yellow'
                              ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500'
                              : 'bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(8, Math.floor(crit.score) * 10))}%` }}
                        >
                          {/* 3D Specular highlight reflection */}
                          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/55 to-transparent rounded-t-full pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-bold ${
                          crit.tone === 'green'
                            ? 'text-emerald-700'
                            : crit.tone === 'yellow'
                            ? 'text-amber-800'
                            : 'text-rose-700'
                        }`}>
                          {crit.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions — Aceternity Button System + Desktop Keyboard Hint */}
        <div className="p-3.5 sm:p-4 md:px-8 border-t border-black/[0.06] bg-[#ffffff] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-1 md:flex-initial">
            {/* 1. Avaliar Novo Livro — Botão padrão PearlButton (à esquerda) */}
            {onOpenEvaluate && (
              <PearlButton
                size="nav-rect"
                label="Avaliar"
                onClick={onOpenEvaluate}
                title="Avaliar novo livro no Veredito"
                className="shrink-0"
              />
            )}

            {/* 2. Botão "Já li" / "Sua nota · X" */}
            {onOpenRateModal && (
              <AceternityButton
                variant={userRating ? "primary" : "secondary"}
                size="md"
                onClick={onOpenRateModal}
                className={`shrink-0 ${userRating ? '!bg-neutral-900 hover:!bg-black !text-white !border-neutral-800' : ''}`}
                title={userRating ? "Editar sua avaliação deste livro" : "Registrar leitura e avaliar este livro"}
              >
                {userRating ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sua nota · {userRating.rating}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1d1d1f] stroke-[2.5] shrink-0" />
                    <span>Já li</span>
                  </>
                )}
              </AceternityButton>
            )}

            {/* 3. Salvar Button (creates/adds to Salvos shelf) */}
            {onSaveToWishlist && (
              <AceternityButton
                variant={isSaved ? "outline" : "secondary"}
                size="md"
                onClick={() => onSaveToWishlist(book)}
                className={`shrink-0 ${isSaved ? '!bg-emerald-50 !text-emerald-800 !border-emerald-300' : ''}`}
                title={isSaved ? "Salvo na sua estante" : "Salvar livro"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-800 text-emerald-800' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Salvo' : 'Salvar'}</span>
              </AceternityButton>
            )}

            {/* 4. Copiar Button with Animated Icon Swap (apenas símbolo) */}
            <CopyButton
              variant="secondary"
              size="md"
              text={generateFichaText}
              showLabel={false}
              aria-label="Copiar ficha"
              className="shrink-0 px-3.5"
            />

            {/* 5. Excluir Livro */}
            {onDeleteBook && (
              <AceternityButton
                variant="destructive"
                size="md"
                onClick={handleDeleteBook}
                title={confirmDelete ? "Clique novamente para confirmar a exclusão definitiva" : "Excluir livro do Veredito"}
                aria-label="Excluir livro"
                className={`shrink-0 ${confirmDelete ? '!bg-rose-600 !text-white !border-rose-700' : ''}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{confirmDelete ? 'Confirmar?' : 'Excluir'}</span>
              </AceternityButton>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
