import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class View {
  constructor(model) {
    this.model = model;

    this.canvas = document.querySelector('canvas.myWebGL3d');
    this.scene = new THREE.Scene();

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, this.model.lightIntensity);
    this.pointLight.position.set(5, 5, 5);
    this.scene.add(this.pointLight);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    this.camera.position.set(0, 1, 5);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene.background = new THREE.Color(0x999888);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.minPolarAngle = 0.3;
    this.controls.maxPolarAngle = Math.PI / 2;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.model.loadWolf().then((wolf) => {
      this.scene.add(wolf);
      const box = new THREE.Box3().setFromObject(wolf);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      this.controls.target.copy(center);
      this.camera.position.copy(center);
      this.camera.position.z += size * 1.2;
      this.camera.lookAt(center);
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

