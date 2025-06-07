/**
 * @component ContactGlobeWithCanvas  
 * @description Lightweight proxy for 3D Planet scene - prevents bundle contamination
 * @refactored Lazy loading proxy - 3D assets moved to /src/3d/
 */

import React, { lazy, Suspense, useState } from 'react';

// 🚀 LAZY IMPORT - 3D scene only loads when needed
// DISABLED: 3D scene removed during surgical cleanup - prevents runtime crash
// const AegisPlanet3DScene = lazy(() => import('../../3d/scenes/home/AegisPlanet3DScene.jsx'));

// 📱 Loading fallback
const Planet3DLoader = () => (
  <div className="relative w-full h-full bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div className="absolute bottom-4 left-4 text-indigo-300 text-sm opacity-75">
      Loading 3D Scene...
    </div>
  </div>
);

// 🌍 MAIN PROXY COMPONENT
const ContactGlobeWithCanvas = ({ 
  interactive = false,
  scale = 1,
  className = "",
  autoLoad = true
}) => {
  const [shouldLoad, setShouldLoad] = useState(autoLoad);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Auto-trigger loading when in view
  React.useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [inView, shouldLoad]);

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      {shouldLoad ? (
        <Suspense fallback={<Planet3DLoader />}>
          {/* DISABLED: 3D Scene temporarily disabled during rebuild */}
          <div className="w-full h-64 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg flex items-center justify-center text-white">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-indigo-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">3D Scene Temporarily Disabled</h3>
              <p className="text-sm text-indigo-400">Will be restored in next update</p>
            </div>
          </div>
        </Suspense>
      ) : (
        <div 
          className="relative w-full h-full bg-gradient-to-b from-indigo-900/10 to-purple-900/10 rounded-lg cursor-pointer hover:from-indigo-900/20 hover:to-purple-900/20 transition-colors"
          onClick={() => setShouldLoad(true)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 border-2 border-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-4-4h8l-4 4z"/>
                </svg>
              </div>
              <p className="text-indigo-300 text-sm">Click to load 3D Scene</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactGlobeWithCanvas; 