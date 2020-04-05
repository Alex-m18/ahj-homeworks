import uniqid from 'uniqid';

export default class Task {
  constructor(description = '', pinned = false) {
    this.description = description;
    this.pinned = pinned;
    this.id = uniqid();
  }
}
