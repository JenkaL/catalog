import Utils from '../../../base/utils/utils.js';

function getToogleState(currentState, statesArr) {
    return statesArr[(statesArr.indexOf(currentState) + 1) % 2];
}

export default function ToggleNavigationStateDirective() {
    return {
        restrict: 'A',
        scope: {
            initState: '@',
            states: '@'
        },
        link: (scope, element) => {
            let domElement = element[0],
                navigationElement = document.querySelector('navigation'),
                statesArr = scope.states.split(','),
                currentState = scope.initState;

            domElement.addEventListener('click', () => {
                currentState = getToogleState(currentState, statesArr);
                Utils.generateCustomEvent(navigationElement, 'changeVisualState', { state: currentState });
            }, false);
        }
    };
}
