import UtilsValidation from './../../base/utils/utils.validate';
import States from './../../base/base-classes/base.state.class';

export default class ProductController {
  constructor($stateParams, ProductCollectionInterface) {
    'ngInject';

    this.productId = +$stateParams.productId;
    this.ProductCollectionInterface = ProductCollectionInterface;

    this.initSpinners();
    this.initErrorStates();
    this.init();
  }

  init() {
    this.product = this.ProductCollectionInterface.getItem(this.productId);
    this.setFirstSpinners(true);

    //console.log("ProductCollectionInterface get from cache", this.product)
    //console.log("ProductCollectionInterface get from cache", UtilsValidation.isEmptyObject(this.product), !UtilsValidation.isEmptyObject(this.product), !this.product.hasOwnProperty('description'))
    if (UtilsValidation.isEmptyObject(this.product) ||
        (!UtilsValidation.isEmptyObject(this.product) && !this.product.hasOwnProperty('description'))) {
      this.fetchItem();
    }
  }

  fetchItem() {
    //console.log("!!!!!ProductController fetchItem")
    this.ProductCollectionInterface.fetchItem(this.productId)
      .then(product => {
        this.product = product;
	      console.log(this.product)
      })
      .catch(() => {
        this.setErrorStateFromFetch(true);
      });
  }

  initSpinners() {
    this.spinners = new States(
      'pageSpinner',
      'descriptionSpinner',
      'commentsSpinner'
    );
    //console.log("this.spinners", this.spinners)
  }

  initErrorStates() {
    this.errorStates = new States(
      'pageLoad',
      'descriptionLoad',
      'commentsLoad',
      'imagesLoad'
    );
    //console.log("this.errorStates", this.errorStates)
  }

  setErrorStateFromFetch(flag) {
    if (UtilsValidation.isEmptyObject(this.product)) {
      this.errorStates.setState('pageLoad', flag);
    }

    if (!UtilsValidation.isEmptyObject(this.product) && angular.isUndefined(this.product.description)) {
      this.errorStates.setState('descriptionLoad', flag);
    }
  }

  setFirstSpinners(flag) {
    if (UtilsValidation.isEmptyObject(this.product)) {
      this.spinners.setState('pageSpinner', flag);
      return;
    }

    if (!UtilsValidation.isEmptyObject(this.product) && angular.isUndefined(this.product.description)) {
      this.spinners.setState('descriptionSpinner', flag);
    }
  }

  setCommentsSpinner(flag) {
    this.spinners.setState('commentsSpinner', flag);
  }
}
