import { useState, useEffect } from 'react';
import { isMobile } from '../utils/deviceTier';

/**
 * Custom hook for smooth parallax scrolling effects
 * @param {Object} options - Parallax configuration
 * @param {number} options.speed - Parallax speed multiplier (default: 0.5)
 * @param {string} options.direction - Scroll direction ('vertical' or 'horizontal')
 * @param {boolean} options.disabled - Disable parallax effect
 * @returns {Object} Parallax transform values and ref
 */
export default function useParallax({ speed = 0.5 } = {}) {
  const [scrollY, setScrollY] = useState(0);
  const mobile = isMobile();

  useEffect(() => {
    // 🚨 CL-2: Early return on mobile to silence scroll listeners
    if (mobile) return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial value
    setScrollY(window.scrollY * speed);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, mobile]);

  return {
    scrollY: mobile ? 0 : scrollY, // Return 0 on mobile to disable effects
    transform: mobile ? 'translateY(0px)' : `translateY(${scrollY}px)`
  };
} 