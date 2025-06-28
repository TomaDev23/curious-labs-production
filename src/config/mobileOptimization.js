/**
 * @file mobileOptimization.js
 * @description Centralized mobile optimization configuration
 * @purpose Standardize performance settings across all components
 */

// Device capability detection
export const detectDevice = () => {
  if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true };
  
  const width = window.innerWidth;
  const userAgent = navigator.userAgent;
  
  const isMobile = width < 768 || /iPhone|iPod|Android.*Mobile/i.test(userAgent);
  const isTablet = !isMobile && (width < 1024 || /iPad|Android(?!.*Mobile)/i.test(userAgent));
  const isDesktop = !isMobile && !isTablet;
  
  return { isMobile, isTablet, isDesktop };
};

// Performance tier detection
export const detectPerformanceTier = () => {
  if (typeof window === 'undefined') return 'high';
  
  const { isMobile, isTablet } = detectDevice();
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  if (prefersReducedMotion || slowNetwork || (isMobile && lowMemory)) {
    return 'minimal';
  } else if (isMobile || lowMemory) {
    return 'low';
  } else if (isTablet) {
    return 'medium';
  } else {
    return 'high';
  }
};

// 3D Performance Settings
export const get3DSettings = (performanceTier = 'high') => {
  const { isMobile } = detectDevice();
  
  const settings = {
    minimal: {
      geometryDetail: 16,
      anisotropy: 2,
      shadows: false,
      antialias: false,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 1),
      frameRate: 10,
      textureSize: '1k',
      enablePostProcessing: false,
      maxLights: 2
    },
    low: {
      geometryDetail: 32,
      anisotropy: 4,
      shadows: false,
      antialias: false,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      frameRate: 15,
      textureSize: '1k',
      enablePostProcessing: false,
      maxLights: 3
    },
    medium: {
      geometryDetail: 48,
      anisotropy: 8,
      shadows: true,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      frameRate: 30,
      textureSize: '2k',
      enablePostProcessing: false,
      maxLights: 4
    },
    high: {
      geometryDetail: 64,
      anisotropy: 16,
      shadows: true,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      frameRate: 60,
      textureSize: '2k',
      enablePostProcessing: true,
      maxLights: 6
    }
  };
  
  return settings[performanceTier] || settings.high;
};

// Animation settings based on performance
export const getAnimationSettings = (performanceTier = 'high') => {
  const settings = {
    minimal: {
      enableAnimations: false,
      duration: 0.1,
      easing: 'linear',
      reduceMotion: true,
      enableParticles: false
    },
    low: {
      enableAnimations: true,
      duration: 0.2,
      easing: 'easeOut',
      reduceMotion: true,
      enableParticles: false
    },
    medium: {
      enableAnimations: true,
      duration: 0.3,
      easing: 'easeInOut',
      reduceMotion: false,
      enableParticles: true
    },
    high: {
      enableAnimations: true,
      duration: 0.5,
      easing: 'easeInOut',
      reduceMotion: false,
      enableParticles: true
    }
  };
  
  return settings[performanceTier] || settings.high;
};

// Memory management settings
export const getMemorySettings = (performanceTier = 'high') => {
  const settings = {
    minimal: {
      maxTextures: 5,
      maxGeometries: 3,
      disposeInterval: 30000, // 30s
      enableGarbageCollection: true
    },
    low: {
      maxTextures: 10,
      maxGeometries: 5,
      disposeInterval: 60000, // 1min
      enableGarbageCollection: true
    },
    medium: {
      maxTextures: 20,
      maxGeometries: 10,
      disposeInterval: 120000, // 2min
      enableGarbageCollection: false
    },
    high: {
      maxTextures: 50,
      maxGeometries: 25,
      disposeInterval: 300000, // 5min
      enableGarbageCollection: false
    }
  };
  
  return settings[performanceTier] || settings.high;
};

// WebGL context settings
export const getWebGLSettings = (performanceTier = 'high') => {
  const { isMobile } = detectDevice();
  
  const settings = {
    minimal: {
      powerPreference: 'low-power',
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true
    },
    low: {
      powerPreference: isMobile ? 'low-power' : 'default',
      antialias: false,
      alpha: true,
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: isMobile
    },
    medium: {
      powerPreference: 'default',
      antialias: true,
      alpha: true,
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false
    },
    high: {
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
      depth: true,
      stencil: true,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false
    }
  };
  
  return settings[performanceTier] || settings.high;
};

// Comprehensive mobile optimization hook
export const useMobileOptimization = () => {
  const device = detectDevice();
  const performanceTier = detectPerformanceTier();
  const settings3D = get3DSettings(performanceTier);
  const animationSettings = getAnimationSettings(performanceTier);
  const memorySettings = getMemorySettings(performanceTier);
  const webglSettings = getWebGLSettings(performanceTier);
  
  return {
    device,
    performanceTier,
    settings3D,
    animationSettings,
    memorySettings,
    webglSettings,
    shouldOptimize: performanceTier === 'minimal' || performanceTier === 'low',
    isLowEnd: performanceTier === 'minimal'
  };
};

export default {
  detectDevice,
  detectPerformanceTier,
  get3DSettings,
  getAnimationSettings,
  getMemorySettings,
  getWebGLSettings,
  useMobileOptimization
}; 