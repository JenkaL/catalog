(function() {
    'use strict';

    describe('Navigation module tested', function() {
        var injectorMock,
            mockNavigationCtrl,
            NavigationCollectionInterface,
            NavigationConfig,
            $rootScope,
            $scope,
            $q,
            $httpBackend,
            element;

        beforeEach(module('mNavigation'));

        beforeEach(inject(function($injector, _$rootScope_, _$httpBackend_, $compile, $controller, _NavigationCollectionInterface_, _NavigationConfig_, _$q_) {
            injectorMock = $injector;
            $rootScope = _$rootScope_;
            $q = _$q_;
            NavigationConfig = _NavigationConfig_;
            NavigationCollectionInterface = _NavigationCollectionInterface_;

            var deferred = $q.defer();
            spyOn(NavigationCollectionInterface, 'fetch').and.returnValue(deferred.promise);
            deferred.resolve(categories);

            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/v3/categories?country=RU&device_id=-1000&lang=ru').respond(categories);
            $httpBackend.when('GET', '/api/v3/sections?country=RU&device_id=-1000&lang=ru').respond(sections);

            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            element = angular.element('<navigation></navigation>');
            $compile(element)($scope);

            $scope.$digest();

            mockNavigationCtrl = element.controller('navigation');

        }));

        it('initial Navigation Controller', function() {
            expect(mockNavigationCtrl).toBeDefined();
            expect(mockNavigationCtrl.items).toBeDefined();

            expect(mockNavigationCtrl.fetchItems).toBeDefined();
        });

        xit('should fetch navigation items ', function(done) {
            expect(NavigationCollectionInterface.fetch.calls.count()).toBe(2);

            NavigationCollectionInterface.fetch().then(function () {
              expect(mockNavigationCtrl.items).not.toEqual([]);
              expect(mockNavigationCtrl.items.length).toBe(34);
              done();
            });

            $httpBackend.flush();
        });
    });
})();

