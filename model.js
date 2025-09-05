import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class Model {
  constructor() {
    this.wolf = null;
    this.rotateWolf = true;
    this.rotationSpeed = 0.005; // par défaut
    this.lightIntensity = 5;     // par défaut

    this.objLoader = new OBJLoader();
  }

  loadWolf(pathObj = './models/Wolf_obj.obj', texturePath = './textures/Wolf_Body.jpg') {
    return new Promise((resolve, reject) => {
      this.objLoader.load(
        pathObj,
        (object) => {
          const texture = new THREE.TextureLoader().load(texturePath);
          object.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshPhongMaterial({ map: texture });
            }
          });

          object.scale.set(3, 3, 3);
          object.position.set(0, 0, 0);

          this.wolf = object;
          resolve(object);
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  toggleRotation() {
    this.rotateWolf = !this.rotateWolf;
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  setLightIntensity(intensity) {
    this.lightIntensity = intensity;
  }

  getRotateState() {
    return this.rotateWolf;
  }
}

