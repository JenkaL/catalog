import mCategory from './../category/category.module';
import mSection from './../section/section.module';
import mProduct from './../products/products.module';

import CatalogConfig from './catalog.config';
import CatalogCollectionInterface from './catalog.collection.interface';

import catalogRouterConfig from './../catalog/catalog.route.js';

import ProductCardBigDirective from './catalog-product-cards/card-big/product.card.big.directive';
import ProductCardSmallDirective from './catalog-product-cards/card-small/product.card.small.directive';

let catalog = angular
                .module('mCatalog', [mCategory, mSection, mProduct])
                .service('CatalogConfig', CatalogConfig)
                .service('CatalogCollectionInterface', CatalogCollectionInterface)

                .directive('productCardBig', $templateCache => new ProductCardBigDirective($templateCache))
                .directive('productCardSmall', $templateCache => new ProductCardSmallDirective($templateCache))

                .config(catalogRouterConfig);

export default catalog = catalog.name;
