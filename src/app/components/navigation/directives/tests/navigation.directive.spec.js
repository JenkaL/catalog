(function() {
    'use strict';

    describe('Navigation directive tested', function() {
        var $scope,
            element,
            isolateScope,
            controller,
            $rootScope,
            $httpBackend;

        function mockTypeFilter(value, type) {
          return (type == 'category') ? categories : sections;
        }

        function mockIsNotSystemSection(arr) {
          return sections;
        }

        function mockIsMainSection(arr) {
          return [sections[3]];
        }

        function mockIsNotDevices(arr) {
          return categories.filter(function(cat) {
            return !categories.devices;
          });
        }

        function mockIsDevices(arr) {
          return categories.filter(function(cat) {
            return categories.devices;
          });
        }

        beforeEach(module('mNavigation'));
        beforeEach(module('mretailerDesktop'));

        beforeEach(function() {
          module(function($provide) {
            $provide.value('typeFilter', mockTypeFilter);
          });
        });

        beforeEach(inject(function($injector, _$rootScope_, $compile) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/api/v3/categories?country=RU&device_id=-1000&lang=ru').respond(categories);
            $httpBackend.when('GET', '/api/v3/sections?country=RU&device_id=-1000&lang=ru').respond(sections);

            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            element = $compile('<navigation></navigation>')($scope);

            $scope.$digest();

            isolateScope = element.isolateScope();

            controller = element.controller('navigation');
            spyOn(controller, 'fetchItems').and.callFake(function() {
              this.items = categories.concat(sections);
            });
        }));

        xit('scope element to equal scope directive', function() {
            isolateScope = element.isolateScope();
            controller = element.controller('navigation');
            expect(isolateScope.$parent).toEqual($scope);
        });

        it('directive items equals controller items', function() {
          function getItemsLength() {
              return (mockIsNotSystemSection(mockTypeFilter(controller.items, 'section')).length +
                      mockIsMainSection(mockTypeFilter(controller.items, 'section')).length +
                      mockIsNotDevices(mockTypeFilter(controller.items, 'category')).length +
                      mockIsDevices(mockTypeFilter(controller.items, 'category')).length);
          }

          controller.fetchItems();
          $scope.$digest();

          // + faq + about (add to navigation directive)
          expect(element[0].querySelectorAll('.navigation-list .navigation-list-item').length).toBe(getItemsLength() + 2);
        });
    });
})();

