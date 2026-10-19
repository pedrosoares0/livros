/**
 * Robust alternative cover search engine with multi-pass international canonical resolution
 * Queries Open Library works and editions for Brazilian Portuguese and original edition covers.
 */

const KNOWN_TITLE_ALIASES: Record<string, string> = {
  'de quanta terra precisa o homem?': 'How Much Land Does a Man Need Tolstoy',
  'de quanta terra precisa o homem': 'How Much Land Does a Man Need Tolstoy',
  'senhor das moscas': 'Lord of the Flies Golding',
  'o estranho misterioso': 'The Mysterious Stranger Mark Twain',
  'o cair da noite': 'Nightfall Isaac Asimov',
  'os contos de beedle, o bardo': 'The Tales of Beedle the Bard Rowling',
  'os contos de beedle o bardo': 'The Tales of Beedle the Bard Rowling',
  'a morte de ivan ilitch': 'The Death of Ivan Ilyich Tolstoy',
  'kallocaína': 'Kallocain Karin Boye',
  'kallocaina': 'Kallocain Karin Boye',
  'a guerra da papoula': 'The Poppy War Kuang',
  'patinando no amor': 'Icebreaker Hannah Grace',
  'o inferno de dante': 'Inferno Dante Alighieri',
  'noites brancas': 'White Nights Dostoevsky',
  'entre quatro paredes': 'Huis Clos Sartre',
  'diário de um homem supérfluo': 'The Diary of a Superfluous Man Turgenev',
  'a menina do outro lado': 'The Girl from the Other Side Nagabe',
  'flores para algernon': 'Flowers for Algernon Daniel Keyes',
  'a revolução dos bichos': 'Animal Farm George Orwell',
  'o gato preto': 'The Black Cat Edgar Allan Poe',
  'história da sua vida': 'Story of Your Life Ted Chiang',
};

export async function fetchAlternativeCovers(
  title: string,
  author?: string,
  currentCover?: string,
  originalTitle?: string
): Promise<string[]> {
  const covers: string[] = [];
  const cleanTitle = title.replace(/[?.,!:";]/g, ' ').trim();
  const lowerTitle = title.toLowerCase().trim();

  // Multi-pass prioritized queries to ensure 100% catalog coverage
  const queries: string[] = [];

  // 1. Instant Canonical International Alias
  if (KNOWN_TITLE_ALIASES[lowerTitle]) {
    queries.push(KNOWN_TITLE_ALIASES[lowerTitle]);
  }

  // 2. Original / International Title if present
  if (originalTitle && originalTitle.toLowerCase().trim() !== lowerTitle) {
    const cleanOrig = originalTitle.replace(/[?.,!:";]/g, ' ').trim();
    const lastName = author ? author.split(' ').pop() : '';
    queries.push(`${cleanOrig} ${lastName}`.trim());
  }

  // 3. Combined Title + Author Last Name (broad search in Open Library)
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

        // Direct search result cover
        if (doc.cover_i && doc.cover_i > 0) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
          if (!covers.includes(url) && url !== currentCover) {
            covers.push(url);
          }
        }

        if (covers.length >= 6) break;
      }
    } catch {
      // Continue to next fallback query
    }
  }

  // Filter out current active cover and return up to 6 distinct covers
  return covers.filter((c) => c !== currentCover).slice(0, 6);
}
