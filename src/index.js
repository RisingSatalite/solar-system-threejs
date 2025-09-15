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
import { Earth } from "./components/planets/earth";
import { Planet } from "./components/base/planet";
import { Starfield } from "./starfield";
import { Mars } from "./components/planets/mars";
import { Venus } from "./components/planets/venus";
import { Saturn } from "./components/planets/saturn";
import { Jupiter } from "./components/planets/jupiter";

import { inject } from '@vercel/analytics';
 
inject();

//Make sure WebGL is available
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

function showWebGLErrorMessage() {
  const warning = document.createElement('div');
  warning.style.position = 'fixed';
  warning.style.top = '0';
  warning.style.left = '0';
  warning.style.width = '100vw';
  warning.style.height = '100vh';
  warning.style.background = '#111';
  warning.style.color = '#f00';
  warning.style.display = 'flex';
  warning.style.alignItems = 'center';
  warning.style.justifyContent = 'center';
  warning.style.fontFamily = 'sans-serif';
  warning.style.fontSize = '20px';
  warning.style.zIndex = '9999';
  warning.innerHTML = `
    🚫 WebGL could not be initialized.<br>
    This might be due to missing GPU drivers, disabled hardware acceleration, or a browser issue.<br>
    Try restarting your browser or your computer.
  `;
  document.body.appendChild(warning);
}

if (isWebGLAvailable()) {

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
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false, moveUp = false, moveDown = false;
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

const earth = new Earth().getPlanet();
scene.add(earth);

const mars = new Mars().getPlanet();
scene.add(mars)

const venus = new Venus().getPlanet();
scene.add(venus)

const saturn = new Saturn().getPlanet();
scene.add(saturn)

const jupiter = new Jupiter().getPlanet();
scene.add(jupiter)

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
    case 'KeyE':  // Move Up
      moveUp = true;
      break;
    case 'KeyQ':  // Move Down
      moveDown = true;
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
    case 'KeyE':  // Stop moving up
      moveUp = false;
      break;
    case 'KeyQ':  // Stop moving down
      moveDown = false;
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
    const delta = 0.1;  // Adjust time step

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.y = Number(moveUp) - Number(moveDown);
    direction.normalize(); // To avoid faster diagonal movement

    if (moveForward || moveBackward) velocity.z -= direction.z * movementSpeed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * movementSpeed * delta;
    if (moveUp || moveDown) velocity.y -= direction.y * movementSpeed * delta;

    // Apply horizontal movement
    pointerControls.moveRight(-velocity.x * delta);
    pointerControls.moveForward(-velocity.z * delta);

    // Apply vertical movement directly to the camera's y position
    camera.position.y += velocity.y * delta;

    // Damp velocity for smooth movement
    velocity.x *= 0.9;
    velocity.z *= 0.9;
    velocity.y *= 0.9;
  } else {
    // Orbit mode
    orbitControls.update();
  }

  renderer.render(scene, camera);
};


animate();

const helpBtn = document.createElement("button");
helpBtn.innerText = "?";
helpBtn.id = "help-btn";
helpBtn.style.cssText = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const helpPopup = document.createElement("div");
helpPopup.id = "help-popup";
helpPopup.style.cssText = `
  position: absolute;
  top: 60px;
  right: 1rem;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  width: 250px;
  font-size: 14px;
  display: none;
  z-index: 1000;
`;

helpPopup.innerHTML = `
  <h3 style="margin-top: 0;">Camera Controls</h3>
  <p>🖱 Click + Hold + Drag: Rotate around the center</p>
  <p>🖱 Right Click + then Drag: Rotate camera angle</p>
  <p>🔍 Scroll Wheel or drag in and drag out: Zoom</p>
  <p>🕹 W: Move forwards</p>
  <p>🕹 A: Move left</p>
  <p>🕹 S: Move backwards</p>
  <p>🕹 D: Move rights</p>
  <p>🕹 Q: Move up</p>
  <p>🕹 E: Move down</p>
  <p>🖱 Click anywhere to switch modes</p>
  <button id="close-help" style="
    margin-top: 0.5rem;
    background: #555;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  ">Close</button>
`;

document.body.appendChild(helpBtn);
document.body.appendChild(helpPopup);

helpBtn.addEventListener("click", () => {
  helpPopup.style.display = "block";
});

document.getElementById("close-help").addEventListener("click", () => {
  helpPopup.style.display = "none";
});

} else {
  showWebGLErrorMessage(); // <-- This gets triggered if WebGL is unsupported
}