export default class Storage {
  constructor() {
    this.data = [];
  }

  get() {
    return this.data;
  }

  put(data) {
    this.data = data;
  }

  remove() {
    this.data = [];
  }
}
