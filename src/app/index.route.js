export default function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      template: '<h1>Index</h1>'
    })
    .state('about', {
      url: '/about',
      templateProvider: function($templateCache) {
        'ngInject';

        return $templateCache.get('app/views/about.html');
      }
    })
    .state('faq', {
      url: '/faq',
      templateProvider: function($templateCache) {
        'ngInject';

        return $templateCache.get('app/views/faq.html');
      }
    });

  $urlRouterProvider.otherwise('/');
}
