import { useState, useEffect } from 'react';
// 🚨 SM-3: Replace useGlobalScroll with ScrollManager
import { ScrollManager } from '../utils/ScrollManager';
import { isMobile } from '../utils/deviceTier';

/**
 * Enhanced viewport scroll hook with performance optimizations
 * Provides scroll position and direction tracking
 */
export const useViewportScroll = () => {
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollY, setScrollY] = useState(0);
  const mobile = isMobile();
  const [direction, setDirection] = useState('down');
  const [isScrolling, setIsScrolling] = useState(false);

  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  useEffect(() => {
    // 🚨 MB-1: Skip scroll listeners on mobile for performance
    if (mobile) return;
    
    let lastScrollY = 0;
    let scrollTimeout;

    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollY(newScrollY);
      
      // Track scroll direction
      if (newScrollY > lastScrollY) {
        setDirection('down');
      } else if (newScrollY < lastScrollY) {
        setDirection('up');
      }
      
      lastScrollY = newScrollY;
      
      // Track scrolling state
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    });

    return () => {
      unsubscribe();
      clearTimeout(scrollTimeout);
    };
  }, [mobile]);

  return { scrollY, direction, isScrolling };
}; 