import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Habilita arraste horizontal com o mouse no desktop sem afetar o scroll por toque
 * nem disparar cliques acidentais ao arrastar. Registra listeners globais apenas durante o arraste.
 */
export function useHorizontalDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const scrollRef = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isDownRef = useRef(false);
  const didDragRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const cleanupListenersRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      cleanupListenersRef.current?.();
    };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<T>) => {
    if (e.button !== 0 || !scrollRef.current) return;
    const el = scrollRef.current;
    if (el.scrollWidth <= el.clientWidth + 2) return;

    cleanupListenersRef.current?.();
    isDownRef.current = true;
    didDragRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = el.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDownRef.current || !scrollRef.current) return;
      const dx = moveEvent.pageX - startXRef.current;
      if (Math.abs(dx) > 4 && !didDragRef.current) {
        didDragRef.current = true;
        setIsDragging(true);
      }
      if (didDragRef.current) {
        scrollRef.current.scrollLeft = startScrollLeftRef.current - dx;
      }
    };

    const stopDragging = () => {
      if (!isDownRef.current) return;
      isDownRef.current = false;
      setIsDragging(false);
      cleanupListenersRef.current?.();
      cleanupListenersRef.current = null;
      requestAnimationFrame(() => {
        didDragRef.current = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('blur', stopDragging);

    cleanupListenersRef.current = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('blur', stopDragging);
    };
  }, []);

  const onDragStart = useCallback((e: React.DragEvent<T>) => {
    e.preventDefault();
  }, []);

  const shouldSuppressClick = useCallback(() => didDragRef.current, []);

  return {
    scrollRef,
    isDragging,
    onMouseDown,
    onDragStart,
    shouldSuppressClick,
  };
}
