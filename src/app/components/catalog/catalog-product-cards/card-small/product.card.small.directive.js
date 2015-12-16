//import ProductCardSmallCtrl from './product.card.small.controller';

export default class ProductCardSmallDirective {
  constructor($templateCache) {
    'ngInject';

    this.restrict = 'A';

    this.scope = {
      item: '='
    };

    //this.controller = ProductCardSmallCtrl;
    //this.controllerAs = 'nav';
    //this.bindToController = true;

    this.template = $templateCache.get('app/components/catalog/catalog-product-cards/card-small/views/product-card-small.html');
  }
}

