import UtilsValidationServerData from '../../base/utils/utils.validate.server.data';
import UtilsValidationClass from '../../base/utils/utils.validate';

export default class Product {
  constructor(product) {
    this.init(product);

    if (product.hasOwnProperty('description')) {
      this.addDescription(product);
    }
  }

  init(product) {
    angular.extend(this, {
      id: product.id,
      name: product.name,
      'category_id': product['category_id'],
      price: product.price,
      discount: product.discount,
      available: product.available,
      special: product.special,
      'short_description': product['short_description'],
      'thumb_url': product['thumb_url']
    });

    angular.extend(this,
      UtilsValidationServerData.createValidateObjFromProp(
        product,
        ['images_urls', 'sections'],
        [Product.getDefaultValue('images_urls'), Product.getDefaultValue('sections')]
      )
    );
  }

  addDescription(product) {
    if (product && product.id && product.description && (product.id === this.id)) {
      angular.extend(this, {
        description: product.description
      });
    }

    return this;
  }

  setPreorderFlag(preorderSectionId) {
    this.isPreorder = !!(~this.sections.indexOf(preorderSectionId));
	  console.log(this.id, this.isPreorder,  preorderSectionId, ~this.sections.indexOf(preorderSectionId))
  }


  static getDefaultValue(property) {
    let returnProperty = null;

    if (property === 'sections' || property === 'images_urls') {
      returnProperty = [];
    }

    return returnProperty;
  }
}
