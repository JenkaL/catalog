// polyfills for dosen't support method or new JS api
import Polyfills from './base/polyfills/polyfills.class';

import config from './index.config';

import routerConfig from './index.route';

import RunController from './index.run';

import mNavigation from './../app/components/navigation/navigation.module';
import mCatalog from './../app/components/catalog/catalog.module';
import mProduct from './../app/components/products/products.module';
import mUi from './../app/components/ui/ui.module';

angular.module('mretailerDesktop', ['ngAnimate',
                                    'ngTouch',
                                    'ngSanitize',
                                    'ui.router',
                                    'restangular',
                                    'ngStorage',
                                    mNavigation,
                                    mCatalog,
                                    mUi,
                                    mProduct])
  .config(config)

  .config(routerConfig)

  .run(($log, $rootScope) => new RunController($log, $rootScope));
