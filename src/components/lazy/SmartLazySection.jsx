import React from 'react';
import useInViewport from '../../hooks/useInViewport';
import { useDeviceCapabilities } from '../../hooks/useBreakpoint';
import { getLoadingStrategy } from '../../config/lazyLoadingStrategies';
import { getLoaderComponent, PerformanceAwareLoader } from './SectionLoaders';

/**
 * @component SmartLazySection
 * @description Enhanced lazy loading wrapper with intelligent loading strategies
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Features:
 * - Strategy-based loading distances
 * - Performance-aware adjustments
 * - Component-specific loaders
 * - Priority-based optimization
 */

const SmartLazySection = ({ 
  children, 
  componentName,
  customFallback = null,
  className = "",
  debug = false,
  forceStrategy = null
}) => {
  const { performanceTier } = useDeviceCapabilities();
  
  // Get loading strategy for this component
  const strategy = forceStrategy || getLoadingStrategy(componentName, performanceTier);
  
  // Skip lazy loading for non-lazy components
  if (!strategy.lazy) {
    if (debug) {
      console.log(`SmartLazySection ${componentName}: Skipping lazy loading (eager component)`);
    }
    return <div className={className}>{children}</div>;
  }

  const [ref, inView, hasBeenInView] = useInViewport({ 
    rootMargin: strategy.rootMargin,
    triggerOnce: true,
    threshold: 0.1
  });

  // Use custom fallback or component-specific loader
  const LoadingComponent = customFallback || 
    <PerformanceAwareLoader 
      componentName={componentName}
      performanceTier={performanceTier}
    />;

  // Debug logging with strategy info
  if (debug) {
    console.log(`SmartLazySection ${componentName}:`, {
      inView,
      hasBeenInView,
      strategy: strategy.rootMargin,
      priority: strategy.priority,
      performanceTier,
      expectedSize: strategy.expectedSize
    });
  }

  return (
    <div ref={ref} className={className}>
      {hasBeenInView ? children : LoadingComponent}
      
      {/* Enhanced debug indicator with strategy info */}
      {debug && (
        <div className="fixed top-4 right-4 z-[9999] bg-gray-900/95 border border-lime-400/30 text-white text-xs p-3 rounded-lg shadow-xl">
          <div className="font-bold text-lime-400 mb-1">{componentName}</div>
          <div className="space-y-1">
            <div>Status: {hasBeenInView ? '✅ Loaded' : '⏳ Waiting'}</div>
            <div>Strategy: {strategy.rootMargin}</div>
            <div>Priority: <span className={`${strategy.priority === 'high' ? 'text-red-400' : strategy.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>{strategy.priority}</span></div>
            <div>Size: {strategy.expectedSize}</div>
            <div>Tier: {performanceTier}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartLazySection; 