(function() {
  'use strict';

  describe('Navigation module tested', function() {
    var injectorMock, NavigationConfig;
    var mockNavigationItems = [{
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
    }],
    mockNavigationItemsTypes = ['category', 'section'];

    beforeEach(function() {
      module('mNavigation');
    });

    beforeEach(inject(function($injector, _NavigationConfig_) {
      injectorMock = $injector;
      NavigationConfig = _NavigationConfig_;
    }));

    it('should NavigationConfig defined ', function() {
      expect(NavigationConfig).toBeDefined();
      expect(NavigationConfig.navigationItems).toBeDefined();
    });

    it('should navigationItems equals mock ', function() {
      expect(NavigationConfig.navigationItems).toEqual(mockNavigationItems);
    });

    it('should getTypesItem return array contains two item2 ', function() {
      expect(NavigationConfig.getTypesItem()).toEqual(mockNavigationItemsTypes);
    });
  });
})();

