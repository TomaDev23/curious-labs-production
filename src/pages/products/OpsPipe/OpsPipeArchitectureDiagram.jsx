import React, { useState, useEffect } from 'react';

/**
 * OpsPipe Architecture Diagram Component
 * Renders a Mermaid flowchart showing the OpsPipe system architecture
 * with fallback to static grid layout if Mermaid fails to load
 */
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

export default OpsPipeArchitectureDiagram; 