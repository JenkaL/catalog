import ModalWindowCtrl from './modal.window.controller';

export default class ModalWindowDirective {
	constructor() {
		'ngInject';

		this.restrict = 'AE';

		this.controller = ModalWindowCtrl;
		this.controllerAs = 'modalCtrl';
	}

	link(scope, element) {
		document.body.appendChild(element[0]);
	}
}