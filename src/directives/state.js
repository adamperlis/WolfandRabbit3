module.exports = function($rootScope, $state, $animate, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                var from = fromState.name.split(".").join("-");
                var to = toState.name.split(".").join("-");

                if (to == "home") {
                    $rootScope.back = true;
                } else {
                    $rootScope.back = false;
                }

                $animate.removeClass(element, from);
                $animate.addClass(element, to);
            });
        }
    }
}