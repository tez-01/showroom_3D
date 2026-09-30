import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createInitialSetups(mountElement) {
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
  controls.maxPolarAngle = Math.PI / 2 + 0.02;
  controls.minDistance = 1;
  controls.maxDistance = 25;
  controls.target.set(0, 0.8, 0);
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const mainDirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  mainDirLight.position.set(5, 8, 5);
  mainDirLight.castShadow = true;
  mainDirLight.shadow.mapSize.width = 2048;
  mainDirLight.shadow.mapSize.height = 2048;
  mainDirLight.shadow.camera.near = 0.5;
  mainDirLight.shadow.camera.far = 25;
  mainDirLight.shadow.camera.left = -6;
  mainDirLight.shadow.camera.right = 6;
  mainDirLight.shadow.camera.top = 6;
  mainDirLight.shadow.camera.bottom = -6;
  mainDirLight.shadow.bias = -0.0001;
  scene.add(mainDirLight);

  const fillLight = new THREE.DirectionalLight(0x88bbff, 1.2);
  fillLight.position.set(-5, 4, -4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffaa55, 1.0);
  rimLight.position.set(0, 6, -6);
  scene.add(rimLight);

  function onWindowResize() {
    const width = mountElement.clientWidth || window.innerWidth;
    const height = mountElement.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize);

  return { scene, camera, renderer, controls };
}


