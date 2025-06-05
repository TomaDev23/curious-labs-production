import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
// LEGACY: import NavBar from '../components/NavBar';
import FooterMain from '../components/FooterMain';
// 🚀 UNIFIED DEVICE CAPABILITY: Replacing legacy hook that creates WebGL contexts
import { useUnifiedDeviceCapabilities } from '../hooks/useUnifiedDeviceCapabilities';
import HomepageSectionDebug from '../components/debug/HomepageSectionDebug';
import ContactGlobeWithCanvas from '../components/hero/ContactGlobeWithCanvas.jsx';

const HomeFloatflowLayout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainContainerRef = useRef(null);
  // 🚀 UNIFIED DEVICE CAPABILITY: Using unified hook instead of legacy useDeviceProfile
  const deviceProfile = useUnifiedDeviceCapabilities();
  
  // Use unified device profile data
  const isLowPerf = deviceProfile?.isLowPerf || false;
  const prefersReducedMotion = deviceProfile?.prefersReducedMotion || false;
  
  // Development environment detection
  const isDev = process.env.NODE_ENV === 'development' || 
                window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set loaded after initial render
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="relative w-full overflow-x-hidden bg-black" ref={mainContainerRef}>
      <MissionControlNavbar />
      
      {/* Main content container with scrollY, isLoaded, and device profile state passed down */}
      <main className="min-h-screen">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
              scrollY, 
              isLoaded,
              isLowPerf,
              isReducedMotion: prefersReducedMotion 
            });
          }
          return child;
        })}
      </main>
      
      <FooterMain />
      
      {/* Add Homepage Section Debug in development */}
      {isDev && <HomepageSectionDebug />}
    </div>
  );
};

export default HomeFloatflowLayout; 