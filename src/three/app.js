import * as THREE from "three";
import { createInitialSetups } from "./core/initialSetups.js";
import { loadShowroom } from "./world/showroom.js";
import { loadBikeModel } from "./models/bikes.js";

export async function startThreeScene() {
  const mountElement = document.getElementById("model-environment");

  if (!mountElement) {
    throw new Error("Could not find #model-environment element in DOM.");
  }

  const { scene, camera, renderer, controls } = createInitialSetups(mountElement);

  let showroom = null;
  let bikeData = null;

  try {
    showroom = await loadShowroom(scene);
  } catch (error) {
    console.warn("Showroom environment model loading warning:", error);
    const gridHelper = new THREE.GridHelper(20, 20, 0x00d2ff, 0x333344);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);
  }

  try {
    bikeData = await loadBikeModel(scene);
  } catch (error) {
    console.error("Bike model loading failed:", error);
  }

  const clock = new THREE.Clock();

  function animate() {
    const delta = clock.getDelta();
    controls.update();
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  console.info("Three.js Scene initialized successfully.");

  return {
    scene,
    camera,
    renderer,
    controls,
    showroom,
    bikeData
  };
}
