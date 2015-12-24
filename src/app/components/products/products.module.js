import ProductsStorage from './products.storage';
import ProductsStorageCache from './product.storage.cache';
import ProductCollectionInterface from './product.collection.interface';

import ProductBackButtonDirective from './back-button/product.back.button.derictive';
import ProductCardDirective from './product-card/product.card.derictive';

import BasketButtonDirective from './basket-button/basket.button.directive';
import RememberButtonDirective from './basket-button/remember-button/remember.button.directive';
import PreorderButtonDirective from './basket-button/preorder-button/preoder.button.directive';
import AddToCartButtonDirective from './basket-button/add-to-cart-button/add.to.cart.button.directive';

import ProductCoreAPI from './product.core.api';

import productsRouterConfig from './../products/products.route';

let products = angular
                .module('mProducts', [])
                .service('ProductCoreAPI', ProductCoreAPI)
                .service('ProductsStorage', ProductsStorage)
                .service('ProductsStorageCache', ProductsStorageCache)
                .service('ProductCollectionInterface', ProductCollectionInterface)

                .directive('productBackButton', $templateCache => new ProductBackButtonDirective($templateCache))
                .directive('productCard', $templateCache => new ProductCardDirective($templateCache))

                .directive('basketButton', $templateCache => new BasketButtonDirective($templateCache))
                .directive('rememberButton', $templateCache => new RememberButtonDirective($templateCache))
                .directive('preorderButton', $templateCache => new PreorderButtonDirective($templateCache))
                .directive('addToCartButton', $templateCache => new AddToCartButtonDirective($templateCache))

                .config(productsRouterConfig);

export default products = products.name;
