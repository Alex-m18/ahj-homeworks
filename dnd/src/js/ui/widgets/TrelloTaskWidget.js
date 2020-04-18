import uniqid from 'uniqid';

export default class TrelloTaskWidget {
  constructor(content = '') {
    this.id = uniqid();
    this.content = content;
    this.container = null;
    this.element = null;
    // this.deleteButtonEl = null;
    // this.deleteEventListeners = [];

    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('task');
    this.element.setAttribute('data-id', this.id);
    this.element.innerHTML = `${this.content}<span class="delete_task">✖</span>`;
    this.deleteButtonEl = this.element.querySelector('.delete_task');

    this.element.addEventListener('mouseenter', this.showDeleteButton.bind(this));
    this.element.addEventListener('mouseleave', this.hideDeleteButton.bind(this));
    // this.deleteButtonEl.addEventListener('click', this.onDelete.bind(this));
  }

  update() {
    this.init();
  }

  // bindToDOM(container) {
  //   this.container = container;
  // }

  showDeleteButton() {
    this.deleteButtonEl.classList.add('show');
  }

  hideDeleteButton() {
    this.deleteButtonEl.classList.remove('show');
  }

  setContent(content) {
    this.content = content;
    this.init();
  }

  // addOnDeleteEventListener(callback) {
  //   this.deleteEventListeners.push(callback);
  // }

  // onDelete(event) {
  //   this.deleteEventListeners.forEach((o) => o.call(null, this.id));
  // }
}

TrelloTaskWidget.fromObject = (object) => {
  const widget = new TrelloTaskWidget(object.content);
  widget.id = object.id;
  return widget;
};
