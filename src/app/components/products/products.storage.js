import Utils from './../../base/utils/utils.js';
import Storage from './../../base/base-classes/base.storage.class.js';
import UtilsValidation from './../../base/utils/utils.validate';

/**
 * storage of collection of object Product's class
 */
/**
 * TODO:
 * putById - replace element by id
 * getById - get element by id
 * ???
 */

export default class ProductsStorage extends Storage {
  constructor(preorderSectionId) {
    'ngInject';

    super();
    this.preorderSectionId = preorderSectionId;
  }

  put(data) {
    super.put(data);
    this.setPreorderFlagToData();
  }

  getItemById(id) {
    return Utils.getItemByProp(this.data, 'id', id);
  }

  getIndexOfItem(item) {
    return Utils.getIndexOfItem(this.data, item);
  }

  putItem(item) {
    let product = this.getItemById(item.id);

    if (!UtilsValidation.isEmptyObject(product)) {
      this.replaceItem(product, item);
      return;
    }

    return this.data.push(item);
  }

  replaceItem(foundItem, replacedItem) {
    let foundIndex = this.getIndexOfItem(foundItem);

    if (~foundIndex) {
      this.data.splice(foundIndex, 1, replacedItem);
    }
  }

  setPreorderFlagToData() {
    this.data.forEach(item => item.setPreorderFlag(this.preorderSectionId));
  }
}
