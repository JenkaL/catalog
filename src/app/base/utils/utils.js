class UtilsClass {
  constructor() {}

  setObjectProperty(obj, prop, value) {
    if (obj && angular.isObject(obj)) {
      obj[prop] = value;
    }

    return obj;
  }

  getHostName(url) {
    return url.split('://')[1].split('/')[0];
  }

  getProtocol(url) {
    return url.split('://')[0];
  }

  getValueFirstProperty(obj) {
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        return obj[k];
      }
    }

    return '';
  }

  getPropertyValueByOtherProp(arr, returnProperty, searchingProp, searchingVal) {
    let returnPropertyLocal = null;

    arr.forEach(item => {
      if(item[searchingProp] === searchingVal) {
        returnPropertyLocal = item[returnProperty];
      }
    });

    return returnPropertyLocal;
  }

  getItemByProp(arr, prop, value) {
    let returnItem = {},
        i = 0;

    arr.forEach(item => {
      if(item[prop] === value) {
        returnItem = item;
      }
    });

    return returnItem;
  }

  getIndexOfItem(arr, obj) {
    let i = 0;

    for (i = 0; i < arr.length; i++ ) {
        if (angular.equals(arr[i], obj)) {
          return i;
        }
    }

    return -1;
  }

  extendDeferred($q) {
    let objDefer = { deferred: $q.defer() };

    objDefer.promise = objDefer.deferred.promise;

    return objDefer;
  }

  generateCustomEvent(elem, eventName, detail) {
    if (elem !== null) {
      elem.dispatchEvent(new CustomEvent(eventName, {
        detail: detail
      }));
    }
  }
}

let Utils = new UtilsClass();

export default Utils;
