import React, { useState } from 'react';
import { motion } from '../../../../FramerProvider';

/**
 * AEGIS Page Component - First page in horizontal scroll sequence
 * Compact, modern design optimized for horizontal flow and mobile
 */
export const AegisPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Animation variants for compact design
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Technical sections with full content
  const technicalSections = [
    {
      id: "state-machine",
      title: "State Machine",
      subtitle: "Orchestration",
      icon: "⚙️",
      color: "from-orange-400 to-amber-500",
      category: "CONTROL PLANE ARCHITECTURE",
      fullTitle: "STATE MACHINE ORCHESTRATION",
      details: [
        "Enum-based state transitions with guardrails - No invalid state changes possible",
        "Recovery hooks trigger automatically on state failures",
        "Trace provenance - Every state change logged with full context",
        "Rollback capability - Can replay any execution from any checkpoint"
      ]
    },
    {
      id: "multi-agent",
      title: "Multi-Agent",
      subtitle: "Fallback Chain",
      icon: "🤖",
      color: "from-lime-400 to-green-500",
      category: "CONTROL PLANE ARCHITECTURE",
      fullTitle: "MULTI-AGENT FALLBACK CHAIN",
      details: [
        "Agent 1 → Agent 2 → Backup Agent cascading logic",
        "Weighted scoring system - Each agent ranked by success rate per task type",
        "Circuit breaker patterns - Failed agents temporarily removed from rotation",
        "Real-time agent health monitoring with automatic re-enablement"
      ]
    },
    {
      id: "processing-engine",
      title: "Processing Engine",
      subtitle: "Documents & Languages",
      icon: "🔄",
      color: "from-blue-400 to-purple-500",
      category: "CONTROL PLANE ARCHITECTURE",
      fullTitle: "DOCUMENT & MULTILANGUAGE PROCESSING ENGINE",
      details: [
        "OCR processing with enhancement layers for low-quality inputs",
        "Multi-format support - PDF, images, scanned documents, handwritten text",
        "Unicode normalization across 40+ languages with character set detection",
        "Language-specific parsing rules for date formats, currency, addresses",
        "Structured data extraction with validation against expected schemas",
        "Transliteration engine for non-Latin scripts to ASCII fallbacks",
        "Error correction algorithms for corrupted or partial document recovery"
      ]
    },
    {
      id: "telemetry",
      title: "Telemetry",
      subtitle: "L.E.G.I.T. Compliance",
      icon: "📊",
      color: "from-yellow-400 to-amber-500",
      category: "CONTROL PLANE ARCHITECTURE",
      fullTitle: "TELEMETRY & OBSERVABILITY ENGINE",
      details: [
        "L.E.G.I.T. compliance - Every operation produces audit trail",
        "Memory tracking across agent interactions",
        "Performance metrics - Latency, success rate, cost per operation",
        "Failure classification - Automatic categorization of error types for ML improvement"
      ]
    },
    {
      id: "fault-tolerance",
      title: "Fault Tolerance",
      subtitle: "Recovery Systems",
      icon: "🛡️",
      color: "from-emerald-400 to-green-500",
      category: "RELIABILITY GUARANTEES",
      fullTitle: "FAULT TOLERANCE",
      details: [
        "85-98% test coverage across critical paths",
        "Replay sandbox - Can reproduce any failure scenario",
        "Brand isolation - Multi-tenant with complete data separation",
        "Override protocols - Manual intervention capabilities with full audit"
      ]
    },
    {
      id: "operational-control",
      title: "Operational Control",
      subtitle: "CLI & Diagnostics",
      icon: "🎛️",
      color: "from-sky-400 to-blue-500",
      category: "RELIABILITY GUARANTEES",
      fullTitle: "OPERATIONAL CONTROL",
      details: [
        "CLI-driven operations - Full system controllable via command line",
        "Diagnostic runners - Built-in system health checks",
        "Trace validation - Automatic verification of execution chains",
        "Recovery registry - Pre-defined strategies for known failure patterns"
      ]
    }
  ];
  
  return (
    <div 
      className="relative w-screen h-screen flex overflow-hidden z-[3]" 
      data-page="aegis"
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
        
        {/* AEGIS Background Asset Layer */}
        <div
          className="absolute inset-0 opacity-20 z-[2]"
          style={{
            backgroundImage: 'url(/assets/images/general/Aegis_Background.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
            filter: 'brightness(0.6) contrast(1.1)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
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
        
        {/* Left Column - Main Content */}
        <motion.div 
          className="relative flex-1 lg:w-2/3 flex flex-col justify-center px-4 md:px-8 py-8 lg:py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Status Badge */}
          <motion.div 
            className="flex items-center space-x-2 mb-4 md:mb-6"
            variants={itemVariants}
          >
                  <motion.div 
              className="w-2 h-2 rounded-full bg-lime-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
            <span className="text-lime-400/80 text-xs md:text-sm font-mono uppercase tracking-wider">System Operational</span>
            <span className="text-xs text-white/40 font-mono">v2.1.0</span>
          </motion.div>
          
          {/* Enhanced Title */}
          <motion.div 
            className="mb-6 md:mb-8" 
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400">
                AEGIS
              </span>
              <span className="text-white/90 block text-xl md:text-3xl mt-1">Runtime</span>
            </h1>
            
            <div className="inline-block border-l-2 border-cyan-400/50 pl-3 md:pl-4 py-2 mb-3 md:mb-4">
              <p className="text-base md:text-lg font-medium text-cyan-400/90">
                Automated Enforcement for Guaranteed Interface Stability
              </p>
            </div>

            <p className="text-sm md:text-lg text-white/70 leading-relaxed">
              The thinking engine behind CuriousLabs — orchestrating AI, logic, and control.
            </p>
          </motion.div>
          
          {/* Expandable Technical Cards Grid - Responsive */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6"
            variants={itemVariants}
          >
            {technicalSections.map((section, index) => (
              <motion.div
                key={section.id}
                className={`relative p-3 md:p-4 rounded-lg backdrop-blur-sm bg-black/30 border border-white/10 hover:border-lime-400/30 transition-all duration-300 cursor-pointer ${
                  expandedCard === section.id ? 'ring-2 ring-lime-400/50' : ''
                }`}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -1, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                onClick={() => setExpandedCard(expandedCard === section.id ? null : section.id)}
              >
                <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                  <div className="text-lg md:text-xl">{section.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-white">{section.title}</h3>
                    <p className="text-xs text-white/60">{section.subtitle}</p>
              </div>
                  <motion.div
                    className="text-white/40 flex-shrink-0"
                    animate={{ rotate: expandedCard === section.id ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    ↓
                  </motion.div>
                </div>
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${section.color}`} />
                  </motion.div>
                ))}
          </motion.div>

          {/* Expanded Card Details */}
          {expandedCard && (
                <motion.div 
              className="mb-4 md:mb-6 p-4 md:p-6 rounded-xl backdrop-blur-sm bg-black/40 border border-lime-400/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const section = technicalSections.find(s => s.id === expandedCard);
                return (
                  <div>
                    <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                      <div className="text-xl md:text-2xl">{section.icon}</div>
                      <div>
                        <div className="text-xs text-lime-400 font-mono uppercase tracking-wider mb-1">
                          {section.category}
                      </div>
                        <h3 className="text-lg md:text-xl font-bold text-white">{section.fullTitle}</h3>
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      {section.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-2 md:space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 md:mt-2 flex-shrink-0" />
                          <p className="text-xs md:text-sm text-white/80 leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
                </motion.div>
          )}
          
          {/* SDK CTA - Responsive */}
          <motion.div 
            className="bg-black/20 backdrop-blur-md rounded-xl border border-lime-500/20 p-4 md:p-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-cyan-500/20">
                <span className="text-lg">🧰</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-cyan-400">AEGIS SDK</h3>
                <p className="text-white/60 text-xs md:text-sm">Developer toolkit for mission-critical AI</p>
            </div>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-4">
              {[
                "Python & Node.js",
                "CLI Integration", 
                "Streaming API"
              ].map((feature, i) => (
                <div key={i} className="text-center p-2 rounded bg-slate-900/40 border border-white/10">
                  <p className="text-xs text-white/80">{feature}</p>
                </div>
              ))}
            </div>
            
            <motion.button 
              className="w-full py-2 md:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white text-sm md:text-base font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Documentation →
            </motion.button>
          </motion.div>
          
          {/* Navigation Hint - Mobile Responsive */}
          <motion.div 
            className="mt-4 md:mt-6 flex items-center space-x-2 text-white/40"
            variants={itemVariants}
          >
            <span className="text-xs font-mono">Page 1 of 3</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-lime-400" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/20" />
            </div>
            <span className="text-xs">→</span>
          </motion.div>
        </motion.div>

        {/* Right Column - Architecture Diagram - Hidden on mobile, responsive on larger screens */}
        <motion.div 
          className="relative hidden lg:flex lg:w-1/3 items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="w-full max-w-md h-full flex flex-col justify-center">
            {/* Diagram Header */}
            <motion.div className="mb-4 md:mb-6" variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-xs md:text-sm font-mono uppercase tracking-wider text-white/80">
                  System Architecture
                </h4>
              </div>
              <p className="text-xs text-white/60">
                Real-time AEGIS orchestration flow
              </p>
            </motion.div>
            
            {/* Architecture Diagram Container - Responsive */}
            <motion.div 
              className="relative rounded-2xl backdrop-blur-sm border border-white/20 bg-slate-900/80 p-4 md:p-6 overflow-hidden"
              variants={itemVariants}
            >
              {/* Background Grid */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(132, 204, 22, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
                    `,
                  backgroundSize: '20px 20px'
                  }}
                />
                
              {/* System Architecture Visualization */}
              <div className="relative z-10 space-y-4 md:space-y-6">
                  {/* Input Layer */}
                  <div className="text-center">
                    <motion.div 
                    className="inline-block p-2 md:p-3 rounded-lg border border-orange-400/40 bg-orange-400/20"
                    whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-xs font-mono text-orange-300 uppercase tracking-wider mb-1">Input Layer</div>
                    <div className="text-xs text-white/80">TelegramBot • File Upload • POS</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center">
                    <motion.div 
                    className="w-px h-4 md:h-6 bg-gradient-to-b from-orange-400 to-cyan-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                {/* AEGIS Core */}
                <div className="text-center">
                    <motion.div 
                    className="inline-block p-3 md:p-4 rounded-xl border border-lime-400/40 bg-lime-400/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-xl md:text-2xl mb-2">⚡</div>
                    <div className="text-xs md:text-sm font-mono text-lime-300 uppercase tracking-wider mb-1">AEGIS Core</div>
                    <div className="text-xs text-white/80">State Machine + Multi-Agent</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrows */}
                <div className="flex justify-center space-x-4 md:space-x-8">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                      className="w-px h-3 md:h-4 bg-gradient-to-b from-lime-400 to-cyan-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Processing Layer */}
                <div className="grid grid-cols-3 gap-1 md:gap-2">
                  {[
                    { label: "Telemetry", color: "yellow" },
                    { label: "Recovery", color: "cyan" },
                    { label: "Control", color: "blue" }
                  ].map((component, i) => (
                    <motion.div 
                      key={i}
                      className={`p-1.5 md:p-2 rounded-lg border border-${component.color}-400/40 bg-${component.color}-400/20 text-center`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-xs font-mono text-${component.color}-300 uppercase tracking-wider`}>
                        {component.label}
                      </div>
                    </motion.div>
                  ))}
                  </div>

                {/* Output Flow */}
                  <div className="flex justify-center">
                    <motion.div 
                    className="w-px h-3 md:h-4 bg-gradient-to-b from-cyan-400 to-purple-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Output Layer */}
                <div className="text-center">
                    <motion.div 
                    className="inline-block p-2 md:p-3 rounded-lg border border-purple-400/40 bg-purple-400/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">Output Layer</div>
                    <div className="text-xs text-white/80">Data • Knowledge • Interfaces</div>
                    </motion.div>
                </div>
              </div>

              {/* System Metrics - Responsive */}
              <div className="mt-4 md:mt-6 pt-4 border-t border-white/20">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { label: 'Agents', value: '12', color: 'lime' },
                    { label: 'Uptime', value: '99.7%', color: 'cyan' },
                    { label: 'Ops/sec', value: '2.3K', color: 'yellow' },
                    { label: 'Latency', value: '45ms', color: 'blue' }
                ].map((metric, index) => (
                    <div
                    key={index}
                      className="text-center p-1.5 md:p-2 rounded bg-slate-900/60 border border-white/10"
                  >
                      <div className={`text-xs md:text-sm font-bold text-${metric.color}-400`}>
                      {metric.value}
                    </div>
                      <div className="text-xs text-white/60 uppercase">
                      {metric.label}
                      </div>
                    </div>
                ))}
              </div>
            </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};