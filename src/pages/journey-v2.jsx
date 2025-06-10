import React, { Suspense, lazy } from 'react';

// 🚀 LAZY LOAD: Convert CosmicJourneyController to lazy loading for bundle optimization
const CosmicJourneyController = lazy(() => import('../components/journey/CosmicJourneyController'));

export default function JourneyV2() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/60 text-sm">Loading Cosmic Journey...</div>
        </div>
      }>
        <CosmicJourneyController />
      </Suspense>
    </div>
  );
} 