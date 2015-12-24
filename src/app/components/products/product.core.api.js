export default class ProductCoreAPI {
  constructor(RestangularWithLangCountryContext) {
    'ngInject';

    this.RestangularWithLangCountryContext = RestangularWithLangCountryContext;
  }

  queryItem(productId) {
    return this.RestangularWithLangCountryContext.one('products', productId).get();
  }
}
