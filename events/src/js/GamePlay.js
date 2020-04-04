import calcTileType from './utils';

export default class GamePlay {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.container = null;
    this.boardEl = null;
    this.lifesEl = null;
    this.pointsEl = null;
    this.cells = [];
    this.cellClickListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="stat-container">
        <div data-id="lifes" class="stat-lifes"></div>
        <div data-id="points" class="stat-points"></div>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.boardEl = this.container.querySelector('[data-id=board]');
    this.boardEl.style['grid-template-columns'] = `repeat(${this.boardSize}, 1fr)`;

    this.lifesEl = this.container.querySelector('[data-id=lifes]');
    this.pointsEl = this.container.querySelector('[data-id=points]');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile', `map-tile-${calcTileType(i, this.boardSize)}`);
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  redrawPosition(position) {
    const charEl = document.querySelector('.character');
    const cellEl = this.boardEl.children[position];
    if (!charEl) {
      const newCharEl = document.createElement('div');
      newCharEl.classList.add('character');

      cellEl.appendChild(newCharEl);
      return;
    }

    cellEl.appendChild(charEl); // move
  }

  redrawStat(lifes, points) {
    this.lifesEl.innerHTML = `Lifes: ${lifes}`;
    this.pointsEl.innerHTML = `Points: ${points}`;
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
