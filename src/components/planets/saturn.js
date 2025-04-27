import { Planet } from "../base/planet";
import { Group, TextureLoader, IcosahedronGeometry } from "three";

export class Saturn extends Planet {
  constructor({
    orbitSpeed = 0.00005,
    orbitRadius = 25,
    orbitRotationDirection = "clockwise",
    planetSize = 0.8,
    planetAngle = 0,
    planetRotationSpeed = 0.05,
    planetRotationDirection = "counterclockwise",
    planetTexture = "/assets/saturn-map.jpg",
    rimHex = 0xd6b892,
    facingHex = 0x9b7f5a,
    rings = {
      ringsSize: 0.5,
      ringsTexture: "/assets/saturn-rings.jpg",
    },
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