import Task from './Task';

export default class TaskController {
  constructor(manager) {
    this.manager = manager;
    this.tasks = [];
  }

  init() {
    this.manager.addPinnedClickListener(this.onPinnedClick.bind(this));
    this.manager.addKeyUpListener(this.filterTasks.bind(this));
    this.manager.addKeyUpListener(this.onEnterPressed.bind(this));

    this.manager.drawUi();
    this.tasks.push(new Task('Test task', true));
    this.tasks.push(new Task('Test task 2', true));
    this.tasks.push(new Task('Test task 3'));
    this.tasks.push(new Task('Test task 4'));

    this.manager.redrawTasks(this.tasks);
  }

  onPinnedClick(id) {
    const task = this.tasks.find((o) => o.id === id);
    task.pinned = !task.pinned;
    this.manager.redrawTasks(this.tasks);
  }

  onEnterPressed(params) {
    const cleanText = params.text.trim();
    if (params.keyCode === 13) {
      if (cleanText === '') {
        this.manager.showErrorSpan();
        return;
      }
      this.tasks.push(new Task(cleanText));
      this.manager.clearInput();
      this.manager.redrawTasks(this.tasks);
    }
  }

  filterTasks(params) {
    const cleanText = params.text.trim().toLowerCase();
    if (cleanText.length) this.manager.hideErrorSpan();
    const filteredTasks = this.tasks.filter((task) => task.pinned
      || task.description.toLowerCase().includes(cleanText));
    this.manager.redrawTasks(filteredTasks);
  }
}
