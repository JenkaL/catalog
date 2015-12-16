export default class Product {
  constructor(item) {
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

  isProductWithPrice(product) {
    return true;
  }

  isProductPreorder(product) {
    return false;
  }
}
