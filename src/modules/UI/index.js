'use strict'

angular.module('UI', ['Modal'])

.service('Scroller', ['$window', require('./factories/Scroller')])

.directive('hoverIntent', ['$timeout', require('./directives/HoverIntent')])
.directive('rsrc', [require('./directives/Rsrc')])
.directive('scrollTo', ['$location', '$window', '$timeout', 'Scroller', require('./directives/ScrollTo')])
