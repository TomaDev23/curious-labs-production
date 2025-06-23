/**
 * @component MissionMoonWithCanvas
 * @description Wrapper that includes Canvas + MissionMoon for lazy loading
 * @purpose Keeps all Three.js dependencies in one lazy-loaded bundle
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
        dpr={Math.min(window.devicePixelRatio, 2)}
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