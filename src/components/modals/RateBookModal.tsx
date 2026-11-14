import React, { useState, useMemo, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Check } from 'lucide-react';
import { BookEvaluation, UserRating } from '../../types';
import { getPillsForRating, getRatingBand, RatingBand } from '../../services/ratings';
import { AceternityButton } from '../ui/AceternityButton';

interface RateBookModalProps {
  isOpen: boolean;
  book: BookEvaluation | null;
  existingRating?: UserRating | null;
  onClose: () => void;
  onSaveRating: (rating: number, tags: string[]) => void;
  onDeleteRating?: () => void;
}

interface ColorSettings {
  text: string;
  gradient: string;
  thumbBg: string;
}

const MIN_RATING = 1;
const MAX_RATING = 10;
const STEP = 1;

const getColorSettings = (value: number): ColorSettings => {
  if (value <= 4) {
    return {
      text: '#e11d48', // rose-600
      gradient: 'linear-gradient(to right, #fb7185, #e11d48)',
      thumbBg: '#e11d48',
    };
  } else if (value <= 7) {
    return {
      text: '#d97706', // amber-600
      gradient: 'linear-gradient(to right, #fbbf24, #d97706)',
      thumbBg: '#d97706',
    };
  } else {
    return {
      text: '#059669', // emerald-600
      gradient: 'linear-gradient(to right, #34d399, #059669)',
      thumbBg: '#059669',
    };
  }
};

const getBandDescriptor = (value: number): string => {
  if (value >= 9) return 'Obra-prima imperdível';
  if (value === 8) return 'Excelente recomendação';
  if (value === 7) return 'Muito boa leitura';
  if (value === 6) return 'Experiência aceitável';
  if (value === 5) return 'Regular com ressalvas';
  if (value === 4) return 'Abaixo do esperado';
  if (value === 3) return 'Decepcionante';
  return 'Zona de rejeição';
};

export const RateBookModal: React.FC<RateBookModalProps> = ({
  isOpen,
  book,
  existingRating,
  onClose,
  onSaveRating,
  onDeleteRating,
}) => {
  const [rating, setRating] = useState<number>(() => existingRating?.rating ?? 8);
  const [selectedTags, setSelectedTags] = useState<string[]>(() => existingRating?.tags ?? []);
  const [hasInteracted, setHasInteracted] = useState<boolean>(() => Boolean(existingRating));

  // Current band based on rating (1-5: low, 6-7: mid, 8-10: high)
  const currentBand: RatingBand = useMemo(() => getRatingBand(rating), [rating]);
  const availablePills = useMemo(() => getPillsForRating(rating), [rating]);

  const colorSettings = useMemo(() => getColorSettings(rating), [rating]);
  const percentage = ((rating - MIN_RATING) / (MAX_RATING - MIN_RATING)) * 100;

  // Discrete 10-step dots for slider track
  const dots = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="z-10 h-1 w-1 rounded-full bg-neutral-300 transition-colors"
          style={{ opacity: 0.7 }}
        />
      )),
    []
  );

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newBand = getRatingBand(val);
    const nextPills = getPillsForRating(val);
    
    // Clear tags if changing bands (Q11: pills are exclusive to each rating band)
    if (newBand !== currentBand) {
      setSelectedTags([]);
    } else {
      // Retém apenas tags compatíveis com o novo valor (ex: "Perfeito" só existe no 10)
      setSelectedTags((prev) => prev.filter((t) => nextPills.includes(t)));
    }

    setRating(val);
    setHasInteracted(true);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRating(rating, selectedTags);
    onClose();
  };

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs z-10 cursor-pointer"
      />

      {/* Sheet / Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-black/[0.08] flex flex-col overflow-hidden text-[#1d1d1f] z-20 max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-3 min-w-0">
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-8 h-12 object-cover rounded-md shadow-xs shrink-0"
              />
            )}
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
                Sua Avaliação Pessoal
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] truncate">
                {book.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto hide-scrollbar">
          {/* Big Score Display */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={rating} color={colorSettings.text} />
              <span className="text-xl font-bold text-neutral-400 select-none">/ 10</span>
            </div>
            <motion.span
              key={rating}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-semibold mt-1 tracking-tight"
              style={{ color: colorSettings.text }}
            >
              {getBandDescriptor(rating)}
            </motion.span>
          </div>

          {/* Adaptive Slider (Flat, smooth, performant) */}
          <div className="px-2">
            <div className="relative flex h-12 w-full items-center overflow-hidden rounded-full bg-neutral-100 select-none">
              {/* Discrete step dots */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 sm:px-6">
                {dots}
              </div>

              {/* Colored fill bar */}
              <div
                className="pointer-events-none absolute top-0 left-0 h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `calc((${percentage} / 100) * (100% - 40px) + 40px)`,
                  background: colorSettings.gradient,
                }}
              />

              {/* HTML range input (full overlay) */}
              <input
                type="range"
                min={MIN_RATING}
                max={MAX_RATING}
                step={STEP}
                value={rating}
                onChange={handleSliderChange}
                aria-label="Nota de 1 a 10"
                className="absolute inset-0 z-30 h-full w-full cursor-pointer opacity-0"
              />

              {/* Thumb */}
              <div
                className="pointer-events-none absolute top-0 z-20 flex size-12 items-center justify-center rounded-full transition-all duration-150 ease-out"
                style={{
                  left: `calc((${percentage} / 100) * (100% - 48px))`,
                }}
              >
                <div className="size-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] border border-black/5 flex items-center justify-center" />
              </div>
            </div>

            {/* Scale numbers guide */}
            <div className="flex justify-between items-center text-[11px] font-bold text-neutral-400 px-2 pt-2 select-none">
              <span>1</span>
              <span>3</span>
              <span>5</span>
              <span>7</span>
              <span>10</span>
            </div>
          </div>

          {/* Pills / Tags Section */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868b]">
                Sensações da leitura <span className="text-neutral-400 font-normal lowercase">(opcional)</span>
              </span>
              {selectedTags.length > 0 && (
                <span className="text-[10px] font-semibold text-neutral-500">
                  {selectedTags.length} selecionada{selectedTags.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {availablePills.map((pill) => {
                const isSelected = selectedTags.includes(pill);
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => toggleTag(pill)}
                    className={`h-8 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs'
                        : 'bg-white text-[#636366] hover:text-[#1d1d1f] border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50 shadow-3xs'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                    <span>{pill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 space-y-2.5">
            <AceternityButton
              variant="primary"
              size="md"
              type="submit"
              disabled={!hasInteracted}
              className="w-full !py-3 !text-sm font-bold"
            >
              <span>{existingRating ? 'Salvar alterações' : 'Registrar leitura'}</span>
            </AceternityButton>

            {existingRating && onDeleteRating && (
              <button
                type="button"
                onClick={() => {
                  onDeleteRating();
                  onClose();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover minha nota deste livro</span>
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Fluid animated number display using motion
const AnimatedNumber: React.FC<{ value: number; color: string }> = ({ value, color }) => {
  return (
    <div className="flex text-5xl sm:text-6xl font-black tracking-tight select-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{ color }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RateBookModal;
