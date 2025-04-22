import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

export default function ThreeScene() {
  const containerRef = useRef(null);
  const boltRef      = useRef(null);
  const droppedRef   = useRef(false);
  const dropOffRef   = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';

    // ——— Scene + Camera + Renderer ———
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // ——— Lights ———
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // ——— Load Bolt & Initial Bounce‑Drop ———
    new GLTFLoader().load('/bolt-scene.gltf', (gltf) => {
      if (boltRef.current) scene.remove(boltRef.current);

      const bolt = gltf.scene;
      bolt.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xcccccc,
            metalness: 1.0,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          });
          child.castShadow = child.receiveShadow = true;
        }
      });

      bolt.position.set(0, 2, 0);
      bolt.scale.set(0.7, 0.7, 0.7);
      scene.add(bolt);
      boltRef.current = bolt;

      gsap.to(bolt.position, {
        y: -0.15,
        duration: 1.2,
        ease: 'bounce.out',
        onComplete: () => {
          droppedRef.current = true;
        }
      });
    });

    // ——— Scroll‑Driven Spin ———
    const onBoltScroll = ({ detail: y }) => {
      const bolt = boltRef.current;
      if (!bolt || !droppedRef.current || dropOffRef.current) return;
      const turns = y / window.innerHeight;
      bolt.rotation.y = turns * Math.PI * 2;
    };
    window.addEventListener('bolt-scroll', onBoltScroll);

    // ——— Bolt Fall‑Off ———
    const onBoltDropOff = () => {
      const bolt = boltRef.current;
      if (!bolt || dropOffRef.current === true) return;
      dropOffRef.current = true;
      gsap.to(bolt.position, {
        y: -5,
        duration: 0.8,
        ease: 'power2.in'
      });
    };
    window.addEventListener('bolt-drop-off', onBoltDropOff);

    // ——— Bolt Come‑Back Up ———
    const onBoltRaise = () => {
      const bolt = boltRef.current;
      if (!bolt || dropOffRef.current === false) return;
      dropOffRef.current = false;
      gsap.to(bolt.position, {
        y: -0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    };
    window.addEventListener('bolt-raise', onBoltRaise);

    // ——— Resize & Render Loop ———
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // ——— Cleanup ———
    return () => {
      window.removeEventListener('bolt-scroll', onBoltScroll);
      window.removeEventListener('bolt-drop-off', onBoltDropOff);
      window.removeEventListener('bolt-raise', onBoltRaise);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
