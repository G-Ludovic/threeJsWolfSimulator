import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

export class Model {
  constructor() {
    this.wolf = null;
    this.rotationSpeed = 0.005;
    this.lightIntensity = 3;
    this.rotateWolf = true;
    this.furColor = '#ffffff';
    this.furTexture = 'Wolf_Body.jpg';
  }

  async loadWolf() {
    if (this.wolf) return this.wolf;

    return new Promise((resolve, reject) => {
      const loader = new OBJLoader();
      loader.load(`./models/Wolf_One_obj.obj`, (obj) => {
        this.applyFurTexture(obj);
        obj.scale.set(2.5, 2.5, 2.5);
        this.wolf = obj;
        resolve(this.wolf);
      }, undefined, reject);
    });
  }

  applyFurTexture(obj) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(`./textures/${this.furTexture}`);
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          color: new THREE.Color(this.furColor),
          roughness: 0.5,
          metalness: 0
        });
      }
    });
  }

  // setFurColor(color) {
  //   this.furColor = color;
  //   if (this.wolf) {
  //     this.wolf.traverse((child) => {
  //       if (child.isMesh) child.material.color.set(color);
  //     });
  //   }
  // }

  setFurTexture(textureFile) {
    this.furTexture = textureFile;
    if (this.wolf) this.applyFurTexture(this.wolf);
  }

  toggleRotation() {
    this.rotateWolf = !this.rotateWolf;
  }

  getRotateState() {
    return this.rotateWolf;
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  setLightIntensity(intensity) {
    this.lightIntensity = intensity;
  }
}
