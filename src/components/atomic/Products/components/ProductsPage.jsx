import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from '../../../../FramerProvider';
import { useResponsive, useDeviceCapabilities } from '../../../../hooks/useBreakpoint';
import { OPS_BENTO_ITEMS } from './imports_shared';
import { ThrottledAnimatePresence } from './ThrottledAnimatePresence';

/**
 * Enhanced Product Card Component
 * Individual product card with mission control styling
 */
const EnhancedProductCard = ({ item, isActive, isFeatured, onHover, onLeave, onClick }) => {
  // Memoize dynamic styles to prevent unnecessary recalculations
  const cardStyles = useMemo(() => ({
    background: isFeatured 
      ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
    borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.2)',
    boxShadow: isActive
      ? `0 0 30px ${item.accentColor}40, inset 0 0 20px rgba(255,255,255,0.1)`
      : 'inset 0 0 5px rgba(255,255,255,0.05)',
  }), [item.accentColor, isActive, isFeatured]);

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
      style={cardStyles}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ 
        filter: "brightness(1.1)",
        scale: 1.02
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout={false}
      data-featured-card={isFeatured ? "true" : "false"}
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: item.accentColor }}
          />
          <span className="text-xs font-mono text-white/80">
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Click indicator */}
      <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-mono text-white/80">CLICK TO EXPAND</span>
          <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>

      {/* Simplified background texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Content */}
      <div className="relative z-[10] p-6 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-3">
          {/* Icon */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `0 0 20px ${item.accentColor}60`,
                background: `radial-gradient(circle at 30% 30%, ${item.accentColor}, ${item.accentColor}90)`
              }}
            />
            <img
              src={item.illustrationSrc}
              alt={`${item.title} illustration`}
              className="w-full h-full object-cover rounded-full relative z-[10]"
              onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
            />
          </div>
          
          <div className="text-center">
            <h3
              className="text-2xl font-bold uppercase tracking-wide mb-2"
              style={{ color: item.accentColor, textShadow: `0 0 10px ${item.accentColor}60` }}
            >
              {item.title}
            </h3>
            <p className="text-base font-medium text-white/80 leading-relaxed px-2">
              {item.summary}
            </p>
          </div>
        </div>

        {/* Quick features preview */}
        <div className="space-y-2 mt-4">
          {item.features.slice(0, 2).map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-2"
            >
              <div 
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: item.accentColor }}
              />
              <span className="text-sm text-white/75 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Product Detail Modal Component
 * Detailed view of selected product
 */
