/**
 * Service to search alternative book covers from Open Library & Google Books
 * Specifically queries work editions to prioritize authentic Brazilian Portuguese releases
 */

export async function fetchAlternativeCovers(
  title: string,
  author?: string,
  currentCover?: string
): Promise<string[]> {
  const covers: string[] = [];
  const cleanTitle = title.trim();

  // 1. Search Open Library by title to find the canonical work(s)
  try {
    const encodedTitle = encodeURIComponent(cleanTitle);
    const olRes = await fetch(
      `https://openlibrary.org/search.json?title=${encodedTitle}&limit=6`
    );
    if (olRes.ok) {
      const olData = await olRes.json();
      if (olData.docs && Array.isArray(olData.docs)) {
        for (const doc of olData.docs.slice(0, 4)) {
          // If the work has a key, fetch its specific editions where Brazilian/Portuguese covers reside
          if (doc.key) {
            try {
              const edRes = await fetch(
                `https://openlibrary.org${doc.key}/editions.json?limit=25`
              );
              if (edRes.ok) {
                const edData = await edRes.json();
                for (const ed of edData.entries || []) {
                  if (ed.covers && Array.isArray(ed.covers)) {
                    for (const cid of ed.covers) {
                      if (cid > 0) {
                        const url = `https://covers.openlibrary.org/b/id/${cid}-L.jpg`;
                        if (!covers.includes(url) && url !== currentCover) {
                          covers.push(url);
                        }
                      }
                    }
                  }
                }
              }
            } catch (edErr) {
              console.warn('Erro ao consultar edições da obra:', edErr);
            }
          }

          // Also check doc.cover_i from the main search doc
          if (doc.cover_i && doc.cover_i > 0) {
            const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
            if (!covers.includes(url) && url !== currentCover) {
              covers.push(url);
            }
          }

          if (covers.length >= 8) break;
        }
      }
    }
  } catch (err) {
    console.warn('Erro ao buscar capas no OpenLibrary:', err);
  }

  // 2. Google Books fallback with strict language restriction to Portuguese
  if (covers.length < 4) {
    try {
      const q = encodeURIComponent(`intitle:${cleanTitle}${author ? ` inauthor:${author}` : ''}`);
      const gbRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=pt&maxResults=8`
      );
      if (gbRes.ok) {
        const gbData = await gbRes.json();
        if (gbData.items && Array.isArray(gbData.items)) {
          for (const item of gbData.items) {
            const imageLinks = item.volumeInfo?.imageLinks;
            const img =
              imageLinks?.large ||
              imageLinks?.medium ||
              imageLinks?.thumbnail ||
              imageLinks?.smallThumbnail;
            if (img) {
              const secureImg = img.replace('http://', 'https://').replace('&edge=curl', '');
              if (!covers.includes(secureImg) && secureImg !== currentCover) {
                covers.push(secureImg);
              }
            }
            if (covers.length >= 8) break;
          }
        }
      }
    } catch (err) {
      console.warn('Erro ao buscar capas no Google Books:', err);
    }
  }

  // Return distinct alternative covers (up to 6)
  return covers.filter((c) => c !== currentCover).slice(0, 6);
}
