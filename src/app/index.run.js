export default class RunController {
  constructor ($log, $rootScope) {
    'ngInject';

    $log.debug('runBlock end');


    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
    });
  }
}
