import Utils from '../../../base/utils/utils.js';

export default function SetNavigationStateDirective() {
    return {
        restrict: 'A',
        scope: {
            state: '@'
        },
        link: (scope, element) => {
            let domElement = element[0],
                navigationElement = document.querySelector('navigation');

            if (scope.state && scope.state.length && navigationElement) {
                domElement.addEventListener('click', () => {
                    Utils.generateCustomEvent(navigationElement, 'changeVisualState', { state: scope.state });
                }, false);
            }
        }
    };
}
