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
 * Interactive timeline showing OpsPipe workflow phases
 * with performance-optimized animations and particles
 */
const MissionTimeline = ({ animationSettings }) => {
  const timelineData = [
    {
      phase: "01",
      title: "Chaos Detection",
      subtitle: "System Analysis",
      description: "OpsPipe scans your infrastructure, identifying bottlenecks and inefficiencies across all systems.",
      icon: "🔍",
      status: "SCANNING",
      color: "blue",
      side: "left"
    },
    {
      phase: "02", 
      title: "Pipeline Design",
      subtitle: "Automation Architecture",
      description: "AI-powered pipeline generation creates custom workflows tailored to your requirements.",
      icon: "⚙️",
      status: "DESIGNING",
      color: "cyan",
      side: "right"
    },
    {
      phase: "03",
      title: "Deployment Phase",
      subtitle: "System Integration",
      description: "Zero-downtime deployment with real-time monitoring and rollback capabilities.",
      icon: "🚀",
      status: "DEPLOYING",
      color: "blue",
      side: "left"
    },
    {
      phase: "04",
      title: "Active Monitoring",
      subtitle: "Real-time Control",
      description: "Continuous monitoring with predictive analytics and automated incident response.",
      icon: "📊",
      status: "MONITORING",
      color: "cyan",
      side: "right"
    },
    {
      phase: "05",
      title: "Optimization Loop",
      subtitle: "Continuous Improvement",
      description: "Machine learning algorithms optimize performance and reduce costs over time.",
      icon: "🔄",
      status: "OPTIMIZING",
      color: "lime",
      side: "left"
    },
    {
      phase: "06",
      title: "Mission Complete",
      subtitle: "Operational Excellence",
      description: "Full operational control with 99.9% uptime and predictable performance.",
      icon: "✅",
      status: "COMPLETE",
      color: "lime",
      side: "right"
    }
  ];

  return (
    <section id="scenarios" className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <OptimizedMotion
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-space-enhanced text-display text-premium mb-4 text-center">
            Mission <span className="gradient-blue-cyan text-glow-blue">Timeline</span>
          </h2>
          <p className="text-body-enhanced text-white/80 text-readable max-w-2xl mx-auto mb-6">
            Follow the OpsPipe workflow from chaos to complete operational control.
          </p>
        </OptimizedMotion>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400/30 via-cyan-400/50 to-lime-400/30 rounded-full"></div>
          
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
                    className={`w-12 h-12 rounded-full border-2 border-${item.color}-400/50 bg-black/80 flex items-center justify-center shadow-lg shadow-${item.color}-400/20`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      boxShadow: [
                        `0 0 15px rgba(${item.color === 'blue' ? '59,130,246' : item.color === 'cyan' ? '34,211,238' : '163,230,53'}, 0.3)`,
                        `0 0 25px rgba(${item.color === 'blue' ? '59,130,246' : item.color === 'cyan' ? '34,211,238' : '163,230,53'}, 0.1)`,
                        `0 0 15px rgba(${item.color === 'blue' ? '59,130,246' : item.color === 'cyan' ? '34,211,238' : '163,230,53'}, 0.3)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-lg">{item.icon}</span>
                  </OptimizedMotion>
                </div>

                {/* Content Card */}
                <OptimizedMotion
                  className={`w-full max-w-sm md:max-w-md ${item.side === 'left' ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/5 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <div className="relative backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-lg p-4 md:p-5 shadow-2xl shadow-black/60 group-hover:border-blue-400/40 transition-all duration-300">
                      {/* Mobile Icon + Phase */}
                      <div className="flex items-center md:hidden mb-3">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <div className={`font-mono-enhanced text-mono-caption text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30`}>
                          PHASE {item.phase}
                        </div>
                      </div>

                      {/* Desktop Phase Number */}
                      <div className="hidden md:flex items-center justify-between mb-3">
                        <div className={`font-mono-enhanced text-mono-caption text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30`}>
                          PHASE {item.phase}
                        </div>
                        <div className={`font-mono-enhanced text-mono-caption text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30`}>
                          {item.status}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-space-enhanced text-lg md:text-xl text-premium mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <div className={`font-mono-enhanced text-xs md:text-sm text-${item.color}-400 text-glow-${item.color} mb-2`}>
                        {item.subtitle}
                      </div>

                      {/* Description */}
                      <p className="text-body-enhanced text-white/80 text-sm md:text-base leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Progress Indicator */}
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden">
                          <OptimizedMotion
                            className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-300`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(parseInt(item.phase) / 6) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        <span className={`font-mono-enhanced text-xs text-${item.color}-400`}>
                          {Math.round((parseInt(item.phase) / 6) * 100)}%
                        </span>
                      </div>

                      {/* Mobile Status */}
                      <div className="md:hidden mt-2">
                        <div className={`font-mono-enhanced text-xs text-${item.color}-400 text-glow-${item.color} bg-black/30 px-2 py-1 rounded border border-${item.color}-400/30 inline-block`}>
                          {item.status}
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