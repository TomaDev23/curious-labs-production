/**
 * Responsive Images Configuration
 * 
 * Centralized configuration for responsive image breakpoints,
 * sizes, and optimization strategies across the application
 */

// Standard responsive breakpoints aligned with Tailwind CSS
export const RESPONSIVE_BREAKPOINTS = {
  mobile: { width: 320, suffix: '_mobile' },
  mobileLg: { width: 480, suffix: '_mobile_lg' },
  tablet: { width: 768, suffix: '_tablet' },
  tabletLg: { width: 1024, suffix: '_tablet_lg' },
  desktop: { width: 1200, suffix: '_desktop' },
  desktopLg: { width: 1440, suffix: '_desktop_lg' },
  xl: { width: 1920, suffix: '_xl' },
  xxl: { width: 2560, suffix: '_xxl' }
};

// Common responsive size configurations for different use cases
export const RESPONSIVE_CONFIGS = {
  // Hero images - full width, high impact
  hero: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.mobile,
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop,
      RESPONSIVE_BREAKPOINTS.xl
    ],
    sizesAttr: "100vw",
    aspectRatio: 16/9
  },
  
  // Product cards - responsive grid layout
  productCard: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.mobile,
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop
    ],
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    aspectRatio: 4/3
  },
  
  // Gallery images - masonry/grid layout
  gallery: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.mobile,
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop,
      RESPONSIVE_BREAKPOINTS.desktopLg
    ],
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1440px) 33vw, 25vw",
    aspectRatio: 1/1
  },
  
  // Content images - inline with text
  content: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.mobile,
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop
    ],
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",
    aspectRatio: 16/10
  },
  
  // Standard images - default configuration
  standard: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.mobile,
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop
    ],
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    aspectRatio: 4/3
  },
  
  // Thumbnail images - small, fixed size
  thumbnail: {
    sizes: [
      { width: 150, suffix: '_thumb' },
      { width: 300, suffix: '_thumb_2x' }
    ],
    sizesAttr: "150px",
    aspectRatio: 1/1
  },
  
  // Avatar images - profile pictures
  avatar: {
    sizes: [
      { width: 64, suffix: '_avatar_sm' },
      { width: 128, suffix: '_avatar_md' },
      { width: 256, suffix: '_avatar_lg' }
    ],
    sizesAttr: "(max-width: 768px) 64px, (max-width: 1200px) 128px, 256px",
    aspectRatio: 1/1
  },
  
  // Background images - decorative, full coverage
  background: {
    sizes: [
      RESPONSIVE_BREAKPOINTS.tablet,
      RESPONSIVE_BREAKPOINTS.desktop,
      RESPONSIVE_BREAKPOINTS.xl,
      RESPONSIVE_BREAKPOINTS.xxl
    ],
    sizesAttr: "100vw",
    aspectRatio: 21/9
  }
};

// Common aspect ratios for layout stability
export const ASPECT_RATIOS = {
  square: 1/1,
  portrait: 3/4,
  landscape: 4/3,
  video: 16/9,
  widescreen: 21/9,
  golden: 1.618/1,
  content: 16/10
};

// Performance-optimized loading strategies
export const LOADING_STRATEGIES = {
  // Critical images - load immediately
  critical: {
    loading: 'eager',
    fetchpriority: 'high',
    rootMargin: '0px'
  },
  
  // Above-the-fold images - load with minimal delay
  aboveFold: {
    loading: 'lazy',
    fetchpriority: 'high', 
    rootMargin: '100px'
  },
  
  // Standard images - balanced performance
  standard: {
    loading: 'lazy',
    fetchpriority: 'auto',
    rootMargin: '200px'
  },
  
  // Below-the-fold images - conservative loading
  belowFold: {
    loading: 'lazy',
    fetchpriority: 'low',
    rootMargin: '400px'
  }
};

// Device-specific optimizations
export const DEVICE_OPTIMIZATIONS = {
  mobile: {
    maxWidth: 768,
    preferredFormat: 'webp',
    qualityReduction: 0.1, // 10% quality reduction for mobile
    prioritizeSpeed: true
  },
  
  tablet: {
    maxWidth: 1024,
    preferredFormat: 'webp',
    qualityReduction: 0.05, // 5% quality reduction for tablets
    prioritizeSpeed: false
  },
  
  desktop: {
    maxWidth: 1920,
    preferredFormat: 'webp',
    qualityReduction: 0,
    prioritizeSpeed: false
  }
};

/**
 * Gets responsive configuration by use case
 * @param {string} useCase - The use case key (hero, productCard, etc.)
 * @returns {Object} Responsive configuration object
 */
export const getResponsiveConfig = (useCase) => {
  return RESPONSIVE_CONFIGS[useCase] || RESPONSIVE_CONFIGS.standard;
};

/**
 * Creates a custom responsive configuration
 * @param {Object} options - Configuration options
 * @param {Array} options.breakpoints - Custom breakpoints array
 * @param {string} options.sizesAttr - Custom sizes attribute
 * @param {number} options.aspectRatio - Custom aspect ratio
 * @returns {Object} Custom responsive configuration
 */
export const createResponsiveConfig = ({ 
  breakpoints = [RESPONSIVE_BREAKPOINTS.mobile, RESPONSIVE_BREAKPOINTS.tablet, RESPONSIVE_BREAKPOINTS.desktop],
  sizesAttr = "(max-width: 768px) 100vw, 50vw",
  aspectRatio = ASPECT_RATIOS.landscape
}) => {
  return {
    sizes: breakpoints,
    sizesAttr,
    aspectRatio
  };
};

export default {
  RESPONSIVE_BREAKPOINTS,
  RESPONSIVE_CONFIGS,
  ASPECT_RATIOS,
  LOADING_STRATEGIES,
  DEVICE_OPTIMIZATIONS,
  getResponsiveConfig,
  createResponsiveConfig
}; 