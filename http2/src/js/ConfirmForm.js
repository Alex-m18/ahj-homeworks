export default class ConfirmForm {
  constructor() {
    this.container = null;
    this.element = null;
    this.messageEl = null;
    this.closeButtons = [];
    this.submitListener = null;
    this.closeListener = null;
  }

  init() {
    this.element = document.createElement('form');
    this.element.classList.add('confirm_modal', 'modal');
    this.element.id = 'confirm_modal';
    this.element.innerHTML = `
      <div>
        <a class="close_btn close" title="Закрыть">X</a>
        <h3 class="title">HelpDesk</h3>
        <div class="task_input">
          <div class="modal_footer">
            <button type="button" class="cancel_btn close">Отмена</button>
            <button type="button" class="ok_btn">Ok</button>
          </div>
        </div>
      </div>
    `;

    this.messageEl = this.element.querySelector('.title');
    this.okButton = this.element.querySelector('.ok_btn');
    this.closeButtons = this.element.querySelectorAll('.close');

    this.okButton.addEventListener('click', this.onSubmit.bind(this));
    this.closeButtons.forEach((o) => o.addEventListener('click', this.onClose.bind(this)));

    this.container.appendChild(this.element);
  }

  show(onSubmit, onClose, options = { message: '' }) {
    this.messageEl.innerHTML = options.message;
    this.submitListener = onSubmit;
    this.closeListener = onClose;
    this.element.classList.add('show');
  }

  hide() {
    this.messageEl.innerHTML = '';
    this.submitListener = null;
    this.closeListener = null;
    this.element.classList.remove('show');
    this.clear();
  }

  clear() {
    this.messageEl.textContent = '';
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.submitListener) {
      this.submitListener.call(null);
    }
  }

  onClose() {
    if (this.closeListener) {
      this.closeListener.call(null);
    }
  }

  bindToDOM(container) {
    this.container = container;
  }
}
