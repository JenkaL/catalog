export default class mVisibleDirective {
  constructor() {
      'ngInject';

      this.restrict = 'A';
      this.multiElement = true;
  }

  link(scope, el, attr) {
    let unwatch,
        domEl = angular.element(el)[0],
        M_VISIBLE_CLASS = 'm-visible',
        M_INVISIBLE_CLASS = 'm-invisible';

    unwatch = scope.$watch(attr.mVisible,
      (newVal, oldVal) => {
        if (angular.isUndefined(newVal) || (newVal !== oldVal)) {
          domEl.classList.remove(M_VISIBLE_CLASS, M_INVISIBLE_CLASS);
          domEl.classList.add(!!newVal ? M_VISIBLE_CLASS : M_INVISIBLE_CLASS)
        }
      });

    scope.$on('$destroy', unwatch);
  }
}
