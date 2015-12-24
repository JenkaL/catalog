(function() {
    'use strict';

    var categoryId = 10,
        sectionId = 2;

    var controller, $scope, $rootScope, $state, $stateParams, $q, SectionStorage, CategoryStorage,
        catalogType, CatalogCollectionInterface, $httpBackend, $timeout;

    function testByItemType(type, id, productData) {
        beforeEach(function() {
            module(function($provide) {
              $provide.factory('catalogType', function() {
                return type;
              });
            });
        });

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function(_$q_, _$timeout_,  _$state_, _$rootScope_, _$stateParams_, _SectionStorage_,
                                   _CategoryStorage_, _catalogType_, _CatalogCollectionInterface_, _$httpBackend_) {
            $timeout = _$timeout_;
            $q = _$q_;
            catalogType = _catalogType_;
            CatalogCollectionInterface = _CatalogCollectionInterface_;
            SectionStorage = _SectionStorage_;
            CategoryStorage = _CategoryStorage_;

            $state = _$state_;
            $stateParams = _$stateParams_;
            $rootScope = _$rootScope_;

            $scope = $rootScope.$new();

            $state.transitionTo('catalog', {type: type, id: id});
            $rootScope.$apply();

            controller = new $state.current.controller($scope, $stateParams, catalogType, CatalogCollectionInterface);

            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/v3/' + type + '/' + id + '/products?country=RU&device_id=-1000&lang=ru').respond(productData);
        }));

        it('should fetchItems send http request', function() {
            $httpBackend.expectGET('/api/v3/' + type + '/' + id + '/products?country=RU&device_id=-1000&lang=ru');
            controller.fetchItems(type, id);
            $httpBackend.flush();
        });

        it('should fetchItems get products items', function() {
            spyOn(CatalogCollectionInterface, 'fetch').and.callFake(function() {
              var deferred = $q.defer();

              $timeout(function() {
                deferred.resolve(productData);
              }, 0);

              return deferred.promise;
            });

            controller.fetchItems(type, id);
            $timeout.flush();
            expect(controller.items).toEqual(productData);
        });

        it('should getNameForSection() set header for catalog if storage have items', function() {
            var header = (type === 'category') ? 'Аккумуляторы' : 'Скидки',
                navigationItemsStorage = (type === 'category') ? CategoryStorage : SectionStorage;

            spyOn(navigationItemsStorage, 'getNameById').and.returnValue(header);
            controller.getNameForSection(type, id);
            expect(controller.currentHeader).toEqual(header);
        });

        it('should getNameForSection() set header for catalog if storage have  items later', function() {
            var header = (type === 'category') ? 'Аккумуляторы' : 'Скидки',
                navigationItemsStorage = (type === 'category') ? CategoryStorage : SectionStorage,
                mockData = (type === 'category') ? categoryNavItems : sectionNavItems;

            navigationItemsStorage.put([]);
            controller.getNameForSection(type, id);
            expect(controller.currentHeader).toEqual('');

            $timeout(function() {
              navigationItemsStorage.put(mockData);
              controller.getNameForSection(type, id);
            }, 100);

            $timeout.flush();
            expect(controller.currentHeader).toEqual(header);
        });
    }

    /**
     * @description: tested method of controller route  by url \'/{type}/:id\'
     * section list
     */
    describe('Catalog module tested', function() {
        testByItemType('section', sectionId, productsData.productsSection);
    });


    /**
     * @description: tested method of controller route  by url \'/{type}/:id\'
     * category list
     */
    describe('Catalog module tested', function() {
        testByItemType('category', categoryId, productsData.productsCategory);
    });
})();
