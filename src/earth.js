import {
  Mesh,
  AdditiveBlending,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";
import { Planet } from "./planet";
import { Moon } from "./moon";

export class Earth extends Planet {
  constructor(props) {
    super(props);

    this.createPlanetLights();
    this.createPlanetClouds();
    this.addMoon();
  }

  addMoon() {
    const moon = new Moon({
      orbitSpeed: 0.00048,
      orbitRadius: 2,  // Set an appropriate distance for the moon
      orbitRotationDirection: "clockwise",
      planetSize: 0.1,  // Smaller size for the moon
      planetRotationSpeed: 0.005,
      planetRotationDirection: "counterclockwise",
      planetTexture: "/solar-system-threejs/assets/moon-texture.jpg",
      rimHex: 0xffffff,  // Moon's rim color
    }).getPlanet();
  
    // Position the moon relative to Earth
    moon.position.set(0, 0, 0);  // Position the moon on the X axis, for example
  
    this.planetGroup.add(moon);
  }
  
  

  createPlanetLights() {
    const planetLightsMaterial = new MeshBasicMaterial({
      map: this.loader.load("/solar-system-threejs/assets/earth-map-2.jpg"),
      blending: AdditiveBlending,
    });
    const planetLightsMesh = new Mesh(
      this.planetGeometry,
      planetLightsMaterial
    );
    this.planetGroup.add(planetLightsMesh);

    this.group.add(this.planetGroup);
  }

  createPlanetClouds() {
    const planetCloudsMaterial = new MeshStandardMaterial({
      map: this.loader.load("/solar-system-threejs/assets/earth-map-3.jpg"),
      transparent: true,
      opacity: 0.8,
      blending: AdditiveBlending,
      alphaMap: this.loader.load(
        "/solar-system-threejs/assets/earth-map-4.jpg"
      ),
    });
    const planetCloudsMesh = new Mesh(
      this.planetGeometry,
      planetCloudsMaterial
    );
    planetCloudsMesh.scale.setScalar(1.003);
    this.planetGroup.add(planetCloudsMesh);

    this.group.add(this.planetGroup);
  }
}
