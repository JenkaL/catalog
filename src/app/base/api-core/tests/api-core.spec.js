(function() {
  'use strict';
  describe('Api-core module', function() {
    var apiContextMock = {
        device_id: -1000,
        country: 'RU',
        lang: 'ru'
      },
      apiPathMock = '/api/v3/',
      mockInjector, mockRestangular, $httpBackend, mockRestangularWithContext, mockNavigationRestangular;

    beforeEach(module('mApiCore'));

    describe('tested constants and value', function() {

      it('should module mApiCore define a constants and value', inject(function(apiPath, apiContext) {
        expect(apiPath).toBeDefined();
        expect(apiContext).toBeDefined();
        expect(apiPath).toEqual(apiPathMock);
        expect(apiContext).toEqual(apiContextMock);
      }));

    });

    describe('tested servecies', function() {

      beforeEach(function() {
        module(function($provide){
          $provide.service('NavigationPostProcessingData', function() {
            this.trasformData = function(navigationItemsArray, type) {
              return sectionRestangularProcessingData;
            };
          });
        });
      });

      beforeEach(inject(function($injector, _Restangular_, _RestangularWithContext_, _NavigationRestangular_) {
        mockInjector = $injector;
        mockRestangular = _Restangular_;
        mockRestangularWithContext = _RestangularWithContext_;
        mockNavigationRestangular = _NavigationRestangular_;

        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/v3/sections?country=RU&device_id=-1000&lang=ru').respond([]);
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should defined RestangularWithContext and NavigationRestangular', function() {
        expect(mockRestangularWithContext).toBeDefined();
        expect(mockNavigationRestangular).toBeDefined();
      });

      it('should send through RestangularWithContext with get params', function() {
        var sectionAPI = mockRestangularWithContext.all('sections');

        $httpBackend.expectGET('/api/v3/sections?country=RU&device_id=-1000&lang=ru');
        sectionAPI.getList();
        $httpBackend.flush();
      });

      it('should send through NavigationRestangular with get params', function() {
        var sectionAPI = mockNavigationRestangular.all('sections');

        $httpBackend.expectGET('/api/v3/sections?country=RU&device_id=-1000&lang=ru');
        sectionAPI.getList();
        $httpBackend.flush();
      });

      it('should NavigationRestangular transform response', function() {
        var sectionAPI = mockNavigationRestangular.all('sections');

        sectionAPI.getList().then(function(response) {
          expect(response).toEqual(sectionRestangularProcessingData);
        });

        $httpBackend.flush();
      });
    });
  });
})();

