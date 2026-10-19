// TMDb API Integration Service for Brazilian Portuguese Movie Posters
// Prioritizes Portuguese (pt-BR) localized posters with robust fallbacks

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const CACHE_STORAGE_KEY = 'veredito_tmdb_posters_cache';

// In-memory cache for ultra-fast synchronous lookup
const posterMemoryCache: Record<string, string> = {};

// Load cache from localStorage
try {
  const stored = localStorage.getItem(CACHE_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(posterMemoryCache, parsed);
  }
} catch {
  // Ignore localStorage issues
}

const saveToCache = (key: string, url: string) => {
  posterMemoryCache[key] = url;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(posterMemoryCache));
  } catch {
    // Ignore storage quota
  }
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
  'aftersun': 'https://image.tmdb.org/t/p/w500/s67mZ9rLwz3fG3zY3gEwE30U3bW.jpg',
  'manchester à beira-mar': 'https://image.tmdb.org/t/p/w500/g4b9P2zE55L14W8k3N1l2f4k5hZ.jpg',
  'o farol': 'https://image.tmdb.org/t/p/w500/3U6F0G4Qd0G4aT9Tj7jB8bB7d7h.jpg',
  'o labirinto do fauno': 'https://image.tmdb.org/t/p/w500/hQ7o1r5jLwD4K2jY8c7L3k5hF3.jpg',
};

// Normalize title for caching and matching
export const normalizeMovieTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // remove "(1963)" or "(Memento)"
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

/**
 * Asynchronous fetch from TMDb API strictly following priority:
 * 1. Request with language=pt-BR, append_to_response=images, include_image_language=pt,en,null
 * 2. Priority:
 *    - 1º: Poster with iso_639_1 === "pt"
 *    - 2º: Fallback to iso_639_1 === "en"
 *    - 3º: Fallback to iso_639_1 === null / neutral
 *    - 4º: Fallback to movie.poster_path
 */
export async function fetchMoviePoster(movieTitle: string): Promise<string | null> {
  if (!movieTitle) return null;
  const cleanTitle = normalizeMovieTitle(movieTitle);

  // Check cache first
  const cached = getMoviePosterUrl(cleanTitle);
  if (cached) return cached;

  try {
    // Step 1: Search movie on TMDb
    const searchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      cleanTitle
    )}&language=pt-BR`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`);

    const searchData = await searchRes.json();
    const movie = searchData.results?.[0];
    if (!movie || !movie.id) {
      // Fallback: check curated dictionary
      for (const [cKey, url] of Object.entries(CURATED_POSTERS)) {
        if (cleanTitle.includes(cKey) || cKey.includes(cleanTitle)) {
          saveToCache(cleanTitle, url);
          return url;
        }
      }
      return null;
    }

    // Step 2: Fetch movie images with append_to_response=images & include_image_language=pt,en,null
    const detailsUrl = `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=images&include_image_language=pt,en,null`;
    const detailsRes = await fetch(detailsUrl);
    if (!detailsRes.ok) throw new Error(`Details failed: ${detailsRes.status}`);

    const detailsData = await detailsRes.json();
    const posters: Array<{ file_path: string; iso_639_1: string | null }> =
      detailsData.images?.posters || [];

    // Prioridade da imagem:
    // 1º: Pôster com iso_639_1 === "pt"
    const ptPoster = posters.find((p) => p.iso_639_1 === 'pt');
    // 2º: Fallback para inglês (iso_639_1 === "en")
    const enPoster = posters.find((p) => p.iso_639_1 === 'en');
    // 3º: Fallback para pôster sem idioma de texto (iso_639_1 === null)
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

  // Fallback to curated dictionary if network error
  for (const [cKey, url] of Object.entries(CURATED_POSTERS)) {
    if (cleanTitle.includes(cKey) || cKey.includes(cleanTitle)) {
      saveToCache(cleanTitle, url);
      return url;
    }
  }

  return null;
}
