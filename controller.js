export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bindUI();
  }

  bindUI() {
    const btn = document.getElementById('toggleRotation');
    if (!btn) {
      console.warn('⚠️ Bouton #toggleRotation introuvable');
      return;
    }

    btn.textContent = '⏸ Stop rotation';

    btn.addEventListener('click', () => {
      this.model.toggleRotation();
      btn.textContent = this.model.getRotateState()
        ? '⏸ Stop rotation'
        : '▶ Start rotation';
    });

    // Exemple: touche "r" pour toggle rotation
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'r') {
        this.model.toggleRotation();
        btn.textContent = this.model.getRotateState()
          ? '⏸ Stop rotation'
          : '▶ Start rotation';
      }
    });
  }
}
