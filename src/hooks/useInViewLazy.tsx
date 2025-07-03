import { useEffect, useRef, useState, lazy } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

interface UseInViewLazyOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Overloaded function signatures
function useInViewLazy(options?: UseInViewLazyOptions): [React.RefObject<HTMLElement>, boolean, boolean];
function useInViewLazy(
  importFn: () => Promise<any>,
  options?: UseInViewLazyOptions
): { ref: React.RefObject<HTMLElement>; Comp: React.ComponentType<any> | null };

function useInViewLazy(
  importFnOrOptions?: (() => Promise<any>) | UseInViewLazyOptions,
  options?: UseInViewLazyOptions
) {
  // Determine if first argument is import function or options
  const isImportFunction = typeof importFnOrOptions === 'function';
  const importFn = isImportFunction ? importFnOrOptions : null;
  const opts = isImportFunction ? options || {} : (importFnOrOptions || {});
  
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = opts;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [LazyComponent, setLazyComponent] = useState<React.ComponentType<any> | null>(null);
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
          
          // Load component if import function provided
          if (importFn && !LazyComponent) {
            const LazyComp = lazy(importFn);
            setLazyComponent(LazyComp);
          }
          
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
  }, [threshold, rootMargin, triggerOnce, hasBeenInView, importFn, LazyComponent]);

  // Return different formats based on usage
  if (importFn) {
    return { ref: elementRef, Comp: LazyComponent };
  }
  
  return [elementRef, isInView, hasBeenInView] as const;
}

export { useInViewLazy };
export default useInViewLazy;