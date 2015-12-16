(function() {
    'use strict';

    var categoryId = 10,
        sectionId = 2;

    /**
     * @description: tested method of controller route  by url \'/{type}/:id\'
     * section list
     */
    describe('Catalog module tested', function() {
        var controller, $scope, $rootScope, $state, $stateParams, $q,
            catalogType, CatalogCollectionInterface, $httpBackend, $timeout;

        beforeEach(function() {
          module(function($provide) {
            $provide.factory('catalogType', function() {
              return 'section';
            });
          });
        });

        //beforeEach(function() {
        //  module(function($provide) {
        //    $provide.service('CatalogCollectionInterface', [function() {
        //      return {
        //        fetch: function() {
        //
        //        }
        //      };
        //    }]);
        //  });
        //});

        beforeEach(module('ui.router'));
        beforeEach(module('mNavigation'));
        beforeEach(module('mCatalog'));

        beforeEach(inject(function(_$q_, _$timeout_, $controller, _$state_, _$rootScope_, _$stateParams_,
                                   _catalogType_, _CatalogCollectionInterface_, _$httpBackend_) {
            $stateParams = _$stateParams_;
            catalogType = _catalogType_;
            CatalogCollectionInterface = _CatalogCollectionInterface_;
            $timeout = _$timeout_;
            $q = _$q_;

            $state = _$state_;
            $stateParams = _$stateParams_;
            $rootScope = _$rootScope_;

            $scope = $rootScope.$new();

            $state.transitionTo('catalog', {type: 'section', id: 2});
            $rootScope.$apply();

            controller = new $state.current.controller($scope, $stateParams, catalogType, CatalogCollectionInterface);

            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/v3/section/2/products?country=RU&device_id=-1000&lang=ru').respond(productsData.productsSection);
            $httpBackend.when('GET', '/api/v3/section/3/products?country=RU&device_id=-1000&lang=ru').respond(productsData.productsSection);
        }));

        it('should fetchItems send http request', function() {
            $httpBackend.expectGET('/api/v3/section/3/products?country=RU&device_id=-1000&lang=ru');
            controller.fetchItems('section', 3);
            $httpBackend.flush();

            $httpBackend.expectGET('/api/v3/section/2/products?country=RU&device_id=-1000&lang=ru');
            controller.fetchItems('section', 2);
            $httpBackend.flush();
        });

        it('should fetchItems get products items', function() {
          spyOn(CatalogCollectionInterface, 'fetch').and.callFake(function() {
            var deferred = $q.defer();

            $timeout(function() {
              deferred.resolve(productsData.productsSection);
            }, 0);

            return deferred.promise;
          });

          controller.fetchItems('section', 2);
          $timeout.flush();
          expect(controller.items).toEqual(productsData.productsSection);
        });
    });
})();
