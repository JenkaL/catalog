export default class ProductBackButtonCtrl {
  constructor($stateParams, $scope, $q, CatalogCollectionInterface, mainSectionId) {
    'ngInject';

    this.CatalogCollectionInterface = CatalogCollectionInterface;
    this.$stateParams = $stateParams;
    this.mainSectionId = mainSectionId;
    this.$scope = $scope;
    this.$q = $q;

    this.init();
  }

  init() {
    if (!this.$stateParams.section && !this.$stateParams.category) {
      this.setProperties('', 'section', this.mainSectionId);

      return;
    }

    let catalogSectionType = (this.$stateParams.section && 'section') || (this.$stateParams.category && 'category'),
        catalogSectionId = this.$stateParams.section || this.$stateParams.category;

    this.getSettigsForSection(catalogSectionType, catalogSectionId);
  }

  setProperties(title, type, id) {
    this.backButtonTitle = title;
    this.backType = type;
    this.backId = id;
  }

  getSettigsForSection(type, id) {
    this.getNameForSection(type, id)
      .then((sectionName) => {
        this.setProperties(sectionName, type, id);
      })
  }

  getNameForSection(type, id) {
    let deferred = this.$q.defer(),
        unwatch;

    if (this.CatalogCollectionInterface.getNameForSection(type, id)) {
      deferred.resolve(this.CatalogCollectionInterface.getNameForSection(type, id));
    } else {
      unwatch = this.$scope.$watch(
        () => this.CatalogCollectionInterface.getStorageNavigationItems(type).length,
        newVal => {
          if (newVal > 0) {
            deferred.resolve(this.CatalogCollectionInterface.getNameForSection(type, id));
            unwatch();
          }
        });
    }

    return deferred.promise;
  }
}