const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9), ${product.accentColor}10)`,
          boxShadow: `0 0 50px ${product.accentColor}40, inset 0 0 30px rgba(255,255,255,0.1)`
        }}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="relative w-20 h-20 flex-shrink-0">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 30px ${product.accentColor}60`,
                  background: `radial-gradient(circle at 30% 30%, ${product.accentColor}, ${product.accentColor}90)`
                }}
              />
              <img
                src={product.illustrationSrc}
                alt={`${product.title} illustration`}
                className="w-full h-full object-cover rounded-full relative z-[10]"
                onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
              />
            </div>
            
            <div className="flex-1">
              <h2
                className="text-4xl font-bold uppercase tracking-wide mb-3"
                style={{ color: product.accentColor, textShadow: `0 0 15px ${product.accentColor}60` }}
              >
                {product.title}
              </h2>
              <p className="text-xl text-white/80 mb-4">
                {product.summary}
              </p>
              
              {/* What It Is - Secondary Title */}
              <h3 
                className="text-xl font-bold font-mono tracking-wider leading-relaxed uppercase"
                style={{ color: product.accentColor }}
              >
                {product.title === 'OpsPipe' && (
                  <>
                    Battle-tested document parsing<br />
                    with memory and full visibility
                  </>
                )}
                {product.title === 'Curious' && (
                  <>
                    Emotionally aware AI designed<br />
                    for reflection and companionship
                  </>
                )}
                {product.title === 'Guardian' && (
                  <>
                    Screen-based emotional companion<br />
                    designed for kids and creativity
                  </>
                )}
                {product.title === 'MoonSignal' && (
                  <>
                    GPT-fused quant stack analyzing<br />
                    price action and market data
                  </>
                )}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* How It Works */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span>How It Works</span>
              </h4>
              <div className="space-y-3">
                {product.fullDescription.howItWorks.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: product.accentColor }}
                    />
                    <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why It Matters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span>Why It Matters</span>
              </h4>
              <div 
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <p 
                  className="text-sm leading-relaxed italic"
                  style={{ color: `${product.accentColor}dd` }}
                >
                  {product.fullDescription.whyItMatters}
                </p>
              </div>
            </div>
          </div>

          {/* All Features */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: product.accentColor }}
              />
              <span>Key Features</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tagline */}
          {product.tagline && (
            <div className="mt-8 text-center">
              <p className="text-lg italic text-white/70 font-medium">
                "{product.tagline}"
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile-optimized ThoughtTrails hook
const useThoughtTrails = () => {
  const [thoughtTrails, setThoughtTrails] = useState(null);
  const { isMobile, isTablet } = useResponsive();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();
  const isActivatedRef = useRef(false);
  const initTimeoutRef = useRef(null);

  useEffect(() => {
    let trailsInstance = null;
    
    const initializeTrails = async () => {
      if (isActivatedRef.current || prefersReducedMotion) return;
      
      try {
        // Add delay for mobile devices to ensure DOM is ready
        const initDelay = isMobile ? 500 : 200;
        
        if (initTimeoutRef.current) {
          clearTimeout(initTimeoutRef.current);
        }
        
        initTimeoutRef.current = setTimeout(async () => {
          // Lazy import the ThoughtTrails
          const { default: ThoughtTrails } = await import('../../../../lib/thoughtTrails.js');
          trailsInstance = ThoughtTrails;
          
          // Initialize if not already done
          if (!trailsInstance.isInitialized && !trailsInstance.isDestroyed) {
            trailsInstance.init();
          }
          
          // Listen for the ready event
          const handleReady = () => {
            setThoughtTrails(trailsInstance);
            isActivatedRef.current = true;
            
            // Auto-activate for standalone products page
            if (window.location.pathname === '/products') {
              setTimeout(() => {
                if (trailsInstance && !trailsInstance.isDestroyed) {
                  trailsInstance.forceActivate();
                }
              }, 100);
            }
          };
          
          if (trailsInstance.isInitialized) {
            handleReady();
          } else {
            window.addEventListener('thoughtTrailsReady', handleReady, { once: true });
          }
        }, initDelay);
        
      } catch (error) {
        console.warn('Failed to load ThoughtTrails:', error);
      }
    };

    initializeTrails();

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      
      if (trailsInstance && isActivatedRef.current) {
        trailsInstance.deactivate();
        isActivatedRef.current = false;
      }
    };
  }, [isMobile, isTablet, prefersReducedMotion, performanceTier]);

  return thoughtTrails;
};

/**
 * Products Page Component (Enhanced Mission Control Version)
 * Main products showcase with grid layout and detailed modals
 */
export const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [activeSystem, setActiveSystem] = useState('opspipe');

  // Mobile responsiveness hooks
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();
  
  // Initialize ThoughtTrails with mobile optimization
  const thoughtTrails = useThoughtTrails();

  // Memoized system configs
  const systemConfigs = useMemo(() => [
    { id: 'opspipe', name: 'OpsPipe', color: '#10b981' },
    { id: 'curious', name: 'Curious', color: '#8b5cf6' },
    { id: 'guardian', name: 'Guardian', color: '#ef4444' },
    { id: 'moonsignal', name: 'MoonSignal', color: '#06b6d4' }
  ], []);

  // Get the actual product logo path
  const getProductLogo = useCallback((title) => {
    const logoMap = {
      'OpsPipe': '/assets/images/general/Page_Logos/OpsPipe_logo.webp',
      'Curious': '/assets/images/general/Page_Logos/Curious_logo.webp',
      'Guardian': '/assets/images/general/Page_Logos/Guardian_logo.webp',
      'MoonSignal': '/assets/images/general/Page_Logos/MoonSignal_logo.webp'
    };
    return logoMap[title] || '/assets/images/placeholder.png';
  }, []);

  // Get product accent color (including Guardian override)
  const getProductAccentColor = useCallback((title) => {
    if (title === 'Guardian') return '#ef4444';
    return OPS_BENTO_ITEMS.find(item => item.title === title)?.accentColor || '#ffffff';
  }, []);

  // Get product status
  const getProductStatus = useCallback((title) => {
    const statusMap = {
      'OpsPipe': 'OPERATIONAL',
      'MoonSignal': 'UNDER CONSTRUCTION',
      'Curious': 'IN DEVELOPMENT',
      'Guardian': 'IN DEVELOPMENT'
    };
    return statusMap[title] || 'UNKNOWN';
  }, []);

  // Handle product expansion
  const handleProductExpand = useCallback((productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  }, [expandedProduct]);

  // Handle product modal
  const handleProductModal = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div 
      className="relative w-screen h-screen flex overflow-hidden z-[3]" 
      data-page="products"
      style={{
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)'
      }}
    >
      {/* Enhanced Cosmic Background - Optimized */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.05) 100%)',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-15 z-[8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='50' height='50' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />

      <div
        className="absolute inset-0 z-[2]"
        style={{
            background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.06) 0%, rgba(98, 153, 16, 0.02) 40%, transparent 70%)',
            filter: 'blur(30px)',
        }}
      />

      <div
        className="absolute inset-0 z-[3]"
        style={{
            background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.04) 0%, rgba(34, 211, 238, 0.01) 35%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
      
      {/* Optimized particle effects */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full z-[2]"
          style={{ 
            width: '2px',
            height: '2px',
            backgroundColor: i % 2 === 0 ? '#84cc16' : '#22d3ee',
            top: `${20 + i * 20}%`, 
            left: `${10 + i * 25}%`,
            boxShadow: `0 0 4px currentColor`
          }}
        />
      ))}
      
      {/* ThoughtTrails Layer */}
      <div className="absolute inset-0 z-[5]" data-thought-trails-layer="true"></div>
      
      {/* Responsive Layout Container */}
      <div className="relative z-[10] w-full h-full flex flex-col lg:flex-row">
        
        {/* Left Column - Mission Control Panel */}
        <motion.div 
          className="relative flex-1 lg:w-1/3 flex flex-col justify-center px-4 md:px-8 py-8 lg:py-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
                    {/* Mission Control Badge */}
          <motion.div 
            className="flex items-center space-x-2 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
                        <motion.div 
              className="w-2 h-2 rounded-full bg-lime-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
            <span className="text-lime-400/80 text-xs md:text-sm font-mono uppercase tracking-wider">Mission Control</span>
            <span className="text-xs text-white/40 font-mono">v2.1.0</span>
          </motion.div>
                    
                    {/* Enhanced Title */}
          <motion.div 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400">
                AEGIS
              </span>
              <span className="text-white/90 block text-xl md:text-3xl mt-1">Command</span>
            </h1>
            
            <div className="inline-block border-l-2 border-cyan-400/50 pl-3 md:pl-4 py-2 mb-3 md:mb-4">
              <p className="text-base md:text-lg font-medium text-cyan-400/90">
                Your AI team, led by you
                      </p>
                    </div>

            <p className="text-sm md:text-lg text-white/70 leading-relaxed">
              Mission-based orchestration with human oversight at every decision point.
            </p>
          </motion.div>

          {/* Core Principles - Compact */}
          <motion.div 
            className="space-y-3 md:space-y-4 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white text-base md:text-lg font-semibold flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Core Principles</span>
            </h3>
            
            <div className="space-y-2 md:space-y-3">
              {[
                { 
                  text: 'Real AI agents with roles, memory, and autonomy',
                            status: 'ACTIVE',
                            metric: '12 agents'
                          },
                          { 
                            text: 'Central mission engine governing every command',
                            status: 'OPERATIONAL', 
                            metric: '99.7% uptime'
                          },
                          { 
                  text: 'Complete audit trail for every execution',
                            status: 'MONITORING',
                            metric: '1.3M events'
                          }
                        ].map((principle, index) => (
                          <div
                  key={index}
                  className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/10 hover:border-lime-400/30 transition-all duration-300"
                >
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 md:mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-white/80 leading-relaxed">{principle.text}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-mono text-lime-400">{principle.status}</span>
                        <span className="text-xs text-white/50 font-mono">{principle.metric}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
          </motion.div>

          {/* Runtime Control Demo */}
          <motion.div 
            className="bg-black/20 backdrop-blur-md rounded-xl border border-cyan-500/20 p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-cyan-500/20">
                <span className="text-lg">🎛️</span>
                  </div>
                          <div>
                <h3 className="text-lg md:text-xl font-semibold text-cyan-400">Runtime Control</h3>
                <p className="text-white/60 text-xs md:text-sm">One engine, many intelligent products</p>
              </div>
            </div>
            
            {/* Active System Selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {systemConfigs.map((system) => (
                <button
                  key={system.id}
                  onClick={() => setActiveSystem(system.id)}
                  className={`p-2 rounded text-xs font-mono transition-all duration-300 ${
                    activeSystem === system.id 
                      ? 'bg-white/20 border border-white/30' 
                      : 'bg-slate-900/40 border border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    color: activeSystem === system.id ? system.color : '#ffffff80'
                  }}
                >
                  {system.name}
                </button>
              ))}
          </div>
          
            {/* Live Status Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Active Runtime:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-lime-400 rounded-full animate-pulse" />
                  <span className="text-lime-400 font-mono">AEGIS-{activeSystem.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Memory Usage:</span>
                <span className="text-cyan-400 font-mono">
                  {activeSystem === 'opspipe' ? '2.1GB' : 
                   activeSystem === 'curious' ? '1.8GB' : 
                   activeSystem === 'guardian' ? '1.2GB' : '3.2GB'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Active Agents:</span>
                <span className="text-cyan-400 font-mono">
                  {activeSystem === 'opspipe' ? '8/12' : 
                   activeSystem === 'curious' ? '4/6' : 
                   activeSystem === 'guardian' ? '3/4' : '12/12'}
                </span>
              </div>
            </div>
            
            <motion.div 
              className="mt-4 p-2 rounded bg-slate-900/60 border border-white/10"
              key={activeSystem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-white/70 leading-relaxed">
                {activeSystem === 'opspipe' && 'Processing documents with enhanced OCR and multi-language support...'}
                {activeSystem === 'curious' && 'Emotional presence active, building synthetic memory patterns...'}
                {activeSystem === 'guardian' && 'Child-safe AI companion monitoring creative interactions...'}
                {activeSystem === 'moonsignal' && 'Analyzing market data streams with GPT-enhanced algorithms...'}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Products Grid */}
        <motion.div 
          className="relative flex-1 lg:w-2/3 flex flex-col justify-center px-4 md:px-8 py-8 lg:py-16"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Header */}
          <motion.div 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400/80 text-xs md:text-sm font-mono uppercase tracking-wider">Products Grid</span>
              <span className="text-xs text-white/40 font-mono">{OPS_BENTO_ITEMS.length} Systems</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400">
                MISSION
              </span>
              <span className="text-white/90 block text-xl md:text-3xl mt-1">Products</span>
            </h2>
            
            <p className="text-sm md:text-lg text-white/70 max-w-2xl leading-relaxed">
              Advanced operational systems designed for mission-critical environments.
            </p>
          </motion.div>

          {/* Responsive Products Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {OPS_BENTO_ITEMS.map((product, index) => {
              const accentColor = getProductAccentColor(product.title);
                  return (
                    <motion.div 
                  key={product.id}
                  className={`relative p-4 md:p-6 rounded-xl backdrop-blur-sm bg-black/30 border border-white/10 hover:border-lime-400/30 transition-all duration-300 cursor-pointer ${
                    expandedProduct === product.id ? 'ring-2 ring-lime-400/50' : ''
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -1, scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => handleProductExpand(product.id)}
                    >
                  <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                      {/* Subtle glowing background effect behind the logo */}
                      <div
                        className="absolute inset-0 rounded-lg blur-xl opacity-30"
                        style={{
                          background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)`,
                          transform: 'scale(1.5)',
                          zIndex: -1
                        }}
                      />
                      {/* Logo without container */}
                      <img
                        src={getProductLogo(product.title)}
                        alt={`${product.title} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-lg md:text-xl font-bold uppercase tracking-wide mb-1"
                        style={{ color: accentColor }}
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed">{product.summary}</p>
                          </div>
                    
                    <motion.div 
                      className="text-white/40 flex-shrink-0"
                      animate={{ rotate: expandedProduct === product.id ? 180 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      ↓
                    </motion.div>
                        </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="text-xs font-mono text-white/60">{getProductStatus(product.title)}</span>
                          </div>
                    <button 
                      className="text-xs text-white/50 hover:text-white/80 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductModal(product);
                      }}
                    >
                      <span className="hidden sm:inline">VIEW DETAILS </span>→
                    </button>
                        </div>

                  <div 
                    className="absolute top-0 left-0 w-full h-0.5"
                    style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}80)` }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {expandedProduct && (
            <motion.div 
              className="p-4 md:p-6 rounded-xl backdrop-blur-sm bg-black/40 border border-lime-400/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const product = OPS_BENTO_ITEMS.find(p => p.id === expandedProduct);
                const productRoute = `/products/${product.title.toLowerCase()}`;
                const accentColor = getProductAccentColor(product.title);
                
                return (
                  <div>
                    <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                      <div className="relative w-20 h-20 md:w-24 md:h-24">
                        {/* Enhanced but subtle glowing background for expanded view */}
                        <div 
                          className="absolute inset-0 rounded-xl blur-2xl opacity-40"
                          style={{
                            background: `radial-gradient(circle at center, ${accentColor}25, transparent 60%)`,
                            transform: 'scale(1.6)',
                            zIndex: -1
                          }}
                        />
                        {/* Logo without container */}
                        <img
                          src={getProductLogo(product.title)}
                          alt={`${product.title} logo`}
                          className="w-full h-full object-contain"
                                onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
                              />
                            </div>
                      <div className="flex-1">
                        <div className="text-xs text-lime-400 font-mono uppercase tracking-wider mb-1">MISSION PRODUCT</div>
                              <h3
                          className="text-xl md:text-2xl font-bold uppercase tracking-wide"
                          style={{ color: accentColor }}
                              >
                          {product.title}
                              </h3>
                            </div>
                          </div>

                    <div className="mb-4 md:mb-6">
                      <p className="text-sm md:text-base text-white/80 leading-relaxed mb-3 md:mb-4">{product.summary}</p>
                      {product.tagline && (
                        <p className="text-base md:text-lg italic text-cyan-400/80 font-medium">"{product.tagline}"</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start space-x-2 md:space-x-3">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 md:mt-2 flex-shrink-0"
                            style={{ backgroundColor: accentColor }}
                          />
                          <p className="text-xs md:text-sm text-white/80 leading-relaxed">{feature}</p>
                              </div>
                            ))}
                          </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="text-xs font-mono text-white/60">FULL DOCUMENTATION AVAILABLE</span>
                      </div>
                      
                      <motion.a
                        href={productRoute}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
                          border: `1px solid ${accentColor}60`,
                          color: accentColor
                        }}
                        whileHover={{ scale: 1.02, boxShadow: `0 0 15px ${accentColor}40` }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Explore {product.title}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.a>
              </div>
            </div>
                );
              })()}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ThrottledAnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </ThrottledAnimatePresence>
    </div>
  );
};