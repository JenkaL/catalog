(function() {
    'use strict';

    var categoryId = 10,
        sectionId = 2;

    /**
     * @description: check get & $save method
     * and defined service
     */
    describe('Catalog module tested storage method', function() {
        var injectorMock, CatalogConfig, CatalogCollectionInterface, ProductStorage;

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function($injector, _CatalogConfig_, _CatalogCollectionInterface_, _ProductStorage_) {
            injectorMock = $injector;
            CatalogConfig = _CatalogConfig_;
            CatalogCollectionInterface = _CatalogCollectionInterface_;
            ProductStorage = _ProductStorage_;

            spyOn(ProductStorage, 'get');
            spyOn(ProductStorage, 'put');
        }));

        it('should CatalogCollectionInterface defined in catalog module', function() {
            expect(CatalogCollectionInterface).toBeDefined();
        });

        it('should ProductStorage call get', function() {
            CatalogCollectionInterface.get();
            expect(ProductStorage.get).toHaveBeenCalled();
        });

        it('should ProductStorage call get', function() {
            CatalogCollectionInterface.$save(productsData.productsSection);
            expect(ProductStorage.put).toHaveBeenCalled();
        });
    });


    /**
     * @description: check controller method getNameForSection & getStorageNavigationItems
     */
    describe('Catalog module tested controller method', function() {
        var CatalogCollectionInterface, CategoryCoreAPI, CategoryStorage,
            SectionCoreAPI, SectionStorage, ProductStorage;

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function( _CatalogCollectionInterface_, _CategoryCoreAPI_, _CategoryStorage_,
                                   _SectionCoreAPI_, _SectionStorage_, _ProductStorage_) {
            ProductStorage = _ProductStorage_;
            CategoryCoreAPI = _CategoryCoreAPI_;
            SectionCoreAPI = _SectionCoreAPI_;
            CategoryStorage = _CategoryStorage_;
            SectionStorage = _SectionStorage_;
            CatalogCollectionInterface = _CatalogCollectionInterface_;

            CategoryStorage.put(categoryNavItems);
            SectionStorage.put(sectionNavItems);

            spyOn(CategoryStorage, 'getNameById').and.callThrough();
            spyOn(SectionStorage, 'getNameById').and.callThrough();
            spyOn(CategoryStorage, 'get').and.callThrough();
            spyOn(SectionStorage, 'get').and.callThrough();
        }));

        it('should CategoryStorage call from getNameForSection \'category\'', function() {
            var expectCategoryName = CatalogCollectionInterface.getNameForSection('category', categoryId);

            expect(CategoryStorage.getNameById).toHaveBeenCalled();
            expect(CategoryStorage.getNameById).toHaveBeenCalledWith(categoryId);
            expect(expectCategoryName).toBe('Аккумуляторы');
        });

        it('should SectionStorage call from getNameForSection \'section\'', function() {
            var expectSectionName = CatalogCollectionInterface.getNameForSection('section', sectionId);

            expect(SectionStorage.getNameById).toHaveBeenCalled();
            expect(SectionStorage.getNameById).toHaveBeenCalledWith(sectionId);
            expect(expectSectionName).toBe('Скидки');
        });

        it('should CategoryStorage call from getStorageNavigationItems \'category\'', function() {
            var expectCategoriesItems = CatalogCollectionInterface.getStorageNavigationItems('category');

            expect(CategoryStorage.get).toHaveBeenCalled();
            expect(angular.equals(expectCategoriesItems, categoryNavItems)).toBe(true);
        });

        it('should CategoryStorage call from getStorageNavigationItems \'section\'', function() {
            var expectSectionsItems = CatalogCollectionInterface.getStorageNavigationItems('section');

            expect(SectionStorage.get).toHaveBeenCalled();
            expect(angular.equals(expectSectionsItems, sectionNavItems)).toBe(true);
        });
    });


    /**
     * @description: check controller method result with http mock
     */
    describe('Catalog module tested controller method', function() {
        var expectProductsCategory, expectProductsSection, $httpBackend, CatalogCollectionInterface, CategoryCoreAPI, CategoryStorage,
            SectionCoreAPI, SectionStorage, ProductStorage;

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function($injector, _$httpBackend_, _CatalogConfig_, _CatalogCollectionInterface_, _CategoryCoreAPI_, _CategoryStorage_,
                                   _SectionCoreAPI_, _SectionStorage_, _ProductStorage_) {
            ProductStorage = _ProductStorage_;
            CategoryCoreAPI = _CategoryCoreAPI_;
            SectionCoreAPI = _SectionCoreAPI_;
            CategoryStorage = _CategoryStorage_;
            SectionStorage = _SectionStorage_;
            CatalogCollectionInterface = _CatalogCollectionInterface_;

            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/v3/category/10/products?country=RU&device_id=-1000&lang=ru').respond(productsData.productsCategory);
            $httpBackend.when('GET', '/api/v3/section/2/products?country=RU&device_id=-1000&lang=ru').respond(productsData.productsSection);

            expectProductsCategory = productsData.mockProductModel(productsData.productsCategory);
            expectProductsSection = productsData.mockProductModel(productsData.productsSection);
        }));

        it('should CatalogCollectionInterface fetch \'section\' send right request', function() {
            $httpBackend.expectGET('/api/v3/section/2/products?country=RU&device_id=-1000&lang=ru');
            CatalogCollectionInterface.fetch('section', sectionId);
            $httpBackend.flush();
        });

        it('should CatalogCollectionInterface fetch \'section\' return section\'s products', function(done) {
          CatalogCollectionInterface.fetch('section', sectionId).then(function(response) {
            expect(angular.equals(response, expectProductsSection)).toBe(true);

            done();
          });

          $httpBackend.flush();
        });

        it('should CatalogCollectionInterface fetch \'category\' return categories products', function(done) {
          CatalogCollectionInterface.fetch('category', categoryId).then(function(response) {
            expect(angular.equals(response, expectProductsCategory)).toBe(true);

            done();
          });

          $httpBackend.flush();
        });
    });


    /**
     * @description: test protected method of service
     */
    describe('Catalog module tested controller method', function() {
        var CatalogCollectionInterface, CategoryCoreAPI, CategoryStorage,
            SectionCoreAPI, SectionStorage;

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function( _CatalogCollectionInterface_, _CategoryCoreAPI_, _CategoryStorage_,
                                  _SectionCoreAPI_, _SectionStorage_) {
        CategoryCoreAPI = _CategoryCoreAPI_;
        SectionCoreAPI = _SectionCoreAPI_;
        CategoryStorage = _CategoryStorage_;
        SectionStorage = _SectionStorage_;
        CatalogCollectionInterface = _CatalogCollectionInterface_;
      }));

      it('should CatalogCollectionInterface return category api service', function() {
        var expectService = CatalogCollectionInterface._getApiFactories('category');

        expect(angular.equals(expectService, CategoryCoreAPI)).toBe(true);
      });

      it('should CatalogCollectionInterface return section api service', function() {
        var expectService = CatalogCollectionInterface._getApiFactories('section');

        expect(angular.equals(expectService, SectionCoreAPI)).toBe(true);
      });

      it('should CatalogCollectionInterface return category storage service', function() {
        var expectService = CatalogCollectionInterface._getStorageFactories('category');

        expect(angular.equals(expectService, CategoryStorage)).toBe(true);
      });

      it('should CatalogCollectionInterface return section storage service', function() {
        var expectService = CatalogCollectionInterface._getStorageFactories('section');

        expect(angular.equals(expectService, SectionStorage)).toBe(true);
      });
  });
})();
