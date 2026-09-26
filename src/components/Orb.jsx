import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from '../shaders/orbShaders';
import { useOrbStore } from '../store/orbStore';

const OrbMaterial = shaderMaterial(
  {
    uTime: 0,
    uEnergy: 0.35,
    uColor: new THREE.Color('#c9a668'),
    uShape: 0.5,
    uNoiseScale: 1.6,
  },
  orbVertexShader,
  orbFragmentShader
);

extend({ OrbMaterial });

export default function Orb({ radius = 1.35, detail = 64 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const scale = useOrbStore((s) => s.scale);
  const position = useOrbStore((s) => s.position);
  const energy = useOrbStore((s) => s.energy);
  const color = useOrbStore((s) => s.color);
  const shape = useOrbStore((s) => s.shape);
  const noiseScale = useOrbStore((s) => s.noiseScale);
  const mouseX = useOrbStore((s) => s.mouseX);
  const mouseY = useOrbStore((s) => s.mouseY);

  const smoothScale = useRef(scale);
  const smoothPos = useRef(new THREE.Vector3(...position));
  const smoothEnergy = useRef(energy);
  const smoothShape = useRef(shape);
  const smoothNoiseScale = useRef(noiseScale);
  const smoothMouseX = useRef(0);
  const smoothMouseY = useRef(0);
  const targetColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;

    smoothMouseX.current += (mouseX - smoothMouseX.current) * 0.05;
    smoothMouseY.current += (mouseY - smoothMouseY.current) * 0.05;

    meshRef.current.rotation.y = t * 0.12 + smoothMouseX.current * 0.4;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.08 + smoothMouseY.current * 0.2;

    // Suavizar cambios de scroll
    smoothScale.current += (scale - smoothScale.current) * 0.08;
    smoothEnergy.current += (energy - smoothEnergy.current) * 0.08;
    smoothShape.current += (shape - smoothShape.current) * 0.06;
    smoothNoiseScale.current += (noiseScale - smoothNoiseScale.current) * 0.06;

    meshRef.current.scale.setScalar(smoothScale.current);

    const target = new THREE.Vector3(position[0], position[1], position[2]);
    smoothPos.current.lerp(target, 0.08);
    meshRef.current.position.copy(smoothPos.current);

    materialRef.current.uTime = t;
    materialRef.current.uEnergy = smoothEnergy.current * (1 + Math.sin(t * 1.4) * 0.06);
    materialRef.current.uColor.lerp(targetColor, 0.05);
    materialRef.current.uShape = smoothShape.current;
    materialRef.current.uNoiseScale = smoothNoiseScale.current;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[radius, detail]} />
      {/* @ts-ignore */}
      <orbMaterial ref={materialRef} />
    </mesh>
  );
}
