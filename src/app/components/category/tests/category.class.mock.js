'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Category = function Category(item) {
  _classCallCheck(this, Category);

  this.id = item.id;
  this.type = item.type;
  this.name = item.name;
  this.images = item.images;
  this.devices = item.devices;
  this.style = item.style;
  this['products_count'] = item['products_count'];
  this['special_products_count'] = item['special_products_count'];
};
