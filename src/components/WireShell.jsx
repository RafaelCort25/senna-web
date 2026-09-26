import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOrbStore } from '../store/orbStore';

export default function WireShell({ radius = 1.62, color = '#c9a668' }) {
  const meshRef = useRef();

  const scale = useOrbStore((s) => s.scale);
  const position = useOrbStore((s) => s.position);
  const wireOpacity = useOrbStore((s) => s.wireOpacity);

  const smoothScale = useRef(scale);
  const smoothOpacity = useRef(wireOpacity);
  const smoothPos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.y = -t * 0.05;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;

    smoothScale.current += (scale - smoothScale.current) * 0.08;
    smoothOpacity.current += (wireOpacity - smoothOpacity.current) * 0.08;

    meshRef.current.scale.setScalar(smoothScale.current);

    const target = new THREE.Vector3(position[0], position[1], position[2]);
    smoothPos.current.lerp(target, 0.08);
    meshRef.current.position.copy(smoothPos.current);

    meshRef.current.material.opacity = smoothOpacity.current;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={wireOpacity}
      />
    </mesh>
  );
}
