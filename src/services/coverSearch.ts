/**
 * Service to search alternative book covers from Open Library & Google Books
 */

export async function fetchAlternativeCovers(
  title: string,
  author?: string,
  currentCover?: string
): Promise<string[]> {
  const query = `${title} ${author || ''}`.trim();
  const covers: string[] = [];

  // 1. Try Open Library search to find multiple editions/covers
  try {
    const encoded = encodeURIComponent(query);
    const olRes = await fetch(`https://openlibrary.org/search.json?q=${encoded}&limit=12`);
    if (olRes.ok) {
      const olData = await olRes.json();
      if (olData.docs && Array.isArray(olData.docs)) {
        for (const doc of olData.docs) {
          if (doc.cover_i) {
            const url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
            if (!covers.includes(url) && url !== currentCover) {
              covers.push(url);
            }
          }
          if (doc.isbn && Array.isArray(doc.isbn)) {
            for (const isbn of doc.isbn.slice(0, 2)) {
              const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
              if (!covers.includes(url) && url !== currentCover) {
                covers.push(url);
              }
            }
          }
          if (covers.length >= 6) break;
        }
      }
    }
  } catch (err) {
    console.warn('Erro ao buscar capas no OpenLibrary:', err);
  }

  // 2. Try Google Books for high-res thumbnails if we need more
  if (covers.length < 4) {
    try {
      const encoded = encodeURIComponent(query);
      const gbRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encoded}&maxResults=8`
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
            if (covers.length >= 6) break;
          }
        }
      }
    } catch (err) {
      console.warn('Erro ao buscar capas no Google Books:', err);
    }
  }

  // Filter out any duplicates and return at most 4 alternative covers
  return covers.filter((c) => c !== currentCover).slice(0, 4);
}
