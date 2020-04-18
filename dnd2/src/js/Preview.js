import uniqid from 'uniqid';

export default class Preview {
  constructor(src) {
    this.id = uniqid();
    this.src = src;
  }
}
