import mVisibleDirective from './visible/m.visible.directive';
import ButtonWithModalDirective from './button-with-modal/button.with.modal.directive.js';
import modalWindowDirective from './button-with-modal/modal.window.directive';

let ui = angular
                .module('mUi', [])
                .directive('mVisible', () => new mVisibleDirective())
                .directive('buttonWithModal', ($templateCache, $document, $compile) => new ButtonWithModalDirective($templateCache, $document, $compile))
                .directive('modal', ($templateCache, $compile) => new modalWindowDirective($templateCache, $compile));

export default ui = ui.name;
