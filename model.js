import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class Model {
  constructor() {
    this.wolf = null;
    this.rotateWolf = true;

    this.objLoader = new OBJLoader();
  }

  loadWolf(pathObj = './models/Wolf_obj.obj', texturePath = './textures/Wolf_Fur.jpg') {
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
          object.scale.set(2.5, 2.5, 2.5);
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

  getRotateState() {
    return this.rotateWolf;
  }
}
