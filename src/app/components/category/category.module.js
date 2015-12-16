import mApiCore from '../../../app/base/api-core/api-core.module';
//import mUtils from 'utils/angular.utils.module.js';

import { isNotDevices, isDevices } from './category.filters';

import CategoryStorage from './category.storage';
import CategoryCoreAPI from './category.core.api';

let category = angular
                    .module('mCategory', [mApiCore])
                    .service('CategoryStorage', CategoryStorage)
                    .service('CategoryCoreAPI', CategoryCoreAPI)
                    .filter('isNotDevices', isNotDevices)
                    .filter('isDevices', isDevices);

export default category = category.name;
