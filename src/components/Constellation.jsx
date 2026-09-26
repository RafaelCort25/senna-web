import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;
const CONNECTION_DISTANCE = 1.6;

export default function Constellation() {
  const groupRef = useRef();
  const lineRef = useRef();

  // Generar posiciones aleatorias en una esfera grande
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribución esférica
      const r = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    return arr;
  }, []);

  // Calcular pares de partículas cercanas para las líneas
  const linePositions = useMemo(() => {
    const points = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      points.push(
        new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        )
      );
    }

    const lines = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const d = points[i].distanceTo(points[j]);
        if (d < CONNECTION_DISTANCE) {
          lines.push(points[i].x, points[i].y, points[i].z);
          lines.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.015;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.08;
  });

  return (
    <group ref={groupRef}>

      {/* Puntos de la constelación */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#c9a668"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Líneas entre partículas cercanas */}
      {linePositions.length > 0 && (
        <lineSegments ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#c9a668"
            transparent
            opacity={0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

    </group>
  );
}
