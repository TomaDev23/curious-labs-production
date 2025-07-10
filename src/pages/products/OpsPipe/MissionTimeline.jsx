import React from 'react';
import { motion } from '../../../FramerProvider';

// Optimized Motion Component (imported from parent)
const OptimizedMotion = ({ children, className, ...motionProps }) => {
  return (
    <motion.div
      className={className}
      {...motionProps}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)', // Force GPU acceleration
        ...motionProps.style
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Mission Timeline Component
 * Interactive timeline showing OpsPipe architecture flow
 * Based on the actual system components from the Mermaid diagram
 */
const MissionTimeline = ({ animationSettings }) => {
  // Timeline data based on actual OpsPipe architecture flow
  const timelineData = [
    {
      phase: "01",
      title: "Input Ingestion",
      subtitle: "Multi-Channel Data Collection",
      description: "OpsPipe receives data from multiple sources: Telegram Bot, File Uploads, POS Adapters, and API Gateway. All inputs are normalized and queued for processing.",
      icon: "📥",
      status: "INGESTING",
      color: "green",
      side: "left",
      components: ["🤖 Telegram Bot", "📁 File Upload", "🏪 POS Adapter", "⚡ API Gateway"],
      systemLayer: "Input Sources"
    },
    {
      phase: "02", 
      title: "State Coordination",
      subtitle: "OpsPipe OS & State Machine",
      description: "The AI Engine and State Machine Coordinator process incoming data, managing workflow states and routing decisions across the entire system.",
      icon: "🏗️",
      status: "COORDINATING",
      color: "blue",
      side: "right",
      components: ["🧠 OpsPipe OS", "⚙️ State Machine", "🎯 AI Engine"],
      systemLayer: "OpsPipe Core"
    },
    {
      phase: "03",
      title: "AI Processing Hub",
      subtitle: "Intelligent Decision Making",
      description: "Command Center Registry, Decision Engine, and Recovery Manager analyze data patterns, make routing decisions, and prepare fallback strategies.",
      icon: "🧠",
      status: "PROCESSING",
      color: "cyan",
      side: "left",
      components: ["📋 Command Center", "🎯 Decision Engine", "🛡️ Recovery Manager"],
      systemLayer: "AI Processing Hub"
    },
    {
      phase: "04",
      title: "Execution Pipeline",
      subtitle: "Workflow Execution & Memory",
      description: "Agent Loop Controller manages task execution, Tokenizer parses data, FSM maintains trace memory, and State Store provides context for all operations.",
      icon: "⚙️",
      status: "EXECUTING",
      color: "purple",
      side: "right",
      components: ["🔄 Agent Loop", "🔤 Tokenizer", "💾 FSM + Trace", "🗃️ State Store"],
      systemLayer: "Execution Pipeline"
    },
    {
      phase: "05",
      title: "Validation & Quality",
      subtitle: "Output Validation Gateway",
      description: "All processed data passes through the Validator Gate, ensuring quality, compliance, and consistency before reaching output systems.",
      icon: "✅",
      status: "VALIDATING",
      color: "green",
      side: "left",
      components: ["🚪 Validator Gate", "🔍 Quality Check", "📊 Compliance Scan"],
      systemLayer: "Validation Layer"
    },
    {
      phase: "06",
      title: "Output Distribution",
      subtitle: "Multi-Channel Delivery",
      description: "Validated results are distributed across all output channels: Knowledge Base, Data Exports, OpsCockpit Dashboard, Web Admin, Mobile App, and StaffBot.",
      icon: "📤",
      status: "DISTRIBUTING",
      color: "red",
      side: "right",
      components: ["📚 Knowledge Base", "📊 OpsCockpit", "🖥️ Web Admin", "📱 OpsField Mobile", "💬 StaffBot"],
      systemLayer: "Output Systems"
    }
  ];

  return (
    <section id="scenarios" className="py-16 relative overflow-hidden">
      {/* DEBUG: New MissionTimeline Component */}
      <div className="max-w-7xl mx-auto px-4">
        <OptimizedMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
            <span className="text-blue-400 font-mono text-sm tracking-wider text-glow-subtle">SYSTEM ARCHITECTURE</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          
          <h2 className="section-subtitle gradient-text-technical text-glow-cyan mb-4">
            OpsPipe <span className="gradient-text-premium text-glow-blue">Architecture Flow</span>
          </h2>
          <p className="body-large text-white/80 max-w-3xl mx-auto text-shadow-technical">
            Follow the data journey through OpsPipe's <span className="gradient-text-operational text-glow-lime">enterprise architecture</span>—from multi-channel input ingestion to validated output distribution across all systems.
          </p>
        </OptimizedMotion>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-400/30 via-blue-400/50 via-cyan-400/50 via-purple-400/50 via-emerald-400/50 to-red-400/30 rounded-full"></div>
          
          {/* Timeline Nodes */}
          <div className="space-y-6 md:space-y-16">
            {timelineData.map((item, index) => (
              <OptimizedMotion
                key={item.phase}
                initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${item.side === 'left' ? 'md:justify-start' : 'md:justify-end'} justify-center`}
              >
                {/* Timeline Node - Desktop only */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <OptimizedMotion
                    className={`w-14 h-14 rounded-full border-2 border-${item.color}-400/50 bg-black/80 flex items-center justify-center shadow-lg shadow-${item.color}-400/20`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      boxShadow: [
                        `0 0 15px rgba(${
                          item.color === 'green' ? '34,197,94' : 
                          item.color === 'blue' ? '59,130,246' : 
                          item.color === 'cyan' ? '34,211,238' : 
                          item.color === 'purple' ? '139,92,246' : 
                          item.color === 'emerald' ? '16,185,129' : 
                          '239,68,68'
                        }, 0.3)`,
                        `0 0 25px rgba(${
                          item.color === 'green' ? '34,197,94' : 
                          item.color === 'blue' ? '59,130,246' : 
                          item.color === 'cyan' ? '34,211,238' : 
                          item.color === 'purple' ? '139,92,246' : 
                          item.color === 'emerald' ? '16,185,129' : 
                          '239,68,68'
                        }, 0.1)`,
                        `0 0 15px rgba(${
                          item.color === 'green' ? '34,197,94' : 
                          item.color === 'blue' ? '59,130,246' : 
                          item.color === 'cyan' ? '34,211,238' : 
                          item.color === 'purple' ? '139,92,246' : 
                          item.color === 'emerald' ? '16,185,129' : 
                          '239,68,68'
                        }, 0.3)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </OptimizedMotion>
                </div>

                {/* Content Card */}
                <OptimizedMotion
                  className={`w-full max-w-sm md:max-w-lg ${item.side === 'left' ? 'md:mr-auto md:pr-20' : 'md:ml-auto md:pl-20'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-400/10 to-${item.color}-400/5 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                    <div className={`relative backdrop-blur-2xl bg-black/40 border border-${item.color}-400/20 rounded-lg p-5 md:p-6 shadow-2xl shadow-black/60 group-hover:border-${item.color}-400/40 transition-all duration-300`}>
                      {/* Mobile Icon + Phase */}
                      <div className="flex items-center md:hidden mb-3">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <div className={`font-mono-enhanced text-mono-caption text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30`}>
                          PHASE {item.phase}
                        </div>
                      </div>

                      {/* Desktop Phase Number & System Layer */}
                      <div className="hidden md:flex items-center justify-between mb-3">
                        <div className={`font-mono-enhanced text-mono-caption text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30`}>
                          PHASE {item.phase}
                        </div>
                        <div className={`font-mono-enhanced text-xs text-${item.color}-300 bg-black/20 px-2 py-1 rounded border border-${item.color}-400/20`}>
                          {item.systemLayer}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`font-space-enhanced text-xl md:text-2xl text-${item.color}-400 text-glow-${item.color} mb-1 group-hover:text-${item.color}-300 transition-colors duration-300`}>
                        {item.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <div className={`font-mono-enhanced text-sm md:text-base text-${item.color}-300 mb-3`}>
                        {item.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-body-enhanced text-white/80 text-sm md:text-base leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* System Components */}
                      <div className="mb-4">
                        <div className="text-xs text-white/60 mb-2 font-mono-enhanced">ACTIVE COMPONENTS:</div>
                        <div className="flex flex-wrap gap-2">
                          {item.components.map((component, idx) => (
                            <div key={idx} className={`text-xs bg-${item.color}-400/10 text-${item.color}-300 px-2 py-1 rounded border border-${item.color}-400/20`}>
                              {component}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                          <OptimizedMotion
                            className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-300`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(parseInt(item.phase) / 6) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: index * 0.1 }}
                          />
                        </div>
                        <span className={`font-mono-enhanced text-xs text-${item.color}-400`}>
                          {Math.round((parseInt(item.phase) / 6) * 100)}%
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`font-mono-enhanced text-xs text-${item.color}-400 text-glow-${item.color} bg-black/30 px-3 py-1 rounded-full border border-${item.color}-400/30`}>
                          {item.status}
                        </div>
                        <div className="text-xs text-white/40 font-mono-enhanced">
                          {item.phase}/06
                        </div>
                      </div>
                    </div>
                  </div>
                </OptimizedMotion>
              </OptimizedMotion>
            ))}
          </div>

          {/* Background particles - Performance optimized */}
          <div className="absolute inset-0 -z-10">
            {[...Array(animationSettings.particleCount)].map((_, i) => (
              <OptimizedMotion
                key={i}
                className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  willChange: animationSettings.enableGpuAcceleration ? 'transform' : 'auto'
                }}
                animate={animationSettings.enableHeavyAnimations ? {
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{
                  duration: animationSettings.reducedMotion ? 0 : 4 + Math.random() * 2,
                  repeat: animationSettings.reducedMotion ? 0 : Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Data streams - Performance optimized */}
            {[...Array(animationSettings.dataStreamCount)].map((_, i) => (
              <OptimizedMotion
                key={`stream-${i}`}
                className="absolute w-px h-16 bg-gradient-to-b from-cyan-400/40 to-transparent"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${Math.random() * 80}%`,
                  willChange: animationSettings.enableGpuAcceleration ? 'transform' : 'auto'
                }}
                animate={animationSettings.enableHeavyAnimations ? {
                  y: [0, -100],
                  opacity: [0, 1, 0]
                } : {}}
                transition={{
                  duration: animationSettings.reducedMotion ? 0 : 3,
                  repeat: animationSettings.reducedMotion ? 0 : Infinity,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
              />
            ))}

            {/* Energy beams - Only on high performance */}
            {animationSettings.enableHeavyAnimations && [...Array(animationSettings.energyBeamCount)].map((_, i) => (
              <OptimizedMotion
                key={`beam-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"
                style={{
                  left: '10%',
                  right: '10%',
                  top: `${30 + Math.random() * 40}%`,
                  willChange: 'transform'
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionTimeline; 