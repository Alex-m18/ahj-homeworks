export default class TrelloWidget {
  constructor() {
    this.container = null;
    this.element = null;
    this.addAnotherClickEventListeners = [];
    this.dragTaskEventListeners = [];
    // this.addEventListeners = [];
    // this.editEventListeners = [];
    // this.deleteEventListeners = [];
  }

  init() {
    this.element = document.createElement('main');
    this.element.classList.add('trello');
    this.element.id = 'trello';

    this.element.addEventListener('click', this.onClick.bind(this));

    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.element.addEventListener('mouseup', this.onMouseUp.bind(this));

    // this.element.addEventListener('drag', );

    // this.element.querySelector('.add').addEventListener('click', this.onAdd.bind(this));
    // this.element.addEventListener('click', (event) => {
    //   if (event.target.classList.contains('edit')) {
    //     this.onEdit(event);
    //   }
    //   if (event.target.classList.contains('delete')) {
    //     this.onDelete(event);
    //   }
    // });

    this.container.appendChild(this.element);
  }

  update(columns = []) {
    this.element.innerHTML = '';
    columns.forEach((c) => {
      c.update();
      this.element.appendChild(c.widget.element);
    });
  }

  bindToDOM(container) {
    this.container = container;
  }

  addOnAddAnotherClickEventListener(callback) {
    this.addAnotherClickEventListeners.push(callback);
  }

  addOnDragTaskEventListener(callback) {
    this.dragTaskEventListeners.push(callback);
  }

  // addOnAddEventListener(callback) {
  //   this.addEventListeners.push(callback);
  // }

  // addOnEditEventListener(callback) {
  //   this.editEventListeners.push(callback);
  // }

  // addOnDeleteEventListener(callback) {
  //   this.deleteEventListeners.push(callback);
  // }

  onMouseDown(event) {
    if (event.target.classList.contains('delete_task')) return;
    if (!event.target.closest('.task')) return;
    event.preventDefault();

    this.draggingEl = event.target.closest('.task');
    this.ghostEl = this.draggingEl.cloneNode(true);

    this.draggingEl.classList.add('faded');
    this.ghostEl.classList.add('dragging');

    this.element.appendChild(this.ghostEl);
    this.ghostEl.style.width = `${this.draggingEl.offsetWidth
      - this.ghostEl.querySelector('.delete_task').offsetWidth - 4}px`;
    this.ghostEl.querySelector('.delete_task').remove();
    this.ghostEl.style.left = `${this.draggingEl.offsetLeft}px`;
    this.ghostEl.style.top = `${this.draggingEl.offsetTop}px`;
    this.dragOffsetX = event.layerX - this.ghostEl.offsetLeft;
    this.dragOffsetY = event.layerY - this.ghostEl.offsetTop;
  }

  onMouseMove(event) {
    if (!this.draggingEl) return;
    event.preventDefault();

    this.ghostEl.style.left = `${event.layerX - this.dragOffsetX}px`;
    this.ghostEl.style.top = `${event.layerY - this.dragOffsetY}px`;
  }

  onMouseLeave(event) {
    if (!this.draggingEl) return;
    event.preventDefault();

    this.ghostEl.remove();
    this.draggingEl.classList.remove('faded');
    this.draggingEl = null;
    this.ghostEl = null;
  }

  onMouseUp(event) {
    if (!this.draggingEl) return;
    event.preventDefault();

    // this.element.style.pointerEvents = 'unset';
    this.element.removeChild(this.ghostEl);
    this.ghostEl = null;
    this.draggingEl.classList.remove('faded');

    const closest = document.elementFromPoint(event.pageX, event.pageY).closest('.task');
    if (closest) {
      const options = {
        from: {
          column: this.draggingEl.closest('.column').getAttribute('data-id'),
          task: this.draggingEl.getAttribute('data-id'),
        },
        to: {
          column: closest.closest('.column').getAttribute('data-id'),
          task: closest.getAttribute('data-id'),
        },
      };
      this.dragTaskEventListeners.forEach((o) => o.call(null, options));
    }

    this.draggingEl = null;
  }

  onClick(event) {
    if (event.target.classList.contains('add_another')) {
      const column = event.target.closest('.column');
      this.onAddAnotherClick(column.getAttribute('data-id'));
    }
  }

  onAddAnotherClick(id) {
    this.addAnotherClickEventListeners.forEach((o) => o.call(null, id));
  }

  // onAdd() {
  //   this.addEventListeners.forEach((o) => o.call(null));
  // }

  // onEdit(event) {
  //   const id = event.target.parentElement.getAttribute('data-id');
  //   this.editEventListeners.forEach((o) => o.call(null, id));
  // }

  // onDelete(event) {
  //   const id = event.target.parentElement.getAttribute('data-id');
  //   this.deleteEventListeners.forEach((o) => o.call(null, id));
  // }
}
