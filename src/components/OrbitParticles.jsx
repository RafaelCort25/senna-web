import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOrbStore } from '../store/orbStore';

const COUNT = 80;

export default function OrbitParticles({ radius = 2.2 }) {
  const groupRef = useRef();

  const scale = useOrbStore((s) => s.scale);
  const position = useOrbStore((s) => s.position);
  const color = useOrbStore((s) => s.color);
  const energy = useOrbStore((s) => s.energy);

  // Posiciones iniciales de las partículas en anillo
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.5;
      const yOffset = (Math.random() - 0.5) * 1.2;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = yOffset;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [radius]);

  const smoothPos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Rotación del anillo
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;

    // Suavizar posición
    const target = new THREE.Vector3(position[0], position[1], position[2]);
    smoothPos.current.lerp(target, 0.08);
    groupRef.current.position.copy(smoothPos.current);

    // Pulso: tamaño del grupo varía con la energía
    const pulse = 1 + Math.sin(t * 2) * 0.04 * energy;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
