import { getCuratedCovers } from '../data/curatedCovers';
import { POPULAR_SUGGESTIONS_POOL } from '../data/suggestionBooks';
import { CHARACTER_EXTRA_BOOKS } from '../data/characterReadings';
import { INITIAL_BOOKS } from '../data/initialBooks';

/**
 * Robust cover search & verification engine with instant curated/catalog fallback,
 * Apple Books BR cover lookup, and title/author-validated Open Library resolution.
 */

const KNOWN_TITLE_ALIASES: Record<string, string> = {
  'de quanta terra precisa o homem': 'How Much Land Does a Man Need Tolstoy',
  'senhor das moscas': 'Lord of the Flies Golding',
  'o estranho misterioso': 'The Mysterious Stranger Mark Twain',
  'o cair da noite': 'Nightfall Isaac Asimov',
  'os contos de beedle o bardo': 'The Tales of Beedle the Bard Rowling',
  'a morte de ivan ilitch': 'The Death of Ivan Ilyich Tolstoy',
  'kallocaina': 'Kallocain Karin Boye',
  'a guerra da papoula': 'The Poppy War Kuang',
  'patinando no amor': 'Icebreaker Hannah Grace',
  'o inferno de dante': 'Inferno Dante Alighieri',
  'noites brancas': 'White Nights Dostoevsky',
  'entre quatro paredes': 'Huis Clos Sartre',
  'diario de um homem superfluo': 'The Diary of a Superfluous Man Turgenev',
  'a menina do outro lado': 'The Girl from the Other Side Nagabe',
  'flores para algernon': 'Flowers for Algernon Daniel Keyes',
  'a revolucao dos bichos': 'Animal Farm George Orwell',
  'o gato preto': 'The Black Cat Edgar Allan Poe',
  'historia da sua vida': 'Story of Your Life Ted Chiang',
  'a cabeca do santo': 'The Head of the Saint Socorro Acioli',
  'encontro com rama': 'Rendezvous with Rama Arthur C Clarke',
  'as fontes do paraiso': 'The Fountains of Paradise Arthur C Clarke',
  'neuromancer': 'Neuromancer William Gibson',
  'duna': 'Dune Frank Herbert',
  'quarta asa': 'Fourth Wing Rebecca Yarros',
  'a quarta asa': 'Fourth Wing Rebecca Yarros',
  'fourth wing': 'Fourth Wing Rebecca Yarros',
  'o alienista': 'O Alienista Machado de Assis',
  'o nariz': 'The Nose Nikolai Gogol',
};

const STOPWORDS = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
  'e', 'em', 'no', 'na', 'nos', 'nas', 'ao', 'aos', 'com', 'sem', 'por',
  'the', 'of', 'and', 'in', 'to', 'for',
]);

const AUTHOR_TRANSLIT_ALIASES: Record<string, string[]> = {
  dostoievski: ['dostoevsky', 'dostoyevsky'],
  tolstoi: ['tolstoy'],
  soljenitsin: ['solzhenitsyn'],
  homero: ['homer'],
  aurelio: ['aurelius'],
  turgueniev: ['turgenev'],
  gogol: ['gógol'],
};

