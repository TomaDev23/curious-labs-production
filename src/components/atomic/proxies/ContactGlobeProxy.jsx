/**
 * @component ContactGlobeProxy
 * @description Simplified proxy for ContactGlobe - no duplicate fallbacks
 * @version 3.0.0
 * @cleaned Removed duplicate fallback - ContactGlobeWithCanvas handles all loading states
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';

// 🌍 Clean lazy load - let ContactGlobeWithCanvas handle all loading states
const ContactGlobeWithCanvas = lazy(() => 
  import('../../../3d/components/contact/ContactGlobeWithCanvas').catch((error) => {
    console.warn('Failed to load ContactGlobe:', error);
    return { default: () => <div className="w-full h-full flex items-center justify-center text-white/60">3D Globe Unavailable</div> };
  })
);

const ContactGlobeProxy = () => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [deviceCapable, setDeviceCapable] = useState(true);

  // Device capability check
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Only load 3D if device is capable
      const capable = !prefersReducedMotion && !isLowMemory;
      setDeviceCapable(capable);
      
      // Auto-load 3D after a brief delay if device is capable
      if (capable) {
        setTimeout(() => {
          setShouldLoad3D(true);
        }, 300); // Reduced delay
      }
    };

    checkDevice();
  }, []);

  // 🚀 Simplified: Let ContactGlobeWithCanvas handle all loading states
  if (!deviceCapable) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/60 text-sm">3D Globe disabled for performance</div>
      </div>
    );
  }

  if (!shouldLoad3D) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ContactGlobeWithCanvas />
    </Suspense>
  );
};

export default ContactGlobeProxy;