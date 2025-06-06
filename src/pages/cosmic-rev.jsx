/**
 * @component CosmicRevPage
 * @description Cosmic revision interface - 3D route with delayed loading
 */

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load 3D components for this route
const Hero3DPlanet = lazy(() => import('../components/Hero3DPlanet'));
const CosmicRevDev = lazy(() => import('./CosmicRevDev'));

const CosmicRevPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Cosmic <span className="text-purple-400">Revision</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Experience the evolution of cosmic interfaces with advanced 3D rendering and stellar navigation.
          </p>
        </motion.div>
        
        {/* 3D Planet Component */}
        <div className="relative">
          <Suspense fallback={
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse" />
          }>
            <Hero3DPlanet />
          </Suspense>
        </div>
        
        {/* Original CosmicRevDev content */}
        <div className="mt-8">
          <Suspense fallback={null}>
            <CosmicRevDev />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CosmicRevPage; 