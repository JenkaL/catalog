import Section from '../../../app/components/section/section.class';
import Category from '../../../app/components/category/category.class';

export default class NavigationCollectionInterface {
    constructor($injector, NavigationConfig) {
        'ngInject';

        this.$injector = $injector;
        this.NavigationConfig = NavigationConfig;
        this._navigationItemsDependencies = {};
    }

    /**
     * private methods
     */
    _getNavigationItemsDependencies(type, dependencyType) {
      this._navigationItemsDependencies[type] =  this._navigationItemsDependencies[type] || {};
      this._navigationItemsDependencies[type][dependencyType] = (this._navigationItemsDependencies[type] && this._navigationItemsDependencies[type][dependencyType]) || this.$injector.get(this.NavigationConfig.getDependencyName(type, dependencyType));

      return this._navigationItemsDependencies[type][dependencyType];
    }

    /**
     * @description - get storage service for navigation's section
     * @param type - type navigation's sections
     * @returns {*} storage service for navigation's section
     * @private
     */
    _getStorageFactories(type) {
      return this._getNavigationItemsDependencies(type, 'storageFactory');
    }

    /**
     * @description - get storage service for navigation's section
     * @param type - type navigation's sections
     * @returns {*} storage service for navigation's section
     * @private
     */
    _getApiFactories(type) {
      return this._getNavigationItemsDependencies(type, 'apiFactory');
    }

    /**
     * @description - convert navigation item to Section/Category class object
     * @param item - navigation's item - restangular object
     * @param type - type navigation items
     * @returns {*} - item by class Section/Category
     * @private
       */
    _convertItem(item, type) {
      if (type === 'section') {
        return new Section(item);
      }

      if (type === 'category') {
        return new Category(item);
      }

      return item;
    }

    /**
     * @description - create navigation's items collection and save to storage
     * @param data - post processed data from server
     * @returns {*} collection items of Product class
     * @private
     */
    _createAndSaveCollection(data, type) {
      let convertedData = [];

      data.forEach(item => {
        convertedData.push(this._convertItem(item, type));
      });

      //console.log("convertedData", convertedData)
      this.$save(convertedData, type);

      return convertedData;
    }


    /**
     * storage methods
     */

    /**
     * @descriptions get navigation's items from storage
     * @returns {[]} navigation's items from storage
     */
    get(type) {
        return this._getStorageFactories(type).get();
    }

    /**
     * @descriptions save data to service storage
     * @param data (collection items of Section/Category class)
     * @param type - get storage service by type navigation items
     */
    $save(data, type) {
        this._getStorageFactories(type).put(data);
    }


    /**
     * navigation controller's methods
     */

    /**
     * @descriptions fetch list of categories/sections from server
     * @param type - navigation item's type (category, section)
     * @returns {[]} - return data from server after postprocessing and
     * convert to model (collection items of Section/Category class)
     */
    fetch(type) {
        return this._getApiFactories(type).query().then(data => {
          //console.log("data", data)
            return this._createAndSaveCollection(data, type);
        });
    }
}
