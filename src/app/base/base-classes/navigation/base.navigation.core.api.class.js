export default class CoreAPI {
  constructor(RestangularNavigation, RestangularWithContext, urlAll, urlOne) {
    'ngInject';
    this.urlAll = urlAll;
    this.urlOne = urlOne;

    this.RestangularWithContext = RestangularWithContext;
    this.RestangularNavigation = RestangularNavigation;

    this.categoryAPI = RestangularNavigation.all(urlAll);
  }

  query() {
    return this.RestangularNavigation.all(this.urlAll).getList();
  }

  queryItems(categoryId) {
    return this.RestangularWithContext.one(this.urlOne, categoryId).getList('products');
  }
}
