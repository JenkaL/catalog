import Utils from '../../base/utils/utils.js';

export default class ProductStorage {
  constructor() {
    this._productsDB = [];
  }

  get() {
    return this._productsDB;
  }

  put(data) {
    this._productsDB = data;
  }

  remove() {
    this._productsDB = [];
  }

  /**
   * TODO:
   * putById - replace element by id
   * getById - get element by id
   * ???
   */
}
