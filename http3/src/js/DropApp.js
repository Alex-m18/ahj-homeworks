import Preview from './Preview';
import path from 'path';

export default class DropApp {
  constructor(server, widget) {
    this.server = server;
    this.widget = widget;
    this.previews = [];
  }

  init() {
    // Add event listeners
    this.widget.addOnAddListener(this.onAdd.bind(this));
    this.widget.addOnDeleteEventListener(this.onDelete.bind(this));

    this.update();
  }

  update() {
    this.server.getList((pics) => {
      pics.forEach((pic) => {
        if (this.previews.filter((p) => p.name === pic.name).length) return;
        this.previews.push(new Preview(pic.name, `${this.server.url}/${pic.name}`));
      });
      this.widget.update(this.previews);
    });
  }

  onAdd(formData) {

    this.server.postPic(formData, (src) => {
      this.update();
    });
  }

  onDelete(id) {
    this.server.deletePic(this.previews.find((p) => p.id === id).name, () => {
      this.previews = this.previews.filter((p) => p.id !== id);
      this.update();
    });
  }
}
