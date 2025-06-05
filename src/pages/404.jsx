import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Enhanced 404 Page
 * - Provides helpful navigation links back to main pages
 * - Cosmic theme integration
 * - Helpful error messaging
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">      
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-30 bg-repeat"></div>
      </div>
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
      
      <div className="relative z-10 max-w-xl w-full text-center">
        <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          🛸 404
        </h1>
        
        <p className="text-2xl mb-8">
          🚀 Houston, We Have a Problem
        </p>
        
        <p className="text-gray-400 mb-8">
          Mission Control cannot locate the requested coordinates. This sector of space appears to be uncharted. HQ is on it!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Return to Base
          </Link>
          <Link 
            to="/cosmic-rev" 
            className="px-6 py-3 border border-purple-600 hover:bg-purple-600/20 rounded-lg transition-colors"
          >
            Explore Cosmic Rev
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 