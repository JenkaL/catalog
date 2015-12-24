import CoreAPI from './../../base/base-classes/navigation/base.navigation.core.api.class.js';

export default class SectionCoreAPI extends CoreAPI {
  constructor(RestangularNavigation, RestangularWithContext) {
    'ngInject';
    super(RestangularNavigation, RestangularWithContext, 'sections', 'section');
  }
}
