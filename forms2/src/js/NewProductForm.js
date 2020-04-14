export default class NewProductForm {
  constructor(container) {
    this.container = container;
    this.element = null;
    this.submitListener = null;
    this.closeListener = null;
  }

  init() {
    this.element = document.createElement('form');
    this.element.classList.add('modal', 'fade', 'in');
    this.element.id = 'modal-new-product';
    this.element.setAttribute('data-modal-id', 'newProduct');
    this.element.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Закрыть">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">Новый товар</h4>
          </div>
          <div class="modal-body">
            <form class="form" id="new-product-form">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Название" name="name" required>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Стоимость" name="price" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left close" data-dismiss="modal">Отмена</button>
            <button type="submit" class="btn btn-primary" form="modal-new-product">Сохранить</button>
          </div>
        </div>
      </div>
    `;

    this.closeButtons = this.element.querySelectorAll('.close');
    this.nameInput = this.element.querySelector('input[name=name]');
    this.priceInput = this.element.querySelector('input[name=price]');

    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.priceInput.addEventListener('input', this.validatePrice.bind(this));

    this.element.addEventListener('submit', this.onSubmit.bind(this));
    this.closeButtons.forEach((o) => o.addEventListener('click', this.onClose.bind(this)));

    this.container.appendChild(this.element);
  }

  validateName() {
    if (this.nameInput.value === '') {
      this.nameInput.setCustomValidity('Введите название товара');
    } else {
      this.nameInput.setCustomValidity('');
    }
  }

  validatePrice() {
    const price = Number(this.priceInput.value);
    if (!price || price <= 0) {
      this.priceInput.setCustomValidity('Введите число больше нуля');
    } else {
      this.priceInput.setCustomValidity('');
    }
  }

  show(submit, close) {
    this.submitListener = submit;
    this.closeListener = close;
    this.element.classList.add('show');
  }

  hide() {
    this.submitListener = null;
    this.closeListener = null;
    this.clear();
    this.element.classList.remove('show');
  }

  clear() {
    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  fill(name, price) {
    this.nameInput.value = name;
    this.priceInput.value = price;
  }

  onSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.nameInput.value,
      price: Number(this.priceInput.value),
    };
    if (this.nameInput.checkValidity() && this.priceInput.checkValidity()) {
      this.submitListener.call(null, data);
    }
  }

  onClose() {
    const data = {
      name: this.nameInput.value,
      price: this.priceInput.value,
    };
    this.closeListener.call(null, data);
  }
}
