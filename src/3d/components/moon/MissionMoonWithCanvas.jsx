/**
 * @component MissionMoonWithCanvas
 * @description Wrapper that includes Canvas + MissionMoon for lazy loading
 * @purpose Keeps all Three.js dependencies in one lazy-loaded bundle
 * ✅ PHASE 2: Enhanced with SSR safety and mobile crash protection
 * 🚨 PHASE B: WebGL context disposal and memory management
 */

import React, { Suspense, useEffect, useRef, useState } from 'react';
import CanvasWrapper from '../../../components/atomic/hero/CanvasWrapper';
import MissionMoon from './MissionMoon';

const MissionMoonWithCanvas = ({ 
  debugPhase = null, 
  anomalyMode = null, 
  className = "",
  onMount = null,
  onUnmount = null,
  ...props 
}) => {
  // 🚨 PHASE 2: WebGL context management with mount tracking
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const mountedRef = useRef(false);
  const [contextLost, setContextLost] = useState(false);
  const [memoryPressure, setMemoryPressure] = useState('low');

  // ✅ PHASE 2: Safe devicePixelRatio access with comprehensive error handling
  const getSafeDPR = () => {
    try {
      // 🎯 SSR SAFETY: Check if window exists
      if (typeof window === 'undefined') {
        return 1; // Safe fallback for SSR
      }
      
      // 🎯 SAFE: Check if devicePixelRatio exists and is valid
      if (typeof window.devicePixelRatio === 'undefined' || 
          typeof window.devicePixelRatio !== 'number' || 
          isNaN(window.devicePixelRatio) || 
          window.devicePixelRatio <= 0) {
        return 1; // Safe fallback for invalid values
      }
      
      return Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
    } catch (error) {
      console.warn('[MOON_CANVAS] devicePixelRatio access failed:', error);
      return 1; // Safe fallback on any error
    }
  };

  // 🚨 PHASE 2: Comprehensive Three.js disposal system with context loss protection
  const disposeThreeJSObjects = (scene, renderer, camera) => {
    try {
      if (!scene || !renderer) return;

      console.log('[PHASE_2] Starting WebGL context cleanup...');

      // Dispose geometries, materials, and textures
      scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        
        // Dispose materials
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              if (material.map) material.map.dispose();
              if (material.normalMap) material.normalMap.dispose();
              if (material.roughnessMap) material.roughnessMap.dispose();
              if (material.metalnessMap) material.metalnessMap.dispose();
              material.dispose();
            });
          } else {
            if (child.material.map) child.material.map.dispose();
            if (child.material.normalMap) child.material.normalMap.dispose();
            if (child.material.roughnessMap) child.material.roughnessMap.dispose();
            if (child.material.metalnessMap) child.material.metalnessMap.dispose();
            child.material.dispose();
          }
        }
      });
      
      // 🚨 CRITICAL FIX: Only dispose renderer, let React Three Fiber handle context loss
      renderer.dispose();
      
      // 🚨 REMOVED: forceContextLoss() - React Three Fiber handles this internally
      // This was causing "context already lost" errors
      
      // Safely remove DOM element
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      // Clear scene
      scene.clear();
      
      console.log('[PHASE_2] WebGL context cleanup completed');
      return true;
    } catch (error) {
      console.warn('[PHASE_2] WebGL cleanup failed:', error);
      return false;
    }
  };

  // 🚨 PHASE 2: GPU memory pressure monitoring with mount guards
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMemoryPressure = () => {
      if (!mountedRef.current) return; // Guard against unmounted component
      
      try {
        if (window.performance && window.performance.memory) {
          const memory = window.performance.memory;
          const used = memory.usedJSHeapSize;
          const limit = memory.jsHeapSizeLimit;
          
          if (used / limit > 0.8) {
            console.warn('[PHASE_2] High memory pressure detected:', {
              used: Math.round(used / 1024 / 1024) + 'MB',
              limit: Math.round(limit / 1024 / 1024) + 'MB',
              percentage: Math.round((used / limit) * 100) + '%'
            });
            if (mountedRef.current) setMemoryPressure('high');
          } else {
            if (mountedRef.current) setMemoryPressure('low');
          }
        }
      } catch (error) {
        console.warn('[PHASE_2] Memory pressure check failed:', error);
      }
    };

    // Check every 5 seconds
    const interval = setInterval(checkMemoryPressure, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // 🚨 PHASE 2: WebGL context loss handling with mount guards
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleContextLost = (event) => {
      if (!mountedRef.current) return; // Guard against unmounted component
      
      event.preventDefault();
      console.warn('[PHASE_2] WebGL context lost');
      if (mountedRef.current) setContextLost(true);
    };

    const handleContextRestored = () => {
      if (!mountedRef.current) return; // Guard against unmounted component
      
      console.log('[PHASE_2] WebGL context restored');
      if (mountedRef.current) setContextLost(false);
    };

    // Wait for canvas to be available
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  // 🚨 PHASE 2: Mount/Unmount lifecycle management
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      console.log('[PHASE_2] MissionMoonWithCanvas mounting...');
      
      // Call onMount callback if provided
      if (onMount && typeof onMount === 'function') {
        try {
          onMount();
        } catch (error) {
          console.warn('[PHASE_2] onMount callback failed:', error);
        }
      }
    }

    return () => {
      if (mountedRef.current) {
        mountedRef.current = false;
        console.log('[PHASE_2] MissionMoonWithCanvas unmounting...');
        
        // Call onUnmount callback if provided
        if (onUnmount && typeof onUnmount === 'function') {
          try {
            onUnmount();
          } catch (error) {
            console.warn('[PHASE_2] onUnmount callback failed:', error);
          }
        }
        
        // Perform WebGL cleanup
        if (sceneRef.current && rendererRef.current) {
          disposeThreeJSObjects(sceneRef.current, rendererRef.current);
        }
      }
    };
  }, [onMount, onUnmount]);

  // Handle context loss state
  if (contextLost) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-purple-400/70 text-sm">Restoring 3D context...</p>
        </div>
      </div>
    );
  }

  // Handle high memory pressure
  if (memoryPressure === 'high') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-lg">
        <div className="text-center">
          <p className="text-yellow-400/70 text-sm">Optimizing performance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <CanvasWrapper
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 25], 
          fov: 25 
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={getSafeDPR()}
        onCreated={({ scene, gl }) => {
          sceneRef.current = scene;
          rendererRef.current = gl;
        }}
      >
        <MissionMoon 
          className={className}
          showDebugHUD={false}
          debugPhase={debugPhase}
          anomalyMode={anomalyMode}
          {...props}
        />
      </CanvasWrapper>
    </div>
  );
};

export default MissionMoonWithCanvas; 