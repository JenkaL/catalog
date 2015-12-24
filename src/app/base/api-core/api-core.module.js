import { apiContext, apiPath } from './api-core.value';
import apiCoreConfig from './api-core.config';
import RestangularNavigation from './api-core.config.navigation';
import RestangularWithContext from './api-core.config.context';
import RestangularWithLangCountryContext from './api-core.config.lang.country.context';

let apiCore = angular
                .module('mApiCore', ['restangular'])
                .config(apiCoreConfig)

                .constant('apiPath', apiPath)
                .value('apiContext',  apiContext)

                .service('RestangularWithLangCountryContext', RestangularWithLangCountryContext)
                .service('RestangularWithContext', RestangularWithContext)
                .service('RestangularNavigation', RestangularNavigation);

export default apiCore = apiCore.name;


