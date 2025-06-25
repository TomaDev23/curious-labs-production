/**
 * @config lazyLoadingStrategies
 * @description Smart loading distances and priorities for homepage components
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Strategy Logic:
 * - Early loading for components users always see
 * - Aggressive loading for heavy components
 * - Standard loading for medium components  
 * - Late loading for footer components
 */

export const LOADING_STRATEGIES = {
  // Hero - Always load immediately (no lazy loading)
  HeroAtomic: {
    rootMargin: '0px',
    priority: 'critical',
    lazy: false,
    description: 'Above fold - immediate load'
  },

  // Mission - Load early, users always scroll here
  MissionAtomic: {
    rootMargin: '100vh',
    priority: 'high',
    lazy: true,
    expectedSize: '20KB',
    description: 'High engagement - early load'
  },
  
  // Products - Heavy component, strategic loading
  HorizontalProductScrollV6: {
    rootMargin: '75vh', 
    priority: 'high',
    lazy: true,
    expectedSize: '86KB',
    description: 'Heavy component - preemptive load'
  },
  
  // Services - Standard loading
  ServicesOrbitalAtomic: {
    rootMargin: '50vh',
    priority: 'medium',
    lazy: true,
    expectedSize: '11KB',
    description: 'Medium component - standard load'
  },

  // Process - Keep eager (small and stable)
  ProcessLegacyAtomic: {
    rootMargin: '0px',
    priority: 'medium',
    lazy: false,
    expectedSize: '5KB',
    description: 'Small component - keep eager'
  },
  
  // Contact - Late loading, bottom of page
  ContactTerminalAtomic: {
    rootMargin: '25vh',
    priority: 'low', 
    lazy: true,
    expectedSize: '9KB',
    description: 'Footer component - late load'
  }
};

// Performance thresholds for different device capabilities
export const PERFORMANCE_STRATEGIES = {
  minimal: {
    // Aggressive lazy loading for low-end devices - convert vh to px
    adjustRootMargin: (margin) => {
      if (margin.includes('vh')) {
        const value = parseInt(margin);
        const adjustedValue = Math.max(25, value - 25);
        // Convert vh to px (approximate: 1vh ≈ window.innerHeight/100)
        const pixelValue = Math.round((adjustedValue / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800));
        return `${pixelValue}px`;
      }
      return margin;
    },
    preloadCount: 1
  },
  
  low: {
    // Conservative lazy loading for low-end devices
    adjustRootMargin: (margin) => {
      if (margin.includes('vh')) {
        const value = parseInt(margin);
        const adjustedValue = Math.max(35, value - 15);
        const pixelValue = Math.round((adjustedValue / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800));
        return `${pixelValue}px`;
      }
      return margin;
    },
    preloadCount: 1
  },
  
  medium: {
    // Standard lazy loading
    adjustRootMargin: (margin) => {
      if (margin.includes('vh')) {
        const value = parseInt(margin);
        const pixelValue = Math.round((value / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800));
        return `${pixelValue}px`;
      }
      return margin;
    },
    preloadCount: 2
  },
  
  high: {
    // More aggressive preloading for high-end devices
    adjustRootMargin: (margin) => {
      if (margin.includes('vh')) {
        const value = parseInt(margin);
        const adjustedValue = value + 25;
        const pixelValue = Math.round((adjustedValue / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800));
        return `${pixelValue}px`;
      }
      return margin;
    },
    preloadCount: 3
  }
};

// Get strategy for a component with performance adjustments
export const getLoadingStrategy = (componentName, performanceTier = 'medium') => {
  const baseStrategy = LOADING_STRATEGIES[componentName];
  if (!baseStrategy) {
    console.warn(`No loading strategy found for component: ${componentName}`);
    return {
      rootMargin: '400px', // Safe default in pixels
      priority: 'medium',
      lazy: true,
      description: 'Default fallback strategy'
    };
  }

  const performanceAdjustment = PERFORMANCE_STRATEGIES[performanceTier];
  if (!performanceAdjustment) {
    console.warn(`No performance strategy found for tier: ${performanceTier}. Using medium.`);
    const fallbackAdjustment = PERFORMANCE_STRATEGIES['medium'];
    return {
      ...baseStrategy,
      rootMargin: fallbackAdjustment.adjustRootMargin(baseStrategy.rootMargin),
      performanceTier: 'medium'
    };
  }
  
  return {
    ...baseStrategy,
    rootMargin: performanceAdjustment.adjustRootMargin(baseStrategy.rootMargin),
    performanceTier
  };
};

// Component priority order for preloading
export const PRELOAD_ORDER = [
  'HeroAtomic',        // Critical - always first
  'MissionAtomic',     // High - users always scroll here
  'HorizontalProductScrollV6', // High - but heavy, so second
  'ServicesOrbitalAtomic',     // Medium
  'ContactTerminalAtomic'      // Low - footer
];

export default LOADING_STRATEGIES; 