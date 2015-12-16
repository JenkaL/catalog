//import ProductCardBigCtrl from './product.card.big.controller';

export default class ProductCardBigDirective {
  constructor($templateCache) {
    'ngInject';

    this.restrict = 'A';

    this.scope = {
      item: '='
    };
    //this.controller = ProductCardBigCtrl;
    //this.controllerAs = 'nav';
    //this.bindToController = true;

    this.template = $templateCache.get('app/components/catalog/catalog-product-cards/card-big/views/product-card-big.html');
  }
}
