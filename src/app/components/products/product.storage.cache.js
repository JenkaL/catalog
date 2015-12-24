import Utils from './../../base/utils/utils.js';
import StorageCache from './../../base/base-classes/base.storage.cache.class';

/**
 * storage of collection of object Product's class
 */

export default class ProductsStorageCache extends StorageCache {
  constructor($cacheFactory) {
    'ngInject';

    super($cacheFactory, 'ProductsStorageCache', 'id');
    //this.preorderSectionId = preorderSectionId;
  }
}
