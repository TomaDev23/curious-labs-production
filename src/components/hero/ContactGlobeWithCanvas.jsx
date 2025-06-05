/**
 * @component ContactGlobeWithCanvas  
 * @description Lightweight proxy for 3D Planet scene - prevents bundle contamination
 * @refactored Lazy loading proxy - 3D assets moved to /src/3d/
 */

import React, { lazy, Suspense, useState } from 'react';
import { useInView } from 'framer-motion';

// 🚀 LAZY IMPORT - 3D scene only loads when needed
const AegisPlanet3DScene = lazy(() => import('../../3d/scenes/home/AegisPlanet3DScene.jsx'));

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
          <AegisPlanet3DScene 
            interactive={interactive}
            scale={scale}
          />
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