export default class States {
  constructor(...args) {
    this.states = {};

    this.init(...args);
  }

  init(...args) {
    args.forEach(stateName => {
      this.setState(stateName, false);
    });
  }

  setState(stateName, flag) {
    this.states[stateName] = flag;
  }

  getState(stateName) {
    return this.states[stateName];
  }

  remove() {
    this.states = [];
    this.states.length = 0;
  }
}
