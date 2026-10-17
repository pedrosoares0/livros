import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { getMoviePosterUrl } from '../services/moviePosters';

interface MovieThumbProps {
  title: string;
  className?: string;
}

export const MovieThumb: React.FC<MovieThumbProps> = ({ title, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const posterUrl = getMoviePosterUrl(title);

  return (
    <div
      className={`group relative flex flex-col items-center overflow-hidden rounded-xl bg-neutral-900 border border-black/10 shadow-xs transition-all hover:scale-[1.02] ${className}`}
    >
      {/* Poster Image Container */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950 flex items-center justify-center">
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full p-2 flex flex-col items-center justify-center text-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950">
            <Film className="w-5 h-5 text-amber-400/80 mb-1" />
            <span className="text-[10px] font-bold text-white/90 line-clamp-2 px-1">
              {title}
            </span>
          </div>
        )}
        
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

        {/* Small badge inside thumbnail */}
        <div className="absolute bottom-1 left-1 right-1 text-center pointer-events-none">
          <span className="text-[9px] font-semibold text-white/95 leading-tight line-clamp-1 drop-shadow-sm px-1">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};
