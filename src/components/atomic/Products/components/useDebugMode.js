import { useState, useEffect } from 'react';

/**
 * Debug Mode Hook
 * Toggles debug mode visualization with Ctrl+D
 */
export const useDebugMode = () => {
  const [isDebug, setIsDebug] = useState(false);
  
  useEffect(() => {
    const toggleDebug = (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        setIsDebug(prev => !prev);
        console.log('Debug mode:', !isDebug);
      }
    };
    
    window.addEventListener('keydown', toggleDebug);
    return () => window.removeEventListener('keydown', toggleDebug);
  }, [isDebug]);
  
  return isDebug;
};