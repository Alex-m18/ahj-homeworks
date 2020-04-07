import Task from './Task';

export default class TaskController {
  constructor(manager) {
    this.manager = manager;
    this.tasks = [];
  }

  init() {
    this.manager.addPinnedClickListener(this.onPinnedClick.bind(this));
    this.manager.addKeyUpListener(this.onKeyUp.bind(this));
    this.manager.addKeyUpListener(this.onEnterPressed.bind(this));

    this.manager.drawUi();
    this.tasks.push(new Task('Test task', true));
    this.tasks.push(new Task('Test task 2', true));
    this.tasks.push(new Task('Test task 3'));
    this.tasks.push(new Task('Test task 4'));

    this.redrawTasks();
  }

  redrawTasks() {
    this.manager.redrawTasks(TaskController.filterTasks(this.manager.inputValue, this.tasks));
  }

  onPinnedClick(id) {
    const task = this.tasks.find((o) => o.id === id);
    task.pinned = !task.pinned;
    this.redrawTasks();
  }

  onEnterPressed(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const cleanText = this.manager.inputValue.trim();
      if (cleanText === '') {
        this.manager.showErrorSpan();
        return;
      }
      this.tasks.push(new Task(cleanText));
      this.manager.clearInput();
      this.redrawTasks();
    }
  }

  onKeyUp() {
    if (this.manager.inputValue.length) this.manager.hideErrorSpan();
    this.redrawTasks();
  }
}

TaskController.filterTasks = (string, tasks) => {
  const cleanString = string.trim().toLowerCase();
  return tasks.filter((task) => task.pinned
    || task.description.toLowerCase().includes(cleanString));
};
