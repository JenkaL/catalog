import Utils from '../../base/utils/utils.js';

export default class NavigationConfig {
    constructor() {

      this.navigationItems = [{
        type: 'category',
        apiFactory: 'CategoryCoreAPI',
        storageFactory: 'CategoryStorage',
        ICON_PATH: '/images/category/',
        ICON_TYPE: '.svg'
      },{
        type: 'section',
        apiFactory: 'SectionCoreAPI',
        storageFactory: 'SectionStorage',
        ICON_PATH: '/images/section/',
        ICON_TYPE: '.svg'
      }];
    }

    getTypesItem() {
        return this.navigationItems.map( item => item.type );
    }

    getIconPath(type) {
        return Utils.getPropertyValueByOtherProp(this.navigationItems, 'ICON_PATH', 'type', type);
    }

    getIconType(type) {
        return Utils.getPropertyValueByOtherProp(this.navigationItems, 'ICON_TYPE', 'type', type);
    }

    getDependencyName(type, dependencyType) {
        return Utils.getPropertyValueByOtherProp(this.navigationItems, dependencyType, 'type', type);
    }
}
