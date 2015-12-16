import Utils from '../../base/utils/utils';

export default class CatalogConfig {
  constructor(CategoryCoreAPI, CategoryStorage, SectionCoreAPI, SectionStorage) {
    'ngInject';

    this.catalogSections = [{
      type: 'category',
      apiFactory: CategoryCoreAPI,
      storageFactory: CategoryStorage
    },{
      type: 'section',
      apiFactory: SectionCoreAPI,
      storageFactory: SectionStorage
    }];
  }

  getDependency(type, dependencyType) {
    return Utils.getPropertyValueByOtherProp(this.catalogSections, dependencyType, 'type', type);
  }
}
