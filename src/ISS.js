import { Satlite } from "./sataliteObject";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ISS extends Satlite {
  constructor(props) {
    super(props);
    
    this.useModel();  // Load and use the model
  }

  useModel() {
    const loader = new GLTFLoader();

    console.log("Loading ISS model")
    
    loader.load('iss.glb', (gltf) => {
      const issModel = gltf.scene;

      issModel.scale.set(0.005, 0.005, 0.005);

      issModel.position.set(0, 0, 0);  // Position the ISS at (0, 0, 0)

      this.planetGroup.add(issModel);  // Add the model to the inherited group
      console.log("ISS loaded successfully")
    }, undefined, (error) => {
      console.error('Error loading ISS model:', error);
    });
  }
}
