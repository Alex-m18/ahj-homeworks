import TrelloTaskWidget from './widgets/TrelloTaskWidget';
import TrelloTask from './TrelloTask';

export default class TrelloColumn {
  constructor(widget) {
    this.widget = widget;
    this.tasks = [];
  }

  init() {
    // add event listeners to widget
    this.widget.addOnAddEventListener(this.addTask.bind(this));
    this.widget.addOnDeleteEventListener(this.deleteTask.bind(this));

    this.update();
  }

  get id() {
    return this.widget.id;
  }

  get name() {
    return this.widget.name;
  }

  set name(value) {
    this.widget.name = value;
    // this.update();
  }

  update() {
    this.widget.update(this.tasks);
  }

  addTask(content) {
    const widget = new TrelloTaskWidget(content);
    // widget.bindToDOM(this.widget.element);
    widget.init();

    const task = new TrelloTask(widget);
    task.init();

    this.tasks.push(task);

    this.hideAddTaskForm();
    this.update();
  }

  hideAddTaskForm() {
    this.widget.hideAddTaskForm();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((o) => o.id !== id);
    this.update();
  }
}
