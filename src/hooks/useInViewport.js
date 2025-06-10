import { useState, useEffect, useRef } from 'react';

/**
 * @hook useInViewport
 * @description Professional viewport detection using Intersection Observer API
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Features:
 * - Intersection Observer API with fallback
 * - Configurable threshold and margins
 * - Performance optimized with disconnect
 * - Memory leak prevention
 */

const useInViewport = (options = {}) => {
  const {
    threshold = 0.1,           // Trigger when 10% visible
    rootMargin = '50vh',       // Start loading 50vh before element
    triggerOnce = true,        // Disconnect after first trigger
    fallbackDelay = 100        // Fallback delay for unsupported browsers
  } = options;

  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback for browsers that don't support Intersection Observer
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported, using fallback');
      const timer = setTimeout(() => {
        setInView(true);
        setHasBeenInView(true);
      }, fallbackDelay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        
        if (isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
          
          // Disconnect observer after first intersection for performance
          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { 
        threshold: Array.isArray(threshold) ? threshold : [threshold],
        rootMargin 
      }
    );

    observer.observe(element);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasBeenInView, triggerOnce, fallbackDelay]);

  return [ref, inView, hasBeenInView];
};

export default useInViewport; 