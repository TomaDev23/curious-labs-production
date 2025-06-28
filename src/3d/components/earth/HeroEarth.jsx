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
import { useLoader } from '@react-three/fiber';
import { TextureLoader, LinearMipmapLinearFilter, LinearFilter, ClampToEdgeWrapping } from 'three';
import useGlobalFrame from '../../../hooks/useGlobalFrame';

// Earth mesh component - optimized for performance tiers
const EarthMesh = ({ scaleFactor = 1, rotationY = 0, performanceMode = 'high' }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // 🎯 TILE MR-3.0 PHASE 4: Mobile-only effect suppression
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shouldSuppressEffects = isMobile && performanceMode !== 'high';
  
  // 🚨 MOBILE CRASH FIX: Replace manual frame skipping with useGlobalFrame
  useGlobalFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += shouldSuppressEffects ? 0.0001 : 0.0002;
      if (cloudsRef.current && !shouldSuppressEffects) {
        const rotationSpeed = performanceMode === 'minimal' ? 0.00015 : 0.0003;
        cloudsRef.current.rotation.y += rotationSpeed;
      }
    }
  }, 'normal'); // Normal priority for Earth rotation

  // Load texture maps with error handling and mobile optimization
  const textureBasePath = '/assets/images/planets/2k/';
  
  const surfaceMap = useLoader(TextureLoader, `${textureBasePath}earthmap1k_LE_upscale_balanced_x4.webp`);
  const bumpMap = useLoader(TextureLoader, `${textureBasePath}earthbump1k_LE_upscale_balanced_x4.webp`);
  const cloudMap = useLoader(TextureLoader, `${textureBasePath}earthcloudmap_LE_upscale_balanced_x4.webp`);
  
  // Optimize texture settings for WebP and performance
  useEffect(() => {
    // ✅ TILE MR-3.0 PHASE 4: Mobile-specific texture optimization
    const mobileAnisotropy = shouldSuppressEffects ? 4 : 8; // Further reduce on mobile
    const desktopAnisotropy = 16;
    
    // Configure surface map
    surfaceMap.anisotropy = isMobile ? mobileAnisotropy : desktopAnisotropy;
    surfaceMap.generateMipmaps = true;
    surfaceMap.minFilter = LinearMipmapLinearFilter;
    surfaceMap.magFilter = LinearFilter;
    surfaceMap.wrapS = ClampToEdgeWrapping;
    surfaceMap.wrapT = ClampToEdgeWrapping;
    
    // Configure bump map
    bumpMap.anisotropy = isMobile ? mobileAnisotropy : desktopAnisotropy;
    bumpMap.generateMipmaps = true;
    bumpMap.minFilter = LinearMipmapLinearFilter;
    bumpMap.magFilter = LinearFilter;
    bumpMap.wrapS = ClampToEdgeWrapping;
    bumpMap.wrapT = ClampToEdgeWrapping;
    
    // Configure cloud map
    cloudMap.anisotropy = isMobile ? mobileAnisotropy : desktopAnisotropy;
    cloudMap.generateMipmaps = true;
    cloudMap.minFilter = LinearMipmapLinearFilter;
    cloudMap.magFilter = LinearFilter;
    cloudMap.wrapS = ClampToEdgeWrapping;
    cloudMap.wrapT = ClampToEdgeWrapping;
  }, [surfaceMap, bumpMap, cloudMap, isMobile, shouldSuppressEffects]);
  
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
      <ambientLight intensity={0.25} />
      
      {/* Main sunlight from the left center - creates proper day/night terminator */}
      <directionalLight
        position={[-10, 0, 3]} // From left center, same height as Earth center
        intensity={3.2}
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Secondary light from left-front for subtle atmosphere */}
      {performanceMode !== 'minimal' && (
        <directionalLight
          position={[-6, 0, 6]} // From left-front, same height as Earth center
          intensity={0.3}
          color="#fff8e0"
        />
      )}
      
      {/* Subtle rim light from behind for atmospheric glow */}
      {performanceMode === 'high' && (
        <directionalLight
          position={[4, 0, -8]} // From right-rear, same height for consistent lighting
          intensity={0.15}
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
  
  // ✅ REMOVED PHASE 2: Texture preloader causing double loading and main thread blocking
  // The R3F useLoader below handles texture loading efficiently without duplication
  
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