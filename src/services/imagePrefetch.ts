import { markCoverLoaded } from '../components/BookCover';

/**
 * Non-blocking, gentle image prefetching service
 * Prefetches covers in small batches when browser is idle to avoid
 * saturating network bandwidth and choking Open Library API.
 */

const prefetchedUrls = new Set<string>();

export function prefetchBookCovers(coverUrls: (string | undefined)[], immediate = false) {
  if (typeof window === 'undefined') return;

  const queue = coverUrls
    .filter((url): url is string => Boolean(url && !prefetchedUrls.has(url)))
    .slice(0, 20);

  if (queue.length === 0) return;

  const processBatch = () => {
    const batch = queue.splice(0, 3);
    for (const url of batch) {
      prefetchedUrls.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (img.naturalWidth > 1 && img.naturalHeight > 1) {
          markCoverLoaded(url);
        }
      };
      img.src = url;
    }

    if (queue.length > 0) {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(processBatch, { timeout: 1000 });
      } else {
        setTimeout(processBatch, 200);
      }
    }
  };

  if (immediate) {
    processBatch();
    return;
  }

  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(processBatch, { timeout: 1500 });
    } else {
      setTimeout(processBatch, 250);
    }
  }, 600);
}
