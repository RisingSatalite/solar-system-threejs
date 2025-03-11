import { Planet } from "./planet";
import { Group, TextureLoader, IcosahedronGeometry } from "three";

export class Mars extends Planet {
  constructor({
    orbitSpeed = 0.00012,
    orbitRadius = 19,
    orbitRotationDirection = "clockwise",

    planetSize = 0.3,
    planetAngle = 0,
    planetRotationSpeed = 0.01,
    planetRotationDirection = "counterclockwise",
    planetTexture =  "/assets/mars-map.jpg",

    rimHex = 0xbc6434,
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