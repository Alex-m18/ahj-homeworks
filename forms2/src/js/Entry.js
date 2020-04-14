import uniqid from 'uniqid';

export default class Entry {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = uniqid();
  }
}
