import { createContext, useContext, useEffect, useState } from 'react';

const ScrollContext = createContext(0);

export const useGlobalScroll = () => useContext(ScrollContext);

export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(() => {
    return typeof window !== 'undefined' ? window.scrollY : 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
} 