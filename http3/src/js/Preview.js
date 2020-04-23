import uniqid from 'uniqid';

export default class Preview {
  constructor(fileName, src) {
    this.id = uniqid();
    this.name = fileName;
    this.src = src;
  }
}
