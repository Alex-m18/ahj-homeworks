import uniqid from 'uniqid';

export default class TrelloColumnWidget {
  constructor(name = '') {
    this.id = uniqid();
    this.name = name;
    this.container = null;
    this.element = null;
    this.addEventListeners = [];
    // this.editEventListeners = [];
    this.deleteEventListeners = [];
  }

  init() {
    this.element = document.createElement('section');
    this.element.classList.add('column');
    this.element.setAttribute('data-id', this.id);
    this.element.innerHTML = `
      <h3>${this.name}</h3>
      <div class="tasks_list"></div>
      <div class="add_task_form">
        <textarea class="task_fild" placeholder="Enter a new task..."></textarea>
        <div class="add_task_form_button_container">
          <div class="btn_add_task">Add Card</div>
          <div class="close">✖</div>
        </div>
      </div>
      <footer><span class="add_another show">✚ Add another task</span></footer>
    `;
    this.tasksListEl = this.element.querySelector('.tasks_list');
    this.addTaskFormEl = this.element.querySelector('.add_task_form');
    this.addTaskInputEl = this.addTaskFormEl.querySelector('textarea');
    this.addTaskButtonEl = this.addTaskFormEl.querySelector('.btn_add_task');
    this.closeAddTaskButtonEl = this.addTaskFormEl.querySelector('.close');
    this.addAnotherButton = this.element.querySelector('.add_another');

    // Add event listeners
    this.element.addEventListener('click', this.onDelete.bind(this));

    this.addTaskButtonEl.addEventListener('click', this.onAdd.bind(this));
    // this.addTaskInputEl.addEventListener('focusout', this.hideAddTaskForm.bind(this));
    this.closeAddTaskButtonEl.addEventListener('click', this.hideAddTaskForm.bind(this));
    this.addAnotherButton.addEventListener('click', this.showAddTaskForm.bind(this));
  }

  showAddTaskForm() {
    this.addTaskInputEl.value = '';
    this.addTaskFormEl.classList.add('show');
    this.addAnotherButton.classList.remove('show');
    this.addTaskInputEl.select();
  }

  hideAddTaskForm() {
    this.addTaskInputEl.value = '';
    this.addTaskFormEl.classList.remove('show');
    this.addAnotherButton.classList.add('show');
  }

  update(tasks = []) {
    this.tasksListEl.innerHTML = '';
    tasks.forEach((t) => this.tasksListEl.appendChild(t.widget.element));
  }

  bindToDOM(container) {
    this.container = container;
  }

  addOnAddEventListener(callback) {
    this.addEventListeners.push(callback);
  }

  // addOnEditEventListener(callback) {
  //   this.editEventListeners.push(callback);
  // }

  addOnDeleteEventListener(callback) {
    this.deleteEventListeners.push(callback);
  }

  onAdd() {
    const content = this.addTaskInputEl.value;
    this.addEventListeners.forEach((o) => o.call(null, content));
  }

  // onEdit(event) {
  //   const id = event.target.parentElement.getAttribute('data-id');
  //   this.editEventListeners.forEach((o) => o.call(null, id));
  // }

  onDelete(event) {
    if (event.target.classList.contains('delete_task')) {
      const id = event.target.parentElement.getAttribute('data-id');
      this.deleteEventListeners.forEach((o) => o.call(null, id));
    }
  }
}

TrelloColumnWidget.fromObject = (object) => {
  const widget = new TrelloColumnWidget(object.name);
  widget.id = object.id;
  return widget;
};
