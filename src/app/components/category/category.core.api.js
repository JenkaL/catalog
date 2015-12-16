export default class CategoryCoreAPI {
  constructor(NavigationRestangular, RestangularWithContext) {
    'ngInject';

    this.RestangularWithContext = RestangularWithContext;

    this.categoryAPI = NavigationRestangular.all('categories');
  }

  query() {
    return this.categoryAPI.getList();
  }

  queryItems(categoryId) {
    return this.RestangularWithContext.one('category', categoryId).getList('products');
  }
}
