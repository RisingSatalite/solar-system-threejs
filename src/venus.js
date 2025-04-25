import { Planet } from "./planet";
import { Group, TextureLoader, IcosahedronGeometry } from "three";

export class Venus extends Planet {
  constructor({
    orbitSpeed = 0.00035,
    orbitRadius = 13,
    orbitRotationDirection = "clockwise",
    planetSize = 0.25,
    planetAngle = 0,
    planetRotationSpeed = 0.0005,
    planetRotationDirection = "clockwise",
    planetTexture = "/assets/venus-map.jpg",
    rimHex = 0xb66f1f,
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
  }
}