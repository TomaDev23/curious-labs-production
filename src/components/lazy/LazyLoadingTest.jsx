import React from 'react';
import LazySection from './LazySection';

/**
 * @component LazyLoadingTest
 * @description Test component to validate lazy loading infrastructure
 * @version 1.0.0
 */

// Simple test components to simulate homepage sections
const TestSection = ({ name, color = "lime-400", height = "min-h-screen" }) => (
  <div className={`${height} flex items-center justify-center bg-gradient-to-b from-black to-gray-900`}>
    <div className="text-center">
      <h2 className={`text-${color} text-4xl font-bold mb-4`}>{name} Section</h2>
      <p className="text-white/70 text-lg">This section loaded successfully!</p>
      <div className={`mt-4 text-${color}/60 text-sm`}>
        Simulating: {name} Component
      </div>
    </div>
  </div>
);

const LazyLoadingTest = () => {
  return (
    <div className="w-full">
      {/* Always visible section */}
      <TestSection name="Hero" color="lime-400" />
      
      {/* Lazy loaded sections with different offsets */}
      <LazySection 
        offset="100vh" 
        sectionName="Mission"
        debug={true}
      >
        <TestSection name="Mission" color="emerald-400" />
      </LazySection>
      
      <LazySection 
        offset="75vh" 
        sectionName="Products"
        debug={true}
      >
        <TestSection name="Products" color="cyan-400" />
      </LazySection>
      
      <LazySection 
        offset="50vh" 
        sectionName="Services"
        debug={true}
      >
        <TestSection name="Services" color="blue-400" />
      </LazySection>
      
      <LazySection 
        offset="25vh" 
        sectionName="Contact"
        debug={true}
      >
        <TestSection name="Contact" color="purple-400" />
      </LazySection>
    </div>
  );
};

export default LazyLoadingTest; 