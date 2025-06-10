import React, { useState } from 'react';
import { motion } from '../../../../FramerProvider';
import { useDeviceCapabilities } from '../../../../hooks/useBreakpoint';

/**
 * AEGIS Page Component
 * The hero/intro section showcasing AEGIS runtime and system architecture
 */
export const AegisPage = () => {
  // Use unified hooks
  const { prefersReducedMotion } = useDeviceCapabilities();
  
  // Add flag to control visualization rendering
  const [showVisualization, setShowVisualization] = useState(false);
  
  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-start overflow-hidden"
      style={{
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)'
      }}
    >
      {/* Enhanced Cosmic Background with Grid */}
      <div className="absolute inset-0 z-[1]">
        {/* Base gradient - SET TO 0.4 OPACITY */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
          }}
        />
        
        {/* AEGIS Background Asset Layer */}
        <div
          className="absolute inset-0 opacity-30 z-[2]"
          style={{
            backgroundImage: 'url(/assets/images/general/Aegis_Background.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
            filter: 'brightness(0.8) contrast(1.2)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
          }}
        />
        
        {/* Dynamic noise texture - STRONGER EFFECT */}
        <div 
          className="absolute inset-0 opacity-40 z-[8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Enhanced Nebula Effect with Multiple Layers - MOVED UP */}
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
      
      {/* Enhanced Content Layout - FULL WIDTH USAGE */}
      <div className="relative z-[10] w-full h-full flex items-center">
        <div className="w-full h-full grid grid-cols-12 gap-16 px-12 lg:px-20">
          
          {/* Left Column - Main Content - EXPANDED */}
          <div className="col-span-12 lg:col-span-8 space-y-8 flex flex-col justify-center pr-8">
            
            {/* Header Section with Enhanced Typography */}
            <div className="space-y-6">
              {/* Mission Control Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-lime-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Mission Control</span>
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
              
              <h2
                className="text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
                }}
              >
                AEGIS<br />
                <span className="text-white/90 text-5xl lg:text-6xl normal-case">Runtime</span>
              </h2>
              
              <p
                className="text-2xl lg:text-3xl font-medium text-white/80 max-w-2xl leading-relaxed"
              >
                The smart core powering everything we build.
              </p>
            </div>

            {/* Mission Statement with Enhanced Styling */}
            <div className="relative max-w-3xl">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
              <h3 className="text-4xl lg:text-5xl font-semibold text-cyan-400 leading-tight">
                Adaptive. Auditable. Alive.
              </h3>
              <p className="text-xl text-white/70 mt-4 max-w-2xl leading-relaxed">
                AEGIS is the thinking engine behind CuriousLabs — a precision system built to orchestrate AI, logic, and control across all products.
              </p>
            </div>

            {/* Enhanced Architecture Cards with Status Indicators - WIDER LAYOUT */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <h4 className="text-base font-mono uppercase tracking-wider text-white/70">
                  System Architecture
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: 'Multi-Agent Architecture', 
                    desc: 'Real AI agents in parallel with roles, memory, and autonomy',
                    icon: '🤖',
                    status: 'ACTIVE',
                    metric: '12 agents',
                    uptime: '99.7%'
                  },
                  { 
                    title: 'State Machine Control', 
                    desc: 'Central mission engine governing every command',
                    icon: '⚙️',
                    status: 'OPERATIONAL',
                    metric: '2.3M ops',
                    uptime: '100%'
                  },
                  { 
                    title: 'Audit-First Protocol', 
                    desc: 'Complete logs, metrics, and traces for every execution',
                    icon: '📊',
                    status: 'MONITORING',
                    metric: '847K events',
                    uptime: '99.9%'
                  },
                  { 
                    title: 'Modular & Scalable', 
                    desc: 'Inject only what you need, scale sideways not up',
                    icon: '🔧',
                    status: 'READY',
                    metric: '8 modules',
                    uptime: '100%'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-lime-400/30 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
                      boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 20px rgba(132, 204, 22, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)`
                    }}
                  >
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-lime-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                        <span className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                          {feature.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60 font-mono">{feature.metric}</div>
                        <div className="text-xs text-lime-400 font-mono">{feature.uptime}</div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex flex-col space-y-3">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">{feature.title}</h5>
                        <p className="text-white/70 text-xs leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>

                    {/* Hover Enhancement */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, rgba(132, 204, 22, 0.1), transparent)`,
                        boxShadow: `inset 0 0 20px rgba(132, 204, 22, 0.2)`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Developer Toolkit Section - WIDER */}
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-base font-mono uppercase tracking-wider text-white/70">
                  Developer Toolkit
                </h4>
              </div>

              {/* Enhanced AEGIS SDK Section */}
              <div className="group/sdk">
                <motion.div 
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
                  style={{ 
                    borderColor: 'rgba(34, 211, 238, 0.2)',
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5))'
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div>
                        <h5 className="text-lg font-semibold text-cyan-400">
                          AEGIS SDK
                        </h5>
                        <p className="text-sm text-white/60">
                          Developer toolkit for mission-critical AI
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        STABLE
                      </div>
                      <div className="text-xs text-white/50 font-mono">
                        v1.2.0
                      </div>
                    </div>
                  </div>
                  
                  {/* Collapsible Content */}
                  <div className="overflow-hidden max-h-0 group-hover/sdk:max-h-60 transition-all duration-500 ease-in-out opacity-0 group-hover/sdk:opacity-100">
                    <div className="pt-4 space-y-4 border-t border-cyan-400/20">
                      {/* SDK Features */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Python & JavaScript libraries', status: 'STABLE', icon: '📚' },
                          { label: 'REST API with WebSocket streaming', status: 'ACTIVE', icon: '🔌' },
                          { label: 'Mission templates & blueprints', status: 'BETA', icon: '📋' }
                        ].map((feature, index) => (
                          <motion.div
                            key={`sdk-${index}`}
                            className="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-cyan-400/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: index * 0.1, duration: 0.3 }
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{feature.icon}</span>
                              <span className="text-sm text-white/80">{feature.label}</span>
                            </div>
                            <span className="text-xs text-cyan-400 font-mono">{feature.status}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Quick Code Example */}
                      <motion.div 
                        className="p-4 rounded bg-slate-900/80 border border-cyan-400/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.4, duration: 0.3 }
                        }}
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-1 h-1 rounded-full bg-cyan-400" />
                          <span className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
                            Quick Start
                          </span>
                        </div>
                        <code className="text-sm font-mono text-cyan-300/90 leading-relaxed block">
                          <span className="text-purple-400">from</span> aegis <span className="text-purple-400">import</span> Mission<br />
                          <span className="text-yellow-400">mission</span> = Mission(<span className="text-green-400">"analyze"</span>)<br />
                          <span className="text-yellow-400">result</span> = mission.execute()
                        </code>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column - AEGIS Core Visualization - POSITIONED TO RIGHT EDGE */}
          <div className="col-span-12 lg:col-span-4 flex items-center justify-end">
            {/* Architecture Diagram Header */}
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <h4 className="text-sm font-mono uppercase tracking-wider text-white/80">
                    System Architecture Flow
                  </h4>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Real-time visualization of AEGIS orchestration layers and data flow patterns
                </p>
              </div>
              
              {/* Enhanced Architecture Diagram - MUCH MORE OPAQUE BACKGROUND */}
              <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-white/20 bg-slate-900/95 overflow-hidden">
                {/* Background Grid - SUBTLE */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(132, 204, 22, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }}
                />
                
                {/* Diagram Content - COMPACT */}
                <div className="relative z-10 space-y-3">
                  
                  {/* Input Layer */}
                  <div className="text-center">
                    <motion.div 
                      className="inline-block p-2 rounded-lg border border-orange-400/40 bg-orange-400/20"
                      whileHover={{ scale: 1.05, borderColor: '#ff7f00' }}
                    >
                      <div className="text-xs font-mono text-orange-300 uppercase tracking-wider mb-1">Input Layer</div>
                      <div className="text-xs text-white/80">TelegramBot • File Upload • POS Adapter</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-px h-4 bg-gradient-to-b from-orange-400 to-cyan-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Command Center & Decision Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Command Center</div>
                      <div className="text-xs text-white/80">Registry</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-lime-400/40 bg-lime-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#84cc16' }}
                    >
                      <div className="text-xs font-mono text-lime-300 uppercase tracking-wider mb-1">Decision Engine</div>
                      <div className="text-xs text-white/80">AI Orchestration</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Recovery Manager</div>
                      <div className="text-xs text-white/80">Fault Tolerance</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrows */}
                  <div className="flex justify-center space-x-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        className="w-px h-3 bg-gradient-to-b from-cyan-400 to-lime-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Processing Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-lime-400/40 bg-lime-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#84cc16' }}
                    >
                      <div className="text-xs font-mono text-lime-300 uppercase tracking-wider mb-1">Agent Loop</div>
                      <div className="text-xs text-white/80">Multi-Agent</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">FSM + Trace</div>
                      <div className="text-xs text-white/80">State Machine</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Recovery System</div>
                      <div className="text-xs text-white/80">Fallback Logic</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-px h-3 bg-gradient-to-b from-lime-400 to-purple-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Output Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-purple-400/40 bg-purple-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                    >
                      <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">Data Exports</div>
                      <div className="text-xs text-white/80">/logs/ /docs/</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-purple-400/40 bg-purple-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                    >
                      <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">Knowledge Base</div>
                      <div className="text-xs text-white/80">/cards/ /kb/</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-orange-400/40 bg-orange-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#ff7f00' }}
                    >
                      <div className="text-xs font-mono text-orange-300 uppercase tracking-wider mb-1">Human Layer</div>
                      <div className="text-xs text-white/80">Interfaces</div>
                    </motion.div>
                  </div>

                  {/* Connection Lines - SUBTLE */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Animated connection lines */}
                    <svg className="w-full h-full" style={{ zIndex: 1 }}>
                      <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4"/>
                          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Flowing data lines */}
                      <motion.path
                        d="M 50 30 Q 120 60 200 90 Q 280 120 350 150"
                        stroke="url(#flowGradient)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2,2"
                        animate={{
                          strokeDashoffset: [0, -8],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Diagram Legend */}
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <span className="text-white/70">User</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-white/70">Code</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                        <span className="text-white/70">Agent</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="text-white/70">Data</span>
                      </div>
                    </div>
                    <div className="text-white/50 font-mono text-xs">
                      v2.1.0
                    </div>
                  </div>
                </div>
              </div>

              {/* System Metrics Panel - COMPACT */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Throughput', value: '2.3K/sec', color: 'lime' },
                  { label: 'Latency', value: '45ms', color: 'cyan' },
                  { label: 'Agents', value: '12 active', color: 'purple' },
                  { label: 'Uptime', value: '99.7%', color: 'orange' }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    className="p-2 rounded-lg backdrop-blur-sm border border-white/10 bg-slate-900/60 text-center"
                    whileHover={{ scale: 1.05 }}
                    style={{ borderColor: `var(--${metric.color}-400, rgba(255,255,255,0.1))` }}
                  >
                    <div className={`text-sm font-bold text-${metric.color}-400`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Particle System */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full z-[2]"
          style={{ 
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: i % 3 === 0 ? '#84cc16' : i % 3 === 1 ? '#22d3ee' : '#ffffff',
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
          }}
        />
      ))}

      {/* Animated Data Stream Effects - Moving from bottom to top */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px h-20 bg-gradient-to-t from-lime-400 to-transparent z-[2]"
          style={{
            bottom: `-20px`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            bottom: ['0%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};