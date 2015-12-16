import CatalogController from './catalog.controller';

export default function catalogRouterConfig ($stateProvider) {
  $stateProvider
    .state('catalog', {
      url: '/{type}/:id',
      resolve:{
        catalogType: ['$stateParams', $stateParams => {
          return $stateParams.type;
        }]
      },
      templateProvider: function($templateCache) {
        'ngInject';

        return $templateCache.get('app/components/catalog/views/catalog.html');
      },
      controller: CatalogController,
      controllerAs: 'catalogCtrl'
    })
      .state('catalog.list', {
        url: '/',
        templateProvider: ($templateCache, catalogType) => {
          'ngInject';

          return $templateCache.get(`app/components/catalog/views/${catalogType}-catalog.html`);
        }
      });
}
