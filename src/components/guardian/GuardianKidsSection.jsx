import React, { memo, useMemo } from 'react';
import { motion } from '../../FramerProvider';

// Static data to prevent re-renders
const ANALYSIS_ITEMS = [
  "✓ Emotional State Recognition",
  "✓ Vocabulary Growth Tracking", 
  "✓ Social Skill Development",
  "✓ Creative Expression Patterns",
  "✓ Safety & Wellbeing Monitoring"
];

const RESPONSE_OPTIONS = [
  { emoji: "😊", text: "It was amazing! I painted a sunset", color: "bg-pink-100 border-pink-300 hover:bg-pink-200" },
  { emoji: "🤔", text: "Pretty good, but I messed up the trees", color: "bg-blue-100 border-blue-300 hover:bg-blue-200" },
  { emoji: "💭", text: "Can we talk about something else?", color: "bg-purple-100 border-purple-300 hover:bg-purple-200" }
];

const RECENT_ACTIVITIES = [
  { icon: "🎨", text: "Creative writing story", time: "Yesterday" },
  { icon: "📚", text: "Math homework help", time: "2 days ago" },
  { icon: "👥", text: "Friendship question", time: "3 days ago" }
];

const BOTTOM_NAV_BUTTONS = [
  { icon: "🎤", label: "Talk", color: "bg-emerald-100 hover:bg-emerald-200" },
  { icon: "✏️", label: "Draw", color: "bg-blue-100 hover:bg-blue-200" },
  { icon: "📚", label: "Story", color: "bg-purple-100 hover:bg-purple-200" },
  { icon: "⚙️", label: "Settings", color: "bg-slate-100 hover:bg-slate-200" }
];

const JOURNEY_PHASES = [
  {
    stage: "Foundation",
    ages: "Ages 3-6",
    icon: "🐻",
    title: "Caring Bear Companion",
    status: "current",
    features: ["Trust & Safety Building", "Basic Emotional Vocabulary", "Bedtime Stories & Comfort"]
  },
  {
    stage: "Competence", 
    ages: "Ages 7-10",
    icon: "🤖",
    title: "Helpful Learning Buddy",
    status: "active",
    features: ["Homework Support", "Social Skill Development", "Creative Collaboration"]
  },
  {
    stage: "Identity",
    ages: "Ages 11-13",
    icon: "💎",
    title: "Understanding Ally",
    status: "future",
    features: []
  },
  {
    stage: "Autonomy",
    ages: "Ages 14-17",
    icon: "💬",
    title: "Trusted Future-Focused Friend", 
    status: "future",
    features: []
  }
];

const ARCHITECTURE_CARDS = [
  {
    icon: "🧠",
    title: "Memory Continuity",
    desc: "14-year relationship span with contextual recall",
    color: "emerald"
  },
  {
    icon: "🛡️", 
    title: "Safety Protocols",
    desc: "Multi-layer content filtering & crisis detection",
    color: "blue"
  },
  {
    icon: "📈",
    title: "Adaptive Development",
    desc: "Psychology-informed response evolution",
    color: "purple"
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Bridge",
    desc: "Transparent insights without surveillance",
    color: "pink"
  },
  {
    icon: "🔒",
    title: "Local Processing", 
    desc: "89% on-device with encrypted cloud sync",
    color: "amber"
  },
  {
    icon: "❤️",
    title: "Relationship Intelligence",
    desc: "Trust-building with appropriate boundaries",
    color: "red"
  }
];

// Memoized sub-components for better performance
const AnalysisItem = memo(({ item, index }) => (
  <motion.li
    className="text-slate-700 font-medium flex items-center gap-3"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <span className="text-emerald-600">{item.split(' ')[0]}</span>
    <span>{item.substring(2)}</span>
  </motion.li>
));

AnalysisItem.displayName = 'AnalysisItem';

const ResponseOption = memo(({ option, index }) => (
  <motion.button
    className={`response-btn w-full ${option.color} border-2 rounded-2xl p-4 text-left transition-all duration-300 cursor-pointer`}
    style={{ minHeight: '56px' }}
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-4">
      <span className="text-2xl">{option.emoji}</span>
      <span className="font-medium text-slate-800">{option.text}</span>
    </div>
  </motion.button>
));

ResponseOption.displayName = 'ResponseOption';

