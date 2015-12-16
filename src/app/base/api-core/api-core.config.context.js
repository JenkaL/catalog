export default function RestangularWithContext(Restangular, apiContext) {
  'ngInject';

  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setDefaultRequestParams('get', apiContext);
  });
}
