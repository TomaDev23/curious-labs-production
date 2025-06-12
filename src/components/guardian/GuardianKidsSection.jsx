import React from 'react';
import { motion } from '../../FramerProvider';

export default function GuardianKidsSection() {
  return (
    <section id="kids-methodology" className="relative h-[220vh] flex items-center py-20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        {/* Header - Clean and Focused */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-600"></div>
            <span className="text-emerald-700 font-mono text-sm tracking-wider uppercase font-medium">The Guardian Methodology</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-600"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Growing Relationships,
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-black">
              Not Just Features
            </span>
          </h2>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Guardian addresses the cultural crisis of children trapped in mindless content consumption through a 
            <strong className="text-emerald-700"> methodically designed, psychology-aware companion</strong> that builds 
            genuine long-term relationships across years of growth.
          </p>
        </motion.div>

        {/* Main Content - Z Pattern Design */}
        
        {/* Row 1: Problem Statement (Left) + Visual Demo (Right) */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Left: The Problem & Solution */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Beyond Screen Time: <span className="text-emerald-700">Meaningful Connection</span>
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                While children are increasingly isolated behind screens, Guardian creates a <strong>psychology-aware bridge</strong> 
                between digital engagement and real emotional development.
              </p>
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2">❌ Current Reality</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Mindless content consumption without learning or growth</li>
                    <li>• Social media addiction starting before emotional maturity</li>
                    <li>• Screens isolate children from family relationships</li>
                    <li>• No guidance for processing emotions or building self-awareness</li>
                    <li>• Endless scrolling with no natural boundaries or reflection</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-800 mb-2">✅ Guardian Way</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Daily conversations that build emotional literacy and self-awareness</li>
                    <li>• Steers toward educational content and creative digital experiences</li>
                    <li>• Develops healthy relationships that strengthen family bonds</li>
                    <li>• Every interaction designed for emotional growth and learning</li>
                    <li>• Teaches healthy boundaries and encourages real-world activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Timeline Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200">
              <h4 className="text-lg font-bold text-gray-900 mb-6 text-center">Years of Relationship Journey</h4>
              
              {/* Vertical Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-blue-400 via-emerald-400 to-purple-400"></div>
                
                {[
                  { age: "3-6", icon: "🧸", title: "Caring Bear", color: "bg-pink-100 border-pink-300" },
                  { age: "7-10", icon: "🎒", title: "Helpful Buddy", color: "bg-blue-100 border-blue-300" },
                  { age: "11-13", icon: "🤝", title: "Understanding Ally", color: "bg-emerald-100 border-emerald-300" },
                  { age: "14-17", icon: "💭", title: "Trusted Friend", color: "bg-purple-100 border-purple-300" }
                ].map((stage, i) => (
                  <motion.div
                    key={i}
                    className={`relative flex items-center gap-4 mb-6 ${stage.color} border-2 rounded-xl p-4`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <div className="absolute -left-10 w-6 h-6 bg-white border-4 border-current rounded-full flex items-center justify-center text-xs">
                      {stage.icon}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900">Ages {stage.age}</span>
                      <h5 className="font-bold text-gray-800">{stage.title}</h5>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Row 2: Core Technology (Right) + Methodology (Left) */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Left: Core Methodology */}
          <div className="lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Technical Sophistication: <span className="text-purple-700">Layers of Care</span>
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: "🧠",
                  title: "Emotional Literacy Engine",
                  desc: "Child development psychology algorithms that build emotional vocabulary and self-awareness skills while maintaining healthy independence from AI dependency"
                },
                {
                  icon: "📚", 
                  title: "Adaptive Memory System",
                  desc: "Multi-year relationship continuity spanning childhood to teens, creating unprecedented personalized growth tracking and context-aware conversations"
                },
                {
                  icon: "🛡️",
                  title: "Sophisticated Boundaries", 
                  desc: "Carefully calibrated trust-building system—genuine enough to earn real connection, structured enough to maintain safety and encourage healthy human relationships"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Feature Showcase */}
          <div className="lg:order-1">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 border border-emerald-200">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Revolutionary Differentiators</h4>
              
              {/* Simple Runtime Loop */}
              <div className="flex flex-col items-center space-y-6 py-4">
                
                {/* Agent */}
                <div className="w-40 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span className="text-white font-medium text-sm">Agent</span>
                  </div>
                </div>

                {/* Elegant Arrow Down */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                  <div className="text-purple-400 text-lg">▼</div>
                </div>

                {/* Runtime Box - More Elegant */}
                <div className="w-44 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🧠</span>
                      <span className="text-white font-medium text-sm">Runtime Box</span>
                    </div>
                    <span className="text-purple-100 text-xs font-light">Memory Magic</span>
                  </div>
                  <div className="absolute -top-2 -right-2 text-yellow-300 text-lg animate-pulse">✨</div>
                  <div className="absolute -bottom-1 -left-2 text-yellow-200 text-sm animate-pulse delay-500">✨</div>
                </div>

                {/* Elegant Arrow Down */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-purple-400 to-emerald-400"></div>
                  <div className="text-emerald-400 text-lg">▼</div>
                </div>

                {/* Decision Generator */}
                <div className="w-40 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <span className="text-white font-medium text-sm">Decision Engine</span>
                  </div>
                </div>

                {/* Elegant Curved Arrow Back */}
                <div className="flex items-center justify-center w-full relative mt-4">
                  <div className="flex items-center">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
                    <div className="text-blue-400 text-xl ml-2 transform rotate-180">↻</div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full ml-2"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom: Horizontal Age Evolution Bar */}
        <motion.div
          className="bg-gradient-to-r from-gray-900/5 to-blue-900/10 backdrop-blur-md border border-gray-300/40 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h4 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Evolution Across <span className="text-emerald-700">Critical Development Stages</span>
          </h4>
          
          {/* Horizontal Progress Bar */}
          <div className="relative mb-8">
            <div className="h-2 bg-gradient-to-r from-pink-300 via-blue-300 via-emerald-300 to-purple-300 rounded-full"></div>
            
            <div className="flex justify-between items-start mt-4">
              {[
                { age: "3-6", title: "Foundation", focus: "Trust & Safety", icon: "🧸", color: "text-pink-600" },
                { age: "7-10", title: "Competence", focus: "Learning & Growth", icon: "🎒", color: "text-blue-600" },
                { age: "11-13", title: "Identity", focus: "Self-Discovery", icon: "🤝", color: "text-emerald-600" },
                { age: "14-17", title: "Autonomy", focus: "Future Preparation", icon: "💭", color: "text-purple-600" }
              ].map((stage, i) => (
                <motion.div
                  key={i}
                  className="text-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="text-3xl mb-2">{stage.icon}</div>
                  <div className={`font-bold text-sm ${stage.color} mb-1`}>Ages {stage.age}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{stage.title}</div>
                  <div className="text-xs text-gray-600">{stage.focus}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 