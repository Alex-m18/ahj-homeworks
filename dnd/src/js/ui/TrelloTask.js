export default class TrelloTask {
  constructor(widget) {
    this.widget = widget;
  }

  init() {
    this.update();
  }

  update() {
    this.widget.update();
  }

  get id() {
    return this.widget.id;
  }

  // addOnDeleteEventListener(callback) {
  //   this.deleteEventListeners.push(callback);
  // }
}

TrelloTask.fromObject = (object, widget) => {
  const task = new TrelloTask(widget);
  return task;
};
