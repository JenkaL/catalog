(function() {
  'use strict';

  describe('Category module tested', function() {
    var injectorMock, mockRestangular, CategoryCoreAPIObj, $httpBackend;

    beforeEach(function() {
      module(function($provide){
        $provide.service('NavigationPostProcessingData', function() {
          this.trasformData = function(navigationItemsArray, type) {
            return categoryRestangularProcessingData;
          };
        });
      });

      module('mCategory');
    });

    beforeEach(inject(function($injector, _NavigationRestangular_){
      mockRestangular = _NavigationRestangular_;
      injectorMock = $injector;

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', '/api/v3/categories?country=RU&device_id=-1000&lang=ru').respond(categories);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should defined Restangular and CategoryCoreAPI', function(){
      CategoryCoreAPIObj = injectorMock.get('CategoryCoreAPI');

      expect(mockRestangular).toBeDefined();
      expect(CategoryCoreAPIObj).toBeDefined();
    });

    it('should send request when take fn query CategoryCoreAPI', function(){
      CategoryCoreAPIObj = injectorMock.get('CategoryCoreAPI');

      $httpBackend.expectGET('/api/v3/categories?country=RU&device_id=-1000&lang=ru');
      CategoryCoreAPIObj.query();
      $httpBackend.flush();
    });

  });
})();

