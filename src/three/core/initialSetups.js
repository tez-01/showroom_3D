import * as THREE from 'three';

export function createInitialSetups(mountElement) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
scene.background = new THREE.Color(0xeeeeee);
camera.position.set(0, 1, 5);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
renderer.shadowMap.enabled = true;
mountElement.appendChild(renderer.domElement);

return { scene, camera, renderer}
};

