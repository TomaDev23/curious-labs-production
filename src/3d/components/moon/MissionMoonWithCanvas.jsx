/**
 * @component MissionMoonWithCanvas
 * @description Drop-in Canvas wrapper for MissionMoon scene
 * 
 * @replacement_for src/components/3d/MoonSphere.jsx
 * @api_compatible 100% - maintains exact same props interface  
 * @control_board_ready ✅ Ready for Mission Control Board integration
 * 
 * @version 3.0.1 - Unified 3D Engine Migration (Container fix applied)
 * @author CuriousLabs
 * @migration_date 2025-06-04
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MissionMoon from './MissionMoon';
import { useUnifiedDeviceCapabilities } from '../../../hooks/useUnifiedDeviceCapabilities';

// 🚀 UNIFIED DEVICE CAPABILITY: Use unified hook instead of creating WebGL context
const useWebGLCapability = () => {
  const deviceProfile = useUnifiedDeviceCapabilities();
  
  if (!deviceProfile) return false;
  
  // Use unified WebGL assessment instead of creating our own context
  return deviceProfile.shouldUse3D && deviceProfile.webglSupported;
};

const MissionMoonWithCanvas = (props) => {
  // Fallback for WebGL issues
  if (!useWebGLCapability()) {
    return (
      <div 
        className={`relative rounded-full overflow-hidden ${props.className || ''}`}
        style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #2a2a2a 30%, #1a1a1a 70%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
          🌙 Moon (WebGL fallback)
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-full overflow-hidden ${props.className || ''}`}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        shadows
        camera={{ 
          position: [0, 0, 25], 
          fov: 25,
          near: 0.1,
          far: 1000,
          aspect: 1
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "default"
        }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        frameloop="always"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <MissionMoon {...props} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            rotateSpeed={0.4}
            minDistance={8}
            maxDistance={30}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
      
      <Suspense 
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="text-white text-sm animate-pulse">
              🌙 Loading Moon Mission...
            </div>
          </div>
        }
      >
        <div />
      </Suspense>
    </div>
  );
};

export default MissionMoonWithCanvas; 