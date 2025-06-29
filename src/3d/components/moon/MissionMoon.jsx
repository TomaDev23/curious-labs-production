/**
 * @component MissionMoon
 * @description Unified 3D Moon scene with Mission Control Board integration
 * 
 * @migration_source src/components/3d/MoonSphere.jsx + src/components/3d/MoonLighting.jsx
 * @mission_critical ⚠️ DELICATE SYSTEM - 3,177 lines of refined code preserved
 * @control_board_integration MissionControlBoard → MissionAtomic → MissionMoon
 * 
 * @features
 * - Real lunar phase calculations with AUTO/MANUAL modes
 * - Complex lighting system with atmospheric effects
 * - Visual anomaly modes: Supermoon, Eclipse, Sci-Fi
 * - Camera FOV animation system for supermoon zoom
 * - Eclipse state restoration mechanism
 * - Mission Control Board integration with sliding panel
 * 
 * @props
 * - debugPhase: number|null - Phase override (0.0-1.0)
 * - anomalyMode: string|null - 'supermoon'|'eclipse'|'scifi'
 * - className: string - CSS classes
 * - fallbackToEclipse: boolean - Fallback mode
 * - showDebugHUD: boolean - Debug controls
 * 
 * @version 3.0.4 - CONTRAST RESTORED: Phase-dependent self-illumination for proper dark phase visibility
 * @author CuriousLabs
 * @legit true - Mission Control protocol compliant
 * @hotfix_applied ✅ Fixed useMoonLighting hook API compatibility (sunGlowIntensity)
 * @stabilization_applied ✅ Fixed emissive brightness, supermoon FOV, texture rotation
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { 
  TextureLoader, 
  LinearMipmapLinearFilter, 
  LinearFilter, 
  ClampToEdgeWrapping,
  RepeatWrapping,
  BackSide,
  DoubleSide,
  CanvasTexture,
  AdditiveBlending
} from 'three';
import { useMoonLighting } from '../../../utils/useMoonLighting';
import useGlobalFrame from '../../../hooks/useGlobalFrame';
import globalFrameManager from '../../../utils/GlobalFrameManager';

// ========================================
// SCI-FI GRID OVERLAY - PRESERVED  
// ========================================
const SciFiGridOverlay = ({ pulseRate, gridIntensity, colorCycle }) => {
  const gridRef = useRef();
  
  useGlobalFrame((time) => {
    if (gridRef.current) {
      const t = time * 0.001; // Convert to seconds like clock.getElapsedTime()
      
      // Pulse the grid intensity
      const pulse = (Math.sin(t * pulseRate) + 1) / 2;
      gridRef.current.material.opacity = pulse * gridIntensity;
      
      // Rotate the grid slowly
      gridRef.current.rotation.z = t * 0.1;
      
      // Color cycle if enabled
      if (colorCycle) {
        const r = Math.sin(t * 0.3) * 0.5 + 0.5;
        const g = Math.sin(t * 0.3 + 2) * 0.5 + 0.5;
        const b = Math.sin(t * 0.3 + 4) * 0.5 + 0.5;
        gridRef.current.material.color.setRGB(r, g, b);
      }
    }
  }, 'low'); // Low priority for visual effects
  
  return (
    <group>
      {/* Main grid sphere */}
      <mesh ref={gridRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4.18, 32, 32]} />
        <meshBasicMaterial
          wireframe={true}
          transparent={true}
          opacity={gridIntensity}
          color={colorCycle ? "#ffffff" : "#80ffff"}
        />
      </mesh>
      
      {/* Inner pulse sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.17, 16, 16]} />
        <meshBasicMaterial
          transparent={true}
          opacity={0.1 * gridIntensity}
          color={colorCycle ? "#ffffff" : "#80ffff"}
        />
      </mesh>
    </group>
  );
};

// ========================================
// MOON LIGHTING SYSTEM - TRULY SMOOTH
// ========================================
const MoonLighting = ({ debugPhase = null, anomalyMode = null }) => {
  const { 
    phaseConfig, 
    sunPosition, 
    intensity, 
    atmosphericColor,
    isSupermoon,
    phaseValue
  } = useMoonLighting(debugPhase, anomalyMode);
  
  // 🌙 Smart logging with personality
  useEffect(() => {
    const missionStatus = {
      'newMoon': { emoji: '🌑', status: 'STEALTH MODE ACTIVATED', code: 'LUNA-001' },
      'waxingCrescent': { emoji: '🌒', status: 'PHASE TRANSITION NOMINAL', code: 'LUNA-125' }, 
      'firstQuarter': { emoji: '🌓', status: 'HALF ILLUMINATION ACHIEVED', code: 'LUNA-250' },
      'waxingGibbous': { emoji: '🌔', status: 'APPROACHING FULL BRIGHTNESS', code: 'LUNA-375' },
      'fullMoon': { emoji: '🌕', status: 'MAXIMUM LUMINOSITY REACHED', code: 'LUNA-500' },
      'waningGibbous': { emoji: '🌖', status: 'BRIGHTNESS REDUCTION INITIATED', code: 'LUNA-625' },
      'lastQuarter': { emoji: '🌗', status: 'HALF SHADOW PROTOCOL', code: 'LUNA-750' },
      'waningCrescent': { emoji: '🌘', status: 'RETURN TO DARKNESS SEQUENCE', code: 'LUNA-875' }
    };
    
    const mission = missionStatus[phaseConfig] || { 
      emoji: '��', 
      status: 'UNKNOWN PHASE DETECTED', 
      code: 'LUNA-ERR' 
    };
    
    const debugProtocol = debugPhase ? ` | DEBUG OVERRIDE: ${debugPhase}` : '';
    const anomalyAlert = anomalyMode ? ` | ⚠️ ANOMALY: ${anomalyMode.toUpperCase()} PROTOCOL ACTIVE` : '';
    
    console.log(`${mission.emoji} MISSION CONTROL: ${mission.status} [${mission.code}]${debugProtocol}${anomalyAlert}`);
    
    // Special mission alerts for anomalies
    if (anomalyMode === 'eclipse') {
      console.log('🔴 MISSION ALERT: Eclipse event detected - Corona visibility enhanced');
    } else if (anomalyMode === 'supermoon') {
      console.log('🟡 MISSION ALERT: Supermoon proximity - Camera zoom protocol engaged');
    } else if (anomalyMode === 'scifi') {
      console.log('🟢 MISSION ALERT: Sci-Fi overlay active - Grid systems online');
    }
  }, [phaseConfig, debugPhase, anomalyMode]);
  
  const moonParentRef = useRef();

  // 🌑 ECLIPSE: Simple orange corona lighting
  if (anomalyMode === 'eclipse') {
    return (
      <group>
        {/* Dark eclipse ambient */}
        <ambientLight intensity={0.01} color="#221100" />
        
        {/* Orange corona glow */}
        <pointLight
          position={[0, 0, 0]}
          intensity={0.8}
          color="#ff6600"
          distance={30}
          decay={0.5}
        />
        
        {/* Secondary corona layer */}
        <pointLight
          position={[0, 0, -10]}
          intensity={0.6}
          color="#ff8800"
          distance={50}
          decay={1.0}
        />
      </group>
    );
  }

  // 🌊 TRULY SMOOTH: Convert phase to continuous 0-1 value
  const getPhaseValue = () => {
    if (phaseValue !== undefined) return phaseValue;
    
    const phaseMap = {
      'newMoon': 0.0,
      'waxingCrescent': 0.125,
      'firstQuarter': 0.25,
      'waxingGibbous': 0.375,
      'fullMoon': 0.5,
      'waningGibbous': 0.625,
      'lastQuarter': 0.75,
      'waningCrescent': 0.875
    };
    
    return phaseMap[phaseConfig] || 0.5;
  };

  const currentPhase = getPhaseValue();

  // 🌊 SMOOTH: Continuous intensity curves (no discrete steps)
  const getBaseIntensity = () => {
    const supermoonBoost = (anomalyMode === 'supermoon') ? 1.5 : 1.0;
    
    // Smooth sine curve from 0.25 to 0.45
    const baseIntensity = 0.25 + 0.2 * Math.sin(currentPhase * Math.PI);
    return baseIntensity * supermoonBoost;
  };

  const getGlowIntensity = () => {
    const supermoonBoost = (anomalyMode === 'supermoon') ? 1.5 : 1.0;
    
    // Smooth curve from 0.15 to 1.0
    const glowIntensity = 0.15 + 0.85 * Math.sin(currentPhase * Math.PI);
    return glowIntensity * supermoonBoost;
  };

  const getSelfIlluminationIntensity = () => {
    // Smooth curve from 0.08 to 0.35
    return 0.08 + 0.27 * Math.sin(currentPhase * Math.PI);
  };

  const getAmbientIntensity = () => {
    // Smooth curve from 0.05 to 0.15
    return 0.05 + 0.1 * Math.sin(currentPhase * Math.PI);
  };

  // 🌊 SMOOTH: Continuous color transitions
  const getWarmColorTint = () => {
    // Smooth color transition using phase value
    const warmth = 0.7 + 0.3 * Math.sin(currentPhase * Math.PI);
    const r = Math.floor(255 * warmth);
    const g = Math.floor(255 * (warmth * 0.9 + 0.1));
    const b = Math.floor(255 * (warmth * 0.7 + 0.3));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // 🌟 ENHANCEMENT: Calculate soft lighting positions for natural falloff
  const softLightOffset1 = [sunPosition[0] * 0.7, sunPosition[1] * 0.8, sunPosition[2] * 0.9];
  const softLightOffset2 = [sunPosition[0] * 1.2, sunPosition[1] * 0.6, sunPosition[2] * 1.1];
  const softLightOffset3 = [sunPosition[0] * 0.5, sunPosition[1] * 1.3, sunPosition[2] * 0.7];

  return (
    <group ref={moonParentRef}>
      {/* 🌫️ SMOOTH: Ambient foundation */}
      <ambientLight intensity={getAmbientIntensity()} color="#556699" />
      
      {/* Core lighting system */}
      <group>
        {/* 🌙 UNIVERSAL: Base Moon Self-Illumination */}
        <pointLight
          position={[0, 0, 0]}
          intensity={getSelfIlluminationIntensity()}
          color="#e6e6ff"
          distance={40}
          decay={0.3}
        />
        
        {/* 🌙 SMOOTH: Enhanced base illumination */}
        <pointLight
          position={[0, 0, 8]}
          intensity={getBaseIntensity()}
          color={getWarmColorTint()}
          distance={50}
          decay={0.8}
        />
        
        {/* 🌙 CONSISTENT: Rear base illumination */}
        <pointLight
          position={[0, 0, -8]}
          intensity={getBaseIntensity() * 0.6}
          color="#aabbdd"
          distance={45}
          decay={0.6}
        />
        
        {/* 🌙 SMOOTH: Side illumination */}
        <pointLight
          position={[6, 0, 0]}
          intensity={getBaseIntensity() * 0.7}
          color={getWarmColorTint()}
          distance={35}
          decay={0.5}
        />
        
        {/* 🌙 SMOOTH: Opposite side illumination */}
        <pointLight
          position={[-6, 0, 0]}
          intensity={getBaseIntensity() * 0.7}
          color={getWarmColorTint()}
          distance={35}
          decay={0.5}
        />
        
        {/* 🌙 CONSISTENT: Top/bottom base lighting */}
        <pointLight
          position={[0, 8, 0]}
          intensity={getBaseIntensity() * 0.5}
          color="#f0f0ff"
          distance={30}
          decay={0.4}
        />
        
        <pointLight
          position={[0, -8, 0]}
          intensity={getBaseIntensity() * 0.5}
          color="#f0f0ff"
          distance={30}
          decay={0.4}
        />
        
        {/* 🌙 CONSISTENT: Additional ambient */}
        <ambientLight intensity={0.08} color="#444466" />
        
        {/* PRIMARY SUN LIGHT */}
        <directionalLight
          position={sunPosition}
          intensity={intensity * 0.85}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* 🎨 SMOOTH: Atmospheric color */}
        <directionalLight
          position={sunPosition}
          intensity={intensity * 0.5}
          color={atmosphericColor}
          castShadow={false}
        />

        {/* 🌟 EXPANDED: Soft Light Layer 1 */}
        <pointLight
          position={softLightOffset1}
          intensity={intensity * 0.4}
          color="#ffffff"
          distance={60}
          decay={1.2}
        />

        {/* 🌟 SMOOTH: Soft Light Layer 2 */}
        <pointLight
          position={softLightOffset2}
          intensity={intensity * 0.35}
          color={atmosphericColor}
          distance={55}
          decay={1.0}
        />

        {/* 🌟 EXPANDED: Soft Light Layer 3 */}
        <pointLight
          position={softLightOffset3}
          intensity={intensity * 0.3}
          color="#f8f6f0"
          distance={65}
          decay={1.4}
        />
        
        {/* 🌟 SMOOTH: Volumetric Glow System */}
        <pointLight
          position={[0, 0, 12]}
          intensity={getGlowIntensity() * 0.8}
          color={atmosphericColor}
          distance={45}
          decay={0.5}
        />
        
        <pointLight
          position={[0, 0, 20]}
          intensity={getGlowIntensity() * 0.6}
          color={atmosphericColor}
          distance={70}
          decay={1.0}
        />
        
        <pointLight
          position={[0, 0, 30]}
          intensity={getGlowIntensity() * 0.4}
          color={atmosphericColor}
          distance={100}
          decay={1.8}
        />
        
        <pointLight
          position={[0, 0, -25]}
          intensity={getGlowIntensity() * 0.3}
          color={atmosphericColor}
          distance={120}
          decay={2.2}
        />
        
        {/* 🌟 SMOOTH: Multi-directional Atmospheric Haze */}
        <pointLight
          position={[15, 0, 0]}
          intensity={getGlowIntensity() * 0.25}
          color={atmosphericColor}
          distance={80}
          decay={1.5}
        />
        
        <pointLight
          position={[-15, 0, 0]}
          intensity={getGlowIntensity() * 0.25}
          color={atmosphericColor}
          distance={80}
          decay={1.5}
        />
        
        <pointLight
          position={[0, 15, 0]}
          intensity={getGlowIntensity() * 0.2}
          color={atmosphericColor}
          distance={75}
          decay={1.3}
        />
        
        <pointLight
          position={[0, -15, 0]}
          intensity={getGlowIntensity() * 0.2}
          color={atmosphericColor}
          distance={75}
          decay={1.3}
        />
        
        {/* Full Moon Enhancements - SMOOTH CONDITIONAL */}
        {currentPhase >= 0.45 && currentPhase <= 0.55 && (
          <>
            {/* Extra glow for full moon */}
            <pointLight
              position={[0, 0, 10]}
              intensity={1.0 * Math.sin((currentPhase - 0.45) / 0.1 * Math.PI)}
              color={atmosphericColor}
              distance={60}
              decay={1.0}
            />
            
            {/* Soft halo */}
            <pointLight
              position={[0, 0, 15]}
              intensity={0.6 * Math.sin((currentPhase - 0.45) / 0.1 * Math.PI)}
              color="#fff4e6"
              distance={80}
              decay={1.5}
            />
            
            {/* Wide atmospheric glow */}
            <pointLight
              position={[0, 0, -10]}
              intensity={0.4 * Math.sin((currentPhase - 0.45) / 0.1 * Math.PI)}
              color={atmosphericColor}
              distance={100}
              decay={2.0}
            />
          </>
        )}
        
        {/* Sci-fi mode effects */}
        {anomalyMode === 'scifi' && (
          <SciFiGridOverlay 
            pulseRate={1.5} 
            gridIntensity={0.3} 
            colorCycle={true} 
          />
        )}
        
        {/* Enhanced supermoon glow */}
        {anomalyMode === 'supermoon' && (
          <pointLight
            position={[0, 0, 10]}
            intensity={0.4}
            color="#ffd280"
            distance={30}
            decay={1.5}
          />
        )}
      </group>
    </group>
  );
};

