import Utils from '../../../base/utils/utils.js';

export default class ButtonWithModalDirective {
	/**
	 * TODO: сделать вложенные директивы "напомнить" и "предзаказ" общей директивой - кнопка + модальное окно и от него отнаследоваться
	 */

	constructor($templateCache, $document, $compile) {
		'ngInject';

		this.restrict = 'E';
		this.replace = true;
		//this.transclude = true;

		this.scope = {};

		this.controller = function($scope) {
			this.showModalDialog = false;

			this.getButtonTemplateUrl = function() {
				return this.buttonTemplate;
			}

			this.getModalTemplateUrl = function() {
				return this.modalTemplate;
			}

			this.showDialog = function() {
				this.showModalDialog = true;
			}
		};
		this.controllerAs = 'modalButtonCtrl';
		this.bindToController = {
			modalTemplate: '@',
			buttonTemplate: '@'
		};

		this.template = $templateCache.get('app/components/ui/button-with-modal/views/button.with.modal.html');

		this.$document = $document;
		this.$compile = $compile;
		this.$templateCache = $templateCache;

		ButtonWithModalDirective.self = this;
	}
}