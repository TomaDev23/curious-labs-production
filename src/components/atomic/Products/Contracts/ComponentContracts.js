/**
 * COMPONENT CONTRACTS & INTERFACES
 * 
 * This file defines all interfaces, prop types, and data structures
 * used throughout the Products components ecosystem.
 * 
 * Use these contracts when editing components to ensure consistency.
 * 
 * UPDATED: Added mobile responsiveness contracts and AEGIS page mobile optimization specs
 */

// ==========================================
// CORE DATA STRUCTURES
// ==========================================

/**
 * @typedef {Object} ProductItem
 * @property {number} id - Unique identifier
 * @property {string} title - Product name
 * @property {string} summary - Brief description
 * @property {string[]} features - Array of feature descriptions
 * @property {string} tagline - Marketing tagline
 * @property {string} backContent - Extended description
 * @property {ProductFullDescription} fullDescription - Detailed product info
 * @property {string} illustrationSrc - Path to product image
 * @property {string} accentColor - Hex color for theming
 * @property {string} theme - Theme name (lime, magenta, amber, cyan)
 * @property {string} bgGradient - Tailwind gradient classes
 */

/**
 * @typedef {Object} ProductFullDescription
 * @property {string} whatItIs - Product definition
 * @property {string[]} howItWorks - Array of functionality descriptions
 * @property {string} whyItMatters - Value proposition
 */

/**
 * @typedef {Object} AnimationVariants
 * @property {Object} initial - Initial animation state
 * @property {Object} animate - Animation target state
 * @property {Object} exit - Exit animation state
 * @property {Object} [hidden] - Hidden state for reveal animations
 * @property {Object} [visible] - Visible state for reveal animations
 * @property {Object} [hover] - Hover interaction state
 * @property {Object} [active] - Active/selected state
 */

// ==========================================
// RESPONSIVE DESIGN CONTRACTS
// ==========================================

/**
 * @typedef {Object} ResponsiveBreakpoints
 * @description Standard breakpoints used across all components
 * @property {string} mobile - "< 768px" - Mobile devices
 * @property {string} tablet - "768px - 1024px" - Tablets and large phones
 * @property {string} desktop - "> 1024px" - Desktop screens
 * @property {string} sm - "≥ 640px" - Small tablets, large phones
 * @property {string} md - "≥ 768px" - Tablets, landscape phones
 * @property {string} lg - "≥ 1024px" - Small desktops, large tablets
 * @property {string} xl - "≥ 1280px" - Desktop screens
 * @property {string} xxl - "≥ 1536px" - Large desktop screens
 */

/**
 * @typedef {Object} ResponsiveLayoutPattern
 * @description Common responsive layout patterns used in components
 * @property {string} mobile - Mobile layout classes (flex-col, single column, etc.)
 * @property {string} tablet - Tablet layout classes (grid-cols-2, etc.)
 * @property {string} desktop - Desktop layout classes (flex-row, grid-cols-3, etc.)
 * @property {string} spacing - Responsive spacing pattern (px-4 md:px-8, etc.)
 * @property {string} typography - Responsive text sizing (text-sm md:text-lg, etc.)
 */

/**
 * @typedef {Object} TouchOptimization
 * @description Touch-friendly interaction specifications
 * @property {string} minTouchTarget - "44px" - Minimum touch target size
 * @property {Object} tapFeedback - whileTap animation for mobile interactions
 * @property {boolean} hoverDisabled - Whether hover effects are disabled on touch devices
 * @property {number} tapDelay - Delay for tap interactions to prevent accidental triggers
 */

// ==========================================
// COMPONENT PROP INTERFACES
// ==========================================

/**
 * @typedef {Object} AegisPageProps
 * @description Props for the AEGIS hero/intro section
 * @property {ResponsiveLayoutPattern} [layout] - Override default responsive layout
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 * @property {TouchOptimization} [touchConfig] - Touch interaction configuration
 * 
 * MOBILE SPECIFICATIONS:
 * - Layout: flex-col lg:flex-row (stacked on mobile, side-by-side on desktop)
 * - Typography: text-3xl md:text-5xl (responsive scaling)
 * - Spacing: px-4 md:px-8 py-8 lg:py-16 (mobile-first spacing)
 * - Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 (responsive technical cards)
 * - Right column: hidden lg:flex (architecture diagram hidden on mobile)
 * - Touch targets: All interactive elements have proper touch sizing
 * - Performance: Optimized particle count and background effects for mobile
 */