// ========================================
// CAMERA FOV CONTROLLER - PRESERVED
// ========================================
const CameraController = ({ fov }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (camera.isPerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, fov]);
  
  return null;
};

// ========================================
// MAIN MISSION MOON SCENE - UNIFIED
// ========================================
const MissionMoon = ({ 
  debugPhase = null,
  anomalyMode = null,
  className = "", 
  fallbackToEclipse = false, 
  showDebugHUD = false,
  isEclipse = false,
  ...otherProps
}) => {
  // State management - PRESERVED from original
  const moonRef = useRef();
  const [cameraFOV, setCameraFOV] = useState(25);
  const [prevAnomalyMode, setPrevAnomalyMode] = useState(null);
  const animationRef = useRef(null);
  
  // 🎯 FOLLOW HEROEARTH PATTERN: Performance tier detection
  const [performanceMode, setPerformanceMode] = useState('high');
  
  // Device capability detection - COPIED FROM HEROEARTH
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
  
  // Texture loading - OPTIMIZED for WebP and mobile
  const textureConfiguredRef = useRef(false);
  const stableIsMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  // Only update mobile detection on significant viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== stableIsMobile.current) {
        stableIsMobile.current = newIsMobile;
        textureConfiguredRef.current = false; // Reset texture config flag
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const textureBasePath = '/assets/images/planets/2k/';
  
  const moonTexture = useLoader(TextureLoader, `${textureBasePath}moonmap2k.webp`);
  const moonBumpMap = useLoader(TextureLoader, `${textureBasePath}moonbump2k.webp`);
  
  // 🚨 CRITICAL FIX: Only configure textures once per mobile state change
  useEffect(() => {
    if (textureConfiguredRef.current) return;
    
    // 🎯 FOLLOW HEROEARTH PATTERN: Performance-based texture optimization
    const mobileAnisotropy = performanceMode === 'minimal' ? 4 : 8;
    const desktopAnisotropy = performanceMode === 'high' ? 16 : 12;
    const anisotropyLevel = stableIsMobile.current ? mobileAnisotropy : desktopAnisotropy;
    
    // Set proper anisotropic filtering - performance tier based
    moonTexture.anisotropy = anisotropyLevel;
    moonBumpMap.anisotropy = anisotropyLevel;
    
    // Enable mipmapping
    moonTexture.generateMipmaps = true;
    moonBumpMap.generateMipmaps = true;
    
    // Set proper texture filters
    moonTexture.minFilter = LinearMipmapLinearFilter;
    moonTexture.magFilter = LinearFilter;
    moonBumpMap.minFilter = LinearMipmapLinearFilter;
    moonBumpMap.magFilter = LinearFilter;
    
    // Set proper wrapping mode
    moonTexture.wrapS = RepeatWrapping;
    moonTexture.wrapT = ClampToEdgeWrapping;
    moonBumpMap.wrapS = RepeatWrapping;
    moonBumpMap.wrapT = ClampToEdgeWrapping;
    
    // Apply texture scaling - FIXED: Reset to proper sphere mapping
    moonTexture.repeat.set(1, 1);  // Natural 1:1 texture mapping
    moonTexture.offset.set(0, 0);  // No offset to prevent scrolling effect
    moonBumpMap.repeat.set(1, 1);
    moonBumpMap.offset.set(0, 0);
    
    textureConfiguredRef.current = true;
    console.log('[MOON_TEXTURE] Configured textures for performance mode:', performanceMode);
  }, [moonTexture, moonBumpMap, performanceMode]); // Include performanceMode in deps
  
  // Rotation animation - REDUCED: Slower rotation to minimize stitch line visibility
  useGlobalFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.0005; // Reduced from 0.001 to minimize stitch exposure
    }
  }, 'low'); // Low priority since rotation is not critical
  
  // 🚀 A-1: FOV Animation using GlobalFrameManager (replaces useUnifiedAnimationController)
  const fovAnimationRef = useRef(null);
  
  // Camera FOV animation for supermoon - MIGRATED TO GLOBALFRAMEMANAGER
  useEffect(() => {
    if (anomalyMode !== prevAnomalyMode) {
      setPrevAnomalyMode(anomalyMode);
      
      // Cancel any existing FOV animation
      if (fovAnimationRef.current) {
        fovAnimationRef.current.cancel();
        fovAnimationRef.current = null;
      }
      
      // Supermoon zoom in
      if (anomalyMode === 'supermoon') {
        const startFOV = cameraFOV;
        const targetFOV = 19;
        const startTime = performance.now();
        const duration = 1800;
        
        const animateZoomIn = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          
          const newFOV = startFOV + (targetFOV - startFOV) * eased;
          setCameraFOV(newFOV);
          
          if (progress >= 1) {
            fovAnimationRef.current = null;
          }
        };
        
        // Register with GlobalFrameManager
        fovAnimationRef.current = {
          callback: animateZoomIn,
          cancel: () => {
            // Cleanup handled by GlobalFrameManager unsubscribe
          }
        };
        
        const unsubscribe = globalFrameManager.subscribe('moonFovZoomIn', animateZoomIn, 'high');
        fovAnimationRef.current.cancel = unsubscribe;
      }
      // Zoom back out when leaving supermoon
      else if (prevAnomalyMode === 'supermoon') {
        const startFOV = cameraFOV;
        const targetFOV = 25; // Normal FOV
        const startTime = performance.now();
        const duration = 1500;
        
        const animateZoomOut = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          
          const newFOV = startFOV + (targetFOV - startFOV) * eased;
          setCameraFOV(newFOV);
          
          if (progress >= 1) {
            fovAnimationRef.current = null;
          }
        };
        
        // Register with GlobalFrameManager
        fovAnimationRef.current = {
          callback: animateZoomOut,
          cancel: () => {
            // Cleanup handled by GlobalFrameManager unsubscribe
          }
        };
        
        const unsubscribe = globalFrameManager.subscribe('moonFovZoomOut', animateZoomOut, 'high');
        fovAnimationRef.current.cancel = unsubscribe;
      }
    }
  }, [anomalyMode, prevAnomalyMode, cameraFOV]);
  
  // 🚨 PHASE B1: Unified cleanup on unmount
  useEffect(() => {
    return () => {
      // Cancel FOV animation if active
      if (fovAnimationRef.current) {
        fovAnimationRef.current.cancel();
        fovAnimationRef.current = null;
      }
    };
  }, []);
  
  // Material configuration based on anomaly mode - PRESERVED EXACTLY
  const isSupermoon = anomalyMode === 'supermoon';
  const isEclipseMode = anomalyMode === 'eclipse';
  const isSciFi = anomalyMode === 'scifi';
  
  // Get current phase from debugPhase or calculate it
  const getCurrentPhase = () => {
    if (debugPhase !== null) {
      if (debugPhase >= 0.9 || debugPhase <= 0.1) return 'newMoon';
      if (debugPhase > 0.1 && debugPhase <= 0.25) return 'waxingCrescent';
      if (debugPhase > 0.25 && debugPhase <= 0.4) return 'firstQuarter';
      if (debugPhase > 0.4 && debugPhase <= 0.6) return 'waxingGibbous';
      if (debugPhase > 0.6 && debugPhase <= 0.75) return 'fullMoon';
      if (debugPhase > 0.75 && debugPhase <= 0.85) return 'waningGibbous';
      if (debugPhase > 0.85 && debugPhase < 0.9) return 'lastQuarter';
      return 'waningCrescent';
    }
    
    // Auto calculation based on current date
    const now = new Date();
    const lunarCycle = 29.53; // days
    const knownNewMoon = new Date('2024-01-11'); // Known new moon
    const daysSinceNewMoon = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentPhase = (daysSinceNewMoon % lunarCycle) / lunarCycle;
    
    if (currentPhase >= 0.9 || currentPhase <= 0.1) return 'newMoon';
    if (currentPhase > 0.1 && currentPhase <= 0.25) return 'waxingCrescent';
    if (currentPhase > 0.25 && currentPhase <= 0.4) return 'firstQuarter';
    if (currentPhase > 0.4 && currentPhase <= 0.6) return 'waxingGibbous';
    if (currentPhase > 0.6 && currentPhase <= 0.75) return 'fullMoon';
    if (currentPhase > 0.75 && currentPhase <= 0.85) return 'waningGibbous';
    if (currentPhase > 0.85 && currentPhase < 0.9) return 'lastQuarter';
    return 'waningCrescent';
  };
  
  const phaseConfig = getCurrentPhase();
  
  // 🎯 FOLLOW HEROEARTH PATTERN: Responsive geometry settings
  const geometryDetail = performanceMode === 'minimal' ? 32 : performanceMode === 'low' ? 48 : 64;
  const atmosphereDetail = performanceMode === 'minimal' ? 16 : 32;
  const interactionDetail = performanceMode === 'minimal' ? 16 : 32;
  
  // 🎯 PERFORMANCE TIERS: Material quality settings
  const bumpScale = performanceMode === 'minimal' ? 0.002 : performanceMode === 'low' ? 0.003 : 0.005;
  const enableDithering = performanceMode !== 'minimal';
  
  // Clean emissive intensity based on moon phase
  const getMaterialEmissiveIntensity = () => {
    if (isSupermoon) return 0.08; // Supermoon special case
    
    switch(phaseConfig) {
      case 'newMoon': return 0.002; // Almost no self-glow for dark phase
      case 'waxingCrescent': return 0.005; // Very minimal
      case 'firstQuarter': return 0.01; // Low
      case 'waxingGibbous': return 0.015; // Moderate
      case 'fullMoon': return 0.02; // Highest natural glow
      case 'waningGibbous': return 0.015; // Moderate
      case 'lastQuarter': return 0.01; // Low
      case 'waningCrescent': return 0.005; // Very minimal
      default: return 0.01;
    }
  };

  // Clean emissive color based on moon phase
  const getMaterialEmissiveColor = () => {
    if (isSupermoon) return "#ffd280"; // Warm supermoon glow
    
    switch(phaseConfig) {
      case 'newMoon': return "#000000"; // No glow for new moon
      case 'waxingCrescent': return "#1a1a1f"; // Very dark blue-gray
      case 'firstQuarter': return "#2d2d35"; // Dark gray
      case 'waxingGibbous': return "#e6e6f0"; // Subtle white-blue
      case 'fullMoon': return "#f4f1e0"; // Natural moon color
      case 'waningGibbous': return "#e6e6f0"; // Subtle white-blue
      case 'lastQuarter': return "#2d2d35"; // Dark gray
      case 'waningCrescent': return "#1a1a1f"; // Very dark blue-gray
      default: return "#e6e6f0";
    }
  };
  
  return (
    <group>
      {/* Camera FOV Controller - PRESERVED */}
      <CameraController fov={cameraFOV} />
      
      {/* Moon Lighting System - PRESERVED */}
      <MoonLighting debugPhase={debugPhase} anomalyMode={anomalyMode} />
      
      {/* Soft atmospheric haze - PERFORMANCE OPTIMIZED */}
      <mesh>
        <sphereGeometry args={[4.25, atmosphereDetail, atmosphereDetail]} />
        <meshBasicMaterial
          color={isSupermoon ? "#fff2d6" : "#ffffff"}
          transparent
          opacity={isSupermoon ? 0.08 : 0.04}
          side={BackSide}
        />
      </mesh>
      
      {/* Main Moon Mesh - PERFORMANCE OPTIMIZED */}
      <mesh 
        ref={moonRef} 
        receiveShadow={true} 
        castShadow={true}
        {...otherProps}
      >
        <sphereGeometry args={[4.16, geometryDetail, geometryDetail]} />
        <meshStandardMaterial 
          map={moonTexture}
          bumpMap={moonBumpMap}
          bumpScale={bumpScale}
          color={isSupermoon ? "#f8e0b0" : "#f5f5f5"}
          metalness={isSupermoon ? 0.15 : 0.1}
          roughness={isSupermoon ? 0.65 : 0.7}
          emissive={getMaterialEmissiveColor()}
          emissiveIntensity={getMaterialEmissiveIntensity()}
          flatShading={false}
          dithering={enableDithering}
          transparent={false}
          opacity={1.0}
          depthWrite={true}
        />
      </mesh>
      
      {/* Invisible interaction sphere - PERFORMANCE OPTIMIZED */}
      <mesh>
        <sphereGeometry args={[4.5, interactionDetail, interactionDetail]} />
        <meshBasicMaterial 
          transparent 
          opacity={0} 
        />
      </mesh>
      
      {/* Debug HUD - PRESERVED */}
      {showDebugHUD && (
        <mesh position={[0, 6, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
};

export default MissionMoon; 