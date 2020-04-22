export default class TicketForm {
  constructor() {
    this.container = null;
    this.element = null;
    this.titleEl = null;
    this.closeButtons = [];
    this.submitListener = null;
    this.closeListener = null;
  }

  init() {
    this.element = document.createElement('form');
    this.element.classList.add('ticket_modal', 'modal');
    this.element.id = 'ticket_modal';
    this.element.innerHTML = `
      <div>
        <a class="close_btn close" title="Закрыть">X</a>
        <h3 class="title"></h3>
        <div class="task_input">
          <label class="task_name_title" for="task_name">Краткое описание</label>
          <input class="task_name" type="text" id="task_name" placeholder="Введите краткое описание задачи" required>
          <label class="task_description_title" for="task_description">Подробное описание</label>
          <textarea class="task_description" type="text" rows="6" cols="54" placeholder="Введите подробное описание задачи "></textarea>
          <div class="modal_footer">
            <button type="button" class="cancel_btn close">Отмена</button>
            <button type="submit" form="ticket_modal" class="ok_btn">Ok</button>
          </div>
        </div>
      </div>
    `;

    this.titleEl = this.element.querySelector('.title');
    this.closeButtons = this.element.querySelectorAll('.close');
    this.nameInput = this.element.querySelector('.task_name');
    this.descriptionInput = this.element.querySelector('.task_description');

    this.nameInput.addEventListener('input', this.validateName.bind(this));

    this.element.addEventListener('submit', this.onSubmit.bind(this));
    this.closeButtons.forEach((o) => o.addEventListener('click', this.onClose.bind(this)));

    this.container.appendChild(this.element);
  }

  validateName() {
    if (this.nameInput.value === '') {
      this.nameInput.setCustomValidity('Поле не заполнено!');
    } else {
      this.nameInput.setCustomValidity('');
    }
  }

  show(onSubmit, onClose, options) {
    this.titleEl.textContent = options.title ? options.title : 'Тикет';
    this.nameInput.value = options.name ? options.name : '';
    this.descriptionInput.value = options.description ? options.description : '';
    this.submitListener = onSubmit;
    this.closeListener = onClose;
    this.element.classList.add('show');
  }

  hide() {
    this.submitListener = null;
    this.closeListener = null;
    this.element.classList.remove('show');
    this.clear();
  }

  clear() {
    this.titleEl.textContent = '';
    this.nameInput.value = '';
    this.descriptionInput.value = '';
  }

  onSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.nameInput.value,
      description: this.descriptionInput.value,
    };
    if (this.nameInput.checkValidity() && this.submitListener) {
      this.submitListener.call(null, data);
    }
  }

  onClose() {
    const data = {
      name: this.nameInput.value,
      price: this.descriptionInput.value,
    };
    if (this.closeListener) {
      this.closeListener.call(null, data);
    }
  }

  bindToDOM(container) {
    this.container = container;
  }
}
