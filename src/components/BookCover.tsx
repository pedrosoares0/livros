import React, { useState, useCallback } from 'react';
import { ScoreBadge } from './ui/ScoreBadge';

interface BookCoverProps {
  title: string;
  author: string;
  coverUrl?: string;
  notaEncaixe?: number;
  userRating?: number;
  className?: string;
  enable3d?: boolean;
}

const COVER_PALETTES = [
  { stripe: '#f59e0b', accent: '#b45309' },
  { stripe: '#0070f3', accent: '#0369a1' },
  { stripe: '#10b981', accent: '#047857' },
  { stripe: '#6366f1', accent: '#4338ca' },
  { stripe: '#e5484d', accent: '#b91c1c' },
  { stripe: '#27272a', accent: '#18181b' },
];

// Cache em memória de URLs já validadas: elimina cascata de re-renders (opacity 0 -> 100) ao montar ou trocar abas
const loadedCoverUrls = new Set<string>();
const failedCoverUrls = new Set<string>();

export function markCoverLoaded(url: string) {
  if (!url) return;
  if (loadedCoverUrls.size > 600) {
    const first = loadedCoverUrls.values().next().value;
    if (first) loadedCoverUrls.delete(first);
  }
  loadedCoverUrls.add(url);
}

export const BookCover: React.FC<BookCoverProps> = React.memo(({
  title,
  author,
  coverUrl,
  notaEncaixe,
  userRating,
  className = '',
  enable3d = true,
}) => {
  const [failedUrl, setFailedUrl] = useState<string | null>(() =>
    coverUrl && failedCoverUrls.has(coverUrl) ? coverUrl : null
  );
  const [loadedUrl, setLoadedUrl] = useState<string | null>(() =>
    coverUrl && loadedCoverUrls.has(coverUrl) ? coverUrl : null
  );

  const hasError = Boolean(coverUrl && (failedUrl === coverUrl || failedCoverUrls.has(coverUrl)));
  const isLoaded = Boolean(coverUrl && (loadedUrl === coverUrl || loadedCoverUrls.has(coverUrl)));

  // Se o navegador já tem a imagem decodificada em cache HTTP, marca síncronamente na montagem
  const handleImgRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img || !coverUrl) return;
      if (img.complete && img.naturalWidth > 0) {
        if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
          failedCoverUrls.add(coverUrl);
          if (failedUrl !== coverUrl) setFailedUrl(coverUrl);
        } else {
          markCoverLoaded(coverUrl);
          if (!loadedCoverUrls.has(coverUrl) || loadedUrl !== coverUrl) {
            setLoadedUrl(coverUrl);
          }
        }
      }
    },
    [coverUrl, failedUrl, loadedUrl]
  );

  let charSum = 0;
  for (let i = 0; i < title.length; i++) {
    charSum += title.charCodeAt(i);
  }
  const palette = COVER_PALETTES[charSum % COVER_PALETTES.length];

  return (
    <div className={`relative select-none ${enable3d ? 'book-3d-stage' : ''} ${className}`}>
      <div className={enable3d ? 'book-3d-body' : 'relative w-full aspect-[2/3]'}>
        {/* Front Hardcover Face */}
        <div className="book-3d-front bg-neutral-100">
          {/* Real Image or Geist-inspired Typographic Stripe Cover */}
          {!hasError && coverUrl ? (
            <img
              ref={handleImgRef}
              key={coverUrl}
              src={coverUrl}
              alt={title}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
                  failedCoverUrls.add(coverUrl);
                  setFailedUrl(coverUrl);
                } else {
                  markCoverLoaded(coverUrl);
                  setLoadedUrl(coverUrl);
                }
              }}
              onError={() => {
                failedCoverUrls.add(coverUrl);
                setFailedUrl(coverUrl);
              }}
              className={`w-full h-full object-cover select-none pointer-events-none transition-opacity duration-150 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col bg-[#fafafa]">
              {/* Upper colored stripe band */}
              <div
                className="relative flex-1 w-full overflow-hidden"
                style={{ backgroundColor: palette.stripe }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 85% 20%, rgba(255,255,255,0.45), transparent 55%), linear-gradient(135deg, transparent 40%, ${palette.accent} 100%)`,
                  }}
                />
              </div>

              {/* Lower paper gradient band with editorial typography */}
              <div
                className="relative flex-1 w-full flex flex-col justify-between p-[8%] pl-[14.3%]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f3f3f5 100%)',
                }}
              >
                <div className="space-y-1 min-w-0">
                  <span className="block text-[7cqw] leading-[1.2] tracking-[-0.02em] font-semibold text-[#1d1d1f] line-clamp-3 text-balance">
                    {title}
                  </span>
                  <span className="block text-[5cqw] leading-tight text-[#6e6e73] truncate">
                    {author}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <svg className="w-[10cqw] h-[10cqw] fill-[#1d1d1f]/85" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21,21H3L12,3Z" />
                  </svg>
                  <span className="text-[4.2cqw] font-mono uppercase tracking-wider text-[#86868b]">
                    Veredito
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Geist Book Bind / Spine Crease (8.2% left gutter) */}
          <div className="book-3d-bind" />

          {/* Delicate overall specular sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.14] pointer-events-none z-10" />

          {/* Fit Score or User Rating Badge on Cover */}
          {userRating !== undefined ? (
            <div className="absolute top-1.5 right-1.5 z-20">
              <ScoreBadge score={userRating} size="sm" isUserRating />
            </div>
          ) : notaEncaixe !== undefined ? (
            <div className="absolute top-1.5 right-1.5 z-20">
              <ScoreBadge score={notaEncaixe} size="sm" />
            </div>
          ) : null}
        </div>

        {/* 3D Stacked Paper Pages Edge & Back Cover (visible only on hover) */}
        {enable3d && (
          <>
            <div className="book-3d-pages" aria-hidden="true" />
            <div className="book-3d-back" aria-hidden="true" />
          </>
        )}
      </div>
    </div>
  );
});

BookCover.displayName = 'BookCover';
