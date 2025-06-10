import React from 'react';
import SmartLazySection from './SmartLazySection';
import { LOADING_STRATEGIES } from '../../config/lazyLoadingStrategies';

/**
 * @component SmartLazyTest
 * @description Test component to validate smart loading strategies
 * @version 1.0.0
 */

// Simulate actual homepage components with realistic content
const TestSection = ({ name, priority, size, description, color = "lime-400" }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
    <div className="text-center max-w-2xl px-8">
      <h2 className={`text-${color} text-4xl font-bold mb-4`}>{name}</h2>
      <p className="text-white/70 text-lg mb-6">✅ Component loaded successfully!</p>
      
      <div className="bg-black/40 border border-lime-400/20 rounded-lg p-6 space-y-3">
        <div className="text-white/90 font-semibold">Loading Strategy Info:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-white/60">Priority</div>
            <div className={`font-bold ${priority === 'high' ? 'text-red-400' : priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
              {priority}
            </div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Bundle Size</div>
            <div className="text-lime-400 font-bold">{size}</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Load Distance</div>
            <div className="text-emerald-400 font-bold">{LOADING_STRATEGIES[name]?.rootMargin || 'N/A'}</div>
          </div>
        </div>
        <div className="text-white/50 text-xs mt-4 italic">{description}</div>
      </div>
    </div>
  </div>
);

const SmartLazyTest = () => {
  return (
    <div className="w-full">
      {/* Hero - Always visible (no lazy loading) */}
      <TestSection 
        name="HeroAtomic" 
        priority="critical"
        size="12KB"
        description="Above fold content - loads immediately for optimal LCP"
        color="red-400"
      />
      
      {/* Mission - Smart lazy loading with high priority */}
      <SmartLazySection 
        componentName="MissionAtomic"
        debug={true}
      >
        <TestSection 
          name="MissionAtomic" 
          priority="high"
          size="20KB"
          description="High engagement section - loads early as users always scroll here"
          color="lime-400"
        />
      </SmartLazySection>
      
      {/* Products - Heavy component with strategic loading */}
      <SmartLazySection 
        componentName="HorizontalProductScrollV6"
        debug={true}
      >
        <TestSection 
          name="HorizontalProductScrollV6" 
          priority="high"
          size="86KB"
          description="Heavy component - preemptive loading to avoid perceived lag"
          color="orange-400"
        />
      </SmartLazySection>
      
      {/* Services - Standard lazy loading */}
      <SmartLazySection 
        componentName="ServicesOrbitalAtomic"
        debug={true}
      >
        <TestSection 
          name="ServicesOrbitalAtomic" 
          priority="medium"
          size="11KB"
          description="Medium component - standard viewport-based loading"
          color="emerald-400"
        />
      </SmartLazySection>
      
      {/* Contact - Late loading for footer */}
      <SmartLazySection 
        componentName="ContactTerminalAtomic"
        debug={true}
      >
        <TestSection 
          name="ContactTerminalAtomic" 
          priority="low"
          size="9KB"
          description="Footer component - conservative loading to prioritize above content"
          color="cyan-400"
        />
      </SmartLazySection>
    </div>
  );
};

export default SmartLazyTest; 