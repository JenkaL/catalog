export default function RestangularWithLangCountryContext(Restangular, apiContext) {
  'ngInject';

  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setDefaultRequestParams('get', {lang: apiContext.lang, country: apiContext.country});
  });
}
