/**
 * @component ContactGlobeProxy
 * @description Safety proxy for ContactGlobe with automatic fallback
 * @version 1.0.0
 * @migration_safety CRITICAL - Implements 100% fallback reliability
 */

import React, { useState, useEffect, Suspense } from 'react';

// Smart Fallback Component with visual continuity
const ContactGlobeFallback = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-96 h-96 rounded-full overflow-hidden">
      {/* Globe sphere with country-like appearance */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(100, 149, 237, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(25, 25, 112, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #062056 0%, #1e1b4b 100%)
          `
        }}
      />
      
      {/* Animated connection lines */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
             style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" 
             style={{ animationDuration: '3s' }} />
      </div>
      
      {/* Terminal text overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 font-mono text-lime-400 text-xs opacity-80">
        <div>$ connecting_to_server...</div>
        <div>$ establishing_link...</div>
        <div>$ ready_for_transmission</div>
        <div className="flex items-center">
          <span>$</span>
          <span className="ml-1 h-4 w-2 bg-lime-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  </div>
);

const ContactGlobeProxy = () => {
  const [fallbackMode, setFallbackMode] = useState(false);
  const [ContactGlobeComponent, setContactGlobeComponent] = useState(null);

  useEffect(() => {
    // MISSION CONTROL: Component initialization
    console.log('🌍 MISSION CONTROL: ContactGlobe initialization sequence started [GLOBE-001]');
    
    // Attempt to load the new ContactGlobeWithCanvas
    const loadNewComponent = async () => {
      try {
        const { default: ContactGlobeWithCanvas } = await import('../../../3d/scenes/home/ContactGlobeWithCanvas');
        setContactGlobeComponent(() => ContactGlobeWithCanvas);
        console.log('🌍 MISSION CONTROL: 3D ContactGlobe systems online - Unified architecture active [GLOBE-200]');
      } catch (error) {
        console.warn('🌍 MISSION ALERT: ContactGlobe system unavailable - Static backup protocol active [GLOBE-500]');
        setFallbackMode(true);
      }
    };

    loadNewComponent();
  }, []);

  // Handle component errors with error boundary-like behavior
  const handleComponentError = (error) => {
    console.warn('🌍 MISSION ALERT: Runtime error detected in ContactGlobe - Switching to backup systems [GLOBE-ERROR]');
    setFallbackMode(true);
  };

  // Render priority: New Component > Static Fallback
  if (!fallbackMode && ContactGlobeComponent) {
    return (
      <Suspense fallback={<ContactGlobeFallback />}>
        <ContactGlobeComponent onError={handleComponentError} />
      </Suspense>
    );
  }
  
  // Static fallback ensures 100% reliability
  return <ContactGlobeFallback />;
};

export default ContactGlobeProxy; 