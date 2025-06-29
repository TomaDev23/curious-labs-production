import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

interface UseInViewLazyOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useInViewLazy = (options: UseInViewLazyOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const unsubscribe = sharedObserve(
      element,
      (entry: IntersectionObserverEntry) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
          
          if (triggerOnce && unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
          }
        }
      },
      { 
        threshold,
        rootMargin 
      }
    );

    unsubscribeRef.current = unsubscribe as (() => void);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

  return [elementRef, isInView, hasBeenInView] as const;
};

export { useInViewLazy };
export default useInViewLazy;