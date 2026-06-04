'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { TECH_ITEMS, CATEGORY_COLORS } from '@/data/techItems'

function GlobeWithTags() {
  const groupRef = useRef<THREE.Group>(null)

  // Auto-rotate
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  // Distribute tags on a sphere using Fibonacci lattice
  const tags = useMemo(() => {
    const numTags = TECH_ITEMS.length
    const radius = 2.5
    return TECH_ITEMS.map((item, i) => {
      const phi = Math.acos(1 - (2 * i) / numTags)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(theta) * Math.sin(phi)

      return {
        ...item,
        position: new THREE.Vector3(x, y, z),
        color: CATEGORY_COLORS[item.category]
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {/* Wireframe Sphere */}
      <mesh>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial 
          color="#38bdf8" // default blue-ish, css variables aren't directly supported here
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Connection Lines & Tags */}
      {tags.map((tag, i) => (
        <group key={i}>
          {/* Line from center to tag */}
          <line>
            <bufferGeometry attach="geometry">
              <bufferAttribute 
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, tag.position.x, tag.position.y, tag.position.z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={tag.color} transparent opacity={0.3} />
          </line>

          {/* HTML Label */}
          <Html position={tag.position} center>
            <div 
              className="px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: `color-mix(in srgb, ${tag.color} 20%, #000 80%)`,
                border: `1px solid ${tag.color}`,
                boxShadow: `0 0 10px color-mix(in srgb, ${tag.color} 50%, transparent)`,
                color: '#fff',
                fontSize: '0.85rem'
              }}
              title={tag.fullLabel}
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {tag.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

export default function TechGlobe() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <GlobeWithTags />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}
