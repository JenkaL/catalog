import Utils from './../../utils/utils';
import Storage from './../base.storage.class.js';

export default class NavigationStorage extends Storage{
  constructor() {
    super();
  }

  getNameById(id) {
    return Utils.getPropertyValueByOtherProp(this.data, 'name', 'id', +id);
  }
}
