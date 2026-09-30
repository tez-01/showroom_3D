import * as THREE from "three";
import { createInitialSetups } from "./core/initialSetups.js";
import { loadShowroom } from "./world/showroom.js";

export function startThreeScene() {
  const mountElement = document.getElementById("model-environment");

  if (!mountElement) {
    throw new Error("Could not find #model-environment");
  }
  const { scene, camera, renderer } = createInitialSetups(mountElement);

 
  function animate() {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);
  }
  animate();
}
 await loadShowroom(scene);
 console.info("Showroom loaded successfully.");
