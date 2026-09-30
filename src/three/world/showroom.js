import { GLTFLoader } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

export async function loadShowroom(url) {
    const gltf = await loader.loadAsync('../models/environment/car-showroom_1.glb')
    const showroom = gltf.scene;
    scene.add(showroom);
    return showroom;
}