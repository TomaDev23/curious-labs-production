import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

const useReveal = (threshold = 0.1, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 M-3: Use SharedIO instead of individual observer
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        setIsVisible(entry.isIntersecting);
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

  return [elementRef, isVisible];
};

export default useReveal; 