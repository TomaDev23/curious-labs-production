import React from 'react';

/**
 * @component SectionLoaders
 * @description Component-specific loading fallbacks for different homepage sections
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Features:
 * - Component-aware loading states
 * - Size and priority indicators
 * - Performance-optimized animations
 * - Consistent design language
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

// Mission section loader - matches mission theme
export const MissionLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="high" backgroundColor="bg-gradient-to-b from-black to-gray-900/50">
    <div className="text-lime-400/70 text-sm font-space mb-2">Loading Mission</div>
    <div className="text-lime-400/40 text-xs font-space">Preparing strategy overview...</div>
    <div className="mt-3 text-lime-400/30 text-xs">~20KB • High Priority</div>
  </BaseLoader>
);

// Products section loader - indicates heavy content
export const ProductsLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="high" backgroundColor="bg-gradient-to-r from-black via-gray-900/50 to-black">
    <div className="text-lime-400/70 text-sm font-space mb-2">Loading Products</div>
    <div className="text-lime-400/40 text-xs font-space">Initializing product showcase...</div>
    <div className="mt-3 text-lime-400/30 text-xs">~86KB • Heavy Component</div>
    <div className="mt-1 text-lime-400/20 text-xs">Please wait...</div>
  </BaseLoader>
);

// Services section loader - orbital theme
export const ServicesLoader = ({ height = "min-h-screen" }) => (
  <BaseLoader height={height} priority="medium" backgroundColor="bg-black/60">
    <div className="text-emerald-400/70 text-sm font-space mb-2">Loading Services</div>
    <div className="text-emerald-400/40 text-xs font-space">Preparing service matrix...</div>
    <div className="mt-3 text-emerald-400/30 text-xs">~11KB • Standard Load</div>
  </BaseLoader>
);

// Contact section loader - terminal theme
export const ContactLoader = ({ height = "min-h-[80vh]" }) => (
  <BaseLoader height={height} priority="low" backgroundColor="bg-gradient-to-t from-gray-900/80 to-black/40">
    <div className="text-cyan-400/70 text-sm font-space mb-2">Loading Contact</div>
    <div className="text-cyan-400/40 text-xs font-space">Initializing terminal...</div>
    <div className="mt-3 text-cyan-400/30 text-xs">~9KB • Footer Component</div>
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
    <div className="text-white/40 text-xs font-space">Preparing content...</div>
    <div className="mt-3 text-white/30 text-xs">{size} • {priority} priority</div>
  </BaseLoader>
);

// Loader selector based on component name
export const getLoaderComponent = (componentName, props = {}) => {
  const loaderMap = {
    'MissionAtomic': MissionLoader,
    'HorizontalProductScrollV6': ProductsLoader, 
    'ServicesOrbitalAtomic': ServicesLoader,
    'ContactTerminalAtomic': ContactLoader
  };

  const LoaderComponent = loaderMap[componentName] || GenericSectionLoader;
  
  return <LoaderComponent {...props} />;
};

// Performance-aware loader with reduced animations
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
          <div className="w-6 h-6 bg-lime-400/60 rounded-full mx-auto mb-3"></div>
          <div className="text-lime-400/60 text-xs font-space">Loading...</div>
        </div>
      </div>
    );
  }

  return getLoaderComponent(componentName, props);
};

export default {
  MissionLoader,
  ProductsLoader, 
  ServicesLoader,
  ContactLoader,
  GenericSectionLoader,
  getLoaderComponent,
  PerformanceAwareLoader
}; 