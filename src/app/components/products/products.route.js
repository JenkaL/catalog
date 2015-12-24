import ProductController from './product.controller';

export default function productsRouterConfig ($stateProvider) {
  $stateProvider
    .state('product', {
      url: '/products/:productId?category&section',
      controller: ProductController,
      controllerAs: 'productCtrl',
      templateProvider: $templateCache => {
        'ngInject';

        return $templateCache.get('app/components/products/views/product.html');
      }
    });
}
