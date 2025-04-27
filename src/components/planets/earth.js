import {
  Mesh,
  AdditiveBlending,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Group,
  TextureLoader,
  IcosahedronGeometry,
} from "three";
import { Planet } from "../base/planet";
import { Moon } from "../moons/moon";
import { ISS } from "../satalites/ISS"

export class Earth extends Planet {
  constructor({
      orbitSpeed = 0.00029,
      orbitRadius = 16,
      orbitRotationDirection = "clockwise",

      planetSize = 0.5,
      planetAngle = (-23.4 * Math.PI) / 180,
      planetRotationSpeed = 0.01,
      planetRotationDirection = "counterclockwise",
      planetTexture = "/assets/earth-map-1.jpg",

      rimHex = 0x0088ff,
      facingHex = 0x000000,
  
      rings = null,
    } = {}) {
      super(); // ✅ MUST be the first thing inside the constructor when extending a class

      this.orbitSpeed = orbitSpeed;
      this.orbitRadius = orbitRadius;
      this.orbitRotationDirection = orbitRotationDirection;
  
      this.planetSize = planetSize;
      this.planetAngle = planetAngle;
      this.planetTexture = planetTexture;
      this.planetRotationSpeed = planetRotationSpeed;
      this.planetRotationDirection = planetRotationDirection;
  
      this.rings = rings;
  
      this.group = new Group();
      this.planetGroup = new Group();
      this.loader = new TextureLoader();
      this.planetGeometry = new IcosahedronGeometry(this.planetSize, 12);
  
      this.createOrbit();
      this.createRings();
      this.createPlanet();
      this.createGlow(rimHex, facingHex);
  
      this.animate = this.createAnimateFunction();
      this.animate();

      this.createPlanetLights();
      this.createPlanetClouds();
      this.addMoon();
      this.addISS();
  }


  addMoon() {
    const moon = new Moon({
      orbitSpeed: 0.00048,
      orbitRadius: 2,  // Set an appropriate distance for the moon
      orbitRotationDirection: "clockwise",
      planetSize: 0.1,  // Smaller size for the moon
      planetRotationSpeed: 0.005,
      planetRotationDirection: "counterclockwise",
      planetTexture: "/assets/moon-texture.jpg",
      rimHex: 0xffffff,  // Moon's rim color
    }).getPlanet();
  
    // Position the moon relative to Earth
    moon.position.set(0, 0, 0);  // Position the moon on the X axis, for example
  
    this.planetGroup.add(moon);
  }

  addISS() {
    const ISSmodel = new ISS().getPlanet();

    ISSmodel.position.set(0, 0, 0);
  
    this.planetGroup.add(ISSmodel);
  }

  createPlanetLights() {
    const planetLightsMaterial = new MeshBasicMaterial({
      map: this.loader.load("/assets/earth-map-2.jpg"),
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
      map: this.loader.load("/assets/earth-map-3.jpg"),
      transparent: true,
      opacity: 0.8,
      blending: AdditiveBlending,
      alphaMap: this.loader.load(
        "/assets/earth-map-4.jpg"
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
