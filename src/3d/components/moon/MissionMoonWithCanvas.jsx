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
  ...props 
}) => {
  // 🚨 PHASE B: WebGL context management
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
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

  // 🚨 PHASE B: Comprehensive Three.js disposal system
  const disposeThreeJSObjects = (scene, renderer, camera) => {
    try {
      if (!scene || !renderer) return;

      console.log('[PHASE_B] Starting WebGL context cleanup...');

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
      
      // Dispose renderer and force context loss
      renderer.dispose();
      renderer.forceContextLoss();
      
      // Clear scene
      scene.clear();
      
      console.log('[PHASE_B] WebGL context cleanup completed');
      return true;
    } catch (error) {
      console.warn('[PHASE_B] WebGL cleanup failed:', error);
      return false;
    }
  };

  // 🚨 PHASE B: GPU memory pressure monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMemoryPressure = () => {
      try {
        if (performance.memory) {
          const used = performance.memory.usedJSHeapSize;
          const limit = performance.memory.jsHeapSizeLimit;
          const pressure = used / limit;
          
          if (pressure > 0.8) setMemoryPressure('high');
          else if (pressure > 0.6) setMemoryPressure('medium');
          else setMemoryPressure('low');

          // Log high memory pressure
          if (pressure > 0.7) {
            console.warn('[PHASE_B] High memory pressure detected:', {
              used: Math.round(used / 1024 / 1024) + 'MB',
              limit: Math.round(limit / 1024 / 1024) + 'MB',
              pressure: Math.round(pressure * 100) + '%'
            });
          }
        }
      } catch (error) {
        console.warn('[PHASE_B] Memory monitoring failed:', error);
      }
    };
    
    const interval = setInterval(checkMemoryPressure, 5000);
    checkMemoryPressure(); // Initial check
    
    return () => clearInterval(interval);
  }, []);

  // 🚨 PHASE B: WebGL context loss handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleContextLoss = (event) => {
      event.preventDefault();
      console.warn('[PHASE_B] WebGL context lost');
      setContextLost(true);
    };
    
    const handleContextRestore = () => {
      console.log('[PHASE_B] WebGL context restored');
      setContextLost(false);
      // Context will be recreated by React Three Fiber
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLoss);
    canvas.addEventListener('webglcontextrestored', handleContextRestore);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
      canvas.removeEventListener('webglcontextrestored', handleContextRestore);
    };
  }, []);

  // 🚨 PHASE B: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sceneRef.current && rendererRef.current) {
        disposeThreeJSObjects(sceneRef.current, rendererRef.current);
      }
    };
  }, []);

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