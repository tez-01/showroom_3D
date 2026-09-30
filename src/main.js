import './style.css';
import { startThreeScene } from './three/app.js';

try {
  startThreeScene();
  console.info('Canvas rendering started.');
} catch (error) {
  console.error('Canvas setup failed.', error);
}

startThreeScene().catch((error) => {
  console.error('[Three.js] Failed to start or load the showroom.', error);
});