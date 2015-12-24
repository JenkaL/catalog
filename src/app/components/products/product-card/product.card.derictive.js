//import ProductCardCtrl from './product.card.controller.js';

export default class ProductCardDirective {
	constructor($templateCache) {
		'ngInject';

		this.restrict = 'E';
		this.replace = true;

		this.scope = {
			product: '='
		};
		//this.controller = ProductBackButtonCtrl;
		//this.controllerAs = 'backCtrl';

		this.template = $templateCache.get('app/components/products/product-card/views/product.card.html');
	}
}
