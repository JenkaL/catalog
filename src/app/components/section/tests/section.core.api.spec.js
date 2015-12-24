(function() {
  'use strict';

  describe('Section module tested', function() {
    var injectorMock, mockRestangular, SectionCoreAPIObj, $httpBackend;

    beforeEach(function() {
      module(function($provide){
        $provide.service('NavigationPostProcessingData', function() {
          this.trasformData = function(navigationItemsArray, type) {
            return sectionRestangularProcessingData;
          };
        });
      });

      module('mSection');
    });

    beforeEach(inject(function($injector, _RestangularNavigation_) {
      mockRestangular = _RestangularNavigation_;
      injectorMock = $injector;

      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', '/api/v3/sections?country=RU&device_id=-1000&lang=ru').respond(sections);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should defined Restangular and SectionCoreAPI', function() {
      SectionCoreAPIObj = injectorMock.get('SectionCoreAPI');

      expect(mockRestangular).toBeDefined();
      expect(SectionCoreAPIObj).toBeDefined();
    });

    it('should send request when take fn query SectionCoreAPI', function() {
      SectionCoreAPIObj = injectorMock.get('SectionCoreAPI');

      $httpBackend.expectGET('/api/v3/sections?country=RU&device_id=-1000&lang=ru');
      SectionCoreAPIObj.query();
      $httpBackend.flush();
    });

  });
})();

