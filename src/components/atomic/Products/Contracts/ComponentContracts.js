/**
 * COMPONENT CONTRACTS & INTERFACES
 * 
 * This file defines all interfaces, prop types, and data structures
 * used throughout the Products components ecosystem.
 * 
 * Use these contracts when editing components to ensure consistency.
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
// COMPONENT PROP INTERFACES
// ==========================================

/**
 * @typedef {Object} AegisPageProps
 * @description Props for the AEGIS hero/intro section
 * No props required - self-contained component
 */

/**
 * @typedef {Object} ProductsPageProps
 * @description Props for the main products showcase
 * No props required - manages its own state
 */

/**
 * @typedef {Object} ServicesPageProps
 * @property {Function} onScrollRelease - Callback when stellar sequence completes
 */

/**
 * @typedef {Object} EnhancedProductCardProps
 * @property {ProductItem} item - Product data object
 * @property {boolean} isActive - Whether card is currently active/focused
 * @property {boolean} isFeatured - Whether card is featured (larger/highlighted)
 * @property {Function} onHover - Mouse enter handler
 * @property {Function} onLeave - Mouse leave handler
 * @property {Function} onClick - Click handler for card expansion
 */

/**
 * @typedef {Object} ProductDetailModalProps
 * @property {ProductItem|null} product - Product to display (null = closed)
 * @property {Function} onClose - Handler to close modal
 */

/**
 * @typedef {Object} ThrottledAnimatePresenceProps
 * @property {React.ReactNode} children - Child components to animate
 * @property {...Object} props - Additional AnimatePresence props
 */

/**
 * @typedef {Object} ServicesCosmicEnvironmentProps
 * @description Background cosmic environment component
 * No props required - self-contained visual component
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
 */

/**
 * @typedef {Object} IntegratedTypographyProps
 * @property {boolean} isStellarActive - Whether stellar message is active
 * @property {string} stellarPhase - Current stellar sequence phase
 * @property {boolean} showFloatingWords - Whether to display floating context words
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
 */

/**
 * @typedef {Object} DeviceCapabilitiesHookReturn
 * @property {boolean} prefersReducedMotion - User prefers reduced motion
 * @property {boolean} supportsHover - Device supports hover interactions
 * @property {boolean} isHighRefreshRate - Display supports >60fps
 * @property {boolean} isLowEndDevice - Device has limited performance
 */

/**
 * @typedef {Object} PerformanceThrottleHookReturn
 * @property {boolean} shouldAnimate - Whether animations should be enabled
 * @property {boolean} shouldThrottle - Whether to reduce animation complexity
 * @property {number} animationScale - Scale factor for animation duration (0-1)
 */

/**
 * @typedef {Object} DebugModeHookReturn
 * @property {boolean} isDebugMode - Whether debug mode is active
 * @property {Function} toggleDebug - Function to toggle debug mode
 * @property {Object} debugInfo - Current debug information object
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

// ==========================================
// COMPONENT STATE INTERFACES
// ==========================================

/**
 * @typedef {Object} ProductsPageState
 * @property {number} currentPage - Currently active product index
 * @property {ProductItem|null} selectedProduct - Product selected for modal
 * @property {string} prevColor - Previous accent color (for change detection)
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
 */

// ==========================================
// EXPORT TYPES FOR RUNTIME CHECKING
// ==========================================

export const CONTRACT_VERSION = '1.0.0';
export const LAST_UPDATED = '2024-12-28';

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