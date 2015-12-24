import Utils from './../../../base/utils/utils.js';
import UtilsValidation from './../../../base/utils/utils.validate';

export default class NavigationCtrl {
    constructor($stateParams, NavigationCollectionInterface, NavigationConfig/*, $state, $localStorage*/) {
        'ngInject';

        this.NavigationCollectionInterface = NavigationCollectionInterface;

        this.items = [];
        this.itemTypes = NavigationConfig.getTypesItem();
        this.fetchItems();

        this.$stateParams = $stateParams;

        //$rootScope.$on("NavigationCtrl:updateItems", (event, data) => {
        //    this.updateItems(data);
        //});
    }

    fetchItems() {
        this.itemTypes.forEach(type => {
            this.NavigationCollectionInterface.fetch(type).then(items => {
                this.items = this.items.concat( [].slice.call(items) );
                this.checkIsActiveItems(this.items);

                //this.filteredItem( [].slice.call(items), type );
            });
        });
    }

    clearItems() {
        this.items = [];
        this.items.length = 0;
    }

	/**
     * manipulate with active state nav item
     * @param items - array if items
     */

    checkIsActiveItems(items) {
		items.forEach(item => {
			if (this.isItemEqualsToRouteState(item)) {
				item.active = true;
			}
		})
	}

    isItemEqualsToRouteState(item) {
        return (this.$stateParams.type && (item.type == this.$stateParams.type) && (item.id == this.$stateParams.id) ||
                this.$stateParams.category && (item.type == 'category') && (item.id == this.$stateParams.category) ||
                this.$stateParams.section && (item.type == 'section') && (item.id == this.$stateParams.section));
    }

    clearActiveNavigationItems() {
        this.items.forEach(item => delete item.active);
    }

    setActiveNavigationItems(item) {
        this.clearActiveNavigationItems();
        item.active = true;
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
