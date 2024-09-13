import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  LinearSRGBColorSpace,
  ACESFilmicToneMapping,
  Vector3
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js"; // Add PointerLockControls

import { Sun } from "./sun";
import { Earth } from "./earth";
import { Planet } from "./planet";
import { Starfield } from "./starfield";

const planets = [
  {
    orbitSpeed: 0.00048,
    orbitRadius: 10,
    orbitRotationDirection: "clockwise",
    planetSize: 0.2,
    planetRotationSpeed: 0.005,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/mercury-map.jpg",
    rimHex: 0xf9cf9f,
  },
  {
    orbitSpeed: 0.00035,
    orbitRadius: 13,
    orbitRotationDirection: "clockwise",
    planetSize: 0.5,
    planetRotationSpeed: 0.0005,
    planetRotationDirection: "clockwise",
    planetTexture: "/assets/venus-map.jpg",
    rimHex: 0xb66f1f,
  },
  {
    orbitSpeed: 0.00024,
    orbitRadius: 19,
    orbitRotationDirection: "clockwise",
    planetSize: 0.3,
    planetRotationSpeed: 0.01,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/mars-map.jpg",
    rimHex: 0xbc6434,
  },
  {
    orbitSpeed: 0.00013,
    orbitRadius: 22,
    orbitRotationDirection: "clockwise",
    planetSize: 1,
    planetRotationSpeed: 0.06,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/jupiter-map.jpg",
    rimHex: 0xf3d6b6,
  },
  {
    orbitSpeed: 0.0001,
    orbitRadius: 25,
    orbitRotationDirection: "clockwise",
    planetSize: 0.8,
    planetRotationSpeed: 0.05,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/saturn-map.jpg",
    rimHex: 0xd6b892,
    rings: {
      ringsSize: 0.5,
      ringsTexture: "/assets/saturn-rings.jpg",
    },
  },
  {
    orbitSpeed: 0.00007,
    orbitRadius: 28,
    orbitRotationDirection: "clockwise",
    planetSize: 0.5,
    planetRotationSpeed: 0.02,
    planetRotationDirection: "clockwise",
    planetTexture: "/assets/uranus-map.jpg",
    rimHex: 0x9ab6c2,
    rings: {
      ringsSize: 0.4,
      ringsTexture: "/assets/uranus-rings.jpg",
    },
  },
  {
    orbitSpeed: 0.000054,
    orbitRadius: 31,
    orbitRotationDirection: "clockwise",
    planetSize: 0.5,
    planetRotationSpeed: 0.02,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/neptune-map.jpg",
    rimHex: 0x5c7ed7,
  },
  {
    orbitSpeed: 0.000054,
    orbitRadius: 34,
    orbitRotationDirection: "clockwise",
    planetSize: 0.5,
    planetRotationSpeed: 0.02,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/assets/pluto-map.jpg",
    rimHex: 0x0c0e07,
  },
];

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, w / h, 0.1, 100);
const renderer = new WebGLRenderer({ antialias: true });
const orbitControls = new OrbitControls(camera, renderer.domElement);
const pointerControls = new PointerLockControls(camera, document.body); // Add PointerLockControls

// Movement-related variables for PointerLockControls
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const velocity = new Vector3();
const direction = new Vector3();
const movementSpeed = 5;

// OrbitControls setup
orbitControls.minDistance = 10;
orbitControls.maxDistance = 60;
camera.position.set(30 * Math.cos(Math.PI / 6), 30 * Math.sin(Math.PI / 6), 40);

// Renderer setup
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputColorSpace = LinearSRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Add celestial objects
const sun = new Sun().getSun();
scene.add(sun);

const earth = new Earth({
  orbitSpeed: 0.00029,
  orbitRadius: 16,
  orbitRotationDirection: "clockwise",
  planetSize: 0.5,
  planetAngle: (-23.4 * Math.PI) / 180,
  planetRotationSpeed: 0.01,
  planetRotationDirection: "counterclockwise",
  planetTexture: "/solar-system-threejs/assets/earth-map-1.jpg",
}).getPlanet();
scene.add(earth);

const starfield = new Starfield().getStarfield();
scene.add(starfield);

planets.forEach((item) => {
  const planet = new Planet(item).getPlanet();
  scene.add(planet);
});

// Handle window resize
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// PointerLockControls movement controls
const onKeyDown = (event) => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;
  }
};

const onKeyUp = (event) => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;
  }
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Switch between Orbit and PointerLock controls on click
document.addEventListener("click", () => {
  if (pointerControls.isLocked) {
    pointerControls.unlock();  // Switch back to OrbitControls
    orbitControls.enabled = true;  // Re-enable OrbitControls
  } else {
    pointerControls.lock();  // Lock to PointerLockControls
    orbitControls.enabled = false;  // Disable OrbitControls while PointerLock is active
  }
});

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  if (pointerControls.isLocked) {
    // Free movement mode
    const delta = 0.1;  // Time step for movement

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // To avoid faster diagonal movement

    if (moveForward || moveBackward) velocity.z -= direction.z * movementSpeed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * movementSpeed * delta;

    pointerControls.moveRight(-velocity.x * delta);
    pointerControls.moveForward(-velocity.z * delta);

    // Damp velocity for smooth movement
    velocity.x *= 0.9;
    velocity.z *= 0.9;
  } else {
    // Orbit mode
    orbitControls.update();
  }

  renderer.render(scene, camera);
};

animate();
