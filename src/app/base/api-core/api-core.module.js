import { apiContext, apiPath } from './api-core.value';
import apiCoreConfig from './api-core.config';
import NavigationRestangular from './api-core.config.navigation';
import RestangularWithContext from './api-core.config.context';

let apiCore = angular
                .module('mApiCore', ['restangular'])
                .config(apiCoreConfig)
                .constant('apiPath', apiPath)
                .value('apiContext',  apiContext)
                .service('RestangularWithContext', RestangularWithContext)
                .service('NavigationRestangular', NavigationRestangular);

export default apiCore = apiCore.name;


