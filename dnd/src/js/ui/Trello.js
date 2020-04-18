import TrelloColumnWidget from './widgets/TrelloColumnWidget';
import TrelloColumn from './TrelloColumn';

export default class Trello {
  constructor(widget) {
    this.widget = widget;
    this.columns = [];
  }

  init() {
    // add event listeners to widget
    this.widget.addOnAddAnotherClickEventListener(this.onAddAnotherClick.bind(this));
    this.widget.addOnDragTaskEventListener(this.onDragTask.bind(this));

    this.update();
  }

  writeState() {
    localStorage.setItem('trello', JSON.stringify(this));
  }

  addColumn(name) {
    const widget = new TrelloColumnWidget(name);
    widget.bindToDOM(this.widget.element);
    widget.init();

    const column = new TrelloColumn(widget);
    column.init();
    column.onStateChanged = this.writeState.bind(this);

    this.columns.push(column);

    return column;

    // this.update();
  }

  update() {
    this.writeState();
    this.widget.update(this.columns);
  }

  onAddAnotherClick(id) {
    this.columns.filter((c) => c.id !== id).forEach((c) => c.hideAddTaskForm());
  }

  onDragTask(options) {
    const fromColumn = this.columns.find((c) => c.id === options.from.column);
    const fromTask = fromColumn.tasks.find((t) => t.id === options.from.task);
    const fromTaskIndex = fromColumn.tasks.findIndex((t) => t.id === options.from.task);
    fromColumn.tasks.splice(fromTaskIndex, 1);

    const toColumn = this.columns.find((c) => c.id === options.to.column);
    const toTask = toColumn.tasks.find((t) => t.id === options.to.task);
    let toTaskIndex = toColumn.tasks.indexOf(toTask);

    if ((fromColumn === toColumn) && (toTaskIndex >= fromTaskIndex)) toTaskIndex += 1;
    toColumn.tasks.splice(toTaskIndex, 0, fromTask);

    this.update();
  }
}

Trello.fromObject = (object, widget) => {
  const trello = new Trello(widget);
  object.columns.forEach((c) => {
    const columnWidget = TrelloColumnWidget.fromObject(c.widget);
    columnWidget.init();
    const column = TrelloColumn.fromObject(c, columnWidget);
    column.init();
    column.onStateChanged = trello.writeState.bind(trello);
    trello.columns.push(column);
  });
  return trello;
};
