/**
 * @component AegisPlanet3DScene
 * @description 3D Planet scene isolated in /src/3d/ to prevent bundle contamination
 * @source Moved from src/components/hero/AegisPlanet3DV6.tsx
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Vector3, TextureLoader, ShaderMaterial, BackSide, AdditiveBlending } from 'three';

// 🌍 PLANET CORE
const Planet3DCore = ({
  rotationSpeed = 0.005,
  color = '#6366f1',
  scale = 1
}) => {
  const meshRef = useRef(null);
  const atmosphereRef = useRef(null);

  // Animate rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += rotationSpeed * 0.5;
    }
  });

  // Procedural material for planet surface
  const planetMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new Vector3(0.392, 0.4, 0.941) }, // #6366f1
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          pos += normal * sin(pos.x * 4.0 + time) * 0.02;
          pos += normal * sin(pos.y * 6.0 + time * 0.7) * 0.01;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = color * pow(intensity, 1.5);
          
          float pattern = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time * 0.5);
          vec3 surface = color + pattern * 0.1;
          
          gl_FragColor = vec4(mix(surface, atmosphere, intensity), 1.0);
        }
      `,
    });
  }, [color]);

  // Atmosphere glow material
  const atmosphereMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        color: { value: new Vector3(0.392, 0.4, 0.941) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      blending: AdditiveBlending,
      side: BackSide,
      transparent: true,
    });
  }, []);

  return (
    <group scale={scale}>
      {/* Main Planet */}
      <mesh ref={meshRef} scale={1}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={planetMaterial} attach="material" />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef} scale={1.05}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
      
      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.3}>
        <ringGeometry args={[0.95, 1.05, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// 🚀 MAIN SCENE COMPONENT
const AegisPlanet3DScene = ({
  interactive = false,
  scale = 1
}) => {
  // Camera settings optimized for planet viewing
  const cameraSettings = {
    fov: 45,
    position: new Vector3(3, 1, 3),
    near: 0.1,
    far: 1000
  };

  return (
    <Canvas shadows className="w-full h-full">
      {/* Camera */}
      <PerspectiveCamera makeDefault {...cameraSettings} />
      
      {/* Controls */}
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      )}

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#6366f1"
      />

      {/* Planet */}
      <Planet3DCore scale={scale} />

      {/* Environment */}
      <fog attach="fog" args={['#000000', 5, 15]} />
      <mesh position={[0, 0, -10]} scale={20}>
        <planeGeometry />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </Canvas>
  );
};

export default AegisPlanet3DScene; 