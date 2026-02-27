"use client";

/**
 * HeroScene — React Three Fiber 3D Scene
 * ─────────────────────────────────────────────────────────────
 * SCENE COMPOSITION:
 *
 * 1. EnergyCoreGroup
 *    ├── Central sphere (MeshStandardMaterial with envMap/metalness)
 *    │   → Slowly rotates. On mouse move, the group tilts toward cursor.
 *    ├── Outer ring 1 (TorusGeometry) — orbits on Y axis
 *    ├── Outer ring 2 (TorusGeometry, tilted 60°) — counter-rotates
 *    └── Inner pulsing glow sphere (MeshBasicMaterial, additive blend)
 *
 * 2. OrbitingFragments — 6 wireframe IcosahedronGeometry objects
 *    placed at random orbital distances. Each has its own rotation speed.
 *
 * 3. ParticleField — 600 Points randomly scattered in a spherical volume.
 *    Points slowly drift upward (Y axis shift per frame).
 *
 * MOUSE TRACKING:
 *    useFrame lerps the group rotation toward normalised mouse coords.
 *    Max tilt: ±0.3 radians (≈ 17°). Lerp factor: 0.04 (smooth lag).
 *
 * ANIMATION:
 *    All done in useFrame — no external animation libraries needed.
 *
 * ACCESSIBILITY:
 *    aria-hidden canvas wrapper — purely decorative.
 */

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sphere, Torus, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Utility: random in range ── */
const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
function ParticleField({ count = 600 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = rnd(0, Math.PI * 2);
      const phi = rnd(0, Math.PI);
      const r = rnd(2.5, 9);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = rnd(0.002, 0.008);
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] = (posAttr.array[i * 3 + 1] as number) + speeds[i];
      // Reset when too high
      if ((posAttr.array[i * 3 + 1] as number) > 10) {
        posAttr.array[i * 3 + 1] = -10;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00f3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   ORBITING FRAGMENTS
───────────────────────────────────────────── */
interface FragmentProps {
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  orbitTilt: number;
  size: number;
  color: string;
}

function OrbitingFragment({ orbitRadius, orbitSpeed, orbitOffset, orbitTilt, size, color }: FragmentProps) {
  const ref = useRef<THREE.Mesh>(null);
  const pivotRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pivotRef.current || !ref.current) return;
    const t = clock.getElapsedTime();
    pivotRef.current.rotation.y = t * orbitSpeed + orbitOffset;
    pivotRef.current.rotation.z = Math.sin(t * 0.3 + orbitOffset) * orbitTilt;
    ref.current.rotation.x = t * 1.2;
    ref.current.rotation.y = t * 0.8;
  });

  return (
    <group ref={pivotRef}>
      <mesh ref={ref} position={[orbitRadius, 0, 0]}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   ENERGY CORE (Central object)
───────────────────────────────────────────── */
function EnergyCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mouse tracking — lerp toward cursor
    targetRot.current.x = mouse.y * -0.3;
    targetRot.current.y = mouse.x * 0.3;

    if (groupRef.current) {
      groupRef.current.rotation.x += (targetRot.current.x - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetRot.current.y - groupRef.current.rotation.y) * 0.04;
    }

    // Rings rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * -0.35;

    // Inner glow pulse
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 2.5) * 0.06;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central metallic distort sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#0a0a1a"
            metalness={0.95}
            roughness={0.05}
            distort={0.18}
            speed={2.5}
            envMapIntensity={3}
          />
        </Sphere>
      </Float>

      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial
          color="#00f3ff"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 1 — cyan */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 8, 120]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ring 2 — purple, tilted 55° */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 120]} />
        <meshBasicMaterial color="#b026ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ring 3 — outer orange */}
      <mesh rotation={[Math.PI / 1.3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.005, 8, 120]} />
        <meshBasicMaterial color="#ff6b00" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Orbiting fragments */}
      {[
        { orbitRadius: 2.8, orbitSpeed: 0.4, orbitOffset: 0, orbitTilt: 0.2, size: 0.15, color: "#00f3ff" },
        { orbitRadius: 3.2, orbitSpeed: -0.3, orbitOffset: 1.2, orbitTilt: 0.5, size: 0.1, color: "#b026ff" },
        { orbitRadius: 2.5, orbitSpeed: 0.6, orbitOffset: 2.5, orbitTilt: 0.3, size: 0.12, color: "#00f3ff" },
        { orbitRadius: 3.5, orbitSpeed: -0.2, orbitOffset: 4.0, orbitTilt: 0.8, size: 0.08, color: "#ff6b00" },
        { orbitRadius: 2.2, orbitSpeed: 0.5, orbitOffset: 3.1, orbitTilt: 0.1, size: 0.09, color: "#b026ff" },
        { orbitRadius: 4.0, orbitSpeed: -0.15, orbitOffset: 0.8, orbitTilt: 0.4, size: 0.11, color: "#00f3ff" },
      ].map((props, i) => (
        <OrbitingFragment key={i} {...props} />
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   SCENE LIGHTS
───────────────────────────────────────────── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f3ff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#b026ff" />
      <pointLight position={[0, -6, 3]} intensity={0.8} color="#ff6b00" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORTED CANVAS COMPONENT
───────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div
      className="absolute inset-0 three-canvas-container"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <EnergyCore />
          <ParticleField count={600} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