/**
 * @typedef {Object} ProductsPageProps
 * @description Props for the main products showcase
 * @property {ResponsiveLayoutPattern} [layout] - Override default responsive layout
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 * 
 * MOBILE SPECIFICATIONS:
 * - Maintains excellent mobile responsiveness as reference implementation
 * - Uses mobile-first responsive patterns throughout
 * - Touch-optimized interactions and proper spacing
 */

/**
 * @typedef {Object} ServicesPageProps
 * @property {Function} onScrollRelease - Callback when stellar sequence completes
 * @property {ResponsiveLayoutPattern} [layout] - Override default responsive layout
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 */

/**
 * @typedef {Object} EnhancedProductCardProps
 * @property {ProductItem} item - Product data object
 * @property {boolean} isActive - Whether card is currently active/focused
 * @property {boolean} isFeatured - Whether card is featured (larger/highlighted)
 * @property {Function} onHover - Mouse enter handler
 * @property {Function} onLeave - Mouse leave handler
 * @property {Function} onClick - Click handler for card expansion
 * @property {TouchOptimization} [touchConfig] - Touch interaction configuration
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 */

/**
 * @typedef {Object} ProductDetailModalProps
 * @property {ProductItem|null} product - Product to display (null = closed)
 * @property {Function} onClose - Handler to close modal
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 */

/**
 * @typedef {Object} ThrottledAnimatePresenceProps
 * @property {React.ReactNode} children - Child components to animate
 * @property {boolean} [reduceMotionOnMobile] - Whether to reduce animations on mobile (default: true)
 * @property {...Object} props - Additional AnimatePresence props
 */

/**
 * @typedef {Object} ServicesCosmicEnvironmentProps
 * @description Background cosmic environment component
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 * @property {number} [particleCount] - Override particle count (auto-reduced on mobile)
 */

/**
 * @typedef {Object} CosmicUIProps
 * @property {boolean} isStellarActive - Whether stellar message is active
 * @property {string} stellarPhase - Current phase of stellar sequence
 * @property {number} stellarProgress - Progress percentage (0-1)
 * @property {boolean} canSkip - Whether skip option is available
 * @property {boolean} typewriterComplete - Whether typewriter animation finished
 * @property {boolean} showStellarHint - Whether to show stellar activation hint
 * @property {string} text - Current typewriter text content
 * @property {ResponsiveLayoutPattern} [layout] - Override default responsive layout
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 */

/**
 * @typedef {Object} IntegratedTypographyProps
 * @property {boolean} isStellarActive - Whether stellar message is active
 * @property {string} stellarPhase - Current stellar sequence phase
 * @property {boolean} showFloatingWords - Whether to display floating context words
 * @property {ResponsiveLayoutPattern} [layout] - Override default responsive layout
 * @property {boolean} [mobileOptimized] - Whether mobile optimizations are enabled (default: true)
 */

// ==========================================
// HOOK INTERFACES
// ==========================================

/**
 * @typedef {Object} ResponsiveHookReturn
 * @property {boolean} isMobile - Screen width < 768px
 * @property {boolean} isTablet - Screen width 768px - 1024px
 * @property {boolean} isDesktop - Screen width > 1024px
 * @property {string} breakpoint - Current breakpoint name
 * @property {string} current - Current breakpoint identifier (mobile|tablet|desktop)
 * @property {boolean} isSm - Screen width ≥ 640px
 * @property {boolean} isMd - Screen width ≥ 768px
 * @property {boolean} isLg - Screen width ≥ 1024px
 * @property {boolean} isXl - Screen width ≥ 1280px
 * @property {boolean} is2xl - Screen width ≥ 1536px
 */

