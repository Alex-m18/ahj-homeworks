import Entry from './Entry';

export default class ListEditor {
  constructor(widget, form) {
    this.widget = widget;
    this.form = form;
    this.items = [
      new Entry('Mercedes S500', 5000000),
      new Entry('Samsung Galaxy S10', 60000),
    ];
  }

  init() {
    this.widget.addOnAddEventListener(this.addItem.bind(this));
    this.widget.addOnEditEventListener(this.editItem.bind(this));
    this.widget.addOnDeleteEventListener(this.deleteItem.bind(this));

    this.widget.update(this.items);
  }

  addItem() {
    this.form.clear();
    this.form.show((data) => {
      this.items.push(new Entry(data.name, data.price));
      this.widget.update(this.items);
      this.form.hide();
    },
    () => this.form.hide());
  }

  editItem(id) {
    const item = this.items.filter((o) => o.id === id)[0];
    this.form.fill(item.name, item.price);
    this.form.show((data) => {
      item.name = data.name;
      item.price = data.price;
      this.widget.update(this.items);
      this.form.hide();
    },
    () => this.form.hide());
  }

  deleteItem(id) {
    this.items = this.items.filter((o) => o.id !== id);
    this.widget.update(this.items);
  }
}