const normalize = (text: string) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function sigWords(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function isAuthorCompatible(expectedAuthor?: string, foundAuthor?: string): boolean {
  if (!expectedAuthor || !foundAuthor) return !expectedAuthor;
  const cleanExp = normalize(expectedAuthor);
  if (!cleanExp || cleanExp === 'autor a verificar' || cleanExp === 'autor a consultar') {
    return true;
  }
  const nf = normalize(foundAuthor);
  const parts = expectedAuthor.split(/[&,]/).map((p) => normalize(p)).filter(Boolean);
  for (const part of parts) {
    const words = part.split(' ').filter((w) => w.length > 2);
    const last = words[words.length - 1];
    if (!last) continue;
    if (nf.includes(last)) return true;
    for (const alias of AUTHOR_TRANSLIT_ALIASES[last] || []) {
      if (nf.includes(alias)) return true;
    }
  }
  return false;
}

function scoreTitleMatch(expectedTitle: string, foundTitle: string, originalTitle?: string): number {
  const nf = normalize(foundTitle);
  if (!nf) return 0;
  if (/\b(resumo|guia de estudo|study guide|fichamento|workbook|summary)\b/.test(nf)) {
    if (!/\b(resumo|guia)\b/.test(normalize(expectedTitle))) return 0;
  }

  const candidates = [expectedTitle, originalTitle].filter(Boolean) as string[];
  let best = 0;
  for (const target of candidates) {
    const nt = normalize(target);
    if (!nt) continue;
    if (nf === nt) return 100;
    if (nf.startsWith(`${nt} `) || nf.startsWith(`${nt}:`)) best = Math.max(best, 90);
    const ew = sigWords(target);
    const fw = new Set(nf.split(' '));
    if (ew.length > 0 && ew.every((w) => fw.has(w))) {
      best = Math.max(best, 80 - Math.max(0, fw.size - ew.length) * 3);
    }
  }
  return best;
}

// Catalog index built once for 0ms verified cover lookup
let catalogCoverIndex: Map<string, { coverUrl: string; author: string }[]> | null = null;

function getCatalogCoverIndex() {
  if (catalogCoverIndex) return catalogCoverIndex;
  catalogCoverIndex = new Map();
  const pools = [...INITIAL_BOOKS, ...POPULAR_SUGGESTIONS_POOL, ...CHARACTER_EXTRA_BOOKS];
  for (const b of pools) {
    if (!b.title || !b.coverUrl) continue;
    const keys = [normalize(b.title), b.originalTitle ? normalize(b.originalTitle) : ''].filter(Boolean);
    for (const key of keys) {
      const arr = catalogCoverIndex.get(key) || [];
      if (!arr.some((x) => x.coverUrl === b.coverUrl)) {
        arr.push({ coverUrl: b.coverUrl, author: b.author || '' });
      }
      catalogCoverIndex.set(key, arr);
    }
  }
  return catalogCoverIndex;
}

export function findVerifiedCatalogCover(title: string, author?: string): string | undefined {
  const curated = getCuratedCovers(title);
  if (curated.length > 0) return curated[0];

  const key = normalize(title);
  if (!key) return undefined;
  const entries = getCatalogCoverIndex().get(key);
  if (!entries || entries.length === 0) return undefined;

  if (author) {
    const byAuthor = entries.find((e) => isAuthorCompatible(author, e.author));
    if (byAuthor) return byAuthor.coverUrl;
  }
  return entries[0].coverUrl;
}

// In-memory cache for instant cover retrieval on subsequent opens
const coverMemoryCache = new Map<string, string[]>();
const verifiedSingleCoverCache = new Map<string, string>();

async function fetchAppleBooksCover(
  title: string,
  author?: string,
  signal?: AbortSignal
): Promise<string | null> {
  const lastAuthor = author ? author.split(/[&,]/)[0].trim().split(' ').pop() || '' : '';
  const query =
    lastAuthor && !/verificar|consultar/i.test(author || '')
      ? `${title} ${lastAuthor}`.trim()
      : title.trim();

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer);
        return null;
      }
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=br&media=ebook&limit=6`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    let bestUrl: string | null = null;
    let bestScore = 0;

    for (const item of data?.results || []) {
      if (!item?.trackName || !item?.artworkUrl100) continue;
      if (author && !isAuthorCompatible(author, item.artistName)) continue;
      const sc = scoreTitleMatch(title, item.trackName);
      if (sc > bestScore && sc >= 55) {
        bestScore = sc;
        bestUrl = String(item.artworkUrl100).replace(/100x100bb/i, '600x900bb');
      }
    }
    return bestUrl;
  } catch {
    return null;
  }
}

/**
 * Resolves a single verified book cover for search results or new evaluations.
 * Priority: Curated/Catalog pools (0ms) -> Apple Books BR -> OpenLibrary (title+author verified).
 */
export async function fetchVerifiedBookCover(
  title: string,
  author?: string,
  signal?: AbortSignal
): Promise<string> {
  const cleanTitle = (title || '').trim();
  if (!cleanTitle) return '';

  const localMatch = findVerifiedCatalogCover(cleanTitle, author);
  if (localMatch) return localMatch;

  const cacheKey = `${normalize(cleanTitle)}|${author ? normalize(author) : ''}`;
  const cached = verifiedSingleCoverCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const appleCover = await fetchAppleBooksCover(cleanTitle, author, signal);
  if (appleCover) {
    verifiedSingleCoverCache.set(cacheKey, appleCover);
    return appleCover;
  }

  // Fallback to OpenLibrary with strict title + author validation
  try {
    const lastAuthor = author ? author.split(/[&,]/)[0].trim().split(' ').pop() || '' : '';
    const q = lastAuthor && !/verificar|consultar/i.test(author || '')
      ? `${cleanTitle} ${lastAuthor}`
      : cleanTitle;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer);
        return '';
      }
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=5&fields=title,author_name,cover_i`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      for (const doc of data?.docs || []) {
        if (!doc?.cover_i || doc.cover_i <= 0) continue;
        const foundAuthor = Array.isArray(doc.author_name) ? doc.author_name.join(', ') : '';
        if (author && !isAuthorCompatible(author, foundAuthor)) continue;
        if (scoreTitleMatch(cleanTitle, doc.title || '') >= 55) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`;
          verifiedSingleCoverCache.set(cacheKey, url);
          return url;
        }
      }
    }
  } catch {
    // ignore timeout/abort
  }

  return '';
}

export async function fetchAlternativeCovers(
  title: string,
  author?: string,
  currentCover?: string,
  originalTitle?: string
): Promise<string[]> {
  const normTitle = normalize(title);
  const cacheKey = `${normTitle}|${author ? normalize(author) : ''}`;

  // 1. Instant Memory Cache Check (0ms)
  const cached = coverMemoryCache.get(cacheKey);
  if (cached && cached.length > 0) {
    const filteredCached = cached.filter((c) => c !== currentCover);
    if (filteredCached.length >= 3) {
      return filteredCached.slice(0, 8);
    }
  }

  // 2. Instant Curated & Catalog Resolution (0ms)
  const curated = getCuratedCovers(title, currentCover);
  const catalogMatch = findVerifiedCatalogCover(title, author);
  const covers: string[] = [...curated];
  if (catalogMatch && catalogMatch !== currentCover && !covers.includes(catalogMatch)) {
    covers.push(catalogMatch);
  }

  if (covers.length >= 4) {
    coverMemoryCache.set(cacheKey, covers);
    return covers.slice(0, 8);
  }

  // 3. Prepare high-precision search queries
  const cleanTitle = title.replace(/[?.,!:";]/g, ' ').trim();
  const querySet = new Set<string>();

  if (KNOWN_TITLE_ALIASES[normTitle]) {
    querySet.add(KNOWN_TITLE_ALIASES[normTitle]);
  }

  if (originalTitle && normalize(originalTitle) !== normTitle) {
    const cleanOrig = originalTitle.replace(/[?.,!:";]/g, ' ').trim();
    const lastName = author ? author.split(' ').pop() : '';
    querySet.add(`${cleanOrig} ${lastName}`.trim());
  }

  if (author) {
    const lastName = author.split(' ').pop();
    querySet.add(`${cleanTitle} ${lastName}`);
  }

  querySet.add(cleanTitle);

  const targetQueries = Array.from(querySet).slice(0, 2);

  // 4. Parallel fetch from Apple Books BR + OpenLibrary (with strict title/author validation)
  const applePromise = fetchAppleBooksCover(cleanTitle, author).then((u) => (u ? [u] : []));

  const olPromises = targetQueries.map(async (q) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=6&fields=key,title,author_name,cover_i,isbn`,
        { signal: controller.signal }
      );
      clearTimeout(timer);

      if (!res.ok) return [];
      const data = await res.json();
      const found: string[] = [];

      for (const doc of (data.docs || []).slice(0, 5)) {
        const docAuthors = Array.isArray(doc.author_name) ? doc.author_name.join(', ') : '';
        if (author && !isAuthorCompatible(author, docAuthors)) continue;
        if (scoreTitleMatch(title, doc.title || '', originalTitle) < 55) continue;

        if (doc.cover_i && doc.cover_i > 0) {
          found.push(`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`);
        }

        if (doc.isbn && Array.isArray(doc.isbn)) {
          for (const isbn of doc.isbn.slice(0, 2)) {
            found.push(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`);
          }
        }
      }

      return found;
    } catch {
      return [];
    }
  });

  const queryResults = await Promise.allSettled([applePromise, ...olPromises]);
  for (const res of queryResults) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      covers.push(...res.value);
    }
  }

  const uniqueCovers = Array.from(new Set(covers)).filter((c) => Boolean(c) && c !== currentCover);

  if (uniqueCovers.length > 0) {
    coverMemoryCache.set(cacheKey, uniqueCovers);
  }

  return uniqueCovers.slice(0, 8);
}
