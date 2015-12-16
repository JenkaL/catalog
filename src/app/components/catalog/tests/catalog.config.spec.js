(function() {
  'use strict';

  describe('Catalog module tested', function() {
    var injectorMock, CatalogConfig, CategoryCoreAPI, CategoryStorage, SectionCoreAPI, SectionStorage;
    var catalogSections = [{
          type: 'category',
          apiFactory: {},
          storageFactory: {}
        },{
          type: 'section',
          apiFactory: {},
          storageFactory: {}
        }];

    beforeEach(module('ui.router'));
    beforeEach(module('mNavigation'));
    beforeEach(module('mCatalog'));

    beforeEach(inject(function($injector, _CategoryCoreAPI_, _CategoryStorage_, _SectionCoreAPI_, _SectionStorage_, _CatalogConfig_) {
      injectorMock = $injector;
      CategoryCoreAPI = _CategoryCoreAPI_;
      CategoryStorage = _CategoryStorage_;
      SectionCoreAPI = _SectionCoreAPI_;
      SectionStorage = _SectionStorage_;
      CatalogConfig = _CatalogConfig_;

      catalogSections[0].apiFactory = CategoryCoreAPI;
      catalogSections[0].storageFactory = CategoryStorage;
      catalogSections[1].apiFactory = SectionCoreAPI;
      catalogSections[1].storageFactory = SectionStorage;
    }));

    it('should CatalogConfig defined ', function() {
      expect(CatalogConfig).toBeDefined();
      expect(CatalogConfig.catalogSections).toBeDefined();
    });

    it('should navigationItems equals mock ', function() {
      expect(CatalogConfig.catalogSections).toEqual(catalogSections);
    });

    it('should getTypesItem return array contains two item2 ', function() {
      expect(CatalogConfig.getDependency('category', 'apiFactory')).toEqual(CategoryCoreAPI);
    });
  });
})();

