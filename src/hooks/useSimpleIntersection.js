/**
 * @hook useSimpleIntersection
 * @description Simplified intersection observer to replace complex throttled version
 * @purpose Reduce memory leaks and simplify observer management
 */

import { useEffect, useRef } from 'react';

const useSimpleIntersection = (elementRef, callback, options = {}) => {
  const observerRef = useRef(null);
  const callbackRef = useRef(callback);
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;
    
    // Create simple intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (callbackRef.current) {
          callbackRef.current(entries);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    );
    
    observerRef.current = observer;
    observer.observe(element);
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
      observerRef.current = null;
    };
  }, [elementRef?.current, options.rootMargin, options.threshold]);
  
  return observerRef.current;
};

export default useSimpleIntersection; 