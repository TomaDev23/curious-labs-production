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
  
  // Check 3D capability (but we'll bypass it anyway due to our earlier fix)
  const has3DCapability = use3DCapability();
  
  // 🚀 TEMPORARY BYPASS: Force 3D loading to debug white disk issue
  const force3D = true; // Always load 3D for debugging
  
  useEffect(() => {
    // Force load the 3D Moon component
    const loadMoonComponent = async () => {
      try {
        setIsLoading(true);
        
        // 🚀 BYPASS: Skip capability check and force load 3D
        if (!force3D) {
          console.log('3D capability check failed, using fallback');
          setHasError(true);
          setIsLoading(false);
          return;
        }
        
        // Import the MissionMoon component and Canvas wrapper
        const [
          { default: MissionMoon },
          { Canvas },
          { OrbitControls }
        ] = await Promise.all([
          import('../../../3d/components/moon/MissionMoon'),
          import('@react-three/fiber'),
          import('@react-three/drei')
        ]);
        
        // Create a Canvas-wrapped version of MissionMoon
        const MissionMoonWithCanvas = (props) => {
          console.log('🌙 Rendering MissionMoon with Canvas wrapper', props);
          return (
            <Canvas
              shadows
              camera={{ position: [0, 0, 25], fov: 25 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                autoRotateSpeed={0}
              />
              <Suspense fallback={null}>
                <MissionMoon {...props} />
              </Suspense>
            </Canvas>
          );
        };
        
        console.log('🌙 MissionMoon component loaded successfully');
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
  }, []);
  
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