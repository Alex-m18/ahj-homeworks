import Preview from './Preview';

export default class DropApp {
  constructor(widget) {
    this.widget = widget;
    this.previews = [];
  }

  init() {
    // Add event listeners
    this.widget.addOnAddListener(this.addPreview.bind(this));
    this.widget.addOnDeleteEventListener(this.deletePreview.bind(this));

    this.update();
  }

  update() {
    this.widget.update(this.previews);
  }

  addPreview(src) {
    this.previews.push(new Preview(src));
    this.update();
  }

  deletePreview(id) {
    this.previews = this.previews.filter((p) => p.id !== id);
    this.update();
  }
}
