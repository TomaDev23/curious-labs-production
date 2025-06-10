import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Safe Emergency Fallback Page
 * - Houston themed emergency protocol
 * - Clean cosmic styling consistent with 404 page
 * - Minimal dependencies for maximum reliability
 */
const SafeV4CosmicPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">      
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-30 bg-repeat"></div>
      </div>
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          🚀 Houston, We Have a Problem
        </h1>
        
        <p className="text-xl md:text-2xl mb-6 text-gray-300">
          Mission Control has detected an anomaly in the main systems.
        </p>
        
        <p className="text-gray-400 mb-8 text-lg">
          Emergency Protocol Active • HQ Engineering Team Deployed • Full cosmic experience restoration in progress
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link 
            to="/" 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
          >
            Return to Base Station
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 border border-purple-600 hover:bg-purple-600/20 rounded-lg transition-colors font-medium"
          >
            Retry Mission Launch
          </button>
          <Link 
            to="/cosmic-rev" 
            className="px-6 py-3 border border-blue-600 hover:bg-blue-600/20 rounded-lg transition-colors font-medium"
          >
            Emergency Navigation
          </Link>
        </div>
        
        {/* Emergency Protocol Status */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          <div className="flex items-center justify-center mb-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-lg font-semibold text-orange-400">🛠️ Emergency Protocol Status</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            This is Mission Control's emergency fallback system. All essential systems remain operational. 
            Primary site functionality will be restored automatically once diagnostics complete.
          </p>
          <div className="mt-4 text-xs text-gray-500">
            Fallback System ID: SAFE-V4-COSMIC • Status: OPERATIONAL
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeV4CosmicPage; 