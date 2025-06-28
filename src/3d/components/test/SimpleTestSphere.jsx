/**
 * @component SimpleTestSphere
 * @description Simple test sphere to validate UnifiedWebGLProvider functionality
 * @version 1.0.0
 * @priority TEST - Infrastructure validation
 */

import React, { useRef } from 'react';
import useGlobalFrame from '../../hooks/useGlobalFrame';

const SimpleTestSphere = ({ color = '#ff6b6b', position = [0, 0, 0] }) => {
  const meshRef = useRef();

  // Simple rotation animation
  useGlobalFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  }, 'low'); // Low priority for test component

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </mesh>
  );
};

export default SimpleTestSphere; 