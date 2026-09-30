import './style.css';
import { startThreeScene } from './three/app.js';

startThreeScene()
  .then((app) => {
    console.info('[3D Showroom] Launched successfully.', app);
  })
  .catch((error) => {
    console.error('[3D Showroom] Error launching scene:', error);
  });