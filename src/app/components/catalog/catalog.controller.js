export default class CatalogController {
    constructor($scope , $stateParams, catalogType, CatalogCollectionInterface) {
        'ngInject';

        this.CatalogCollectionInterface = CatalogCollectionInterface;

        this.items = [];
        this.currentHeader = '';
        this.catalogType = catalogType;
        this.$scope = $scope;

        this.emptyItems = [];

        this.fetchItems(catalogType, $stateParams.id);
        this.getNameForSection(catalogType, $stateParams.id);
        this.setSectionId(catalogType, $stateParams.id);
    }

    fetchItems(type, id) {
        this.CatalogCollectionInterface.fetch(type, id).then(items => {
            this.items = items;
            this.fillEmptyItems();

	        console.log("this.items", this.items)
        });
    }

    // не протестировано
    fillEmptyItems() {
        let emptyCount = (((this.catalogType === 'category') ? 3 : 2) - this.items.length % ((this.catalogType === 'category') ? 3 : 2)) % ((this.catalogType === 'category') ? 3 : 2);

        if (emptyCount) {
          this.emptyItems = new Array( emptyCount );
        }
    }

    getNameForSection(type, id) {
        let unwatch;

        if (this.CatalogCollectionInterface.getNameForSection(type, id)) {
          this.currentHeader = this.CatalogCollectionInterface.getNameForSection(type, id);
        } else {
          unwatch = this.$scope.$watch(
                      () => this.CatalogCollectionInterface.getStorageNavigationItems(type).length,
                      newVal => {
                          if (newVal > 0) {
                            this.currentHeader = this.CatalogCollectionInterface.getNameForSection(type, id);
                            unwatch();
                          }
                      });
        }
    }

    setSectionId(type, id) {
      if (type === 'section') {
        this.sectionId = id;
      }
    }
}
