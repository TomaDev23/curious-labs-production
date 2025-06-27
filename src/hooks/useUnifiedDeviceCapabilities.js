/**
 * @hook useUnifiedDeviceCapabilities
 * @description Uses unified WebGL context instead of creating multiple test contexts
 * @version 1.0.0
 * @priority CRITICAL - Fixes multiple WebGL context creation
 */

import { useState, useEffect, useMemo } from 'react';

// Safe WebGL context access with fallback
const useWebGLSafely = () => {
  // DISABLED: UnifiedWebGLProvider removed during 3D cleanup - using fallback
  // try {
  //   const { useUnifiedWebGL } = require('../3d/engine/UnifiedWebGLProvider');
  //   return useUnifiedWebGL();
  // } catch (error) {
  //   // WebGL provider not available - return fallback
  //   return {
  //     webglSupported: false,
  //     capabilities: null
  //   };
  // }
  
  // Safe fallback implementation - provides basic WebGL detection without provider dependency
  try {
    const canvas = document.createElement('canvas');
    const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (webgl) {
      // Basic capability detection
      const maxTextureSize = webgl.getParameter(webgl.MAX_TEXTURE_SIZE) || 0;
      const maxTextures = webgl.getParameter(webgl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) || 0;
      const vendor = webgl.getParameter(webgl.VENDOR) || 'Unknown';
      const renderer = webgl.getParameter(webgl.RENDERER) || 'Unknown';
      const isWebGL2 = !!(webgl instanceof WebGL2RenderingContext);
      
      // Clean up test context
      const ext = webgl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
      
      return {
        webglSupported: true,
        capabilities: {
          maxTextureSize,
          maxCombinedTextureImageUnits: maxTextures,
          vendor,
          renderer,
          isWebGL2
        }
      };
    } else {
      return {
        webglSupported: false,
        capabilities: null
      };
    }
  } catch (error) {
    // Fallback for environments without canvas support
    return {
      webglSupported: false,
      capabilities: null
    };
  }
};

