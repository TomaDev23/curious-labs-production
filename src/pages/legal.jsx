// ✅ NEW - LEGAL - INTELLECTUAL PROPERTY DECLARATION
// 🔴 CODE: LEGAL-001
// ⚖️ STATUS: LEGAL DECLARATION - IP & TRADEMARK PROTECTION
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🧬 FEATURES: IP rights, trademark protection, usage terms
// 📊 BUNDLE: Uses atomic background system
// 🎯 ROUTE: /legal

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import ScrollToTop from '../components/ScrollToTop';
import { motion } from '../FramerProvider';

export default function Legal() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const legalSections = [
    {
      id: 'ip-rights',
      title: 'Intellectual Property Rights',
      icon: '🔐',
      status: 'PROTECTED',
      classification: 'CORE',
      content: 'All product architectures, interface concepts, branding systems, technical diagrams, component structures, and naming schemes presented on this site are protected intellectual property of CuriousLabs.\n\nThese materials reflect strategic blueprints and proprietary infrastructure — including but not limited to: 🧠 OpsPipe, 🛡️ Aegis, 🌙 MoonSignal, 🤖 Guardian, and 💬 Curious.\n\nThey are exposed publicly for the purpose of investor and collaborator evaluation, not for replication, training, or reuse. Unauthorized copying, reverse engineering, derivative modeling, or commercialization of these ideas without written permission constitutes IP infringement.'
    },
    {
      id: 'trademarks',
      title: 'Trademarks & Strategic Disclosure',
      icon: '™️',
      status: 'REGISTERED',
      classification: 'CRITICAL',
      content: 'The trademarks, terminology, and interface metaphors associated with CuriousLabs\' products — such as Mission Control, Runtime FSM, Security Tiles, AI Companions, and Agent Contracts — represent a cohesive narrative and market strategy.\n\nThe public disclosure of these names and systems is a deliberate act of strategic transparency. It enables potential partners and investors to assess the scope and ambition of CuriousLabs. This does not grant permission for third-party adoption or imitation.\n\nUnauthorized use of our concepts, UX patterns, or strategic names is strictly prohibited.'
    },
    {
      id: 'prohibited-use',
      title: 'Prohibited Use',
      icon: '🚫',
      status: 'ENFORCED',
      classification: 'MANDATORY',
      content: 'You may not:\n\n• Use CuriousLabs products or ideas for commercial gain\n• Rebuild derivative frameworks based on the public disclosures here\n• Train AI models or scrape these structures for competitor analysis\n• Copy naming conventions, visual themes, or presentation language\n\nCuriousLabs maintains full records of authorship, development logs, and IP provenance.'
    },
    {
      id: 'licensing',
      title: 'Licensing & Inquiries',
      icon: '🤝',
      status: 'AVAILABLE',
      classification: 'CONTACT',
      content: 'If you\'re interested in partnering, licensing, investing, or exploring collaboration — you\'re welcome to reach out directly.\n\n📩 legal@curiouslabs.space\n\nWe support open dialogue, not open source.'
    },
    {
      id: 'enforcement',
      title: 'Enforcement & Recordkeeping',
      icon: '🛡️',
      status: 'ACTIVE',
      classification: 'SECURITY',
      content: 'CuriousLabs enforces its rights under Cambodian and international IP law.\n\nWe maintain:\n• Full version histories and commit trails\n• Design files, drafts, and trace evidence of development\n• Product naming registrations and strategy decks\n\nViolations will be pursued through takedowns, injunctions, and legal action.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'PROTECTED': return 'text-lime-400 bg-lime-400/20';
      case 'REGISTERED': return 'text-blue-400 bg-blue-400/20';
      case 'ENFORCED': return 'text-red-400 bg-red-400/20';
      case 'AVAILABLE': return 'text-cyan-400 bg-cyan-400/20';
      case 'ACTIVE': return 'text-amber-400 bg-amber-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Inter','Space_Grotesk',system-ui,sans-serif]">
      <Helmet>
        <title>Legal Declaration - IP & Trademark Rights | CuriousLabs</title>
        <meta name="description" content="Intellectual property rights, trademark protection, and usage terms for CuriousLabs platform and products." />
        <meta property="og:title" content="CuriousLabs Legal Declaration - IP & Trademark Rights" />
        <meta property="og:description" content="Intellectual property rights, trademark protection, and usage terms for CuriousLabs platform and products." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.space/legal" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Enhanced Typography CSS */}
      <style jsx>{`
        .font-display {
          font-family: 'Orbitron', 'Space Grotesk', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .font-mono-enhanced {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        
        .text-hero {
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        
        .text-display {
          font-size: clamp(1.5rem, 3vw, 2rem);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .text-headline {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        .text-body-enhanced {
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        
        .text-premium {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #ea580c 70%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.3));
        }
        
        .text-glow {
          text-shadow: 0 0 15px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.15);
        }
      `}</style>

      <ScrollToTop />
      <MissionControlNavbar />
      <BackgroundLayerAtomic />

      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '20%',
          right: '10%',
          transform: 'translate(50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)'
        }}
      />

      <main className="relative z-20 pt-16 pb-12">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-hero text-premium text-glow mb-4 py-2">
              Legal Declaration
            </h1>
            <div className="h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/60 to-amber-400/0 w-32 mx-auto mb-6"></div>
            <p className="font-display text-headline text-white/90 mb-3">
              Intellectual Property & Trademark Rights
            </p>
            
            {/* Status Panel */}
            <div className="backdrop-blur-2xl bg-black/40 border border-amber-400/20 rounded-xl p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="font-mono-enhanced text-amber-400 text-xs tracking-wider font-semibold">LEGAL STATUS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-2 py-1 rounded-full border border-amber-400/30 bg-black/40">
                    <span className="text-xs font-mono-enhanced text-white/70">EFFECTIVE:</span>
                    <span className="text-xs font-mono-enhanced text-amber-400 font-semibold">JUL 2025</span>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1 rounded-full border border-amber-400/30 bg-black/40">
                    <span className="text-xs font-mono-enhanced text-white/70">STATUS:</span>
                    <span className="text-xs font-mono-enhanced text-lime-400 font-semibold">ACTIVE</span>
                  </div>
                </div>
              </div>
              <p className="text-body-enhanced text-white/80">
                Applies to all visitors of <span className="text-amber-400 font-mono-enhanced">curiouslabs.space</span>
              </p>
            </div>
          </motion.div>

          {/* Legal Sections */}
          <div className="space-y-6">
            {legalSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-2xl bg-black/30 border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{section.icon}</div>
                    <div>
                      <h2 className="font-display text-headline text-white mb-2">
                        {section.title}
                      </h2>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-2 py-1 rounded-full border border-gray-600/30 bg-black/40">
                          <span className="text-xs font-mono-enhanced text-white/60">ID:</span>
                          <span className="text-xs font-mono-enhanced text-amber-400">{section.id.toUpperCase()}</span>
                        </div>
                        <div className={`flex items-center space-x-2 px-2 py-1 rounded-full border border-current/30 ${getStatusColor(section.status)}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                          <span className="text-xs font-mono-enhanced font-semibold">{section.status}</span>
                        </div>
                        <div className="px-2 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400">
                          <span className="text-xs font-mono-enhanced font-semibold">{section.classification}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pl-11">
                  <div className="text-body-enhanced text-white/85 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-amber-400/20 rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="font-display text-headline text-white mb-4">
                We Respect <span className="text-premium">Creators</span>
              </h3>
              <p className="text-body-enhanced text-white/80 leading-relaxed mb-4">
                We publish this declaration not to block creativity — but to protect the original vision, structure, and strategy behind CuriousLabs. If what you see inspires you — reach out. But remember: Innovation is welcome. Imitation is not.
              </p>
              
              <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30 rounded-lg">
                <span className="text-xl">📩</span>
                <a 
                  href="#"
                  className="font-mono-enhanced text-amber-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'mailto:' + 'legal' + '@' + 'curiouslabs.space';
                  }}
                >
                  legal@curiouslabs.space
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
} 