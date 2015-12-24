export default class UtilsValidation {
  constructor() {}

  static isValidate(value, validateFn) {
    return !!(validateFn) ? validateFn(value) : false;
  }

  static isNumber(value) {
    return UtilsValidation.isDefined(value) && angular.isNumber(value);
  }

  static isFloat(value) {

  }

  static isBoolean(value) {
    return UtilsValidation.isDefined(value) && _.isBoolean(value);
  }

  static isDefined(value) {
    return angular.isDefined(value);
  }

  static isUndefined(value) {
    return angular.isUndefined(value);
  }

  static isNotEmptyArray(value) {
    return angular.isArray(value) && value.length;
  }

  static isNotEmptyString(value) {
    return angular.isString(value) && value.length;
  }

  static isEmptyObject(obj) {
    let k;

    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false;
      }
    }

    return true;
  }
}
