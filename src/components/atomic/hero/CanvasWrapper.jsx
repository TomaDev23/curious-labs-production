/**
 * @component CanvasWrapper
 * @description Client-side only Canvas wrapper to prevent SSR issues
 * @purpose Single dynamic import point for @react-three/fiber Canvas
 * @architecture SSR protection at wrapper level, pure R3F components inside
 */

import React, { useState, useEffect, Suspense } from 'react';

const CanvasWrapper = ({ children, fallback = null, ...canvasProps }) => {
  const [isReady, setIsReady] = useState(false);
  const [CanvasComponent, setCanvasComponent] = useState(null);

  useEffect(() => {
    // SSR Protection
    if (typeof window === 'undefined') return;
    
    // WebGL Check
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.log('WebGL not supported, using fallback');
      return;
    }

    // 🔧 SIMPLIFIED: Direct dynamic import
    console.log('Loading @react-three/fiber...');
    
    import('@react-three/fiber')
      .then(module => {
        console.log('Canvas loaded successfully:', module.Canvas);
        setCanvasComponent(() => module.Canvas);
        setIsReady(true);
      })
      .catch(error => {
        console.error('Failed to load Canvas:', error);
      });
  }, []);

  // Default fallback if none provided
  const defaultFallback = (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 border-2 border-lime-400/30 border-t-lime-400 rounded-full animate-spin"></div>
      <span className="ml-2 text-lime-400/70 text-sm">Loading 3D Engine...</span>
    </div>
  );

  // SSR Safe Returns
  if (typeof window === 'undefined') return fallback || defaultFallback;
  if (!isReady || !CanvasComponent) return fallback || defaultFallback;

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <CanvasComponent
        gl={{ 
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true
        }}
        camera={{ position: [0, 0, 12], fov: 45 }}
        {...canvasProps}
      >
        {children}
      </CanvasComponent>
    </Suspense>
  );
};

export default CanvasWrapper; 