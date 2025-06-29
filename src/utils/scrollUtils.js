// scrollUtils.js
// ✅ Tile W1.1 — Navigation Sync
// Provides scroll utility functions for the cosmic harmony navigation system

import { observe as sharedObserve, unobserve as sharedUnobserve } from './SharedIO';

/**
 * Smooth scrolls to a specified section by ID with offset consideration
 * @param {string} id - The ID of the element to scroll to
 * @param {Object} options - Additional options for scrolling
 * @param {string} options.block - Vertical alignment ('start', 'center', 'end', 'nearest')
 * @param {number} options.additionalOffset - Extra offset to apply (in pixels)
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  
  if (element) {
    // Get any additional scroll margin from CSS
    const styles = window.getComputedStyle(element);
    const scrollMarginTop = parseInt(styles.scrollMarginTop || '0');
    
    // Calculate the element's position
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    
    // Add scroll margin (if any)
    const offsetPosition = elementPosition - scrollMarginTop;
    
    // Smooth scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Registers click handlers for all navigation links with hash fragments
 * Useful for attaching to links throughout the app
 */
export function registerSmoothScrolling() {
  document.addEventListener('click', (e) => {
    // Check if the clicked element is a link with a hash
    const link = e.target.closest('a');
    if (link && link.hash && link.pathname === window.location.pathname) {
      e.preventDefault();
      const id = link.hash.substring(1); // Remove the # character
      scrollToSection(id);
    }
  });
}

/**
 * Activates smooth scrolling for a specific navigation component
 * @param {Array} items - Array of navigation items with href properties
 * @param {Function} setActive - Function to set active item
 */
export function setupNavScrolling(items, setActive) {
  items.forEach(item => {
    const id = item.href.substring(1); // Remove the # character
    const element = document.getElementById(id);
    
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.2 } // 20% of the element must be visible
      );
      
      observer.observe(element);
      return () => observer.disconnect();
    }
  });
}

// 🚨 M-3 & M-4: SharedIO + Global Scroll Pattern
export const createScrollObserver = (element, callback, options = {}) => {
  // Use SharedIO instead of individual IntersectionObserver
  return sharedObserve(element, callback, {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  });
};

// 🚨 M-4: Remove direct scroll listener - use context instead
export const throttledScrollHandler = (callback, delay = 16) => {
  // This should now be replaced with useGlobalScroll hook
  console.warn('[scrollUtils] Direct scroll listeners deprecated. Use useGlobalScroll hook instead.');
  
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Legacy support - will be removed in next version
export const addScrollListener = (callback, options = {}) => {
  console.warn('[scrollUtils] addScrollListener deprecated. Use useGlobalScroll hook instead.');
  const handler = throttledScrollHandler(callback, options.throttle);
  
  // Fallback for legacy code
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handler, { passive: true, ...options });
    return () => window.removeEventListener('scroll', handler);
  }
  
  return () => {};
};

// Utility for scroll position calculations
export const getScrollProgress = (element) => {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementHeight = rect.height;
  
  // Calculate how much of the element is visible
  const visibleTop = Math.max(0, windowHeight - rect.top);
  const visibleBottom = Math.max(0, rect.bottom);
  const visibleHeight = Math.min(visibleTop, visibleBottom, elementHeight);
  
  return Math.min(visibleHeight / elementHeight, 1);
}; 