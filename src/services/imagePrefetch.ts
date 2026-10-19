/**
 * Image prefetching service for instant tab switching and smooth rendering
 */

const prefetchedUrls = new Set<string>();

export function prefetchBookCovers(coverUrls: (string | undefined)[]) {
  if (typeof window === 'undefined') return;

  const run = () => {
    for (const url of coverUrls) {
      if (!url || prefetchedUrls.has(url)) continue;
      prefetchedUrls.add(url);

      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    }
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(run);
  } else {
    setTimeout(run, 60);
  }
}
