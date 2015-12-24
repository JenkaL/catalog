export default function RestangularNavigation(RestangularWithContext, NavigationPostProcessingData) {
  'ngInject';

  return RestangularWithContext.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.addResponseInterceptor(function(data, operation, what) {
      let type = (what === 'sections') ? 'section' :
                    ((what === 'categories') ? 'category' : what);

      return NavigationPostProcessingData.trasformData(data, type);
    });
  });
}
