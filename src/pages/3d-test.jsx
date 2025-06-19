/**
 * @page 3d-test.jsx
 * @description Ultra-simple 3D test page for validating React Three Fiber
 * @version 1.1.0
 * @priority TEST - Basic compatibility validation
 */

import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Canvas, useFrame } from '@react-three/fiber';

// Ultra-simple rotating cube
function RotatingCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// Main test page
const Test3DPage = () => {
  return (
    <>
      <Helmet>
        <title>3D Test - CuriousLabs</title>
        <meta name="description" content="Testing React Three Fiber compatibility" />
      </Helmet>
      
      <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
        {/* 3D Canvas - Full Screen */}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ display: 'block' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Canvas>

        {/* UI Overlay */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          background: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 100
        }}>
          <h1>3D Infrastructure Test</h1>
          <p>✅ React Three Fiber: Active</p>
          <p>✅ Canvas: Rendering</p>
          <p>✅ Animation: Rotating cube</p>
          <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
            If you see a pink rotating cube, the 3D infrastructure is working correctly.
          </p>
        </div>
      </div>
    </>
  );
};

export default Test3DPage; 