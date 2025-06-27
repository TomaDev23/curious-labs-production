/**
 * @component MissionMoonWithCanvas
 * @description Wrapper that includes Canvas + MissionMoon for lazy loading
 * @purpose Keeps all Three.js dependencies in one lazy-loaded bundle
 * ✅ PHASE 2: Enhanced with SSR safety and mobile crash protection
 */

import React, { Suspense } from 'react';
import CanvasWrapper from '../../../components/atomic/hero/CanvasWrapper';
import MissionMoon from './MissionMoon';

const MissionMoonWithCanvas = ({ 
  debugPhase = null, 
  anomalyMode = null, 
  className = "",
  ...props 
}) => {
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

  return (
    <div className="w-full h-full">
      <CanvasWrapper
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