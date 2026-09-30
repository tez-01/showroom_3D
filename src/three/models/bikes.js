import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function loadBikeModel(scene, url = '/models/bikes/yamaha_mt-09_v4.glb') {
  try {
    const gltf = await loader.loadAsync(url);
    const bike = gltf.scene;

    // Center and adjust initial scale/position if necessary
    bike.position.set(0, 0.6, 0);

    const bikeParts = {};

    bike.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Store reference to mesh by name for easy customization
        if (child.name) {
          bikeParts[child.name] = child;
        }
      }
    });

    scene.add(bike);
    console.info('Bike model loaded successfully.');

    return {
      model: bike,
      parts: bikeParts,
      gltf
    };
  } catch (error) {
    console.error('Failed to load bike model:', error);
    throw error;
  }
}
