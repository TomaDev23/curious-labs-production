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
        // Fallback values for when WebGL is disabled
        webglVersion: 1,
        hasEnoughMemory: navigator.deviceMemory ? navigator.deviceMemory >= 4 : true,
        isSlowNetwork: false,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android(?=.*\b(tablet|large))/i.test(navigator.userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        maxTextureSize: 0,
        maxTextures: 0,
        vendor: 'Unknown',
        renderer: 'Software Fallback'
      };
    }

    // Memory check
    const hasEnoughMemory = !navigator.deviceMemory || navigator.deviceMemory >= 4;
    
    // Network check
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // Device class detection
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\b(tablet|large))/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
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
                       !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Device breakpoint detection (no WebGL context needed)
  const breakpoint = useMemo(() => {
    if (typeof window === 'undefined') return 'md';
    
    const width = window.innerWidth;
    if (width < 640) return 'sm';
    if (width < 768) return 'md';
    if (width < 1024) return 'lg';
    if (width < 1280) return 'xl';
    return '2xl';
  }, []);

  // Update device profile when window resizes
  useEffect(() => {
    const updateProfile = () => {
      setDeviceProfile({
        ...performanceProfile,
        breakpoint,
        isLowPerf: performanceProfile.performanceLevel === 'minimal' || 
                   performanceProfile.performanceLevel === 'low' ||
                   performanceProfile.isSlowNetwork,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        timestamp: Date.now()
      });
    };

    updateProfile();

    const handleResize = () => updateProfile();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceProfile;
};

// Backwards compatibility exports
export const useDeviceProfile = useUnifiedDeviceCapabilities;
export const useBreakpoint = () => {
  const profile = useUnifiedDeviceCapabilities();
  return profile?.breakpoint || 'md';
};

export default useUnifiedDeviceCapabilities; 