/**
 * Non-blocking, gentle image prefetching service
 * Prefetches covers in small batches when browser is idle to avoid
 * saturating network bandwidth and choking Open Library API.
 */

const prefetchedUrls = new Set<string>();

export function prefetchBookCovers(coverUrls: (string | undefined)[]) {
  if (typeof window === 'undefined') return;

  // Filter valid, un-prefetched URLs and limit to priority batch
  const queue = coverUrls
    .filter((url): url is string => Boolean(url && !prefetchedUrls.has(url)))
    .slice(0, 16);

  if (queue.length === 0) return;

  const processBatch = () => {
    // Process at most 2 images per idle frame
    const batch = queue.splice(0, 2);
    for (const url of batch) {
      prefetchedUrls.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    }

    if (queue.length > 0) {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(processBatch, { timeout: 1000 });
      } else {
        setTimeout(processBatch, 250);
      }
    }
  };

  // Give visible viewport images at least 800ms of exclusive network bandwidth
  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(processBatch, { timeout: 1500 });
    } else {
      setTimeout(processBatch, 300);
    }
  }, 800);
}
