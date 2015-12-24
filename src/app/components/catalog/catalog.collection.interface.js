import Product from './../products/product.class';

export default class CatalogCollectionInterface {
  constructor(CatalogConfig, ProductsStorage) {
    'ngInject';

    this.CatalogConfig = CatalogConfig;
    this.ProductsStorage = ProductsStorage;
  }

  /**
   * private methods
     */

  /**
   * @description - get api service for catalog's section
   * @param type - type catalog's sections
   * @returns {*} - api service for catalog's section
   * @private
     */
  _getApiFactories(type) {
    return this.CatalogConfig.getDependency(type, 'apiFactory');
  }

  /**
   * @description - get storage service for catalog's section
   * @param type - type catalog's sections
   * @returns {*} storage service for catalog's section
   * @private
     */
  _getStorageFactories(type) {
    return this.CatalogConfig.getDependency(type, 'storageFactory');
  }

  /**
   * @description create products collection
   * @param data - post processed data from server
   * returns {[]} collection items of Product class
   * @private
   */
  _createCollection(data) {
    let convertedData = [];

    data.forEach(item => {
      convertedData.push(new Product(item));
    });

    return convertedData;
  }

  /**
   * @description - create products collection and save to storage
   * @param data - post processed data from server
   * @returns {*} collection items of Product class
   * @private
     */
  _createAndSaveCollection(data) {
    let convertedData = this._createCollection(data);

    this.$save(convertedData);

    return convertedData;
  }


  /**
   * storage methods
   */

  /**
   * @descriptions save data to product's storage
   * @param data (collection items of Product class)
     */
  $save(data) {
    this.ProductsStorage.put(data);
  }

  /**
   * @descriptions get product's items from storage
   * @returns {[]} product's items from storage
     */
  get() {
    return this.ProductsStorage.get();
  }


  /**
   * catalog controller's methods
   */

  /**
   * @descriptions fetch products from server
   * @param type - catalog item's type (category, section)
   * @param id - category, section id (int)
   * @returns {[]} - return data from server after postprocessing and
   * convert to model (collection items of Product class)
   */
  fetch(type, id) {
    return this._getApiFactories(type).queryItems(id).then(data => {
      return this._createAndSaveCollection(data);
    });
  }

  /**
   * @descriptions get catalog header - catalog's section name
   * @param type - catalog item's type (category, section)
   * @param id - category, section id (int)
   * @returns {string} - category's, section's name
     */
  getNameForSection(type, id) {
    return this._getStorageFactories(type).getNameById(id);
  }

  /**
   * @descriptions get navigation items from storage
   * @param type - navigation items type
   * @returns {*} navigation items from storage
     */
  getStorageNavigationItems(type) {
    return this._getStorageFactories(type).get();
  }
}
