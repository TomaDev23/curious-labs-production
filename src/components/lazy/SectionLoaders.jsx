import React from 'react';

/**
 * @component SectionLoaders
 * @description Component-specific loading fallbacks for different homepage sections
 * @version 1.1.0 - Fixed JSX Literal Issue
 * @author CuriousLabs
 * 
 * Features:
 * - Component-aware loading states
 * - Size and priority indicators
 * - Performance-optimized animations
 * - Consistent design language
 * - Proper component function exports
 */

// Base loader component with common styling
const BaseLoader = ({ 
  children, 
  height = "min-h-screen", 
  backgroundColor = "bg-black/50",
  priority = "medium"
}) => {
  const priorityColors = {
    critical: "border-red-400",
    high: "border-lime-400", 
    medium: "border-emerald-400",
    low: "border-cyan-400"
  };

  return (
    <div className={`${height} flex items-center justify-center ${backgroundColor} backdrop-blur-sm`}>
      <div className="text-center">
        <div className={`w-8 h-8 border-2 ${priorityColors[priority]} border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
        {children}
      </div>
    </div>
  );
};

// Mission section loader - lime theme
export const MissionLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="high" backgroundColor="bg-black/80">
    <div className="text-lime-400/70 text-sm font-space mb-2">Loading Mission</div>
    <div className="text-lime-400/80 text-xs font-space">Initializing command center...</div>
    <div className="mt-3 text-lime-400/70 text-xs">~22KB • Critical Component</div>
  </BaseLoader>
);

// Products section loader - lime theme
export const ProductsLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="high" backgroundColor="bg-black/70">
    <div className="text-lime-400/70 text-sm font-space mb-2">Loading Products</div>
    <div className="text-lime-400/80 text-xs font-space">Preparing product matrix...</div>
    <div className="mt-3 text-lime-400/70 text-xs">~86KB • Heavy Component</div>
    <div className="mt-1 text-lime-400/60 text-xs">Please wait...</div>
  </BaseLoader>
);

// Services section loader - orbital theme
export const ServicesLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="medium" backgroundColor="bg-black/60">
    <div className="text-emerald-400/70 text-sm font-space mb-2">Loading Services</div>
    <div className="text-emerald-400/80 text-xs font-space">Preparing service matrix...</div>
    <div className="mt-3 text-emerald-400/70 text-xs">~11KB • Standard Load</div>
  </BaseLoader>
);

// Contact section loader - terminal theme
export const ContactLoader = ({ height = "min-h-[80vh]" }) => (
  <BaseLoader height={height} priority="low" backgroundColor="bg-gradient-to-t from-gray-900/80 to-black/40">
    <div className="text-cyan-400/70 text-sm font-space mb-2">Loading Contact</div>
    <div className="text-cyan-400/80 text-xs font-space">Initializing terminal...</div>
    <div className="mt-3 text-cyan-400/70 text-xs">~9KB • Footer Component</div>
  </BaseLoader>
);

// Generic fallback loader
export const GenericSectionLoader = ({ 
  sectionName = "Content", 
  height = "min-h-screen",
  priority = "medium",
  size = "Unknown"
}) => (
  <BaseLoader height={height} priority={priority}>
    <div className="text-white/70 text-sm font-space mb-2">Loading {sectionName}</div>
    <div className="text-white/80 text-xs font-space">Preparing content...</div>
    <div className="mt-3 text-white/70 text-xs">{size} • {priority} priority</div>
  </BaseLoader>
);

// Safe mode fallback loader
export const SafeModeLoader = ({ componentName = "Component", error = null }) => (
  <div className="min-h-screen flex items-center justify-center bg-black/90">
    <div className="text-center p-8 bg-gray-900/50 border border-red-400/30 rounded-lg max-w-md mx-4">
      <div className="text-red-400 text-lg font-space mb-4">⚠️ Safe Mode</div>
      <div className="text-white/70 text-sm mb-2">Failed to load: {componentName}</div>
      <div className="text-white/70 text-xs mb-4">System has switched to safe mode</div>
      {error && (
        <details className="text-left text-xs text-white/70 bg-black/30 p-2 rounded">
          <summary className="cursor-pointer">Error Details</summary>
          <pre className="mt-2 whitespace-pre-wrap">{error.toString()}</pre>
        </details>
      )}
      <div className="mt-4 text-white/60 text-xs">
        Refresh page or check console for more details
      </div>
    </div>
  </div>
);

// FIXED: Loader selector that returns component functions, not JSX
export const getLoaderComponent = (componentName, performanceTier = 'moderate') => {
  const loaderMap = {
    'MissionAtomic': MissionLoader,
    'HorizontalProductScrollV6': ProductsLoader, 
    'ServicesOrbitalAtomic': ServicesLoader,
    'ContactTerminalAtomic': ContactLoader
  };

  // Return the component function, not JSX
  const LoaderComponent = loaderMap[componentName] || GenericSectionLoader;
  
  return LoaderComponent;
};

// Performance-aware loader component wrapper
export const PerformanceAwareLoader = ({ 
  componentName,
  performanceTier = 'moderate',
  ...props 
}) => {
  // Reduce animations for low-end devices
  const shouldReduceMotion = performanceTier === 'minimal';
  
  if (shouldReduceMotion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="text-center">
          <div className="w-6 h-6 bg-lime-400/70 rounded-full mx-auto mb-3"></div>
          <div className="text-lime-400/80 text-xs font-space">Loading...</div>
        </div>
      </div>
    );
  }

  const LoaderComponent = getLoaderComponent(componentName, performanceTier);
  return <LoaderComponent {...props} />;
};

export default {
  MissionLoader,
  ProductsLoader, 
  ServicesLoader,
  ContactLoader,
  GenericSectionLoader,
  SafeModeLoader,
  getLoaderComponent,
  PerformanceAwareLoader
}; 