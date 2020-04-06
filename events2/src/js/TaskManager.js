export default class TaskManager {
  constructor() {
    this.container = null;
    this.inputEl = null;
    this.pinnedEl = null;
    this.allTasksEl = null;
    this.pinnedNotFoundLabel = null;
    this.allTasksNotFoundLabel = null;
    this.errorSpan = null;
    this.pinned = [];
    this.tasks = [];
    this.pinnedClickListeners = [];
    this.keyUpListeners = [];
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
    <form class="top_tasks" action="#" name="top_tasks">
      <div class="tasks_field">
        <div class="task_input">
          <label class="tasks_input__title" for="tasks_input">TOP Tasks</label><br>
          <input type="text" class="tasks_input" id="task_input" placeholder="Enter a name for the new task"><br>
          <span class="form_hint" hidden>The field is empty! Enter a new task!"</span>
        </div>
        <div class="pinned">
          <label class="pinned__title" for="task_pinned">Pinned:</label><br>
          <p class="not_found">No pinned tasks</p><br>
        </div>
        <div class="all_tasks">
          <label class="all_task__title" for="all_tasks">All Tasks:</label><br>
          <p class="not_found">No tasks found</p><br>
        </div>
      </div>
    </form>
    `;

    this.inputEl = this.container.querySelector('.tasks_input');
    this.pinnedEl = this.container.querySelector('.pinned');
    this.allTasksEl = this.container.querySelector('.all_tasks');
    this.pinnedNotFoundLabel = this.container.querySelector('.pinned .not_found');
    this.allTasksNotFoundLabel = this.container.querySelector('.all_tasks .not_found');
    this.errorSpan = this.container.querySelector('.task_input .form_hint');

    this.inputEl.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  redrawTasks(tasks = []) {
    this.clearTasks();

    this.pinnedNotFoundLabel.hidden = tasks.filter((o) => o.pinned).length;
    this.allTasksNotFoundLabel.hidden = tasks.filter((o) => !o.pinned).length;

    for (const task of tasks) {
      const newTask = document.createElement('div');
      newTask.classList.add('task');
      newTask.setAttribute('data-id', task.id);
      newTask.appendChild(document.createTextNode(task.description));
      const img = document.createElement('div');
      img.classList.add('option_img');

      img.addEventListener('click', this.onPinnedClick.bind(this));

      newTask.appendChild(img);

      if (task.pinned) {
        this.pinnedEl.appendChild(newTask);
        this.pinned.push(newTask);
      } else {
        this.allTasksEl.appendChild(newTask);
        this.tasks.push(newTask);
      }
    }
  }

  clearTasks() {
    for (const task of [...this.pinned, ...this.tasks]) task.remove();
  }

  showErrorSpan() {
    this.errorSpan.hidden = false;
  }

  hideErrorSpan() {
    this.errorSpan.hidden = true;
  }

  clearInput() {
    this.inputEl.value = '';
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  addPinnedClickListener(callback) {
    this.pinnedClickListeners.push(callback);
  }

  addKeyUpListener(callback) {
    this.keyUpListeners.push(callback);
  }

  onPinnedClick(event) {
    const id = event.currentTarget.parentNode.getAttribute('data-id');
    this.pinnedClickListeners.forEach((o) => o.call(null, id));
  }

  onKeyUp(event) {
    const text = event.currentTarget.value;
    this.keyUpListeners.forEach((o) => o.call(null, { text, keyCode: event.keyCode }));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('TaskManager not binded to DOM');
    }
  }
}
