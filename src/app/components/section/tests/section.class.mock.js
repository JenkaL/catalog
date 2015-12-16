function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Section = function Section(item) {
  _classCallCheck(this, Section);

  this.id = item.id;
  this.type = item.type;
  this.name = item.name;
  this.system = item.system;
  this.style = item.style;
  this['products_count'] = item['products_count'];
  this['special_products_count'] = item['special_products_count'];
};
