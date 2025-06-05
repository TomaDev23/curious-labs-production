/**
 * @component UnifiedWebGLProvider
 * @description Single WebGL context provider to replace multiple Canvas contexts
 * @version 1.0.0
 * @priority CRITICAL - Fixes 19 WebGL contexts disaster
 */

import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';

// Create the context
const WebGLContext = createContext(null);

// Custom hook to use the unified WebGL context
export const useUnifiedWebGL = () => {
  const context = useContext(WebGLContext);
  if (!context) {
    throw new Error('useUnifiedWebGL must be used within UnifiedWebGLProvider');
  }
  return context;
};

// Scene registry to manage multiple 3D scenes
class SceneRegistry {
  constructor() {
    this.scenes = new Map();
    this.activeScene = null;
  }

  registerScene(id, component) {
    this.scenes.set(id, component);
    console.log(`🎮 Scene registered: ${id}`);
  }

  unregisterScene(id) {
    this.scenes.delete(id);
    console.log(`🎮 Scene unregistered: ${id}`);
  }

  setActiveScene(id) {
    if (this.scenes.has(id)) {
      this.activeScene = id;
      console.log(`🎮 Active scene: ${id}`);
    }
  }

  getActiveComponent() {
    return this.activeScene ? this.scenes.get(this.activeScene) : null;
  }
}

const sceneRegistry = new SceneRegistry();

export const UnifiedWebGLProvider = ({ children }) => {
  const canvasRef = useRef();
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeScene, setActiveScene] = useState(null);

  // Single WebGL capability check
  const webglCapabilities = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        setWebglSupported(false);
        return null;
      }

      const capabilities = {
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        isWebGL2: gl instanceof WebGL2RenderingContext
      };

      // Clean up test context
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();

      console.log('🎮 Unified WebGL Capabilities:', capabilities);
      return capabilities;
    } catch (error) {
      console.warn('🚨 WebGL not supported:', error);
      setWebglSupported(false);
      return null;
    }
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    canvasRef,
    webglSupported,
    capabilities: webglCapabilities,
    sceneRegistry,
    activeScene,
    setActiveScene: (sceneId) => {
      sceneRegistry.setActiveScene(sceneId);
      setActiveScene(sceneId);
    }
  }), [webglSupported, webglCapabilities, activeScene]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Unified WebGL Provider cleanup');
      sceneRegistry.scenes.clear();
    };
  }, []);

  if (!webglSupported) {
    return (
      <WebGLContext.Provider value={contextValue}>
        <div className="webgl-fallback">
          <p>WebGL is not supported in your browser.</p>
          {children}
        </div>
      </WebGLContext.Provider>
    );
  }

  return (
    <WebGLContext.Provider value={contextValue}>
      <div className="unified-webgl-container">
        {/* Single Canvas for all 3D rendering */}
        <Canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          camera={{
            position: [0, 0, 5],
            fov: 75
          }}
        >
          {/* Render active scene component */}
          {activeScene && sceneRegistry.getActiveComponent()}
        </Canvas>
        
        {/* UI components render on top */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </div>
    </WebGLContext.Provider>
  );
};

// HOC to register 3D scenes
export const withUnifiedWebGL = (WrappedComponent, sceneId) => {
  return React.forwardRef((props, ref) => {
    const { sceneRegistry, setActiveScene } = useUnifiedWebGL();

    useEffect(() => {
      // Register scene
      sceneRegistry.registerScene(sceneId, <WrappedComponent {...props} ref={ref} />);
      
      // Auto-activate if first scene
      if (sceneRegistry.scenes.size === 1) {
        setActiveScene(sceneId);
      }

      return () => {
        sceneRegistry.unregisterScene(sceneId);
      };
    }, [sceneRegistry, setActiveScene, props]);

    // Return null - component renders in unified canvas
    return null;
  });
};

export default UnifiedWebGLProvider; 