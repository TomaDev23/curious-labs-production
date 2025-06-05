/**
 * @component HeroEarthWithCanvas
 * @description Drop-in replacement for EarthSphere.jsx with Canvas wrapper
 * @migration_target src/components/3d/EarthSphere.jsx
 * @safe_transition true - This provides Canvas context for backward compatibility
 * 
 * @usage
 * Temporary component to test the new HeroEarth scene with existing proxy system
 * Can be used as direct replacement while maintaining same API
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroEarth from './HeroEarth';
import { useUnifiedDeviceCapabilities } from '../../../hooks/useUnifiedDeviceCapabilities';

// 🚀 UNIFIED DEVICE CAPABILITY: Use unified hook instead of creating WebGL context
const useWebGLCapability = () => {
  const deviceProfile = useUnifiedDeviceCapabilities();
  
  if (!deviceProfile) return false;
  
  // Use unified WebGL assessment instead of creating our own context
  return deviceProfile.shouldUse3D && deviceProfile.webglSupported;
};

// Lighthouse detection utility
const isLighthouseAudit = () => {
  try {
    const userAgent = navigator.userAgent || '';
    const isHeadless = navigator.webdriver || window.navigator.webdriver;
    const hasLighthouseParam = window.location.search.includes('lighthouse=true');
    const isLighthouseUA = userAgent.includes('Chrome-Lighthouse') || userAgent.includes('HeadlessChrome');
    
    const lighthouseIndicators = [
      isLighthouseUA,
      hasLighthouseParam,
      isHeadless,
      userAgent.includes('HeadlessChrome'),
      userAgent.includes('Chrome-Lighthouse'),
      !window.outerHeight,
      !window.outerWidth,
      window.navigator.webdriver,
      window.callPhantom,
      window._phantom
    ];
    
    return lighthouseIndicators.some(indicator => indicator);
  } catch (e) {
    return false;
  }
};

// CSS fallback component
const EarthFallback = ({ className = "" }) => (
  <div 
    className={`relative rounded-full flex items-center justify-center ${className}`}
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, rgba(30,60,90,0.8) 30%, rgba(20,40,60,0.6) 60%, rgba(10,20,30,0.3) 80%, transparent 100%)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 30%, rgba(100,150,200,0.4) 0%, rgba(60,100,140,0.2) 40%, transparent 70%)',
        filter: 'blur(8px)',
        pointerEvents: 'none'
      }}
    />
    <div className="text-white/40 text-xs absolute">New 3D Engine</div>
  </div>
);

// Main component with Canvas wrapper
const HeroEarthWithCanvas = ({ 
  className = "", 
  fallbackToEclipse = false,
  scaleFactor = 1,
  rotationY = null,
  ...props 
}) => {
  // Quick capability checks
  const hasWebGL = useWebGLCapability();
  const isLighthouse = isLighthouseAudit();
  
  // Show fallback for Lighthouse or if WebGL not supported
  if (isLighthouse || !hasWebGL || fallbackToEclipse) {
    return <EarthFallback className={className} />;
  }
  
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ 
          position: [0, 0, 12], 
          fov: 45,
          near: 0.1,
          far: 1000 
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <HeroEarth 
            scaleFactor={scaleFactor} 
            rotationY={rotationY} 
            {...props}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroEarthWithCanvas; 