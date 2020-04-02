export default class TableManager {
  constructor(data = []) {
    this.container = null;
    this.data = data;
    this.sortingColumn = null;
    this.sortingMethod = null;
  }

  redrawTable() {
    this.checkBinding();

    this.container.innerHTML = `
      <table class="table">
        <thead class="table-head"></thead>
        <tbody class="table-body"></tbody>
        <tfoot class="table-foot"></tfoot>
      </table>
    `;

    const bodyEl = this.container.querySelector('.table-body');

    if (!this.data.length) return;

    {
      const trEl = document.createElement('tr');
      for (const key of Object.keys(this.data[0])) {
        const thEl = document.createElement('th');
        thEl.textContent = key;

        if (Object.keys(this.data[0])[this.sortingColumn] === key) {
          thEl.textContent += (this.sortingMethod === 'asc') ? ' ↑' : ' ↓';
        }

        trEl.appendChild(thEl);
      }
      bodyEl.appendChild(trEl);
    }

    for (const object of this.data) {
      const trEl = document.createElement('tr');
      for (const entry of Object.entries(object)) {
        const tdEl = document.createElement('td');
        tdEl.textContent = (entry[0] === 'imdb') ? entry[1].toFixed(2) : entry[1];
        trEl.appendChild(tdEl);
      }
      bodyEl.appendChild(trEl);
    }
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
