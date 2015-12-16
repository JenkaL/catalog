(function() {
  'use strict';

  describe('Category module tested', function() {

    beforeEach(module('mCategory'));

    it('should module mCategory provide a servicies', inject(function(CategoryStorage) {
      expect(CategoryStorage).toBeDefined();
      expect(CategoryStorage.get()).toEqual([]);

      CategoryStorage.put(categories);

      expect(CategoryStorage.get()).toEqual(categories);
      expect(CategoryStorage.getNameById(1)).toEqual("Карты памяти");
      expect(CategoryStorage.getNameById(5)).toBe(null);
      expect(CategoryStorage.getNameById("")).toBe(null);

      CategoryStorage.remove();
      expect(CategoryStorage.get()).toEqual([]);
    }));

    it('should define a isDevices, isNotDevices filters', inject(function($filter) {
      expect($filter('isDevices')).toBeDefined();
      expect($filter('isNotDevices')).toBeDefined();
    }));

    it('should filtered isDevicesFilter categories', inject(function(isDevicesFilter) {
      var isDevicesArr = categories.filter(function(item) { return item.devices; }),
          isDevicesSlicedArr = categories.slice(0, 3).filter(function(item) { return item.devices; }),
          categoriesTemp = angular.copy(categories);

      categoriesTemp.forEach(function(item) {
        item.devices = true;
      });

      expect(isDevicesFilter(categories)).toEqual(isDevicesArr);
      expect(isDevicesFilter([categories[0], categories[1], categories[2]])).toEqual(isDevicesSlicedArr);
      expect(isDevicesFilter([])).toEqual([]);
      expect(isDevicesFilter(categoriesTemp).length).toEqual(17);
    }));

    it('should filtered isNotDevicesFilter categories', inject(function(isNotDevicesFilter) {
      var isNotDevicesArr = categories.filter(function(item) { return !item.devices; }),
          isNotDevicesSlicedArr = categories.slice(0, 3).filter(function(item) { return !item.devices; }),
          categoriesTemp = angular.copy(categories);

      categoriesTemp.forEach(function(item) {
        item.devices = false;
      });

      expect(isNotDevicesFilter(categories)).toEqual(isNotDevicesArr);
      expect(isNotDevicesFilter([categories[0], categories[1], categories[2]])).toEqual(isNotDevicesSlicedArr);
      expect(isNotDevicesFilter([])).toEqual([]);
      expect(isNotDevicesFilter(categoriesTemp).length).toEqual(17);
    }));
  });
})();

