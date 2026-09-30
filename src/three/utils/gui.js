import GUI from 'three/addons/libs/lil-gui.module.min.js';

/**
 * Interactive Real-Time Debug GUI for testing light setups live on localhost
 * @param {Object} lightingSystem - Object returned by setupShowroomLighting
 */
export function setupLightingGUI(lightingSystem) {
  const gui = new GUI({ title: '💡 Showroom Lighting Controls' });
  const { lights, helpers, options } = lightingSystem;

  // 1. Left Engine Light Folder
  if (lights.leftEngineLight) {
    const leftFolder = gui.addFolder('Left Engine Light');
    leftFolder.add(lights.leftEngineLight, 'visible').name('Enable Light');
    leftFolder.add(lights.leftEngineLight, 'intensity', 0, 10, 0.1).name('Brightness');
    leftFolder.add(lights.leftEngineLight.position, 'x', -10, 0, 0.2).name('Pos X (Side)');
    leftFolder.add(lights.leftEngineLight.position, 'y', 0, 10, 0.2).name('Pos Y (Height)');
    leftFolder.add(lights.leftEngineLight.position, 'z', -10, 10, 0.2).name('Pos Z (Front/Back)');
    leftFolder.addColor(lights.leftEngineLight, 'color').name('Color');
  }

  // 2. Right Engine Light Folder
  if (lights.rightEngineLight) {
    const rightFolder = gui.addFolder('Right Engine Light');
    rightFolder.add(lights.rightEngineLight, 'visible').name('Enable Light');
    rightFolder.add(lights.rightEngineLight, 'intensity', 0, 10, 0.1).name('Brightness');
    rightFolder.add(lights.rightEngineLight.position, 'x', 0, 10, 0.2).name('Pos X (Side)');
    rightFolder.add(lights.rightEngineLight.position, 'y', 0, 10, 0.2).name('Pos Y (Height)');
    rightFolder.add(lights.rightEngineLight.position, 'z', -10, 10, 0.2).name('Pos Z (Front/Back)');
    rightFolder.addColor(lights.rightEngineLight, 'color').name('Color');
  }

  // 3. Top Spotlight Folder
  if (lights.topSpotlight) {
    const spotFolder = gui.addFolder('Ceiling Top Light Box');
    spotFolder.add(lights.topSpotlight, 'visible').name('Enable Light');
    spotFolder.add(lights.topSpotlight, 'intensity', 0, 15, 0.5).name('Brightness');
    spotFolder.add(lights.topSpotlight.position, 'y', 1, 10, 0.2).name('Height');
    spotFolder.add(lights.topSpotlight, 'angle', 0.1, Math.PI / 2, 0.05).name('Beam Cone Angle');
  }

  // 4. Floor Bounce Light Folder
  if (lights.hemiLight) {
    const hemiFolder = gui.addFolder('Floor Bounce Light');
    hemiFolder.add(lights.hemiLight, 'visible').name('Enable Bounce');
    hemiFolder.add(lights.hemiLight, 'intensity', 0, 3, 0.1).name('Bounce Intensity');
  }

  // 5. Ambient Light Folder
  if (lights.ambientLight) {
    const ambFolder = gui.addFolder('Ambient Light');
    ambFolder.add(lights.ambientLight, 'visible').name('Enable Ambient');
    ambFolder.add(lights.ambientLight, 'intensity', 0, 3, 0.1).name('Brightness');
    ambFolder.addColor(lights.ambientLight, 'color').name('Color');
  }

  // 6. Visual Direction Helpers Toggle
  const helperController = { showHelpers: options.showHelpers };
  gui.add(helperController, 'showHelpers').name('Show Helper Grid').onChange((value) => {
    helpers.forEach((h) => (h.visible = value));
  });

  // gui.hide();
  gui.destroy();
  return gui;
}

