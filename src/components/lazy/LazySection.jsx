import React from 'react';
import useInViewport from '../../hooks/useInViewport';

/**
 * @component LazySection
 * @description Reusable lazy loading wrapper using Intersection Observer
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Features:
 * - Viewport-based lazy loading
 * - Configurable loading distances
 * - Custom fallback components
 * - Performance optimized
 */

// Default loading fallback component
const SectionLoader = ({ sectionName = "Content", height = "min-h-screen" }) => (
  <div className={`${height} flex items-center justify-center bg-black/50 backdrop-blur-sm`}>
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-lime-400/60 text-sm font-space">Loading {sectionName}...</div>
      <div className="text-lime-400/30 text-xs font-space mt-2">Preparing content...</div>
    </div>
  </div>
);

const LazySection = ({ 
  children, 
  fallback = null, 
  offset = '50vh',
  className = "min-h-screen",
  sectionName = "Content",
  height = "min-h-screen",
  threshold = 0.1,
  debug = false
}) => {
  const [ref, inView, hasBeenInView] = useInViewport({ 
    rootMargin: offset,
    triggerOnce: true,
    threshold
  });

  // Use custom fallback or default loader
  const LoadingComponent = fallback || <SectionLoader sectionName={sectionName} height={height} />;

  // Debug logging
  if (debug) {
    console.log(`LazySection ${sectionName}:`, { inView, hasBeenInView, offset });
  }

  return (
    <div ref={ref} className={className}>
      {hasBeenInView ? children : LoadingComponent}
      
      {/* Debug indicator */}
      {debug && (
        <div className="fixed top-4 left-4 z-[9999] bg-blue-600/90 text-white text-xs p-2 rounded">
          {sectionName}: {hasBeenInView ? '✅ Loaded' : '⏳ Waiting'}
        </div>
      )}
    </div>
  );
};

export default LazySection;
export { SectionLoader }; 