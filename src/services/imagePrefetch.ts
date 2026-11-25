import { markCoverLoaded } from '../components/BookCover';

/**
 * Non-blocking image prefetching service.
 * Immediate batches use higher concurrency (HTTP/2 multiplexed CDNs) so switching
 * characters or swapping suggestions renders covers from memory cache with zero delay.
 */

const prefetchedUrls = new Set<string>();

export function prefetchBookCovers(coverUrls: (string | undefined)[], immediate = false) {
  if (typeof window === 'undefined') return;

  const limit = immediate ? 32 : 64;
  const queue = coverUrls
    .filter((url): url is string => Boolean(url && !prefetchedUrls.has(url)))
    .slice(0, limit);

  if (queue.length === 0) return;

  const batchSize = immediate ? 8 : 4;

  const processBatch = () => {
    const batch = queue.splice(0, batchSize);
    for (const url of batch) {
      if (prefetchedUrls.has(url)) continue;
      prefetchedUrls.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        if (img.naturalWidth > 1 && img.naturalHeight > 1) {
          markCoverLoaded(url);
        }
      };
      img.src = url;
    }

    if (queue.length > 0) {
      if (immediate) {
        setTimeout(processBatch, 60);
      } else if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(processBatch, { timeout: 1000 });
      } else {
        setTimeout(processBatch, 180);
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
      setTimeout(processBatch, 200);
    }
  }, 400);
}
