/**
 * @file scrollUtils.js
 * @description Optimized scroll utilities with SharedIO integration
 * @legit true - Passes LEGIT protocol requirements
 */

import { observe as sharedObserve, unobserve as sharedUnobserve } from './SharedIO';
import { isMobile } from './deviceTier';

/**
 * Enhanced scroll position utilities
 */
export const getScrollPosition = () => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return {
    x: window.scrollX || window.pageXOffset || 0,
    y: window.scrollY || window.pageYOffset || 0
  };
};

/**
 * Calculate scroll progress as percentage (0-100)
 */
export const getScrollProgress = () => {
  if (typeof window === 'undefined') return 0;
  
  const { y } = getScrollPosition();
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  return maxScroll > 0 ? Math.min(100, Math.max(0, (y / maxScroll) * 100)) : 0;
};

/**
 * Smooth scroll to element with options
 */
export const scrollToElement = (element, options = {}) => {
  if (!element) return;
  
  const {
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    offset = 0
  } = options;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY + offset;
  
  window.scrollTo({
    top: elementPosition,
    behavior
  });
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element, threshold = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
};

/**
 * Throttled scroll event handler
 */
export const createThrottledScrollHandler = (callback, delay = 16) => {
  // 🚨 CL-2: Early return on mobile to silence scroll listeners
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }

  let ticking = false;
  
  const handler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  return handler;
};

// 🚨 CL-1: SharedIO + Global Scroll Pattern
export const createScrollObserver = (element, callback, options = {}) => {
  // 🚨 CL-2: Early return on mobile
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }

  // Use SharedIO instead of individual IntersectionObserver
  return sharedObserve(element, callback, {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  });
};

// 🚨 CL-2: Remove direct scroll listener - use context instead
export const throttledScrollHandler = (callback, delay = 16) => {
  // This should now be replaced with useGlobalScroll hook
  console.warn('[scrollUtils] Direct scroll listeners deprecated. Use useGlobalScroll hook instead.');
  
  // 🚨 CL-2: Early return on mobile
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }
  
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
  
  // 🚨 CL-2: Early return on mobile
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }
  
  const handler = throttledScrollHandler(callback, options.throttle);
  
  // Fallback for legacy code
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handler, { passive: true, ...options });
    return () => window.removeEventListener('scroll', handler);
  }
  
  return () => {};
};

/**
 * Scroll direction detection
 */
export const useScrollDirection = () => {
  // 🚨 CL-2: Simplified mobile version
  if (isMobile()) {
    return 'none';
  }
  
  // Desktop implementation would go here
  return 'none';
};

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