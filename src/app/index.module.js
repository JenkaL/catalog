// polyfills for dosen't support method or new JS api
import Polyfills from './base/polyfills/polyfills.class';

import config from './index.config';

import routerConfig from './index.route';

import RunController from './index.run';

import mNavigation from '../app/components/navigation/navigation.module';
import mCatalog from '../app/components/catalog/catalog.module';

angular.module('mretailerDesktop', ['ngAnimate',
                                    'ngTouch',
                                    'ngSanitize',
                                    'ui.router',
                                    'restangular',
                                    mNavigation,
                                    mCatalog])
  .config(config)

  .config(routerConfig)

  .run($log => new RunController($log));
