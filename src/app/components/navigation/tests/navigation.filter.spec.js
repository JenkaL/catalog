(function() {
    'use strict';

    describe('Navigation module tested', function() {
        var injectorMock, mockFilterByType;

        beforeEach(module('mNavigation'));

        beforeEach(inject(function($injector, typeFilter) {
            mockFilterByType = typeFilter;
            injectorMock = $injector;
        }));

        it('should filterByType defined in Navigation module', function() {
            expect(mockFilterByType).toBeDefined();
        });

        it('should filterByType defined in Navigation module', function() {
            expect(mockFilterByType(navigationItem, 'category').length).toBe(17);
            expect(mockFilterByType(navigationItem, '123').length).toBe(0);
            expect(mockFilterByType([], 'category').length).toBe(0);
        });
    });
})();

