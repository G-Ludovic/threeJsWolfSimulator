export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bindUI();
  }

  bindUI() {
    const view = this.view;
    const model = this.model;

    // Bouton rotation
    const btn = document.getElementById('toggleRotation');
    if (btn) {
      btn.textContent = '⏸ Stop rotation';
      btn.addEventListener('click', () => {
        model.toggleRotation();
        btn.textContent = model.getRotateState()
          ? '⏸ Stop rotation'
          : '▶ Start rotation';
      });
    }

    // Slider vitesse rotation
    const speedSlider = document.getElementById('speedSlider');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        model.setRotationSpeed(parseFloat(e.target.value));
      });
    }

    // Slider intensité lumière
    const lightSlider = document.getElementById('lightSlider');
    if (lightSlider) {
      lightSlider.addEventListener('input', (e) => {
        model.setLightIntensity(parseFloat(e.target.value));
      });
    }

    // Sélecteur couleur fond + bouton appliquer
    let chosenColor = '#000000'; // couleur par défaut
    const bgColorInput = document.getElementById('bgColor');
    const applyBtn = document.getElementById('applyBgColor');

    if (bgColorInput) {
      bgColorInput.addEventListener('input', (e) => {
        chosenColor = e.target.value; // stocke la couleur choisie
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        view.setBackgroundColor(chosenColor);
      });
    }
  }
}  
    

