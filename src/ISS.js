import { Satlite } from "./sataliteObject";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ISS extends Satlite {
  constructor(props) {
    super({
        ...props,  // Spread any incoming props to allow custom overrides
        orbitSpeed: 0.00001,
        orbitRadius: 1,
        orbitRotationDirection: "clockwise",
        planetSize: 0.05,
        planetRotationSpeed: 0.0001,
        planetRotationDirection: "counterclockwise",
        planetTexture: "/assets/moon-texture.jpg",
        rimHex: 0xffffff,
      });
    
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
