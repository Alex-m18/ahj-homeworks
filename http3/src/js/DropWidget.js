export default class DropWidget {
  constructor() {
    this.container = null;
    this.element = null;
    this.addEventListeners = [];
    this.deleteEventListeners = [];
  }

  init() {
    // Make html
    this.element = document.createElement('div');
    this.element.classList.add('drop_widget');
    this.element.id = 'drop_widget';

    this.element.innerHTML = `
      <input type="file" accept="image/*" class="file_input">
      <div class="drop_area">"Drag and Drop files here<br>or Click to select"></div>
      <div class="gallery"></div>
    `;

    this.dropAreaEl = this.element.querySelector('.drop_area');
    this.galleryEl = this.element.querySelector('.gallery');

    // Add event listeners
    this.element.addEventListener('click', this.onClick.bind(this));
    this.dropAreaEl.addEventListener('dragover', this.onDragOver.bind(this));
    this.dropAreaEl.addEventListener('dragleave', this.onDragLeave.bind(this));
    this.dropAreaEl.addEventListener('dragend', this.onDragLeave.bind(this));
    this.dropAreaEl.addEventListener('drop', this.onDrop.bind(this));

    this.resetInputEl();
    this.container.appendChild(this.element);
  }

  update(previews = []) {
    this.galleryEl.innerHTML = '';
    previews.forEach((p) => {
      const preview = document.createElement('div');
      preview.classList.add('preview');
      preview.setAttribute('data-id', p.id);
      preview.innerHTML = `
        <div class="preview_field"></div>
        <div class="del_btn"></div>
      `;
      preview.querySelector('.preview_field').style.backgroundImage = `url(${p.src})`;
      this.galleryEl.appendChild(preview);
    });
  }

  bindToDOM(container) {
    this.container = container;
  }

  resetInputEl() {
    if (this.inputEl) this.element.removeChild(this.inputEl);

    this.inputEl = document.createElement('input');
    this.inputEl.classList.add('file_input');
    this.inputEl.type = 'file';
    this.inputEl.accept = 'image/*';

    this.element.insertAdjacentElement('afterbegin', this.inputEl);
    this.inputEl.addEventListener('change', this.onInputFile.bind(this));
  }

  addOnAddListener(callback) {
    this.addEventListeners.push(callback);
  }

  addOnDeleteEventListener(callback) {
    this.deleteEventListeners.push(callback);
  }

  onClick(event) {
    if (event.target.classList.contains('del_btn')) {
      const id = event.target.parentElement.getAttribute('data-id');
      this.onDeletePreview(id);
    }
    if (event.target.classList.contains('drop_area')) {
      this.resetInputEl();
      this.inputEl.dispatchEvent(new MouseEvent('click'));
    }
  }

  onInputFile() {
    if (!this.inputEl.files[0].type.startsWith('image/')) return;
    const formData = new FormData();
    formData.append('file', this.inputEl.files[0]);
    this.onAdd(formData);
  }

  onAdd(formData) {
    this.addEventListeners.forEach((c) => c.call(null, formData));
  }

  onDeletePreview(id) {
    this.deleteEventListeners.forEach((c) => c.call(null, id));
  }

  onDragOver(event) {
    event.preventDefault();
    this.dropAreaEl.classList.add('dragover');
  }

  onDragLeave() {
    this.dropAreaEl.classList.remove('dragover');
  }

  onDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    files.forEach((f) => {
      if (!f.type.startsWith('image/')) return;
      const formData = new FormData();
      formData.append('file', f);
      this.onAdd(formData);
    });
    this.dropAreaEl.classList.remove('dragover');
  }
}
