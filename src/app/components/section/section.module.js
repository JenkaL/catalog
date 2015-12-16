import mApiCore from '../../../app/base/api-core/api-core.module';

import { isMainSection, isNotSystemSection } from './section.filters.js';

import SectionStorage from './section.storage.js';
import SectionCoreAPI from './section.core.api.js';

let section = angular
                .module('mSection', [mApiCore])
                .constant('mainSectionId', 1)
                .constant('preorderSectionId', 4)
                .constant('withoutPriceSectionId', 5)
                .filter('isMainSection', isMainSection)
                .filter('isNotSystemSection', isNotSystemSection)
                .service('SectionStorage', SectionStorage)
                .service('SectionCoreAPI', SectionCoreAPI);

export default section = section.name;
