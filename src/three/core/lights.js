import * as THREE from 'three';

/**
 * Configurable lighting options (Set any light to true/false)
 */
export const DEFAULT_LIGHT_OPTIONS = {
  ambient: true,         // Soft environmental ambient light
  hemiBounce: true,      // Floor bounce light for engine underbody details
  leftEngineLight: true, // Left-side dedicated engine light
  rightEngineLight: true,// Right-side dedicated engine light
  topSpotlight: true,    // Overhead light box ceiling spot
  rimLight: true,        // Back contour rim light
  showHelpers: false      // Visual light direction helpers
};

export function setupShowroomLighting(scene, customOptions = {}) {
  const options = { ...DEFAULT_LIGHT_OPTIONS, ...customOptions };
  const lights = {};
  const helpers = [];

  // 1. Soft Ambient Light
  if (options.ambient) {
    const ambientLight = new THREE.AmbientLight(0xf4f8ff, 0.8);
    scene.add(ambientLight);
    lights.ambientLight = ambientLight;
  }

  // 2. Hemisphere Floor Bounce Light (Highlights engine underside & mechanical parts)
  if (options.hemiBounce) {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);
    lights.hemiLight = hemiLight;
  }

  // 3. Left Engine Dedicated Light (Angled directly at left engine cover, quickshifter & crankcase)
  if (options.leftEngineLight) {
    const leftEngineLight = new THREE.DirectionalLight(0xffffff, 3.5);
    // Positioned to the left (-3.5m) at engine height (Y = 1.8m), angled slightly from front (Z = 1.5m)
    leftEngineLight.position.set(-3.5, 1.8, 1.5);
    leftEngineLight.castShadow = true;
    leftEngineLight.shadow.mapSize.width = 2048;
    leftEngineLight.shadow.mapSize.height = 2048;
    leftEngineLight.shadow.bias = -0.0001;
    scene.add(leftEngineLight);
    lights.leftEngineLight = leftEngineLight;

    if (options.showHelpers) {
      const helper = new THREE.DirectionalLightHelper(leftEngineLight, 1.2, 0x00e5ff);
      scene.add(helper);
      helpers.push(helper);
    }
  }

  // 4. Right Engine Dedicated Light (Angled directly at right clutch cover, exhaust header pipes & silencer)
  if (options.rightEngineLight) {
    const rightEngineLight = new THREE.DirectionalLight(0xffffff, 3.5);
    // Positioned to the right (+3.5m) at engine height (Y = 1.8m), angled slightly from front (Z = 1.5m)
    rightEngineLight.position.set(3.5, 1.8, 1.5);
    rightEngineLight.castShadow = true;
    rightEngineLight.shadow.mapSize.width = 2048;
    rightEngineLight.shadow.mapSize.height = 2048;
    rightEngineLight.shadow.bias = -0.0001;
    scene.add(rightEngineLight);
    lights.rightEngineLight = rightEngineLight;

    if (options.showHelpers) {
      const helper = new THREE.DirectionalLightHelper(rightEngineLight, 1.2, 0xffa500);
      scene.add(helper);
      helpers.push(helper);
    }
  }

  // 5. Overhead Ceiling Light Box Spotlight (Points straight down onto top tank & seat)
  if (options.topSpotlight) {
    const topSpotlight = new THREE.SpotLight(0xffffff, 4.0);
    topSpotlight.position.set(0, 3.8, 0);
    topSpotlight.angle = Math.PI / 3;
    topSpotlight.penumbra = 0.5;
    topSpotlight.decay = 1.2;
    topSpotlight.distance = 15;
    topSpotlight.target.position.set(0, 0.6, 0);
    scene.add(topSpotlight);
    scene.add(topSpotlight.target);
    lights.topSpotlight = topSpotlight;

    if (options.showHelpers) {
      const helper = new THREE.SpotLightHelper(topSpotlight, 0xffffff);
      scene.add(helper);
      helpers.push(helper);
    }
  }

  // 6. Warm Rear Contour Rim Light (Highlights rear tire, swingarm & tail)
  if (options.rimLight) {
    const rimLight = new THREE.DirectionalLight(0xffd1a4, 2.0);
    rimLight.position.set(0, 3.0, -4.0);
    scene.add(rimLight);
    lights.rimLight = rimLight;

    if (options.showHelpers) {
      const helper = new THREE.DirectionalLightHelper(rimLight, 1.2, 0xff5500);
      scene.add(helper);
      helpers.push(helper);
    }
  }

  return { lights, helpers, options };
}
