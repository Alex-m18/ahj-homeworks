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

    this.hardCode();
    this.update();
  }

  hardCode() {
    const todoColumn = this.addColumn('ToDo');
    const inProgressColumn = this.addColumn('In progress');
    const doneColumn = this.addColumn('Done');

    todoColumn.addTask('Welcome to Hrello!');
    todoColumn.addTask('This is a card');
    todoColumn.addTask('Click on a card to see what’s behind it.');
    todoColumn.addTask("You can't attach pictures and files...");
    todoColumn.addTask('... any kind of hyperlink ...');
    todoColumn.addTask('... or checklists.');

    inProgressColumn.addTask('Invite your team to this board using the Add Members button');
    inProgressColumn.addTask("Drag people onto a card to indicate that they're responsible for it.");
    inProgressColumn.addTask('Use color-coded labels for organization');
    inProgressColumn.addTask('Make as many lists as you need!');
    inProgressColumn.addTask('Try dragging cards anywhere.');
    inProgressColumn.addTask('Finished with a card? Archive it.');

    doneColumn.addTask('To learn more tricks, check out the guide.');
    doneColumn.addTask('Use as many boards as you want. Well make more!');
    doneColumn.addTask('Want to use keyboard shortcuts? We have them!');
    doneColumn.addTask('Want updates on new features?');
    doneColumn.addTask('Need help?');
    doneColumn.addTask('Want current tips, usage examples, or API info?');
  }

  addColumn(name) {
    const widget = new TrelloColumnWidget(name);
    widget.bindToDOM(this.widget.element);
    widget.init();

    const column = new TrelloColumn(widget);
    column.init();

    this.columns.push(column);

    return column;

    // this.update();
  }

  update() {
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
