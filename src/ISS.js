import { Satlite } from "./sataliteObject";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ISS extends Satlite {
  constructor(props) {
    super(props);
    
    this.useModel();  // Load and use the model
  }

  useModel() {
    const loader = new GLTFLoader();
    
    loader.load('iss.glb', (gltf) => {
      const issModel = gltf.scene;
      issModel.position.set(0, 0, 0);  // Position the ISS at (0, 0, 0)

      this.planetGroup.add(issModel);  // Add the model to the inherited group
    }, undefined, (error) => {
      console.error('Error loading ISS model:', error);
    });
  }
}
