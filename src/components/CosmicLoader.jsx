import React from 'react';
import { motion } from '../FramerProvider';


const CosmicLoader = ({ message = "🚀 Warming up the engines..." }) => {
  return (
    <div className="cosmic-loader-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ fontSize: '4rem', marginBottom: '2rem' }}
      >
        🪐
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          fontSize: '1.5rem',
          textAlign: 'center',
          fontWeight: '300',
          letterSpacing: '0.1em',
          marginBottom: '1rem'
        }}
      >
        {message}
      </motion.h2>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #00f5ff, #ff006e, #8338ec)',
          borderRadius: '1px'
        }}
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        style={{
          fontSize: '0.9rem',
          marginTop: '1.5rem',
          color: '#cccccc',
          fontStyle: 'italic'
        }}
      >
        Preparing cosmic interface...
      </motion.p>
    </div>
  );
};

export default CosmicLoader; 