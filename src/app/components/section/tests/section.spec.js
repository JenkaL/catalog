(function() {
  'use strict';

  describe('Section module tested', function() {

    beforeEach(module('mSection'));

    it('should module mSection define a constants', inject(function(mainSectionId, preorderSectionId, withoutPriceSectionId) {
      expect(mainSectionId).toEqual(1);
      expect(preorderSectionId).toEqual(4);
      expect(withoutPriceSectionId).toEqual(5);
    }));

    it('should module mSection provide a servicies', inject(function(SectionStorage) {
      expect(SectionStorage).toBeDefined();
      expect(SectionStorage.get()).toEqual([]);

      SectionStorage.put(sections);

      expect(SectionStorage.get()).toEqual(sections);
      expect(SectionStorage.getNameById(1)).toEqual("Популярное");
      expect(SectionStorage.getNameById(5)).toBe(null);
      expect(SectionStorage.getNameById("")).toBe(null);

      SectionStorage.remove();
      expect(SectionStorage.get()).toEqual([]);
    }));

    it('should define a isMainSection, isNotSystemSection filters', inject(function($filter) {
      expect($filter('isMainSection')).toBeDefined();
      expect($filter('isNotSystemSection')).toBeDefined();
    }));

    it('should return true if the section is main (has id mainSectionId = 1)', inject(function(isMainSectionFilter) {
      expect(isMainSectionFilter(sections)).toEqual([sections[2]]);
      expect(isMainSectionFilter([sections[0], sections[1]])).toEqual([]);
      expect(isMainSectionFilter([])).toEqual([]);
    }));

    it('should return true if the section is not system (has system = false)', inject(function(isNotSystemSectionFilter) {
      var sectionsTemp = angular.copy(sections);

      sectionsTemp[0].system = true;

      expect(isNotSystemSectionFilter(sections)).toEqual(sections);
      expect(isNotSystemSectionFilter(sectionsTemp).length).toEqual(2);
      expect(isNotSystemSectionFilter([])).toEqual([]);
    }));
  });
})();

