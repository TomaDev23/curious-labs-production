/**
 * @component ContactGlobe
 * @description Interactive globe with country polygons and connection arcs for unified 3D engine
 * @migration_source src/components/ui/globe.tsx + globe-demo.tsx
 * @priority P1 CRITICAL - V6 Atomic Contact Terminal
 * @fixed Circular dependency with three-examples resolved
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color, Group } from 'three';
import countries from '../../../../data/globe.json';

// 🔧 FIXED: Dynamic import to prevent circular dependency
let ThreeGlobe = null;
let globeLoaded = false;

// Lazy load ThreeGlobe to prevent circular dependency
const loadThreeGlobe = async () => {
  if (globeLoaded && ThreeGlobe) return ThreeGlobe;
  
  try {
    const module = await import('three-globe');
    ThreeGlobe = module.default;
    globeLoaded = true;
    
    // Extend R3F with ThreeGlobe (JSX compatible) after loading
    extend({ ThreeGlobe: ThreeGlobe });
    
    return ThreeGlobe;
  } catch (error) {
    console.error('Failed to load ThreeGlobe:', error);
    throw error;
  }
};

// Device optimization hook
const useDeviceOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile };
};

// Utility function for color conversion
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const GlobeScene = ({ globeConfig, data, performanceMode = 'high' }) => {
  const globeRef = useRef(null);
  const groupRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const { isMobile } = useDeviceOptimization();
  
  // 🎯 GRACEFUL FADE-IN: Add opacity animation state like the Moon
  const [opacity, setOpacity] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#062056",
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // 🔧 FIXED: Async initialization to prevent circular dependency
  useEffect(() => {
    const initializeGlobe = async () => {
      if (globeRef.current || !groupRef.current) return;
      
      try {
        setIsLoading(true);
        const GlobeClass = await loadThreeGlobe();
        
        if (GlobeClass && groupRef.current) {
          globeRef.current = new GlobeClass();
          groupRef.current.add(globeRef.current);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('[GLOBE] Failed to initialize globe:', error);
        setLoadError(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGlobe();
  }, []);

  // 🎯 GRACEFUL FADE-IN: Smooth opacity animation after globe is fully configured
  useEffect(() => {
    if (isInitialized && !isLoading && !isFullyLoaded) {
      // Small delay to ensure globe is fully processed
      const fadeTimer = setTimeout(() => {
        setIsFullyLoaded(true);
        
        // Gradual fade-in over 1.5 seconds - longer and more graceful than Moon
        let currentOpacity = 0;
        const fadeInterval = setInterval(() => {
          currentOpacity += 0.02; // Slower increment for more graceful fade
          setOpacity(Math.min(currentOpacity, 1));
          
          if (currentOpacity >= 1) {
            clearInterval(fadeInterval);
          }
        }, 35); // Slightly slower for extra smoothness
        
        return () => clearInterval(fadeInterval);
      }, 150); // Brief delay to prevent pop-in
      
      return () => clearTimeout(fadeTimer);
    }
  }, [isInitialized, isLoading, isFullyLoaded]);

  // 🎯 RENDER FIX: Use useFrame instead of requestAnimationFrame for proper R3F integration
  useFrame(() => {
    if (groupRef.current && isInitialized) {
      groupRef.current.rotation.y += 0.001; // Slow rotation
      
      // Apply opacity to the entire group and all its children
      if (groupRef.current.children.length > 0) {
        groupRef.current.traverse((child) => {
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = opacity;
          }
        });
      }
    }
  });

  // Build material when globe is initialized
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor || defaultProps.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive || defaultProps.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || defaultProps.emissiveIntensity;
    globeMaterial.shininess = globeConfig.shininess || defaultProps.shininess;
    
    // 🎯 APPLY OPACITY: Set material opacity for smooth fade-in
    globeMaterial.transparent = true;
    globeMaterial.opacity = opacity;
  }, [
    isInitialized,
    opacity, // Add opacity to dependencies
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    // Performance optimization: limit arcs on mobile
    const processedData = isMobile ? data.slice(0, 8) : data;
    
    const arcs = processedData;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // Remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k] === v[k],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(isMobile ? 2 : 3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(processedData)
      .arcStartLat((d) => d.startLat * 1)
      .arcStartLng((d) => d.startLng * 1)
      .arcEndLat((d) => d.endLat * 1)
      .arcEndLng((d) => d.endLng * 1)
      .arcColor((e) => e.color)
      .arcAltitude((e) => e.arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => e.order * 1)
      .arcDashGap(5)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
    isMobile,
  ]);

  return (
    <group ref={groupRef} visible={opacity > 0}>
      {/* Globe will be added to this group by useEffect */}
    </group>
  );
};

const LightingSetup = ({ performanceMode }) => {
  const isHighPerf = performanceMode === 'high';
  const ambientIntensity = isHighPerf ? 0.8 : 0.4;
  
  return (
    <>
      <ambientLight 
        intensity={ambientIntensity} 
        color="#ffffff" 
      />
      <directionalLight
        position={[-1, 0.5, 1]}
        intensity={isHighPerf ? 0.8 : 0.6}
        color="#ffffff"
      />
      <directionalLight
        position={[1, -0.5, -1]}
        intensity={isHighPerf ? 0.4 : 0.3}
        color="#ffffff"
      />
      <pointLight
        position={[10, 10, 10]}
        intensity={isHighPerf ? 0.3 : 0.2}
        color="#ffffff"
      />
    </>
  );
};

const ContactGlobe = ({ 
  globeConfig = {}, 
  data = [], 
  enableOrbitControls = true,
  performanceMode = 'high',
  ...props 
}) => {
  const [devicePerformance, setDevicePerformance] = useState('high');
  const { isMobile } = useDeviceOptimization();

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (isMobile || hasLowMemory || prefersReducedMotion) {
        setDevicePerformance('low');
      } else {
        setDevicePerformance('high');
      }
    };

    checkDeviceCapabilities();
  }, []);

  const finalPerformanceMode = performanceMode || devicePerformance;

  return (
    <>
      <LightingSetup performanceMode={finalPerformanceMode} />
      <GlobeScene 
        globeConfig={globeConfig} 
        data={data} 
        performanceMode={finalPerformanceMode}
        {...props} 
      />
      {enableOrbitControls && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      )}
    </>
  );
};

export default ContactGlobe; 
