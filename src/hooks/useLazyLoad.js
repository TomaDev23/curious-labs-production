import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

/**
 * Custom hook for lazy loading images and components
 * Only renders/loads content when it's about to enter the viewport
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} - [ref, isVisible] to attach ref and check visibility
 */
const useLazyLoad = (threshold = 0.1, rootMargin = '0px') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 PHASE 2: Use SharedIO - Pure management change, zero functional impact
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          // Auto-unsubscribe after loading - preserves original behavior
          if (unsubscribeRef.current) {
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

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [threshold, rootMargin, isLoaded]);

  return [elementRef, isLoaded];
};

// Export both named and default
export { useLazyLoad };
export default useLazyLoad; 