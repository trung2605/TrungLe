import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Text3D, 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial,
  Environment,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import { useTheme } from '@mui/material';
import * as THREE from 'three';
import './Hero3DScene.scss';

// Floating spheres component
const FloatingSpheres = ({ count = 15 }) => {
  const theme = useTheme();
  
  const spheres = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
      color: theme.palette.primary.main,
    }));
  }, [count, theme.palette.primary.main]);

  return (
    <>
      {spheres.map((sphere) => (
        <FloatingSphere
          key={sphere.id}
          position={sphere.position}
          scale={sphere.scale}
          speed={sphere.speed}
          color={sphere.color}
        />
      ))}
    </>
  );
};

// Individual floating sphere
const FloatingSphere = ({ position, scale, speed, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 2) * 0.01;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={0.5}
    >
      <Sphere
        ref={meshRef}
        position={position}
        scale={scale}
        args={[1, 32, 32]}
      >
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Main geometric shape
const MainGeometry = () => {
  const theme = useTheme();
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.3}
    >
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color={theme.palette.primary.main}
          transparent
          opacity={0.8}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

// Animated particles
const Particles = ({ count = 100 }) => {
  const theme = useTheme();
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={theme.palette.primary.main}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Animated text (if we want 3D text)
const AnimatedText = ({ text = "Developer" }) => {
  const theme = useTheme();
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.1}
    >
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json" // You'll need to add this font file
        size={0.5}
        height={0.1}
        position={[-2, -2, 0]}
      >
        {text}
        <meshStandardMaterial
          color={theme.palette.secondary.main}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  );
};

// Main 3D Scene component
const Hero3DScene = ({ darkMode = false }) => {
  const theme = useTheme();

  return (
    <Canvas
      className="hero-canvas hero-canvas--fullscreen"
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 8]}
        fov={50}
      />

      {/* Lighting */}
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={darkMode ? 0.8 : 1}
        color={theme.palette.primary.main}
      />
      <pointLight
        position={[-10, -10, -5]}
        intensity={darkMode ? 0.5 : 0.7}
        color={theme.palette.secondary.main}
      />

      {/* Environment */}
      <Environment preset={darkMode ? 'night' : 'city'} />

      {/* 3D Objects */}
      <MainGeometry />
      <FloatingSpheres count={12} />
      <Particles count={80} />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* Effects */}
      <fog attach="fog" args={[theme.palette.background.default, 10, 25]} />
    </Canvas>
  );
};

export default Hero3DScene;
