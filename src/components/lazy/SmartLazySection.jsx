/**
 * @component SmartLazySection
 * @description Intelligent lazy loading wrapper with performance analytics, debug utilities, and safe mode fallback
 * @version 2.4.0 - Smart Logging (Reduced Console Spam)
 * @author CuriousLabs
 * 
 * Features:
 * - Strategy-based loading distances
 * - Performance-aware adjustments
 * - Component-specific loaders
 * - Priority-based optimization
 * - Safe mode fallback on errors
 * - Production-ready error boundaries
 * - Comprehensive error handling
 * - Smart logging to reduce console spam
 */

import React, { useState, useRef, useEffect } from 'react';
import useInViewport from '../../hooks/useInViewport';
import { useDeviceCapabilities } from '../../hooks/useBreakpoint';
import { getLoadingStrategy } from '../../config/lazyLoadingStrategies';
import { getLoaderComponent, SafeModeLoader } from './SectionLoaders';
import LazyErrorBoundary from './LazyErrorBoundary';
import performanceAnalytics from '../../utils/performanceAnalytics';
import lazyLoadingDebug from '../../utils/lazyLoadingDebug';

const SmartLazySection = ({ 
  children, 
  componentName,
  customFallback = null,
  className = "",
  debug = false,
  forceStrategy = null,
  enableSafeMode = true
}) => {
  const { performanceTier } = useDeviceCapabilities();
  const [loadStartTime] = useState(() => performance.now());
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [isInSafeMode, setIsInSafeMode] = useState(false);
  const componentRef = useRef(null);
  const errorRetryCount = useRef(0);
  const maxRetries = 3;
  
  // Track previous state for smart logging
  const previousState = useRef(null);

  // Get loading strategy based on component and device capabilities
  const strategy = forceStrategy || getLoadingStrategy(componentName, performanceTier);
  
  // Track component initialization (only once)
  useEffect(() => {
    try {
      lazyLoadingDebug.stats.totalComponents++;
      lazyLoadingDebug.log(`Component initialized: ${componentName}`, {
        strategy: strategy.description,
        performanceTier,
        lazy: strategy.lazy
      });
    } catch (error) {
      console.warn(`Debug tracking failed for ${componentName}:`, error);
    }
  }, [componentName]); // Only run on component name change

  // Safe mode activation
  const activateSafeMode = (error, context = 'unknown') => {
    if (!enableSafeMode) return false;
    
    setIsInSafeMode(true);
    setLoadError(error);
    
    console.error(`🚨 Safe Mode Activated for ${componentName}:`, error);
    
    try {
      lazyLoadingDebug.trackComponentError(componentName, error, {
        context,
        safeMode: true,
        retryCount: errorRetryCount.current
      });
    } catch (debugError) {
      console.warn('Debug error tracking failed:', debugError);
    }
    
    return true;
  };

  // Error boundary for component loading
  const handleComponentError = (error, context) => {
    errorRetryCount.current++;
    
    if (errorRetryCount.current <= maxRetries) {
      console.warn(`${componentName} error (attempt ${errorRetryCount.current}/${maxRetries}):`, error);
      // Don't activate safe mode yet, allow retry
      return;
    }
    
    activateSafeMode(error, context);
  };

  // If component shouldn't be lazy loaded, render immediately
  if (!strategy.lazy) {
    useEffect(() => {
      try {
        const loadTime = performance.now() - loadStartTime;
        lazyLoadingDebug.trackComponentLoad(componentName, loadTime, {
          strategy: strategy.description,
          priority: strategy.priority,
          type: 'immediate',
          performanceTier
        });
      } catch (error) {
        handleComponentError(error, 'immediate-render');
      }
    }, [componentName, strategy.description, strategy.priority, loadStartTime, performanceTier]);

    if (debug || (lazyLoadingDebug.isEnabled && lazyLoadingDebug.verboseMode && !isInSafeMode)) {
      console.log(`🚀 ${componentName}: Immediate render (no lazy loading)`, { strategy });
    }

    if (isInSafeMode) {
      return <SafeModeLoader componentName={componentName} error={loadError} />;
    }

    return (
      <LazyErrorBoundary componentName={componentName} className={className}>
        <div className={className}>
          <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lime-400">Loading...</div></div>}>
            {children}
          </React.Suspense>
        </div>
      </LazyErrorBoundary>
    );
  }

  // Use viewport detection with component-specific settings
  const [ref, inView, hasBeenInView] = useInViewport({
    threshold: strategy.threshold || 0.1,
    rootMargin: strategy.rootMargin,
    triggerOnce: true
  });

  // Track analytics when component enters viewport (only when state changes)
  useEffect(() => {
    if (inView && !hasLoaded && !isInSafeMode) {
      const loadEndTime = performance.now();
      
      try {
        // Track viewport entry
        performanceAnalytics.trackViewportEntry(componentName, strategy, {
          rootMargin: strategy.rootMargin,
          threshold: strategy.threshold || 0.1,
          performanceTier
        });

        lazyLoadingDebug.log(`Viewport entry: ${componentName}`, {
          strategy: strategy.description,
          priority: strategy.priority,
          rootMargin: strategy.rootMargin,
          performanceTier,
          timeToEntry: Math.round(loadEndTime - loadStartTime)
        });

        if (debug) {
          console.log(`📊 ${componentName}: Viewport entry tracked`, {
            strategy: strategy.description,
            priority: strategy.priority,
            rootMargin: strategy.rootMargin,
            performanceTier,
            timeToEntry: Math.round(loadEndTime - loadStartTime)
          });
        }
      } catch (error) {
        handleComponentError(error, 'viewport-entry');
      }
    }
  }, [inView, hasLoaded, isInSafeMode]); // Only dependencies that matter for this effect

  // Track component load completion (only when state changes)
  useEffect(() => {
    if (hasBeenInView && !hasLoaded && !loadError && !isInSafeMode) {
      setHasLoaded(true);
      const loadEndTime = performance.now();
      const loadTime = loadEndTime - loadStartTime;
      
      try {
        // Track lazy load performance
        performanceAnalytics.trackLazyLoad(
          componentName, 
          loadStartTime, 
          loadEndTime,
          {
            strategy: strategy.description,
            priority: strategy.priority,
            bundleSize: strategy.expectedSize,
            performanceTier,
            rootMargin: strategy.rootMargin
          }
        );

        // Track with debug utility
        lazyLoadingDebug.trackComponentLoad(componentName, loadTime, {
          strategy: strategy.description,
          priority: strategy.priority,
          bundleSize: strategy.expectedSize,
          performanceTier,
          rootMargin: strategy.rootMargin
        });

        if (debug || lazyLoadingDebug.verboseMode) {
          console.log(`✅ ${componentName}: Load completed in ${loadTime.toFixed(2)}ms`, {
            strategy: strategy.description,
            priority: strategy.priority,
            expectedSize: strategy.expectedSize,
            performanceTier
          });
        }

      } catch (error) {
        handleComponentError(error, 'load-completion');
      }
    }
  }, [hasBeenInView, hasLoaded, loadError, isInSafeMode]);

  // Handle component errors (only when error state changes)
  useEffect(() => {
    if (loadError && !isInSafeMode) {
      console.error(`❌ ${componentName}: Component error`, loadError);
    }
  }, [loadError, isInSafeMode, componentName]);

  // Smart state tracking for debug info (only log meaningful changes)
  useEffect(() => {
    if (lazyLoadingDebug.isEnabled) {
      const currentState = {
        inView,
        hasBeenInView,
        hasLoaded,
        isInSafeMode,
        loadError: loadError ? loadError.message : null,
        retryCount: errorRetryCount.current,
        strategy: {
          description: strategy.description,
          priority: strategy.priority,
          rootMargin: strategy.rootMargin,
          expectedSize: strategy.expectedSize
        },
        performanceTier,
        loadTime: hasLoaded ? Math.round(performance.now() - loadStartTime) : 'pending'
      };

      // Use the new smart logging method
      lazyLoadingDebug.logStateChange(componentName, currentState, previousState.current);
      
      // Store current state for next comparison
      previousState.current = { ...currentState };
    }
  }, [inView, hasBeenInView, hasLoaded, isInSafeMode, loadError, componentName, strategy, performanceTier, loadStartTime]);

  // Safe mode rendering
  if (isInSafeMode) {
    return <SafeModeLoader componentName={componentName} error={loadError} />;
  }

  // Get appropriate loader component
  let LoaderComponent;
  try {
    LoaderComponent = customFallback || getLoaderComponent(componentName, performanceTier);
  } catch (error) {
    console.error(`Failed to get loader for ${componentName}:`, error);
    LoaderComponent = () => (
      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="text-lime-400/60 text-sm">Loading {componentName}...</div>
      </div>
    );
  }

  return (
    <LazyErrorBoundary componentName={componentName} className={className}>
      <div ref={ref} className={className}>
        <React.Suspense 
          fallback={<LoaderComponent />}
        >
          {hasBeenInView ? children : <LoaderComponent />}
        </React.Suspense>
        
        {/* Enhanced debug indicator with strategy info - only show if explicitly debug=true */}
        {debug && !isInSafeMode && (
          <div className="fixed top-4 right-4 z-[9999] bg-gray-900/95 border border-lime-400/30 text-white text-xs p-3 rounded-lg shadow-xl">
            <div className="font-bold text-lime-400 mb-1">{componentName}</div>
            <div className="space-y-1">
              <div>Status: {hasBeenInView ? '✅ Loaded' : '⏳ Waiting'}</div>
              <div>Strategy: {strategy.rootMargin}</div>
              <div>Priority: <span className={`${strategy.priority === 'high' ? 'text-red-400' : strategy.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>{strategy.priority}</span></div>
              <div>Size: {strategy.expectedSize}</div>
              <div>Tier: {performanceTier}</div>
              {errorRetryCount.current > 0 && (
                <div className="text-yellow-400">Retries: {errorRetryCount.current}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </LazyErrorBoundary>
  );
};

export default SmartLazySection; 