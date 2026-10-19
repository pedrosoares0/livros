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
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

export async function fetchAlternativeCovers(
  title: string,
  author?: string,
  currentCover?: string,
  originalTitle?: string
): Promise<string[]> {
  // 1. Instant Curated Resolution (0ms latency, zero API rate-limiting)
  const curated = getCuratedCovers(title, currentCover);
  if (curated && curated.length >= 3) {
    return curated.slice(0, 6);
  }

  const covers: string[] = [...curated];
  const cleanTitle = title.replace(/[?.,!:";]/g, ' ').trim();
  const normTitle = normalize(title);

  // Multi-pass prioritized queries to ensure 100% catalog coverage
  const queries: string[] = [];

  // 1. Canonical International Alias
  if (KNOWN_TITLE_ALIASES[normTitle]) {
    queries.push(KNOWN_TITLE_ALIASES[normTitle]);
  }

  // 2. Original / International Title if present
  if (originalTitle && normalize(originalTitle) !== normTitle) {
    const cleanOrig = originalTitle.replace(/[?.,!:";]/g, ' ').trim();
    const lastName = author ? author.split(' ').pop() : '';
    queries.push(`${cleanOrig} ${lastName}`.trim());
  }

  // 3. Combined Title + Author Last Name
  if (author) {
    const lastName = author.split(' ').pop();
    queries.push(`${cleanTitle} ${lastName}`);
  }

  // 4. Cleaned Portuguese Title
  queries.push(cleanTitle);

  const seenWorkKeys = new Set<string>();

  for (const q of queries) {
    if (covers.length >= 6) break;
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=4`
      );
      if (!res.ok) continue;
      const data = await res.json();

      for (const doc of (data.docs || []).slice(0, 3)) {
        // Direct search result cover
        if (doc.cover_i && doc.cover_i > 0) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
          if (!covers.includes(url) && url !== currentCover) {
            covers.push(url);
          }
        }

        // Query specific editions of canonical work
        if (doc.key && !seenWorkKeys.has(doc.key)) {
          seenWorkKeys.add(doc.key);
          try {
            const edRes = await fetch(
              `https://openlibrary.org${doc.key}/editions.json?limit=25`
            );
            if (edRes.ok) {
              const edData = await edRes.json();
              for (const ed of edData.entries || []) {
                for (const cid of ed.covers || []) {
                  if (cid > 0) {
                    const url = `https://covers.openlibrary.org/b/id/${cid}-L.jpg`;
                    if (!covers.includes(url) && url !== currentCover) {
                      covers.push(url);
                    }
                  }
                }
              }
            }
          } catch {
            // Silently continue to next doc
          }
        }

        // Try ISBN covers if available
        if (doc.isbn && Array.isArray(doc.isbn)) {
          for (const isbn of doc.isbn.slice(0, 3)) {
            const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
            if (!covers.includes(url) && url !== currentCover) {
              covers.push(url);
            }
          }
        }

        if (covers.length >= 6) break;
      }
    } catch {
      // Continue to next fallback query
    }
  }

  // Filter out current active cover and return up to 6 distinct covers
  const uniqueCovers = Array.from(new Set(covers)).filter((c) => c !== currentCover);
  return uniqueCovers.slice(0, 6);
}

