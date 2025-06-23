import { useEffect, useRef, useState, ComponentType, LazyExoticComponent, lazy } from 'react';

type Props = { rootMargin?: string };

export const useInViewLazy = <T,>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  { rootMargin = '200px' }: Props = {}
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [comp, setComp] = useState<LazyExoticComponent<ComponentType<T>> | null>(
    null,
  );

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('🌙 Moon section in view - Loading 3D scene...');
          const lazyComponent = lazy(importFn);
          setComp(lazyComponent);
          console.log('🌙 Moon 3D scene loaded successfully');
          obs.disconnect();
        }
      },
      { rootMargin },
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [importFn, rootMargin]);

  return { ref, Comp: comp };
}; 