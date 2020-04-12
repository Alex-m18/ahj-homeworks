export default class Popover {
  constructor(options = { container: null, title: 'title', content: 'content' }) {
    this.container = options.container;
    this.title = options.title;
    this.content = options.content;
    this.popoverEl = null;
  }

  init() {
    this.popoverEl = document.createElement('div');
    this.popoverEl.classList.add('popover');
    this.popoverEl.setAttribute('data-title', this.title);
    this.popoverEl.setAttribute('data-content', this.content);
    this.popoverEl.innerHTML = `
      <h3 class="popover_title">${this.title}</h3>
      <div class="popover_content">${this.content}</div>
    `;
    this.popoverEl.style.position = 'absolute';
    this.hide();
    this.container.classList.add('popover_container');
    this.container.appendChild(this.popoverEl);
  }

  show() {
    this.popoverEl.style.display = 'block';
    this.popoverEl.hidden = false;
    this.popoverEl.classList.remove('popover_disabled');
    this.popoverEl.classList.add('popover_enabled');
    this.update();
  }

  hide() {
    this.popoverEl.style.display = 'none';
    this.popoverEl.classList.remove('popover_enabled');
    this.popoverEl.classList.add('popover_disabled');
    this.popoverEl.hidden = true;
  }

  toggle() {
    if (this.hidden) {
      this.show();
    } else {
      this.hide();
    }
  }

  dispose() {
    this.container.classList.remove('popover_container');
    this.popoverEl.remove();
  }

  get hidden() {
    return this.popoverEl.hidden;
  }

  update() {
    this.popoverEl.style.top = `${-this.popoverEl.offsetHeight - 12}px`;
    this.popoverEl.style.left = `${this.container.offsetWidth / 2
      - this.popoverEl.offsetWidth / 2}px`;
  }
}
