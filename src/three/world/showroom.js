import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function loadShowroom(scene, url = '/models/environment/car-showroom_1.glb') {
  try {
    const gltf = await loader.loadAsync(url);
    const showroom = gltf.scene;

    showroom.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    scene.add(showroom);
    console.info('Showroom model loaded successfully.');
    return showroom;
  } catch (error) {
    console.error('Failed to load showroom environment model:', error);
    throw error;
  }
}