export const useUnifiedDeviceCapabilities = () => {
  const { webglSupported, capabilities } = useWebGLSafely();
  const [deviceProfile, setDeviceProfile] = useState(null);

  // Device performance assessment using unified WebGL capabilities
  const performanceProfile = useMemo(() => {
    if (!webglSupported || !capabilities) {
      return {
        webglSupported: false,
        performanceLevel: 'minimal',
        canHandle3D: false,
        shouldUse3D: false,
        // 🎯 MOBILE SAFE: Fallback values with comprehensive error handling
        webglVersion: 1,
        hasEnoughMemory: (() => {
          try {
            return navigator && typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory >= 4 : true;
          } catch (error) {
            console.warn('deviceMemory fallback check failed:', error);
            return true;
          }
        })(),
        isSlowNetwork: false,
        isMobile: (() => {
          try {
            return navigator && navigator.userAgent ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false;
          } catch (error) {
            console.warn('userAgent mobile check failed:', error);
            return false;
          }
        })(),
        isTablet: (() => {
          try {
            return navigator && navigator.userAgent ? /iPad|Android(?=.*\b(tablet|large))/i.test(navigator.userAgent) : false;
          } catch (error) {
            console.warn('userAgent tablet check failed:', error);
            return false;
          }
        })(),
        isDesktop: (() => {
          try {
            return navigator && navigator.userAgent ? !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : true;
          } catch (error) {
            console.warn('userAgent desktop check failed:', error);
            return true;
          }
        })(),
        maxTextureSize: 0,
        maxTextures: 0,
        vendor: 'Unknown',
        renderer: 'Software Fallback'
      };
    }

    // 🎯 MOBILE SAFE: Memory check with comprehensive error handling
    let hasEnoughMemory = true;
    try {
      if (navigator && typeof navigator.deviceMemory === 'number') {
        hasEnoughMemory = navigator.deviceMemory >= 4;
      }
    } catch (error) {
      console.warn('deviceMemory check failed:', error);
      hasEnoughMemory = true; // Safe fallback
    }
    
    // 🎯 MOBILE SAFE: Network check with comprehensive error handling
    let isSlowNetwork = false;
    try {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.effectiveType) {
        isSlowNetwork = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      }
    } catch (error) {
      console.warn('connection check failed:', error);
      isSlowNetwork = false; // Safe fallback
    }
    
    // 🎯 MOBILE SAFE: Device class detection with comprehensive error handling
    let isMobile = false;
    let isTablet = false;
    let isDesktop = true;
    
    try {
      if (navigator && navigator.userAgent) {
        const userAgent = navigator.userAgent;
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        isTablet = /iPad|Android(?=.*\b(tablet|large))/i.test(userAgent);
        isDesktop = !isMobile && !isTablet;
      }
    } catch (error) {
      console.warn('userAgent detection failed:', error);
      // Keep safe defaults: isMobile = false, isTablet = false, isDesktop = true
    }
    
    // Performance level calculation
    let performanceLevel = 'high';
    if (!hasEnoughMemory || isSlowNetwork) {
      performanceLevel = 'minimal';
    } else if (isMobile && !isTablet) {
      performanceLevel = 'low';
    } else if (isTablet) {
      performanceLevel = 'medium';
    }

    // WebGL capability assessment
    const webglVersion = capabilities.isWebGL2 ? 2 : 1;
    const maxTextureSize = capabilities.maxTextureSize || 0;
    const maxTextures = capabilities.maxCombinedTextureImageUnits || 0;

    // 3D suitability check
    const canHandle3D = webglSupported && 
                       maxTextureSize >= 2048 && 
                       maxTextures >= 8 && 
                       hasEnoughMemory;

    const shouldUse3D = canHandle3D && 
                       performanceLevel !== 'minimal' && 
                       (() => {
                         try {
                           if (window.matchMedia && typeof window.matchMedia === 'function') {
                             const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
                             return mediaQuery ? !mediaQuery.matches : true;
                           }
                           return true; // Safe fallback
                         } catch (error) {
                           console.warn('matchMedia shouldUse3D check failed:', error);
                           return true; // Safe fallback
                         }
                       })();

    return {
      webglSupported,
      webglVersion,
      performanceLevel,
      canHandle3D,
      shouldUse3D,
      hasEnoughMemory,
      isSlowNetwork,
      isMobile,
      isTablet,
      isDesktop,
      maxTextureSize,
      maxTextures,
      vendor: capabilities.vendor,
      renderer: capabilities.renderer
    };
  }, [webglSupported, capabilities]);

  // 🎯 MOBILE SAFE: Device breakpoint detection with comprehensive error handling
  const breakpoint = useMemo(() => {
    if (typeof window === 'undefined') return 'md';
    
    try {
      const width = window.innerWidth || 1024; // Safe fallback
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      if (width < 1280) return 'xl';
      return '2xl';
    } catch (error) {
      console.warn('window.innerWidth access failed:', error);
      return 'md'; // Safe fallback
    }
  }, []);

  // 🎯 MOBILE SAFE: Update device profile when window resizes with comprehensive error handling
  useEffect(() => {
    const updateProfile = () => {
      try {
        setDeviceProfile({
          ...performanceProfile,
          breakpoint,
          isLowPerf: performanceProfile.performanceLevel === 'minimal' || 
                     performanceProfile.performanceLevel === 'low' ||
                     performanceProfile.isSlowNetwork,
          viewport: {
            width: (typeof window !== 'undefined' && window.innerWidth) || 1024,
            height: (typeof window !== 'undefined' && window.innerHeight) || 768
          },
          timestamp: Date.now()
        });
      } catch (error) {
        console.warn('Device profile update failed:', error);
        // Set minimal safe profile on error
        setDeviceProfile({
          webglSupported: false,
          performanceLevel: 'minimal',
          canHandle3D: false,
          shouldUse3D: false,
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          breakpoint: 'md',
          isLowPerf: true,
          viewport: { width: 1024, height: 768 },
          timestamp: Date.now()
        });
      }
    };

    updateProfile();

    // 🎯 MOBILE SAFE: Handle resize events with comprehensive error handling
    const handleResize = () => {
      try {
        updateProfile();
      } catch (error) {
        console.warn('Resize handler failed:', error);
      }
    };
    
    try {
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('resize', handleResize);
        
        return () => {
          try {
            window.removeEventListener('resize', handleResize);
          } catch (error) {
            console.warn('Resize cleanup failed:', error);
          }
        };
      }
    } catch (error) {
      console.warn('Resize event listener setup failed:', error);
    }
    
    // No cleanup needed if event listener setup failed
    return () => {};
  }, [performanceProfile, breakpoint]);

  return deviceProfile;
};

// Backwards compatibility exports
export const useDeviceProfile = useUnifiedDeviceCapabilities;
export const useBreakpoint = () => {
  const profile = useUnifiedDeviceCapabilities();
  return profile?.breakpoint || 'md';
};

export default useUnifiedDeviceCapabilities; 