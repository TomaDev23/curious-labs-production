import React, { useState, useEffect } from 'react';
// 🚨 SM-3: Replace useGlobalScroll with ScrollManager
import { ScrollManager } from '../utils/ScrollManager';
import { isMobile } from '../utils/deviceTier';

export default function ScrollToTop() {
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollY, setScrollY] = useState(0);
  const mobile = isMobile();

  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  useEffect(() => {
    // 🚨 MB-1: Skip scroll listeners on mobile for performance
    if (mobile) return;
    
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollY(newScrollY);
    });

    return unsubscribe;
  }, [mobile]);

  const [isVisible, setIsVisible] = useState(false);

  // 🚀 A-4: Handle visibility using global scroll value
  useEffect(() => {
    setIsVisible(scrollY > 300);
  }, [scrollY]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 p-3 rounded-full
            bg-gradient-to-r from-purple-500 to-blue-600
            text-white shadow-lg cursor-pointer
            transition-all duration-300 transform
            hover:scale-110 hover:shadow-purple-500/25
            active:scale-95
            z-[200]
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
          `}
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 md:h-5 md:w-5 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </button>
      )}
    </>
  );
} 