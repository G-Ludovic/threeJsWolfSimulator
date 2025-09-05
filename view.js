import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class View {
  constructor(model) {
    this.model = model;

    // Canvas
    this.canvas = document.querySelector('canvas.myWebGL3d');

    // Scene
    this.scene = new THREE.Scene();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight
    );
    this.camera.position.set(0, 1, 5);
    this.scene.add(this.camera);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);

    // Resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Load model into scene
    this.model.loadWolf().then((wolf) => {
      this.scene.add(wolf);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.model.wolf && this.model.getRotateState()) {
      this.model.wolf.rotation.y += 0.005;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
