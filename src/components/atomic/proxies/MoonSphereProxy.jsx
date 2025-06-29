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

// 🚀 SIMPLE WEBGL CHECK: Avoid infinite loops by using a simple static check
const hasWebGLSupport = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;
    
    // Clean up
    if (gl) {
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) loseContext.loseContext();
    }
    canvas.remove();
    
    return hasWebGL;
  } catch (error) {
    return false;
  }
};

// CSS fallback component
const MoonFallback = ({ className = "" }) => (
  <div 
    className={`relative rounded-full flex items-center justify-center ${className}`}
    style={{
      width: '75%',
      height: '75%',
      transform: 'translate(70px, 70px)', // One click right (15px), two clicks down (25px)
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
  // BYPASS: Enable 3D Moon loading instead of hardcoded fallback
  const [MoonComponent, setMoonComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // 🚀 SIMPLE CHECK: Use a simple one-time WebGL check to avoid infinite loops
  const [webglSupported] = useState(() => hasWebGLSupport());
  
  useEffect(() => {
    // Force load the 3D Moon component
    const loadMoonComponent = async () => {
      try {
        setIsLoading(true);
        
        // 🚀 SIMPLE CHECK: Skip capability check and force load 3D if WebGL is supported
        if (!webglSupported) {
          console.log('WebGL not supported, using fallback');
          setHasError(true);
          setIsLoading(false);
          return;
        }
        
        // Import the existing MissionMoonWithCanvas (which already has Canvas wrapper)
        const { default: MissionMoonWithCanvas } = await import('../../../3d/components/moon/MissionMoonWithCanvas');
        
        console.log('🌙 MissionMoonWithCanvas component loaded successfully');
        setMoonComponent(() => MissionMoonWithCanvas);
        setHasError(false);
      } catch (error) {
        console.error('🚨 Failed to load 3D Moon component:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMoonComponent();
  }, [webglSupported]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`relative rounded-full flex items-center justify-center ${className}`}>
        <div className="text-white/60 text-sm animate-pulse">🌙 Loading Moon...</div>
      </div>
    );
  }
  
  // Show error fallback
  if (hasError || !MoonComponent) {
    return <MoonFallback className={className} />;
  }
  
  // Render the actual 3D Moon component
  return (
    <Suspense fallback={<MoonFallback className={className} />}>
      <MoonComponent 
        className={className}
        fallbackToEclipse={fallbackToEclipse}
        {...otherProps}
      />
    </Suspense>
  );
};

export default MoonSphereProxy; 