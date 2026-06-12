import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useUnifiedDeviceCapabilities } from '../hooks/useUnifiedDeviceCapabilities';

// Custom cleanup hook for Three.js memory management
const useThreeCleanup = () => {
  const cleanupRef = useRef([]);
  
  const addCleanup = (cleanupFn) => {
    cleanupRef.current.push(cleanupFn);
  };
  
  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Three.js cleanup error:', error);
        }
      });
      cleanupRef.current = [];
    };
  }, []);
  
  return { addCleanup };
};

// ✅ FIXED: Correct import path for HeroEarth component
const HeroEarth = React.lazy(() => import('../3d/scenes/home/HeroEarth'));

const Hero3DPlanet = () => {
  const [loaded3D, setLoaded3D] = useState(false);
  const deviceProfile = useUnifiedDeviceCapabilities();
  const { addCleanup } = useThreeCleanup();
  
  useEffect(() => {
    // Only load 3D if device supports it
    if (!deviceProfile?.shouldUse3D) {
      return;
    }
    
    // 1.5 second delay as requested - content loads first
    const timer = setTimeout(() => {
      setLoaded3D(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [deviceProfile]);

  // Don't render anything if device can't handle 3D
  if (!deviceProfile?.shouldUse3D) {
    return null;
  }

  // Don't render until delay is complete
  if (!loaded3D) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="hero-3d-container"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl, scene }) => {
          // Register cleanup for renderer
          addCleanup(() => {
            gl.dispose();
            scene.clear();
          });
        }}
      >
        <React.Suspense fallback={null}>
          <HeroEarth />
        </React.Suspense>
      </Canvas>
    </motion.div>
  );
};

export default Hero3DPlanet; 