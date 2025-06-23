// CSS Optimization Utilities
// Prevent unnecessary CSS loading and optimize critical path

/**
 * Dynamically load CSS only when needed
 * @param {string} cssPath - Path to the CSS file
 * @param {string} routeId - Unique identifier for the route
 */
export const loadRouteCSS = (cssPath, routeId) => {
  // Check if CSS is already loaded
  if (document.querySelector(`link[data-route="${routeId}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    link.setAttribute('data-route', routeId);
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));
    
    document.head.appendChild(link);
  });
};

/**
 * Remove CSS for routes that are no longer active
 * @param {string} routeId - Route identifier to keep
 */
export const cleanupInactiveCSS = (currentRouteId) => {
  const routeLinks = document.querySelectorAll('link[data-route]');
  routeLinks.forEach(link => {
    const routeId = link.getAttribute('data-route');
    if (routeId !== currentRouteId && routeId !== 'critical') {
      link.remove();
    }
  });
};

/**
 * Critical CSS that should always be loaded
 */
export const criticalCSS = `
  /* Only include essential styles */
  .loading-spinner { animation: spin 1s linear infinite; }
  .fade-in { opacity: 1; transition: opacity 0.3s ease; }
  .fade-out { opacity: 0; transition: opacity 0.3s ease; }
  
  /* Essential layout */
  .min-h-screen { min-height: 100vh; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

/**
 * Inject critical CSS inline to prevent FOUC
 */
export const injectCriticalCSS = () => {
  if (document.querySelector('#critical-css')) return;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Load CSS for specific route - simplified version without imports
 * @param {string} routeName - Name of the route
 */
export const loadRouteSpecificCSS = async (routeName) => {
  console.log(`🎨 CSS optimization enabled for route: ${routeName}`);
  
  // Instead of importing non-existent files, we'll use this as a hook
  // for future CSS optimizations or to load external CSS files
  
  // Add route-specific CSS classes to document if needed
  const routeClasses = {
    'guardian': 'guardian-theme',
    'curious': 'curious-theme', 
    'aegis': 'aegis-theme',
    'opspipe': 'opspipe-theme',
    'moonsignal': 'moonsignal-theme',
    'final': 'final-theme',
    'codelab': 'codelab-theme',
    'museum': 'museum-theme'
  };
  
  const themeClass = routeClasses[routeName];
  if (themeClass) {
    document.body.classList.add(themeClass);
    console.log(`✅ Added theme class: ${themeClass}`);
  }
}; 