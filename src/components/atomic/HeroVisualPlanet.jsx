/**
 * @component HeroVisualPlanet
 * @description Hero section planet with conditional 3D/2D rendering
 * @version 1.0.0
 * @type atomic
 */

import React, { Suspense, useState, useEffect, lazy } from 'react';
import { motion } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';

// ✅ Static import for dev environment
const EarthSphereProxy = lazy(() => import('../proxies/EarthSphereProxy'));

// 🚀 CRITICAL: Replace device capability detection with unified provider
import { useUnifiedDeviceCapabilities } from '../../hooks/useUnifiedDeviceCapabilities';

// 🚀 UNIFIED DEVICE CAPABILITY HOOK - No more WebGL context creation
const use3DCapability = () => {
  const deviceProfile = useUnifiedDeviceCapabilities();
  
  // Return early if profile not ready
  if (!deviceProfile) {
    return false;
  }

  // Use the unified assessment instead of creating our own WebGL context
  const shouldUse3D = deviceProfile.shouldUse3D && 
                     (deviceProfile.isDesktop || deviceProfile.isTablet) &&
                     deviceProfile.hasEnoughMemory;

  console.log('🌍 Unified 3D Capability Check:', {
    webglSupported: deviceProfile.webglSupported,
    performanceLevel: deviceProfile.performanceLevel,
    isDesktop: deviceProfile.isDesktop,
    isTablet: deviceProfile.isTablet,
    hasEnoughMemory: deviceProfile.hasEnoughMemory,
    shouldUse3D: shouldUse3D
  });

  return shouldUse3D;
};

// Fallback 2D implementation using CSS/SVG
const FallbackPlanet2D = ({ sceneStep = 0, className = '' }) => {
  return (
    <div 
      className={`relative w-full h-full opacity-100 scale-100 ${className}`}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
        <div className="text-white/60 text-sm">3D Earth Disabled</div>
      </div>
    </div>
  );
};

const HeroVisualPlanet = ({ sceneStep = 0, className = '', size = 400 }) => {
  const use3D = use3DCapability();
  const deviceProfile = useUnifiedDeviceCapabilities();
  
  // Use unified device detection instead of manual checks
  const isMobile = deviceProfile?.isMobile || false;
  const isTablet = deviceProfile?.isTablet || false;
  
  // Responsive sizing based on device type
  const responsiveSize = React.useMemo(() => {
    if (isMobile) return size * 0.6; // 240px on mobile (60% of 400px)
    if (isTablet) return size * 0.8; // 320px on tablet (80% of 400px)
    return size; // 400px on desktop
  }, [size, isMobile, isTablet]);
  
  // Responsive positioning
  const responsiveClasses = React.useMemo(() => {
    if (isMobile) return 'top-[10%] right-[5%]'; // Closer to top-right on mobile
    if (isTablet) return 'top-[12%] right-[10%]'; // Slightly adjusted on tablet
    return 'top-[15%] right-[15%]'; // Original desktop positioning
  }, [isMobile, isTablet]);
  
  return (
    <div 
      className={`absolute ${responsiveClasses} pointer-events-none ${className}`}
      style={{ 
        width: responsiveSize * 2.25, // Responsive: 540px mobile, 720px tablet, 900px desktop
        height: responsiveSize * 2.25,
        zIndex: 140
      }}
      aria-hidden="true"
    >
      {use3D ? (
        <Suspense fallback={<div className="text-white/50">Loading Earth...</div>}>
          <EarthSphereProxy 
            enabled={true}
            sceneStep={sceneStep} 
            className="w-full h-full" 
          />
        </Suspense>
      ) : (
        <FallbackPlanet2D sceneStep={sceneStep} />
      )}
    </div>
  );
};

export default HeroVisualPlanet; 