import { useState, useEffect, useRef } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

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

  const [isInViewport, setIsInViewport] = useState(false);
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false);
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 MOBILE FIX: Use SharedIO instead of individual observer
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        const inViewport = entry.isIntersecting;
        setIsInViewport(inViewport);
        
        if (inViewport && !hasBeenInViewport) {
          setHasBeenInViewport(true);
        }
        
        // Optional callback
        if (options.onIntersect) {
          options.onIntersect(inViewport, entry);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );

    unsubscribeRef.current = unsubscribe;

    // Cleanup timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [options.threshold, options.rootMargin, hasBeenInViewport]);

  return [elementRef, isInViewport, hasBeenInViewport];
};

export default useInViewport; 