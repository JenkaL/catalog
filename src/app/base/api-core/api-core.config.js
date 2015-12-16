export default function apiCoreConfig($httpProvider, RestangularProvider, apiPath) {
  'ngInject';

  RestangularProvider.setBaseUrl(apiPath);

  RestangularProvider.setDefaultHttpFields({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'});
  RestangularProvider.setMethodOverriders(['post']);
}
