import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

/**
 * Section reveal hook for triggering animations when sections come into view
 * 🚨 PHASE 2: Converted to SharedIO - Pure management change, zero functional impact
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {string} rootMargin - Root margin for intersection observer
 * @returns {Object} - Object containing ref to attach and visibility state
 */
const useSectionReveal = (threshold = 0.2, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 PHASE 2: Use SharedIO - Pure management change, zero functional impact
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Auto-unsubscribe after reveal - preserves original behavior
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
  }, [threshold, rootMargin]);

  // Return in original format for compatibility
  return {
    ref: elementRef,
    isVisible
  };
};

// Export both named and default
export { useSectionReveal };
export default useSectionReveal; 