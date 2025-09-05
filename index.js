import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.myWebGL3d');

// Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 3);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // inertie dans le mouvement
controls.target.set(0, 1, 0); // regarde vers la hauteur du loup

// Charger le modèle OBJ
let wolf = null;

const objLoader = new OBJLoader();
objLoader.load(
  './models/Wolf_obj.obj',
  (object) => {
    const texture = new THREE.TextureLoader().load('./textures/Wolf_Fur.jpg');
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhongMaterial({ map: texture });
      }
    });

    wolf = object;
    wolf.scale.set(2.5, 2.5, 2.5); // ajuste l’échelle si le modèle est trop grand
    wolf.position.set(0, 0, 0);
    scene.add(wolf);
  },

);

// Resize adaptatif
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

// Contrôle de la rotation via UI
let rotateWolf = true;
const toggleBtn = document.getElementById('toggleRotation');
toggleBtn.addEventListener('click', () => {
  rotateWolf = !rotateWolf;
  toggleBtn.textContent = rotateWolf ? '⏸ Stop rotation' : '▶ Start rotation';
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  if (wolf && rotateWolf) {
    wolf.rotation.y += 0.005; // rotation lente du loup
  }

  controls.update(); // nécessaire pour OrbitControls
  renderer.render(scene, camera);
}

animate();