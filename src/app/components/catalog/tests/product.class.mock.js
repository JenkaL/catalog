'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Product = (function () {
  function Product(item) {
    _classCallCheck(this, Product);

    angular.extend(this, {
      id: item.id,
      name: item.name,
      available: item.available,
      special: item.special,
      price: item.price,
      discount: item.discount,
      sections: item.sections,
      isWithPrice: this.isProductWithPrice(item),
      isPreorder: this.isProductPreorder(item),
      'short_description': item['short_description'],
      'thumb_url': item['thumb_url']
    });

    //this['images_urls'] = item['images_urls']; ???
  }

  _createClass(Product, [{
    key: 'isProductWithPrice',
    value: function isProductWithPrice(product) {
      return true;
    }
  }, {
    key: 'isProductPreorder',
    value: function isProductPreorder(product) {
      return false;
    }
  }]);

  return Product;
})();
