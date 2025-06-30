import React, { useMemo, useState, useEffect } from 'react';
import { ScrollManager } from '../../utils/ScrollManager';
import { isMobile } from '../../utils/deviceTier';
import { motion, AnimatePresence } from '../../FramerProvider';

/**
 * CosmicHUD - A space-themed heads-up display showing scroll position and active section
 * Designed to complement the cosmic theme of the site
 */
const CosmicHUD = ({ showSectionLabel = true, showProgress = true, position = 'bottom-left' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isMobileDevice = isMobile();
  
  useEffect(() => {
    if (isMobileDevice) {
      console.log('[PHASE2] CosmicHUD scroll listeners disabled on mobile');
      return;
    }
    
    const handleScrollUpdate = (currentScrollY) => {
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) : 0;
      setScrollProgress(progress);
      
      setIsAtTop(currentScrollY <= 10);
      setIsAtBottom(Math.abs(currentScrollY + window.innerHeight - document.documentElement.scrollHeight) <= 10);
      
      const sections = document.querySelectorAll('section[id]');
      let found = '';
      for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          found = section.id;
          break;
        }
      }
      setActiveSection(found);
    };
    
    const unsubscribe = ScrollManager.subscribe(handleScrollUpdate);
    
    handleScrollUpdate(ScrollManager.getScrollY());
    
    return unsubscribe;
  }, [lastScrollY, isMobileDevice]);
  
  const positionClasses = useMemo(() => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
      default:
        return 'bottom-4 left-4';
    }
  }, [position]);
  
  const formattedSectionName = useMemo(() => {
    if (!activeSection) return 'Cosmos';
    
    return activeSection
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [activeSection]);
  
  if (isAtTop && !activeSection) return null;
  
  if (isMobileDevice) return null;

  return (
    <motion.div
      className={`fixed ${positionClasses} z-[95] pointer-events-none`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/30 backdrop-blur-md p-2 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/10 flex flex-col items-center">
        {showSectionLabel && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection || 'cosmos'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono text-purple-300 mb-1 px-1 flex items-center"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
              {formattedSectionName}
            </motion.div>
          </AnimatePresence>
        )}
        
        {showProgress && (
          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CosmicHUD; 