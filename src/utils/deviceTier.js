// Simple, performant check for mobile devices based on screen width.
// Consistent with the logic specified in the mission plan (MB-1).
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 820;
};

// Add other device tier checks here if needed in the future. 