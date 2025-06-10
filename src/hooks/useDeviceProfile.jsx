import { useState, useEffect } from 'react';
import { useUnifiedDeviceCapabilities } from './useUnifiedDeviceCapabilities';

/**
 * Legacy device profile hook - now redirects to unified system
 * @deprecated Use useUnifiedDeviceCapabilities directly for new code
 * @migration This hook now uses UnifiedWebGLProvider instead of creating contexts
 */
const useDeviceProfile = () => {
  // 🚀 UNIFIED DEVICE CAPABILITY: Use unified hook instead of creating WebGL context
  const unifiedProfile = useUnifiedDeviceCapabilities();
  
  // Transform unified profile to legacy API format for backward compatibility
  const [profile, setProfile] = useState({
    isMobile: false,
    isTablet: false,
    isLowPerf: false,
    hasWebGL: true,
    prefersReducedMotion: false
  });

  useEffect(() => {
    if (!unifiedProfile) return;
    
    // Map unified profile to legacy format
    setProfile({
      isMobile: unifiedProfile.isMobile || false,
      isTablet: unifiedProfile.isTablet || false,
      isLowPerf: unifiedProfile.isLowPerf || false,
      hasWebGL: unifiedProfile.webglSupported || false,
      prefersReducedMotion: unifiedProfile.prefersReducedMotion || false
    });
  }, [unifiedProfile]);

  return profile;
};

export default useDeviceProfile; 