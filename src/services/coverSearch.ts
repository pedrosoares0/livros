import { getCuratedCovers } from '../data/curatedCovers';

/**
 * Robust alternative cover search engine with instant curated fallback
 * and multi-pass international canonical resolution from Open Library.
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
  'o alienista': 'O Alienista Machado de Assis',
  'o nariz': 'The Nose Nikolai Gogol',
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

// In-memory cache for instant cover retrieval on subsequent opens
const coverMemoryCache = new Map<string, string[]>();

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

  // 2. Instant Curated Resolution (0ms)
  const curated = getCuratedCovers(title, currentCover);
  const covers: string[] = [...curated];

  // If curated already has plenty of verified high-res covers, return immediately
  if (curated.length >= 4) {
    coverMemoryCache.set(cacheKey, curated);
    return curated.slice(0, 8);
  }

  // 3. Prepare high-precision search queries
  const cleanTitle = title.replace(/[?.,!:";]/g, ' ').trim();
  const querySet = new Set<string>();

  // Canonical International Alias
  if (KNOWN_TITLE_ALIASES[normTitle]) {
    querySet.add(KNOWN_TITLE_ALIASES[normTitle]);
  }

  // Original / International Title
  if (originalTitle && normalize(originalTitle) !== normTitle) {
    const cleanOrig = originalTitle.replace(/[?.,!:";]/g, ' ').trim();
    const lastName = author ? author.split(' ').pop() : '';
    querySet.add(`${cleanOrig} ${lastName}`.trim());
  }

  // Author last name + clean title
  if (author) {
    const lastName = author.split(' ').pop();
    querySet.add(`${cleanTitle} ${lastName}`);
  }

  // Title alone
  querySet.add(cleanTitle);

  // Take top 2 unique queries to run concurrently
  const targetQueries = Array.from(querySet).slice(0, 2);

  // 4. Parallel fast fetch from OpenLibrary search.json (no slow editions.json)
  const fetchPromises = targetQueries.map(async (q) => {
    try {
      // Abort controller with strict 2.5s timeout so user never waits
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=6&fields=key,cover_i,isbn`,
        { signal: controller.signal }
      );
      clearTimeout(timer);

      if (!res.ok) return [];
      const data = await res.json();
      const found: string[] = [];

      for (const doc of (data.docs || []).slice(0, 5)) {
        // Direct cover ID with default=false to avoid 1x1 blank gifs
        if (doc.cover_i && doc.cover_i > 0) {
          found.push(`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`);
        }

        // Fast ISBN covers with default=false
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

  const queryResults = await Promise.allSettled(fetchPromises);
  for (const res of queryResults) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      covers.push(...res.value);
    }
  }

  // Filter unique valid covers, excluding current active cover
  const uniqueCovers = Array.from(new Set(covers)).filter((c) => Boolean(c) && c !== currentCover);

  // Cache final resolved list for instant reuse
  if (uniqueCovers.length > 0) {
    coverMemoryCache.set(cacheKey, uniqueCovers);
  }

  return uniqueCovers.slice(0, 8);
}

