import './style.css';
import { startThreeScene } from './three/app.js';

try {
  startThreeScene();
  console.info('Canvas rendering started.');
} catch (error) {
  console.error('Canvas setup failed.', error);
}
