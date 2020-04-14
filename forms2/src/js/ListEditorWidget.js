export default class ListEditorWidget {
  constructor(container) {
    this.container = container;
    this.deleteEventListeners = [];
    this.addEventListeners = [];
    this.editEventListeners = [];
  }

  init() {
    this.container.innerHTML = `
      <div class="list_editor_title">
        Товары
        <div class="add" title="Добавить">+</div>
      </div>
      <table><tbody class="goods"></tbody></table>
    `;
    this.listEl = this.container.querySelector('.goods');

    this.container.querySelector('.add').addEventListener('click', this.onAdd.bind(this));
    this.container.querySelector('.goods').addEventListener('click', (event) => {
      if (event.target.classList.contains('edit')) {
        this.onEdit(event);
      }
      if (event.target.classList.contains('delete')) {
        this.onDelete(event);
      }
    });
  }

  update(entries = []) {
    this.listEl.innerHTML = `
    <tr class="tit">
      <th class="name">Наименование</th>
      <th class="price">Стоимость</th>
      <th class="action">Действия</th>
    </tr>
    `;
    for (const entry of entries) {
      const tr = document.createElement('tr');
      tr.classList.add('product');
      tr.innerHTML = `
        <td class="name">${entry.name}</td>
        <td class="price">${entry.price} ₽</td>
        <td class="action" data-id=${entry.id}>
          <div class="edit" title="Редактировать"></div>
          <div class="delete" title="Удалить"></div>
        </td>
      `;
      this.listEl.appendChild(tr);
    }
  }

  bindToDOM(container) {
    this.container = container;
  }

  addOnAddEventListener(callback) {
    this.addEventListeners.push(callback);
  }

  addOnEditEventListener(callback) {
    this.editEventListeners.push(callback);
  }

  addOnDeleteEventListener(callback) {
    this.deleteEventListeners.push(callback);
  }

  onAdd() {
    this.addEventListeners.forEach((o) => o.call(null));
  }

  onEdit(event) {
    const id = event.target.parentElement.getAttribute('data-id');
    this.editEventListeners.forEach((o) => o.call(null, id));
  }

  onDelete(event) {
    const id = event.target.parentElement.getAttribute('data-id');
    this.deleteEventListeners.forEach((o) => o.call(null, id));
  }
}
