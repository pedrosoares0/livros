import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { getMoviePosterUrl, fetchMoviePoster } from '../services/moviePosters';

interface MovieThumbProps {
  title: string;
  className?: string;
}

export const MovieThumb: React.FC<MovieThumbProps> = React.memo(({ title, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(() => getMoviePosterUrl(title));
  const [isLoading, setIsLoading] = useState(() => !getMoviePosterUrl(title));

  useEffect(() => {
    let isMounted = true;
    const initial = getMoviePosterUrl(title);
    if (initial) {
      setPosterUrl(initial);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchMoviePoster(title).then((url) => {
      if (isMounted) {
        setPosterUrl(url);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [title]);

  return (
    <div
      className={`group relative flex flex-col items-center overflow-hidden rounded-xl bg-neutral-900 border border-black/10 shadow-sm transition-all hover:scale-[1.02] ${className}`}
    >
      {/* Poster Image Container (2:3 aspect ratio) */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950 flex items-center justify-center">
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : isLoading ? (
          /* Subtle Apple Shimmer Skeleton */
          <div className="w-full h-full bg-neutral-800 animate-pulse flex flex-col items-center justify-center p-2 text-center">
            <Film className="w-4 h-4 text-neutral-600 mb-1" />
            <span className="text-[9px] text-neutral-500 font-medium line-clamp-1 px-1">
              {title}
            </span>
          </div>
        ) : (
          <div className="w-full h-full p-2 flex flex-col items-center justify-center text-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950">
            <Film className="w-5 h-5 text-amber-400/80 mb-1" />
            <span className="text-[10px] font-bold text-white/90 line-clamp-2 px-1">
              {title}
            </span>
          </div>
        )}

        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15 pointer-events-none" />

        {/* Movie Title pill at bottom */}
        <div className="absolute bottom-1.5 left-1 right-1 text-center pointer-events-none">
          <span className="text-[10px] font-semibold text-white/95 leading-tight line-clamp-1 drop-shadow px-1">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
});

MovieThumb.displayName = 'MovieThumb';
