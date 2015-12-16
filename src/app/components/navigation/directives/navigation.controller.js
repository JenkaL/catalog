export default class NavigationCtrl {
    constructor($rootScope, $scope, NavigationCollectionInterface, NavigationConfig) {
        'ngInject';

        this.NavigationCollectionInterface = NavigationCollectionInterface;

        this.items = [];
        this.itemTypes = NavigationConfig.getTypesItem();
        this.fetchItems();

        //$rootScope.$on("NavigationCtrl:updateItems", (event, data) => {
        //    this.updateItems(data);
        //});
    }

    fetchItems() {
        this.itemTypes.forEach(type => {
            this.NavigationCollectionInterface.fetch(type).then(items => {
                this.items = this.items.concat( [].slice.call(items) );
                //this.filteredItem( [].slice.call(items), type );
            });
        });
    }

    clearItems() {
        this.items = [];
        this.items.length = 0;
    }

    //filteredItem(items, type) {
    //    if (type === 'section') {
    //        this.items.notSystemSections = this.$filter('isNotSystemSection')(items);
    //        this.items.mainSection = this.$filter('isMainSection')(items);
    //    }
    //
    //    if (type === 'category') {
    //        this.items.notDeviceCategories = this.$filter('isNotDevices')(items);
    //        this.items.deviceCategories = this.$filter('isDevices')(items);
    //    }
    //}

    //updateItems() {
    //  /**TODO:
    //     send request for items
    //     show preloader
    //   */
    //}
    //
    //setState(state) {
    //    console.log("setState", state);
    //}
}