/**
 * @typedef {Object} DeviceCapabilitiesHookReturn
 * @property {boolean} prefersReducedMotion - User prefers reduced motion
 * @property {boolean} supportsHover - Device supports hover interactions
 * @property {boolean} isHighRefreshRate - Display supports >60fps
 * @property {boolean} isLowEndDevice - Device has limited performance
 * @property {boolean} isTouchDevice - Device supports touch interactions
 * @property {string} performanceTier - Device performance level (low|medium|high)
 */

/**
 * @typedef {Object} PerformanceThrottleHookReturn
 * @property {boolean} shouldAnimate - Whether animations should be enabled
 * @property {boolean} shouldThrottle - Whether to reduce animation complexity
 * @property {number} animationScale - Scale factor for animation duration (0-1)
 * @property {boolean} shouldReduceParticles - Whether to reduce particle count
 * @property {boolean} shouldDisableBlur - Whether to disable blur effects
 */

/**
 * @typedef {Object} DebugModeHookReturn
 * @property {boolean} isDebugMode - Whether debug mode is active
 * @property {Function} toggleDebug - Function to toggle debug mode
 * @property {Object} debugInfo - Current debug information object
 * @property {ResponsiveHookReturn} responsiveInfo - Current responsive state for debugging
 */

// ==========================================
// EVENT INTERFACES
// ==========================================

/**
 * @typedef {Object} HorizontalPageChangeEvent
 * @property {string} type - Event type: 'horizontalPageChange'
 * @property {Object} detail - Event details
 * @property {number} detail.pageIndex - New page index (0-2)
 * @property {string} detail.pageName - Page name (aegis|products|services)
 * @property {boolean} detail.isMobile - Whether event occurred on mobile device
 */

/**
 * @typedef {Object} StellarPhaseUpdateEvent
 * @property {string} type - Event type: 'stellarPhaseUpdate'
 * @property {Object} detail - Event details
 * @property {string} detail.phase - Current phase name
 * @property {number} detail.progress - Progress percentage (0-1)
 */

/**
 * @typedef {Object} UpdateAccentColorEvent
 * @property {string} type - Event type: 'updateAccentColor'
 * @property {Object} detail - Event details
 * @property {string} detail.color - New accent color (hex)
 * @property {DOMRect|null} detail.cardBounds - Bounds of featured card element
 */

/**
 * @typedef {Object} StellarSequenceCompleteEvent
 * @property {string} type - Event type: 'stellarSequenceComplete'
 * @property {Object} detail - Event details
 * @property {number} detail.duration - Sequence duration in milliseconds
 */

/**
 * @typedef {Object} ResponsiveBreakpointChangeEvent
 * @property {string} type - Event type: 'responsiveBreakpointChange'
 * @property {Object} detail - Event details
 * @property {string} detail.previousBreakpoint - Previous breakpoint
 * @property {string} detail.currentBreakpoint - New breakpoint
 * @property {ResponsiveHookReturn} detail.responsiveState - Current responsive state
 */

// ==========================================
// ANIMATION CONSTANTS
// ==========================================

/**
 * @typedef {Object} AnimationDelays
 * @property {number} comet1 - First comet animation delay
 * @property {number} comet2 - Second comet animation delay  
 * @property {number} comet3 - Third comet animation delay
 * @property {number} dust1 - First dust particle delay
 * @property {number} dust2 - Second dust particle delay
 * @property {number} dust3 - Third dust particle delay
 * @property {number} dust4 - Fourth dust particle delay
 */

/**
 * @typedef {Object} StellarPhases
 * @property {string} MATERIALIZATION - 'materialization'
 * @property {string} CONSTELLATION - 'constellation'
 * @property {string} BREATHING - 'breathing'
 * @property {string} DISSOLUTION - 'dissolution'
 */

/**
 * @typedef {Object} ResponsiveAnimationConfig
 * @description Animation configurations that adapt to device capabilities
 * @property {Object} mobile - Mobile-specific animation settings
 * @property {Object} tablet - Tablet-specific animation settings  
 * @property {Object} desktop - Desktop-specific animation settings
 * @property {boolean} reduceMotionOnLowEnd - Whether to reduce animations on low-end devices
 * @property {number} mobileParticleCount - Particle count for mobile devices
 * @property {number} desktopParticleCount - Particle count for desktop devices
 */

