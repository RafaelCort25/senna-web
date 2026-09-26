import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Orb from '../components/Orb';
import WireShell from '../components/WireShell';
import GlowShell from '../components/GlowShell';
import Constellation from '../components/Constellation';
import OrbitParticles from '../components/OrbitParticles';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />

        <Constellation />

        <Orb radius={1.35} detail={64} />
        <WireShell radius={1.62} opacity={0.08} />
        <GlowShell radius={1.9} opacity={0.05} />

        {/* Anillo orbital de partículas */}
        <OrbitParticles radius={2.2} />
      </Suspense>
    </Canvas>
  );
}
