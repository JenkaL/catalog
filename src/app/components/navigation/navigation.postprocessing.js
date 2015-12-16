import Utils from '../../../app/base/utils/utils';

export default class NavigationPostProcessingData {
  constructor($location, NavigationConfig) {
    'ngInject';

    this.$location = $location;
    this.NavigationConfig = NavigationConfig;

    NavigationPostProcessingData.ICON_DOMAIN_PATH = [];
  }

  _getDomainPathForIcon(images) {
    let domainPath = '',
        port;

    if (images.length) {
      domainPath = Utils.getProtocol(Utils.getValueFirstProperty(images[0])) + '://' + Utils.getHostName(Utils.getValueFirstProperty(images[0]));
    } else {
      port = this.$location.port();
      domainPath = this.$location.protocol() + '://' + this.$location.host() + ((port !== 80) ? ':' + port : '');
    }

    return domainPath;
  }

  _setTypeItem(obj, type) {
    return Utils.setObjectProperty(obj, 'type', type);
  }

  _getIconUrl(item, type) {
    if (!NavigationPostProcessingData.ICON_DOMAIN_PATH.length || NavigationPostProcessingData.ICON_DOMAIN_PATH[type]) {
      NavigationPostProcessingData.ICON_DOMAIN_PATH[type] = this._getDomainPathForIcon((item.hasOwnProperty('images')) ? item.images : [], type);
    }

    if (item.hasOwnProperty('images')) {
      delete item.images;
    }

    return NavigationPostProcessingData.ICON_DOMAIN_PATH[type] + this.NavigationConfig.getIconPath(type) + item.id + this.NavigationConfig.getIconType(type);
  }

  _setBackgroundImageStyle(item, type) {
    item.style = {
      'background-image': 'url(' + this._getIconUrl(item, type) + ')'
    };
  }

  _processingItem(item, type) {
    this._setTypeItem(item, type);
    this._setBackgroundImageStyle(item, type);
  }

  /** public method */
  trasformData(navigationItemsArray, type) {
    if (angular.isArray(navigationItemsArray) && navigationItemsArray.length) {
      navigationItemsArray.forEach(item => {
        this._processingItem(item, type);
      });

      return navigationItemsArray;
    }

    if (angular.isObject(navigationItemsArray)) {
      this._processingItem(navigationItemsArray, type);
    }

    return navigationItemsArray;
  }
}