const JourneyStage = memo(({ phase, index }) => (
  <motion.div
    className={`journey-stage ${phase.status} relative`}
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
  >
    <div className={`
      ${phase.status === 'active' ? 'bg-emerald-50 border-emerald-300 border-2' : 
        phase.status === 'current' ? 'bg-blue-50 border-blue-300 border-2' : 
        'bg-slate-50 border-slate-200 border'} 
      rounded-xl p-5 transition-all duration-300 hover:shadow-md
    `}>
      <div className="flex items-start gap-4">
        <div className={`
          stage-icon w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm
          ${phase.status === 'active' ? 'bg-emerald-100' : 
            phase.status === 'current' ? 'bg-blue-100' : 
            'bg-slate-100'}
        `}>
          {phase.icon}
        </div>
        <div className="stage-content flex-1">
          <div className="mb-2">
            <h4 className="font-bold text-slate-900 text-lg">{phase.stage} ({phase.ages})</h4>
            <p className={`font-medium text-sm ${
              phase.status === 'active' ? 'text-emerald-700' : 
              phase.status === 'current' ? 'text-blue-700' : 
              'text-slate-600'
            }`}>{phase.title}</p>
          </div>
          {phase.features.length > 0 && (
            <ul className="space-y-1">
              {phase.features.map((feature, j) => (
                <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="text-slate-400">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </motion.div>
));

JourneyStage.displayName = 'JourneyStage';

const ArchitectureCard = memo(({ card, index }) => (
  <motion.div
    className={`arch-card bg-white/80 backdrop-blur-sm border border-${card.color}-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 + 0.7 }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="card-icon text-3xl mb-4">{card.icon}</div>
    <h4 className="font-bold text-slate-900 text-lg mb-3">{card.title}</h4>
    <p className="text-slate-700 leading-relaxed">{card.desc}</p>
  </motion.div>
));

ArchitectureCard.displayName = 'ArchitectureCard';

const GuardianKidsSection = memo(() => {
  // Memoize expensive style calculations
  const phoneStyle = useMemo(() => ({
    width: '320px',
    height: '640px',
    background: 'linear-gradient(145deg, #1d1d1f, #2d2d30)',
    borderRadius: '2.5rem',
    padding: '8px',
    boxShadow: `
      0 0 0 2px #86868b,
      0 25px 80px rgba(0,0,0,0.3),
      inset 0 0 0 1px rgba(255,255,255,0.1)
    `,
    transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)'
  }), []);

  const dynamicIslandStyle = useMemo(() => ({
    width: '126px',
    height: '37px',
    background: '#000',
    borderRadius: '19px'
  }), []);

  const guardianInterfaceStyle = useMemo(() => ({
    background: 'linear-gradient(180deg, #dbeafe 0%, #fef3cd 100%)',
    padding: '60px 24px 24px'
  }), []);

  const guardianBearStyle = useMemo(() => ({
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #f59e0b, #d97706)',
    boxShadow: '0 12px 30px rgba(245, 158, 11, 0.4)'
  }), []);

  return (
    <section id="kids-methodology" className="relative py-24 z-10 mobile-section">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-emerald-50/20 to-purple-50/30" />
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-slate-400 to-slate-600"></div>
            <span className="font-mono text-slate-700 text-sm tracking-[0.2em] uppercase font-medium bg-slate-100 px-4 py-2 rounded-full border border-slate-300">
              Guardian Child Experience
            </span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-slate-400 to-slate-600"></div>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-8">
            Unified Child Development
            <span className="block bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text font-black">
              Architecture
            </span>
          </h2>
        </motion.div>

        {/* Main Content Grid - Following Parent Section Pattern */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Left Side - Child Development Engine */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-emerald rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/30" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🧠</span>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">Child Development Engine</h3>
                </div>
                
                <div className="space-y-4 font-body text-slate-800 leading-relaxed">
                  <div className="analysis-section">
                    <h4 className="font-semibold text-slate-800 text-lg mb-4">Real-Time Analysis:</h4>
                    <ul className="analysis-list space-y-3">
                      {ANALYSIS_ITEMS.map((item, i) => (
                        <AnalysisItem key={i} item={item} index={i} />
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/60 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-base">
                      <span className="font-semibold text-blue-800">Advanced AI Psychology:</span> Guardian understands developmental stages and adapts conversations to support healthy emotional growth.
                    </p>
                  </div>
                  
                  <div className="current-insights">
                    <h4 className="font-semibold text-slate-800 text-lg mb-4">Current Session Insights:</h4>
                    <div className="space-y-3">
                      <div className="insight-item positive bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <span className="font-medium text-emerald-800">Confidence: High</span>
                        <span className="text-emerald-600 text-sm ml-2">(art discussion)</span>
                      </div>
                      <div className="insight-item growth bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <span className="font-medium text-blue-800">Vocabulary: "frustrated" → "disappointed"</span>
                      </div>
                      <div className="insight-item social bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <span className="font-medium text-purple-800">Social awareness: Mentioned helping friend</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-xl p-4">
                    <p className="text-base font-medium text-purple-800">
                      Guardian creates a safe space for children to explore emotions and develop critical thinking skills.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Child Phone Mockup */}
          <div className="relative">
            <motion.div 
              className="relative mx-auto"
              style={phoneStyle}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Phone Screen */}
              <div className="absolute inset-2 bg-white rounded-[2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-mono text-slate-900 border-b border-slate-100">
                  <span className="font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-slate-900 rounded-full"></div>
                      <div className="w-1 h-3 bg-slate-900 rounded-full"></div>
                      <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                      <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="w-6 h-3 bg-emerald-500 rounded-sm ml-1"></div>
                  </div>
                </div>

                {/* Guardian Interface */}
                <div className="h-full bg-gradient-to-br from-blue-50 to-emerald-50 overflow-y-auto" style={guardianInterfaceStyle}>
                  
                  {/* App Header */}
                  <div className="app-header text-center mb-8">
                    <div className="child-profile">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Hi Emma! 👋</h2>
                      <p className="text-sm text-slate-600">Age 9 • Safe Mode Active</p>
                    </div>
                  </div>

                  {/* Guardian Avatar */}
                  <div className="guardian-avatar-container relative flex justify-center mb-8">
                    <motion.div 
                      className="guardian-bear relative flex items-center justify-center"
                      style={guardianBearStyle}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 12px 30px rgba(245, 158, 11, 0.4)',
                          '0 16px 40px rgba(245, 158, 11, 0.5)',
                          '0 12px 30px rgba(245, 158, 11, 0.4)'
                        ]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-5xl">🐻</span>
                      
                      {/* Sparkles */}
                      <motion.div
                        className="sparkles absolute -top-3 -right-3 text-yellow-300 text-xl"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [0.8, 1.3, 0.8]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        ✨
                      </motion.div>
                      <motion.div
                        className="sparkles absolute -bottom-2 -left-3 text-yellow-200 text-lg"
                        animate={{ 
                          rotate: [360, 0],
                          scale: [1, 0.7, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Conversation Bubble */}
                  <div className="conversation-bubble bg-white/90 rounded-3xl p-6 mb-6 shadow-sm">
                    <p className="text-slate-800 font-medium text-lg mb-3 leading-relaxed">
                      "How was art class today? I love hearing about your creative projects!"
                    </p>
                    <div className="typing-indicator text-slate-500 text-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        ></motion.div>
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        ></motion.div>
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        ></motion.div>
                      </div>
                      <span>Guardian is listening...</span>
                    </div>
                  </div>

                  {/* Response Options */}
                  <div className="response-options space-y-4 mb-8">
                    {RESPONSE_OPTIONS.map((option, i) => (
                      <ResponseOption key={i} option={option} index={i} />
                    ))}
                  </div>

                  {/* Recent Activities */}
                  <div className="recent-activities bg-white/70 rounded-2xl p-5 mb-8">
                    <h4 className="font-semibold text-slate-800 text-lg mb-4">Recent Chats</h4>
                    <div className="space-y-3">
                      {RECENT_ACTIVITIES.map((activity, i) => (
                        <div key={i} className="activity-item flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{activity.icon}</span>
                            <span className="text-slate-700 font-medium">{activity.text}</span>
                          </div>
                          <span className="text-slate-500 text-sm">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="bottom-nav grid grid-cols-4 gap-3">
                    {BOTTOM_NAV_BUTTONS.map((button, i) => (
                      <motion.button
                        key={i}
                        className={`${button.color} rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer`}
                        style={{ minHeight: '56px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{button.icon}</div>
                        <div className="text-xs font-semibold text-slate-700">{button.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone Shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/40 rounded-[2.5rem] blur-3xl transform translate-y-12 translate-x-8 -z-10"></div>
          </div>
        </motion.div>

        {/* Journey Phases Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Left Side - Journey Phases */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-emerald rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-pink-100/30" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🚀</span>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">14-Year Journey</h3>
                </div>
                
                <div className="space-y-6">
                  {JOURNEY_PHASES.map((phase, i) => (
                    <JourneyStage key={i} phase={phase} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Architecture Cards */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-emerald rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 to-blue-100/30" />
              <div className="relative z-10 space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-4">Runtime Architecture</h3>
                  <p className="text-slate-600">Enterprise-grade technology designed for child development</p>
                </div>
                
                <div className="arch-cards grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ARCHITECTURE_CARDS.map((card, i) => (
                    <ArchitectureCard key={i} card={card} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

GuardianKidsSection.displayName = 'GuardianKidsSection';

export default GuardianKidsSection; 