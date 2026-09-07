"use client";

import { useGSAP } from "@gsap/react";
import { Line, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import type { Group } from "three";
import { A1_VIEW, chips, edges, nodes } from "@/lib/a1-hierarchy";

gsap.registerPlugin(useGSAP);

const ACCENT = "#01E870";
const ENTITY = "#ff87dc";
const RELATION = "#f6c94c";
const EDGE = "#958fa8";

function reducedMotionOn(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function OrthoEdges() {
  return (
    <group>
      {edges.map((edge) => (
        <Line
          key={edge.id}
          points={edge.points.map(([x, y]) => [x, y, 0] as [number, number, number])}
          color={EDGE}
          transparent
          opacity={0.85}
          lineWidth={1.25}
        />
      ))}
    </group>
  );
}

function NodePlanes() {
  return (
    <group>
      {nodes.map((node) => (
        <mesh key={node.id} position={[node.x + node.w / 2, node.y + node.h / 2, -0.4]}>
          <planeGeometry args={[node.w, node.h]} />
          <meshBasicMaterial
            color={node.kind === "relation" ? RELATION : ENTITY}
            transparent
            opacity={0.07}
          />
        </mesh>
      ))}
    </group>
  );
}

function StakePulses() {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!group.current || reducedMotionOn()) {
      return;
    }
    const t = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.2;
    group.current.children.forEach((child) => {
      child.scale.setScalar(t);
    });
  });
  return (
    <group ref={group}>
      {chips.map((chip) => (
        <mesh key={chip.id} position={[chip.x + 26, chip.y + 14, 0.2]}>
          <planeGeometry args={[52, 28]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ onReady }: { onReady: () => void }) {
  const root = useRef<Group>(null);
  const armed = useRef(false);

  useGSAP(
    () => {
      if (!root.current) {
        return;
      }
      if (reducedMotionOn()) {
        onReady();
        return;
      }
      gsap.fromTo(
        root.current.position,
        { x: 18 },
        {
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            if (!armed.current) {
              armed.current = true;
              onReady();
            }
          },
        },
      );
      gsap.fromTo(
        root.current.scale,
        { x: 0.96, y: 0.96, z: 1 },
        { x: 1, y: 1, z: 1, duration: 0.9, ease: "power2.out" },
      );
    },
    { dependencies: [] },
  );

  return (
    <group ref={root}>
      <OrthoEdges />
      <NodePlanes />
      <StakePulses />
    </group>
  );
}

export default function HeroA1Canvas({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      className="hero-a1-canvas"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      onCreated={() => {
        onReady();
      }}
    >
      <OrthographicCamera
        makeDefault
        left={0}
        right={A1_VIEW.w}
        top={0}
        bottom={A1_VIEW.h}
        near={-20}
        far={20}
        position={[0, 0, 10]}
      />
      <Scene onReady={onReady} />
    </Canvas>
  );
}
