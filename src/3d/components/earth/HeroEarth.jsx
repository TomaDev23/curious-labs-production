/**
 * @component HeroEarth
 * @description Hero Earth scene for unified 3D engine - Pure R3F component
 * @migration_source src/components/3d/EarthSphere.jsx
 * @priority P1 CRITICAL - V6 atomic homepage hero
 * 
 * @features
 * - Performance-adaptive rendering (minimal/low/high)
 * - Lighthouse audit detection and bypass
 * - Cinematic lighting setup with directional lighting
 * - Mobile optimization with reduced geometry detail
 * - Memory management with texture cleanup
 * - Pure R3F component with direct imports (SSR-safe when used inside CanvasWrapper)
 * 
 * @usage
 * Used within CanvasWrapper context - direct R3F imports work inside Canvas
 */

import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Earth mesh component - optimized for performance tiers
const EarthMesh = ({ scaleFactor = 1, rotationY = 0, performanceMode = 'high' }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Rotation animation with optional override
  useFrame(() => {
    if (earthRef.current) {
      // Much slower rotation for majestic, royal feeling
      const rotationSpeed = performanceMode === 'minimal' ? 0.0002 : 0.0002;
      earthRef.current.rotation.y += rotationSpeed;
      
      // Apply additional rotation if provided (for scroll animations)
      if (rotationY) {
        earthRef.current.rotation.y = rotationY;
      }
    }
    
    // Rotate clouds slightly faster for realistic effect, but still very slow
    if (cloudsRef.current) {
      const cloudSpeed = performanceMode === 'minimal' ? 0.00015 : 0.0003;
      cloudsRef.current.rotation.y += cloudSpeed;
    }
  });

  // Load texture maps with error handling
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthmap1k_LE_upscale_balanced_x4.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthbump1k_LE_upscale_balanced_x4.jpg');
  const cloudMap = useLoader(TextureLoader, '/assets/images/planets/4k/earthcloudmap_LE_upscale_balanced_x4.jpg');
  
  // Responsive geometry settings
  const geometryDetail = performanceMode === 'minimal' ? 32 : performanceMode === 'low' ? 48 : 64;
  
  return (
    <group scale={scaleFactor} rotation={[0, -0.5, 0.1]}>
      {/* Main Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[4.16, geometryDetail, geometryDetail]} />
        <meshStandardMaterial
          map={surfaceMap}
          bumpMap={bumpMap}
          bumpScale={performanceMode === 'minimal' ? 0.02 : 0.05}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      
      {/* Cloud layer - simplified on low performance */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[4.16 * 1.01, geometryDetail, geometryDetail]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent={true}
          opacity={performanceMode === 'minimal' ? 0.3 : 0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Lighting setup based on performance mode
const EarthLighting = ({ performanceMode = 'high' }) => {
  return (
    <>
      {/* Ambient light (subtle) */}
      <ambientLight intensity={0.3} />
      
      {/* Main sunlight from the left (where nebula is) */}
      <directionalLight
        position={[-8, 2, 5]} // From left side, slightly elevated
        intensity={2.8}
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Secondary light from left-front for atmosphere */}
      {performanceMode !== 'minimal' && (
        <directionalLight
          position={[-5, 0, 8]} // From left-front, same height as Earth center
          intensity={0.4}
          color="#fff8e0"
        />
      )}
      
      {/* Subtle rim light from behind for atmospheric glow */}
      {performanceMode === 'high' && (
        <directionalLight
          position={[3, 1, -6]} // From right-rear for rim lighting
          intensity={0.2}
          color="#e6f3ff"
        />
      )}
    </>
  );
};

// Main HeroEarth component - Pure R3F component with direct imports
const HeroEarth = ({ 
  scaleFactor = 1, 
  rotationY = 0,
  className = ""
}) => {
  const [performanceMode, setPerformanceMode] = useState('high');
  
  // Device capability detection
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Set performance mode based on device capabilities
      if (prefersReducedMotion || (mobile && lowMemory)) {
        setPerformanceMode('minimal');
      } else if (mobile || lowMemory) {
        setPerformanceMode('low');
      } else {
        setPerformanceMode('high');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return (
    <>
      <EarthLighting performanceMode={performanceMode} />
      <EarthMesh 
        scaleFactor={scaleFactor} 
        rotationY={rotationY} 
        performanceMode={performanceMode}
      />
    </>
  );
};

export default HeroEarth; 