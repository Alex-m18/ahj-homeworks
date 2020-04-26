export default class NicknameForm {
  constructor() {
    this.container = null;
    this.element = null;
    this.inputEl = null;
    this.closeButtons = [];
    this.submitListener = null;
    this.validateListener = null;
  }

  init() {
    this.element = document.createElement('form');
    this.element.classList.add('bg_popup');
    this.element.id = 'bg_popup';
    this.element.innerHTML = `
      <div id="popup">
        <h2 class="title">Выберите псевдоним</h2>
        <input type="text" class="nic-control" placeholder="Введите никнейм от 2 до 12 символов для регистрации в чате" required minlength="2" maxlength="12">
        <!--<span class="form_hint" aria-live="Пожалуйста, заполните правильно поле"></span>
        <span class="error" aria-live="Никнейм занят!"></span>-->
        <a class="close" href="#" title="Закрыть">X</a>
        <button type="submit" form="bg_popup" class="continue">Продолжить</button>
      </div>
    `;
    this.container.appendChild(this.element);

    this.inputEl = this.element.querySelector('input');
    this.inputEl.addEventListener('input', this.validateInput.bind(this));

    this.closeButtons = this.element.querySelectorAll('.close');
    this.closeButtons.forEach((o) => o.addEventListener('click', this.onClose.bind(this)));

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  async validateInput() {
    if (this.inputEl.value.length < 2 || this.inputEl.value.length > 12) {
      this.inputEl.setCustomValidity('Длина никнейма должна быть от 2 до 12 символов');
      return false;
    }
    if (!(await this.validateListener(this.inputEl.value))) {
      this.inputEl.setCustomValidity('Никнейм занят');
      return false;
    }
    this.inputEl.setCustomValidity('');
    return true;
  }

  show(onSubmit, onClose, onValidate) {
    this.submitListener = onSubmit;
    this.closeListener = onClose;
    this.validateListener = onValidate;
    this.element.classList.add('show');
  }

  hide() {
    this.submitListener = null;
    this.closeListener = null;
    this.element.classList.remove('show');
  }

  async onSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.inputEl.value,
    };
    const validated = await this.validateInput();
    if (validated && this.submitListener) {
      this.submitListener.call(null, data);
    }
  }

  onClose() {
    const data = {
      name: this.inputEl.value,
    };
    if (this.closeListener) {
      this.closeListener.call(null, data);
    }
  }

  bindToDOM(container) {
    this.container = container;
  }
}
