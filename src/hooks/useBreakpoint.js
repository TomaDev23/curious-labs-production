import { useState, useEffect } from 'react';

/**
 * Enhanced responsive hook with SSR safety and comprehensive breakpoint detection
 * @returns {Object} Object with current breakpoint string and boolean values for each breakpoint
 */
export function useBreakpoint() {
  // Initialize with fallback values for SSR safety
  const [breakpoints, setBreakpoints] = useState({
    current: 'desktop',
    isMobile: false,    // < 768px
    isTablet: false,    // 768px - 1023px  
    isDesktop: true,    // >= 1024px
    isSm: false,        // >= 640px
    isMd: false,        // >= 768px
    isLg: true,         // >= 1024px
    isXl: true,         // >= 1280px
    is2xl: true,        // >= 1536px
  });

  useEffect(() => {
    // SSR-safe check
    if (typeof window === 'undefined') return;
    
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      // Determine current breakpoint
      let current = 'desktop';
      if (width < 768) current = 'mobile';
      else if (width < 1024) current = 'tablet';
      
      setBreakpoints({
        current,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isSm: width >= 640,
        isMd: width >= 768, 
        isLg: width >= 1024,
        isXl: width >= 1280,
        is2xl: width >= 1536,
      });
    };

    // Set initial value
    updateBreakpoints();
    
    // Add listener
    window.addEventListener('resize', updateBreakpoints);
    
    return () => {
      window.removeEventListener('resize', updateBreakpoints);
    };
  }, []);

  return breakpoints;
}

/**
 * SSR-safe responsive hook for atomic components
 * Matches the pattern used in Mission Control Board
 * @returns {Object} Object with isMobile, isTablet, isDesktop flags
 */
export function useResponsive() {
  const [responsive, setResponsive] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });
  
  useEffect(() => {
    // SSR-safe check
    if (typeof window === 'undefined') return;
    
    const checkResponsive = () => {
      const width = window.innerWidth;
      setResponsive({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };
    
    // Set initial value
    checkResponsive();
    
    // Add listener
    window.addEventListener('resize', checkResponsive);
    
    return () => {
      window.removeEventListener('resize', checkResponsive);
    };
  }, []);
  
  return responsive;
}

/**
 * Performance-aware hook for detecting device capabilities
 * @returns {Object} Object with performance and motion preferences
 */
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    prefersReducedMotion: false,
    performanceTier: 'high', // 'minimal', 'low', 'medium', 'high'
    canUse3D: true,
    memory: 8, // GB fallback
    connection: '4g'
  });

  useEffect(() => {
    // SSR-safe check
    if (typeof window === 'undefined') return;
    
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Get device info
      const memory = navigator.deviceMemory || 8;
      const connection = navigator.connection?.effectiveType || '4g';
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      // Check WebGL support for 3D capability
      let canUse3D = true;
      try {
        // DISABLED: WebGL context creation conflicts with 3D system
        // const canvas = document.createElement('canvas');
        // const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        // canUse3D = !!webgl;
        
        // SAFE: Use feature detection without creating WebGL context
        const canvas = document.createElement('canvas');
        const context2d = canvas.getContext('2d');
        
        // Check for basic canvas support and WebGL availability without creating context
        canUse3D = !!(context2d && 
                     canvas.getContext && 
                     (window.WebGLRenderingContext || window.WebGL2RenderingContext));
        
        // Clean up 2D context
        if (context2d) {
          canvas.width = 1;
          canvas.height = 1;
        }
      } catch (e) {
        canUse3D = false;
      }
      
      // Determine performance tier
      let performanceTier = 'high';
      if (prefersReducedMotion) {
        performanceTier = 'minimal';
      } else if (memory <= 2 || connection === 'slow-2g') {
        performanceTier = 'minimal';
      } else if (memory <= 4 || connection === '2g' || hardwareConcurrency < 4) {
        performanceTier = 'low';
      } else if (memory <= 6 || connection === '3g') {
        performanceTier = 'medium';
      }
      
      setCapabilities({
        prefersReducedMotion,
        performanceTier,
        canUse3D: canUse3D && !prefersReducedMotion,
        memory,
        connection
      });
    };
    
    detectCapabilities();
    
    // Listen for motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => detectCapabilities();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return capabilities;
}

/**
 * Legacy compatibility function - matches original pattern
 * @returns {string} Current breakpoint ('mobile', 'tablet', or 'desktop')
 */
export const useLegacyBreakpoint = () => {
  const { current } = useBreakpoint();
  return current;
};

// Default export for backwards compatibility
export default useBreakpoint;

// 🔥 NEW: Unified Mobile Detection System - SSR-Safe & Consistent
let cachedMobileState = null;
let isInitialized = false;

/**
 * Unified mobile detection that prevents hydration mismatches
 * Use this instead of direct window.innerWidth checks
 */
export function getUnifiedMobileState() {
  // Server-side: Always return false for mobile (conservative approach)
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoint: 'desktop'
    };
  }
  
  // Client-side: Cache the result to prevent multiple calculations
  if (cachedMobileState && isInitialized) {
    return cachedMobileState;
  }
  
  const width = window.innerWidth;
  cachedMobileState = {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    breakpoint: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
  };
  
  isInitialized = true;
  return cachedMobileState;
}

/**
 * Hook for unified mobile detection with hydration safety
 * Prevents layout shifts caused by mobile detection mismatches
 */
export function useUnifiedMobile() {
  // Use optimized version to prevent assembly bloat
  return useOptimizedMobile();
}

// Global mobile state singleton to prevent assembly bloat
let globalMobileState = null;
let globalMobileListeners = [];
let isGlobalInitialized = false;

/**
 * Singleton mobile state manager - prevents assembly bloat
 * Only initializes once across entire app
 */
function getGlobalMobileState() {
  if (!isGlobalInitialized && typeof window !== 'undefined') {
    const checkMobile = () => {
      const width = window.innerWidth;
      return {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width
      };
    };
    
    globalMobileState = checkMobile();
    
    // Single global resize listener
    const handleGlobalResize = () => {
      const newState = checkMobile();
      if (JSON.stringify(globalMobileState) !== JSON.stringify(newState)) {
        globalMobileState = newState;
        // Notify all subscribers
        globalMobileListeners.forEach(callback => callback(newState));
      }
    };
    
    window.addEventListener('resize', handleGlobalResize);
    isGlobalInitialized = true;
  }
  
  return globalMobileState || { isMobile: false, isTablet: false, isDesktop: true, width: 1024 };
}

/**
 * Optimized mobile hook - uses global singleton
 * Prevents mobile assembly bloat by sharing state
 */
export function useOptimizedMobile() {
  const [mobileState, setMobileState] = useState(() => getGlobalMobileState());
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
    setMobileState(getGlobalMobileState());
    
    // Subscribe to global state changes
    const handleUpdate = (newState) => setMobileState(newState);
    globalMobileListeners.push(handleUpdate);
    
    return () => {
      globalMobileListeners = globalMobileListeners.filter(cb => cb !== handleUpdate);
    };
  }, []);
  
  return {
    ...mobileState,
    isHydrated
  };
} 