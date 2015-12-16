import Utils from '../../base/utils/utils.js';

export default class SectionStorage {
  constructor() {
    this._sectionDB = [];
  }

  get() {
    return this._sectionDB;
  }

  getNameById(id) {
    return Utils.getPropertyValueByOtherProp(this._sectionDB, 'name', 'id', +id);
  }

  put(data) {
    this._sectionDB = data;
  }

  remove() {
    this._sectionDB = [];
  }
}