// ==========================================
// THEME CONFIGURATIONS
// ==========================================

/**
 * @typedef {Object} ThemeConfig
 * @property {string} name - Theme identifier
 * @property {string} primaryColor - Primary hex color
 * @property {string} secondaryColor - Secondary hex color
 * @property {string} gradientFrom - Tailwind gradient start class
 * @property {string} gradientTo - Tailwind gradient end class
 * @property {string[]} particleColors - Array of particle colors
 * @property {ResponsiveLayoutPattern} [responsiveOverrides] - Theme-specific responsive overrides
 */

/**
 * Available theme configurations
 * @type {Object.<string, ThemeConfig>}
 */
export const THEME_CONFIGS = {
  lime: {
    name: 'lime',
    primaryColor: '#84cc16',
    secondaryColor: '#65a30d',
    gradientFrom: 'from-lime-900/50',
    gradientTo: 'to-lime-700/30',
    particleColors: ['#84cc16', '#65a30d', '#22d3ee']
  },
  magenta: {
    name: 'magenta',
    primaryColor: '#d946ef',
    secondaryColor: '#c026d3',
    gradientFrom: 'from-purple-900/50',
    gradientTo: 'to-pink-700/30',
    particleColors: ['#d946ef', '#c026d3', '#f59e0b']
  },
  amber: {
    name: 'amber',
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    gradientFrom: 'from-amber-900/50',
    gradientTo: 'to-orange-700/30',
    particleColors: ['#f59e0b', '#d97706', '#84cc16']
  },
  cyan: {
    name: 'cyan',
    primaryColor: '#22d3ee',
    secondaryColor: '#0891b2',
    gradientFrom: 'from-cyan-900/50',
    gradientTo: 'to-teal-700/30',
    particleColors: ['#22d3ee', '#0891b2', '#d946ef']
  }
};

// ==========================================
// RESPONSIVE DESIGN CONSTANTS
// ==========================================

/**
 * Standard responsive layout patterns used across components
 * @type {Object.<string, ResponsiveLayoutPattern>}
 */
export const RESPONSIVE_PATTERNS = {
  AEGIS_PAGE: {
    mobile: 'flex-col px-4 py-8',
    tablet: 'flex-col md:px-8',
    desktop: 'lg:flex-row lg:px-8 lg:py-16',
    spacing: 'px-4 md:px-8 py-8 lg:py-16',
    typography: 'text-3xl md:text-5xl'
  },
  PRODUCTS_PAGE: {
    mobile: 'flex-col px-4 py-8',
    tablet: 'md:px-8',
    desktop: 'lg:px-8 lg:py-16',
    spacing: 'px-4 md:px-8 py-8 lg:py-16',
    typography: 'text-2xl md:text-4xl'
  },
  TECHNICAL_CARDS: {
    mobile: 'grid-cols-1 gap-3',
    tablet: 'md:grid-cols-2 md:gap-4',
    desktop: 'lg:grid-cols-3',
    spacing: 'p-3 md:p-4',
    typography: 'text-sm md:text-base'
  },
  ARCHITECTURE_DIAGRAM: {
    mobile: 'hidden',
    tablet: 'hidden',
    desktop: 'lg:flex lg:w-1/3',
    spacing: 'p-4 md:p-8',
    typography: 'text-xs md:text-sm'
  }
};

/**
 * Touch optimization configurations
 * @type {TouchOptimization}
 */
export const TOUCH_OPTIMIZATION = {
  minTouchTarget: '44px',
  tapFeedback: { scale: 0.995 },
  hoverDisabled: false, // Handled by device detection
  tapDelay: 0
};

// ==========================================
// VALIDATION HELPERS
// ==========================================

/**
 * Validates a ProductItem object
 * @param {ProductItem} item - Item to validate
 * @returns {boolean} - Whether item is valid
 */
export const validateProductItem = (item) => {
  const required = ['id', 'title', 'summary', 'features', 'accentColor'];
  return required.every(field => item && item[field] !== undefined);
};

/**
 * Validates theme configuration
 * @param {string} themeName - Name of theme to validate
 * @returns {boolean} - Whether theme exists and is valid
 */
