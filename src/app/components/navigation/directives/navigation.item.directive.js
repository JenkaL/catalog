export default class NavigationItemDirective {
	constructor($templateCache) {
		'ngInject';

		this.restrict = 'E';
		this.replace = true;

		this.scope = {
			item: '=',
			clickHandler: '&'
		};

		this.template = $templateCache.get('app/components/navigation/views/navigation-item.html');
	}
}
