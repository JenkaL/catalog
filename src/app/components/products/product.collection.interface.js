import Product from './../products/product.class';
import UtilsValidation from './../../base/utils/utils.validate';

export default class ProductCollectionInterface {
    constructor(ProductCoreAPI, ProductsStorage, ProductsStorageCache, preorderSectionId) {
        'ngInject';

        this.ProductCoreAPI = ProductCoreAPI;
        this.ProductsStorage = ProductsStorage;
        this.ProductsStorageCache = ProductsStorageCache;
        this.preorderSectionId = preorderSectionId;
    }

    /**
     * private methods
     */
    /**
   * @descriptions get product from cache service ProductsStorageCache
   * @param id - product id (int)
   * @returns {*} - return item of Product class
   */
    _createProduct(product) {
      //console.dir(this.ProductsStorage.getItemById(product.id))
        let productFromStorage = this.ProductsStorage.getItemById(product.id);

        if (UtilsValidation.isEmptyObject(productFromStorage)) {
            return new Product(product);
        }

        if (!UtilsValidation.isEmptyObject(productFromStorage)) {
            return productFromStorage.addDescription(product);
        }
    }


    /**
     * product controller's methods
     */
		/**
     * @descriptions - get product from cache, if empty obj - get product from app data (ProductsStorage service)
     * then if empty obj - get product from server (fetchItem) else - return product
     * @param id - product id
     * @returns {*} - Product obj
     */
    getItem(id) {
        let product = this.ProductsStorageCache.get(id);

        if(UtilsValidation.isEmptyObject(product)) {
            product = this.ProductsStorage.getItemById(id);
        }

        return product;
    }

    /**
     * @descriptions fetch product from server
     * @param id - product id (int)
     * @returns {*} - return item of Product class
     */
    fetchItem(id) {
        return this.ProductCoreAPI.queryItem(id).then(item => {
            let product = this._createProduct(item);

	        product.setPreorderFlag(this.preorderSectionId);

            this.ProductsStorage.putItem(product);
            this.ProductsStorageCache.put(product);


          //console.log("ProductsStorage add", this.ProductsStorage)
          //console.log("ProductsStorageCache add", this.ProductsStorageCache.get(product.id))

            return product;
        });
    }
}
