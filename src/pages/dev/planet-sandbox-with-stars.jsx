/**
 * @component PlanetSandboxWithStarsPage
 * @description Planet sandbox development with stellar background - 3D route with delayed loading
 */

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// TEMPORARILY DISABLED: const Hero3DPlanet = lazy(() => import('../../components/Hero3DPlanet'));

const PlanetSandboxWithStarsPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Stellar background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-black to-purple-900/30" />
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Planet <span className="text-blue-400">Sandbox</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Development environment for planetary systems with stellar backgrounds and advanced 3D rendering.
          </p>
        </motion.div>
        
        {/* Multiple 3D Planets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="relative">
            <h3 className="text-lg text-white/80 mb-4 text-center">Primary Planet</h3>
            <div className="absolute inset-0 flex flex-col gap-8">
              {/* First Planet */}
              <div className="flex-1 flex items-center justify-center">
                {/* TEMPORARILY DISABLED: <Hero3DPlanet /> */}
                <div className="text-lime-400 text-lg">🌍 Planet Sandbox Disabled</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <h3 className="text-lg text-white/80 mb-4 text-center">Secondary Planet</h3>
            <div className="absolute inset-0 flex flex-col gap-8">
              {/* Second Planet */}
              <div className="flex-1 flex items-center justify-center">
                {/* TEMPORARILY DISABLED: <Hero3DPlanet /> */}
                <div className="text-lime-400 text-lg">🪐 Coming in V8</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Development Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 max-w-2xl"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-xl text-white font-semibold mb-4">Development Controls</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 py-2 px-4 rounded border border-blue-500/30 transition-colors">
                Reset Rotation
              </button>
              <button className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-2 px-4 rounded border border-purple-500/30 transition-colors">
                Toggle Animation
              </button>
              <button className="bg-green-600/20 hover:bg-green-600/30 text-green-300 py-2 px-4 rounded border border-green-500/30 transition-colors">
                Add Stars
              </button>
              <button className="bg-red-600/20 hover:bg-red-600/30 text-red-300 py-2 px-4 rounded border border-red-500/30 transition-colors">
                Clear Scene
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanetSandboxWithStarsPage; 