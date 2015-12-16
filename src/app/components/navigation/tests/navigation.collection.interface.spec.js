(function() {
    'use strict';

    /**
     * @description: check get & $save method
     * and defined service
     */
    describe('Navigation module tested', function() {
        var injectorMock, NavigationCollectionInterface, CategoryStorage, SectionStorage;

        beforeEach(module('mNavigation'));

        beforeEach(inject(function($injector, _NavigationCollectionInterface_, _CategoryStorage_, _SectionStorage_) {
            injectorMock = $injector;
            NavigationCollectionInterface = _NavigationCollectionInterface_;
            CategoryStorage = _CategoryStorage_;
            SectionStorage = _SectionStorage_;

            spyOn(CategoryStorage, 'get');
            spyOn(SectionStorage, 'get');
            spyOn(CategoryStorage, 'put');
            spyOn(SectionStorage, 'put');
        }));

        it('should NavigationCollectionInterface defined in Navigation module', function() {
            expect(NavigationCollectionInterface).toBeDefined();
        });

        it('should CategoryStorage call get', function() {
            NavigationCollectionInterface.get('category');
            expect(CategoryStorage.get).toHaveBeenCalled();
        });

        it('should SectionStorage call get', function() {
            NavigationCollectionInterface.get('section');
            expect(SectionStorage.get).toHaveBeenCalled();
        });

        it('should SectionStorage call put', function() {
            NavigationCollectionInterface.$save(sections, 'section');
            expect(SectionStorage.put).toHaveBeenCalled();
        });

        it('should CategoryStorage call put', function() {
            NavigationCollectionInterface.$save(categories, 'category');
            expect(CategoryStorage.put).toHaveBeenCalled();
        });
    });


    /**
     * @description: check fetch method have been called
     * api service and storage service
     */
    describe('Navigation module tested', function() {
        var NavigationCollectionInterface, CategoryCoreAPI, SectionCoreAPI, CategoryStorage, SectionStorage;

        beforeEach(module('mNavigation'));

        beforeEach(inject(function(_CategoryCoreAPI_, _SectionCoreAPI_, _CategoryStorage_, _SectionStorage_, _NavigationCollectionInterface_) {
            CategoryCoreAPI = _CategoryCoreAPI_;
            SectionCoreAPI = _SectionCoreAPI_;
            CategoryStorage = _CategoryStorage_;
            SectionStorage = _SectionStorage_;
            NavigationCollectionInterface = _NavigationCollectionInterface_;

            spyOn(CategoryCoreAPI, 'query').and.callFake(function(){
              return {
                then: function(callback){
                  callback(categoryRestangularProcessingData);
                }
              };
            });
            spyOn(CategoryStorage, 'put');

            spyOn(SectionCoreAPI, 'query').and.callFake(function(){
              return {
                then: function(callback){
                  callback(sectionRestangularProcessingData);
                }
              };
            });
            spyOn(SectionStorage, 'put');
        }));

        it('should NavigationCollectionInterface defined in Navigation module', function() {
            expect(NavigationCollectionInterface).toBeDefined();
            expect(CategoryCoreAPI).toBeDefined();
            expect(SectionCoreAPI).toBeDefined();
        });

        it('should CategoryCoreAPI call fetch', function() {
            NavigationCollectionInterface.fetch('category');

            expect(CategoryCoreAPI.query).toHaveBeenCalled();
            expect(CategoryCoreAPI.query.calls.count()).toEqual(1);
            expect(CategoryStorage.put.calls.count()).toEqual(1);
        });

        it('should SectionCoreAPI call fetch', function() {
            NavigationCollectionInterface.fetch('section');

            expect(SectionCoreAPI.query).toHaveBeenCalled();
            expect(SectionCoreAPI.query.calls.count()).toEqual(1);
            expect(SectionStorage.put.calls.count()).toEqual(1);
        });
    });


    /**
     * @description: check fetch method result with http mock
     */
    describe('Navigation module tested', function() {
        var NavigationCollectionInterface, $httpBackend;

        beforeEach(module('mNavigation'));

        beforeEach(inject(function(_NavigationCollectionInterface_, _$httpBackend_) {
            NavigationCollectionInterface = _NavigationCollectionInterface_;

            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/v3/categories?country=RU&device_id=-1000&lang=ru').respond(categoryRestangularProcessingData);
            $httpBackend.when('GET', '/api/v3/sections?country=RU&device_id=-1000&lang=ru').respond(sectionRestangularProcessingData);
        }));

        it('should NavigationCollectionInterface fetch \'section\' return sections', function(done) {
          NavigationCollectionInterface.fetch('section').then(function(response) {
            expect(angular.equals(response, sectionNavItems)).toBe(true);

            done();
          });

          $httpBackend.flush();
        });

        it('should NavigationCollectionInterface fetch \'category\' return categories', function(done) {
            NavigationCollectionInterface.fetch('category').then(function(response) {
                expect(angular.equals(response, categoryNavItems)).toBe(true);

                done();
            });

            $httpBackend.flush();
        });
    });
})();

