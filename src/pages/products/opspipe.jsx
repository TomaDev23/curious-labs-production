import {  motion  } from '../../FramerProvider';

/**
 * 🛡️ KEEP - CRITICAL PRODUCTION SUB-ROUTE
 * Code: OPSPIPE-001
 * Used in: /products/opspipe route
 * Features: Pipeline automation, real-time monitoring, operational control
 * Warning: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
 * Bundle: Products sub-module
 * Type: Product Page Component
 * Dependencies: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop, FooterExperience
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import FooterExperience from '../../components/home/v4/FooterExperience';
import './opspipe.css'; // For custom animations

// OpsPipe Architecture Diagram Component
const OpsPipeArchitectureDiagram = () => {
  const [diagramReady, setDiagramReady] = useState(false);

  useEffect(() => {
    const initAndRender = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        
        mermaid.initialize({ 
          theme: 'dark',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#3b82f6',
            lineColor: '#3b82f6',
            sectionBkgColor: '#000000',
            altSectionBkgColor: '#1a1a1a',
            gridColor: '#333333',
            secondaryColor: '#84cc16',
            tertiaryColor: '#06b6d4',
            background: '#000000',
            mainBkg: '#1a1a1a',
            secondBkg: '#262626'
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 15,
            nodeSpacing: 50,
            rankSpacing: 60
          },
          startOnLoad: false,
          securityLevel: 'loose'
        });
        
        setDiagramReady(true);
        
        // Render after short delay
        setTimeout(() => {
          const element = document.getElementById('opspipe-architecture-chart');
          if (element) {
            mermaid.run({ nodes: [element] }).catch(() => {
              setDiagramReady(false);
            });
          }
        }, 100);
      } catch (error) {
        setDiagramReady(false);
      }
    };

    initAndRender();
  }, []);

  return (
    <>
      {diagramReady ? (
        <div 
          id="opspipe-architecture-chart"
          className="mermaid w-full" 
          style={{ 
            minHeight: '400px', 
            width: '100%',
            display: 'block',
            fontSize: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'visible',
            background: 'transparent'
          }}
        >
          {`graph LR
    subgraph Core["🏗️ OpsPipe Core"]
        OS["OpsPipe OS<br/>AI Engine"] --> SM["State Machine<br/>Coordinator"]
    end
    
    subgraph InputLayer["📥 Input Sources"]
        TB["🤖 Telegram Bot"]
        FU["📁 File Upload"] 
        POS["🏪 POS Adapter"]
        API["⚡ API Gateway"]
    end
    
    subgraph Processing["🧠 AI Processing Hub"]
        CC["Command Center<br/>Registry"]
        DE["🎯 Decision Engine"]
        RM["🛡️ Recovery Manager"]
    end
    
    subgraph ExecutionChain["⚙️ Execution Pipeline"]
        AL["Agent Loop<br/>Controller"] --> TOK["Tokenizer<br/>Parser"]
        FSM["FSM + Trace<br/>Memory"] --> MEM["State Store<br/>Context"]
        RS["Recovery<br/>System"] --> VAL["Validator<br/>Gate"]
    end
    
    subgraph OutputSystems["📤 Output & Interfaces"]
        KB["📚 Knowledge Base<br/>/kb/"]
        EX["📊 Data Exports<br/>/logs/"]
        DASH["📊 OpsCockpit<br/>Dashboard"]
        WEB["🖥️ Web Admin<br/>Control Panel"]
        MOB["📱 OpsField<br/>Mobile App"]
        TG["💬 StaffBot<br/>Telegram"]
    end
    
    %% Input connections
    InputLayer --> SM
    TB --> SM
    FU --> SM
    POS --> SM
    API --> SM
    
    %% Core to Processing
    SM --> Processing
    SM --> CC
    SM --> DE
    SM --> RM
    
    %% Processing to Execution
    CC --> AL
    DE --> FSM
    RM --> RS
    
    %% Execution Chain internal flows
    TOK --> MEM
    MEM --> VAL
    
    %% Execution to Output
    ExecutionChain --> OutputSystems
    VAL --> KB
    VAL --> EX
    VAL --> DASH
    VAL --> WEB
    VAL --> MOB
    VAL --> TG
    
    style Core fill:#1a1a1a,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style InputLayer fill:#1a1a1a,stroke:#84cc16,stroke-width:2px,color:#ffffff
    style Processing fill:#1a1a1a,stroke:#06b6d4,stroke-width:2px,color:#ffffff
    style ExecutionChain fill:#1a1a1a,stroke:#8b5cf6,stroke-width:2px,color:#ffffff
    style OutputSystems fill:#1a1a1a,stroke:#ef4444,stroke-width:2px,color:#ffffff
    
    style OS fill:#3b82f6,stroke:#000,color:#fff,stroke-width:2px
    style SM fill:#3b82f6,stroke:#000,color:#fff,stroke-width:2px
    style DE fill:#06b6d4,stroke:#000,color:#fff,stroke-width:2px
    style AL fill:#8b5cf6,stroke:#000,color:#fff,stroke-width:2px
    style DASH fill:#ef4444,stroke:#000,color:#fff,stroke-width:2px
    style KB fill:#10b981,stroke:#000,color:#fff,stroke-width:2px`}
        </div>
      ) : (
        <div className="text-center py-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center max-w-6xl mx-auto">
            <div className="bg-blue-400/20 p-4 rounded-lg border border-blue-400/30">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="text-blue-400 font-bold text-sm mb-1">OpsPipe Core</div>
              <div className="space-y-1 text-xs">
                <div className="bg-blue-400/10 p-1 rounded text-white">AI Engine</div>
                <div className="bg-blue-400/10 p-1 rounded text-white">State Coordinator</div>
              </div>
            </div>
            
            <div className="bg-green-400/20 p-4 rounded-lg border border-green-400/30">
              <div className="text-2xl mb-2">📥</div>
              <div className="text-green-400 font-bold text-sm mb-1">Input Sources</div>
              <div className="space-y-1 text-xs">
                <div className="bg-green-400/10 p-1 rounded text-white">🤖 Telegram</div>
                <div className="bg-green-400/10 p-1 rounded text-white">📁 File Upload</div>
                <div className="bg-green-400/10 p-1 rounded text-white">🏪 POS Adapter</div>
              </div>
            </div>
            
            <div className="bg-cyan-400/20 p-4 rounded-lg border border-cyan-400/30">
              <div className="text-2xl mb-2">🧠</div>
              <div className="text-cyan-400 font-bold text-sm mb-1">AI Processing</div>
              <div className="space-y-1 text-xs">
                <div className="bg-cyan-400/10 p-1 rounded text-white">Command Center</div>
                <div className="bg-cyan-400/10 p-1 rounded text-white">Decision Engine</div>
              </div>
            </div>
            
            <div className="bg-purple-400/20 p-4 rounded-lg border border-purple-400/30">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-purple-400 font-bold text-sm mb-1">Execution</div>
              <div className="space-y-1 text-xs">
                <div className="bg-purple-400/10 p-1 rounded text-white">Agent Loop</div>
                <div className="bg-purple-400/10 p-1 rounded text-white">State Store</div>
              </div>
            </div>
            
            <div className="bg-red-400/20 p-4 rounded-lg border border-red-400/30">
              <div className="text-2xl mb-2">📤</div>
              <div className="text-red-400 font-bold text-sm mb-1">Output Systems</div>
              <div className="space-y-1 text-xs">
                <div className="bg-red-400/10 p-1 rounded text-white">Dashboard</div>
                <div className="bg-red-400/10 p-1 rounded text-white">Mobile App</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ✅ KEEP - OPSPIPE PRODUCT COMPONENT
export default function OpsPipe() {
  const [missionTime, setMissionTime] = useState('');
  
  // Mission time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>OpsPipe - Operational Automation Suite | CuriousLabs</title>
        <meta name="description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:title" content="OpsPipe - Operational Automation Suite | CuriousLabs" />
        <meta property="og:description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/opspipe" />
        
        {/* Premium Font Loading - Critical for sophisticated typography */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Advanced Typography & Visual System - OpsPipe Technical Theme */}
        <style jsx="true">{`
          /* Premium Typography Stack - Technical Operations Edition */
          .font-display {
            font-family: 'Orbitron', 'Space Grotesk', system-ui, sans-serif;
            font-variation-settings: 'wght' 700;
            letter-spacing: -0.025em;
            line-height: 1.1;
          }
          
          .font-technical {
            font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
            font-variation-settings: 'wght' 600;
            letter-spacing: -0.015em;
            line-height: 1.2;
          }
          
          .font-body {
            font-family: 'Inter', system-ui, sans-serif;
            font-variation-settings: 'wght' 400;
            line-height: 1.7;
            letter-spacing: -0.01em;
          }
          
          .font-mono {
            font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
            font-variation-settings: 'wght' 500;
            letter-spacing: 0.05em;
          }

          .font-operational {
            font-family: 'Orbitron', 'Space Grotesk', sans-serif;
            font-variation-settings: 'wght' 600;
            letter-spacing: 0.02em;
            line-height: 1.3;
          }

          /* Advanced Text Effects - OpsPipe Color Palette */
          .text-glow-blue {
            text-shadow: 
              0 0 20px rgba(59, 130, 246, 0.6),
              0 0 40px rgba(59, 130, 246, 0.4),
              0 0 60px rgba(59, 130, 246, 0.3);
          }
          
          .text-glow-cyan {
            text-shadow: 
              0 0 15px rgba(34, 211, 238, 0.5),
              0 0 30px rgba(34, 211, 238, 0.3),
              0 0 45px rgba(34, 211, 238, 0.2);
          }
          
          .text-glow-orange {
            text-shadow: 
              0 0 20px rgba(251, 146, 60, 0.5),
              0 0 40px rgba(251, 146, 60, 0.3),
              0 0 60px rgba(251, 146, 60, 0.2);
          }
          
          .text-glow-lime {
            text-shadow: 
              0 0 20px rgba(132, 204, 22, 0.5),
              0 0 40px rgba(132, 204, 22, 0.3),
              0 0 60px rgba(132, 204, 22, 0.2);
          }

          .text-glow-purple {
            text-shadow: 
              0 0 20px rgba(139, 92, 246, 0.5),
              0 0 40px rgba(139, 92, 246, 0.3),
              0 0 60px rgba(139, 92, 246, 0.2);
          }

          .text-glow-emerald {
            text-shadow: 
              0 0 20px rgba(16, 185, 129, 0.5),
              0 0 40px rgba(16, 185, 129, 0.3),
              0 0 60px rgba(16, 185, 129, 0.2);
          }

          /* Holographic text effects */
          .text-holographic {
            background: linear-gradient(45deg, #3b82f6, #06b6d4, #84cc16, #fb923c, #8b5cf6);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: holographicShift 3s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }

          @keyframes holographicShift {
            0%, 100% { 
              background-position: 0% 50%;
              filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
            }
            25% { 
              background-position: 100% 50%;
              filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5));
            }
            50% { 
              background-position: 50% 0%;
              filter: drop-shadow(0 0 10px rgba(132, 204, 22, 0.5));
            }
            75% { 
              background-position: 50% 100%;
              filter: drop-shadow(0 0 10px rgba(251, 146, 60, 0.5));
            }
          }

          /* Enhanced glitch effects */
          .text-glitch {
            position: relative;
            animation: glitch 2s infinite;
          }

          .text-glitch::before,
          .text-glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .text-glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #ff0000;
            z-index: -1;
          }

          .text-glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #00ff00;
            z-index: -2;
          }

          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
          }

          @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-2px, -2px); }
            20% { transform: translate(2px, 2px); }
            30% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
          }

          @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(2px, 2px); }
            20% { transform: translate(-2px, -2px); }
            30% { transform: translate(2px, -2px); }
            40% { transform: translate(-2px, 2px); }
          }
          
          .text-shadow-soft {
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .text-shadow-technical {
            text-shadow: 
              0 2px 8px rgba(59, 130, 246, 0.3),
              0 4px 16px rgba(0, 0, 0, 0.2);
          }

          /* Enhanced 3D text effects */
          .text-3d-blue {
            text-shadow: 
              1px 1px 0 rgba(59, 130, 246, 0.8),
              2px 2px 0 rgba(59, 130, 246, 0.6),
              3px 3px 0 rgba(59, 130, 246, 0.4),
              4px 4px 0 rgba(59, 130, 246, 0.2),
              5px 5px 10px rgba(0, 0, 0, 0.3);
          }

          .text-3d-orange {
            text-shadow: 
              1px 1px 0 rgba(251, 146, 60, 0.8),
              2px 2px 0 rgba(251, 146, 60, 0.6),
              3px 3px 0 rgba(251, 146, 60, 0.4),
              4px 4px 0 rgba(251, 146, 60, 0.2),
              5px 5px 10px rgba(0, 0, 0, 0.3);
          }

          /* Advanced Gradient Text Effects */
          .gradient-text-operational {
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 25%, #84cc16 50%, #fb923c 75%, #8b5cf6 100%);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 8s ease infinite;
          }
          
          .gradient-text-premium {
            background: linear-gradient(135deg, #fb923c 0%, #f59e0b 25%, #3b82f6 50%, #06b6d4 75%, #84cc16 100%);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 12s ease infinite;
          }

          .gradient-text-technical {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 6s ease infinite;
          }

          /* Sophisticated Animations */
          .float-technical {
            animation: floatTechnical 6s ease-in-out infinite;
          }
          
          @keyframes floatTechnical {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-12px) rotate(1deg); }
            66% { transform: translateY(-6px) rotate(-0.5deg); }
          }
          
          .gradient-shift {
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Enhanced Typography Hierarchy */
          .hero-title {
            font-family: 'Orbitron', serif;
            font-weight: 800;
            font-size: clamp(3rem, 8vw, 6rem);
            line-height: 0.9;
            letter-spacing: -0.03em;
          }
          
          .hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: clamp(1.25rem, 3vw, 2rem);
            line-height: 1.4;
            letter-spacing: -0.01em;
          }
          
          .section-title {
            font-family: 'Orbitron', serif;
            font-weight: 700;
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 1.1;
            letter-spacing: -0.02em;
          }

          .section-subtitle {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            line-height: 1.2;
            letter-spacing: -0.015em;
          }
          
          .feature-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: clamp(1.25rem, 3vw, 1.75rem);
            line-height: 1.3;
            letter-spacing: -0.01em;
          }

          .body-large {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            line-height: 1.7;
            letter-spacing: -0.01em;
          }
          
          .body-technical {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            line-height: 1.8;
            letter-spacing: 0.01em;
          }

          .caption-technical {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            font-size: clamp(0.75rem, 1.5vw, 0.875rem);
            line-height: 1.4;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          /* Advanced Hover States */
          .hover-lift-technical {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift-technical:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
              0 25px 50px -12px rgba(59, 130, 246, 0.25),
              0 0 60px rgba(59, 130, 246, 0.15);
          }

          .hover-glow-operational {
            transition: all 0.4s ease;
          }
          
          .hover-glow-operational:hover {
            text-shadow: 
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(59, 130, 246, 0.4);
          }

          /* Color Palette Extensions */
          .bg-operational-primary {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%);
          }

          .bg-operational-secondary {
            background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
          }

          .bg-operational-premium {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
          }

          .border-operational-primary {
            border-color: rgba(59, 130, 246, 0.3);
          }

          .border-operational-secondary {
            border-color: rgba(251, 146, 60, 0.3);
          }

          .border-operational-accent {
            border-color: rgba(132, 204, 22, 0.3);
          }

          .border-operational-premium {
            border-color: rgba(139, 92, 246, 0.3);
          }

          /* Mobile Typography Improvements */
          @media (max-width: 768px) {
            .hero-title {
              font-size: clamp(2.5rem, 12vw, 4rem) !important;
              line-height: 1.0 !important;
            }
            
            .hero-subtitle {
              font-size: clamp(1.1rem, 4vw, 1.5rem) !important;
              line-height: 1.3 !important;
            }
            
            .section-title {
              font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
              line-height: 1.1 !important;
            }
            
            .section-subtitle {
              font-size: clamp(1.25rem, 6vw, 1.75rem) !important;
              line-height: 1.2 !important;
            }
            
            .feature-title {
              font-size: clamp(1.1rem, 5vw, 1.5rem) !important;
              line-height: 1.3 !important;
            }
            
            .body-large {
              font-size: clamp(0.95rem, 3vw, 1.1rem) !important;
              line-height: 1.6 !important;
            }
            
            .body-technical {
              font-size: clamp(0.85rem, 2.5vw, 1rem) !important;
              line-height: 1.7 !important;
            }
            
            /* Mobile text effects optimization */
            .text-glow-blue, .text-glow-cyan, .text-glow-orange, .text-glow-lime, .text-glow-purple, .text-glow-emerald {
              text-shadow: 0 0 10px rgba(59, 130, 246, 0.4) !important;
            }
            
            /* Mobile spacing fixes */
            section {
              padding: 2rem 1rem !important;
            }
            
            .mobile-hero { 
              min-height: 100vh !important; 
              padding: 5rem 1rem 3rem 1rem !important;
            }
            
            .mobile-section { 
              min-height: auto !important; 
              padding: 3rem 1rem !important; 
            }

            .mobile-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .mobile-flex {
              flex-direction: column !important;
              gap: 1rem !important;
            }
            
            .mobile-card {
              padding: 1.5rem !important;
              margin-bottom: 1rem !important;
            }
            
            /* Mobile Button Fixes */
            .mobile-button {
              width: 100% !important;
              padding: 0.75rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }
          
          /* Tablet Responsive */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-title {
              font-size: clamp(3rem, 8vw, 5rem) !important;
            }
            
            .hero-subtitle {
              font-size: clamp(1.2rem, 3vw, 1.8rem) !important;
            }
            
            .tablet-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          /* Performance Optimizations */
          * {
            will-change: auto;
          }
          
          .motion-reduce-compatible {
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          /* Advanced Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #06b6d4);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #0891b2);
          }
        `}</style>
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Enhanced Atmospheric System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary operational gradient orbs with enhanced movement */}
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-orange-500/25 via-amber-500/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-lime-500/10 via-emerald-500/5 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Enhanced secondary atmospheric layers */}
        <motion.div 
          className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-500/15 via-violet-500/10 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div 
          className="absolute top-1/6 right-1/3 w-72 h-72 bg-gradient-to-bl from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 0.7, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -60, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Advanced particle system - operational icons */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500/20 text-lg"
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 5) * 15}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          >
            {['⚙️', '🔧', '📊', '⚡', '🔗', '💾', '🛡️', '🎯', '🚀', '📡', '⚗️', '🔬'][i]}
          </motion.div>
        ))}

        {/* Floating data streams */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{
              left: `${20 + i * 12}%`,
              top: `${10 + i * 10}%`
            }}
            animate={{
              y: [0, 200, 400],
              opacity: [0, 0.8, 0],
              scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}

        {/* Pulsing grid overlay */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dynamic energy beams */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              transform: 'rotate(-15deg)'
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <main className="relative z-20 pt-20 pb-16">
        {/* Enhanced Hero Section */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16 mobile-hero">
          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4 mobile-flex">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-mono caption-technical text-blue-400 text-glow-blue">OPS-002</span>
                  <span className="font-technical text-cyan-400 text-glow-cyan">OPERATIONAL AUTOMATION SUITE</span>
                </div>
                <div className="flex items-center space-x-4 mobile-flex">
                  <div className="text-center">
                    <div className="caption-technical text-orange-400 text-glow-orange">MISSION TIME</div>
                    <div className="font-mono text-white">{missionTime}</div>
                  </div>
                  <div className="text-center">
                    <div className="caption-technical text-lime-400 text-glow-lime">STATUS</div>
                    <div className="font-technical text-emerald-400 text-glow-emerald">ACTIVE</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mobile-grid">
                {[
                  { label: "PIPELINES", value: "47", status: "OPERATIONAL", color: "blue" },
                  { label: "AGENTS", value: "12", status: "ACTIVE", color: "cyan" },
                  { label: "THROUGHPUT", value: "1.2K/s", status: "OPTIMAL", color: "lime" },
                  { label: "UPTIME", value: "99.97%", status: "EXCELLENT", color: "emerald" }
                ].map((metric, index) => (
                  <div key={index} className={`text-center p-3 rounded-lg bg-${metric.color}-400/10 border border-${metric.color}-400/20 mobile-card`}>
                    <div className={`caption-technical text-${metric.color}-400 text-glow-${metric.color}`}>{metric.label}</div>
                    <div className={`font-technical text-xl text-white text-glow-${metric.color}`}>{metric.value}</div>
                    <div className={`text-xs text-${metric.color}-300`}>{metric.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="hero-title gradient-text-operational text-glow-blue hover-glow-operational">
                OpsPipe
              </h1>
              <div className="hero-subtitle text-white/90 text-shadow-technical max-w-4xl mx-auto mt-6">
                Enterprise-grade <span className="gradient-text-technical text-glow-cyan">operational automation</span> that transforms chaos into <span className="gradient-text-premium text-glow-orange">orchestrated precision</span>. Real-time monitoring, intelligent workflows, and defense-grade telemetry.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-6 mobile-flex"
            >
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 text-glow-blue mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Deploy OpsPipe
              </Link>
              <Link
                to="#architecture"
                className="inline-flex items-center bg-operational-secondary border border-operational-secondary text-orange-400 font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:border-orange-400/50 hover:bg-orange-400/10 text-glow-orange mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Explore Architecture
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Product Description */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-mono-enhanced text-mono-caption text-blue-400 text-glow-blue">MISSION BRIEF</span>
                </div>
                
                <h2 className="font-space-enhanced text-display text-premium mb-6">
                  Transform Chaos into <span className="gradient-blue-cyan text-glow-blue">Order</span>
                </h2>
                
                <p className="text-body-enhanced text-white/80 text-readable mb-6 leading-relaxed">
                OpsPipe is the enterprise-grade solution for automating, monitoring, and optimizing your operational processes. 
                Built with flexibility in mind, OpsPipe integrates seamlessly with your existing infrastructure while providing 
                the tools you need to scale efficiently.
              </p>
                
                <div className="space-y-4">
                  {[
                    'Real-time monitoring dashboard', 
                    'Intelligent alert system', 
                    'Custom automation workflows', 
                    'Comprehensive API'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                      <span className="text-body-enhanced text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-2xl bg-black/30 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
                <div className="aspect-video bg-gradient-to-br from-blue-400/10 to-cyan-400/5 rounded-xl p-1 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "radial-gradient(2px 2px at 20px 30px, rgba(59,130,246,0.3), transparent), radial-gradient(2px 2px at 40px 70px, rgba(34,211,238,0.2), transparent), radial-gradient(1px 1px at 90px 40px, rgba(59,130,246,0.4), transparent)",
                      backgroundRepeat: "repeat",
                      backgroundSize: "100px 50px"
                    }}></div>
                  </div>
                  
                  <div className="relative w-full h-full bg-black/60 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        className="w-32 h-32 mx-auto mb-6 relative"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-xl"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full border border-blue-400/30 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="space-y-2">
                        <div className="font-mono-enhanced text-mono-caption text-blue-400 text-glow-blue">SYSTEM INTERFACE</div>
                        <div className="font-space-enhanced text-subhead text-white/80">OpsPipe Command Center</div>
                        <div className="px-3 py-1 bg-black/40 rounded-full border border-blue-400/30 inline-block">
                          <span className="font-mono-enhanced text-mono-caption text-white/60">OPERATIONAL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Operational Excellence
            </h2>
            <p className="body-large text-white/80 max-w-3xl mx-auto text-shadow-technical">
              Transform your operations with <span className="gradient-text-technical text-glow-cyan">intelligent automation</span> that adapts, learns, and scales with your business requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mobile-grid">
            {[
              {
                icon: "🤖",
                title: "Autonomous Agents",
                description: "AI-powered agents that handle complex operational tasks with minimal human intervention.",
                color: "blue",
                gradient: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-400/30"
              },
              {
                icon: "📊",
                title: "Real-Time Analytics",
                description: "Comprehensive dashboards providing instant insights into operational performance and bottlenecks.",
                color: "orange",
                gradient: "from-orange-500/20 to-amber-500/20",
                border: "border-orange-400/30"
              },
              {
                icon: "⚡",
                title: "Intelligent Workflows",
                description: "Dynamic process automation that adapts to changing conditions and optimizes efficiency.",
                color: "lime",
                gradient: "from-lime-500/20 to-emerald-500/20",
                border: "border-lime-400/30"
              },
              {
                icon: "🛡️",
                title: "Defense-Grade Security",
                description: "Enterprise security protocols with end-to-end encryption and audit trails.",
                color: "purple",
                gradient: "from-purple-500/20 to-violet-500/20",
                border: "border-purple-400/30"
              },
              {
                icon: "🔗",
                title: "Seamless Integration",
                description: "Connect with existing tools and systems through robust APIs and connectors.",
                color: "cyan",
                gradient: "from-cyan-500/20 to-teal-500/20",
                border: "border-cyan-400/30"
              },
              {
                icon: "📈",
                title: "Predictive Scaling",
                description: "Machine learning algorithms that predict and prepare for operational demands.",
                color: "emerald",
                gradient: "from-emerald-500/20 to-green-500/20",
                border: "border-emerald-400/30"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`backdrop-blur-2xl bg-gradient-to-br ${feature.gradient} ${feature.border} border rounded-xl p-6 hover-lift-technical mobile-card`}
              >
                <div className="text-4xl mb-4 float-technical">{feature.icon}</div>
                <h3 className={`feature-title text-${feature.color}-400 text-glow-${feature.color} mb-3`}>
                  {feature.title}
                </h3>
                <p className="body-technical text-white/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Enhanced Architecture Section */}
        <section id="architecture" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-premium text-glow-orange mb-6">
              System Architecture
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Built on a <span className="gradient-text-technical text-glow-cyan">microservices architecture</span> that ensures scalability, reliability, and <span className="gradient-text-operational text-glow-lime">operational excellence</span> at enterprise scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-8 mb-12"
          >
            <OpsPipeArchitectureDiagram />
          </motion.div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-secondary border border-operational-secondary rounded-xl p-6"
            >
              <h3 className="section-subtitle text-orange-400 text-glow-orange mb-6">
                Core Components
              </h3>
              <div className="space-y-4">
                {[
                  { label: "OpsPipe OS", desc: "AI-powered orchestration engine", status: "ACTIVE" },
                  { label: "State Machine", desc: "Workflow coordination system", status: "OPERATIONAL" },
                  { label: "Decision Engine", desc: "Intelligent routing and logic", status: "OPTIMIZED" },
                  { label: "Recovery Manager", desc: "Fault tolerance and healing", status: "STANDBY" }
                ].map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-orange-400/20">
                    <div>
                      <div className="feature-title text-white">{component.label}</div>
                      <div className="body-technical text-white/60">{component.desc}</div>
                    </div>
                    <div className={`caption-technical px-3 py-1 rounded-full ${
                      component.status === 'ACTIVE' ? 'bg-blue-400/20 text-blue-400' :
                      component.status === 'OPERATIONAL' ? 'bg-lime-400/20 text-lime-400' :
                      component.status === 'OPTIMIZED' ? 'bg-emerald-400/20 text-emerald-400' :
                      'bg-orange-400/20 text-orange-400'
                    }`}>
                      {component.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-premium border border-operational-premium rounded-xl p-6"
            >
              <h3 className="section-subtitle text-purple-400 text-glow-purple mb-6">
                Performance Metrics
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "Throughput", value: "1.2K ops/sec", change: "+15%", color: "cyan" },
                  { metric: "Latency", value: "< 50ms", change: "-23%", color: "lime" },
                  { metric: "Availability", value: "99.97%", change: "+0.02%", color: "emerald" },
                  { metric: "Error Rate", value: "0.03%", change: "-67%", color: "blue" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="body-technical text-white/80">{stat.metric}</div>
                    <div className="text-right">
                      <div className={`feature-title text-${stat.color}-400 text-glow-${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className={`caption-technical text-${stat.color}-300`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Mission Scenarios - Interactive Timeline Design */}
        <section id="scenarios" className="py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
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
            </motion.div>

            {/* Interactive Timeline */}
            <div className="relative">
              {/* Timeline Line - Hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400/30 via-cyan-400/50 to-lime-400/30 rounded-full"></div>
              
              {/* Timeline Nodes */}
              <div className="space-y-6 md:space-y-16">
                {[
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
                ].map((item, index) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${item.side === 'left' ? 'md:justify-start' : 'md:justify-end'} justify-center`}
                  >
                    {/* Timeline Node - Desktop only */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div
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
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <motion.div
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
                              <motion.div
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
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Background Elements - Reduced count */}
              <div className="absolute inset-0 -z-10">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced LEGIT Framework Section */}
        <section id="legit" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-technical text-glow-cyan mb-6">
              LEGIT Framework
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Our <span className="gradient-text-premium text-glow-orange">Logged, Enforced, Grounded, Isolated, Tested</span> framework ensures every operation meets the highest standards of <span className="gradient-text-operational text-glow-lime">reliability and accountability</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mobile-grid">
            {[
              {
                icon: "📝",
                title: "Logged", 
                description: "Complete audit trails with detailed operation logging and traceability.",
                color: "blue",
                gradient: "from-blue-500/20 to-blue-600/20"
              },
              {
                icon: "⚖️",
                title: "Enforced",
                description: "Strict policy enforcement with automated compliance monitoring.",
                color: "orange",
                gradient: "from-orange-500/20 to-amber-600/20"
              },
              {
                icon: "🧠",
                title: "Grounded", 
                description: "All data processing follows strict schema validation rules.",
                color: "cyan",
                gradient: "from-cyan-500/20 to-teal-600/20"
              },
              {
                icon: "🛡️",
                title: "Isolated",
                description: "Each operation runs in its own context without shared state risk.",
                color: "purple",
                gradient: "from-purple-500/20 to-violet-600/20"
              },
              {
                icon: "✅",
                title: "Tested",
                description: "Continuous evaluation ensures consistent and reliable results.",
                color: "emerald",
                gradient: "from-emerald-500/20 to-green-600/20"
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`backdrop-blur-2xl bg-gradient-to-br ${principle.gradient} border border-${principle.color}-400/30 rounded-xl p-6 text-center hover-lift-technical mobile-card`}
              >
                <div className="text-3xl mb-4 float-technical">{principle.icon}</div>
                <h3 className={`feature-title text-${principle.color}-400 text-glow-${principle.color} mb-3`}>
                  {principle.title}
                </h3>
                <p className="body-technical text-white/70">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced Use Cases Gallery - Mission Scenarios */}
        <section id="use-cases" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Mission Scenarios
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Real-world <span className="gradient-text-technical text-glow-cyan">operational deployments</span> across industries, demonstrating OpsPipe's <span className="gradient-text-premium text-glow-orange">versatility and impact</span> in transforming business processes.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mobile-grid">
            {[
              {
                title: "Financial Document Processing",
                description: "Ideal for growing businesses buried in receipts and invoices. OpsPipe parses documents, checks for errors, and auto-generates summaries — ready to sync with Xero, QuickBooks, or local accountants.\n\nCloses the gap between small ops and real bookkeeping, with zero manual entry.",
                icon: "💼",
                coordinates: "FDP-001",
                color: "blue",
                gradient: "from-blue-500/20 to-cyan-500/20",
                industry: "Financial Services"
              },
              {
                title: "F&B Back-Office Automation",
                description: "Streamline supplier invoices, inventory counts, and delivery platform sync. OpsPipe runs loops for restaurant chains, cafes, and hotels — no full-time admin needed.\n\nYou stay focused on food, we handle the paperwork.",
                icon: "🍽️",
                coordinates: "FNB-002",
                color: "orange",
                gradient: "from-orange-500/20 to-amber-500/20",
                industry: "Food & Beverage"
              },
              {
                title: "Clinic Intake & Record Flow",
                description: "Simplifies form intake, ID validation, and patient routing. Clinics use OpsPipe to collect and process patient data while staying compliant and secure.\n\nCuts down wait times and admin load without touching your EMR.",
                icon: "🏥",
                coordinates: "HCR-003",
                color: "emerald",
                gradient: "from-emerald-500/20 to-green-500/20",
                industry: "Healthcare"
              },
              {
                title: "Academic Data Management",
                description: "Researchers and departments use OpsPipe to process survey data, lab reports, and grant paperwork. Auto-tagged, versioned, and export-ready — without spending hours on formatting.\n\nPerfect for teams who publish, not wrangle PDFs.",
                icon: "🎓",
                coordinates: "ADM-004",
                color: "purple",
                gradient: "from-purple-500/20 to-violet-500/20",
                industry: "Education"
              },
              {
                title: "Retail Ops + Metrics Loop",
                description: "Daily receipts, stock counts, vendor slips — OpsPipe turns it all into structured dashboards. Supports POS exports, trend snapshots, and alert flags for busy stores.\n\nNo more waiting for accounting to understand what's happening in your own shop.",
                icon: "🛍️",
                coordinates: "RTL-005",
                color: "lime",
                gradient: "from-lime-500/20 to-emerald-500/20",
                industry: "Retail"
              },
              {
                title: "Personal Doc Manager",
                description: "A future consumer app powered by OpsPipe — designed to manage life's paperwork with zero stress. From receipts and bills to school forms and IDs, everything is auto-sorted, summarized, and searchable.\n\nOps-grade infrastructure, simplified for everyday use.",
                icon: "📂",
                coordinates: "PDM-006",
                color: "cyan",
                gradient: "from-cyan-500/20 to-teal-500/20",
                industry: "Consumer"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className={`backdrop-blur-2xl bg-gradient-to-br ${useCase.gradient} border border-${useCase.color}-400/30 rounded-xl p-6 shadow-2xl shadow-black/60 hover:border-${useCase.color}-400/50 hover-lift-technical h-full flex flex-col mobile-card`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl float-technical">{useCase.icon}</div>
                    <div className={`caption-technical text-${useCase.color}-400 text-glow-${useCase.color} bg-black/30 px-2 py-1 rounded border border-${useCase.color}-400/30`}>
                      {useCase.coordinates}
                    </div>
                  </div>
                  
                  <div className={`caption-technical text-${useCase.color}-300 mb-2`}>
                    {useCase.industry}
                  </div>
                  
                  <h3 className={`feature-title text-${useCase.color}-400 text-glow-${useCase.color} mb-3 group-hover:text-${useCase.color}-300 transition-colors duration-300`}>
                    {useCase.title}
                  </h3>
                  
                  <p className="body-technical text-white/70 whitespace-pre-line leading-relaxed flex-grow">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Integration Ecosystem Section */}
        <section id="integrations" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-premium text-glow-orange mb-6">
              Integration Ecosystem
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              OpsPipe connects seamlessly with your existing <span className="gradient-text-technical text-glow-cyan">technology stack</span>, providing <span className="gradient-text-operational text-glow-lime">unified operational control</span> across all your business systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mobile-grid">
            {/* Input Sources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-accent border border-operational-accent rounded-xl p-8"
            >
              <h3 className="section-subtitle text-lime-400 text-glow-lime mb-6">
                📥 Input Sources
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Telegram Bot", desc: "Chat-based operations", status: "ACTIVE" },
                  { name: "File Upload", desc: "Document processing", status: "READY" },
                  { name: "POS Systems", desc: "Retail integration", status: "BETA" },
                  { name: "API Gateway", desc: "REST/GraphQL", status: "STABLE" },
                  { name: "Email Parser", desc: "Automated intake", status: "DEV" },
                  { name: "Web Forms", desc: "Direct submission", status: "ACTIVE" }
                ].map((source, index) => (
                  <div key={index} className="bg-black/20 p-3 rounded-lg border border-lime-400/20">
                    <div className="feature-title text-white text-sm mb-1">{source.name}</div>
                    <div className="body-technical text-white/60 text-xs mb-2">{source.desc}</div>
                    <div className={`caption-technical px-2 py-1 rounded-full text-xs ${
                      source.status === 'ACTIVE' ? 'bg-emerald-400/20 text-emerald-400' :
                      source.status === 'STABLE' ? 'bg-blue-400/20 text-blue-400' :
                      source.status === 'READY' ? 'bg-cyan-400/20 text-cyan-400' :
                      source.status === 'BETA' ? 'bg-orange-400/20 text-orange-400' :
                      'bg-purple-400/20 text-purple-400'
                    }`}>
                      {source.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Output Systems */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-premium border border-operational-premium rounded-xl p-8"
            >
              <h3 className="section-subtitle text-purple-400 text-glow-purple mb-6">
                📤 Output Systems
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "OpsCockpit", desc: "Real-time dashboard", status: "LIVE" },
                  { name: "Web Admin", desc: "Control panel", status: "STABLE" },
                  { name: "OpsField Mobile", desc: "Field operations", status: "BETA" },
                  { name: "StaffBot", desc: "Team notifications", status: "ACTIVE" },
                  { name: "Knowledge Base", desc: "Documentation", status: "AUTO" },
                  { name: "Data Exports", desc: "Analytics feeds", status: "READY" }
                ].map((output, index) => (
                  <div key={index} className="bg-black/20 p-3 rounded-lg border border-purple-400/20">
                    <div className="feature-title text-white text-sm mb-1">{output.name}</div>
                    <div className="body-technical text-white/60 text-xs mb-2">{output.desc}</div>
                    <div className={`caption-technical px-2 py-1 rounded-full text-xs ${
                      output.status === 'LIVE' ? 'bg-emerald-400/20 text-emerald-400' :
                      output.status === 'STABLE' ? 'bg-blue-400/20 text-blue-400' :
                      output.status === 'ACTIVE' ? 'bg-cyan-400/20 text-cyan-400' :
                      output.status === 'BETA' ? 'bg-orange-400/20 text-orange-400' :
                      output.status === 'AUTO' ? 'bg-lime-400/20 text-lime-400' :
                      'bg-purple-400/20 text-purple-400'
                    }`}>
                      {output.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enterprise Connectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 backdrop-blur-2xl bg-operational-secondary border border-operational-secondary rounded-xl p-8"
          >
            <h3 className="section-subtitle text-orange-400 text-glow-orange mb-6 text-center">
              🔗 Enterprise Connectors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mobile-grid">
              {[
                { name: "Xero", type: "Accounting" },
                { name: "QuickBooks", type: "Finance" },
                { name: "Slack", type: "Communication" },
                { name: "Teams", type: "Collaboration" },
                { name: "Salesforce", type: "CRM" },
                { name: "HubSpot", type: "Marketing" },
                { name: "Shopify", type: "E-commerce" },
                { name: "AWS", type: "Cloud" },
                { name: "Azure", type: "Platform" },
                { name: "GCP", type: "Infrastructure" },
                { name: "Stripe", type: "Payments" },
                { name: "Zapier", type: "Automation" }
              ].map((connector, index) => (
                <div key={index} className="bg-black/20 p-3 rounded-lg border border-orange-400/20 text-center mobile-card">
                  <div className="feature-title text-white text-sm mb-1">{connector.name}</div>
                  <div className="caption-technical text-orange-300 text-xs">{connector.type}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Performance Metrics & ROI Section */}
        <section id="performance" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-technical text-glow-cyan mb-6">
              Quantified Impact
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Measurable <span className="gradient-text-premium text-glow-orange">operational improvements</span> and <span className="gradient-text-operational text-glow-lime">ROI metrics</span> from real OpsPipe deployments across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mobile-grid mb-16">
            {[
              {
                metric: "Processing Speed",
                value: "10x",
                improvement: "faster document processing",
                color: "blue",
                icon: "⚡"
              },
              {
                metric: "Error Reduction",
                value: "94%",
                improvement: "fewer manual errors",
                color: "emerald",
                icon: "🎯"
              },
              {
                metric: "Cost Savings",
                value: "$50K+",
                improvement: "annual operational savings",
                color: "orange",
                icon: "💰"
              },
              {
                metric: "Time Recovery",
                value: "15hrs",
                improvement: "per week saved per team",
                color: "purple",
                icon: "⏰"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`backdrop-blur-2xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 border border-${stat.color}-400/30 rounded-xl p-6 text-center hover-lift-technical mobile-card`}
              >
                <div className="text-3xl mb-4 float-technical">{stat.icon}</div>
                <div className={`hero-subtitle text-${stat.color}-400 text-glow-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className={`feature-title text-${stat.color}-300 mb-2`}>
                  {stat.metric}
                </div>
                <div className="body-technical text-white/70">
                  {stat.improvement}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI Calculator Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-8"
          >
            <h3 className="section-subtitle text-blue-400 text-glow-blue mb-6 text-center">
              📊 ROI Impact Calculator
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-grid">
              <div className="text-center">
                <div className="caption-technical text-cyan-400 text-glow-cyan mb-2">CURRENT MANUAL HOURS</div>
                <div className="hero-subtitle text-white mb-2">40hrs/week</div>
                <div className="body-technical text-white/60">Average team processing time</div>
              </div>
              <div className="text-center">
                <div className="caption-technical text-lime-400 text-glow-lime mb-2">WITH OPSPIPE</div>
                <div className="hero-subtitle text-lime-400 text-glow-lime mb-2">4hrs/week</div>
                <div className="body-technical text-white/60">90% automation achieved</div>
              </div>
              <div className="text-center">
                <div className="caption-technical text-orange-400 text-glow-orange mb-2">ANNUAL SAVINGS</div>
                <div className="hero-subtitle text-orange-400 text-glow-orange mb-2">$75,600</div>
                <div className="body-technical text-white/60">Based on $40/hr operational cost</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Customer Success Stories */}
        <section id="success-stories" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Mission Success Stories
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Real results from <span className="gradient-text-premium text-glow-orange">operational transformations</span> across diverse industries and <span className="gradient-text-technical text-glow-cyan">business scales</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-grid">
            {[
              {
                company: "TechFlow Solutions",
                industry: "SaaS Startup",
                challenge: "Manual invoice processing consuming 20+ hours weekly",
                solution: "OpsPipe automated document parsing and validation workflows",
                result: "95% time reduction, zero processing errors in 6 months",
                metrics: { time: "18hrs saved/week", accuracy: "100%", roi: "340%" },
                color: "blue",
                avatar: "🏢"
              },
              {
                company: "Coastal Cafe Chain",
                industry: "Food & Beverage",
                challenge: "Multiple location inventory and supplier coordination chaos",
                solution: "Unified OpsPipe dashboard with real-time supplier sync",
                result: "Streamlined operations across 12 locations with predictive inventory",
                metrics: { efficiency: "+85%", waste: "-60%", profit: "+23%" },
                color: "orange",
                avatar: "☕"
              },
              {
                company: "MedCore Clinics",
                industry: "Healthcare",
                challenge: "Patient intake bottlenecks and compliance documentation",
                solution: "HIPAA-compliant OpsPipe workflows for patient processing",
                result: "50% faster patient onboarding with complete audit trails",
                metrics: { speed: "+120%", compliance: "100%", satisfaction: "+45%" },
                color: "emerald",
                avatar: "🏥"
              },
              {
                company: "Research University",
                industry: "Education",
                challenge: "Grant application and research data management inefficiencies",
                solution: "Academic-focused OpsPipe with automated report generation",
                result: "Doubled research output with standardized documentation",
                metrics: { output: "+200%", accuracy: "99.8%", time: "25hrs saved/week" },
                color: "purple",
                avatar: "🎓"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`backdrop-blur-2xl bg-gradient-to-br from-${story.color}-500/20 to-${story.color}-600/20 border border-${story.color}-400/30 rounded-xl p-8 hover-lift-technical mobile-card`}
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{story.avatar}</div>
                  <div>
                    <h3 className={`feature-title text-${story.color}-400 text-glow-${story.color}`}>
                      {story.company}
                    </h3>
                    <div className={`caption-technical text-${story.color}-300`}>
                      {story.industry}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="caption-technical text-white/60 mb-1">CHALLENGE</div>
                    <div className="body-technical text-white/80">{story.challenge}</div>
                  </div>
                  <div>
                    <div className="caption-technical text-white/60 mb-1">SOLUTION</div>
                    <div className="body-technical text-white/80">{story.solution}</div>
                  </div>
                  <div>
                    <div className="caption-technical text-white/60 mb-1">RESULT</div>
                    <div className={`body-technical text-${story.color}-300`}>{story.result}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(story.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center p-3 bg-black/20 rounded-lg border border-white/10">
                      <div className={`feature-title text-${story.color}-400 text-glow-${story.color} text-sm`}>
                        {value}
                      </div>
                      <div className="caption-technical text-white/60 text-xs uppercase">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-10 shadow-2xl shadow-black/60 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="font-space-enhanced text-display text-premium mb-6">
              Own Your <span className="gradient-blue-cyan text-glow-blue">Operations</span>
            </h2>
            
            <p className="text-body-enhanced text-white/80 text-readable mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your operational workflow with enterprise-grade automation and intelligence that scales with your business.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 text-glow-blue mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Mission Control
              </Link>
              <Link
                to="/codelab"
                className="inline-flex items-center bg-black/50 border border-blue-400/30 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:border-blue-400/50 hover:bg-black/70"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Access Engineering Bay
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <ScrollToTop />
      <MissionControlNavbar />
      <FooterExperience />
    </div>
  );
} 