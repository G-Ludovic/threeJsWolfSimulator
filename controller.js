import * as THREE from 'three';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bindUI();
  }

  bindUI() {
    const model = this.model;
    const view = this.view;

    const btn = document.getElementById('toggleRotation');
    if (btn) {
      btn.textContent = '⏸ Stop rotation';
      btn.addEventListener('click', () => {
        model.toggleRotation();
        btn.textContent = model.getRotateState() ? '⏸ Stop rotation' : '▶ Start rotation';
      });
    }

    const speedSlider = document.getElementById('speedSlider');
    if (speedSlider) speedSlider.addEventListener('input', (e) => model.setRotationSpeed(parseFloat(e.target.value)));

    const lightSlider = document.getElementById('lightSlider');
    if (lightSlider) lightSlider.addEventListener('input', (e) => model.setLightIntensity(parseFloat(e.target.value)));

    // Fond
    let bgColor = '#222222';
    const bgColorInput = document.getElementById('bgColor');
    const applyBtn = document.getElementById('applyBgColor');
    if (bgColorInput) bgColorInput.addEventListener('input', (e) => bgColor = e.target.value);
    if (applyBtn) applyBtn.addEventListener('click', () => view.setBackgroundColor(bgColor));

    // Couleur fourrure
    // const furColorInput = document.getElementById('furColor');
    // if (furColorInput) furColorInput.addEventListener('input', (e) => model.setFurColor(e.target.value));

    // Texture fourrure
    const furTextureSelect = document.getElementById('furTexture');
    if (furTextureSelect) {
      furTextureSelect.addEventListener('change', (e) => {
        model.setFurTexture(e.target.value);
      });
    }
  }
}

