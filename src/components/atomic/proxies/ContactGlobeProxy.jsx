/**
 * @component ContactGlobeProxy
 * @description Safety proxy for ContactGlobe with automatic fallback
 * @version 2.0.0
 * @restored CRITICAL - 3D Globe functionality restored for v6_atomic homepage
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';

// 🌍 RESTORED: Lazy load the actual 3D ContactGlobe
const ContactGlobeWithCanvas = lazy(() => import('../../../3d/components/contact/ContactGlobeWithCanvas'));

// Smart Fallback Component with visual continuity
const ContactGlobeFallback = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-96 h-96 rounded-full overflow-hidden">
      {/* Globe sphere with country-like appearance */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(100, 149, 237, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(25, 25, 112, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #062056 0%, #1e1b4b 100%)
          `
        }}
      />
      
      {/* Animated connection lines */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" 
             style={{ animationDuration: '3s' }} />
      </div>
      
      {/* Terminal text overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 font-mono text-lime-400 text-xs opacity-80">
        <div>$ connecting_to_server...</div>
        <div>$ establishing_link...</div>
        <div>$ ready_for_transmission</div>
        <div className="flex items-center">
          <span>$</span>
          <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  </div>
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
        setTimeout(() => setShouldLoad3D(true), 500);
      }
    };

    checkDevice();
  }, []);

  // 🚀 RESTORED: Return actual 3D globe or fallback based on capability
  if (!deviceCapable || !shouldLoad3D) {
    return <ContactGlobeFallback />;
  }

  return (
    <Suspense fallback={<ContactGlobeFallback />}>
      <ContactGlobeWithCanvas />
    </Suspense>
  );
};

export default ContactGlobeProxy; 