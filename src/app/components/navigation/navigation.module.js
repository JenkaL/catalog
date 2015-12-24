'use strict';

import mCategory from './../category/category.module';
import mSection from './../section/section.module';

import NavigationConfig from './navigation.config.js';

import NavigationCollectionInterface from './navigation.collection.interface';
import NavigationPostProcessingData from './navigation.postprocessing';

import NavigationDirective from './directives/navigation.directive';
import NavigationItemDirective from './directives/navigation.item.directive';
import SetNavigationStateDirective from './directives/navigation.set.state.directive';
import ToggleNavigationStateDirective from './directives/navigation.toggle.state.directive';

import { filterByType } from './navigation.filters';

let navigationModule = angular
                          .module('mNavigation', [mCategory, mSection])
                          .service('NavigationConfig', NavigationConfig)
                          .service('NavigationCollectionInterface', NavigationCollectionInterface)
                          .service('NavigationPostProcessingData', NavigationPostProcessingData)

                          .directive('toggleNavigationState', ToggleNavigationStateDirective)
                          .directive('setNavigationState', SetNavigationStateDirective)
                          .directive('navigation', $templateCache => new NavigationDirective($templateCache)) //TODO: without DI
                          .directive('navItem', $templateCache => new NavigationItemDirective($templateCache))

                          .filter('type', filterByType);

export default navigationModule = navigationModule.name;
