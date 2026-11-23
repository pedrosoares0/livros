// TMDb API Integration Service for Brazilian Portuguese Movie Posters
// Prioritizes Portuguese (pt-BR) localized posters with robust fallbacks

import { resolveRuntimeConfig } from '../lib/utils';

const TMDB_API_KEY = resolveRuntimeConfig(
  'VITE_TMDB_API_KEY',
  'Yzc4NDU3YmZkZDQ4MGY4OTVhMmEwN2MwZjZlYjJkZjM='
);
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const CACHE_STORAGE_KEY = 'veredito_tmdb_posters_cache';

// In-memory cache for ultra-fast synchronous lookup
const posterMemoryCache: Record<string, string> = {};
const inflightRequests = new Map<string, Promise<string | null>>();
let posterFlushTimer: ReturnType<typeof setTimeout> | null = null;

// Load cache from localStorage
try {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(CACHE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(posterMemoryCache, parsed);
    }
  }
} catch {
  // Ignore localStorage issues
}

const saveToCache = (key: string, url: string) => {
  posterMemoryCache[key] = url;
  if (typeof window === 'undefined') return;
  if (posterFlushTimer) clearTimeout(posterFlushTimer);
  posterFlushTimer = setTimeout(() => {
    posterFlushTimer = null;
    try {
      localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(posterMemoryCache));
    } catch {
      // Ignore storage quota
    }
  }, 0);
};

// Curated high-res fallbacks for cinema classics and Brazilian cinema
const CURATED_POSTERS: Record<string, string> = {
  'o auto da compadecida': 'https://image.tmdb.org/t/p/w500/y3IhuITELtprMhUd7bccu629rba.jpg',
  'bacurau': 'https://image.tmdb.org/t/p/w500/qvmLAVqNB5TbGUa9QqQvXiFC4UR.jpg',
  'seven': 'https://image.tmdb.org/t/p/w500/rEevavl5vebCVEd5imx7D1k8nmV.jpg',
  'se7en': 'https://image.tmdb.org/t/p/w500/rEevavl5vebCVEd5imx7D1k8nmV.jpg',
  'blade runner 2049': 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
  'blade runner': 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg',
  'interestelar': 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'interstellar': 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'a chegada': 'https://image.tmdb.org/t/p/w500/hLudzvGfpi6Jj7O22nTAAgK3Uox.jpg',
  'arrival': 'https://image.tmdb.org/t/p/w500/hLudzvGfpi6Jj7O22nTAAgK3Uox.jpg',
  'matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  'the matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  'duna': 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  'dune': 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  'o poderoso chefão': 'https://image.tmdb.org/t/p/w500/oJagOzBu9Rdd9FuSpCHGFUDha9d.jpg',
  'apocalypse now': 'https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg',
  'chernobyl': 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
};

// Normalize title for caching and matching
export const normalizeMovieTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/[:\-—]/g, ' ')
    .trim();
};

/**
 * Synchronous lookup from memory/localStorage cache
 */
export function getMoviePosterUrl(movieTitle: string): string | null {
  if (!movieTitle) return null;
  const key = normalizeMovieTitle(movieTitle);
  if (posterMemoryCache[key]) {
    return posterMemoryCache[key];
  }
  for (const [cKey, url] of Object.entries(CURATED_POSTERS)) {
    if (key.includes(cKey) || cKey.includes(key)) {
      return url;
    }
  }
  return null;
}

export async function fetchMoviePoster(movieTitle: string): Promise<string | null> {
  if (!movieTitle) return null;
  const cleanTitle = normalizeMovieTitle(movieTitle);

  const cached = getMoviePosterUrl(cleanTitle);
  if (cached) return cached;

  const existing = inflightRequests.get(cleanTitle);
  if (existing) return existing;

  const requestPromise = (async (): Promise<string | null> => {
    try {
      const searchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        cleanTitle
      )}&language=pt-BR`;
      const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(3500) });
      if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

      const searchData = await searchRes.json();
      const movie = searchData.results?.[0];
      if (!movie || !movie.id) {
        for (const [cKey, url] of Object.entries(CURATED_POSTERS)) {
          if (cleanTitle.includes(cKey) || cKey.includes(cleanTitle)) {
            saveToCache(cleanTitle, url);
            return url;
          }
        }
        return null;
      }

      const detailsUrl = `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=images&include_image_language=pt,en,null`;
      const detailsRes = await fetch(detailsUrl, { signal: AbortSignal.timeout(3500) });
      if (!detailsRes.ok) throw new Error(`Details failed: ${detailsRes.status}`);

      const detailsData = await detailsRes.json();
      const posters: Array<{ file_path: string; iso_639_1: string | null }> =
        detailsData.images?.posters || [];

      const ptPoster = posters.find((p) => p.iso_639_1 === 'pt');
      const enPoster = posters.find((p) => p.iso_639_1 === 'en');
      const nullPoster = posters.find((p) => p.iso_639_1 === null || !p.iso_639_1);

      const chosen =
        ptPoster ||
        enPoster ||
        nullPoster ||
        (detailsData.poster_path ? { file_path: detailsData.poster_path } : null);

      if (chosen && chosen.file_path) {
        const fullUrl = `${TMDB_IMAGE_BASE}${chosen.file_path}`;
        saveToCache(cleanTitle, fullUrl);
        return fullUrl;
      }
    } catch (err) {
      console.warn(`TMDb lookup notice for "${cleanTitle}":`, err);
    }

    for (const [cKey, url] of Object.entries(CURATED_POSTERS)) {
      if (cleanTitle.includes(cKey) || cKey.includes(cleanTitle)) {
        saveToCache(cleanTitle, url);
        return url;
      }
    }

    return null;
  })().finally(() => {
    inflightRequests.delete(cleanTitle);
  });

  inflightRequests.set(cleanTitle, requestPromise);
  return requestPromise;
}
