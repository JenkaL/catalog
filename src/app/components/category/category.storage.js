import Utils from '../../base/utils/utils.js';

export default class CategoryStorage {
  constructor() {
    this._categoryDB = [];
  }

  get() {
    return this._categoryDB;
  }

  getNameById(id) {
    return Utils.getPropertyValueByOtherProp(this._categoryDB, 'name', 'id', +id);
  }

  put(data) {
    this._categoryDB = data;
  }

  remove() {
    this._categoryDB = [];
  }
}
