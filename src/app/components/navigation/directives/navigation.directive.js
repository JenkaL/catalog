import NavigationCtrl from './navigation.controller.js';

export default class NavigationDirective {
    constructor($templateCache) {
        'ngInject';

        this.restrict = 'E';

        this.scope = {};
        this.controller = NavigationCtrl;
        this.controllerAs = 'nav';

        this.template = $templateCache.get('app/components/navigation/views/navigation.html');
    }

    link(scope, element) {
	    element[0].addEventListener('changeVisualState', event => {
		    NavigationDirective.changeVisualState(event.detail.state, scope);
	    });
    }

    static changeVisualState(state) {
        if(!NavigationDirective.navigationActor) {
            NavigationDirective.createActor();
            NavigationDirective.createTweens();
        }

        NavigationDirective.navigationActor.start(NavigationDirective[state + 'Tween']);
    }

    static createActor() {
        NavigationDirective.navigationActor = new ui.Actor({
            element: '.wrap-navigation',
            values: {
                width: '300px',
                paddingTop: '0'
            }
        });
    }

    static createTweens() {
        NavigationDirective.closeTween = new ui.Tween({
            duration: 600,
            ease: 'easeInOut',
            values: {
                width: '50px'
            }
        });

        NavigationDirective.openTween = new ui.Tween({
            duration: 600,
            ease: 'easeInOut',
            values: {
                width: '300px'
            }
        });

        NavigationDirective.upTween = new ui.Tween({
            duration: 600,
            ease: 'easeInOut',
            values: {
                paddingTop: '0'
            }
        });

        NavigationDirective.downTween = new ui.Tween({
            duration: 600,
            ease: 'easeInOut',
            values: {
                paddingTop: '50px'
            }
        });
    }
}
