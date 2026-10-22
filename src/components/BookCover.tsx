import React, { useState } from 'react';
import { ScoreBadge } from './ScoreBadge';

interface BookCoverProps {
  title: string;
  author: string;
  coverUrl?: string;
  notaEncaixe?: number;
  className?: string;
}

const COVER_PALETTES = [
  { bg: 'from-amber-950 via-stone-900 to-black', text: 'text-amber-200', border: 'border-amber-500/30' },
  { bg: 'from-blue-950 via-slate-900 to-black', text: 'text-sky-200', border: 'border-sky-500/30' },
  { bg: 'from-emerald-950 via-zinc-900 to-black', text: 'text-emerald-200', border: 'border-emerald-500/30' },
  { bg: 'from-purple-950 via-neutral-900 to-black', text: 'text-purple-200', border: 'border-purple-500/30' },
  { bg: 'from-red-950 via-stone-900 to-black', text: 'text-rose-200', border: 'border-rose-500/30' },
];

export const BookCover: React.FC<BookCoverProps> = React.memo(({
  title,
  author,
  coverUrl,
  notaEncaixe,
  className = '',
}) => {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  const hasError = Boolean(coverUrl && failedUrl === coverUrl);
  const isLoaded = Boolean(coverUrl && loadedUrl === coverUrl);

  // Deterministic palette based on title hash for fallback
  const charSum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const palette = COVER_PALETTES[charSum % COVER_PALETTES.length];

  return (
    <div
      className={`relative rounded-[3px] select-none transition-all duration-300 bg-neutral-100 ${className}`}
      style={{
        aspectRatio: '2 / 3',
        // Directional drop shadow falling distinctly to the right and bottom, matching reference image
        boxShadow:
          '2px 4px 10px -1px rgba(0, 0, 0, 0.20), 7px 14px 28px -2px rgba(0, 0, 0, 0.22), 12px 24px 38px -4px rgba(0, 0, 0, 0.14)',
      }}
    >
      {/* Outer hardcover clip wrapper to maintain crisp 3px corners without clipping outer shadow */}
      <div className="relative w-full h-full rounded-[3px] overflow-hidden">
        {/* Real Image or Typographic Leather Cover */}
        {!hasError && coverUrl ? (
          <img
            key={coverUrl}
            src={coverUrl}
            alt={title}
            onLoad={(e) => {
              const img = e.currentTarget;
              // Open Library returns 1x1 pixel gif when cover does not exist
              if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
                setFailedUrl(coverUrl);
              } else {
                setLoadedUrl(coverUrl);
              }
            }}
            onError={() => setFailedUrl(coverUrl)}
            className={`w-full h-full object-cover select-none pointer-events-none transition-opacity duration-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${palette.bg} p-3 flex flex-col justify-between border ${palette.border} relative overflow-hidden`}
          >
            {/* Subtle cloth texture overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />

            {/* Top ornamental line */}
            <div className="border-b border-white/20 pb-1 z-10">
              <span className="text-[8px] uppercase tracking-widest text-neutral-400 font-mono block truncate">
                {author}
              </span>
            </div>

            {/* Title */}
            <div className="my-auto z-10 py-1">
              <h4
                className={`text-xs font-serif font-bold ${palette.text} leading-tight line-clamp-3 tracking-tight`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {title}
              </h4>
            </div>

            {/* Bottom ornament */}
            <div className="border-t border-white/20 pt-1 flex items-center justify-between z-10">
              <span className="text-[7px] text-neutral-400 font-mono uppercase">
                Veredito
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>
        )}

        {/* --- PHYSICAL HARDCOVER SPINE & HINGE CREASE (MATCHING REFERENCE IMAGE) --- */}

        {/* 1. Curved spine cylinder effect on far-left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-[5%] min-w-[7px] max-w-[12px] pointer-events-none bg-gradient-to-r from-black/30 via-white/10 to-transparent z-10" />

        {/* 2. Authentic hardcover joint crease (vinca / canaleta de encadernação) */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none z-10 flex"
          style={{ left: '5.2%' }}
        >
          {/* Crease shadow groove */}
          <div className="w-[1.5px] h-full bg-black/45 shadow-[0_0_1px_rgba(0,0,0,0.6)]" />
          {/* Specular ridge highlight line */}
          <div className="w-[1px] h-full bg-white/40" />
          {/* Soft falloff shadow transitioning onto front cover */}
          <div className="w-2.5 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
        </div>

        {/* 3. Subtle Right & Top Board Thickness Rim Highlight */}
        <div className="absolute top-0 bottom-0 right-0 w-[1px] pointer-events-none bg-white/25 z-10" />
        <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none bg-gradient-to-r from-white/35 via-white/15 to-transparent z-10" />

        {/* 4. Delicate overall sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-10" />

        {/* Fit Score Badge on Cover */}
        {notaEncaixe !== undefined && (
          <div className="absolute top-1.5 right-1.5 z-20">
            <ScoreBadge score={notaEncaixe} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
});

BookCover.displayName = 'BookCover';
