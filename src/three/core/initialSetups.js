import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { setupShowroomLighting } from './lights.js';

export function createInitialSetups(mountElement, lightOptions = {}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0b10);
  scene.fog = new THREE.FogExp2(0x0a0b10, 0.015);

  const camera = new THREE.PerspectiveCamera(
    45,
    mountElement.clientWidth / mountElement.clientHeight,
    0.1,
    1000
  );
  camera.position.set(3, 1.8, 4.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mountElement.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;

  // Horizontal rotation: Full 360° rotation around the bike (unrestricted azimuth)
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.minPolarAngle = THREE.MathUtils.degToRad(60);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(90);

  // Zoom distance bounds
  controls.minDistance = 1.5;
  controls.maxDistance = 5.8;
  // controls.maxDistance = 20;

  // Look-at center target (center of bike)
  controls.target.set(0, 0.6, 0);
  controls.update();

  // Setup dedicated showroom lighting system with configurable toggles and helpers
  const lightingSystem = setupShowroomLighting(scene, lightOptions);

  function onWindowResize() {
    const width = mountElement.clientWidth || window.innerWidth;
    const height = mountElement.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize);

  return { scene, camera, renderer, controls, lightingSystem };
}

