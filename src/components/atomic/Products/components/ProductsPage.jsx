import React, { useState, useEffect, useRef, useMemo } from 'react';
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

/**
 * Products Page Component (Enhanced Mission Control Version)
 * Main products showcase with grid layout and detailed modals
 */
export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevColorRef = useRef(null);

  // Dispatch events to native ThoughtTrails system
  useEffect(() => {
    const activeProduct = OPS_BENTO_ITEMS[currentPage];
    
    // Only dispatch if color has actually changed
    if (prevColorRef.current === activeProduct.accentColor) {
      return;
    }
    
    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      // Find the featured card element and get its bounds
      const featuredCard = document.querySelector('[data-featured-card="true"]');
      const cardBounds = featuredCard ? featuredCard.getBoundingClientRect() : null;
      
      console.log('🌟 Dispatching color update:', activeProduct.accentColor);
      
      // Dispatch event to native JS system
      window.dispatchEvent(new CustomEvent('updateAccentColor', {
        detail: {
          color: activeProduct.accentColor,
          cardBounds: cardBounds
        }
      }));
      
      // Update the ref to track this color
      prevColorRef.current = activeProduct.accentColor;
    }, 50); // Small delay to ensure DOM update
    
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden z-[3]" 
      data-page="products"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)'
      }}
    >
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 z-[1]">
        {/* Base gradient */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
          }}
        />
        
        {/* Dynamic noise texture */}
        <div 
          className="absolute inset-0 opacity-40 z-[8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Enhanced Nebula Effects */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* ThoughtTrails Layer */}
      <div className="absolute inset-0 z-[5]" data-thought-trails-layer="true"></div>
      
      {/* Enhanced Content Layout - Two Column like AEGIS */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-8 lg:px-16 h-full flex items-center">
        <div className="grid grid-cols-12 gap-12 w-full">
          
          {/* Left Column - Product Info Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="h-full relative">
              {/* Main AEGIS command card */}
              <div 
                className="backdrop-blur-xl bg-slate-900/80 rounded-2xl border border-white/25 p-7 h-full relative overflow-hidden"
                style={{
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.8))'
                }}
              >
                <div className="relative z-[10] h-full flex flex-col">
                  {/* Enhanced AEGIS Header */}
                  <div className="space-y-5 mb-7">
                    {/* Mission Control Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-lime-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-mono uppercase tracking-wider text-white/60">
                          MISSION CONTROL
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                          OPERATIONAL
                        </div>
                        <div className="text-xs text-white/50 font-mono">
                          v2.1.0
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Title */}
                    <div className="space-y-3">
                      <h3
                        className="text-3xl font-bold leading-tight"
                        style={{ 
                          background: 'linear-gradient(135deg, #84cc16 0%, #22d3ee 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        AEGIS<br />Command
                      </h3>
                      
                      <div className="relative">
                        <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
                        <p className="text-white/80 text-sm leading-relaxed font-medium pl-4">
                          Your AI team, led by you. Mission-based orchestration with human oversight at every decision point.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Mission Statement */}
                  <div className="space-y-5 flex-1 overflow-y-auto">
                    {/* Core Philosophy Card */}
                    <div className="p-4 rounded-xl backdrop-blur-sm border border-lime-400/25 bg-lime-400/8">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-lime-400" />
                        <h4 className="font-semibold text-base text-lime-400">
                          Adaptive. Auditable. Alive.
                        </h4>
                      </div>
                      <p className="text-white/80 text-xs leading-relaxed">
                        The thinking engine behind CuriousLabs — orchestrating AI, logic, and control across all products.
                      </p>
                    </div>

                    {/* Core Principles Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <h5 className="text-xs font-mono uppercase tracking-wider text-white/70">
                          CORE PRINCIPLES
                        </h5>
                      </div>

                      <div className="space-y-2">
                        {[
                          { 
                            text: 'Real AI agents in parallel with roles, memory, and autonomy',
                            status: 'ACTIVE',
                            metric: '12 agents'
                          },
                          { 
                            text: 'Central mission engine governing every command',
                            status: 'OPERATIONAL', 
                            metric: '99.7% uptime'
                          },
                          { 
                            text: 'Complete logs, metrics, and traces for every execution',
                            status: 'MONITORING',
                            metric: '2.3M events'
                          }
                        ].map((principle, index) => (
                          <div
                            key={`principle-${index}`}
                            className="group p-3 rounded-lg bg-slate-800/40 border border-white/15 hover:border-lime-400/35 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-lime-400" />
                                <span className="text-white/80 text-xs leading-relaxed">{principle.text}</span>
                              </div>
                              <div className="text-right ml-2 flex-shrink-0">
                                <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                                  {principle.status}
                                </div>
                                <div className="text-xs text-white/50 font-mono">
                                  {principle.metric}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced AEGIS SDK Section */}
                    <div className="group/aegis-sdk">
                      <div 
                        className="p-3 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400/35 hover:bg-white/12"
                        style={{ borderColor: 'rgba(34, 211, 238, 0.25)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-cyan-400 truncate">
                                AEGIS SDK
                              </h4>
                              <p className="text-xs text-white/60 truncate">
                                Developer toolkit for mission-critical AI
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="mt-5 pt-5 border-t border-white/15">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-lime-400/35">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-lime-400"
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div>
                            <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">System Status</div>
                            <div className="text-white/80 text-xs">All agents operational</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-lime-400 font-mono font-bold">ACTIVE</div>
                          <div className="text-xs text-white/50 font-mono">24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Grid */}
          <div className="col-span-12 lg:col-span-8 relative">
            {/* Header Section */}
            <div className="space-y-6 mb-10">
              {/* Mission Control Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-lime-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Products Grid</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                    ACTIVE
                  </div>
                  <div className="text-xs text-white/50 font-mono">
                    {OPS_BENTO_ITEMS.length} Systems
                  </div>
                </div>
              </div>
              
              <h2
                className="text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
                }}
              >
                MISSION<br />
                <span className="text-white/90 text-4xl lg:text-5xl normal-case">Products</span>
              </h2>
              
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                Advanced operational systems designed for mission-critical environments.
              </p>
            </div>

            {/* Product Grid - Moderately Larger and Better Spaced */}
            <div className="h-[550px]">
              <div className="grid grid-cols-2 grid-rows-2 gap-8 h-full">
                {OPS_BENTO_ITEMS.map((item, index) => {
                  const isActive = index === currentPage;
                  const isFeatured = index === currentPage;
                  
                  return (
                    <motion.div 
                      key={item.id}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
                        style={{
                          background: isFeatured 
                            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
                            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
                          borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.25)',
                          boxShadow: isActive
                            ? `0 0 30px ${item.accentColor}40, inset 0 0 20px rgba(255,255,255,0.1)`
                            : 'inset 0 0 5px rgba(255,255,255,0.05)',
                        }}
                        onMouseEnter={() => setCurrentPage(index)}
                        onMouseLeave={() => {}}
                        onClick={() => setSelectedProduct(item)}
                      >
                        {/* Status Indicator */}
                        <div className="absolute top-6 right-6 z-20">
                          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <div 
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ backgroundColor: item.accentColor }}
                            />
                            <span className="text-sm font-mono text-white/80">
                              {isActive ? 'ACTIVE' : 'STANDBY'}
                            </span>
                          </div>
                        </div>

                        {/* Click indicator */}
                        <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <span className="text-sm font-mono text-white/80">CLICK TO EXPAND</span>
                            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>
                        </div>

                        {/* Background texture */}
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                            mixBlendMode: 'overlay',
                          }}
                        />
                        
                        {/* Content */}
                        <div className="relative z-[10] p-8 h-full flex flex-col justify-between">
                          {/* Header */}
                          <div className="space-y-4">
                            {/* Icon */}
                            <div className="relative w-20 h-20 mx-auto mb-6">
                              <div 
                                className="absolute inset-0 rounded-full"
                                style={{
                                  boxShadow: `0 0 25px ${item.accentColor}60`,
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
                                className="text-3xl font-bold uppercase tracking-wide mb-3"
                                style={{ color: item.accentColor, textShadow: `0 0 15px ${item.accentColor}60` }}
                              >
                                {item.title}
                              </h3>
                              <p className="text-base font-medium text-white/80 leading-relaxed px-2">
                                {item.summary}
                              </p>
                            </div>
                          </div>

                          {/* Quick features preview */}
                          <div className="space-y-3 mt-6">
                            {item.features.slice(0, 2).map((feature, featureIndex) => (
                              <div 
                                key={featureIndex} 
                                className="flex items-start space-x-3"
                              >
                                <div 
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: item.accentColor }}
                                />
                                <span className="text-sm text-white/75 leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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