export const validateTheme = (themeName) => {
  return THEME_CONFIGS.hasOwnProperty(themeName);
};

/**
 * Gets theme configuration by name
 * @param {string} themeName - Theme name
 * @returns {ThemeConfig|null} - Theme config or null if not found
 */
export const getThemeConfig = (themeName) => {
  return THEME_CONFIGS[themeName] || null;
};

/**
 * Validates responsive layout pattern
 * @param {ResponsiveLayoutPattern} pattern - Pattern to validate
 * @returns {boolean} - Whether pattern is valid
 */
export const validateResponsivePattern = (pattern) => {
  const required = ['mobile', 'tablet', 'desktop'];
  return required.every(breakpoint => pattern && pattern[breakpoint] !== undefined);
};

/**
 * Gets responsive pattern by name
 * @param {string} patternName - Pattern name
 * @returns {ResponsiveLayoutPattern|null} - Pattern or null if not found
 */
export const getResponsivePattern = (patternName) => {
  return RESPONSIVE_PATTERNS[patternName] || null;
};

// ==========================================
// COMPONENT STATE INTERFACES
// ==========================================

/**
 * @typedef {Object} ProductsPageState
 * @property {number} currentPage - Currently active product index
 * @property {ProductItem|null} selectedProduct - Product selected for modal
 * @property {string} prevColor - Previous accent color (for change detection)
 * @property {ResponsiveHookReturn} responsive - Current responsive state
 */

/**
 * @typedef {Object} ServicesPageState
 * @property {string} text - Current typewriter text
 * @property {boolean} isStellarActive - Whether stellar message is active
 * @property {string} stellarPhase - Current stellar phase
 * @property {number} stellarProgress - Stellar progress (0-1)
 * @property {boolean} showFloatingWords - Whether floating words are visible
 * @property {boolean} canSkip - Whether skip is enabled
 * @property {boolean} typewriterComplete - Whether typewriter finished
 * @property {boolean} showStellarHint - Whether stellar hint is shown
 * @property {ResponsiveHookReturn} responsive - Current responsive state
 */

/**
 * @typedef {Object} AegisPageState
 * @property {string|null} expandedCard - ID of currently expanded technical card
 * @property {ResponsiveHookReturn} responsive - Current responsive state
 * @property {DeviceCapabilitiesHookReturn} deviceCapabilities - Current device capabilities
 * @property {boolean} mobileOptimized - Whether mobile optimizations are active
 */

// ==========================================
// EXPORT TYPES FOR RUNTIME CHECKING
// ==========================================

export const CONTRACT_VERSION = '1.1.0';
export const LAST_UPDATED = '2024-12-28';
export const MOBILE_OPTIMIZATION_VERSION = '1.0.0';

/**
 * Runtime type checker for development
 * @param {*} value - Value to check
 * @param {string} expectedType - Expected type name
 * @param {string} componentName - Component name for error context
 */
export const checkType = (value, expectedType, componentName = 'Unknown') => {
  if (process.env.NODE_ENV === 'development') {
    // Add runtime type checking logic here if needed
    console.log(`Type check: ${componentName} - ${expectedType}`, value);
  }
};

/**
 * Validates component mobile optimization compliance
 * @param {string} componentName - Name of component to validate
 * @param {Object} props - Component props
 * @returns {Object} - Validation result with recommendations
 */
export const validateMobileOptimization = (componentName, props = {}) => {
  const result = {
    isCompliant: true,
    warnings: [],
    recommendations: []
  };

  // Check if mobile optimization is enabled
  if (props.mobileOptimized === false) {
    result.warnings.push(`${componentName}: Mobile optimization is disabled`);
  }

  // Check for responsive layout pattern
  if (!props.layout && !RESPONSIVE_PATTERNS[componentName.toUpperCase()]) {
    result.recommendations.push(`${componentName}: Consider adding responsive layout pattern`);
  }

  // Check for touch optimization
  if (!props.touchConfig && componentName.includes('Card')) {
    result.recommendations.push(`${componentName}: Consider adding touch optimization config`);
  }

  return result;
};