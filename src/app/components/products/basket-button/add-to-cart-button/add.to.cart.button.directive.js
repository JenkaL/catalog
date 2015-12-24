//import ProductCardCtrl from './product.card.controller.js';

export default class AddToCartButtonDirective {
	constructor($templateCache) {
		'ngInject';

		this.restrict = 'E';
		this.replace = true;

		this.scope = {
			product: '='
		};
		//this.controller = ProductBackButtonCtrl;
		//this.controllerAs = 'backCtrl';

		this.template = $templateCache.get('app/components/products/basket-button/add-to-cart-button/views/add.to.cart.button.html');
	}
}

/**
 * TODO: сделать вложенные директивы "напомнить" и "предзаказ" общей директивой - кнопка + модальное окно и от него отнаследоваться
 */