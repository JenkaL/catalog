import ProductBackButtonCtrl from './product.back.button.controller';

export default class ProductBackButtonDirective {
  constructor($templateCache) {
    'ngInject';

    this.restrict = 'E';
    this.replace = true;

    this.scope = {};
    this.controller = ProductBackButtonCtrl;
    this.controllerAs = 'backCtrl';

    this.template = $templateCache.get('app/components/products/back-button/views/product.back.button.html');
  }
}
