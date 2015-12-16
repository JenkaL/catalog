(function() {
    'use strict';

    describe('Navigation module tested', function() {
        var injectorMock, locationMock, NavigationConfig, NavigationPostProcessingData,
            sectionPocessingData = sectionProcessingPro,
            categoryPocessingData = categoryProcessingPro;

        beforeEach(function() {
            module('mNavigation');
        });

        beforeEach(inject(function($injector, $location, _NavigationConfig_, _NavigationPostProcessingData_) {
            injectorMock = $injector;
            locationMock = $location;
            NavigationConfig = _NavigationConfig_;
            NavigationPostProcessingData = _NavigationPostProcessingData_;
        }));

        it('should NavigationPostProcessingData method _setTypeItem add type to obj', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories);

            expect(sectionsTemp[0].type).not.toBeDefined();
            NavigationPostProcessingData._setTypeItem(sectionsTemp[0], 'section');
            expect(sectionsTemp[0].type).toEqual('section');

            expect(categoriesTemp[0].type).not.toBeDefined();
            NavigationPostProcessingData._setTypeItem(categoriesTemp[0], 'category');
            expect(categoriesTemp[0].type).toEqual('category');
        });

        it('should NavigationPostProcessingData method _getDomainPathForIcon add style to obj', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories);

            var urlSection = NavigationPostProcessingData._getDomainPathForIcon([], 'section'),
                urlExpectSection = sectionPocessingData[0].style['background-image'].split('url(')[1].split(')')[0].split('/images')[0],
                urlCategory = NavigationPostProcessingData._getDomainPathForIcon(categoriesTemp[0].images, 'category'),
                urlExpectCategory = categoryPocessingData[0].style['background-image'].split('url(')[1].split(')')[0].split('/images')[0];

            if(locationMock.host() === 'server') {
                urlSection = urlSection.replace('server', 'localhost:3000');
                urlCategory = urlCategory.replace('server', 'localhost:3000');
            }

            if(!~urlExpectSection.indexOf(':')) {
                urlExpectSection = locationMock.protocol() + ':' + urlExpectSection;
            }

            if(!~urlExpectCategory.indexOf(':')) {
                urlExpectCategory = locationMock.protocol() + ':' + urlExpectCategory;
            }

            expect(urlSection).toEqual(urlExpectSection);
            expect(urlCategory).toEqual(urlExpectCategory);
        });

        it('should NavigationPostProcessingData method _setBackgroundImageStyle add style to obj', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories);

            var urlSection = NavigationPostProcessingData._getIconUrl(sectionsTemp[0], 'section'),
                urlExpectSection = sectionPocessingData[0].style['background-image'].split('url(')[1].split(')')[0],
                urlCategory = NavigationPostProcessingData._getIconUrl(categoriesTemp[0], 'category'),
                urlExpectCategory = categoryPocessingData[0].style['background-image'].split('url(')[1].split(')')[0];

            if(locationMock.host() === 'server') {
                urlSection = urlSection.replace('server', 'localhost:3000');
                urlCategory = urlCategory.replace('server', 'localhost:3000');
            }

            if(!~urlExpectSection.indexOf(':')) {
                urlExpectSection = locationMock.protocol() + ':' + urlExpectSection;
            }

            if(!~urlExpectCategory.indexOf(':')) {
                urlExpectCategory = locationMock.protocol() + ':' + urlExpectCategory;
            }

            expect(urlSection).toEqual(urlExpectSection);
            expect(urlCategory).toEqual(urlExpectCategory);
        });

        it('should NavigationPostProcessingData method _getIconUrl add style to obj', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories);

            expect(sectionsTemp[0].style).not.toBeDefined();
            NavigationPostProcessingData._setBackgroundImageStyle(sectionsTemp[0], 'section');
            expect(sectionsTemp[0].style).toBeDefined();
            expect(sectionsTemp[0].style['background-image']).toBeDefined();

            expect(categoriesTemp[0].style).not.toBeDefined();
            NavigationPostProcessingData._setBackgroundImageStyle(categoriesTemp[0], 'section');
            expect(categoriesTemp[0].style).toBeDefined();
            expect(categoriesTemp[0].style['background-image']).toBeDefined();
        });

        it('should NavigationPostProcessingData method _processingItem transform one element', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories);

            function testProcessingItem(items, itemsProcessing, type) {
                NavigationPostProcessingData._processingItem(items[0], type);

                if(locationMock.host() === 'server') {
                    items[0].style['background-image'] = items[0].style['background-image'].replace('http://server', 'http://localhost:3000');
                }

                expect(items[0]).toEqual(itemsProcessing[0]);
            }

            testProcessingItem(sectionsTemp, sectionPocessingData, 'section');
            testProcessingItem(categoriesTemp, categoryPocessingData, 'category');
        });

        it('should transformed data by NavigationPostProcessingData ', function() {
            var sectionsTemp = angular.copy(sections),
                categoriesTemp = angular.copy(categories),
                transformDataSection = NavigationPostProcessingData.trasformData(sectionsTemp, 'section'),
                transformDataCategory = NavigationPostProcessingData.trasformData(categoriesTemp, 'category');

            if(locationMock.host() === 'server') {
              transformDataSection.forEach(function(item) {
                item.style['background-image'] = item.style['background-image'].replace('http://server', 'http://localhost:3000');
              });
              transformDataCategory.forEach(function(item) {
                item.style['background-image'] = item.style['background-image'].replace('http://server', 'http://localhost:3000');
              });
            }

            expect(transformDataSection).toEqual(sectionPocessingData);
            expect(transformDataCategory).toEqual(categoryPocessingData);
        });
    });
})();

