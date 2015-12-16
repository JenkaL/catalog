export default class SectionCoreAPI {
  constructor(NavigationRestangular, RestangularWithContext) {
    'ngInject';

    this.RestangularWithContext = RestangularWithContext;

    this.sectionAPI = NavigationRestangular.all('sections');
  }

  query() {
    return this.sectionAPI.getList();
  }

  queryItems(sectionId) {
    return this.RestangularWithContext.one('section', sectionId).getList('products');
  }
}
