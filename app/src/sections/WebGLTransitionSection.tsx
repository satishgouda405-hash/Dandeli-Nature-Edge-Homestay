import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const LEAF_COLORS = [
  new THREE.Color(0x6B7F5F), // Moss
  new THREE.Color(0x2D4A3E), // Deep Forest
  new THREE.Color(0xC9A96E), // Gold/Tan
  new THREE.Color(0x8A8578), // Warm Grey
  new THREE.Color(0x4A5D23), // Olive
  new THREE.Color(0xA89060), // Light Brown
];

const noise3D = createNoise3D();

function fbm3D(p: THREE.Vector3): number {
  let value = 0.0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < 3; i++) {
    value += amplitude * noise3D(p.x * frequency, p.y * frequency, p.z * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

class WindField {
  getWindDirection(x: number, z: number, time: number): THREE.Vector2 {
    return new THREE.Vector2(
      fbm3D(new THREE.Vector3(x * 0.1, time * 0.05, z * 0.1)),
      fbm3D(new THREE.Vector3(x * 0.1 + 100.0, time * 0.05, z * 0.1 + 100.0))
    );
  }
}

interface LeafData {
  mesh: THREE.Mesh;
  rotationAxis: THREE.Vector3;
  rotationSpeed: number;
  fallSpeed: number;
  horizontalDrift: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayPhase: number;
}

function createLeafGeometry(): THREE.BufferGeometry {
  const width = 0.15;
  const height = 0.3;
  const geo = new THREE.PlaneGeometry(width, height, 3, 4);
  const positions = geo.attributes.position.array as Float32Array;

  for (let i = 0; i < positions.length; i += 3) {
    const y = positions[i + 1];
    const normalizedY = (y + height / 2) / height;
    positions[i + 2] *= normalizedY * normalizedY * 0.5;
  }

  geo.computeVertexNormals();
  return geo;
}

function createLeafMaterial(): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0.1,
  });

  mat.onBeforeCompile = (shader: { vertexShader: string; fragmentShader: string }) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      attribute vec3 aColor;
      varying vec3 vColor;
      `
    );
    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `void main() {
        vColor = aColor;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vColor;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      diffColor *= vec4(vColor, 1.0);
      `
    );
  };

  return mat;
}

export default function WebGLTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const LEAF_COUNT = hwConcurrency < 4 ? 100 : 200;

    // Scene setup
    const scene = new THREE.Scene();
    const sceneBgColor = new THREE.Color(0x1A1A1A);
    scene.background = sceneBgColor;
    scene.fog = new THREE.Fog(sceneBgColor, 1, 15);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    scene.add(dirLight);

    // Shadow floor
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -6;
    floor.receiveShadow = true;
    scene.add(floor);

    // Shared geometry & material
    const leafGeo = createLeafGeometry();
    const leafMat = createLeafMaterial();

    // Create leaves
    const leaves: LeafData[] = [];
    const windField = new WindField();

    for (let i = 0; i < LEAF_COUNT; i++) {
      const mesh = new THREE.Mesh(leafGeo, leafMat);
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];

      // Create color attribute
      const colors = new Float32Array(3);
      colors[0] = color.r;
      colors[1] = color.g;
      colors[2] = color.b;

      const colorAttr = new THREE.BufferAttribute(colors, 3);
      leafGeo.setAttribute('aColor', colorAttr);

      mesh.position.set(
        (Math.random() - 0.5) * 15,
        Math.random() * 3 + 4,
        (Math.random() - 0.5) * 7 - 2.5
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);

      leaves.push({
        mesh,
        rotationAxis: new THREE.Vector3(
          Math.random(),
          Math.random(),
          Math.random()
        ).normalize(),
        rotationSpeed: Math.random() * 0.015 + 0.005,
        fallSpeed: Math.random() * 0.015 + 0.005,
        horizontalDrift: Math.random() * 0.002 + 0.001,
        swayAmplitude: Math.random() * 0.7 + 0.3,
        swaySpeed: Math.random() + 0.5,
        swayPhase: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        // Wind
        const windVec2 = windField
          .getWindDirection(leaf.mesh.position.x, leaf.mesh.position.z, time)
          .multiplyScalar(0.05);
        leaf.mesh.position.x += windVec2.x;
        leaf.mesh.position.z += windVec2.y;

        // Fall
        leaf.mesh.position.y -= leaf.fallSpeed;

        // Sway
        const sway =
          Math.sin(time * leaf.swaySpeed + leaf.swayPhase) *
          leaf.swayAmplitude *
          0.01;
        leaf.mesh.position.x += sway + leaf.horizontalDrift;

        // Tumble
        leaf.mesh.rotateOnAxis(leaf.rotationAxis, leaf.rotationSpeed);

        // Respawn
        if (leaf.mesh.position.y < -6) {
          leaf.mesh.position.set(
            (Math.random() - 0.5) * 15,
            Math.random() * 3 + 4,
            (Math.random() - 0.5) * 7 - 2.5
          );
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    // Fade in
    gsap.to(canvas, {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // Text parallax
    if (textRef.current) {
      gsap.to(textRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      leafGeo.dispose();
      leafMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      renderer.dispose();
      leaves.forEach((l) => scene.remove(l.mesh));
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: 0,
        }}
      />
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <SectionLabel text="IMMERSIVE NATURE" color="white" />
        <h2 className="text-white text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.02em] mt-4">
          LET THE FOREST SPEAK
        </h2>
      </div>
    </section>
  );
}
