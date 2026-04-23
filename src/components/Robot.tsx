import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TextType from './TextType';
import RotatingText from './RotatingText';

// Global variable strictly for buttery 60fps tracking without causing React to stutter
const cursorState = { x: 0, y: 0, isHoveringCanvas: false };

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    // SPATIAL TRACKING ALGORITHM:
    // The robot physically sits on the Right Hand Side at roughly 81% (0.81) of the screen width, and its eyes are at roughly 40% (0.40) screen height.
    // By calculating the cursor's Delta exactly relative to the robot's mechanical eyes, it will literally 'look' at the cursor natively!
    const robotEyeX = window.innerWidth * 0.81;
    const robotEyeY = window.innerHeight * 0.40;

    // Generate normalized true-relative coordinates (Sensitivity calmed down to 0.8 for subtle glances)
    cursorState.x = ((e.clientX - robotEyeX) / window.innerWidth) * 0.8;
    cursorState.y = -(e.clientY - robotEyeY) / window.innerHeight; 
  });
}

// 1. Our Native 3D Robot Component Engine
function RobotModel() {
  // Pre-loads and parses the .glb geometry natively at lightspeed from the public folder
  const { scene } = useGLTF('/robot.glb');
  const groupRef = useRef<THREE.Group>(null);

  // 2. True 3D Mouse Tracking sequence
  useFrame(() => {
    if (groupRef.current) {
      // HOVER OVERRIDE: If the user brings the mouse to the robot to manually grab it, 
      // the robot smoothly 'relaxes' its neck back to the neutral looking-forward position!
      let targetX = cursorState.isHoveringCanvas ? 0 : cursorState.x * (Math.PI / 2.5); 
      
      // STRICT GEOMETRY CLAMP: Prevents the robot from doing too large of a body pivot.
      // Capped rigidly at roughly 36 degrees! It will execute a very polite, tight glance instead of a deep turn.
      const maxAngle = Math.PI / 5;
      targetX = Math.max(-maxAngle, Math.min(maxAngle, targetX));

      // Capped the pitch limit strictly to PI/10 (roughly 18 degrees) so the vertical movements are equally subtle.
      const targetY = cursorState.isHoveringCanvas ? 0 : -cursorState.y * (Math.PI / 10);   

      // Lerp (Linear Interpolate) creates buttery smooth mechanical neck/body movement
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 
        User Request: "head to waist only". 
        Removed the aggressive negative Y drop. 
      */}
      <primitive object={scene} scale={3.5} position={[0, -2, 0]} />
    </group>
  );
}

// 3. Hero Section Parent Component
export default function Robot({ onReady }: { onReady: () => void }) {
  // Fire the portfolio boot sequence immediately — no typing delay
  useEffect(() => {
    const t = setTimeout(() => onReady(), 300);
    return () => clearTimeout(t);
  }, [onReady]);

  return (
    <>
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 0, 
          overflow: 'hidden', 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        {/* LHS: Hero Text occupying exactly 70vw */}
        <div
          className="hero-text"
          style={{ 
            width: '70vw', 
            opacity: 1, 
            zIndex: 2, 
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: '8vw' 
          }}
        >
          {/* Line 1: Name — appears instantly, no typing animation */}
          <h1 className="hero-name" style={{ whiteSpace: 'nowrap' }}>
            D E B A S H R E E &nbsp; M A L
          </h1>

          {/* Line 2: Taglines — smaller, loops fast with quick delete */}
          {/* Line 2: Build [RotatingText] animation */}
          <div 
            className="hero-tagline" 
            style={{ 
              opacity: 1,
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              overflow: 'hidden',
            }}
          >
            <span style={{ color: 'white', fontWeight: 500, fontStyle: 'italic' }}>Build</span>
            <RotatingText
              texts={['Ideas', 'Logic', 'Systems', 'Scale']}
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.04}
              splitLevelClassName="overflow-hidden"
              transition={{ type: 'spring', damping: 20, stiffness: 500 }}
              rotationInterval={2000}
              splitBy="characters"
              auto
              loop
              mainClassName="hero-rotating-text"
            />
          </div>
        </div>

        {/* RHS: 3D Robot Native Canvas */}
        <div 
          className="native-3d-wrapper" 
          onPointerEnter={() => { cursorState.isHoveringCanvas = true; }}
          onPointerLeave={() => { cursorState.isHoveringCanvas = false; }}
          style={{ 
            width: '30vw', 
            height: '80vh',
            transform: 'translateX(-4vw)', // Shift the entire grid element slightly left
            pointerEvents: 'auto',
            position: 'relative'
          }}
        >
          {/* React Three Fiber Canvas engine replaces Sketchfab completely */}
          {/* By floating the physical 3D camera upwards to Y=2.5, we perfectly frame the upper chest natively */}
          <Canvas camera={{ position: [0, 2.5, 4.5], fov: 45 }}>
            {/* Professional studio lighting setup */}
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.15} penumbra={1} />
            <Environment preset="city" />
            
            {/* INJECTED CONTROL: This single line grants you the power to click, drag, spin, and scroll-wheel zoom! */}
            {/* Added maxPolarAngle constraint so you can't accidentally drag the camera 'underground' violently */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              makeDefault 
              target={[0, 2.5, 0]} 
              maxPolarAngle={Math.PI / 1.5}
            />

            <Suspense fallback={null}>
              <RobotModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}
