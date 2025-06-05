/**
 * @hook useUnifiedDeviceCapabilities
 * @description Uses unified WebGL context instead of creating multiple test contexts
 * @version 1.0.0
 * @priority CRITICAL - Fixes multiple WebGL context creation
 */

import { useState, useEffect, useMemo } from 'react';
import { useUnifiedWebGL } from '../3d/engine/UnifiedWebGLProvider';

export const useUnifiedDeviceCapabilities = () => {
  const { webglSupported, capabilities } = useUnifiedWebGL();
  const [deviceProfile, setDeviceProfile] = useState(null);

  // Device performance assessment using unified WebGL capabilities
  const performanceProfile = useMemo(() => {
    if (!webglSupported || !capabilities) {
      return {
        webglSupported: false,
        performanceLevel: 'minimal',
        canHandle3D: false,
        shouldUse3D: false
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