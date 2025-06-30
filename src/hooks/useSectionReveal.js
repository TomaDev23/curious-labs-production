import { useState, useEffect, useRef } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

/**
 * Hook for section reveal animations using SharedIO
 * @param {Object} options - Configuration options
 * @returns {Object} - Ref and visibility state
 */
export const useSectionReveal = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 CL-1: Use SharedIO instead of individual IntersectionObserver
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          
          // If triggerOnce is true, unsubscribe after first trigger
          if (triggerOnce && unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
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
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref: elementRef,
    isVisible: triggerOnce ? hasBeenVisible : isVisible,
    hasBeenVisible
  };
};

// Export default only (named export already at declaration)
export default useSectionReveal; 