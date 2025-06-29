/**
 * @hook useSimpleIntersection
 * @description Simplified intersection observer to replace complex throttled version
 * @purpose Reduce memory leaks and simplify observer management
 */

import { useEffect, useRef } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

const useSimpleIntersection = (callback, options = {}) => {
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const callbackRef = useRef(callback);
  
  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !callbackRef.current) return;
    
    // 🚨 PHASE 2: Use SharedIO - Pure management, preserves callback behavior
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        // Preserve original callback signature and timing
        callbackRef.current(entry, entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
        ...options
      }
    );
    
    unsubscribeRef.current = unsubscribe;
    
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [options.threshold, options.rootMargin]);
  
  return elementRef;
};

export default useSimpleIntersection; 