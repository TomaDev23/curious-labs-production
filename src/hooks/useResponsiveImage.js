import { useMemo } from 'react';
import { useResponsive } from './useResponsive';
import { useDeviceCapabilities } from './useDeviceCapabilities';
import { 
  getResponsiveConfig, 
  LOADING_STRATEGIES, 
  DEVICE_OPTIMIZATIONS 
} from '../config/responsiveImages';

/**
 * Custom hook for responsive image optimization
 * Provides optimized image configurations based on device capabilities and use case
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.useCase - Image use case (hero, productCard, gallery, etc.)
 * @param {string} options.loadingStrategy - Loading strategy (critical, aboveFold, standard, belowFold)
 * @param {boolean} options.enableResponsive - Whether to enable responsive images
 * @param {Object} options.customConfig - Custom responsive configuration
 * @returns {Object} Optimized image configuration
 */
export const useResponsiveImage = ({
  useCase = 'standard',
  loadingStrategy = 'standard',
  enableResponsive = true,
  customConfig = null
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { performanceTier, prefersReducedMotion } = useDeviceCapabilities();
  
  // Get base responsive configuration
  const baseConfig = useMemo(() => {
    return customConfig || getResponsiveConfig(useCase);
  }, [useCase, customConfig]);
  
  // Get loading strategy configuration
  const loadingConfig = useMemo(() => {
    return LOADING_STRATEGIES[loadingStrategy] || LOADING_STRATEGIES.standard;
  }, [loadingStrategy]);
  
  // Get device-specific optimizations
  const deviceOptimization = useMemo(() => {
    if (isMobile) return DEVICE_OPTIMIZATIONS.mobile;
    if (isTablet) return DEVICE_OPTIMIZATIONS.tablet;
    return DEVICE_OPTIMIZATIONS.desktop;
  }, [isMobile, isTablet, isDesktop]);
  
  // Generate optimized configuration
  const optimizedConfig = useMemo(() => {
    // Disable responsive images for minimal performance tier
    const shouldUseResponsive = enableResponsive && performanceTier !== 'minimal';
    
    // Adjust loading strategy based on performance tier
    let adjustedRootMargin = loadingConfig.rootMargin;
    if (performanceTier === 'minimal') {
      // More aggressive lazy loading for low-end devices
      const marginValue = parseInt(adjustedRootMargin);
      adjustedRootMargin = `${Math.max(50, marginValue - 100)}px`;
    } else if (performanceTier === 'high') {
      // More preemptive loading for high-end devices
      const marginValue = parseInt(adjustedRootMargin);
      adjustedRootMargin = `${marginValue + 100}px`;
    }
    
    return {
      // Responsive image settings
      responsiveSizes: shouldUseResponsive ? baseConfig.sizes : null,
      sizesAttr: shouldUseResponsive ? baseConfig.sizesAttr : null,
      aspectRatio: baseConfig.aspectRatio,
      
      // Loading optimization
      loading: loadingConfig.loading,
      fetchPriority: loadingConfig.fetchpriority,
      rootMargin: adjustedRootMargin,
      
      // Device optimization
      useOptimized: deviceOptimization.preferredFormat === 'webp',
      maxWidth: deviceOptimization.maxWidth,
      prioritizeSpeed: deviceOptimization.prioritizeSpeed,
      
      // Animation settings
      animate: !prefersReducedMotion,
      
      // Performance flags
      performanceTier,
      shouldUseResponsive
    };
  }, [
    baseConfig, 
    loadingConfig, 
    deviceOptimization, 
    enableResponsive, 
    performanceTier, 
    prefersReducedMotion
  ]);
  
  // Generate LazyImage props
  const lazyImageProps = useMemo(() => {
    return {
      responsiveSizes: optimizedConfig.responsiveSizes,
      sizesAttr: optimizedConfig.sizesAttr,
      aspectRatio: optimizedConfig.aspectRatio,
      useOptimized: optimizedConfig.useOptimized,
      animate: optimizedConfig.animate,
      // Custom root margin for useLazyLoad hook
      lazyLoadOptions: {
        rootMargin: optimizedConfig.rootMargin
      }
    };
  }, [optimizedConfig]);
  
  // Generate OptimizedImage props
  const optimizedImageProps = useMemo(() => {
    return {
      sizes: optimizedConfig.responsiveSizes,
      sizesAttr: optimizedConfig.sizesAttr,
      aspectRatio: optimizedConfig.aspectRatio,
      imgProps: {
        loading: optimizedConfig.loading,
        fetchPriority: optimizedConfig.fetchPriority,
        style: {
          maxWidth: optimizedConfig.maxWidth ? `${optimizedConfig.maxWidth}px` : undefined
        }
      }
    };
  }, [optimizedConfig]);
  
  return {
    // Full configuration object
    config: optimizedConfig,
    
    // Ready-to-use props objects
    lazyImageProps,
    optimizedImageProps,
    
    // Utility functions
    isResponsiveEnabled: optimizedConfig.shouldUseResponsive,
    isHighPerformance: performanceTier === 'high',
    isMobileOptimized: isMobile,
    
    // Debug information (only in development)
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        useCase,
        loadingStrategy,
        performanceTier,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        responsiveEnabled: optimizedConfig.shouldUseResponsive,
        baseConfig,
        loadingConfig,
        deviceOptimization
      }
    })
  };
};

/**
 * Simplified hook for common image use cases
 * @param {string} useCase - Image use case
 * @returns {Object} Simplified responsive image configuration
 */
export const useSimpleResponsiveImage = (useCase = 'standard') => {
  const { lazyImageProps, isResponsiveEnabled } = useResponsiveImage({ useCase });
  
  return {
    ...lazyImageProps,
    isResponsive: isResponsiveEnabled
  };
};

export default useResponsiveImage; 