import * as THREE from "three";
import { createInitialSetups } from "./core/initialSetups.js";

export function startThreeScene() {
  const mountElement = document.getElementById("model-environment");

  if (!mountElement) {
    throw new Error("Could not find #model-environment");
  }
  const { scene, camera, renderer } = createInitialSetups(mountElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);
  }
    animate();
}
