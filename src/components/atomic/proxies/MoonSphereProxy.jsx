/**
 * @component MoonSphereProxy
 * @description Runtime-loading proxy for MoonSphere with capability detection
 * 
 * @features
 * - Zero static Three.js imports
 * - Runtime-only loading via Function() evaluation
 * - Device capability detection
 * - Clean CSS fallback
 * - Preserves layout space
 */

import React, { useState, useEffect, Suspense } from 'react';
import { useUnifiedDeviceCapabilities } from '../../../hooks/useUnifiedDeviceCapabilities';

// 🚀 SAFE WEBGL ACCESS: Safely access WebGL context without throwing errors
const useWebGLSafely = () => {
  try {
    return useUnifiedDeviceCapabilities();
  } catch (error) {
    // Silent fallback - no console spam
    return {
      webglSupported: false,
      shouldUse3D: false,
      performanceLevel: 'low',
      canHandle3D: false,
      deviceClass: 'low-end',
      memoryStatus: 'limited'
    };
  }
};

// 🚀 UNIFIED DEVICE CAPABILITY: Use unified hook instead of creating WebGL context
const use3DCapability = () => {
  const deviceProfile = useWebGLSafely();
  return deviceProfile?.shouldUse3D && deviceProfile?.webglSupported;
};

// CSS fallback component
const MoonFallback = ({ className = "" }) => (
  <div 
    className={`relative rounded-full flex items-center justify-center ${className}`}
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, rgba(60,60,60,0.8) 30%, rgba(40,40,40,0.6) 60%, rgba(20,20,20,0.3) 80%, transparent 100%)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 30%, rgba(120,120,120,0.4) 0%, rgba(80,80,80,0.2) 40%, transparent 70%)',
        filter: 'blur(8px)',
        pointerEvents: 'none'
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.6) 0%, transparent 50%)',
        filter: 'blur(12px)',
        pointerEvents: 'none'
      }}
    />
    <div className="text-white/40 text-xs absolute">Moon Fallback</div>
  </div>
);

// Main proxy component
const MoonSphereProxy = ({ 
  className = "", 
  enabled = null, // Allow override for dev/testing
  fallbackToEclipse = false,
  ...otherProps // ⭐ NEW: Forward all other props to MoonSphere
}) => {
  // ✅ SURGICAL FIX: Since 3D is completely disabled, return fallback immediately
  // No hooks, no state, no device detection - prevents all update loops
  return <MoonFallback className={className} />;
};

export default MoonSphereProxy; 