'use strict'

require('angular-animate');

angular.module('Modal', [
    'ngAnimate'
])

.directive('modal', ['$animate', 'Modals', 'Modal', require('./directives/modal')])

.service('Modals', ['$rootScope', 'Modal', '$document', '$compile', '$q', '$http', '$templateCache', '$controller', require('./services/Modals')])

.factory('Modal', ['$animate', '$document', require('./factories/Modal')]);