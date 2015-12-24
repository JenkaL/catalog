import mApiCore from '../../../app/base/api-core/api-core.module';

import { isNotDevices, isDevices } from './category.filters';

import CategoryCoreAPI from './category.core.api';
import NavigationStorage from './../../base/base-classes/navigation/base.navigation.storage.class.js';

let category = angular
                    .module('mCategory', [mApiCore])
                    .service('CategoryStorage', NavigationStorage)
                    .service('CategoryCoreAPI', CategoryCoreAPI)

                    .filter('isNotDevices', isNotDevices)
                    .filter('isDevices', isDevices);

export default category = category.name;
