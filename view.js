import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class View {
  constructor(model) {
    this.model = model;
    this.canvas = document.querySelector('canvas.myWebGL3d');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x222222);

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, this.model.lightIntensity);
    this.pointLight.position.set(5, 5, 5);
    this.scene.add(this.pointLight);

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

    // Couleur de fond
    this.scene.background = new THREE.Color(0x222222); // gris sombre par défaut

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

    // Load wolf
    this.model.loadWolf().then((wolf) => {
      this.scene.add(wolf);
    });
  }

  setBackgroundColor(color) {
    this.scene.background = new THREE.Color(color);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.model.wolf && this.model.getRotateState()) {
      this.model.wolf.rotation.y += this.model.rotationSpeed;
    }

    this.pointLight.intensity = this.model.lightIntensity;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    }
}
