'use client'
/**
 * components/3d/HeroScene.tsx
 *
 * React Three Fiber animated background for the Hero section.
 * Dynamically imported with { ssr: false } from Hero.tsx.
 *
 * Features:
 * - Floating wireframe geometries (icosahedron, octahedron, box)
 * - Neural-network node + line graph
 * - Mouse parallax via useFrame lerp
 * - Colors follow --particle-color CSS variable (MutationObserver on data-theme)
 * - Performance: dpr capped at 1.5, reduced count on mobile
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState, memo } from 'react'
import * as THREE from 'three'

// ── CSS var → THREE color ─────────────────────────────────────
function useParticleColor(): string {
  const [color, setColor] = useState('#00D4FF')

  useEffect(() => {
    const read = () => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-color')
        .trim()
      if (val) setColor(val)
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => obs.disconnect()
  }, [])

  return color
}

// ── Individual floating shape ─────────────────────────────────
interface ShapeConfig {
  type: 'icosahedron' | 'octahedron' | 'box'
  pos: [number, number, number]
  size: number
  rx: number
  ry: number
  rz: number
  phase: number
  amp: number
}

const SHAPES: ShapeConfig[] = [
  { type: 'icosahedron', pos: [-4.4, 2.1, -1.5], size: 0.40, rx: 0.003, ry: 0.005, rz: 0.002, phase: 0.0, amp: 0.28 },
  { type: 'octahedron',  pos: [ 4.2,-1.4, -2.0], size: 0.34, rx: 0.004, ry: 0.003, rz: 0.005, phase: 1.2, amp: 0.32 },
  { type: 'box',         pos: [-3.0,-2.0,  0.0], size: 0.26, rx: 0.006, ry: 0.004, rz: 0.003, phase: 2.4, amp: 0.22 },
  { type: 'icosahedron', pos: [ 3.6, 2.4, -1.2], size: 0.30, rx: 0.002, ry: 0.006, rz: 0.004, phase: 0.8, amp: 0.30 },
  { type: 'octahedron',  pos: [-2.0, 1.0,  1.0], size: 0.20, rx: 0.005, ry: 0.002, rz: 0.006, phase: 3.5, amp: 0.18 },
  { type: 'box',         pos: [ 1.6,-2.4, -1.0], size: 0.17, rx: 0.007, ry: 0.005, rz: 0.003, phase: 1.8, amp: 0.20 },
  { type: 'icosahedron', pos: [ 0.5, 3.0, -2.0], size: 0.22, rx: 0.003, ry: 0.007, rz: 0.002, phase: 4.2, amp: 0.25 },
  { type: 'octahedron',  pos: [-5.0,-0.5, -2.0], size: 0.28, rx: 0.004, ry: 0.004, rz: 0.007, phase: 2.9, amp: 0.26 },
]

const FloatingShape = memo(function FloatingShape({
  cfg,
  color,
}: {
  cfg: ShapeConfig
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  const baseY = cfg.pos[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.x += cfg.rx
    ref.current.rotation.y += cfg.ry
    ref.current.rotation.z += cfg.rz
    ref.current.position.y = baseY + Math.sin(t * 0.45 + cfg.phase) * cfg.amp
  })

  const geo = useMemo(() => {
    switch (cfg.type) {
      case 'icosahedron': return <icosahedronGeometry args={[cfg.size, 1]} />
      case 'octahedron':  return <octahedronGeometry  args={[cfg.size]} />
      case 'box':         return <boxGeometry          args={[cfg.size, cfg.size, cfg.size]} />
    }
  }, [cfg.type, cfg.size])

  return (
    <mesh ref={ref} position={cfg.pos}>
      {geo}
      <meshStandardMaterial color={color} wireframe transparent opacity={0.38} />
    </mesh>
  )
})

// ── Neural network ────────────────────────────────────────────
function NeuralNetwork({ color }: { color: string }) {
  const ptsRef = useRef<THREE.Points>(null)

  const nodes = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return Array.from({ length: 14 }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3,
      )
    )
  }, [])

  const connections = useMemo<[THREE.Vector3, THREE.Vector3][]>(() => {
    const out: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 3.4) out.push([nodes[i], nodes[j]])
    return out
  }, [nodes])

  const posArr = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z })
    return arr
  }, [nodes])

  useFrame(({ clock }) => {
    if (ptsRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.04
      ptsRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      <points ref={ptsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posArr, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.055} transparent opacity={0.65} sizeAttenuation />
      </points>
      {connections.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color={color} lineWidth={0.4} transparent opacity={0.12} />
      ))}
    </group>
  )
}

// ── Parallax group ────────────────────────────────────────────
function ParallaxScene({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.07, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.04, 0.04)
  })

  return (
    <group ref={groupRef}>
      {SHAPES.map((cfg, i) => <FloatingShape key={i} cfg={cfg} color={color} />)}
      <NeuralNetwork color={color} />
    </group>
  )
}

// ── Canvas export (dynamically imported) ─────────────────────
export default function HeroScene() {
  const color = useParticleColor()

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <ParallaxScene color={color} />
    </Canvas>
  )
}
