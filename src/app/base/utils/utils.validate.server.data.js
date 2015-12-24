import UtilsValidation from './utils.validate';

export default class UtilsValidationServerData {
  constructor() {}

  static createValidateObj(product, getDefaultValueFn) {
    let returnObj = {},
        validateFlag,
        k;

    for (k in product) {
      if (!product.hasOwnProperty(k)) {
        continue;
      }

      validateFlag = UtilsValidation.isValidate(k, UtilsValidationServerData.getValidateFn(k));

      if (validateFlag || (!validateFlag && getDefaultValueFn(k))) {
        returnObj[k] = product[k];
      }
    }

    return returnObj;
  }

  static createValidateObjFromProp(obj, arrPropertyValidate, arrDefaultValues) {
    let returnObj = {},
        validateFlag;

    arrPropertyValidate.forEach(
      (prop, index) => {
        validateFlag = UtilsValidation.isValidate(obj[prop], UtilsValidationServerData.getValidateFn(prop));

        returnObj[prop] = validateFlag ? obj[prop] : arrDefaultValues[index];
      }
    );

    return returnObj;
  }

  static getValidateFn(property, xz) {
    let validateFn;

    switch(property.toString()) {
      case 'id':
        validateFn = UtilsValidation.isNumber;
        break;

      case 'name':
        validateFn = UtilsValidation.isNotEmptyString;
        break;

      case 'available':
        validateFn = UtilsValidation.isBoolean;
        break;

      case 'special':
        validateFn = UtilsValidation.isBoolean;
        break;

      case 'price':
        validateFn = UtilsValidation.isNumber;
        break;

      case 'discount':
        validateFn = UtilsValidation.isNumber;
        break;

      case 'category_id':
        validateFn = UtilsValidation.isNumber;
        break;

      case 'sections':
        validateFn = UtilsValidation.isDefined;
        break;

      case 'short_description':
        validateFn = UtilsValidation.isNumber;
        break;

      case 'thumb_url':
        validateFn = UtilsValidation.isDefined;
        break;

      case 'images_urls':
        validateFn = UtilsValidation.isDefined;
        break;
    }

    return validateFn;
  }
}
